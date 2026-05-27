import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "还有一个反直觉点。中途换模型。不一定省钱。假设你已经用 Opus。聊了十万 token。现在来了个简单问题。你想切 Haiku。听起来便宜。",
  "但 Haiku 没有 Opus 的缓存。它得重新建一遍。这一把可能更贵。",
  "更好的办法。是用 subagent 交接。让原来的模型。先准备一段 hand-off。把任务、背景、限制讲清楚。然后另一个模型。只处理这个子任务。Claude Code 里的 Explore agents。就经常这么干。",
];
