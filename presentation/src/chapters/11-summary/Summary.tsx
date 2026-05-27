import { useState, useEffect } from "react";
import "./Summary.css";

/**
 * summary 章节 - 总结回顾
 * 5 步：核心观点 → 六个本质(前3) → 六个本质(后3) → 完整链路图 → 最终结论
 */
export default function Summary({ step }: { step: number }) {
  return (
    <div className="sm-chapter">
      {step === 0 && <StepCorePoint />}
      {step === 1 && <StepEssences1 />}
      {step === 2 && <StepEssences2 />}
      {step === 3 && <StepFlowDiagram />}
      {step === 4 && <StepConclusion />}
    </div>
  );
}

/**
 * Step 0: 核心观点
 * 大字展示核心观点
 */
function StepCorePoint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`sm-core ${visible ? "visible" : ""}`}>
      <div className="sm-core__label">{"// KEY INSIGHT"}</div>
      <h1 className="sm-core__title">
        不要只停留在
        <br />
        <span className="sm-core__highlight">会点按钮</span>
      </h1>
      <div className="sm-core__subtitle">
        {"理解每次点击背后发生了什么"}
      </div>
      <div className="sm-core__cursor">{"▌"}</div>
    </div>
  );
}

/**
 * Step 1: 六个本质（前 3）
 * 连接钱包、签名、交易
 */
