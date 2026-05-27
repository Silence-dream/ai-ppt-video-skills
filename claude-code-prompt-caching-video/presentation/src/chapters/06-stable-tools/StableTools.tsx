import type { ChapterStepProps } from "../../registry/types";
import "./StableTools.css";

const tools = ["Read", "Grep", "Bash", "Edit", "Write", "Plan"];
const planTools = ["EnterPlanMode", "ExitPlanMode"];

function ToolPrefix() {
  return (
    <div className="st-prefix" aria-hidden="true">
      <div className="st-prefix-label">cached prefix</div>
      <div className="st-tool-grid">
        {tools.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
      <div className="st-brace" />
      <div className="st-warning">do not add / remove mid-session</div>
    </div>
  );
}

function BrokenPlanMode() {
  return (
    <div className="st-broken" aria-hidden="true">
      <div className="st-toolset st-toolset--before">
        <strong>normal tools</strong>
        {tools.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
      <svg className="st-break-svg" viewBox="0 0 300 260" role="img">
        <path className="st-break-line" d="M30 130 H270" />
        <path className="st-zig" d="M136 62 L110 118 L152 118 L124 198" />
      </svg>
      <div className="st-toolset st-toolset--after">
        <strong>plan mode intuition</strong>
        {["Read", "Grep", "Bash"].map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
      <div className="st-miss">cache shattered</div>
    </div>
  );
}

function StablePlanTools() {
  return (
    <div className="st-stable" aria-hidden="true">
      <div className="st-tool-grid st-tool-grid--stable">
        {tools.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
      <div className="st-plan-cards">
        {planTools.map((tool) => (
          <div className="st-plan-card" key={tool}>
            <span>tool call</span>
            <strong>{tool}</strong>
          </div>
        ))}
      </div>
      <div className="st-cache-band">same tool definitions remain cached</div>
    </div>
  );
}

function MessageLimit() {
  return (
    <div className="st-message-limit" aria-hidden="true">
      <div className="st-tool-grid st-tool-grid--locked">
        {tools.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
      <div className="st-policy-message">
        <span>message layer</span>
        <code>
          now: explore only
          <br />
          edit files: disabled
          <br />
          exit after plan
        </code>
      </div>
      <svg className="st-loop-svg" viewBox="0 0 720 190" role="img">
        <path className="st-loop-path" d="M42 95 H264 C350 95 350 34 446 34 H678" />
        <path className="st-loop-path st-loop-path--bottom" d="M42 95 H264 C350 95 350 156 446 156 H678" />
      </svg>
    </div>
  );
}

export default function StableTools({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <section className="st-scene st-scene-prefix">
        <div className="st-copy">
          <div className="st-kicker">tool definitions are prefix</div>
          <h2>工具也别中途增删。</h2>
          <p>工具定义属于缓存前缀；加一个或删一个，前面那段就不再相同。</p>
        </div>
        <ToolPrefix />
      </section>
    );
  }

  if (step === 1) {
    return (
      <section className="st-scene st-scene-broken">
        <div className="st-copy">
          <div className="st-kicker">the tempting wrong move</div>
          <h2>Plan Mode 里拿掉编辑工具？缓存会碎。</h2>
          <p>只留只读工具听起来合理，但工具集一变，缓存前缀就被切断。</p>
        </div>
        <BrokenPlanMode />
      </section>
    );
  }

  if (step === 2) {
    return (
      <section className="st-scene st-scene-stable">
        <div className="st-copy st-copy-wide">
          <div className="st-kicker">Claude Code shape</div>
          <h2>进入和退出，本身就是工具。</h2>
          <p>EnterPlanMode / ExitPlanMode 留在同一套工具定义里，状态切换不靠换工具集。</p>
        </div>
        <StablePlanTools />
      </section>
    );
  }

  return (
    <section className="st-scene st-scene-message">
      <div className="st-copy st-copy-wide">
        <div className="st-kicker">state through messages</div>
        <h2>限制用消息告诉模型。</h2>
        <p>现在只能探索、不能改文件、计划完成再退出；工具集仍然保持同一份。</p>
      </div>
      <MessageLimit />
    </section>
  );
}
