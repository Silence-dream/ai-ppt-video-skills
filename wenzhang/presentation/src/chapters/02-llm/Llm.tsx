import "./Llm.css";

interface Props {
  step: number;
}

/** 信息池（article §1）：
 * - 定义：Large Language Model，大语言模型 (L15-L17)
 * - 工具列举：ChatGPT、Claude、Gemini、DeepSeek、通义千问、Llama (L19)
 * - 能力：聊天、写东西、翻译、想问题、写代码 (L17)
 * - 弱点：指令不清就答非所问 (L23)
 */
export default function Llm({ step }: Props) {
  const tools = ["ChatGPT", "Claude", "Gemini", "DeepSeek", "通义千问", "Llama"];
  const abilities = ["聊天", "写东西", "翻译", "想问题", "写代码"];

  return (
    <div className="lm-root">
      {/* step 0: LLM = AI 的大脑 */}
      {step === 0 && (
        <div className="lm-hero-scene">
          <div className="lm-hero-eq">
            <span className="lm-hero-term">LLM</span>
            <span className="lm-hero-op">=</span>
            <span className="lm-hero-val">AI 的大脑</span>
          </div>
          <p className="lm-hero-full">Large Language Model</p>
          <div className="lm-keywords">
            {abilities.map((a, i) => (
              <span className="lm-kw" key={a} style={{ animationDelay: `${i * 120}ms` }}>
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* step 1: 能力关键词云 */}
      {step === 1 && (
        <div className="lm-ability-scene">
          <h2 className="lm-section-title">它能做什么</h2>
          <div className="lm-ability-grid">
            {abilities.map((a, i) => (
              <div className="lm-ability-card" key={a} style={{ animationDelay: `${i * 100}ms` }}>
                <div className="lm-ability-icon">✦</div>
                <div className="lm-ability-text">{a}</div>
              </div>
            ))}
          </div>
          <p className="lm-ability-note">用海量的文字、代码、知识训练出来的</p>
        </div>
      )}

      {/* step 2: 六个工具列表 */}
      {step === 2 && (
        <div className="lm-tools-scene">
          <h2 className="lm-section-title">常见的 LLM</h2>
          <div className="lm-tools-list">
            {tools.map((t, i) => (
              <div className="lm-tool-item" key={t} style={{ animationDelay: `${i * 100}ms` }}>
                <span className="lm-tool-num">{i + 1}</span>
                <span className="lm-tool-name">{t}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* step 3: 优势 */}
      {step === 3 && (
        <div className="lm-strength-scene">
          <div className="lm-strength-card">
            <div className="lm-strength-label">你给点输入</div>
            <div className="lm-strength-arrow">→</div>
            <div className="lm-strength-result">它理解意思，给你还不错的回复</div>
          </div>
        </div>
      )}

      {/* step 4: 弱点对比 */}
      {step === 4 && (
        <div className="lm-weakness-scene">
          <div className="lm-vs">
            <div className="lm-vs-good">
              <span className="lm-vs-label">指令清楚</span>
              <span className="lm-vs-icon">✓</span>
              <span className="lm-vs-desc">聪明回复</span>
            </div>
            <div className="lm-vs-divider" />
            <div className="lm-vs-bad">
              <span className="lm-vs-label">指令模糊</span>
              <span className="lm-vs-icon">✗</span>
              <span className="lm-vs-desc">答非所问</span>
            </div>
          </div>
          <p className="lm-weakness-hint">光有大脑还不够，你还得会指挥它</p>
        </div>
      )}
    </div>
  );
}
