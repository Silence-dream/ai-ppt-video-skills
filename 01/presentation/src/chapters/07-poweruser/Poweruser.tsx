import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./Poweruser.css";

export default function PoweruserChapter({ step }: ChapterStepProps) {
  /* Step 0 — tmux 并行会话 */
  if (step === 0) {
    return (
      <div className="pu-scene scene-pad">
        <div className="pu-parallel-layout">
          <div className="pu-parallel-header">
            <MaskReveal show duration={1000}>
              <span className="serif-cn">一个人</span>
            </MaskReveal>
            <MaskReveal show delay={350} duration={1000}>
              <span className="serif-it pu-em">干一个团队的活</span>
            </MaskReveal>
          </div>

          <div className="pu-grid">
            <div className="pu-session pu-session-1">
              <div className="pu-sess-bar">
                <span className="pu-sess-dot" />
                <span className="pu-sess-dot" />
                <span className="pu-sess-dot" />
                <span className="pu-sess-title mono">session:feat-auth</span>
              </div>
              <div className="pu-sess-body">
                <span className="pu-sess-prompt">$</span> claude
                <span className="pu-sess-cursor" />
                <div className="pu-sess-status">Writing auth middleware...</div>
              </div>
            </div>

            <div className="pu-session pu-session-2">
              <div className="pu-sess-bar">
                <span className="pu-sess-dot" />
                <span className="pu-sess-dot" />
                <span className="pu-sess-dot" />
                <span className="pu-sess-title mono">session:fix-bug</span>
              </div>
              <div className="pu-sess-body">
                <span className="pu-sess-prompt">$</span> claude
                <span className="pu-sess-cursor pu-cursor-2" />
                <div className="pu-sess-status">Analyzing stack trace...</div>
              </div>
            </div>

            <div className="pu-session pu-session-3">
              <div className="pu-sess-bar">
                <span className="pu-sess-dot" />
                <span className="pu-sess-dot" />
                <span className="pu-sess-dot" />
                <span className="pu-sess-title mono">session:tests</span>
              </div>
              <div className="pu-sess-body">
                <span className="pu-sess-prompt">$</span> claude
                <span className="pu-sess-cursor pu-cursor-3" />
                <div className="pu-sess-status">Running test suite...</div>
              </div>
            </div>

            <div className="pu-session pu-session-4">
              <div className="pu-sess-bar">
                <span className="pu-sess-dot" />
                <span className="pu-sess-dot" />
                <span className="pu-sess-dot" />
                <span className="pu-sess-title mono">session:refactor</span>
              </div>
              <div className="pu-sess-body">
                <span className="pu-sess-prompt">$</span> claude
                <span className="pu-sess-cursor pu-cursor-4" />
                <div className="pu-sess-status">Refactoring utils...</div>
              </div>
            </div>
          </div>

          <div className="pu-tools-hint">
            <span className="badge-mono">tmux</span>
            <span className="badge-mono">worktree</span>
            <span className="badge-mono">多 checkout</span>
          </div>
        </div>
      </div>
    );
  }

  /* Step 1 — 80% + 收尾 */
  return (
    <div className="pu-scene scene-pad">
      <div className="pu-finale-layout">
        <div className="pu-stat-block">
          <div className="pu-stat-num hero-num">80%</div>
          <div className="pu-stat-label">
            <MaskReveal show delay={500} duration={900}>
              <span className="serif-cn">Anthropic 技术人员</span>
            </MaskReveal>
            <MaskReveal show delay={900} duration={900}>
              <span className="serif-cn">每天都用 Claude Code</span>
            </MaskReveal>
          </div>
        </div>

        <div className="pu-finale-rule rule" />

        <div className="pu-cta">
          <MaskReveal show delay={1500} duration={1200}>
            <span className="serif-it pu-cta-text">你还在等什么？</span>
          </MaskReveal>
        </div>
      </div>
    </div>
  );
}
