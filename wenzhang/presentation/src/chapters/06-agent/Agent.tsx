import "./Agent.css";

interface Props {
  step: number;
}

/** 信息池（article §5）：
 * - 定义：智能体，你给目标它自己搞定 (L90-L92)
 * - 对比：普通 AI 问一句答一句 vs Agent 自己搞定 (L90-L92)
 * - 案例：做个人博客 (L97-L104)
 * - 特质：自主思考、拆任务、用工具、自己纠错 (L106)
 */
export default function Agent({ step }: Props) {
  const agentSteps = ["判断风格", "选技术栈", "建项目", "写代码", "测 bug", "上线"];

  return (
    <div className="ag-root">
      {/* step 0: Agent 标题 */}
      {step === 0 && (
        <div className="ag-hero-scene">
          <div className="ag-hero-eq">
            <span className="ag-hero-term">Agent</span>
            <span className="ag-hero-op">=</span>
            <span className="ag-hero-val">会自己干活的 AI 员工</span>
          </div>
          <p className="ag-hero-sub">智能体</p>
        </div>
      )}

      {/* step 1: 对比 */}
      {step === 1 && (
        <div className="ag-vs-scene">
          <div className="ag-vs">
            <div className="ag-vs-left">
              <span className="ag-vs-type">普通 AI</span>
              <span className="ag-vs-behavior">你问一句，它答一句</span>
            </div>
            <div className="ag-vs-divider" />
            <div className="ag-vs-right">
              <span className="ag-vs-type">Agent</span>
              <span className="ag-vs-behavior ag-highlight">你给目标，它自己搞定</span>
            </div>
          </div>
        </div>
      )}

      {/* step 2: 案例流程 */}
      {step === 2 && (
        <div className="ag-flow-scene">
          <h2 className="ag-section-title">你说：帮我做个个人博客</h2>
          <div className="ag-flow">
            {agentSteps.map((s, i) => (
              <div className="ag-flow-step" key={s} style={{ animationDelay: `${i * 120}ms` }}>
                <div className="ag-flow-num">{i + 1}</div>
                <div className="ag-flow-text">{s}</div>
                {i < 5 && <div className="ag-flow-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* step 3: 特质总结 */}
      {step === 3 && (
        <div className="ag-traits-scene">
          <div className="ag-traits">
            {["自己想", "自己拆任务", "自己用工具", "自己纠错"].map((t, i) => (
              <div className="ag-trait" key={t} style={{ animationDelay: `${i * 100}ms` }}>
                {t}
              </div>
            ))}
          </div>
          <p className="ag-traits-note">一个能自己想、自己拆任务、自己用工具、自己纠错的 AI 员工</p>
        </div>
      )}
    </div>
  );
}
