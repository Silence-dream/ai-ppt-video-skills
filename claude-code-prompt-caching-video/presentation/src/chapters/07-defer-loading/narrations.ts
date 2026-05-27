import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "工具太多怎么办？也不是中途移除。而是 defer loading。",
  "先放稳定的轻量 stub。只告诉模型工具名。还有需要时再加载。模型真的要用。再通过 tool search。把完整 schema 拉出来。",
  "这样前缀稳定。成本也不会被一堆工具说明拖死。",
];
