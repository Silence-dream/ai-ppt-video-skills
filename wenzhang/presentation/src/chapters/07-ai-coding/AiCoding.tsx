import "./AiCoding.css";

interface Props {
  step: number;
}

/** 信息池（article §6）：
 * - 定义：用 AI 帮忙写代码做项目 (L112)
 * - 范围：看代码、写功能、修 bug、重构、写文档、部署 (L114)
 * - 工具：Cursor、Claude Code、Copilot (L116)
 * - 效率：以前写一周 → 现在一天出 Demo (L118)
 * - 升级路线：LLM → Prompt → Workflow → Tool Use → Agent → AI Coding (L126)
 */
export default function AiCoding({ step }: Props) {
  const tools = ["Cursor", "Claude Code", "Copilot"];
  const scope = ["看代码", "写功能", "修 bug", "重构", "写文档", "部署"];
  const concepts = ["LLM", "Prompt", "Workflow", "Tool Use", "Agent", "AI Coding"];

  return (
    <div className="ac-root">
      {/* step 0: AI Coding 标题 */}
      {step === 0 && (
        <div className="ac-hero-scene">
          <div className="ac-hero-eq">
            <span className="ac-hero-term">AI Coding</span>
            <span className="ac-hero-op">=</span>
            <span className="ac-hero-val">AI 帮你搞编程</span>
          </div>
          <p className="ac-hero-sub">用 AI 写代码、做项目</p>
        </div>
      )}

      {/* step 1: 开发范围 */}
      {step === 1 && (
        <div className="ac-scope-scene">
          <h2 className="ac-section-title">不只是写代码</h2>
          <div className="ac-scope-grid">
            {scope.map((s, i) => (
              <div className="ac-scope-item" key={s} style={{ animationDelay: `${i * 80}ms` }}>
                {s}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* step 2: 工具 + 效率对比 */}
      {step === 2 && (
        <div className="ac-tools-scene">
          <div className="ac-tools-list">
            {tools.map((t, i) => (
              <div className="ac-tool" key={t} style={{ animationDelay: `${i * 100}ms` }}>
                {t}
              </div>
            ))}
          </div>
          <div className="ac-compare">
            <div className="ac-compare-before">
              <span className="ac-compare-label">以前</span>
              <span className="ac-compare-time">一周</span>
            </div>
            <div className="ac-compare-arrow">→</div>
            <div className="ac-compare-after">
              <span className="ac-compare-label">现在</span>
              <span className="ac-compare-time ac-highlight">一天出 Demo</span>
            </div>
          </div>
        </div>
      )}

      {/* step 3: 升级路线图 */}
      {step === 3 && (
        <div className="ac-roadmap-scene">
          <h2 className="ac-section-title">你和 AI 一起升级的路线</h2>
          <div className="ac-roadmap">
            {concepts.map((c, i) => (
              <div className="ac-roadmap-item" key={c} style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`ac-roadmap-dot ${i === 5 ? "ac-roadmap-dot-active" : ""}`} />
                <span className={`ac-roadmap-name ${i === 5 ? "ac-roadmap-name-active" : ""}`}>{c}</span>
                {i < 5 && <div className="ac-roadmap-line" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* step 4: CTA */}
      {step === 4 && (
        <div className="ac-cta-scene">
          <h2 className="ac-cta-title">下次你用 AI</h2>
          <div className="ac-cta-steps">
            <div className="ac-cta-step" style={{ animationDelay: "100ms" }}>
              <span className="ac-cta-num">1</span>
              <span className="ac-cta-text">先给角色</span>
            </div>
            <div className="ac-cta-step" style={{ animationDelay: "300ms" }}>
              <span className="ac-cta-num">2</span>
              <span className="ac-cta-text">再拆流程</span>
            </div>
            <div className="ac-cta-step" style={{ animationDelay: "500ms" }}>
              <span className="ac-cta-num">3</span>
              <span className="ac-cta-text">让它调用工具</span>
            </div>
          </div>
          <p className="ac-cta-note">这才是进阶用法</p>
        </div>
      )}
    </div>
  );
}
