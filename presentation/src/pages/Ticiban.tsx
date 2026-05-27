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

interface CursorState {
  chapterId: string;
  step: number;
}

/**
 * 提词板页面
 * 使用 BroadcastChannel 实现与主演示页面的双向同步
 */
export default function Ticiban() {
  const [cursor, setCursor] = useState<CursorState>({
    chapterId: CHAPTERS[0]?.id ?? "",
    step: 0,
  });

  const channelRef = useRef<BroadcastChannel | null>(null);
  const activeRef = useRef<HTMLDivElement | null>(null);

  // 初始化 BroadcastChannel
  useEffect(() => {
    const channel = new BroadcastChannel("presentation-sync");
    channelRef.current = channel;

    // 监听来自主页面的消息
    channel.onmessage = (event: MessageEvent<SyncMessage>) => {
      if (event.data.type === "step-change" && event.data.chapterId !== undefined) {
        setCursor({
          chapterId: event.data.chapterId,
          step: event.data.step ?? 0,
        });
      }
    };

    // 打开时发送 ping 请求当前状态
    channel.postMessage({ type: "control", action: "ping" });

    return () => {
      channel.close();
    };
  }, []);

  // 自动滚动到当前步骤
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [cursor]);

  // 键盘控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!channelRef.current) return;

      switch (e.key) {
        case "ArrowRight":
        case "d":
        case "D":
        case " ":
          e.preventDefault();
          channelRef.current.postMessage({ type: "control", action: "next" });
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          channelRef.current.postMessage({ type: "control", action: "prev" });
          break;
        case "r":
        case "R":
          e.preventDefault();
          channelRef.current.postMessage({
            type: "control",
            action: "jump",
            targetChapterId: CHAPTERS[0]?.id,
            targetStep: 0,
          });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 点击边缘区域控制
  const handleEdgeClick = (direction: "prev" | "next") => {
    if (!channelRef.current) return;
    channelRef.current.postMessage({ type: "control", action: direction });
  };

  // 点击具体步骤跳转
  const handleStepClick = (chapterId: string, step: number) => {
    if (!channelRef.current) return;
    channelRef.current.postMessage({
      type: "control",
      action: "jump",
      targetChapterId: chapterId,
      targetStep: step,
    });
  };

  // 计算全局步骤索引
  const getGlobalStepIndex = (chapterId: string, step: number): number => {
    let index = 0;
    for (const ch of CHAPTERS) {
      if (ch.id === chapterId) {
        return index + step;
      }
      index += ch.narrations.length;
    }
    return index;
  };

  return (
    <div className="ticiban">
      {/* 左侧边缘点击区域 */}
      <div
        className="ticiban__edge ticiban__edge--left"
        onClick={() => handleEdgeClick("prev")}
      />

      {/* 右侧边缘点击区域 */}
      <div
        className="ticiban__edge ticiban__edge--right"
        onClick={() => handleEdgeClick("next")}
      />

      {/* 内容区域 */}
      <div className="ticiban__content">
        <div className="ticiban__header">
          <h1 className="ticiban__title">提词板</h1>
          <div className="ticiban__controls">
            <span className="ticiban__key">← →</span> 或{" "}
            <span className="ticiban__key">A D</span> 控制
            <span className="ticiban__key">Space</span> 下一步
            <span className="ticiban__key">R</span> 重置
          </div>
        </div>

        <div className="ticiban__chapters">
          {CHAPTERS.map((ch) => {
            const isCurrentChapter = ch.id === cursor.chapterId;

            return (
              <div key={ch.id} className="ticiban__chapter">
                {/* 章节标题 */}
                <div
                  className={`ticiban__chapter-title ${isCurrentChapter ? "active" : ""}`}
                >
                  {ch.title}
                </div>

                {/* 章节步骤 */}
                <div className="ticiban__steps">
                  {ch.narrations.map((text, stepIndex) => {
                    const isActive =
                      isCurrentChapter && stepIndex === cursor.step;
                    const globalIndex = getGlobalStepIndex(ch.id, stepIndex);

                    return (
                      <div
                        key={stepIndex}
                        ref={isActive ? activeRef : null}
                        className={`ticiban__step ${isActive ? "active" : ""}`}
                        onClick={() => handleStepClick(ch.id, stepIndex)}
                      >
                        <span className="ticiban__step-number">
                          {globalIndex + 1}
                        </span>
                        <span className="ticiban__step-text">
                          {text || "（无口播）"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .ticiban {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #0a0a0a;
          color: #e0e0e0;
          font-family: var(--font-body, "JetBrains Mono", monospace);
          display: flex;
          overflow: hidden;
        }

        .ticiban__edge {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50px;
          z-index: 5;
          cursor: pointer;
          transition: background 0.2s;
        }

        .ticiban__edge:hover {
          background: rgba(65, 255, 151, 0.05);
        }

        .ticiban__edge--left {
          left: 0;
        }

        .ticiban__edge--right {
          right: 0;
        }

        .ticiban__content {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 40px 80px;
          overflow-y: auto;
        }

        .ticiban__header {
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(65, 255, 151, 0.2);
        }

        .ticiban__title {
          font-size: 28px;
          font-weight: 500;
          color: #41ff97;
          margin: 0 0 12px 0;
        }

        .ticiban__controls {
          font-size: 14px;
          color: #666;
        }

        .ticiban__key {
          display: inline-block;
          padding: 2px 8px;
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 4px;
          font-size: 12px;
          color: #41ff97;
          margin: 0 4px;
        }

        .ticiban__chapters {
          flex: 1;
        }

        .ticiban__chapter {
          margin-bottom: 32px;
        }

        .ticiban__chapter-title {
          font-size: 18px;
          font-weight: 600;
          color: #3b82f6;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(59, 130, 246, 0.3);
          margin-bottom: 12px;
        }

        .ticiban__chapter-title.active {
          color: #41ff97;
          border-bottom-color: rgba(65, 255, 151, 0.5);
        }

        .ticiban__steps {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .ticiban__step {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 8px 12px;
          border-left: 4px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
          opacity: 0.3;
        }

        .ticiban__step:hover {
          opacity: 0.5;
          background: rgba(255, 255, 255, 0.02);
        }

        .ticiban__step.active {
          opacity: 1;
          border-left-color: #3b82f6;
          background: rgba(59, 130, 246, 0.1);
        }

        .ticiban__step-number {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1a1a1a;
          border-radius: 4px;
          font-size: 12px;
          color: #666;
        }

        .ticiban__step.active .ticiban__step-number {
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
        }

        .ticiban__step-text {
          flex: 1;
          font-size: 14px;
          line-height: 1.6;
          color: #999;
        }

        .ticiban__step.active .ticiban__step-text {
          color: #fff;
        }
      `}</style>
    </div>
  );
}
