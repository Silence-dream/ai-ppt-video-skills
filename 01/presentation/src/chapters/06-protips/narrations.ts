import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  // step 0 — Shift+Tab
  "还有几个快捷键知道会省很多事。Shift+Tab 切换自动接受模式，不用每次都点确认。",
  // step 1 — ! bash
  "感叹号加命令可以直接跑 bash，Claude 下一轮能看见结果。",
  // step 2 — Escape
  "Escape 随时打断，不会崩。",
  // step 3 — print 模式 claude -p
  "Claude Code 还有个 print 模式，终端里 claude -p 加上 prompt，直接出结果，不进交互界面。加 output-format json 出结构化数据，管道接 jq 随便处理。CI 里直接用，PR 提交自动审查，事故日志自动排查。",
  // step 4 — 管道 + CI
  "管道也随便接。把日志丢进去，它帮你分析。CI 流水线里跑，PR 自动审查，事故自动排查。",
];
