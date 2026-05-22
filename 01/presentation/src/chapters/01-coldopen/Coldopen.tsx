import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./Coldopen.css";

const IDE_NAMES = ["VS Code", "Xcode", "JetBrains", "Emacs", "Vim", "终端"];

export default function ColdopenChapter({ step }: ChapterStepProps) {
  /* Step 0 — hero: 一行一行 vs 一整个功能 */
  if (step === 0) {
    return (
      <div className="cc-scene scene-pad">
        <div className="cc-split">
          {/* 左：旧方式 */}
          <div className="cc-split-left">
            <div className="kicker cc-kicker-pad">传统补全</div>
            <div className="cc-code-lines">
              <span className="cc-line cc-line-1">const x =</span>
              <span className="cc-line cc-line-2">  data.map(</span>
              <span className="cc-line cc-line-3">    (d) =&gt;</span>
              <span className="cc-line cc-line-4">      d.value</span>
              <span className="cc-line cc-line-5">  );</span>
            </div>
            <div className="cc-slow-label label-mono">一行一行补</div>
          </div>

          {/* 分割线 */}
          <div className="cc-divider" />

          {/* 右：新方式 */}
          <div className="cc-split-right">
            <div className="kicker cc-kicker-pad">
              <span className="dot-accent" /> Claude Code
            </div>
            <div className="cc-code-block">
              <div className="cc-code-func">
                <span className="cc-keyword">function</span>{" "}
                <span className="cc-func-name">processData</span>(data) {"{"}
              </div>
              <div className="cc-code-body">
                &nbsp;&nbsp;<span className="cc-keyword">return</span>{" "}
                data.filter(Boolean).map(d =&gt; d.value);
              </div>
              <div className="cc-code-body">{"}"}</div>
            </div>
            <div className="cc-fast-label label-mono">
              <span className="dot-accent" /> 一整个功能
            </div>
          </div>
        </div>

        <div className="cc-hero-text">
          <MaskReveal show duration={1200}>
            <span className="serif-cn cc-hero-main">不只是</span>
          </MaskReveal>
          <MaskReveal show delay={400} duration={1200}>
            <span className="serif-it cc-hero-em">补全</span>
          </MaskReveal>
        </div>
      </div>
    );
  }

  /* Step 1 — 核心特性：agentic */
  if (step === 1) {
    return (
      <div className="cc-scene scene-pad">
        <div className="cc-feat-layout">
          <div className="cc-feat-hero">
            <MaskReveal show duration={1000}>
              <span className="display-en cc-agentic-word">agentic</span>
            </MaskReveal>
            <div className="cc-feat-sub">
              <MaskReveal show delay={500} duration={900}>
                <span className="serif-cn">不只是补代码</span>
              </MaskReveal>
              <MaskReveal show delay={800} duration={900}>
                <span className="serif-cn">，是帮你</span>
              </MaskReveal>
              <MaskReveal show delay={1100} duration={900}>
                <span className="serif-it cc-em-accent">写整个函数</span>
              </MaskReveal>
            </div>
          </div>

          <div className="cc-feat-cards">
            <div className="cc-feat-card card cc-card-anim-1">
              <div className="cc-feat-icon">fn</div>
              <div className="cc-feat-label">写函数</div>
              <div className="cc-feat-desc mono">整个函数，一次写完</div>
            </div>
            <div className="cc-feat-card card cc-card-anim-2">
              <div className="cc-feat-icon">fix</div>
              <div className="cc-feat-label">修 Bug</div>
              <div className="cc-feat-desc mono">相关文件，全部改好</div>
            </div>
            <div className="cc-feat-card card cc-card-anim-3">
              <div className="cc-feat-icon">feat</div>
              <div className="cc-feat-label">建功能</div>
              <div className="cc-feat-desc mono">从零到完整功能</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Step 2 — 通用兼容：所有 IDE + 终端 */
  return (
    <div className="cc-scene scene-pad">
      <div className="cc-compat-layout">
        <div className="cc-compat-top">
          <MaskReveal show duration={1000}>
            <span className="serif-cn cc-compat-h">不管用什么 IDE</span>
          </MaskReveal>
          <div className="cc-cross-tool">
            <MaskReveal show delay={500} duration={800}>
              <span className="cc-tool-text">换工具</span>
            </MaskReveal>
            <MaskReveal show delay={900} duration={600}>
              <span className="cc-strike" />
            </MaskReveal>
          </div>
        </div>

        <div className="cc-ide-row">
          {IDE_NAMES.map((name, i) => (
            <div
              key={name}
              className="cc-ide-chip badge-mono"
              style={{ animationDelay: `${300 + i * 120}ms` }}
            >
              {name}
            </div>
          ))}
        </div>

        <div className="cc-terminal-card">
          <div className="cc-terminal-bar">
            <span className="cc-term-dot" />
            <span className="cc-term-dot" />
            <span className="cc-term-dot" />
            <span className="cc-term-title mono">Terminal</span>
          </div>
          <div className="cc-terminal-body">
            <span className="cc-prompt">$</span> claude
            <span className="cc-cursor" />
          </div>
          <div className="cc-terminal-hint label-mono">
            终端打开就能跑
          </div>
        </div>
      </div>
    </div>
  );
}
