import type { ChapterStepProps } from "../../registry/types";
import "./FragilePrefix.css";

const toolOrders = [
  ["read", "search", "edit", "run"],
  ["search", "read", "run", "edit"],
];

const checklist = [
  { label: "时间", detail: "dynamic timestamp out of static prompt" },
  { label: "顺序", detail: "deterministic tool schema order" },
  { label: "参数", detail: "stable callable agent list" },
];

function StableGrid() {
  return (
    <div className="fp-blueprint" aria-hidden="true">
      <div className="fp-prefix-plate">
        <span>stable prefix</span>
        <strong>byte-for-byte repeatable</strong>
      </div>
      <div className="fp-grid-beam fp-grid-beam-a" />
      <div className="fp-grid-beam fp-grid-beam-b" />
      <div className="fp-grid-beam fp-grid-beam-c" />
    </div>
  );
}

function TimestampBreak() {
  return (
    <div className="fp-break-demo" aria-hidden="true">
      <div className="fp-static-zone">static system prompt</div>
      <div className="fp-timestamp">YYYY-MM-DD HH:mm:ss</div>
      <div className="fp-break-line" />
      <div className="fp-miss-field">cache miss after this byte range</div>
    </div>
  );
}

function ToolShuffle() {
  return (
    <div className="fp-shuffle" aria-hidden="true">
      {toolOrders.map((order, requestIndex) => (
        <div className={`fp-tool-row fp-tool-row-${requestIndex + 1}`} key={requestIndex}>
          <span>request {requestIndex + 1}</span>
          <div>
            {order.map((tool) => (
              <b key={`${requestIndex}-${tool}`}>{tool}</b>
            ))}
          </div>
        </div>
      ))}
      <svg className="fp-offset-lines" viewBox="0 0 760 230">
        <path d="M132 65 H628" />
        <path d="M132 165 H628" />
        <path className="fp-offset-cut" d="M330 35 V196" />
      </svg>
      <div className="fp-no-overlap">same meaning · different bytes</div>
    </div>
  );
}

function AgentListChange() {
  return (
    <div className="fp-agent-change" aria-hidden="true">
      <div className="fp-agent-box fp-agent-before">
        <span>agent enum</span>
        <b>planner</b>
        <b>coder</b>
      </div>
      <div className="fp-agent-box fp-agent-after">
        <span>agent enum</span>
        <b>planner</b>
        <b>coder</b>
        <b>reviewer</b>
      </div>
      <div className="fp-agent-delta">parameter changed</div>
      <div className="fp-agent-note">业务没大变，前缀字节已经变了</div>
    </div>
  );
}

function FragileChecklist() {
  return (
    <div className="fp-checklist" aria-hidden="true">
      {checklist.map((item, index) => (
        <div className={`fp-check fp-check-${index + 1}`} key={item.label}>
          <strong>{item.label}</strong>
          <span>{item.detail}</span>
        </div>
      ))}
    </div>
  );
}

export default function FragilePrefix({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <section className="fp-scene fp-scene-stable">
        <div className="fp-copy">
          <div className="fp-kicker">fragile by bytes</div>
          <h1>听起来不复杂，但它特别脆。</h1>
          <p>稳定前缀必须像蓝图一样，重复画出来还要完全重合。</p>
        </div>
        <StableGrid />
      </section>
    );
  }

  if (step === 1) {
    return (
      <section className="fp-scene fp-scene-time">
        <div className="fp-copy">
          <div className="fp-kicker">pitfall 01</div>
          <h2>时间戳别塞进静态区。</h2>
          <p>详细时间每轮都在变，它一进 system prompt，后面的缓存就跟着断。</p>
        </div>
        <TimestampBreak />
      </section>
    );
  }

  if (step === 2) {
    return (
      <section className="fp-scene fp-scene-order">
        <div className="fp-copy">
          <div className="fp-kicker">pitfall 02</div>
          <h2>工具顺序必须确定。</h2>
          <p>同一批工具如果随机换位，语义差不多，字节序列已经对不上。</p>
        </div>
        <ToolShuffle />
      </section>
    );
  }

  if (step === 3) {
    return (
      <section className="fp-scene fp-scene-agent">
        <div className="fp-copy">
          <div className="fp-kicker">pitfall 03</div>
          <h2>参数列表也是前缀。</h2>
          <p>可调用 agent 列表一变，工具 schema 的字节也变了。</p>
        </div>
        <AgentListChange />
      </section>
    );
  }

  return (
    <section className="fp-scene fp-scene-close">
      <div className="fp-final">
        <div className="fp-kicker">engineering checklist</div>
        <h2>别让小改动切开缓存。</h2>
        <p>稳定性要落到工程细节：时间、顺序、参数，都要可重复。</p>
      </div>
      <FragileChecklist />
    </section>
  );
}
