import type { ChapterStepProps } from "../../registry/types";
import "./Checklist.css";

const architectureNodes = ["stable prompt", "tools", "messages", "model", "forks"];

function ArchitectureBlueprint() {
  return (
    <div className="cl-architecture" aria-hidden="true">
      <svg viewBox="0 0 960 520">
        <path className="cl-arch-rail" d="M96 260 H280 C352 260 352 120 448 120 H820" />
        <path className="cl-arch-rail" d="M280 260 C352 260 352 400 448 400 H820" />
        <path className="cl-arch-trace cl-arch-trace-top" d="M96 260 H280 C352 260 352 120 448 120 H820" />
        <path className="cl-arch-trace cl-arch-trace-bottom" d="M280 260 C352 260 352 400 448 400 H820" />
        <circle className="cl-arch-node cl-arch-node-a" cx="96" cy="260" r="34" />
        <circle className="cl-arch-node cl-arch-node-b" cx="280" cy="260" r="34" />
        <circle className="cl-arch-node cl-arch-node-c" cx="448" cy="120" r="34" />
        <circle className="cl-arch-node cl-arch-node-d" cx="448" cy="400" r="34" />
        <circle className="cl-arch-node cl-arch-node-e" cx="820" cy="120" r="34" />
        <circle className="cl-arch-node cl-arch-node-f" cx="820" cy="400" r="34" />
      </svg>
      <div className="cl-node-label cl-node-label-a">prefix match</div>
      {architectureNodes.map((node, index) => (
        <div className={`cl-arch-card cl-arch-card-${index + 1}`} key={node}>
          {node}
        </div>
      ))}
    </div>
  );
}

function PromptCheck() {
  return (
    <div className="cl-check-panel cl-prompt-check" aria-hidden="true">
      <div className="cl-check-num hero-num">01</div>
      <div className="cl-prompt-box">
        <span>system prompt</span>
        <strong>timestamp</strong>
        <small>move dynamic state to messages</small>
      </div>
      <div className="cl-check-mark">check static prompt</div>
    </div>
  );
}

function ToolOrderCheck() {
  return (
    <div className="cl-check-panel cl-tool-check" aria-hidden="true">
      <div className="cl-check-num hero-num">02</div>
      <div className="cl-tool-columns">
        <div>
          <span>Read</span>
          <span>Search</span>
          <span>Edit</span>
          <span>Shell</span>
        </div>
        <div>
          <span>Read</span>
          <span>Search</span>
          <span>Edit</span>
          <span>Shell</span>
        </div>
      </div>
      <div className="cl-check-mark">same order every round</div>
    </div>
  );
}

function ForkCheck() {
  return (
    <div className="cl-check-panel cl-fork-check" aria-hidden="true">
      <div className="cl-check-num hero-num">03</div>
      <svg viewBox="0 0 720 320">
        <path className="cl-fork-rail" d="M78 98 H314 C412 98 412 224 520 224 H652" />
        <path className="cl-fork-trace" d="M78 98 H314 C412 98 412 224 520 224 H652" />
      </svg>
      <div className="cl-fork-parent">parent prefix</div>
      <div className="cl-fork-child">summary / skill execution</div>
      <div className="cl-check-mark">side tasks share prefix</div>
    </div>
  );
}

export default function Checklist({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <section className="cl-scene cl-scene-architecture">
        <div className="cl-copy">
          <div className="cl-kicker">agent caching blueprint</div>
          <h2>稳定性，是架构设计出来的。</h2>
          <p>不是打开一个缓存开关，而是让 prompt、工具、模型和侧向任务都服从前缀匹配。</p>
        </div>
        <ArchitectureBlueprint />
      </section>
    );
  }

  if (step === 1) {
    return (
      <section className="cl-scene cl-scene-prompt">
        <div className="cl-copy">
          <div className="cl-kicker">first check</div>
          <h2>静态 prompt 里，有没有时间戳？</h2>
          <p>动态状态走 message，不要随手改 system prompt。</p>
        </div>
        <PromptCheck />
      </section>
    );
  }

  if (step === 2) {
    return (
      <section className="cl-scene cl-scene-tools">
        <div className="cl-copy">
          <div className="cl-kicker">second check</div>
          <h2>工具定义顺序，是不是每轮一致？</h2>
          <p>工具和模型别中途乱换，状态切换用工具建模，工具加载用延迟发现。</p>
        </div>
        <ToolOrderCheck />
      </section>
    );
  }

  if (step === 3) {
    return (
      <section className="cl-scene cl-scene-fork">
        <div className="cl-copy">
          <div className="cl-kicker">third check</div>
          <h2>compaction 和 summary，有没有沿用父前缀？</h2>
          <p>侧向任务也要共享父会话前缀，缓存才不会在维护动作里失效。</p>
        </div>
        <ForkCheck />
      </section>
    );
  }

  return (
    <section className="cl-scene cl-scene-fork">
      <div className="cl-copy">
        <div className="cl-kicker">third check</div>
        <h2>compaction 和 summary，有没有沿用父前缀？</h2>
        <p>侧向任务也要共享父会话前缀，缓存才不会在维护动作里失效。</p>
      </div>
      <ForkCheck />
    </section>
  );
}
