/**
 * synthesize-mimo.ts — 使用小米 MiMo V2.5 TTS 合成音频
 *
 * Run via:
 *   npx tsx scripts/synthesize-mimo.ts              # 增量（跳过已有）
 *   npx tsx scripts/synthesize-mimo.ts --force      # 全部重合
 *   npx tsx scripts/synthesize-mimo.ts --voice=茉莉  # 指定音色
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync, readFileSync, unlinkSync, renameSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");
const SEGMENTS_PATH = resolve(ROOT, "audio-segments.json");
const OUT_DIR = resolve(ROOT, "public/audio");
const ENV_PATH = resolve(ROOT, ".env");

const API_URL = "https://api.xiaomimimo.com/v1/chat/completions";
const MODEL = "mimo-v2.5-tts";
const DEFAULT_VOICE = "冰糖";
const STYLE_PROMPT = "用自然、轻松、略带热情的语气朗读，语速适中，吐字清晰。";

interface Segment {
  chapter: string;
  step: number;
  text: string;
  audio: string;
}

/** 简单解析 .env 文件 */
function loadEnv(path: string): Record<string, string> {
  const env: Record<string, string> = {};
  if (!existsSync(path)) return env;
  const content = readFileSync(path, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    env[key] = value;
  }
  return env;
}

/** 调用 MiMo TTS API，返回音频 buffer */
async function synthesize(
  text: string,
  voice: string,
  apiKey: string,
): Promise<Buffer> {
  const body = {
    model: MODEL,
    messages: [
      { role: "user", content: STYLE_PROMPT },
      { role: "assistant", content: text },
    ],
    audio: {
      format: "wav",
      voice,
    },
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`MiMo API ${res.status}: ${errText.slice(0, 200)}`);
  }

  const json = (await res.json()) as {
    choices?: { message?: { audio?: { data?: string } } }[];
  };

  const audioData = json.choices?.[0]?.message?.audio?.data;
  if (!audioData) {
    throw new Error("MiMo API 返回中没有 audio.data");
  }

  return Buffer.from(audioData, "base64");
}

/** 尝试用 ffmpeg 转 mp3，失败则保存 wav */
async function saveAudio(
  wavBuf: Buffer,
  outPath: string,
): Promise<"mp3" | "wav"> {
  const mp3Path = outPath.replace(/\.wav$/, ".mp3");

  try {
    execSync("ffmpeg -version", { stdio: "ignore" });
    // ffmpeg 可用，写临时 wav 后转 mp3
    const tmpWav = outPath + ".tmp.wav";
    await writeFile(tmpWav, wavBuf);
    try {
      execSync(
        `ffmpeg -y -i "${tmpWav}" -codec:a libmp3lame -qscale:a 2 "${mp3Path}" 2>/dev/null`,
        { stdio: "ignore" },
      );
      try { unlinkSync(tmpWav); } catch {}
      return "mp3";
    } catch {
      renameSync(tmpWav, outPath);
      return "wav";
    }
  } catch {
    await writeFile(outPath, wavBuf);
    return "wav";
  }
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const voiceArg = args.find((a) => a.startsWith("--voice="));
  const voice = voiceArg ? voiceArg.split("=")[1]! : DEFAULT_VOICE;

  // 加载 .env
  const env = loadEnv(ENV_PATH);
  const apiKey = env.MIMO_API_KEY || process.env.MIMO_API_KEY || "";
  if (!apiKey) {
    console.error("✗ MIMO_API_KEY 未设置。在 presentation/.env 中配置。");
    process.exit(1);
  }

  // 读 segments
  if (!existsSync(SEGMENTS_PATH)) {
    console.error(
      "✗ audio-segments.json 不存在。先运行: npm run extract-narrations",
    );
    process.exit(1);
  }
  const segments: Segment[] = JSON.parse(
    await readFile(SEGMENTS_PATH, "utf8"),
  );

  console.log(`TTS engine : Xiaomi MiMo V2.5 TTS`);
  console.log(`Voice      : ${voice}`);
  console.log(`Model      : ${MODEL}`);
  console.log(`Segments   : ${segments.length}`);
  console.log();

  let synthesized = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i]!;
    const baseName = `${seg.chapter}/${seg.step}`;
    const mp3Out = join(OUT_DIR, `${baseName}.mp3`);
    const wavOut = join(OUT_DIR, `${baseName}.wav`);

    if ((existsSync(mp3Out) || existsSync(wavOut)) && !force) {
      skipped++;
      const pad = String(i + 1).padStart(3);
      console.log(`[${pad}/${segments.length}] ${baseName.padEnd(24)} skip (exists)`);
      continue;
    }

    await mkdir(dirname(mp3Out), { recursive: true });

    const start = Date.now();
    try {
      const wavBuf = await synthesize(seg.text, voice, apiKey);
      const format = await saveAudio(wavBuf, join(OUT_DIR, `${baseName}.wav`));
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      synthesized++;
      const pad = String(i + 1).padStart(3);
      const ext = format === "mp3" ? "mp3" : "wav";
      console.log(
        `[${pad}/${segments.length}] ${baseName.padEnd(24)} ✓ ${elapsed}s (${ext})`,
      );
    } catch (err: any) {
      failed++;
      const pad = String(i + 1).padStart(3);
      console.error(
        `[${pad}/${segments.length}] ${baseName.padEnd(24)} ✗ ${err.message}`,
      );
    }
  }

  console.log();
  console.log(
    `✓ done — synthesized ${synthesized}, skipped ${skipped}, failed ${failed}`,
  );
  if (failed > 0) process.exit(2);
}

main().catch((err) => {
  console.error(`✗ ${err.message ?? err}`);
  process.exit(1);
});
