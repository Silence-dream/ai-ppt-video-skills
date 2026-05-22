import { motion } from "framer-motion";
import "./Coldopen.css";

interface ColdopenProps {
  step: number;
}

const concepts = ["LLM", "Prompt", "Workflow", "Tool Use", "Agent", "AI Coding"];

export default function Coldopen({ step }: ColdopenProps) {
  return (
    <div className="cd-stage">
      {/* Step 0: Strong hook question */}
      {step === 0 && (
        <div className="cd-hero">
          <motion.div
            className="cd-question"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            你以为会用 ChatGPT
          </motion.div>
          <motion.div
            className="cd-question cd-question-emphasis"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            就懂 AI 了？
          </motion.div>
        </div>
      )}

      {/* Step 1: Gap reveal with impact */}
      {step === 1 && (
        <div className="cd-gap">
          <motion.div
            className="cd-gap-text"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            真正拉开差距的，
          </motion.div>
          <motion.div
            className="cd-gap-highlight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            不是模型，
          </motion.div>
          <motion.div
            className="cd-gap-highlight cd-gap-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            而是这 6 个概念。
          </motion.div>
        </div>
      )}

      {/* Step 2: 6 concepts emerge */}
      {step === 2 && (
        <div className="cd-concepts">
          <div className="cd-concepts-title">能力路径</div>
          <div className="cd-concepts-grid">
            {concepts.map((concept, index) => (
              <motion.div
                key={index}
                className="cd-concept-node"
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {concept}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Path visualization with connection lines */}
      {step === 3 && (
        <div className="cd-path">
          <div className="cd-path-title">掌握它们，你才能真正驾驭 AI</div>
          <div className="cd-path-chain">
            {concepts.map((concept, index) => (
              <div key={index} className="cd-path-item">
                <motion.div
                  className="cd-path-node"
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {concept}
                </motion.div>
                {index < concepts.length - 1 && (
                  <motion.div
                    className="cd-path-arrow"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  >
                    →
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Transition to LLM */}
      {step === 4 && (
        <div className="cd-transition">
          <div className="cd-transition-label">先从最底层开始</div>
          <motion.div
            className="cd-transition-main"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            LLM
          </motion.div>
          <div className="cd-transition-sub">AI 的底层大脑</div>
        </div>
      )}
    </div>
  );
}
