import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "别小看 prompt caching。对长会话 agent 来说。它不是省钱小技巧。它更像地基。地基一歪。上面的产品体验全跟着晃。",
  "Claude Code 这篇文章，讲得很直。长时间运行的 agent。为什么成本能压住？为什么响应还能快？很大一部分答案。就是 prompt caching。同一段前缀算过一次。后面能复用。成本少一截。延迟也少一截。",
  "但重点不是“用了缓存”。而是整个 harness。都要围着缓存设计。",
  "Claude Code 甚至会监控。缓存命中率。命中率低了就报警。严重的时候按事故处理。这挺夸张。也挺合理。",
  "因为 agent 一旦跑长。几百分点的缓存损失。就会变成真金白银。还会变成用户等得烦。",
];