function StepEssences1() {
  const [visibleCard, setVisibleCard] = useState(-1);
  const essences = [
    {
      label: "连接钱包",
      icon: (
        <svg viewBox="0 0 48 48" className="sm-essences__icon-svg">
          <rect
            x="8"
            y="14"
            width="32"
            height="20"
            rx="2"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle cx="32" cy="24" r="4" fill="var(--text-2)" />
          <line
            x1="16"
            y1="24"
            x2="28"
            y2="24"
            stroke="var(--rule)"
            strokeWidth="1"
          />
        </svg>
      ),
      essence: "DApp 读取你的账户地址",
    },
    {
      label: "签名",
      icon: (
        <svg viewBox="0 0 48 48" className="sm-essences__icon-svg">
          <path
            d="M12 36 L20 28 L28 32 L36 20"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle cx="36" cy="20" r="3" fill="var(--text-2)" />
        </svg>
      ),
      essence: "证明你同意某个操作",
    },
    {
      label: "交易",
      icon: (
        <svg viewBox="0 0 48 48" className="sm-essences__icon-svg">
          <rect
            x="10"
            y="10"
            width="28"
            height="28"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <line
            x1="18"
            y1="20"
            x2="30"
            y2="20"
            stroke="var(--text-2)"
            strokeWidth="1.5"
          />
          <line
            x1="18"
            y1="26"
            x2="30"
            y2="26"
            stroke="var(--text-2)"
            strokeWidth="1.5"
          />
          <line
            x1="18"
            y1="32"
            x2="24"
            y2="32"
            stroke="var(--text-2)"
            strokeWidth="1.5"
          />
        </svg>
      ),
      essence: "向区块链提交状态修改请求",
    },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    essences.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCard(i), 300 + i * 500));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="sm-essences">
      <div className="sm-essences__header">
        <span className="sm-essences__prompt">{">"}</span>
        <span className="sm-essences__title">{"ls /web3/essences"}</span>
      </div>
      <div className="sm-essences__grid">
        {essences.map((e, i) => (
          <div
            key={e.label}
            className={`sm-essences__card ${i <= visibleCard ? "visible" : ""}`}
          >
            <div className="sm-essences__icon">{e.icon}</div>
            <div className="sm-essences__label">{e.label}</div>
            <div className="sm-essences__divider">{"───"}</div>
            <div className="sm-essences__essence">{e.essence}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Step 2: 六个本质（后 3）
 * Gas、合约、区块浏览器
 */
function StepEssences2() {
  const [visibleCard, setVisibleCard] = useState(-1);
  const essences = [
    {
      label: "Gas",
      icon: (
        <svg viewBox="0 0 48 48" className="sm-essences__icon-svg">
          <rect
            x="14"
            y="8"
            width="20"
            height="32"
            rx="2"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <rect
            x="18"
            y="12"
            width="12"
            height="8"
            fill="var(--text-2)"
            opacity="0.6"
          />
          <line
            x1="18"
            y1="28"
            x2="30"
            y2="28"
            stroke="var(--rule)"
            strokeWidth="1"
          />
        </svg>
      ),
      essence: "为链上计算资源付费",
    },
    {
      label: "合约",
      icon: (
        <svg viewBox="0 0 48 48" className="sm-essences__icon-svg">
          <path
            d="M12 12 L36 12 L36 36 L12 36 Z"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M18 20 L24 26 L30 20"
            fill="none"
            stroke="var(--text-2)"
            strokeWidth="1.5"
          />
          <line
            x1="24"
            y1="26"
            x2="24"
            y2="34"
            stroke="var(--text-2)"
            strokeWidth="1.5"
          />
        </svg>
      ),
      essence: "链上自动执行的程序",
    },
    {
      label: "区块浏览器",
      icon: (
        <svg viewBox="0 0 48 48" className="sm-essences__icon-svg">
          <circle
            cx="24"
            cy="24"
            r="14"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <line
            x1="24"
            y1="10"
            x2="24"
            y2="38"
            stroke="var(--rule)"
            strokeWidth="1"
          />
          <line
            x1="10"
            y1="24"
            x2="38"
            y2="24"
            stroke="var(--rule)"
            strokeWidth="1"
          />
          <circle
            cx="24"
            cy="24"
            r="6"
            fill="none"
            stroke="var(--text-2)"
            strokeWidth="1.5"
          />
        </svg>
      ),
      essence: "查看链上结果的窗口",
    },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    essences.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCard(i), 300 + i * 500));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="sm-essences">
      <div className="sm-essences__header">
        <span className="sm-essences__prompt">{">"}</span>
        <span className="sm-essences__title">{"ls /web3/essences --continued"}</span>
      </div>
      <div className="sm-essences__grid">
        {essences.map((e, i) => (
          <div
            key={e.label}
            className={`sm-essences__card ${i <= visibleCard ? "visible" : ""}`}
          >
            <div className="sm-essences__icon">{e.icon}</div>
            <div className="sm-essences__label">{e.label}</div>
            <div className="sm-essences__divider">{"───"}</div>
            <div className="sm-essences__essence">{e.essence}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Step 3: 完整链路图
 * 展示完整链路：钱包授权 → 签名交易 → 支付 Gas → 调用合约 → 修改链上状态 → 浏览器可查
 */
function StepFlowDiagram() {
  const [visibleNode, setVisibleNode] = useState(-1);
  const nodes = [
    { id: "wallet", label: "钱包授权" },
    { id: "sign", label: "签名交易" },
    { id: "gas", label: "支付 Gas" },
    { id: "contract", label: "调用合约" },
    { id: "state", label: "修改链上状态" },
    { id: "explorer", label: "浏览器可查" },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    nodes.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleNode(i), 300 + i * 400));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="sm-flow">
      <div className="sm-flow__header">
        <span className="sm-flow__prompt">{">"}</span>
        <span className="sm-flow__title">{"cat /web3/full-chain.txt"}</span>
      </div>
      <div className="sm-flow__path">
        {nodes.map((n, i) => (
          <div key={n.id} className="sm-flow__node-wrapper">
            <div
              className={`sm-flow__node ${i <= visibleNode ? "visible" : ""}`}
            >
              <div className="sm-flow__node-index">{String(i + 1).padStart(2, "0")}</div>
              <div className="sm-flow__node-label">{n.label}</div>
            </div>
            {i < nodes.length - 1 && (
              <div
                className={`sm-flow__arrow ${i < visibleNode ? "visible" : ""}`}
              >
                {"→"}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="sm-flow__footer">
        {"// 想清楚这条链路"}
      </div>
    </div>
  );
}

/**
 * Step 4: 最终结论
 * 大字展示最终结论
 */
function StepConclusion() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`sm-conclusion ${visible ? "visible" : ""}`}>
      <div className="sm-conclusion__label">{"// CONCLUSION"}</div>
      <h1 className="sm-conclusion__title">
        你真正跨过了
        <br />
        <span className="sm-conclusion__highlight">Web3 入门最关键的一步</span>
      </h1>
      <div className="sm-conclusion__checklist">
        <div className="sm-conclusion__item">{"✓ 理解底层原理"}</div>
        <div className="sm-conclusion__item">{"✓ 掌握完整链路"}</div>
        <div className="sm-conclusion__item">{"✓ 不再只是点按钮"}</div>
      </div>
    </div>
  );
}
