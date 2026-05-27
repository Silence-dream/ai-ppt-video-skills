import "./Workflow.css";

interface Props {
  step: number;
}

/** 信息池（article §3）：
 * - 定义：工作流，把大事拆成小步骤 (L46)
 * - 反例：不拆 → "帮我写篇文章"随便发挥 (L48-L49)
 * - 正例六步：搞清读者 → 定主题 → 列大纲 → 写内容 → 改标题 → 加配图 (L52-L57)
 * - 效果：从"随便发挥"到"按规矩办事" (L59)
 * - 适用：写文章、做计划、设计产品、数据分析 (L61)
 */
export default function Workflow({ step }: Props) {
  const flowSteps = [
    "搞清谁会看",
    "定好要讲什么",
    "列大纲",
    "一段一段写",
    "改标题开头结尾",
    "补上配图建议",
  ];

  return (
    <div className="wf-root">
      {/* step 0: Workflow 标题 */}
      {step === 0 && (
        <div className="wf-hero-scene">
          <div className="wf-hero-eq">
            <span className="wf-hero-term">Workflow</span>
            <span className="wf-hero-op">=</span>
            <span className="wf-hero-val">让 AI 按流程干活</span>
          </div>
          <p className="wf-hero-sub">把一件大事拆成好几小步</p>
        </div>
      )}

      {/* step 1: 反例——乱 */}
      {step === 1 && (
        <div className="wf-chaos-scene">
          <div className="wf-chaos-card">
            <p className="wf-chaos-text">帮我写篇文章</p>
            <div className="wf-chaos-lines">
              <span /><span /><span /><span /><span />
            </div>
            <span className="wf-chaos-label">随便发挥</span>
          </div>
        </div>
      )}

      {/* step 2: 正例六步流程 */}
      {step === 2 && (
        <div className="wf-flow-scene">
          <div className="wf-flow">
            {flowSteps.map((s, i) => (
              <div className="wf-flow-step" key={s} style={{ animationDelay: `${i * 120}ms` }}>
                <div className="wf-flow-num">{i + 1}</div>
                <div className="wf-flow-text">{s}</div>
                {i < 5 && <div className="wf-flow-arrow">↓</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* step 3: 对比总结 */}
      {step === 3 && (
        <div className="wf-vs-scene">
          <div className="wf-vs">
            <div className="wf-vs-left">
              <span className="wf-vs-label">不拆</span>
              <span className="wf-vs-text wf-strike">随便发挥</span>
            </div>
            <div className="wf-vs-divider" />
            <div className="wf-vs-right">
              <span className="wf-vs-label">拆好流程</span>
              <span className="wf-vs-text wf-highlight">按规矩办事</span>
            </div>
          </div>
          <p className="wf-vs-note">输出质量稳很多</p>
        </div>
      )}
    </div>
  );
}
