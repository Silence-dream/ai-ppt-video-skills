import { motion } from "framer-motion";
import "./LLM.css";

interface LLMProps {
  step: number;
}

const capabilities = ["理解", "生成", "总结", "翻译", "推理", "写代码"];
const products = ["ChatGPT", "Claude", "Gemini", "DeepSeek", "Qwen", "Llama"];

export default function LLM({ step }: LLMProps) {
  return (
    <div className="llm-stage">
      {/* Step 0: Neural network hero */}
      {step === 0 && (
        <div className="llm-hero">
          <div className="llm-label">第一章</div>
          <div className="llm-title">LLM</div>
          <div className="llm-subtitle">Large Language Model · 大语言模型</div>

          {/* Enhanced neural network with pulse animation */}
          <div className="llm-brain">
            <svg viewBox="0 0 300 300" className="llm-brain-svg">
              {/* Connection lines */}
              <g className="llm-connections">
                <line x1="80" y1="80" x2="150" y2="150" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" />
                <line x1="220" y1="80" x2="150" y2="150" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" />
                <line x1="80" y1="220" x2="150" y2="150" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" />
                <line x1="220" y1="220" x2="150" y2="150" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" />
                <line x1="150" y1="60" x2="150" y2="150" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" />
                <line x1="150" y1="240" x2="150" y2="150" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" />
              </g>

              {/* Nodes with pulse animation */}
              {[
                { x: 80, y: 80 },
                { x: 220, y: 80 },
                { x: 150, y: 60 },
                { x: 80, y: 220 },
                { x: 220, y: 220 },
                { x: 150, y: 240 },
                { x: 150, y: 150 },
              ].map((pos, i) => (
                <g key={i}>
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r="12"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    initial={{ scale: 0.8, opacity: 0.4 }}
                    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                  <circle cx={pos.x} cy={pos.y} r="6" fill="#3b82f6" />
                </g>
              ))}
            </svg>
          </div>
        </div>
      )}

      {/* Step 1: Data training visualization */}
      {step === 1 && (
        <div className="llm-training">
          <div className="llm-text">它通过海量文本、代码和知识训练。</div>
          <div className="llm-data-visual">
            {["文本", "代码", "知识"].map((item, i) => (
              <motion.div
                key={i}
                className="llm-data-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
          <div className="llm-data-flow">→ 大脑</div>
        </div>
      )}

      {/* Step 2: Capabilities reveal */}
      {step === 2 && (
        <div className="llm-capabilities">
          <div className="llm-label">核心能力</div>
          <div className="llm-cap-grid">
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                className="llm-cap-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {cap}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Products grid */}
      {step === 3 && (
        <div className="llm-products">
          <div className="llm-label">代表产品</div>
          <div className="llm-product-grid">
            {products.map((p, i) => (
              <motion.div
                key={i}
                className="llm-product"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                {p}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Core capability emphasis */}
      {step === 4 && (
        <div className="llm-core">
          <div className="llm-core-text">LLM 的本质：</div>
          <div className="llm-core-highlight">根据输入，生成最合理的输出。</div>
        </div>
      )}

      {/* Step 5: Limitation transition */}
      {step === 5 && (
        <div className="llm-limit">
          <div className="llm-limit-text">但 LLM 本身只是一个会说话的大脑。</div>
          <div className="llm-limit-sub">它需要指令，才能真正工作。</div>
        </div>
      )}
    </div>
  );
}
