import type { Narration } from "../../registry/types";

export const narrations: Narration[] = [
  "所以动态信息怎么传？别急着改 system prompt。",
  "时间变了。文件被用户改了。当前状态更新了。这些都可以放进下一条 message。",
  "Claude Code 会用类似 system-reminder 的标签。把新情况告诉模型。",
  "模型能看到更新。前面的稳定前缀。也还能继续命中。",
];
