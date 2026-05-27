import type { ChapterDef } from "./types";
import ColdopenChapter from "../chapters/01-coldopen/Coldopen";
import { narrations as coldopenNarrations } from "../chapters/01-coldopen/narrations";
import PrefixRuleChapter from "../chapters/02-prefix-rule/PrefixRule";
import { narrations as prefixRuleNarrations } from "../chapters/02-prefix-rule/narrations";
import FragilePrefixChapter from "../chapters/03-fragile-prefix/FragilePrefix";
import { narrations as fragilePrefixNarrations } from "../chapters/03-fragile-prefix/narrations";
import MessageStateChapter from "../chapters/04-message-state/MessageState";
import { narrations as messageStateNarrations } from "../chapters/04-message-state/narrations";
import ModelCacheChapter from "../chapters/05-model-cache/ModelCache";
import { narrations as modelCacheNarrations } from "../chapters/05-model-cache/narrations";
import StableToolsChapter from "../chapters/06-stable-tools/StableTools";
import { narrations as stableToolsNarrations } from "../chapters/06-stable-tools/narrations";
import DeferLoadingChapter from "../chapters/07-defer-loading/DeferLoading";
import { narrations as deferLoadingNarrations } from "../chapters/07-defer-loading/narrations";
import CacheSafeForkChapter from "../chapters/08-cache-safe-fork/CacheSafeFork";
import { narrations as cacheSafeForkNarrations } from "../chapters/08-cache-safe-fork/narrations";
import ChecklistChapter from "../chapters/09-checklist/Checklist";
import { narrations as checklistNarrations } from "../chapters/09-checklist/narrations";

/**
 * Order = order of presentation.
 *
 * Each chapter MUST provide a `narrations: Narration[]` array. Its length
 * is the chapter's step count — there is no `totalSteps` to maintain
 * separately. This guarantees the audio synthesis pipeline, the runtime
 * stepper, and the chapter `.tsx` switch on `step` cannot drift apart.
 *
 * Visual styling (color, fonts) comes entirely from the active theme —
 * chapters never hard-code palette / font names. See THEMES.md.
 */
export const CHAPTERS: ChapterDef[] = [
  {
    id: "coldopen",
    title: "缓存不是小技巧",
    narrations: coldopenNarrations,
    Component: ColdopenChapter,
  },
  {
    id: "prefix-rule",
    title: "前缀匹配决定一切",
    narrations: prefixRuleNarrations,
    Component: PrefixRuleChapter,
  },
  {
    id: "fragile-prefix",
    title: "小改动也会打碎缓存",
    narrations: fragilePrefixNarrations,
    Component: FragilePrefixChapter,
  },
  {
    id: "message-state",
    title: "动态状态走消息层",
    narrations: messageStateNarrations,
    Component: MessageStateChapter,
  },
  {
    id: "model-cache",
    title: "中途换模型不一定省钱",
    narrations: modelCacheNarrations,
    Component: ModelCacheChapter,
  },
  {
    id: "stable-tools",
    title: "工具集保持稳定",
    narrations: stableToolsNarrations,
    Component: StableToolsChapter,
  },
  {
    id: "defer-loading",
    title: "工具延迟加载",
    narrations: deferLoadingNarrations,
    Component: DeferLoadingChapter,
  },
  {
    id: "cache-safe-fork",
    title: "compaction 也要复用前缀",
    narrations: cacheSafeForkNarrations,
    Component: CacheSafeForkChapter,
  },
  {
    id: "checklist",
    title: "三件事先查起来",
    narrations: checklistNarrations,
    Component: ChecklistChapter,
  },
];
