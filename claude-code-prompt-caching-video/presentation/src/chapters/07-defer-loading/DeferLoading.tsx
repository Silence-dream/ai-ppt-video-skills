import type { ChapterStepProps } from "../../registry/types";
import "./DeferLoading.css";

const stubs = ["Read", "Search", "Edit", "Shell", "Fetch", "Issue", "PR", "DB"];
const schemaLines = ["input_schema", "parameters", "permissions", "examples", "result_shape"];

function ToolStubs({ activeIndex = -1 }: { activeIndex?: number }) {
  return (
    <div className="dl-stub-grid" aria-hidden="true">
      {stubs.map((stub, index) => (
        <div className={`dl-stub ${index === activeIndex ? "dl-stub-active" : ""}`} key={stub}>
          <span>{stub}</span>
          <small>defer_loading</small>
        </div>
      ))}
    </div>
  );
}

function SchemaDrawer({ open = false }: { open?: boolean }) {
  return (
    <aside className={`dl-drawer ${open ? "dl-drawer-open" : ""}`} aria-hidden="true">
      <div className="dl-drawer-tab">full schema drawer</div>
      <div className="dl-schema-card">
        <strong>Search tool</strong>
        {schemaLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
      <div className="dl-schema-stack" />
    </aside>
  );
}

function SearchBeam() {
  return (
    <svg className="dl-search-beam" viewBox="0 0 760 300" aria-hidden="true">
      <path className="dl-beam-rail" d="M70 150 H322 C410 150 418 72 520 72 H690" />
      <path className="dl-beam-trace" d="M70 150 H322 C410 150 418 72 520 72 H690" />
      <circle className="dl-beam-node dl-beam-node-a" cx="70" cy="150" r="28" />
      <circle className="dl-beam-node dl-beam-node-b" cx="322" cy="150" r="28" />
      <circle className="dl-beam-node dl-beam-node-c" cx="520" cy="72" r="28" />
      <circle className="dl-beam-node dl-beam-node-d" cx="690" cy="72" r="28" />
    </svg>
  );
}

function PrefixLane() {
  return (
    <div className="dl-prefix-lane" aria-hidden="true">
      <div className="dl-prefix-stable">
        <span>stable prefix</span>
        <ToolStubs />
      </div>
      <div className="dl-prefix-break" />
      <div className="dl-late-load">
        <strong>loaded after search</strong>
        <span>full schema appears after the cached prefix</span>
      </div>
    </div>
  );
}

export default function DeferLoading({ step }: ChapterStepProps) {
  if (step === 0) {
    return (
      <section className="dl-scene dl-scene-stubs">
        <div className="dl-copy">
          <div className="dl-kicker">many tools / stable list</div>
          <h2>工具太多，也别中途移除。</h2>
          <p>全量 schema 很重，但工具清单本身要稳在前缀里。</p>
        </div>
        <ToolStubs />
        <SchemaDrawer />
      </section>
    );
  }

  if (step === 1) {
    return (
      <section className="dl-scene dl-scene-search">
        <div className="dl-copy">
          <div className="dl-kicker">tool search</div>
          <h2>需要时，再把完整定义拉出来。</h2>
          <p>前面只放轻量 stub：工具名，加上 defer_loading 标记。</p>
        </div>
        <ToolStubs activeIndex={1} />
        <SearchBeam />
        <SchemaDrawer open />
      </section>
    );
  }

  if (step === 2) {
    return (
      <section className="dl-scene dl-scene-prefix">
        <div className="dl-copy dl-copy-wide">
          <div className="dl-kicker">prefix stays still</div>
          <h2>完整 schema 只出现在后段。</h2>
          <p>前缀稳定，成本也不会被一堆工具说明拖死。</p>
        </div>
        <PrefixLane />
      </section>
    );
  }

  return (
    <section className="dl-scene dl-scene-prefix">
      <div className="dl-copy dl-copy-wide">
        <div className="dl-kicker">prefix stays still</div>
        <h2>完整 schema 只出现在后段。</h2>
        <p>前缀稳定，成本也不会被一堆工具说明拖死。</p>
      </div>
      <PrefixLane />
    </section>
  );
}
