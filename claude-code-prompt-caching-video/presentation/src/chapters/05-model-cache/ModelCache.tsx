import type { ChapterStepProps } from "../../registry/types";
import "./ModelCache.css";

const contextBlocks = Array.from({ length: 10 }, (_, index) => `ctx-${index + 1}`);

function ModelSilos() {
  return (
    <div className="mc-silos" aria-hidden="true">
      <div className="mc-model mc-model--opus">
        <div className="mc-model-name">Opus</div>
        <div className="mc-cache-column">
          {contextBlocks.map((block) => (
            <span key={block} />
          ))}
        </div>
        <strong>long cached context</strong>
      </div>
      <div className="mc-transfer">
        <svg viewBox="0 0 280 160" role="img">
          <path className="mc-transfer-path" d="M22 80 H258" />
          <path className="mc-transfer-cut" d="M122 42 L158 118" />
        </svg>
        <span>cache is model-scoped</span>
      </div>
      <div className="mc-model mc-model--haiku">
        <div className="mc-model-name">Haiku</div>
        <div className="mc-empty-cache">
          <span />
        </div>
        <strong>empty cache</strong>
      </div>
    </div>
  );
}

function CostCollision() {
  return (
    <div className="mc-cost" aria-hidden="true">
      <div className="mc-price-tag">
        <span>cheaper model</span>
        <strong>Haiku</strong>
      </div>
      <div className="mc-rebuild">
        <div className="mc-rebuild-bar" />
        <div className="mc-rebuild-label">rebuild prompt cache</div>
      </div>
      <div className="mc-equation">
        <span>lower token price</span>
        <b>+</b>
        <span>uncached long context</span>
        <strong>可能更贵</strong>
      </div>
    </div>
  );
}

function HandoffCard() {
  return (
    <div className="mc-handoff" aria-hidden="true">
      <div className="mc-agent mc-agent--source">
        <span>original model</span>
        <strong>prepare hand-off</strong>
      </div>
      <svg className="mc-handoff-svg" viewBox="0 0 560 180" role="img">
        <path className="mc-handoff-path" d="M24 90 C130 90 130 32 224 32 H338 C430 32 430 90 536 90" />
      </svg>
      <div className="mc-card">
        <div>task</div>
        <div>background</div>
        <div>constraints</div>
      </div>
      <div className="mc-agent mc-agent--target">
        <span>subagent</span>
        <strong>focused task</strong>
      </div>
    </div>
  );
}

export default function ModelCache({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <section className="mc-scene mc-scene-silos">
        <div className="mc-copy">
          <div className="mc-kicker">model-scoped cache</div>
          <h2>中途换模型，不一定省钱。</h2>
          <p>Opus 上堆起来的长缓存，不能直接搬给 Haiku 用。</p>
        </div>
        <ModelSilos />
      </section>
    );
  }

  if (step === 1) {
    return (
      <section className="mc-scene mc-scene-cost">
        <div className="mc-copy">
          <div className="mc-kicker">cheap can become expensive</div>
          <h2>便宜标签，会被重建成本抵消。</h2>
          <p>十万 token 的会话突然切过去，新的模型可能要重新建整段 prompt cache。</p>
        </div>
        <CostCollision />
      </section>
    );
  }

  return (
    <section className="mc-scene mc-scene-handoff">
      <div className="mc-copy mc-copy-wide">
        <div className="mc-kicker">subagent hand-off</div>
        <h2>换模型前，先压成任务交接。</h2>
        <p>原模型整理任务、背景和限制；另一个模型只处理这个子任务。</p>
      </div>
      <HandoffCard />
    </section>
  );
}
