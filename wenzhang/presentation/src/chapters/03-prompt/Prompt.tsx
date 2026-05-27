import "./Prompt.css";

interface Props {
  step: number;
}

/** 信息池（article §2）：
 * - 定义：提示词，你跟 AI 说话的方式 (L29)
 * - 反例：普通 Prompt"帮我写篇 AI 的文章" (L32)
 * - 正例：进阶 Prompt 设定角色+受众+风格+平台 (L35-L36)
 * - 关系：LLM 是大脑，Prompt 是指令 (L40)
 */
export default function Prompt({ step }: Props) {
  return (
    <div className="pr-root">
      {/* step 0: Prompt = 你对 AI 说的话 */}
      {step === 0 && (
        <div className="pr-hero-scene">
          <div className="pr-hero-eq">
            <span className="pr-hero-term">Prompt</span>
            <span className="pr-hero-op">=</span>
            <span className="pr-hero-val">你对 AI 说的话</span>
          </div>
          <div className="pr-bubble">
            <div className="pr-bubble-icon">💬</div>
            <p className="pr-bubble-text">你说得越清楚，AI 越听话</p>
          </div>
        </div>
      )}

      {/* step 1: 反例 */}
      {step === 1 && (
        <div className="pr-bad-scene">
          <h2 className="pr-section-title">普通 Prompt</h2>
          <div className="pr-card pr-card-bad">
            <p className="pr-card-text">帮我写篇 AI 的文章</p>
            <span className="pr-card-verdict">效果很一般</span>
          </div>
        </div>
      )}

      {/* step 2: 正例 */}
      {step === 2 && (
        <div className="pr-good-scene">
          <h2 className="pr-section-title">进阶 Prompt</h2>
          <div className="pr-card pr-card-good">
            <div className="pr-role">角色：会讲故事的 AI 科普博主</div>
            <div className="pr-role">受众：完全没基础的小白</div>
            <div className="pr-role">风格：最接地气的话</div>
            <div className="pr-role">要求：轻松好懂</div>
            <span className="pr-card-verdict pr-verdict-good">效果好太多了</span>
          </div>
        </div>
      )}

      {/* step 3: 公式总结 */}
      {step === 3 && (
        <div className="pr-formula-scene">
          <div className="pr-formula">
            <span className="pr-f-part">LLM（大脑）</span>
            <span className="pr-f-op">+</span>
            <span className="pr-f-part pr-f-accent">Prompt（指令）</span>
            <span className="pr-f-op">=</span>
            <span className="pr-f-part">好结果</span>
          </div>
        </div>
      )}
    </div>
  );
}
