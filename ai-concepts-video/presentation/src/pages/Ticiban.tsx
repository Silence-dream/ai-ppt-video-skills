import { useEffect, useRef, useState } from "react";
import "./Ticiban.css";
import { CHAPTERS } from "../registry/chapters";

interface SyncMessage {
  type: "step-change" | "control";
  chapterId?: string;
  step?: number;
  action?: "prev" | "next" | "jump" | "ping";
  targetChapterId?: string;
  targetStep?: number;
}

export default function Ticiban() {
  const [currentChapterId, setCurrentChapterId] = useState<string>("coldopen");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const channelRef = useRef<BroadcastChannel | null>(null);
  const currentChapterIdRef = useRef(currentChapterId);
  currentChapterIdRef.current = currentChapterId;
  const currentStepRef = useRef(currentStep);
  currentStepRef.current = currentStep;

  const activeRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll active item into view
  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [currentStep, currentChapterId]);

  // Initialize channel once
  useEffect(() => {
    const channel = new BroadcastChannel("presentation-sync");
    channelRef.current = channel;

    channel.onmessage = (event: MessageEvent<SyncMessage>) => {
      if (event.data.type === "step-change" && event.data.chapterId && event.data.step !== undefined) {
        setCurrentChapterId(event.data.chapterId);
        setCurrentStep(event.data.step);
        setIsConnected(true);
      }
    };

    setTimeout(() => {
      channelRef.current?.postMessage({ type: "control", action: "ping" });
    }, 300);

    return () => {
      channel.close();
    };
  }, []);

  const navigateTo = (newChapterId: string, newStep: number) => {
    setCurrentChapterId(newChapterId);
    setCurrentStep(newStep);
    channelRef.current?.postMessage({
      type: "control",
      action: "jump",
      targetChapterId: newChapterId,
      targetStep: newStep,
    } as SyncMessage);
  };

  const goToPrev = () => {
    const chId = currentChapterIdRef.current;
    const step = currentStepRef.current;
    if (step > 0) {
      navigateTo(chId, step - 1);
    } else {
      const idx = CHAPTERS.findIndex((ch) => ch.id === chId);
      if (idx > 0) {
        const prev = CHAPTERS[idx - 1];
        navigateTo(prev.id, prev.narrations.length - 1);
      }
    }
  };

  const goToNext = () => {
    const chId = currentChapterIdRef.current;
    const step = currentStepRef.current;
    const ch = CHAPTERS.find((c) => c.id === chId);
    if (ch && step < ch.narrations.length - 1) {
      navigateTo(chId, step + 1);
    } else {
      const idx = CHAPTERS.findIndex((c) => c.id === chId);
      if (idx < CHAPTERS.length - 1) {
        navigateTo(CHAPTERS[idx + 1].id, 0);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D" || e.key === " ") {
        e.preventDefault();
        goToNext();
      } else if (e.key.toLowerCase() === "r") {
        e.preventDefault();
        navigateTo("coldopen", 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="ticiban-stage">
      {/* Header */}
      <div className="ticiban-header">
        <div className="ticiban-title">提词板</div>
        <div className="ticiban-status">
          <span className={`ticiban-dot ${isConnected ? "connected" : ""}`} />
          {isConnected ? "已连接" : "等待连接"}
        </div>
      </div>

      {/* Scrollable full script */}
      <div className="ticiban-list">
        {CHAPTERS.map((ch) => (
          <div key={ch.id} className="ticiban-chapter">
            <div className="ticiban-chapter-title">{ch.title}</div>

            {ch.narrations.map((n, i) => {
              const isCurrentChapter = ch.id === currentChapterId;
              const isActive = isCurrentChapter && i === currentStep;
              return (
                <div
                  key={n.id}
                  ref={isActive ? activeRef : undefined}
                  className={`ticiban-item ${isActive ? "active" : "inactive"}`}
                  onClick={() => navigateTo(ch.id, i)}
                >
                  <div className="ticiban-item-num">{i + 1}</div>
                  <div className="ticiban-item-text">{n.text || "（无声）"}</div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="ticiban-footer">
        <div className="ticiban-hint">
          ← → 切换 · 点击跳转
        </div>
      </div>

      {/* Click zones */}
      <div className="ticiban-nav-left" onClick={goToPrev} />
      <div className="ticiban-nav-right" onClick={goToNext} />
    </div>
  );
}
