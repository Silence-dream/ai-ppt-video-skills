#!/usr/bin/env node
/**
 * synthesize-audio.ts — read audio-segments.json and call Xiaomi MiMo TTS
 * v2.5 API to produce one mp3/wav per segment under public/audio/<chapter>/<N>.mp3.
 *
 * Prereq:
 *   1. npm run extract-narrations   (writes audio-segments.json)
 *   2. .env file with MIMO_API_KEY set
 *   3. (optional) ffmpeg in PATH — used to convert wav→mp3; without it, saves .wav
 *
 * Behavior:
 *   • Serial calls (TTS APIs commonly rate-limit parallel requests).
 *   • Skips segments whose audio file already exists (so you can rerun safely
 *     after a partial failure). Pass --force to re-synthesize all.
 *   • Prints progress per segment with elapsed time.
 *
 * Usage:
 *   npx tsx scripts/synthesize-audio.ts                # incremental
 *   npx tsx scripts/synthesize-audio.ts --force        # overwrite all
 *   npx tsx scripts/synthesize-audio.ts --voice=冰糖   # override voice
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");
const SEGMENTS_PATH = resolve(ROOT, "audio-segments.json");
const OUT_DIR = resolve(ROOT, "public/audio");
const ENV_PATH = resolve(ROOT, ".env");

// ── Load .env ────────────────────────────────────────────────────────────────
async function loadEnv() {
  if (!existsSync(ENV_PATH)) return;
  const content = await readFile(ENV_PATH, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

// ── Parse args ───────────────────────────────────────────────────────────────
let FORCE = false;
let VOICE_OVERRIDE: string | undefined;

for (const arg of process.argv.slice(2)) {
  if (arg === "--force") {
    FORCE = true;
  } else if (arg.startsWith("--voice=")) {
    VOICE_OVERRIDE = arg.slice("--voice=".length);
  } else {
    console.error(`✗ unknown arg: ${arg}`);
    process.exit(1);
  }
}

// ── Check ffmpeg availability ────────────────────────────────────────────────
function hasFfmpeg(): boolean {
  try {
    execSync("ffmpeg -version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

// ── Call MiMo TTS API ────────────────────────────────────────────────────────
const MIMO_API_URL = "https://api.xiaomimimo.com/v1/chat/completions";
const MIMO_MODEL = "mimo-v2.5-tts";
const DEFAULT_VOICE = "冰糖";

interface TtsResult {
  audioBase64: string;
}

async function synthesize(text: string, voice: string): Promise<TtsResult> {
  const apiKey = process.env.MIMO_API_KEY;
  if (!apiKey) {
    throw new Error(
      "MIMO_API_KEY not set. Add it to .env or set as environment variable.\n" +
        "Get a key at https://platform.xiaomimimo.com",
    );
  }

  const body = {
    model: MIMO_MODEL,
    messages: [
      {
        role: "user",
        content:
          "用自然、清晰、适合解说的语调朗读，语速适中，不要过快或过慢。",
      },
      {
        role: "assistant",
        content: text,
      },
    ],
    audio: {
      format: "wav",
      voice,
    },
  };

  const res = await fetch(MIMO_API_URL, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`MiMo API ${res.status}: ${errText}`);
  }

  const json = (await res.json()) as {
    choices: { message: { audio: { data: string } } }[];
  };

  const audioData = json.choices?.[0]?.message?.audio?.data;
  if (!audioData) {
    throw new Error("MiMo API returned no audio data");
  }

  return { audioBase64: audioData };
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  await loadEnv();

  if (!existsSync(SEGMENTS_PATH)) {
    console.error(
      `✗ ${SEGMENTS_PATH} not found. Run: npm run extract-narrations`,
    );
    process.exit(1);
  }

  const segments: {
    chapter: string;
    step: number;
    text: string;
    audio: string;
  }[] = JSON.parse(await readFile(SEGMENTS_PATH, "utf8"));

  const useMp3 = hasFfmpeg();
  const total = segments.length;
  let synthesized = 0;
  let skipped = 0;
  let failed = 0;
  const voice = VOICE_OVERRIDE ?? DEFAULT_VOICE;

  console.log(`TTS engine : Xiaomi MiMo V2.5 TTS`);
  console.log(`Voice      : ${voice}`);
  console.log(`Format     : ${useMp3 ? "mp3 (ffmpeg convert)" : "wav"}`);
  console.log(`Segments   : ${total}`);
  console.log();

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const ext = useMp3 ? "mp3" : "wav";
    // Override extension in audio path if needed
    const audioPath = seg.audio.replace(/\.mp3$/, `.${ext}`);
    const out = resolve(OUT_DIR, audioPath);

    if (existsSync(out) && !FORCE) {
      skipped++;
      console.log(
        `[${String(i + 1).padStart(3)}/${total}] ${audioPath.padEnd(25)} skip (exists)`,
      );
      continue;
    }

    await mkdir(dirname(out), { recursive: true });
    const start = Date.now();

    try {
      const { audioBase64 } = await synthesize(seg.text, voice);
      const wavBuffer = Buffer.from(audioBase64, "base64");

      if (useMp3) {
        // Write wav temp, convert to mp3 via ffmpeg
        const tmpWav = out.replace(/\.mp3$/, ".tmp.wav");
        await writeFile(tmpWav, wavBuffer);
        execSync(
          `ffmpeg -y -i "${tmpWav}" -codec:a libmp3lame -qscale:a 2 "${out}"`,
          { stdio: "ignore" },
        );
        // Clean up temp wav
        try {
          const { unlinkSync } = await import("node:fs");
          unlinkSync(tmpWav);
        } catch {
          // ignore cleanup errors
        }
      } else {
        await writeFile(out, wavBuffer);
      }

      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      synthesized++;
      console.log(
        `[${String(i + 1).padStart(3)}/${total}] ${audioPath.padEnd(25)} ✓ ${elapsed}s`,
      );
    } catch (err: unknown) {
      failed++;
      const msg = err instanceof Error ? err.message : String(err);
      console.error(
        `[${String(i + 1).padStart(3)}/${total}] ${audioPath.padEnd(25)} ✗ FAILED: ${msg}`,
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
