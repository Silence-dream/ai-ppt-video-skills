import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./Context.css";

export default function ContextChapter({ step }: ChapterStepProps) {
  /* Step 0 — CLAUDE.md 在项目根目录 */
  if (step === 0) {
    return (
      <div className="ct-scene scene-pad">
        <div className="ct-root-layout">
          <div className="ct-root-header">
            <MaskReveal show duration={1000}>
              <span className="serif-cn">容易被忽略的</span>
            </MaskReveal>
            <MaskReveal show delay={400} duration={1000}>
              <span className="display-en ct-filename">CLAUDE.md</span>
            </MaskReveal>
          </div>

          <div className="ct-tree">
            <div className="ct-tree-item ct-tree-root">
              <span className="ct-tree-icon mono">~/</span>
              <span className="ct-tree-name">my-project</span>
            </div>
            <div className="ct-tree-item ct-tree-highlight">
              <span className="ct-tree-indent" />
              <span className="ct-tree-icon mono ct-file-icon">md</span>
              <span className="ct-tree-name ct-file-name">CLAUDE.md</span>
              <span className="ct-tree-badge label-mono ct-badge-auto">每次自动读取</span>
            </div>
            <div className="ct-tree-item">
              <span className="ct-tree-indent" />
              <span className="ct-tree-icon mono">d</span>
              <span className="ct-tree-name">src/</span>
            </div>
            <div className="ct-tree-item">
              <span className="ct-tree-indent" />
              <span className="ct-tree-icon mono">d</span>
              <span className="ct-tree-name">public/</span>
            </div>
            <div className="ct-tree-item">
              <span className="ct-tree-indent" />
              <span className="ct-tree-icon mono">j</span>
              <span className="ct-tree-name">package.json</span>
            </div>
          </div>

          <div className="ct-root-hint">
            <span className="label-mono">放入项目根目录 → 每次开会话自动读入上下文</span>
          </div>
        </div>
      </div>
    );
  }

  /* Step 1 — 文件内容 */
  if (step === 1) {
    return (
      <div className="ct-scene scene-pad">
        <div className="ct-content-layout">
          <div className="ct-content-header">
            <MaskReveal show duration={900}>
              <span className="display-en ct-filename-sm">CLAUDE.md</span>
            </MaskReveal>
            <MaskReveal show delay={300} duration={800}>
              <span className="serif-cn"> 里面写什么</span>
            </MaskReveal>
          </div>

          <div className="ct-content-card">
            <div className="ct-content-section ct-section-1">
              <div className="ct-section-label kicker">常用命令</div>
              <div className="ct-section-code mono">
                npm run dev · npm test · npm run build
              </div>
            </div>

            <div className="ct-content-rule rule" />

            <div className="ct-content-section ct-section-2">
              <div className="ct-section-label kicker">架构决策</div>
              <div className="ct-section-text">
                状态管理用 Zustand，不用 Redux
              </div>
            </div>

            <div className="ct-content-rule rule" />

            <div className="ct-content-section ct-section-3">
              <div className="ct-section-label kicker">重要文件</div>
              <div className="ct-section-text">
                src/store/ · src/api/ · docs/schema.md
              </div>
            </div>
          </div>

          <div className="ct-content-tip label-mono">
            尽量简短 — 太长会消耗上下文
          </div>
        </div>
      </div>
    );
  }

  /* Step 2 — 子目录 CLAUDE.md */
  if (step === 2) {
    return (
      <div className="ct-scene scene-pad">
        <div className="ct-nested-layout">
          <div className="ct-nested-header">
            <MaskReveal show duration={900}>
              <span className="serif-cn">子目录也能放</span>
            </MaskReveal>
          </div>

          <div className="ct-tree ct-tree-nested">
            <div className="ct-tree-item ct-tree-root">
              <span className="ct-tree-icon mono">~/</span>
              <span className="ct-tree-name">my-project</span>
            </div>
            <div className="ct-tree-item ct-tree-highlight">
              <span className="ct-tree-indent" />
              <span className="ct-tree-icon mono ct-file-icon">md</span>
              <span className="ct-tree-name ct-file-name">CLAUDE.md</span>
              <span className="ct-tree-badge label-mono ct-badge-auto">每次读</span>
            </div>
            <div className="ct-tree-item">
              <span className="ct-tree-indent" />
              <span className="ct-tree-icon mono">d</span>
              <span className="ct-tree-name">src/</span>
            </div>
            <div className="ct-tree-item ct-tree-nested-item">
              <span className="ct-tree-indent" />
              <span className="ct-tree-indent" />
              <span className="ct-tree-icon mono ct-file-icon">md</span>
              <span className="ct-tree-name ct-file-name">CLAUDE.md</span>
              <span className="ct-tree-badge label-mono ct-badge-ondemand">进入时读</span>
            </div>
            <div className="ct-tree-item">
              <span className="ct-tree-indent" />
              <span className="ct-tree-icon mono">d</span>
              <span className="ct-tree-name">api/</span>
            </div>
            <div className="ct-tree-item ct-tree-nested-item">
              <span className="ct-tree-indent" />
              <span className="ct-tree-indent" />
              <span className="ct-tree-icon mono ct-file-icon">md</span>
              <span className="ct-tree-name ct-file-name">CLAUDE.md</span>
              <span className="ct-tree-badge label-mono ct-badge-ondemand">进入时读</span>
            </div>
            <div className="ct-tree-item">
              <span className="ct-tree-indent" />
              <span className="ct-tree-icon mono">j</span>
              <span className="ct-tree-name">package.json</span>
            </div>
          </div>

          <div className="ct-nested-explain">
            <div className="ct-explain-item">
              <span className="dot-accent" />
              <span>根目录 = 每次必读</span>
            </div>
            <div className="ct-explain-item">
              <span className="ct-dot-ondemand" />
              <span>子目录 = 在该目录工作时按需读取</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Step 3 — 企业配置 + 团队 MCP */
  return (
    <div className="ct-scene scene-pad">
      <div className="ct-enterprise-layout">
        <div className="ct-enterprise-header">
          <MaskReveal show duration={900}>
            <span className="serif-cn">公司层面</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="serif-it ct-em">一次配好，全团队生效</span>
          </MaskReveal>
        </div>

        <div className="ct-enterprise-cards">
          <div className="ct-ent-card card ct-ent-1">
            <div className="ct-ent-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="var(--accent)" strokeWidth="2" />
                <path d="M11 16L14.5 19.5L21 12.5" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="ct-ent-label">自动批准</div>
            <div className="ct-ent-desc mono">npm test · npm run build</div>
          </div>

          <div className="ct-ent-card card ct-ent-2">
            <div className="ct-ent-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="12" stroke="#e85d4a" strokeWidth="2" />
                <path d="M11 11L21 21M21 11L11 21" stroke="#e85d4a" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="ct-ent-label">禁止访问</div>
            <div className="ct-ent-desc mono">特定 URL 黑名单</div>
          </div>

          <div className="ct-ent-card card ct-ent-3">
            <div className="ct-ent-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="6" y="8" width="20" height="16" rx="2" stroke="var(--accent)" strokeWidth="2" />
                <path d="M12 14H20M12 18H17" stroke="var(--text-2)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="ct-ent-label">团队 MCP</div>
            <div className="ct-ent-desc mono">mcp.json 自动共享工具</div>
          </div>
        </div>
      </div>
    </div>
  );
}
