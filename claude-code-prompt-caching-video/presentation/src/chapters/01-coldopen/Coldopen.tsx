import type { ChapterStepProps } from "../../registry/types";
import "./Coldopen.css";

const pillars = ["成本", "延迟", "体验"];
const signals = ["prefix reuse", "cache hit rate", "long session"];
const harnessLayers = [
  "system prompt",
  "tool definitions",
  "CLAUDE.md",
  "session context",
  "messages",
];

function FoundationDiagram({ step }: { step: number }) {
  return (
    <div className={`co-foundation co-foundation--s${step}`} aria-hidden="true">
      <div className="co-beam co-beam-top" />
      <div className="co-product">agent product</div>
      <div className="co-joist co-joist-a" />
      <div className="co-joist co-joist-b" />
      <div className="co-joist co-joist-c" />
      <div className="co-cache-base">
        <span>prompt caching</span>
      </div>
      {pillars.map((pillar, index) => (
        <div className={`co-pillar co-pillar-${index + 1}`} key={pillar}>
          <span>{pillar}</span>
        </div>
      ))}
      <div className="co-stress co-stress-a" />
      <div className="co-stress co-stress-b" />
      <div className="co-stress co-stress-c" />
    </div>
  );
}

function ReuseLoop() {
  return (
    <div className="co-loop" aria-hidden="true">
      <svg viewBox="0 0 680 360" role="img">
        <path className="co-loop-rail" d="M92 178 H280 C350 178 350 78 430 78 H586" />
        <path className="co-loop-rail co-loop-rail-bottom" d="M92 178 H280 C350 178 350 278 430 278 H586" />
        <path className="co-loop-trace" d="M92 178 H280 C350 178 350 78 430 78 H586" />
        <path className="co-loop-trace co-loop-trace-delay" d="M92 178 H280 C350 178 350 278 430 278 H586" />
        <circle className="co-node co-node-a" cx="92" cy="178" r="32" />
        <circle className="co-node co-node-b" cx="280" cy="178" r="32" />
        <circle className="co-node co-node-c" cx="430" cy="78" r="32" />
        <circle className="co-node co-node-d" cx="430" cy="278" r="32" />
        <circle className="co-node co-node-e" cx="586" cy="78" r="32" />
        <circle className="co-node co-node-f" cx="586" cy="278" r="32" />
      </svg>
      <div className="co-loop-label co-loop-label-a">request prefix</div>
      <div className="co-loop-label co-loop-label-b">cached compute</div>
      <div className="co-loop-label co-loop-label-c">lower latency</div>
      <div className="co-loop-label co-loop-label-d">lower cost</div>
    </div>
  );
}

function AlertPanel() {
  return (
    <div className="co-alert">
      <div className="co-alert-title">cache health monitor</div>
      <div className="co-alert-line">
        <span>prompt cache hit rate</span>
        <strong>alerting</strong>
      </div>
      <div className="co-alert-meter">
        <div className="co-alert-meter-fill" />
        <div className="co-alert-threshold" />
      </div>
      <div className="co-alert-grid">
        <span>cost pressure</span>
        <span>latency pressure</span>
        <span>rate-limit pressure</span>
      </div>
      <div className="co-alert-stamp">treated like production reliability</div>
    </div>
  );
}

function HarnessFlow() {
  return (
    <div className="co-harness-flow" aria-hidden="true">
      <div className="co-harness-spine" />
      {harnessLayers.map((layer, index) => (
        <div className={`co-harness-layer co-harness-layer-${index + 1}`} key={layer}>
          <span>{layer}</span>
          <small>
            {index < 3 ? "stable prefix" : index === 3 ? "session scope" : "changes last"}
          </small>
        </div>
      ))}
      <div className="co-harness-cache">
        <strong>cache reuse zone</strong>
        <span>more shared content stays in front</span>
      </div>
    </div>
  );
}

export default function Coldopen({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <section className="co-scene co-scene-intro">
        <h1>
          Prompt caching
          <span>不是省钱小技巧</span>
        </h1>
        <FoundationDiagram step={0} />
      </section>
    );
  }

  if (step === 1) {
    return (
      <section className="co-scene co-scene-reuse">
        <div className="co-copy">
          <div className="co-kicker">long-running agent</div>
          <h2>同一段前缀，别重复算。</h2>
          <p>长会话能跑得稳，靠的是把已经算过的前缀继续复用。</p>
        </div>
        <ReuseLoop />
        <div className="co-signal-row">
          {signals.map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
        </div>
      </section>
    );
  }

  if (step === 2) {
    return (
      <section className="co-scene co-scene-harness">
        <div className="co-copy co-copy-wide">
          <div className="co-kicker">not a switch / a harness</div>
          <h2>重点不是“开了缓存”。</h2>
          <p>真正的约束是：整个 agent harness 都要围着缓存命中设计。</p>
        </div>
        <HarnessFlow />
      </section>
    );
  }

  if (step === 3) {
    return (
      <section className="co-scene co-scene-alert">
        <div className="co-copy">
          <div className="co-kicker">cache hit rate</div>
          <h2>命中率低了，就该报警。</h2>
          <p>文章里把缓存命中率当生产指标看，不是当调参小项看。</p>
        </div>
        <AlertPanel />
      </section>
    );
  }

  return (
    <section className="co-scene co-scene-close">
      <FoundationDiagram step={4} />
      <div className="co-final">
        <div className="co-kicker">architecture constraint</div>
        <h2>agent 一跑长，缓存就是地基。</h2>
        <p>几百分点的 miss，会同时变成成本、延迟和用户等待。</p>
      </div>
    </section>
  );
}
