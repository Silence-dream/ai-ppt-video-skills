import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./Iterate.css";

export default function IterateChapter({ step }: ChapterStepProps) {
  /* Step 0 — 反馈循环 */
  if (step === 0) {
    return (
      <div className="it-scene scene-pad">
        <div className="it-loop-layout">
          <div className="it-loop-header">
            <MaskReveal show duration={900}>
              <span className="serif-cn">关键是什么？</span>
            </MaskReveal>
            <MaskReveal show delay={500} duration={1000}>
              <span className="serif-it it-em">让 Claude 有反馈</span>
            </MaskReveal>
          </div>

          <div className="it-loop-ring">
            <svg className="it-ring-svg" viewBox="0 0 320 320" fill="none">
              {/* 圆环 */}
              <circle
                cx="160" cy="160" r="120"
                stroke="var(--rule)"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="it-ring-track"
              />
              {/* 动态弧线 */}
              <circle
                cx="160" cy="160" r="120"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeDasharray="200 554"
                strokeLinecap="round"
                className="it-ring-arc"
              />
              {/* 箭头 */}
              <polygon
                points="280,160 268,148 268,172"
                fill="var(--accent)"
                className="it-ring-arrow"
              />
            </svg>

            <div className="it-node it-node-exec">
              <div className="it-node-icon">run</div>
              <div className="it-node-label">执行</div>
            </div>
            <div className="it-node it-node-check">
              <div className="it-node-icon">chk</div>
              <div className="it-node-label">检查</div>
            </div>
            <div className="it-node it-node-feedback">
              <div className="it-node-icon">fb</div>
              <div className="it-node-label">反馈</div>
            </div>
          </div>

          <div className="it-tools-row">
            <div className="it-tool-badge badge-mono">
              <span className="dot-accent" /> 测试工具
            </div>
            <div className="it-tool-badge badge-mono">
              <span className="dot-accent" /> 截屏 / Puppeteer
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Step 1 — 迭代 2-3 轮 */
  return (
    <div className="it-scene scene-pad">
      <div className="it-iter-layout">
        <div className="it-iter-header">
          <MaskReveal show duration={900}>
            <span className="serif-cn">两三轮下来</span>
          </MaskReveal>
          <MaskReveal show delay={400} duration={900}>
            <span className="serif-it it-em">几乎完美</span>
          </MaskReveal>
        </div>

        <div className="it-rounds">
          <div className="it-round it-round-1">
            <div className="it-round-num hero-num">1</div>
            <div className="it-round-content card it-round-fail">
              <div className="it-round-preview">
                <div className="it-preview-bar it-bar-short" />
                <div className="it-preview-bar it-bar-wrong" />
                <div className="it-preview-bar it-bar-short" />
              </div>
              <div className="it-round-status it-status-fail">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6 6L14 14M14 6L6 14" stroke="#e85d4a" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <span>还差得远</span>
              </div>
            </div>
          </div>

          <div className="it-round-arrow" />

          <div className="it-round it-round-2">
            <div className="it-round-num hero-num">2</div>
            <div className="it-round-content card it-round-mid">
              <div className="it-round-preview">
                <div className="it-preview-bar it-bar-ok" />
                <div className="it-preview-bar it-bar-ok" />
                <div className="it-preview-bar it-bar-short" />
              </div>
              <div className="it-round-status it-status-mid">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="#e8a84a" strokeWidth="2.5" />
                  <path d="M10 7V11" stroke="#e8a84a" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>差一点</span>
              </div>
            </div>
          </div>

          <div className="it-round-arrow" />

          <div className="it-round it-round-3">
            <div className="it-round-num hero-num it-num-success">3</div>
            <div className="it-round-content card it-round-pass">
              <div className="it-round-preview">
                <div className="it-preview-bar it-bar-good" />
                <div className="it-preview-bar it-bar-good" />
                <div className="it-preview-bar it-bar-good" />
              </div>
              <div className="it-round-status it-status-pass">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="var(--accent)" strokeWidth="2.5" />
                  <path d="M7 10L9.5 12.5L14 7.5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>几乎完美</span>
              </div>
            </div>
          </div>
        </div>

        <div className="it-domains">
          <div className="it-domain label-mono">Web</div>
          <div className="it-domain-dot">·</div>
          <div className="it-domain label-mono">App</div>
          <div className="it-domain-dot">·</div>
          <div className="it-domain label-mono">测试</div>
        </div>
      </div>
    </div>
  );
}
