import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./Onboarding.css";

const QUESTION_TYPES = [
  { label: "代码结构", example: '"这个模块怎么组织的？"', icon: "{}" },
  { label: "Git 历史", example: '"这 15 个参数谁加的？"', icon: "log" },
  { label: "GitHub Issue", example: '"这个 issue 的上下文？"', icon: "#" },
  { label: "周报总结", example: '"我这周都干了啥？"', icon: "w" },
];

export default function OnboardingChapter({ step }: ChapterStepProps) {
  /* Step 0 — 空 prompt：这能干啥？ */
  if (step === 0) {
    return (
      <div className="ob-scene scene-pad">
        <div className="ob-prompt-layout">
          <div className="ob-terminal">
            <div className="ob-term-bar">
              <span className="ob-dot" />
              <span className="ob-dot" />
              <span className="ob-dot" />
              <span className="ob-term-title mono">Claude Code</span>
            </div>
            <div className="ob-term-body">
              <div className="ob-prompt-line">
                <span className="ob-dollar">$</span> claude
              </div>
              <div className="ob-input-line">
                <span className="ob-cursor-block" />
              </div>
            </div>
          </div>

          <div className="ob-confused">
            <MaskReveal show delay={800} duration={1000}>
              <span className="serif-cn ob-confused-text">这能干啥？</span>
            </MaskReveal>
          </div>

          <div className="ob-hint label-mono">
            <MaskReveal show delay={1600} duration={800}>
              <span>最好的上手方式 — 问问题</span>
            </MaskReveal>
          </div>
        </div>
      </div>
    );
  }

  /* Step 1 — 入职时间：两三周 → 两三天 */
  if (step === 1) {
    return (
      <div className="ob-scene scene-pad">
        <div className="ob-time-layout">
          <div className="ob-time-header kicker">Anthropic 新员工入职</div>

          <div className="ob-time-compare">
            <div className="ob-time-before">
              <div className="ob-time-num hero-num ob-num-before">2~3</div>
              <div className="ob-time-unit serif-cn">周</div>
              <div className="ob-time-sub label-mono">传统技术入职</div>
            </div>

            <div className="ob-time-arrow">
              <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
                <path
                  d="M0 20H100M100 20L85 8M100 20L85 32"
                  stroke="var(--accent)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="ob-time-after">
              <div className="ob-time-num hero-num ob-num-after">2~3</div>
              <div className="ob-time-unit serif-cn">天</div>
              <div className="ob-time-sub label-mono">
                <span className="dot-accent" /> 用 Claude Code
              </div>
            </div>
          </div>

          <div className="ob-time-bar-wrap">
            <div className="ob-time-bar ob-time-bar-old" />
            <div className="ob-time-bar ob-time-bar-new" />
          </div>
        </div>
      </div>
    );
  }

  /* Step 2 — Git history 可视化 */
  if (step === 2) {
    return (
      <div className="ob-scene scene-pad">
        <div className="ob-git-layout">
          <div className="ob-git-prompt">
            <span className="ob-git-q">"</span>
            <span className="serif-cn">
              这个函数为什么有{" "}
              <span className="ob-highlight">15</span> 个参数？
            </span>
            <span className="ob-git-q">"</span>
          </div>

          <div className="ob-git-log">
            <div className="ob-commit ob-commit-1">
              <div className="ob-commit-dot" />
              <div className="ob-commit-line" />
              <div className="ob-commit-body">
                <span className="ob-commit-hash mono">a3f2c1d</span>
                <span className="ob-commit-msg">add param: retryPolicy</span>
                <span className="ob-commit-who mono">@alice</span>
              </div>
            </div>
            <div className="ob-commit ob-commit-2">
              <div className="ob-commit-dot" />
              <div className="ob-commit-line" />
              <div className="ob-commit-body">
                <span className="ob-commit-hash mono">e7b19f0</span>
                <span className="ob-commit-msg">add param: timeout, maxRetries</span>
                <span className="ob-commit-who mono">@bob</span>
              </div>
            </div>
            <div className="ob-commit ob-commit-3">
              <div className="ob-commit-dot" />
              <div className="ob-commit-line" />
              <div className="ob-commit-body">
                <span className="ob-commit-hash mono">c8d44a2</span>
                <span className="ob-commit-msg">add param: headers, auth, cache...</span>
                <span className="ob-commit-who mono">@carol</span>
              </div>
            </div>
          </div>

          <div className="ob-git-result card">
            <div className="ob-result-label kicker">
              <span className="dot-accent" /> Claude 的回答
            </div>
            <div className="ob-result-text">
              这个参数列表是三年间 12 次提交逐步累积的。
              <br />
              每次加一两个参数，没人重构过。
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Step 3 — 问问题的类型 */
  return (
    <div className="ob-scene scene-pad">
      <div className="ob-qa-layout">
        <div className="ob-qa-header">
          <MaskReveal show duration={900}>
            <span className="serif-cn">别急着写代码</span>
          </MaskReveal>
          <MaskReveal show delay={400} duration={900}>
            <span className="serif-it ob-em">先问问题</span>
          </MaskReveal>
        </div>

        <div className="ob-qa-list">
          {QUESTION_TYPES.map((q, i) => (
            <div
              key={q.label}
              className="ob-qa-item card"
              style={{ animationDelay: `${500 + i * 200}ms` }}
            >
              <div className="ob-qa-icon mono">{q.icon}</div>
              <div className="ob-qa-content">
                <div className="ob-qa-label">{q.label}</div>
                <div className="ob-qa-example mono">{q.example}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
