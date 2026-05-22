import { motion } from "framer-motion";
import "./Prompt.css";

interface PromptProps {
  step: number;
}

const elements = [
  { num: "01", title: "角色", desc: "你是谁" },
  { num: "02", title: "任务", desc: "要做什么" },
  { num: "03", title: "格式", desc: "输出形式" },
  { num: "04", title: "示例", desc: "参考样例" },
  { num: "05", title: "约束", desc: "限制条件" },
];

export default function Prompt({ step }: PromptProps) {
  return (
    <div className="prompt-stage">
      {/* Step 0: Title */}
      {step === 0 && (
        <div className="prompt-hero">
          <div className="prompt-label">第二章</div>
          <div className="prompt-title">Prompt</div>
          <div className="prompt-subtitle">提示词 · 指令工程</div>
          <div className="prompt-hero-icon">📝</div>
        </div>
      )}

      {/* Step 1: Definition */}
      {step === 1 && (
        <div className="prompt-def">
          <div className="prompt-text">Prompt，就是你对 AI 的指令。</div>
          <div className="prompt-desc">写得好，AI 就懂你；写不好，AI 就迷茫。</div>
        </div>
      )}

      {/* Step 2: 5 elements */}
      {step === 2 && (
        <div className="prompt-elements">
          <div className="prompt-label">优秀 Prompt 的 5 个要素</div>
          <div className="prompt-elem-grid">
            {elements.map((el, index) => (
              <motion.div
                key={index}
                className="prompt-elem-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="prompt-elem-num">{el.num}</div>
                <div className="prompt-elem-title">{el.title}</div>
                <div className="prompt-elem-desc">{el.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Vague prompt example */}
      {step === 3 && (
        <div className="prompt-example ordinary">
          <div className="prompt-label">普通 Prompt</div>
          <div className="prompt-example-text">帮我写一篇关于 AI 的文章。</div>
          <div className="prompt-result">范围太宽，AI 只能自由发挥。</div>
        </div>
      )}

      {/* Step 4: Optimized prompt start */}
      {step === 4 && (
        <div className="prompt-example optimized">
          <div className="prompt-label">优化 Prompt</div>
          <div className="prompt-example-text">
            你是一名 AI 产品科普作者，请用通俗易懂的语言，面向刚入门的普通用户。
          </div>
        </div>
      )}

      {/* Step 5: Full optimized + result */}
      {step === 5 && (
        <div className="prompt-example optimized full">
          <div className="prompt-label">优化 Prompt</div>
          <div className="prompt-example-text">
            写一篇介绍 LLM、Prompt、Workflow、Agent 的文章。
            <br />
            要求：结构清晰、少用术语、多举例子、适合发在 X 平台。
          </div>
          <div className="prompt-result success">这个 Prompt 就清楚很多。</div>
        </div>
      )}

      {/* Step 6: Final insight */}
      {step === 6 && (
        <div className="prompt-insight">
          <div className="prompt-insight-text">Prompt 的核心，不是写得复杂，</div>
          <div className="prompt-insight-highlight">而是表达清楚你的真实需求。</div>
        </div>
      )}
    </div>
  );
}
