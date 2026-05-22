import { motion } from "framer-motion";
import "./Summary.css";

interface SummaryProps {
  step: number;
}

const concepts = [
  { id: "LLM", label: "大脑" },
  { id: "Prompt", label: "指令" },
  { id: "Workflow", label: "流程" },
  { id: "Tool Use", label: "工具" },
  { id: "Agent", label: "员工" },
  { id: "AI Coding", label: "落地" },
];

const ladder = [
  "会提问",
  "会写 Prompt",
  "会设计 Workflow",
  "会使用工具",
  "会搭建 Agent",
  "会用 AI Coding 做项目",
];

export default function Summary({ step }: SummaryProps) {
  return (
    <div className="sum-stage">
      {/* Step 0: Intro */}
      {step === 0 && (
        <div className="sum-intro">
          <div className="sum-ch">最后</div>
          <div className="sum-text">总结一下。</div>
        </div>
      )}

      {/* Step 1: 6 concepts path - epic reveal */}
      {step === 1 && (
        <div className="sum-path">
          <div className="sum-label">6 个概念</div>
          <div className="sum-path-grid">
            {concepts.map((c, index) => (
              <motion.div
                key={index}
                className="sum-path-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="sum-path-id">{c.id}</div>
                <div className="sum-path-label">{c.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Capability ladder */}
      {step === 2 && (
        <div className="sum-ladder">
          <div className="sum-label">能力升级路径</div>
          <div className="sum-ladder-list">
            {ladder.map((item, index) => (
              <motion.div
                key={index}
                className="sum-ladder-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="sum-ladder-num">{index + 1}</div>
                <div className="sum-ladder-text">{item}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Final message */}
      {step === 3 && (
        <div className="sum-final">
          <div className="sum-final-text">这，才是 AI 时代真正值得掌握的能力路径。</div>
          <div className="sum-cta">开始你的 AI 之旅。</div>
        </div>
      )}
    </div>
  );
}
