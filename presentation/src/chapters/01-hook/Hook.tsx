import { useState, useEffect } from "react";
import "./Hook.css";

/**
 * hook 章节 - 钩子开场
 * 3 步：Hero 标语 → 概念词云 → 链路图预览
 */
export default function Hook({ step }: { step: number }) {
  return (
    <div className="hook-chapter">
      {step === 0 && <StepHero />}
      {step === 1 && <StepConcepts />}
      {step === 2 && <StepFlowPreview />}
    </div>
  );
}

/**
 * Step 0: Hero 标语
 * 大字展示核心问题
 */
function StepHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`hook-hero ${visible ? "visible" : ""}`}>
      <div className="hook-hero__label">{"// WEB3 ONCHAIN FLOW"}</div>
      <h1 className="hook-hero__title">
        <span className="hook-hero__prefix">{"$"}</span>
        你点了一下 Mint 按钮
        <br />
        <span className="hook-hero__suffix">链上到底发生了什么？</span>
      </h1>
      <div className="hook-hero__cursor">{"▌"}</div>
    </div>
  );
}

/**
 * Step 1: 概念词云
 * 展示核心概念，逐个浮现
 */
function StepConcepts() {
  const [visibleCount, setVisibleCount] = useState(0);
  const concepts = [
    { label: "账户", icon: "👤", desc: "链上身份" },
    { label: "钱包", icon: "🔑", desc: "钥匙管理" },
    { label: "签名", icon: "✍️", desc: "授权证明" },
    { label: "交易", icon: "📝", desc: "状态修改" },
    { label: "Gas", icon: "⛽", desc: "燃料费用" },
    { label: "合约", icon: "📜", desc: "自动执行" },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    concepts.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleCount(i + 1), 200 + i * 250)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="hook-concepts">
      <div className="hook-concepts__header">
        <span className="hook-concepts__prompt">{">"}</span>
        <span className="hook-concepts__title">ls /web3/concepts</span>
      </div>
      <div className="hook-concepts__grid">
        {concepts.map((c, i) => (
          <div
            key={c.label}
            className={`hook-concepts__item ${i < visibleCount ? "visible" : ""}`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="hook-concepts__icon">{c.icon}</span>
            <span className="hook-concepts__label">{c.label}</span>
            <span className="hook-concepts__desc">{c.desc}</span>
          </div>
        ))}
      </div>
      <div className="hook-concepts__question">
        {"// 这些词怎么串起来的？"}
      </div>
    </div>
  );
}

/**
 * Step 2: 链路图预览
 * 展示完整流程路径
 */
function StepFlowPreview() {
  const [visibleCount, setVisibleCount] = useState(0);
  const steps = [
    { id: "account", label: "账户", icon: "👤" },
    { id: "wallet", label: "钱包", icon: "🔑" },
    { id: "sign", label: "签名", icon: "✍️" },
    { id: "tx", label: "交易", icon: "📝" },
    { id: "gas", label: "Gas", icon: "⛽" },
    { id: "contract", label: "合约", icon: "📜" },
    { id: "confirm", label: "上链", icon: "✅" },
    { id: "explorer", label: "浏览器", icon: "🔍" },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    steps.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleCount(i + 1), 300 + i * 200)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="hook-flow">
      <div className="hook-flow__header">
        <span className="hook-flow__prompt">{">"}</span>
        <span className="hook-flow__title">cat /web3/flow.txt</span>
      </div>
      <div className="hook-flow__path">
        {steps.map((s, i) => (
          <div key={s.id} className="hook-flow__step-wrapper">
            <div
              className={`hook-flow__step ${i < visibleCount ? "visible" : ""}`}
            >
              <span className="hook-flow__icon">{s.icon}</span>
              <span className="hook-flow__label">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`hook-flow__arrow ${i < visibleCount - 1 ? "visible" : ""}`}
              >
                {"→"}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="hook-flow__footer">
        {"// 今天我们就把这条链路捋清楚"}
      </div>
    </div>
  );
}
