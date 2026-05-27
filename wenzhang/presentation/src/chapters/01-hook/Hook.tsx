import "./Hook.css";

interface Props {
  step: number;
}

/** 信息池（article §开场）：
 * - 对比：大部分人"问问题" vs 真正懂 AI 怎么工作 (L5-L6)
 * - 列举：LLM → Prompt → Workflow → Tool Use → Agent → AI Coding (L9)
 * - 工具名：ChatGPT、Claude、Gemini (L5)
 */
export default function Hook({ step }: Props) {
  return (
    <div className="hk-root">
      {/* step 0: 大标题钩子 */}
      {step === 0 && (
        <div className="hk-title-scene">
          <svg className="hk-hero-visual" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 大脑轮廓 */}
            <path
              d="M120 180c-50 0-85-30-85-70 0-25 15-45 35-55 5-25 25-45 50-45s45 20 50 45c20 10 35 30 35 55 0 40-35 70-85 70z"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
            {/* 大脑纹路 */}
            <path d="M120 180V95" stroke="var(--accent)" strokeWidth="2" opacity="0.4" />
            <path d="M120 95c-20-15-40-10-50 5" stroke="var(--accent)" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
            <path d="M120 95c20-15 40-10 50 5" stroke="var(--accent)" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
            <path d="M120 120c-25-5-45 5-50 20" stroke="var(--accent)" strokeWidth="1.5" opacity="0.25" strokeLinecap="round" />
            <path d="M120 120c25-5 45 5 50 20" stroke="var(--accent)" strokeWidth="1.5" opacity="0.25" strokeLinecap="round" />
            {/* 神经节点 */}
            <circle cx="75" cy="100" r="4" fill="var(--accent)" opacity="0.5" />
            <circle cx="165" cy="100" r="4" fill="var(--accent)" opacity="0.5" />
            <circle cx="90" cy="135" r="3" fill="var(--accent)" opacity="0.4" />
            <circle cx="150" cy="135" r="3" fill="var(--accent)" opacity="0.4" />
            <circle cx="120" cy="75" r="4" fill="var(--accent)" opacity="0.5" />
            {/* 问号 */}
            <text
              x="120"
              y="60"
              textAnchor="middle"
              fontFamily="var(--font-display-en)"
              fontSize="48"
              fontWeight="700"
              fontStyle="italic"
              fill="var(--accent)"
              opacity="0.85"
            >?</text>
          </svg>
          <h1 className="hk-hero">你真的懂 AI 吗？</h1>
          <p className="hk-sub">每天都在用，但可能根本没用明白</p>
        </div>
      )}

      {/* step 1: 对比——问问题 vs 懂原理 */}
      {step === 1 && (
        <div className="hk-vs-scene">
          <div className="hk-vs-left">
            <span className="hk-vs-label">大多数人</span>
            <span className="hk-vs-text hk-strike">打开 ChatGPT 问问题</span>
          </div>
          <div className="hk-vs-divider" />
          <div className="hk-vs-right">
            <span className="hk-vs-label">真正拉开差距</span>
            <span className="hk-vs-text hk-highlight">懂 AI 是怎么干活的</span>
          </div>
        </div>
      )}

      {/* step 2: 六个概念升级路线 */}
      {step === 2 && (
        <div className="hk-roadmap-scene">
          <h2 className="hk-roadmap-title">6 个核心概念，一条升级路线</h2>
          <div className="hk-roadmap">
            {["LLM", "Prompt", "Workflow", "Tool Use", "Agent", "AI Coding"].map(
              (name, i) => (
                <div className="hk-roadmap-item" key={name}>
                  <div className="hk-roadmap-num">{i + 1}</div>
                  <div className="hk-roadmap-name">{name}</div>
                  {i < 5 && <div className="hk-roadmap-arrow">→</div>}
                </div>
              )
            )}
          </div>
          <p className="hk-roadmap-hint">从大脑到指令，到流程，到工具，到智能体，到真正做事</p>
        </div>
      )}
    </div>
  );
}
