import { useState, useEffect } from "react";
import "./Testnet.css";

/**
 * testnet 章节 - 区块链的练习场
 * 5 步：Hero 标语 → 测试网列表 → 用途展示 → 实操流程 → ChainList 推荐
 */
export default function Testnet({ step }: { step: number }) {
  return (
    <div className="tn-chapter">
      {step === 0 && <StepHero />}
      {step === 1 && <StepNetworkList />}
      {step === 2 && <StepUses />}
      {step === 3 && <StepFlow />}
      {step === 4 && <StepTool />}
    </div>
  );
}

/**
 * Step 0: Hero 标语
 * 终端风格大字："区块链的练习场"
 */
function StepHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`tn-hero ${visible ? "visible" : ""}`}>
      <div className="tn-hero__label">{"// TESTNET"}</div>
      <h1 className="tn-hero__title">区块链的练习场</h1>
      <div className="tn-hero__subtitle">
        {"sandbox environment for blockchain"}
      </div>
      <div className="tn-hero__cursor">{"▌"}</div>
    </div>
  );
}

/**
 * Step 1: 测试网列表
 * 终端 ls 风格，逐个浮现
 */
function StepNetworkList() {
  const [visibleCount, setVisibleCount] = useState(0);
  const networks = [
    { name: "Sepolia", chain: "Ethereum" },
    { name: "Base Sepolia", chain: "Base" },
    { name: "Arbitrum Sepolia", chain: "Arbitrum" },
    { name: "Polygon Amoy", chain: "Polygon" },
    { name: "BNB Testnet", chain: "BNB Chain" },
    { name: "Solana Devnet", chain: "Solana" },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    networks.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleCount(i + 1), 200 + i * 200)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="tn-list">
      <div className="tn-list__header">
        <span className="tn-list__prompt">{">"}</span>
        <span className="tn-list__cmd">ls /blockchain/testnets</span>
      </div>
      <div className="tn-list__grid">
        {networks.map((n, i) => (
          <div
            key={n.name}
            className={`tn-list__item ${i < visibleCount ? "visible" : ""} ${n.chain === "Solana" ? "tn-list__item--solana" : ""}`}
          >
            <span className="tn-list__dot" />
            <span className="tn-list__name">{n.name}</span>
            <span className="tn-list__chain">{n.chain}</span>
          </div>
        ))}
      </div>
      <div className="tn-list__footer">
        {"// 测试网 Token 无真实价值，可从水龙头领取"}
      </div>
    </div>
  );
}

/**
 * Step 2: 用途展示
 * 三行用途，逐行亮起，当前项高亮，其余灰化
 */
function StepUses() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const uses = [
    {
      label: "部署合约",
      desc: "开发者在测试网部署智能合约，验证逻辑",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="6" y="8" width="20" height="16" rx="1" />
          <line x1="10" y1="14" x2="22" y2="14" />
          <line x1="10" y1="18" x2="18" y2="18" />
          <line x1="10" y1="22" x2="14" y2="22" />
        </svg>
      ),
    },
    {
      label: "测试功能",
      desc: "模拟真实环境，测试 DApp 全流程",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 6 L16 14" />
          <path d="M10 14 L22 14 L20 26 L12 26 Z" />
          <circle cx="16" cy="20" r="2" />
        </svg>
      ),
    },
    {
      label: "模拟交易",
      desc: "练习转账、签名、合约交互，零风险",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 16 L24 16" />
          <path d="M20 12 L24 16 L20 20" />
          <path d="M24 16 L8 16" />
          <path d="M12 12 L8 16 L12 20" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    // 先全部亮起，然后聚焦到当前项
    const t1 = setTimeout(() => setActiveIndex(0), 300);
    const t2 = setTimeout(() => setActiveIndex(1), 1200);
    const t3 = setTimeout(() => setActiveIndex(2), 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="tn-uses">
      <div className="tn-uses__header">
        <span className="tn-uses__prompt">{">"}</span>
        <span className="tn-uses__cmd">cat /testnet/purpose.md</span>
      </div>
      <div className="tn-uses__rows">
        {uses.map((u, i) => (
          <div
            key={u.label}
            className={`tn-uses__row ${
              activeIndex >= 0 ? "visible" : ""
            } ${activeIndex >= 0 && i !== activeIndex ? "tn-uses__row--dim" : ""}`}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            <div className="tn-uses__icon-box" style={{ color: i === activeIndex ? "var(--accent)" : "var(--text-mute)" }}>
              {u.icon}
            </div>
            <span className="tn-uses__label">{u.label}</span>
            <span className="tn-uses__desc">{u.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Step 3: Sepolia 转账实操流程
 * 流程节点依次点亮
 */
function StepFlow() {
  const [visibleCount, setVisibleCount] = useState(0);
  const steps = [
    { num: "01", label: "安装钱包" },
    { num: "02", label: "切换测试网" },
    { num: "03", label: "领测试 ETH" },
    { num: "04", label: "发起转账" },
    { num: "05", label: "查看交易" },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    steps.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleCount(i + 1), 300 + i * 350)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="tn-flow">
      <div className="tn-flow__header">
        <span className="tn-flow__prompt">{">"}</span>
        <span className="tn-flow__cmd">cat /testnet/sepolia-transfer.md</span>
      </div>
      <div className="tn-flow__path">
        {steps.map((s, i) => (
          <div key={s.num} className="tn-flow__step-wrap">
            <div
              className={`tn-flow__node ${i < visibleCount ? "visible" : ""} ${i === visibleCount - 1 ? "tn-flow__node--active" : ""}`}
            >
              <span className="tn-flow__node-num">{s.num}</span>
              <span className="tn-flow__node-label">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`tn-flow__arrow ${i < visibleCount - 1 ? "visible" : ""}`}
              >
                {"→"}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="tn-flow__note">
        {"MetaMask / Rabby → Sepolia → 领水龙头 → 转 0.001 ETH → Etherscan 查看"}
      </div>
    </div>
  );
}

/**
 * Step 4: ChainList 工具推荐
 * 带发光边框的工具卡片
 */
function StepTool() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="tn-tool">
      <div className="tn-tool__header">
        <span className="tn-tool__prompt">{">"}</span>
        <span className="tn-tool__cmd">which chainlist</span>
      </div>
      <div className={`tn-tool__card ${visible ? "visible" : ""}`}>
        <div className="tn-tool__card-title">ChainList</div>
        <div className="tn-tool__card-url">chainlist.org</div>
        <div className="tn-tool__features">
          <div className="tn-tool__feature">
            <span className="tn-tool__feature-dot" />
            查询 EVM 网络的 Chain ID
          </div>
          <div className="tn-tool__feature">
            <span className="tn-tool__feature-dot" />
            获取 RPC 节点信息
          </div>
          <div className="tn-tool__feature">
            <span className="tn-tool__feature-dot" />
            一键添加网络到钱包
          </div>
        </div>
      </div>
    </div>
  );
}
