import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./Editing.css";

export default function EditingChapter({ step }: ChapterStepProps) {
  /* Step 0 — 三个工具：编辑 / bash / 搜索 */
  if (step === 0) {
    return (
      <div className="ed-scene scene-pad">
        <div className="ed-tools-layout">
          <div className="ed-tools-header">
            <MaskReveal show duration={900}>
              <span className="serif-cn">工具集很小</span>
            </MaskReveal>
            <MaskReveal show delay={400} duration={900}>
              <span className="serif-it ed-em">就这三样</span>
            </MaskReveal>
          </div>

          <div className="ed-tools-row">
            <div className="ed-tool-card ed-tool-1">
              <div className="ed-tool-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="6" width="32" height="36" rx="3" stroke="var(--accent)" strokeWidth="2.5" />
                  <path d="M16 18H32M16 24H28M16 30H24" stroke="var(--text-2)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="ed-tool-name">编辑文件</div>
              <div className="ed-tool-desc mono">read / write / edit</div>
            </div>

            <div className="ed-tool-connector">
              <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                <path d="M0 12H60" stroke="var(--rule)" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="30" cy="12" r="4" fill="var(--accent)" />
              </svg>
            </div>

            <div className="ed-tool-card ed-tool-2">
              <div className="ed-tool-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="6" y="8" width="36" height="32" rx="3" stroke="var(--accent)" strokeWidth="2.5" />
                  <path d="M14 20L20 26L14 32" stroke="var(--text-2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M24 32H34" stroke="var(--text-2)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="ed-tool-name">跑 Bash</div>
              <div className="ed-tool-desc mono">bash / shell</div>
            </div>

            <div className="ed-tool-connector">
              <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
                <path d="M0 12H60" stroke="var(--rule)" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="30" cy="12" r="4" fill="var(--accent)" />
              </svg>
            </div>

            <div className="ed-tool-card ed-tool-3">
              <div className="ed-tool-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="22" cy="22" r="12" stroke="var(--accent)" strokeWidth="2.5" />
                  <path d="M31 31L40 40" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <div className="ed-tool-name">搜索文件</div>
              <div className="ed-tool-desc mono">grep / glob</div>
            </div>
          </div>

          <div className="ed-tools-foot">
            <div className="ed-arrow-down" />
            <div className="ed-compose-label label-mono">自动组合</div>
          </div>
        </div>
      </div>
    );
  }

  /* Step 1 — 规划先行 */
  if (step === 1) {
    return (
      <div className="ed-scene scene-pad">
        <div className="ed-plan-layout">
          <div className="ed-plan-header">
            <MaskReveal show duration={900}>
              <span className="serif-cn">别急着写代码</span>
            </MaskReveal>
          </div>

          <div className="ed-plan-flow">
            <div className="ed-flow-step ed-flow-prompt">
              <div className="ed-flow-label kicker">你输入</div>
              <div className="ed-flow-content card">
                <span className="mono ed-flow-text">
                  "帮我加个用户认证模块"
                </span>
              </div>
            </div>

            <div className="ed-flow-arrow" />

            <div className="ed-flow-step ed-flow-plan">
              <div className="ed-flow-label kicker">
                <span className="dot-accent" /> Claude 先列方案
              </div>
              <div className="ed-flow-content card ed-plan-card">
                <div className="ed-plan-line">1. 选择认证策略（JWT）</div>
                <div className="ed-plan-line">2. 设计中间件结构</div>
                <div className="ed-plan-line">3. 实现路由守卫</div>
                <div className="ed-plan-line ed-plan-fade">4. 编写测试用例</div>
              </div>
            </div>

            <div className="ed-flow-arrow" />

            <div className="ed-flow-step ed-flow-confirm">
              <div className="ed-flow-label kicker">你确认</div>
              <div className="ed-flow-check">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                  <circle cx="28" cy="28" r="26" stroke="var(--accent)" strokeWidth="2.5" />
                  <path d="M18 28L25 35L38 20" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div className="ed-flow-arrow" />

            <div className="ed-flow-step ed-flow-exec">
              <div className="ed-flow-label kicker">开始执行</div>
              <div className="ed-flow-content card">
                <div className="ed-exec-dots">
                  <span className="ed-exec-dot" />
                  <span className="ed-exec-dot" />
                  <span className="ed-exec-dot" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Step 2 — commit and push */
  return (
    <div className="ed-scene scene-pad">
      <div className="ed-commit-layout">
        <div className="ed-commit-header">
          <MaskReveal show duration={900}>
            <span className="serif-cn">一句话</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="serif-it ed-em">全自动</span>
          </MaskReveal>
        </div>

        <div className="ed-commit-terminal">
          <div className="ed-term-bar">
            <span className="ed-dot" />
            <span className="ed-dot" />
            <span className="ed-dot" />
            <span className="ed-term-title mono">Claude Code</span>
          </div>
          <div className="ed-term-body">
            <div className="ed-cmd-line">
              <span className="ed-dollar">$</span>
              <span className="ed-cmd">commit and push to branch</span>
            </div>
          </div>
        </div>

        <div className="ed-commit-flow">
          <div className="ed-git-step ed-git-1">
            <div className="ed-git-icon">git</div>
            <div className="ed-git-label">看 git log 学格式</div>
          </div>
          <div className="ed-git-arrow-sm" />
          <div className="ed-git-step ed-git-2">
            <div className="ed-git-icon">br</div>
            <div className="ed-git-label">建分支</div>
          </div>
          <div className="ed-git-arrow-sm" />
          <div className="ed-git-step ed-git-3">
            <div className="ed-git-icon">push</div>
            <div className="ed-git-label">推代码</div>
          </div>
          <div className="ed-git-arrow-sm" />
          <div className="ed-git-step ed-git-4">
            <div className="ed-git-icon">PR</div>
            <div className="ed-git-label">发 PR</div>
          </div>
        </div>
      </div>
    </div>
  );
}
