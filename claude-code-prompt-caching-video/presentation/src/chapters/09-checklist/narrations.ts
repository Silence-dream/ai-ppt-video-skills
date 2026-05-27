import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "这篇文章最有用的地方。不是告诉你开一个缓存开关。而是提醒你。agent 架构里。稳定性是要设计出来的。",
  "如果你正在做 agent。可以先查三件事。你的静态 prompt 里。有没有时间戳？动态状态，应该走 message。",
  "工具定义顺序。是不是每轮一致？工具列表和模型选择。是不是中途乱换？状态切换用工具建模。工具加载用延迟发现。",
  "compaction。summary。skill execution 这种侧向任务。有没有沿用父会话前缀？把这三件事查起来。很多缓存问题。会提前暴露。",
];
