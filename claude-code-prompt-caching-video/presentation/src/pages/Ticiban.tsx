import { useEffect, useRef, useState, useCallback } from "react";
import { CHAPTERS } from "../registry/chapters";

interface SyncMessage {
  type: "step-change" | "control";
  chapterId?: string;
  step?: number;
  action?: "prev" | "next" | "jump" | "ping";
  targetChapterId?: string;
  targetStep?: number;
}

interface ChapterItem {
  chapterId: string;
  chapterTitle: string;
  step: number;
  text: string;
  globalIndex: number;
}

export default function Ticiban() {
  const [activeIndex, setActiveIndex] = useState(0);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 构建所有章节的所有步骤列表
  const allItems: ChapterItem[] = [];
  CHAPTERS.forEach((ch) => {
    ch.narrations.forEach((text, i) => {
      if (text.trim()) {
        allItems.push({
          chapterId: ch.id,
          chapterTitle: ch.title,
          step: i,
          text,
          globalIndex: allItems.length,
        });
      }
    });
  });

  // 初始化 BroadcastChannel
  useEffect(() => {
    const channel = new BroadcastChannel("presentation-sync");
    channelRef.current = channel;

    channel.onmessage = (event: MessageEvent<SyncMessage>) => {
      if (event.data.type === "step-change") {
        const { chapterId, step } = event.data;
        const idx = allItems.findIndex(
          (item) => item.chapterId === chapterId && item.step === step
        );
        if (idx >= 0) {
          setActiveIndex(idx);
        }
      }
    };

    // 发送 ping 请求当前状态
    channel.postMessage({ type: "control", action: "ping" } as SyncMessage);

    return () => channel.close();
  }, [allItems]);

  // 自动滚动到当前条目
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ block: "center" });
    }
  }, [activeIndex]);

  // 发送控制指令
  const sendControl = useCallback(
    (action: "prev" | "next" | "jump", target?: ChapterItem) => {
      if (!channelRef.current) return;
      const msg: SyncMessage = {
        type: "control",
        action,
      };
      if (target) {
        msg.targetChapterId = target.chapterId;
        msg.targetStep = target.step;
      }
      channelRef.current.postMessage(msg);
    },
    []
  );

  // 导航函数
  const goNext = useCallback(() => {
    const nextIdx = Math.min(activeIndex + 1, allItems.length - 1);
    setActiveIndex(nextIdx);
    sendControl("next");
  }, [activeIndex, allItems.length, sendControl]);

  const goPrev = useCallback(() => {
    const prevIdx = Math.max(activeIndex - 1, 0);
    setActiveIndex(prevIdx);
    sendControl("prev");
  }, [activeIndex, sendControl]);

  const jumpTo = useCallback(
    (item: ChapterItem) => {
      setActiveIndex(item.globalIndex);
      sendControl("jump", item);
    },
    [sendControl]
  );

  // 键盘控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "d":
        case "D":
          goNext();
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          goPrev();
          break;
        case " ":
          e.preventDefault();
          goNext();
          break;
        case "r":
        case "R":
          setActiveIndex(0);
          jumpTo(allItems[0]);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, jumpTo, allItems]);

  // 按章节分组
  const chapters = CHAPTERS.map((ch) => ({
    id: ch.id,
    title: ch.title,
    items: allItems.filter((item) => item.chapterId === ch.id),
  }));

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#e5e5e5",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* 左侧点击区域 - 上一步 */}
      <div
        onClick={goPrev}
        style={{
          width: "50px",
          cursor: "pointer",
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.3,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.3")}
      >
        <span style={{ fontSize: "24px", color: "#666" }}>&lt;</span>
      </div>

      {/* 主内容区 */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "40px 20px",
          scrollBehavior: "smooth",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 600,
            marginBottom: "30px",
            color: "#3b82f6",
            textAlign: "center",
          }}
        >
          提词板
        </h1>

        {chapters.map((ch) => (
          <div key={ch.id} style={{ marginBottom: "30px" }}>
            {/* 章节标题 */}
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#3b82f6",
                marginBottom: "12px",
                paddingBottom: "8px",
                borderBottom: "1px solid #1e3a5f",
              }}
            >
              {ch.title}
            </h2>

            {/* 步骤列表 */}
            {ch.items.map((item) => {
              const isActive = item.globalIndex === activeIndex;
              return (
                <div
                  key={`${item.chapterId}-${item.step}`}
                  ref={isActive ? activeRef : undefined}
                  onClick={() => jumpTo(item)}
                  style={{
                    padding: "12px 16px",
                    marginBottom: "8px",
                    borderLeft: isActive
                      ? "4px solid #3b82f6"
                      : "4px solid transparent",
                    backgroundColor: isActive
                      ? "rgba(59, 130, 246, 0.1)"
                      : "transparent",
                    opacity: isActive ? 1 : 0.3,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    borderRadius: "4px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.opacity = "0.5";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.opacity = "0.3";
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      marginRight: "8px",
                    }}
                  >
                    {item.step + 1}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.6,
                      color: isActive ? "#fff" : "#999",
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 右侧点击区域 - 下一步 */}
      <div
        onClick={goNext}
        style={{
          width: "50px",
          cursor: "pointer",
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.3,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.3")}
      >
        <span style={{ fontSize: "24px", color: "#666" }}>&gt;</span>
      </div>

      {/* 底部状态栏 */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "10px 20px",
          backgroundColor: "rgba(0,0,0,0.8)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "12px",
          color: "#666",
        }}
      >
        <span>
          {activeIndex + 1} / {allItems.length}
        </span>
        <span>
          {allItems[activeIndex]?.chapterTitle} - 步骤{" "}
          {(allItems[activeIndex]?.step ?? 0) + 1}
        </span>
        <span>← → 或 A D 导航 | 空格前进 | R 重置</span>
      </div>
    </div>
  );
}
