import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "工具也是一样。不要在会话中途。增删工具。工具定义属于前缀。你加一个工具。或者删一个工具。都会让缓存重新来过。这也是为什么 Plan Mode。设计得很有意思。",
  "直觉做法是，进 plan mode 的时候。把编辑工具拿掉。只留只读工具。但这样工具集变了。缓存就碎了。",
  "Claude Code 反过来做。工具集一直不变。进入 plan mode。退出 plan mode。本身就是工具。",
  "再用消息告诉模型。现在只能探索。不能改文件。计划完成再退出。",
];
