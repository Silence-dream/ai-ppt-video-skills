import type { ChapterDef } from "./types";
import HookChapter from "../chapters/01-hook/Hook";
import { narrations as hookNarrations } from "../chapters/01-hook/narrations";
import LlmChapter from "../chapters/02-llm/Llm";
import { narrations as llmNarrations } from "../chapters/02-llm/narrations";
import PromptChapter from "../chapters/03-prompt/Prompt";
import { narrations as promptNarrations } from "../chapters/03-prompt/narrations";
import WorkflowChapter from "../chapters/04-workflow/Workflow";
import { narrations as workflowNarrations } from "../chapters/04-workflow/narrations";
import ToolUseChapter from "../chapters/05-tool-use/ToolUse";
import { narrations as toolUseNarrations } from "../chapters/05-tool-use/narrations";
import AgentChapter from "../chapters/06-agent/Agent";
import { narrations as agentNarrations } from "../chapters/06-agent/narrations";
import AiCodingChapter from "../chapters/07-ai-coding/AiCoding";
import { narrations as aiCodingNarrations } from "../chapters/07-ai-coding/narrations";

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
    id: "hook",
    title: "开场钩子",
    narrations: hookNarrations,
    Component: HookChapter,
  },
  {
    id: "llm",
    title: "LLM",
    narrations: llmNarrations,
    Component: LlmChapter,
  },
  {
    id: "prompt",
    title: "Prompt",
    narrations: promptNarrations,
    Component: PromptChapter,
  },
  {
    id: "workflow",
    title: "Workflow",
    narrations: workflowNarrations,
    Component: WorkflowChapter,
  },
  {
    id: "tool-use",
    title: "Tool Use",
    narrations: toolUseNarrations,
    Component: ToolUseChapter,
  },
  {
    id: "agent",
    title: "Agent",
    narrations: agentNarrations,
    Component: AgentChapter,
  },
  {
    id: "ai-coding",
    title: "AI Coding",
    narrations: aiCodingNarrations,
    Component: AiCodingChapter,
  },
];
