import { motion } from "framer-motion";
import "./Workflow.css";

interface WorkflowProps {
  step: number;
}

const workflowSteps = [
  { num: "01", label: "分析目标读者" },
  { num: "02", label: "确定文章主题" },
  { num: "03", label: "生成文章大纲" },
  { num: "04", label: "逐段写正文" },
  { num: "05", label: "优化标题" },
  { num: "06", label: "生成配图提示词" },
];

const scenarios = [
  "内容创作",
  "学习计划",
  "产品设计",
  "代码开发",
  "数据分析",
  "商业策划",
  "自动化办公",
];

export default function Workflow({ step }: WorkflowProps) {
  return (
    <div className="workflow-stage">
      {/* Step 0: Title with flow metaphor */}
      {step === 0 && (
        <div className="workflow-hero">
          <div className="workflow-label">第三章</div>
          <div className="workflow-title">Workflow</div>
          <div className="workflow-subtitle">让 AI 按流程做事</div>
          <div className="workflow-flow-icon">
            <svg viewBox="0 0 200 60" className="flow-svg">
              {[0, 1, 2, 3].map((i) => (
                <g key={i}>
                  <rect x={i * 50} y="20" width="30" height="20" fill="none" stroke="#3b82f6" strokeWidth="2" rx="4" />
                  {i < 3 && (
                    <motion.line
                      x1={i * 50 + 30}
                      y1="30"
                      x2={i * 50 + 50}
                      y2="30"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.2 }}
                    />
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>
      )}

      {/* Step 1: Definition */}
      {step === 1 && (
        <div className="workflow-def">
          <div className="workflow-text">Workflow，就是让 AI 按流程做事。</div>
          <div className="workflow-desc">把一个大任务拆成多个小步骤，按顺序执行。</div>
        </div>
      )}

      {/* Step 2: Bad example - chaos */}
      {step === 2 && (
        <div className="workflow-bad">
          <div className="workflow-label">没有 Workflow</div>
          <div className="workflow-bad-text">帮我写一篇文章。</div>
          <div className="workflow-result">AI 像一个没有 SOP 的新员工，迷茫、跑题、输出平庸。</div>
        </div>
      )}

      {/* Step 3: Good workflow - 6 steps with animated connections */}
      {step === 3 && (
        <div className="workflow-good">
          <div className="workflow-label">有 Workflow · 6 步流程</div>
          <div className="workflow-steps">
            {workflowSteps.map((s, index) => (
              <div key={index} className="workflow-step-item">
                <motion.div
                  className="workflow-step-num"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {s.num}
                </motion.div>
                <div className="workflow-step-label">{s.label}</div>
                {index < workflowSteps.length - 1 && (
                  <motion.div
                    className="workflow-step-arrow"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.15 }}
                  >
                    ↓
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Per-step visual hint */}
      {step === 4 && (
        <div className="workflow-detail">
          <div className="workflow-detail-text">每一步都有明确的输入和输出。</div>
          <div className="workflow-detail-example">
            分析读者 → 确定主题 → 做大纲 → 写正文 → 改标题 → 配图
          </div>
        </div>
      )}

      {/* Step 5: Scenarios */}
      {step === 5 && (
        <div className="workflow-scenarios">
          <div className="workflow-label">适用场景</div>
          <div className="workflow-scenario-grid">
            {scenarios.map((scene, i) => (
              <motion.div
                key={i}
                className="workflow-scenario-tag"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                {scene}
              </motion.div>
            ))}
          </div>
          <div className="workflow-result-good">输出质量，瞬间提升。</div>
        </div>
      )}
    </div>
  );
}
