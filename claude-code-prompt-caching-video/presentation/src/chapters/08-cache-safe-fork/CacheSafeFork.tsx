import type { ChapterStepProps } from "../../registry/types";
import "./CacheSafeFork.css";

const prefixBlocks = ["system prompt", "user context", "system context", "tool definitions", "parent messages"];

function ParentSession({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`cf-parent ${compact ? "cf-parent-compact" : ""}`} aria-hidden="true">
      {prefixBlocks.map((block, index) => (
        <div className={`cf-block cf-block-${index + 1}`} key={block}>
          <span>{block}</span>
        </div>
      ))}
    </div>
  );
}

function WrongFork() {
  return (
    <div className="cf-wrong" aria-hidden="true">
      <ParentSession compact />
      <div className="cf-fork-gap">
        <span>no shared prefix</span>
      </div>
      <div className="cf-summary-call">
        <strong>请总结</strong>
        <span>different system prompt</span>
        <span>no tools</span>
      </div>
    </div>
  );
}

function SafeFork({ appendPrompt = false }: { appendPrompt?: boolean }) {
  return (
    <div className={`cf-safe ${appendPrompt ? "cf-safe-append" : ""}`} aria-hidden="true">
      <ParentSession compact />
      <svg className="cf-fork-lines" viewBox="0 0 760 260">
        <path className="cf-fork-rail" d="M78 58 H352 C446 58 446 198 562 198 H704" />
        <path className="cf-fork-trace" d="M78 58 H352 C446 58 446 198 562 198 H704" />
      </svg>
      <div className="cf-child-prefix">
        {prefixBlocks.map((block, index) => (
          <div className={`cf-mini-block cf-mini-block-${index + 1}`} key={block}>
            {block}
          </div>
        ))}
        <div className="cf-compaction-prompt">summary request</div>
      </div>
    </div>
  );
}

function BufferWindow() {
  return (
    <div className="cf-window" aria-hidden="true">
      <div className="cf-window-title">context window</div>
      <div className="cf-window-fill">
        {Array.from({ length: 11 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="cf-buffer">
        <strong>compaction buffer</strong>
        <span>summary prompt + summary output</span>
      </div>
    </div>
  );
}

export default function CacheSafeFork({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <section className="cf-scene cf-scene-wrong">
        <div className="cf-copy">
          <div className="cf-kicker">wrong compaction</div>
          <h2>单独发“请总结”，缓存从头断。</h2>
          <p>system prompt 不同，工具也不带，父会话前缀完全用不上。</p>
        </div>
        <WrongFork />
      </section>
    );
  }

  if (step === 1) {
    return (
      <section className="cf-scene cf-scene-safe">
        <div className="cf-copy">
          <div className="cf-kicker">cache-safe fork</div>
          <h2>正确做法，是复制父会话前缀。</h2>
          <p>同一套 system prompt、上下文、工具定义，先原样沿用。</p>
        </div>
        <SafeFork />
      </section>
    );
  }

  if (step === 2) {
    return (
      <section className="cf-scene cf-scene-append">
        <div className="cf-copy">
          <div className="cf-kicker">new tokens at the end</div>
          <h2>总结请求，只追加在末尾。</h2>
          <p>API 看到的前缀几乎一样，真正新增的是最后那段指令。</p>
        </div>
        <SafeFork appendPrompt />
      </section>
    );
  }

  if (step === 3) {
    return (
      <section className="cf-scene cf-scene-buffer">
        <div className="cf-copy cf-copy-wide">
          <div className="cf-kicker">future maintenance space</div>
          <h2>还要提前留 buffer。</h2>
          <p>上下文别塞到一滴不剩，要给总结指令和总结输出留位置。</p>
        </div>
        <BufferWindow />
      </section>
    );
  }

  return (
    <section className="cf-scene cf-scene-buffer">
      <div className="cf-copy cf-copy-wide">
        <div className="cf-kicker">future maintenance space</div>
        <h2>还要提前留 buffer。</h2>
        <p>上下文别塞到一滴不剩，要给总结指令和总结输出留位置。</p>
      </div>
      <BufferWindow />
    </section>
  );
}
