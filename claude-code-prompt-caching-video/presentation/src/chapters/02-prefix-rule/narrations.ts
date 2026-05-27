import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "prompt caching 怕什么？怕前缀变。它是 prefix matching。从请求开头开始对。",
  "从请求开头开始对。对到 cache breakpoint。",
  "只要中间一个地方变了。后面就别想复用。",
  "所以顺序特别关键。稳定的东西放前面。会变的东西放后面。",
  "Claude Code 的顺序大概是这样。最前面是静态 system prompt。还有工具定义。然后是项目里的 CLAUDE.md。再往后是 session context。对话消息排在末尾。",
  "这套顺序的目的很简单。能让全局共享的先共享。项目内共享的再共享。会话内共享的继续共享。只有真正每轮变化的内容，留到末尾。",
];
