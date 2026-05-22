import { motion } from "framer-motion";
import "./Tooluse.css";

interface TooluseProps {
  step: number;
}

const tools = [
  { icon: "🌐", label: "查网页" },
  { icon: "📁", label: "读文件" },
  { icon: "⚙️", label: "跑代码" },
  { icon: "🔌", label: "调 API" },
  { icon: "📧", label: "发邮件" },
  { icon: "🖼️", label: "生成图" },
];

export default function Tooluse({ step }: TooluseProps) {
  return (
    <div className="tooluse-stage">
      {/* Step 0: Title with tool icon */}
      {step === 0 && (
        <div className="tooluse-hero">
          <div className="tooluse-label">第四章</div>
          <div className="tooluse-title">Tool Use</div>
          <div className="tooluse-subtitle">让 AI 拥有手和眼睛</div>
          <div className="tooluse-hero-icon">🛠️</div>
        </div>
      )}

      {/* Step 1: Definition */}
      {step === 1 && (
        <div className="tooluse-def">
          <div className="tooluse-text">Tool Use，就是让 AI 调用外部工具。</div>
          <div className="tooluse-desc">从「只会说」，变成「可以做」。</div>
        </div>
      )}

      {/* Step 2: Without tools - locked */}
      {step === 2 && (
        <div className="tooluse-locked">
          <div className="tooluse-label">没有工具</div>
          <div className="tooluse-locked-text">AI 只能「说」。</div>
          <div className="tooluse-locked-list">
            {["查网页", "读文件", "跑代码", "调 API", "发邮件", "生成图"].map((item, i) => (
              <div key={i} className="tooluse-locked-item">❌ {item}</div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: With tools - unlocked */}
      {step === 3 && (
        <div className="tooluse-unlocked">
          <div className="tooluse-label">有了工具</div>
          <div className="tooluse-unlocked-text">AI 就能「做」。</div>
          <div className="tooluse-tools-grid">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                className="tooluse-tool-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="tooluse-tool-icon">{tool.icon}</div>
                <div className="tooluse-tool-label">{tool.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Transformation */}
      {step === 4 && (
        <div className="tooluse-transform">
          <div className="tooluse-transform-text">大脑配上眼睛和手。</div>
          <div className="tooluse-transform-highlight">从会说话，变成会办事。</div>
        </div>
      )}

      {/* Step 5: Final insight */}
      {step === 5 && (
        <div className="tooluse-insight">
          <div className="tooluse-insight-text">Tool Use 的本质：</div>
          <div className="tooluse-insight-highlight">让 AI 从「只会说」，变成「可以做」。</div>
        </div>
      )}
    </div>
  );
}
