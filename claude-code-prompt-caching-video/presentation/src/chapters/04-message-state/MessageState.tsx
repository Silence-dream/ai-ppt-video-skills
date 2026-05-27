import type { ChapterStepProps } from "../../registry/types";
import "./MessageState.css";

const dynamicEvents = [
  { label: "time changed", detail: "now / timezone / clock" },
  { label: "file edited", detail: "user changed project files" },
  { label: "state update", detail: "current task status" },
];

function PrefixLock() {
  return (
    <div className="ms-prefix-lock" aria-hidden="true">
      <div className="ms-prefix-bracket" />
      <div className="ms-prefix-block">
        <span>system prompt</span>
        <span>tool definitions</span>
        <span>CLAUDE.md</span>
      </div>
      <div className="ms-seal">
        <strong>stable prefix</strong>
        <span>do not rewrite</span>
      </div>
      <svg className="ms-lock-svg" viewBox="0 0 220 220" role="img">
        <path className="ms-lock-shackle" d="M70 100 V78 C70 49 88 31 110 31 C132 31 150 49 150 78 V100" />
        <rect className="ms-lock-body" x="52" y="96" width="116" height="88" />
        <path className="ms-lock-key" d="M110 126 V154" />
      </svg>
    </div>
  );
}

function MessageLane({ reminder = false }: { reminder?: boolean }) {
  return (
    <div className={`ms-lane ${reminder ? "ms-lane--reminder" : ""}`} aria-hidden="true">
      <div className="ms-lane-rail" />
      <div className="ms-lane-label">message lane</div>
      {dynamicEvents.map((event, index) => (
        <div className={`ms-event ms-event-${index + 1}`} key={event.label}>
          <span>{event.label}</span>
          <small>{event.detail}</small>
        </div>
      ))}
      <div className="ms-message">
        <span>next user message</span>
        {reminder ? (
          <code>
            &lt;system-reminder&gt;
            <br />
            state changed
            <br />
            &lt;/system-reminder&gt;
          </code>
        ) : (
          <code>updates attach here</code>
        )}
      </div>
    </div>
  );
}

function CacheCompare() {
  return (
    <div className="ms-compare" aria-hidden="true">
      <div className="ms-path ms-path--miss">
        <div className="ms-path-title">rewrite system prompt</div>
        <div className="ms-stack">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="ms-fracture" />
        <strong>cache miss</strong>
      </div>
      <div className="ms-path ms-path--hit">
        <div className="ms-path-title">send message update</div>
        <div className="ms-stack">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="ms-hit-line" />
        <strong>cache hit</strong>
      </div>
    </div>
  );
}

export default function MessageState({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <section className="ms-scene ms-scene-lock">
        <div className="ms-copy">
          <div className="ms-kicker">dynamic state rule</div>
          <h2>别急着改 system prompt。</h2>
          <p>稳定前缀先锁住；时间、文件、状态这些变化，留给后面的消息层。</p>
        </div>
        <PrefixLock />
      </section>
    );
  }

  if (step === 1) {
    return (
      <section className="ms-scene ms-scene-lane">
        <div className="ms-copy">
          <div className="ms-kicker">state moves last</div>
          <h2>动态信息，从底部进 message。</h2>
          <p>时间变化、用户改文件、当前状态更新，都不用重写已经可复用的前缀。</p>
        </div>
        <MessageLane />
      </section>
    );
  }

  if (step === 2) {
    return (
      <section className="ms-scene ms-scene-reminder">
        <div className="ms-copy">
          <div className="ms-kicker">system-reminder pattern</div>
          <h2>新情况贴到下一轮。</h2>
          <p>Claude Code 用类似标签的轻量提示，让模型看见更新，但不移动前缀。</p>
        </div>
        <MessageLane reminder />
      </section>
    );
  }

  return (
    <section className="ms-scene ms-scene-compare">
      <div className="ms-copy ms-copy-wide">
        <div className="ms-kicker">same information / different layer</div>
        <h2>改 prompt 是 miss，发 message 是 hit。</h2>
        <p>原则很简单：状态变化尽量走消息层，稳定前缀继续命中。</p>
      </div>
      <CacheCompare />
    </section>
  );
}
