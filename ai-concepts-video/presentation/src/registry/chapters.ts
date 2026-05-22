import type { ChapterDef } from "./types";
import Coldopen from "../chapters/01-coldopen/Coldopen";
import { narrations as coldopenNarrations } from "../chapters/01-coldopen/narrations";
import LLM from "../chapters/02-llm/LLM";
import { narrations as llmNarrations } from "../chapters/02-llm/narrations";
import Prompt from "../chapters/03-prompt/Prompt";
import { narrations as promptNarrations } from "../chapters/03-prompt/narrations";
import Workflow from "../chapters/04-workflow/Workflow";
import { narrations as workflowNarrations } from "../chapters/04-workflow/narrations";
import Tooluse from "../chapters/05-tooluse/Tooluse";
import { narrations as tooluseNarrations } from "../chapters/05-tooluse/narrations";
import Agent from "../chapters/06-agent/Agent";
import { narrations as agentNarrations } from "../chapters/06-agent/narrations";
import AICoding from "../chapters/07-aicoding/AICoding";
import { narrations as aicodingNarrations } from "../chapters/07-aicoding/narrations";
import Summary from "../chapters/08-summary/Summary";
import { narrations as summaryNarrations } from "../chapters/08-summary/narrations";

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
    title: "冷开场",
    narrations: coldopenNarrations,
    Component: Coldopen,
  },
  {
    id: "llm",
    title: "LLM",
    narrations: llmNarrations,
    Component: LLM,
  },
  {
    id: "prompt",
    title: "Prompt",
    narrations: promptNarrations,
    Component: Prompt,
  },
  {
    id: "workflow",
    title: "Workflow",
    narrations: workflowNarrations,
    Component: Workflow,
  },
  {
    id: "tooluse",
    title: "Tool Use",
    narrations: tooluseNarrations,
    Component: Tooluse,
  },
  {
    id: "agent",
    title: "Agent",
    narrations: agentNarrations,
    Component: Agent,
  },
  {
    id: "aicoding",
    title: "AI Coding",
    narrations: aicodingNarrations,
    Component: AICoding,
  },
  {
    id: "summary",
    title: "总结",
    narrations: summaryNarrations,
    Component: Summary,
  },
];
