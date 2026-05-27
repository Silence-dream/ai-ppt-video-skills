import { useState, useEffect } from "react";
import "./Explorer.css";

/**
 * explorer 章节 - 区块链的搜索引擎
 * 3 步：Hero 标语 → 可查看内容清单 → 核心观点
 */
export default function Explorer({ step }: { step: number }) {
  return (
    <div className="ex-chapter">
      {step === 0 && <StepHero />}
      {step === 1 && <StepCapabilities />}
      {step === 2 && <StepInsight />}
    </div>
  );
}

/**
 * Step 0: Hero 标语
 * 搜索栏打字动画 + 大标题
 */
function StepHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`ex-hero ${visible ? "visible" : ""}`}>
      <div className="ex-hero__label">{"// BLOCK EXPLORER"}</div>
      <h1 className="ex-hero__title">区块链的搜索引擎</h1>
      <div className="ex-hero__subtitle">
        {"search engine for on-chain data"}
      </div>
      <div className="ex-hero__search">
        <div className="ex-hero__search-bar">
          <span className="ex-hero__search-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
          </span>
          <span className="ex-hero__search-text">
            0x742d35Cc6634C0532925a3b844Bc9e7595f2bD68
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Step 1: 可查看内容清单
 * 浏览器名称 + 查看内容逐个浮现
 */
function StepCapabilities() {
  const [browserCount, setBrowserCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  const browsers = [
    { name: "Etherscan", active: true },
    { name: "Sepolia Etherscan", active: false },
    { name: "Solscan", active: false },
    { name: "Solana Explorer", active: false },
  ];

  const capabilities = [
    {
      label: "地址资产",
      desc: "查看某个地址持有的所有 Token 和 NFT",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="6" width="18" height="12" rx="1" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      label: "交易状态",
      desc: "确认交易是否成功、区块确认数",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
    },
    {
      label: "Gas 消耗",
      desc: "实际 Gas 用量和费用",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2 L12 8" />
          <path d="M8 8 L16 8 L14 20 L10 20 Z" />
        </svg>
      ),
    },
    {
      label: "合约调用",
      desc: "调用了哪个智能合约、哪个函数",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="4" width="16" height="16" rx="1" />
          <line x1="8" y1="9" x2="16" y2="9" />
          <line x1="8" y1="12" x2="14" y2="12" />
          <line x1="8" y1="15" x2="12" y2="15" />
        </svg>
      ),
    },
    {
      label: "Token 转移",
      desc: "ERC-20 / SPL Token 转移记录",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 12 L20 12" />
          <path d="M16 8 L20 12 L16 16" />
        </svg>
      ),
    },
    {
      label: "合约代码",
      desc: "合约是否开源、源码验证",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      label: "区块打包",
      desc: "区块大小、时间戳、矿工/验证者",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="8" height="8" rx="1" />
          <rect x="13" y="3" width="8" height="8" rx="1" />
          <rect x="3" y="13" width="8" height="8" rx="1" />
          <rect x="13" y="13" width="8" height="8" rx="1" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    browsers.forEach((_, i) => {
      timers.push(
        setTimeout(() => setBrowserCount(i + 1), 200 + i * 150)
      );
    });
    capabilities.forEach((_, i) => {
      timers.push(
        setTimeout(() => setItemCount(i + 1), 800 + i * 180)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="ex-list">
      <div className="ex-list__header">
        <span className="ex-list__prompt">{">"}</span>
        <span className="ex-list__cmd">ls /explorer/tools && cat /explorer/capabilities.md</span>
      </div>
      <div className="ex-list__browsers">
        {browsers.map((b, i) => (
          <div
            key={b.name}
            className={`ex-list__browser ${i < browserCount ? "visible" : ""} ${b.active ? "ex-list__browser--active" : ""}`}
          >
            {b.name}
          </div>
        ))}
      </div>
      <div className="ex-list__items">
        {capabilities.map((c, i) => (
          <div
            key={c.label}
            className={`ex-list__item ${i < itemCount ? "visible" : ""} ${itemCount > 0 && i !== itemCount - 1 ? "ex-list__item--dim" : ""}`}
          >
            <div className="ex-list__item-icon" style={{ color: i === itemCount - 1 ? "var(--accent)" : "var(--text-mute)" }}>
              {c.icon}
            </div>
            <span className="ex-list__item-label">{c.label}</span>
            <span className="ex-list__item-desc">{c.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Step 2: 核心观点
 * 大字引言 + 下划线动画
 */
function StepInsight() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="ex-insight">
      <div className={`ex-insight__quote ${visible ? "visible" : ""}`}>
        不要只看钱包显示
        <br />
        <span className="ex-insight__highlight">真正的链上记录</span>
        <br />
        要去区块浏览器里查
      </div>
      <div className="ex-insight__divider" />
      <div className="ex-insight__sub">
        {"// 区块浏览器是学习 Web3 最重要的工具之一"}
      </div>
    </div>
  );
}
