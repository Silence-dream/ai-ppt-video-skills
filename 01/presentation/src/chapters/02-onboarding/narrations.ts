import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  // step 0 — 空 prompt
  "第一次打开 Claude Code，面前就一个 prompt。很多人会懵——这能干啥？我跟你说，最好的上手方式，是问问题。",
  // step 1 — 入职时间对比
  "别急着让它写代码，先问它你的代码库是什么结构。Anthropic 培训新员工就是这么干的。以前技术入职要两三周，现在两三天就能上手。",
  // step 2 — git history
  "你问它'这个函数为什么有 15 个参数'，它会去翻 git history，找到是谁引入的、当时什么情况，给你一个完整的回答。",
  // step 3 — 问问题类型
  "问问题的类型很多。代码结构、git 历史、GitHub issue，甚至让它读 git log 帮你写周报。",
];
