import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "还有一个坑。是 compaction。上下文快满了。你要总结前文。最简单的写法。是单独发一个请求。system prompt 写请总结。工具也不带。这看起来干净。",
  "但从缓存角度看。它从第一个 token。就和主会话不一样。所以整段长对话。都得按未缓存价格算。",
  "Claude Code 的做法。叫 cache-safe fork。compaction 那次调用。沿用父会话同一套 system prompt。同一套上下文。同一套工具定义。再把父会话 messages 放前面。末尾追加一个总结请求。这样 API 看到的前缀。几乎和上一轮一样。真正新增的。只是末尾那段总结指令。",
  "当然，这么做也有代价。你得预留 compaction buffer。不然上下文满到一滴不剩。连总结指令。和总结输出的位置都没有。所以缓存不是只看当下。还要给未来的维护动作。留空间。",
];
