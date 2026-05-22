import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  // step 0 — CLAUDE.md 在根目录
  "再说一个容易被忽略的。CLAUDE.md，你把它放在项目根目录，每次开会话它自动读。",
  // step 1 — 文件内容
  "里面写什么？常用命令、架构决策、重要文件，团队共享的规范。",
  // step 2 — 子目录
  "你还可以在子目录里放 CLAUDE.md，Claude 到那个目录工作时会自动读。",
  // step 3 — 企业配置
  "公司层面还能统一配置——哪些命令自动批准，哪些 URL 禁止访问，一次配好全团队生效。",
];
