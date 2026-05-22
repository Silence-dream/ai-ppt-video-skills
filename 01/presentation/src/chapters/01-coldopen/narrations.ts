import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  // step 0 — 一行一行 vs 一整个功能
  "别人用 AI 写代码，还是一行一行补全。我用 Claude Code，一整个功能直接出来。",
  // step 1 — agentic 核心特性
  "Claude Code 是 Anthropic 出的编程助手，但它跟那些补全工具完全不一样。它是 agentic 的——你让它写个函数，它直接把整个函数写完。你让它修 bug，它把相关文件全改了。",
  // step 2 — IDE 兼容 + 终端
  "而且不管你用什么 IDE，VS Code 也好，Xcode 也好，甚至 Emacs，都能用。终端打开就能跑，不用换工具。",
];
