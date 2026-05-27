import { useEffect, useRef, useState } from "react";
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
  const [activeChapter, setActiveChapter] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const activeRef = useRef<HTMLDivElement | null>(null);

  // 初始化 BroadcastChannel
  useEffect(() => {
    const ch = new BroadcastChannel("presentation-sync");
    channelRef.current = ch;

    ch.onmessage = (e: MessageEvent<SyncMessage>) => {
      if (e.data.type === "step-change" && e.data.chapterId != null) {
        setActiveChapter(e.data.chapterId);
        setActiveStep(e.data.step ?? 0);
      }
    };

    // ping 主页面请求当前状态
    ch.postMessage({ type: "control", action: "ping" } satisfies SyncMessage);

    return () => ch.close();
  }, []);

  // 自动滚动到当前条目
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [activeChapter, activeStep]);

  // 键盘控制
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      const ch = channelRef.current;
      if (!ch) return;

      if (e.key === "ArrowRight" || e.key === "d" || e.key === " ") {
        e.preventDefault();
        ch.postMessage({ type: "control", action: "next" } satisfies SyncMessage);
      } else if (e.key === "ArrowLeft" || e.key === "a") {
        e.preventDefault();
        ch.postMessage({ type: "control", action: "prev" } satisfies SyncMessage);
      } else if (e.key === "r") {
        ch.postMessage({
          type: "control",
          action: "jump",
          targetChapterId: CHAPTERS[0]?.id,
          targetStep: 0,
        } satisfies SyncMessage);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // 发送跳转指令
  const jumpTo = (chapterId: string, step: number) => {
    channelRef.current?.postMessage({
      type: "control",
      action: "jump",
      targetChapterId: chapterId,
      targetStep: step,
    } satisfies SyncMessage);
  };

  // 边缘点击区域
  const goNext = () =>
    channelRef.current?.postMessage({ type: "control", action: "next" } satisfies SyncMessage);
  const goPrev = () =>
    channelRef.current?.postMessage({ type: "control", action: "prev" } satisfies SyncMessage);

  return (
    <div style={styles.root}>
      {/* 左侧点击区 */}
      <div style={styles.edgeLeft} onClick={goPrev} />

      {/* 右侧点击区 */}
      <div style={styles.edgeRight} onClick={goNext} />

      {/* 内容 */}
      <div style={styles.content}>
        <h1 style={styles.heading}>提词板</h1>
        {CHAPTERS.map((ch) => (
          <div key={ch.id}>
            <div style={styles.chapterTitle}>{ch.title}</div>
            {ch.narrations.map((text, si) => {
              const isActive = activeChapter === ch.id && activeStep === si;
              return (
                <div
                  key={`${ch.id}-${si}`}
                  ref={isActive ? activeRef : undefined}
                  style={{
                    ...styles.item,
                    ...(isActive ? styles.itemActive : styles.itemInactive),
                  }}
                  onClick={() => jumpTo(ch.id, si)}
                >
                  <span style={styles.stepNum}>{si + 1}</span>
                  <span style={styles.text}>{text || "(静音)"}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    position: "relative",
    width: "100vw",
    minHeight: "100vh",
    background: "#111",
    color: "#e0e0e0",
    fontFamily: "'Noto Sans SC', 'PingFang SC', sans-serif",
  },
  edgeLeft: {
    position: "fixed",
    left: 0,
    top: 0,
    width: 50,
    height: "100vh",
    zIndex: 5,
    cursor: "pointer",
  },
  edgeRight: {
    position: "fixed",
    right: 0,
    top: 0,
    width: 50,
    height: "100vh",
    zIndex: 5,
    cursor: "pointer",
  },
  content: {
    maxWidth: 800,
    margin: "0 auto",
    padding: "32px 80px",
  },
  heading: {
    fontSize: 28,
    fontWeight: 700,
    color: "#3b82f6",
    marginBottom: 32,
    borderBottom: "2px solid #3b82f6",
    paddingBottom: 12,
  },
  chapterTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#3b82f6",
    marginTop: 24,
    marginBottom: 12,
    borderBottom: "1px solid #333",
    paddingBottom: 8,
  },
  item: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "10px 16px",
    borderRadius: 6,
    cursor: "pointer",
    marginBottom: 4,
    transition: "all 0.2s",
  },
  itemActive: {
    borderLeft: "4px solid #3b82f6",
    background: "rgba(59, 130, 246, 0.1)",
    color: "#fff",
    opacity: 1,
  },
  itemInactive: {
    borderLeft: "4px solid transparent",
    opacity: 0.3,
  },
  stepNum: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#666",
    minWidth: 24,
    flexShrink: 0,
  },
  text: {
    fontSize: 18,
    lineHeight: 1.6,
  },
};
