import type { ChapterDef } from "./types";
import ColdopenChapter from "../chapters/01-coldopen/Coldopen";
import { narrations as coldopenNarrations } from "../chapters/01-coldopen/narrations";
import OnboardingChapter from "../chapters/02-onboarding/Onboarding";
import { narrations as onboardingNarrations } from "../chapters/02-onboarding/narrations";
import EditingChapter from "../chapters/03-editing/Editing";
import { narrations as editingNarrations } from "../chapters/03-editing/narrations";
import IterateChapter from "../chapters/04-iterate/Iterate";
import { narrations as iterateNarrations } from "../chapters/04-iterate/narrations";
import ContextChapter from "../chapters/05-context/Context";
import { narrations as contextNarrations } from "../chapters/05-context/narrations";
import ProtipsChapter from "../chapters/06-protips/Protips";
import { narrations as protipsNarrations } from "../chapters/06-protips/narrations";
import PoweruserChapter from "../chapters/07-poweruser/Poweruser";
import { narrations as poweruserNarrations } from "../chapters/07-poweruser/narrations";

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
    title: "冷开场：不只是补全",
    narrations: coldopenNarrations,
    Component: ColdopenChapter,
  },
  {
    id: "onboarding",
    title: "最佳起点：代码库问答",
    narrations: onboardingNarrations,
    Component: OnboardingChapter,
  },
  {
    id: "editing",
    title: "写代码：组合工具的力量",
    narrations: editingNarrations,
    Component: EditingChapter,
  },
  {
    id: "iterate",
    title: "最值钱的思路：给 Claude 反馈",
    narrations: iterateNarrations,
    Component: IterateChapter,
  },
  {
    id: "context",
    title: "上下文管理：CLAUDE.md",
    narrations: contextNarrations,
    Component: ContextChapter,
  },
  {
    id: "protips",
    title: "快捷键与 SDK",
    narrations: protipsNarrations,
    Component: ProtipsChapter,
  },
  {
    id: "poweruser",
    title: "高手玩法：并行会话",
    narrations: poweruserNarrations,
    Component: PoweruserChapter,
  },
];
