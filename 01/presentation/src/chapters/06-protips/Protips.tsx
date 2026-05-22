import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./Protips.css";

export default function ProtipsChapter({ step }: ChapterStepProps) {
  /* Step 0 — Shift+Tab: auto-accept */
  if (step === 0) {
    return (
      <div className="pt-scene scene-pad">
        <div className="pt-key-layout">
          <div className="pt-key-header">
            <MaskReveal show duration={900}>
              <span className="serif-cn">快捷键</span>
            </MaskReveal>
            <MaskReveal show delay={300} duration={900}>
              <span className="serif-it pt-em">省很多事</span>
            </MaskReveal>
          </div>

          <div className="pt-key-demo">
            <div className="pt-key-row">
              <div className="pt-key-cap pt-key-shift">
                <span className="pt-key-label">Shift</span>
              </div>
              <div className="pt-key-plus">+</div>
              <div className="pt-key-cap pt-key-tab">
                <span className="pt-key-label">Tab</span>
              </div>
            </div>

            <div className="pt-key-result">
              <div className="pt-toggle-track">
                <div className="pt-toggle-thumb" />
              </div>
              <div className="pt-toggle-label">Auto-accept 模式</div>
            </div>

            <div className="pt-key-detail">
              <div className="pt-detail-item">
                <span className="pt-detail-dot pt-dot-yellow" />
                <span>Bash 命令 — 需批准</span>
              </div>
              <div className="pt-detail-item">
                <span className="pt-detail-dot pt-dot-green" />
                <span>文件编辑 — 自动接受</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Step 1 — ! bash 模式 */
  if (step === 1) {
    return (
      <div className="pt-scene scene-pad">
        <div className="pt-bash-layout">
          <div className="pt-bash-header">
            <MaskReveal show duration={900}>
              <span className="display-en pt-bang">!</span>
            </MaskReveal>
            <MaskReveal show delay={300} duration={900}>
              <span className="serif-cn"> 直接跑 bash</span>
            </MaskReveal>
          </div>

          <div className="pt-bash-terminal">
            <div className="pt-term-bar">
              <span className="pt-dot" />
              <span className="pt-dot" />
              <span className="pt-dot" />
              <span className="pt-term-title mono">Claude Code</span>
            </div>
            <div className="pt-term-body">
              <div className="pt-bash-cmd">
                <span className="pt-prompt-char">$</span>
                <span className="pt-bang-char">!</span>
                <span className="pt-cmd-text">npm test</span>
              </div>
              <div className="pt-bash-output">
                <span className="pt-out-pass">PASS</span> utils.test.ts
              </div>
              <div className="pt-bash-output pt-out-2">
                Tests: 12 passed, 0 failed
              </div>
            </div>
          </div>

          <div className="pt-bash-note">
            <div className="pt-note-arrow" />
            <div className="pt-note-text">命令结果进入上下文 — Claude 下一轮能看见</div>
          </div>
        </div>
      </div>
    );
  }

  /* Step 2 — Escape 打断 */
  if (step === 2) {
    return (
      <div className="pt-scene scene-pad">
        <div className="pt-esc-layout">
          <div className="pt-esc-header">
            <MaskReveal show duration={900}>
              <span className="serif-cn">随时打断</span>
            </MaskReveal>
            <MaskReveal show delay={300} duration={900}>
              <span className="serif-it pt-em">不会崩</span>
            </MaskReveal>
          </div>

          <div className="pt-esc-demo">
            <div className="pt-esc-key-cap">
              <span className="pt-key-label">Esc</span>
            </div>

            <div className="pt-esc-scene-visual">
              <div className="pt-esc-code-stream">
                <div className="pt-code-line pt-line-active">Editing src/utils.ts...</div>
                <div className="pt-code-line pt-line-stopped">Writing line 42...</div>
                <div className="pt-code-line pt-line-faded">...</div>
              </div>
              <div className="pt-esc-stop-indicator">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect x="8" y="8" width="24" height="24" rx="4" fill="var(--accent)" />
                </svg>
              </div>
            </div>
          </div>

          <div className="pt-esc-tips">
            <div className="pt-esc-tip">
              <span className="pt-esc-badge badge-mono">1×</span>
              <span>打断当前操作</span>
            </div>
            <div className="pt-esc-tip">
              <span className="pt-esc-badge badge-mono">2×</span>
              <span>跳回历史记录</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Step 3 — print 模式: claude -p */
  if (step === 3) {
    return (
      <div className="pt-scene scene-pad">
        <div className="pt-sdk-layout">
          <div className="pt-sdk-header">
            <MaskReveal show duration={900}>
              <span className="display-en pt-sdk-title">claude -p</span>
            </MaskReveal>
            <MaskReveal show delay={400} duration={900}>
              <span className="serif-cn"> 直接出结果</span>
            </MaskReveal>
          </div>

          <div className="pt-sdk-terminal">
            <div className="pt-term-bar">
              <span className="pt-dot" />
              <span className="pt-dot" />
              <span className="pt-dot" />
              <span className="pt-term-title mono">Terminal</span>
            </div>
            <div className="pt-sdk-body">
              <div className="pt-sdk-cmd">
                <span className="pt-prompt-char">$</span>
                <span className="mono pt-sdk-cmd-text">
                  claude <span className="pt-flag">-p</span> <span className="pt-str">"分析这段日志"</span>
                </span>
              </div>
              <div className="pt-sdk-cmd pt-sdk-2">
                <span className="mono pt-sdk-cmd-text pt-sdk-indent">
                  <span className="pt-flag">--output-format</span> json
                </span>
              </div>
              <div className="pt-sdk-cmd pt-sdk-3">
                <span className="mono pt-sdk-cmd-text pt-sdk-indent">
                  <span className="pt-flag">--allowedTools</span> "Bash(git *)"
                </span>
              </div>
            </div>
          </div>

          <div className="pt-sdk-desc">
            <span className="label-mono">传 prompt · 选输出格式 · 指定允许的工具</span>
          </div>
        </div>
      </div>
    );
  }

  /* Step 4 — 管道 + CI */
  return (
    <div className="pt-scene scene-pad">
      <div className="pt-pipe-layout">
        <div className="pt-pipe-header">
          <MaskReveal show duration={900}>
            <span className="serif-cn">管道随便接</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="serif-it pt-em">CI 里直接用</span>
          </MaskReveal>
        </div>

        <div className="pt-pipe-flow">
          <div className="pt-pipe-node pt-pipe-1">
            <div className="pt-pipe-icon mono">cat</div>
            <div className="pt-pipe-label">日志 / 数据</div>
          </div>
          <div className="pt-pipe-connector" />
          <div className="pt-pipe-node pt-pipe-2">
            <div className="pt-pipe-icon mono pt-pipe-accent">claude</div>
            <div className="pt-pipe-label">分析</div>
          </div>
          <div className="pt-pipe-connector" />
          <div className="pt-pipe-node pt-pipe-3">
            <div className="pt-pipe-icon mono">jq</div>
            <div className="pt-pipe-label">提取结果</div>
          </div>
        </div>

        <div className="pt-pipe-examples">
          <div className="pt-pipe-example card pt-ex-1">
            <div className="pt-ex-label kicker">CI 流水线</div>
            <div className="pt-ex-text mono">PR 提交 → Claude 审查 → 自动评论</div>
          </div>
          <div className="pt-pipe-example card pt-ex-2">
            <div className="pt-ex-label kicker">事故响应</div>
            <div className="pt-ex-text mono">日志流入 → Claude 排查 → 输出根因</div>
          </div>
        </div>
      </div>
    </div>
  );
}
