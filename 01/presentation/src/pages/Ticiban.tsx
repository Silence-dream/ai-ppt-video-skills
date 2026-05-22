import { useEffect, useRef, useState, useCallback } from "react";
import { CHAPTERS } from "../registry/chapters";

interface Cursor {
  chapter: number;
  step: number;
}

/** 从所有章节构建扁平化的条目列表 */
interface Entry {
  chapterIdx: number;
  chapterId: string;
  chapterTitle: string;
  stepIdx: number;
  text: string;
}

function buildEntries(): Entry[] {
  const entries: Entry[] = [];
  CHAPTERS.forEach((ch, ci) => {
    ch.narrations.forEach((text, si) => {
      entries.push({
        chapterIdx: ci,
        chapterId: ch.id,
        chapterTitle: ch.title,
        stepIdx: si,
        text,
      });
    });
  });
  return entries;
}

const ALL_ENTRIES = buildEntries();

export default function Ticiban() {
  const [cursor, setCursor] = useState<Cursor>({ chapter: 0, step: 0 });
  const activeRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);

  // 当前高亮的全局 index
  const activeIndex = ALL_ENTRIES.findIndex(
    (e) => e.chapterIdx === cursor.chapter && e.stepIdx === cursor.step,
  );

  // 自动滚动到当前条目
  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeIndex]);

  // 初始化 BroadcastChannel
  useEffect(() => {
    const channel = new BroadcastChannel("presentation-sync");
    channelRef.current = channel;

    channel.onmessage = (event) => {
      const data = event.data;
      if (data.type === "step-change") {
        setCursor({ chapter: data.chapter, step: data.step });
      }
    };

    // 向主页面 ping 请求当前状态
    channel.postMessage({ type: "control", action: "ping" });

    return () => {
      channel.close();
    };
  }, []);

  // 向主页面发送控制指令
  const sendControl = useCallback(
    (action: string, target?: Cursor) => {
      channelRef.current?.postMessage({
        type: "control",
        action,
        ...(target
          ? { targetChapter: target.chapter, targetStep: target.step }
          : {}),
      });
    },
    [],
  );

  // 跳转到指定 entry
  const jumpTo = useCallback(
    (entry: Entry) => {
      const newCursor = { chapter: entry.chapterIdx, step: entry.stepIdx };
      setCursor(newCursor);
      sendControl("jump", newCursor);
    },
    [sendControl],
  );

  // 前进 / 后退
  const goNext = useCallback(() => {
    if (activeIndex < ALL_ENTRIES.length - 1) {
      const next = ALL_ENTRIES[activeIndex + 1]!;
      jumpTo(next);
    }
  }, [activeIndex, jumpTo]);

  const goPrev = useCallback(() => {
    if (activeIndex > 0) {
      const prev = ALL_ENTRIES[activeIndex - 1]!;
      jumpTo(prev);
    }
  }, [activeIndex, jumpTo]);

  // 键盘控制
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        const first = ALL_ENTRIES[0]!;
        jumpTo(first);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, jumpTo]);

  // 点击左右边缘前进/后退
  const handleEdgeClick = useCallback(
    (side: "left" | "right") => {
      if (side === "left") goPrev();
      else goNext();
    },
    [goNext, goPrev],
  );

  // 按章节分组渲染
  let lastChapterId = "";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0a",
        color: "#e0e0e0",
        fontFamily:
          '"Noto Sans SC", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        display: "flex",
        overflow: "hidden",
      }}
    >
      {/* 左侧点击区域 */}
      <div
        onClick={() => handleEdgeClick("left")}
        style={{
          width: 50,
          flexShrink: 0,
          cursor: "pointer",
          zIndex: 5,
        }}
      />

      {/* 主内容区 */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "40px 24px",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: "#666",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          提词板 — 按 ← → / A D / 空格切换
        </div>

        {ALL_ENTRIES.map((entry, i) => {
          const isActive = i === activeIndex;
          const isNewChapter = entry.chapterId !== lastChapterId;
          lastChapterId = entry.chapterId;

          return (
            <div key={`${entry.chapterId}-${entry.stepIdx}`}>
              {/* 章节标题 */}
              {isNewChapter && (
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#3b82f6",
                    marginTop: i === 0 ? 0 : 36,
                    marginBottom: 16,
                    paddingBottom: 10,
                    borderBottom: "1px solid #1e293b",
                    letterSpacing: "0.02em",
                  }}
                >
                  {entry.chapterTitle}
                </div>
              )}

              {/* 口播条目 */}
              <div
                ref={isActive ? activeRef : undefined}
                onClick={() => jumpTo(entry)}
                style={{
                  padding: "12px 16px",
                  borderLeft: isActive
                    ? "4px solid #3b82f6"
                    : "4px solid transparent",
                  background: isActive
                    ? "rgba(59, 130, 246, 0.08)"
                    : "transparent",
                  marginBottom: 8,
                  cursor: "pointer",
                  borderRadius: "0 6px 6px 0",
                  transition: "all 0.2s ease",
                  opacity: isActive ? 1 : 0.3,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.opacity = "0.5";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.opacity = "0.3";
                }}
              >
                <div
                  style={{
                    fontSize: isActive ? 20 : 17,
                    lineHeight: 1.7,
                    color: isActive ? "#ffffff" : "#a0a0a0",
                    fontWeight: isActive ? 500 : 400,
                    transition: "all 0.2s ease",
                  }}
                >
                  {entry.text || "(静默过渡)"}
                </div>
              </div>
            </div>
          );
        })}

        <div
          style={{
            fontSize: 12,
            color: "#444",
            textAlign: "center",
            marginTop: 40,
            paddingBottom: 40,
          }}
        >
          {CHAPTERS.length} 章 · {ALL_ENTRIES.length} 步
        </div>
      </div>

      {/* 右侧点击区域 */}
      <div
        onClick={() => handleEdgeClick("right")}
        style={{
          width: 50,
          flexShrink: 0,
          cursor: "pointer",
          zIndex: 5,
        }}
      />
    </div>
  );
}
