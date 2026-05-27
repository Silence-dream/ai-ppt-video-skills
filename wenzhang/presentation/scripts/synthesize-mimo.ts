/**
 * synthesize-mimo.ts — 调用小米 MiMo V2.5 TTS API 合成音频
 *
 * 读取 audio-segments.json，逐段调 API，base64 解码 wav → ffmpeg 转 mp3。
 * 增量模式：跳过已存在的 mp3。--force 全部重合。--voice 切音色。
 *
 * 用法：
 *   npx tsx scripts/synthesize-mimo.ts
 *   npx tsx scripts/synthesize-mimo.ts -- --force
 *   npx tsx scripts/synthesize-mimo.ts -- --voice=茉莉
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { execSync } from "node:child_process";

const ROOT = resolve(import.meta.dirname ?? dirname(new URL(import.meta.url).pathname), "..");
const SEGMENTS_PATH = resolve(ROOT, "audio-segments.json");
const OUT_DIR = resolve(ROOT, "public/audio");
const ENV_PATH = resolve(ROOT, ".env");

// ── 读 .env ──
async function loadEnv(): Promise<string> {
  if (process.env.MIMO_API_KEY) return process.env.MIMO_API_KEY;
  if (existsSync(ENV_PATH)) {
    const raw = await readFile(ENV_PATH, "utf8");
    const m = raw.match(/^\s*MIMO_API_KEY\s*=\s*(.+)\s*$/m);
    if (m) return m[1]!.trim();
  }
  throw new Error("MIMO_API_KEY not set. Add it to presentation/.env");
}

// ── 解析参数 ──
const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const voiceArg = args.find((a) => a.startsWith("--voice="));
const VOICE = voiceArg ? voiceArg.split("=")[1] : "冰糖";

interface Segment {
  chapter: string;
  step: number;
  text: string;
  audio: string;
}

// ── MiMo TTS API ──
const API_URL = "https://api.xiaomimimo.com/v1/chat/completions";
const MODEL = "mimo-v2.5-tts";

async function synthesizeOne(
  text: string,
  voice: string,
  apiKey: string,
): Promise<Buffer> {
  const body = {
    model: MODEL,
    messages: [
      { role: "user", content: "用自然、轻松的语气朗读，语速适中，吐字清晰。" },
      { role: "assistant", content: text },
    ],
    audio: { format: "wav", voice },
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
  const b64 = json.choices?.[0]?.message?.audio?.data;
  if (!b64) throw new Error("MiMo API returned no audio data");

  return Buffer.from(b64, "base64");
}

// ── wav → mp3（ffmpeg） ──
function wavToMp3(wavPath: string, mp3Path: string): void {
  execSync(`ffmpeg -y -i "${wavPath}" -codec:a libmp3lame -qscale:a 2 "${mp3Path}"`, {
    stdio: "pipe",
  });
}

// ── 主流程 ──
async function main() {
  const apiKey = await loadEnv();
  const segments: Segment[] = JSON.parse(await readFile(SEGMENTS_PATH, "utf8"));

  console.log(`TTS engine : Xiaomi MiMo V2.5 TTS`);
  console.log(`Voice      : ${VOICE}`);
  console.log(`Format     : mp3 (ffmpeg)`);
  console.log(`Segments   : ${segments.length}`);
  console.log();

  let synth = 0;
  let skip = 0;
  let fail = 0;

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i]!;
    const mp3Path = join(OUT_DIR, seg.audio);
    const wavPath = mp3Path.replace(/\.mp3$/, ".wav");

    if (existsSync(mp3Path) && !FORCE) {
      skip++;
      console.log(`[${String(i + 1).padStart(3)}/${segments.length}] ${seg.audio.padEnd(24)} skip (exists)`);
      continue;
    }

    await mkdir(dirname(mp3Path), { recursive: true });

    const start = Date.now();
    try {
      const wavBuf = await synthesizeOne(seg.text, VOICE, apiKey);
      await writeFile(wavPath, wavBuf);
      wavToMp3(wavPath, mp3Path);
      // 清理 wav
      try { execSync(`rm "${wavPath}"`, { stdio: "pipe" }); } catch { /* ignore */ }
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      synth++;
      console.log(`[${String(i + 1).padStart(3)}/${segments.length}] ${seg.audio.padEnd(24)} ✓ ${elapsed}s`);
    } catch (err: unknown) {
      fail++;
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[${String(i + 1).padStart(3)}/${segments.length}] ${seg.audio.padEnd(24)} ✗ ${msg}`);
    }
  }

  console.log();
  console.log(`✓ done — synthesized ${synth}, skipped ${skip}, failed ${fail}`);
  if (fail > 0) process.exit(2);
}

main().catch((err) => {
  console.error(`✗ ${err.message ?? err}`);
  process.exit(1);
});
