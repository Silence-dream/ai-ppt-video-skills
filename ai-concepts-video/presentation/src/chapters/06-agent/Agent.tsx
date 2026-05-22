import { motion } from "framer-motion";
import "./Agent.css";

interface AgentProps {
  step: number;
}

const web3Steps = [
  "理解需求",
  "拆模块",
  "选技术栈",
  "搭项目",
  "写代码",
  "跑项目",
  "修 Bug",
  "优化",
  "部署",
];

const capabilities = [
  "自主规划",
  "任务拆解",
  "工具调用",
  "结果检查",
  "多轮执行",
  "反馈优化",
];

export default function Agent({ step }: AgentProps) {
  return (
    <div className="agent-stage">
      {/* Step 0: Title with autonomous action visual */}
      {step === 0 && (
        <div className="agent-hero">
          <div className="agent-ch">第五章</div>
          <div className="agent-title">Agent</div>
          <div className="agent-subtitle">可以自主执行任务的 AI</div>
          <div className="agent-hero-icon">
            <svg viewBox="0 0 120 120" className="agent-icon-svg">
              {/* Robot/Employee figure */}
              <circle cx="60" cy="35" r="20" fill="none" stroke="#3b82f6" strokeWidth="3" />
              <rect x="45" y="55" width="30" height="40" rx="6" fill="none" stroke="#3b82f6" strokeWidth="3" />
              <circle cx="52" cy="32" r="3" fill="#3b82f6" />
              <circle cx="68" cy="32" r="3" fill="#3b82f6" />
              {/* Action lines */}
              <motion.line x1="85" y1="40" x2="100" y2="30" stroke="#3b82f6" strokeWidth="2" initial={{ opacity: 0.3 }} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} />
              <motion.line x1="85" y1="55" x2="100" y2="55" stroke="#3b82f6" strokeWidth="2" initial={{ opacity: 0.3 }} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} />
              <motion.line x1="85" y1="70" x2="100" y2="80" stroke="#3b82f6" strokeWidth="2" initial={{ opacity: 0.3 }} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} />
            </svg>
          </div>
        </div>
      )}

      {/* Step 1: Definition */}
      {step === 1 && (
        <div className="agent-def">
          <div className="agent-text">Agent，不是聊天机器人。</div>
          <div className="agent-desc">而是一个能围绕目标自主行动的 AI 系统。</div>
        </div>
      )}

      {/* Step 2: Ordinary vs Agent contrast */}
      {step === 2 && (
        <div className="agent-contrast">
          <div className="agent-ch">普通对话 vs Agent</div>
          <div className="agent-compare">
            <div className="agent-compare-item ordinary">
              <div className="agent-compare-label">普通 AI</div>
              <div className="agent-compare-icon">💬</div>
              <div className="agent-compare-desc">你问一句，它答一句。</div>
            </div>
            <div className="agent-compare-item agent">
              <div className="agent-compare-label">Agent</div>
              <div className="agent-compare-icon">🤖</div>
              <div className="agent-compare-desc">你给目标，它自己拆解、执行、推进。</div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Web3 blog 9 steps - flowing tasks */}
      {step === 3 && (
        <div className="agent-web3">
          <div className="agent-ch">示例：做一个 Web3 博客</div>
          <div className="agent-tasks">
            {web3Steps.map((task, index) => (
              <motion.div
                key={index}
                className="agent-task-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="agent-task-num">{index + 1}</div>
                <div className="agent-task-label">{task}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Task flow detail */}
      {step === 4 && (
        <div className="agent-flow-detail">
          <div className="agent-flow-text">9 步自动完成，从需求到部署。</div>
          <div className="agent-flow-sub">无需你一步步指挥。</div>
        </div>
      )}

      {/* Step 5: Key capabilities */}
      {step === 5 && (
        <div className="agent-capabilities">
          <div className="agent-ch">关键能力</div>
          <div className="agent-cap-grid">
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                className="agent-cap-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 }}
              >
                {cap}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Step 6: AI employee metaphor */}
      {step === 6 && (
        <div className="agent-metaphor">
          <div className="agent-metaphor-text">LLM 像一个会回答问题的大脑。</div>
          <div className="agent-metaphor-highlight">Agent 像一个会自己干活的 AI 员工。</div>
        </div>
      )}

      {/* Step 7: Bridge positioning */}
      {step === 7 && (
        <div className="agent-bridge">
          <div className="agent-bridge-text">Agent 是人类目标和 AI 执行能力之间的自动化桥梁。</div>
          <div className="agent-bridge-cta">你负责「想做什么」，Agent 负责「怎么做」。</div>
        </div>
      )}
    </div>
  );
}
