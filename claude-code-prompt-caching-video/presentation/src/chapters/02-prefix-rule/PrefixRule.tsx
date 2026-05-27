import type { ChapterStepProps } from "../../registry/types";
import "./PrefixRule.css";

const prefixBlocks = [
  { key: "system", label: "system + tools", scope: "global" },
  { key: "project", label: "CLAUDE.md", scope: "project" },
  { key: "session", label: "session context", scope: "session" },
  { key: "messages", label: "messages", scope: "turn" },
];

const scopeRings = [
  { label: "全局共享", detail: "static prompt / tools" },
  { label: "项目共享", detail: "CLAUDE.md" },
  { label: "会话共享", detail: "session context" },
];

function PrefixTimeline({ mode }: { mode: "scan" | "breakpoint" | "miss" }) {
  return (
    <div className={`pr-timeline pr-timeline--${mode}`} aria-hidden="true">
      <div className="pr-origin">request start</div>
      <div className="pr-track">
        {prefixBlocks.map((block, index) => (
          <div className={`pr-segment pr-segment-${index + 1}`} key={block.key}>
            <span>{block.label}</span>
            <small>{block.scope}</small>
          </div>
        ))}
        <div className="pr-scan-line" />
        <div className="pr-breakpoint">
          <span>cache_control</span>
        </div>
        <div className="pr-change-point">
          <span>1 byte changed</span>
        </div>
        <div className="pr-miss-slab">miss zone</div>
      </div>
      <div className="pr-axis">
        <span>match from byte 0</span>
        <span>reuse until mismatch</span>
      </div>
    </div>
  );
}

function LayerStack() {
  return (
    <div className="pr-layer-stack" aria-hidden="true">
      {prefixBlocks.map((block, index) => (
        <div className={`pr-layer pr-layer-${index + 1}`} key={block.key}>
          <div className="pr-layer-index">0{index + 1}</div>
          <div>
            <strong>{block.label}</strong>
            <span>{block.scope === "turn" ? "changes every turn" : `${block.scope} cache surface`}</span>
          </div>
        </div>
      ))}
      <div className="pr-layer-arrow">stable first → dynamic last</div>
    </div>
  );
}

function ScopeMap() {
  return (
    <div className="pr-scope-map" aria-hidden="true">
      {scopeRings.map((scope, index) => (
        <div className={`pr-scope-ring pr-scope-ring-${index + 1}`} key={scope.label}>
          <strong>{scope.label}</strong>
          <span>{scope.detail}</span>
        </div>
      ))}
      <div className="pr-scope-core">messages stay at the edge</div>
    </div>
  );
}

export default function PrefixRule({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <section className="pr-scene pr-scene-scan">
        <div className="pr-copy">
          <div className="pr-kicker">prefix matching</div>
          <h1>从请求开头开始对。</h1>
          <p>缓存不是看“差不多”，而是按前缀字节一路向右匹配。</p>
        </div>
        <PrefixTimeline mode="scan" />
      </section>
    );
  }

  if (step === 1) {
    return (
      <section className="pr-scene pr-scene-breakpoint">
        <div className="pr-copy pr-copy-wide">
          <div className="pr-kicker">cache breakpoint</div>
          <h2>对到 cache_control。</h2>
          <p>断点像一把垂直刻尺，告诉 API 哪些前缀可以作为缓存边界。</p>
        </div>
        <PrefixTimeline mode="breakpoint" />
      </section>
    );
  }

  if (step === 2) {
    return (
      <section className="pr-scene pr-scene-miss">
        <div className="pr-copy">
          <div className="pr-kicker">single mismatch</div>
          <h2>中间一变，后面全断。</h2>
          <p>变化点之前还能命中；变化点之后，旧缓存不能继续复用。</p>
        </div>
        <PrefixTimeline mode="miss" />
      </section>
    );
  }

  if (step === 3) {
    return (
      <section className="pr-scene pr-scene-layers">
        <div className="pr-copy">
          <div className="pr-kicker">Claude Code order</div>
          <h2>结构本身在保缓存。</h2>
          <p>静态定义、项目文件、会话上下文、消息，被排成从稳到动的顺序。</p>
        </div>
        <LayerStack />
      </section>
    );
  }

  if (step === 4) {
    return (
      <section className="pr-scene pr-scene-scope">
        <div className="pr-copy">
          <div className="pr-kicker">sharing radius</div>
          <h2>共享范围一层层缩小。</h2>
          <p>不同会话先共享全局前缀，同项目再共享项目层，同会话继续共享上下文。</p>
        </div>
        <ScopeMap />
      </section>
    );
  }

  return (
    <section className="pr-scene pr-scene-close">
      <div className="pr-final-rule">
        <div className="pr-kicker">ordering rule</div>
        <h2>稳定的放前面。</h2>
        <h2 className="pr-final-accent">会变的放后面。</h2>
      </div>
      <div className="pr-rule-board" aria-hidden="true">
        <div>static</div>
        <div>shared</div>
        <div>session</div>
        <div>dynamic</div>
      </div>
    </section>
  );
}
