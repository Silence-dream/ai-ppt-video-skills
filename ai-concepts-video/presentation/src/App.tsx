import "./styles/fonts.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/animations.css";

import { useCallback, useEffect, useRef } from "react";
import { AutoStartGate } from "./components/AutoStartGate";
import { AutoToggle } from "./components/AutoToggle";
import { ProgressBar } from "./components/ProgressBar";
import { Stage } from "./components/Stage";
import Ticiban from "./pages/Ticiban";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { useAutoMode } from "./hooks/useAutoMode";
import { useStepper } from "./hooks/useStepper";
import { CHAPTERS } from "./registry/chapters";

function estimateMs(text: string): number {
  if (!text) return 1500;
  return Math.max(1500, text.length * 250);
}

interface ControlMessage {
  type: "step-change" | "control";
  chapterId?: string;
  step?: number;
  action?: "prev" | "next" | "jump" | "ping";
  targetChapterId?: string;
  targetStep?: number;
}

export default function App() {
  const pathname = window.location.pathname;
  const isTiciban = pathname === "/ticiban" || pathname === "/ticiban/";

  if (isTiciban) {
    return <Ticiban />;
  }

  const stepper = useStepper(CHAPTERS);
  const ch = CHAPTERS[stepper.cursor.chapter]!;
  const Cmp = ch.Component;
  const stepText = ch.narrations[stepper.cursor.step]?.text ?? "";

  const { mode, cycleMode, autoStarted, setAutoStarted } = useAutoMode();

  // Ref to hold latest stepper so the BroadcastChannel handler can call jumpToChapter
  // without stale closure issues (the handler is registered once with [] deps).
  const stepperRef = useRef(stepper);
  stepperRef.current = stepper;

  const chRef = useRef(ch);
  chRef.current = ch;

  const channelRef = useRef<BroadcastChannel | null>(null);

  // Initialize BroadcastChannel once — handler reads from refs
  useEffect(() => {
    const channel = new BroadcastChannel("presentation-sync");
    channelRef.current = channel;

    channel.onmessage = (event: MessageEvent<ControlMessage>) => {
      if (event.data.type === "control") {
        if (event.data.action === "jump" && event.data.targetChapterId !== undefined && event.data.targetStep !== undefined) {
          const targetIdx = CHAPTERS.findIndex((c) => c.id === event.data.targetChapterId);
          if (targetIdx !== -1) {
            stepperRef.current.jumpToChapter(targetIdx, event.data.targetStep);
          }
        } else if (event.data.action === "ping") {
          const cur = stepperRef.current.cursor;
          const curCh = CHAPTERS[cur.chapter];
          channel.postMessage({
            type: "step-change",
            chapterId: curCh?.id,
            step: cur.step,
          } as ControlMessage);
        }
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  // Broadcast step changes when cursor changes
  useEffect(() => {
    if (channelRef.current) {
      channelRef.current.postMessage({
        type: "step-change",
        chapterId: ch.id,
        step: stepper.cursor.step,
      } as ControlMessage);
    }
  }, [ch.id, stepper.cursor.step]);

  const audioSrc =
    mode === "manual" || stepText === ""
      ? null
      : `${import.meta.env.BASE_URL}audio/${ch.id}/${stepper.cursor.step + 1}.mp3`;

  const onAutoAdvance = useCallback(() => stepper.next(), [stepper]);

  useAudioPlayer({
    src: audioSrc,
    mode,
    trailMs: 200,
    estimateFallbackMs: estimateMs(stepText),
    onAutoAdvance,
    autoStarted,
  });

  return (
    <>
      <Stage onAdvance={stepper.next}>
        <div key={ch.id} className="scene">
          <Cmp step={stepper.cursor.step} />
        </div>
      </Stage>
      <ProgressBar
        chapters={CHAPTERS}
        cursor={stepper.cursor}
        onJumpChapter={stepper.jumpToChapter}
      />
      <AutoToggle mode={mode} onCycle={cycleMode} />
      <AutoStartGate
        visible={mode === "auto" && !autoStarted}
        onStart={() => setAutoStarted(true)}
      />
    </>
  );
}
