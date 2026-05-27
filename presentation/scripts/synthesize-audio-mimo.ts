#!/usr/bin/env tsx
/**
 * synthesize-audio-mimo.ts
 * 使用 Xiaomi MiMo V2.5 TTS API 合成音频
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";

// 加载 .env 文件
const envPath = join(import.meta.dirname ?? ".", "..", ".env");
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (key && value) {
        process.env[key] = value;
      }
    }
  }
}

const API_KEY = process.env.MIMO_API_KEY;
if (!API_KEY) {
  console.error("✗ MIMO_API_KEY not set. Add it to presentation/.env");
  process.exit(1);
}

const API_URL = "https://api.xiaomimimo.com/v1/chat/completions";
const VOICE = process.argv.find((a) => a.startsWith("--voice="))?.split("=")[1] ?? "冰糖";
const FORCE = process.argv.includes("--force");

interface Segment {
  chapter: string;
  step: number;
  text: string;
  audio: string;
}

const ROOT = join(import.meta.dirname ?? ".", "..");
const SEGMENTS_PATH = join(ROOT, "audio-segments.json");
const OUT_DIR = join(ROOT, "public", "audio");

// 读取 segments
const segments: Segment[] = JSON.parse(readFileSync(SEGMENTS_PATH, "utf-8"));

console.log(`TTS engine : Xiaomi MiMo V2.5 TTS`);
console.log(`Voice      : ${VOICE}`);
console.log(`Format     : mp3`);
console.log(`Segments   : ${segments.length}`);
console.log();

let synthesized = 0;
let skipped = 0;
let failed = 0;

async function synthesize(text: string, outPath: string): Promise<boolean> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY!,
      },
      body: JSON.stringify({
        model: "mimo-v2.5-tts",
        messages: [
          { role: "user", content: "用自然、轻松的语气朗读，语速适中，吐字清晰。" },
          { role: "assistant", content: text },
        ],
        audio: {
          format: "wav",
          voice: VOICE,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`✗ API error ${response.status}: ${errorText}`);
      return false;
    }

    const data = await response.json();
    const audioData = data.choices?.[0]?.message?.audio?.data;

    if (!audioData) {
      console.error("✗ No audio data in response");
      return false;
    }

    // 解码 base64 并写入文件
    const buffer = Buffer.from(audioData, "base64");
    writeFileSync(outPath, buffer);
    return true;
  } catch (error) {
    console.error(`✗ Error: ${error}`);
    return false;
  }
}

async function main() {
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i]!;
    const outPath = join(OUT_DIR, seg.audio);

    // 检查文件是否已存在
    if (existsSync(outPath) && !FORCE) {
      skipped++;
      console.log(
        `[${String(i + 1).padStart(3)}/${segments.length}] ${seg.audio.padEnd(20)} skip (exists)`
      );
      continue;
    }

    // 跳过空文本
    if (!seg.text.trim()) {
      skipped++;
      console.log(
        `[${String(i + 1).padStart(3)}/${segments.length}] ${seg.audio.padEnd(20)} skip (empty)`
      );
      continue;
    }

    // 创建目录
    mkdirSync(dirname(outPath), { recursive: true });

    // 合成
    const start = Date.now();
    const success = await synthesize(seg.text, outPath);
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);

    if (success) {
      synthesized++;
      console.log(
        `[${String(i + 1).padStart(3)}/${segments.length}] ${seg.audio.padEnd(20)} ✓ ${elapsed}s`
      );
    } else {
      failed++;
      console.error(
        `[${String(i + 1).padStart(3)}/${segments.length}] ${seg.audio.padEnd(20)} ✗ FAILED`
      );
    }

    // 简单的速率限制：每秒最多 2 个请求
    if (i < segments.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  console.log();
  console.log(
    `✓ done — synthesized ${synthesized}, skipped ${skipped}, failed ${failed}`
  );

  if (failed > 0) {
    process.exit(2);
  }
}

main();
