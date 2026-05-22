import { motion } from "framer-motion";
import "./AICoding.css";

interface AICodingProps {
  step: number;
}

const capabilities = [
  "解释代码",
  "生成代码",
  "修 Bug",
  "搭项目",
  "写测试",
  "部署",
];

const tools = [
  { name: "Cursor", type: "IDE" },
  { name: "Claude Code", type: "Agent" },
  { name: "GitHub Copilot", type: "补全" },
  { name: "Windsurf", type: "IDE" },
  { name: "Devin", type: "全栈" },
];

export default function AICoding({ step }: AICodingProps) {
  return (
    <div className="aic-stage">
      {/* Step 0: Title with code visual */}
      {step === 0 && (
        <div className="aic-hero">
          <div className="aic-ch">第六章</div>
          <div className="aic-title">AI Coding</div>
          <div className="aic-subtitle">AI 参与编程开发</div>
          <div className="aic-hero-icon">💻</div>
        </div>
      )}

      {/* Step 1: Definition */}
      {step === 1 && (
        <div className="aic-def">
          <div className="aic-text">AI Coding，不是让 AI 写一段代码，</div>
          <div className="aic-desc">而是让 AI 参与整个开发。</div>
        </div>
      )}

      {/* Step 2: Capabilities grid */}
      {step === 2 && (
        <div className="aic-capabilities">
          <div className="aic-label">AI 能做什么</div>
          <div className="aic-cap-grid">
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                className="aic-cap-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                {cap}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Basic example */}
      {step === 3 && (
        <div className="aic-basic">
          <div className="aic-label">基础用法</div>
          <div className="aic-code-block">「用 React 写一个钱包连接页面」</div>
          <div className="aic-result">AI 生成代码。</div>
        </div>
      )}

      {/* Step 4: Advanced example */}
      {step === 4 && (
        <div className="aic-advanced">
          <div className="aic-label">进阶用法</div>
          <div className="aic-code-block">「阅读整个项目，找到登录 Bug 并修复它」</div>
          <div className="aic-result">AI 像 Agent 一样工作。</div>
        </div>
      )}

      {/* Step 5: Tools matrix */}
      {step === 5 && (
        <div className="aic-tools">
          <div className="aic-label">AI Coding 工具</div>
          <div className="aic-tools-grid">
            {tools.map((tool, index) => (
              <div key={index} className="aic-tool-card">
                <div className="aic-tool-name">{tool.name}</div>
                <div className="aic-tool-type">{tool.type}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 6: Efficiency boost */}
      {step === 6 && (
        <div className="aic-efficiency">
          <div className="aic-efficiency-text">AI Coding 的价值：</div>
          <div className="aic-efficiency-highlight">把开发效率提升 10 倍。</div>
          <div className="aic-efficiency-sub">不是替代程序员，而是让你更快把想法变成现实。</div>
        </div>
      )}
    </div>
  );
}
