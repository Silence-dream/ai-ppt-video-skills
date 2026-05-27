import "./ToolUse.css";

interface Props {
  step: number;
}

/** 信息池（article §4）：
 * - 定义：工具调用 (L67)
 * - 弱点：纯 LLM 只能聊天不能干实事 (L69)
 * - 工具列表：查天气、读 Excel、运行代码、生成图片、浏览器、发邮件 (L71-L77)
 * - 例子：新加坡天气查询 (L80)
 * - 转变：从"只会说"到"可以做" (L82)
 */
export default function ToolUse({ step }: Props) {
  const tools = [
    { name: "查天气", icon: "☀" },
    { name: "读 Excel", icon: "📊" },
    { name: "运行代码", icon: "▶" },
    { name: "生成图片", icon: "🖼" },
    { name: "浏览器", icon: "🌐" },
    { name: "发邮件", icon: "✉" },
  ];

  return (
    <div className="tu-root">
      {/* step 0: Tool Use 标题 */}
      {step === 0 && (
        <div className="tu-hero-scene">
          <div className="tu-hero-eq">
            <span className="tu-hero-term">Tool Use</span>
            <span className="tu-hero-op">=</span>
            <span className="tu-hero-val">给 AI 装上手和眼睛</span>
          </div>
          <div className="tu-hero-icons">
            <span className="tu-icon-hand">✋</span>
            <span className="tu-icon-eye">👁</span>
          </div>
        </div>
      )}

      {/* step 1: 工具网格 */}
      {step === 1 && (
        <div className="tu-grid-scene">
          <h2 className="tu-section-title">给它工具，它全能干</h2>
          <div className="tu-grid">
            {tools.map((t, i) => (
              <div className="tu-card" key={t.name} style={{ animationDelay: `${i * 80}ms` }}>
                <div className="tu-card-icon">{t.icon}</div>
                <div className="tu-card-name">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* step 2: 演示——新加坡天气 */}
      {step === 2 && (
        <div className="tu-demo-scene">
          <div className="tu-demo">
            <div className="tu-demo-input">
              <span className="tu-demo-label">你问</span>
              <span className="tu-demo-text">新加坡现在天气咋样？</span>
            </div>
            <div className="tu-demo-arrow">→</div>
            <div className="tu-demo-tool">
              <span className="tu-demo-label">调用工具</span>
              <span className="tu-demo-text">天气 API</span>
            </div>
            <div className="tu-demo-arrow">→</div>
            <div className="tu-demo-output">
              <span className="tu-demo-label">AI 回复</span>
              <span className="tu-demo-text">真实数据</span>
            </div>
          </div>
          <p className="tu-demo-note">从"只会说"变成了"可以做"</p>
        </div>
      )}
    </div>
  );
}
