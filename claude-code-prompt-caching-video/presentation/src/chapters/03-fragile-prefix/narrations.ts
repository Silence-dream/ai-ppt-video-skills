import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "听起来不复杂。但它特别脆。文章里举了几个坑。",
  "比如把详细时间戳。塞进静态 system prompt。",
  "比如工具定义顺序。每次随机变一下。",
  "再比如工具参数里。可调用 agent 列表变了。",
  "这些改动看着都不大。但字节一变。缓存就被切开了。",
];
