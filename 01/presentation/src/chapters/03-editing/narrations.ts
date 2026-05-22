import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  // step 0 — 三个工具
  "问熟了，就可以开始用它写代码了。Claude Code 的工具集其实很小——编辑文件、跑 bash、搜索文件。就这三样，但它会自己组合，去探索、去构思、去改代码。",
  // step 1 — 规划先行
  "我的建议是，别上来就让它实现一个三千行的功能。先让它做个计划，'先别写代码，帮我列个方案'，你确认了再动手。",
  // step 2 — commit and push
  "你甚至可以直接说'commit and push to branch'，它自己去看 git log 学格式，建分支、推代码、发 PR，全搞定。",
];
