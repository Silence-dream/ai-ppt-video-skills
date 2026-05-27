#!/usr/bin/env tsx
/**
 * synthesize-audio-mimo.ts — 使用 MiMo TTS 合成音频
 *
 * 读取 audio-segments.json，调用 MiMo API 合成每段音频
 *
 * 用法：
 *   npx tsx scripts/synthesize-audio-mimo.ts              # 增量合成
 *   npx tsx scripts/synthesize-audio-mimo.ts --force       # 全部重合成
 *   npx tsx scripts/synthesize-audio-mimo.ts --voice=茉莉  # 指定音色
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 加载 .env
const envPath = join(__dirname, "..", ".env");
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim();
    }
  }
}

const API_KEY = process.env.MIMO_API_KEY;
if (!API_KEY) {
  console.error("✗ MIMO_API_KEY not set. Add it to presentation/.env");
  process.exit(1);
}

const API_URL = "https://api.xiaomimimo.com/v1/chat/completions";
const ROOT = join(__dirname, "..");
const SEGMENTS_PATH = join(ROOT, "audio-segments.json");
const OUT_DIR = join(ROOT, "public", "audio");

// 解析参数
let force = false;
let voice = "冰糖";
for (const arg of process.argv.slice(2)) {
  if (arg === "--force") force = true;
  else if (arg.startsWith("--voice=")) voice = arg.split("=")[1];
}

// 读取 segments
const segments = JSON.parse(readFileSync(SEGMENTS_PATH, "utf-8"));
const total = segments.length;

console.log(`TTS engine : Xiaomi MiMo V2.5 TTS`);
console.log(`Voice      : ${voice}`);
console.log(`Format     : mp3`);
console.log(`Segments   : ${total}`);
console.log();

let synthesized = 0;
let skipped = 0;
let failed = 0;

async function synthesize(text: string, outPath: string): Promise<boolean> {
  const body = {
    model: "mimo-v2.5-tts",
    messages: [
      { role: "user", content: "用自然、清晰的语气朗读，语速适中" },
      { role: "assistant", content: text },
    ],
    audio: {
      format: "wav",
      voice: voice,
    },
  };

  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY!,
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error(`  API error ${resp.status}: ${errText}`);
      return false;
    }

    const data = await resp.json();
    const audioBase64 = data.choices?.[0]?.message?.audio?.data;
    if (!audioBase64) {
      console.error("  No audio data in response");
      return false;
    }

    // 写入 wav 文件
    const wavPath = outPath.replace(".mp3", ".wav");
    mkdirSync(dirname(wavPath), { recursive: true });
    writeFileSync(wavPath, Buffer.from(audioBase64, "base64"));

    // 尝试用 ffmpeg 转换为 mp3
    try {
      const { execSync } = await import("child_process");
      execSync(`ffmpeg -y -i "${wavPath}" -codec:a libmp3lame -qscale:a 2 "${outPath}" 2>/dev/null`);
      // 删除 wav 文件
      const { unlinkSync } = await import("fs");
      unlinkSync(wavPath);
    } catch {
      // ffmpeg 不可用，保留 wav
      return true;
    }

    return true;
  } catch (err: any) {
    console.error(`  Request failed: ${err.message}`);
    return false;
  }
}

async function main() {
  for (let i = 0; i < total; i++) {
    const seg = segments[i];
    const outPath = join(OUT_DIR, seg.audio);

    if (existsSync(outPath) && !force) {
      skipped++;
      console.log(
        `[${String(i + 1).padStart(3)}/${total}] ${seg.chapter}/${seg.step}.mp3             skip (exists)`
      );
      continue;
    }

    const start = Date.now();
    const ok = await synthesize(seg.text, outPath);
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);

    if (ok) {
      synthesized++;
      console.log(
        `[${String(i + 1).padStart(3)}/${total}] ${seg.chapter}/${seg.step}.mp3             ✓ ${elapsed}s`
      );
    } else {
      failed++;
      console.error(
        `[${String(i + 1).padStart(3)}/${total}] ${seg.chapter}/${seg.step}.mp3             ✗ FAILED`
      );
    }
  }

  console.log();
  console.log(`✓ done — synthesized ${synthesized}, skipped ${skipped}, failed ${failed}`);
  if (failed > 0) process.exit(2);
}

main();
