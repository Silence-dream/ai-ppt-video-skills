import { useState, useEffect } from "react";
import "./FullFlow.css";

/**
 * full-flow 章节 - 完整链路演示
 * 7 步：场景设定 → 前置准备 → 连接 DApp → 发起交易 → 确认交易 → 链上处理 → 完成确认
 */
export default function FullFlow({ step }: { step: number }) {
  return (
    <div className="ff-chapter">
      {step === 0 && <StepScene />}
      {step === 1 && <StepPrep />}
      {step === 2 && <StepConnect />}
      {step === 3 && <StepInitTx />}
      {step === 4 && <StepConfirm />}
      {step === 5 && <StepOnChain />}
      {step === 6 && <StepExplorer />}
    </div>
  );
}

/**
 * Step 0: 场景设定
 * 大字展示核心场景
 */
function StepScene() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`ff-scene ${visible ? "visible" : ""}`}>
      <div className="ff-scene__label">{"// FULL ONCHAIN FLOW"}</div>
      <h1 className="ff-scene__title">
        <span className="ff-scene__prefix">{"$"}</span>
        在测试网上 Mint 一个 NFT
      </h1>
      <div className="ff-scene__subtitle">{"完整链路演示"}</div>
      <div className="ff-scene__cursor">{"▌"}</div>
    </div>
  );
}

/**
 * Step 1: 前置准备
 * 终端风格展示钱包创建 + 切换测试网 + 领取 ETH
 */
function StepPrep() {
  const [visibleLine, setVisibleLine] = useState(-1);
  const lines = [
    { cmd: "wallet.create()", result: "0x7a3b...e5f2" },
    { cmd: "network.switch('sepolia')", result: "connected" },
    { cmd: "faucet.claim()", result: "+0.5 ETH" },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLine(i), 300 + i * 600));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="ff-prep">
      <div className="ff-prep__header">
        <span className="ff-prep__dot" />
        <span className="ff-prep__dot" />
        <span className="ff-prep__dot" />
        <span className="ff-prep__title">terminal</span>
      </div>
      <div className="ff-prep__body">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`ff-prep__line ${i <= visibleLine ? "visible" : ""}`}
          >
            <span className="ff-prep__prompt">{">"}</span>
            <span className="ff-prep__cmd">{line.cmd}</span>
            {i <= visibleLine && (
              <span className="ff-prep__result">{line.result}</span>
            )}
          </div>
        ))}
        {visibleLine >= lines.length - 1 && (
          <div className="ff-prep__summary">
            <div className="ff-prep__summary-line">{"// 准备完成"}</div>
            <div className="ff-prep__summary-line">
              {"// 地址: 0x7a3b...e5f2"}
            </div>
            <div className="ff-prep__summary-line">
              {"// 网络: Sepolia Testnet"}
            </div>
            <div className="ff-prep__summary-line">
              {"// 余额: 0.5 ETH"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Step 2: 连接 DApp
 * 模拟浏览器窗口 + 钱包连接
 */
function StepConnect() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="ff-connect">
      <div className="ff-connect__browser">
        <div className="ff-connect__browser-bar">
          <span className="ff-connect__dot" />
          <span className="ff-connect__dot" />
          <span className="ff-connect__dot" />
          <span className="ff-connect__url">
            {"nft-mint.example.com"}
          </span>
        </div>
        <div className="ff-connect__browser-body">
          <div className="ff-connect__dapp">
            <div className="ff-connect__nft-preview">
              <svg viewBox="0 0 200 200" className="ff-connect__nft-svg">
                <rect
                  x="20"
                  y="20"
                  width="160"
                  height="160"
                  fill="var(--surface-3)"
                  stroke="var(--rule)"
                />
                <polygon
                  points="100,40 160,160 40,160"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                />
                <circle
                  cx="100"
                  cy="110"
                  r="30"
                  fill="none"
                  stroke="var(--text-2)"
                  strokeWidth="2"
                />
              </svg>
              <div className="ff-connect__nft-label">{"NFT #1337"}</div>
            </div>
            <div className="ff-connect__mint-btn">
              {"Mint Now"}
            </div>
          </div>
        </div>
      </div>

      <div className={`ff-connect__wallet ${phase >= 1 ? "visible" : ""}`}>
        <div className="ff-connect__wallet-header">{"Wallet"}</div>
        <div className="ff-connect__wallet-body">
          <div className="ff-connect__wallet-addr">
            {"0x7a3b...e5f2"}
          </div>
          <div className={`ff-connect__wallet-status ${phase >= 2 ? "connected" : ""}`}>
            {phase >= 2 ? "● Connected" : "○ Disconnected"}
          </div>
        </div>
      </div>

      {phase >= 3 && (
        <div className="ff-connect__indicator">
          {"DApp 识别账户地址 → 点击 Mint"}
        </div>
      )}
    </div>
  );
}

/**
 * Step 3: 发起交易
 * 展示交易生成 + Gas 估算
 */
function StepInitTx() {
  const [visible, setVisible] = useState(false);
  const [gasVisible, setGasVisible] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisible(true), 200),
      setTimeout(() => setGasVisible(true), 1000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="ff-init-tx">
      <div className="ff-init-tx__header">
        <span className="ff-init-tx__prompt">{">"}</span>
        <span className="ff-init-tx__title">{"tx.generate()"}</span>
      </div>

      <div className={`ff-init-tx__card ${visible ? "visible" : ""}`}>
        <div className="ff-init-tx__field">
          <span className="ff-init-tx__label">{"from"}</span>
          <span className="ff-init-tx__value">{"0x7a3b...e5f2"}</span>
        </div>
        <div className="ff-init-tx__field">
          <span className="ff-init-tx__label">{"to"}</span>
          <span className="ff-init-tx__value">{"0xNFT...Contract"}</span>
        </div>
        <div className="ff-init-tx__field">
          <span className="ff-init-tx__label">{"data"}</span>
          <span className="ff-init-tx__value ff-init-tx__value--data">
            {"mint(0x7a3b...e5f2)"}
          </span>
        </div>
        <div className="ff-init-tx__field">
          <span className="ff-init-tx__label">{"value"}</span>
          <span className="ff-init-tx__value">{"0 ETH"}</span>
        </div>
      </div>

      {gasVisible && (
        <div className="ff-init-tx__gas">
          <div className="ff-init-tx__gas-label">{"Gas 估算"}</div>
          <div className="ff-init-tx__gas-bar">
            <div className="ff-init-tx__gas-fill" />
          </div>
          <div className="ff-init-tx__gas-detail">
            {"~0.002 ETH | 21000 gas"}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Step 4: 确认交易
 * 签名动画 + 广播到网络
 */
function StepConfirm() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="ff-confirm">
      <div className="ff-confirm__flow">
        <div className={`ff-confirm__step ${phase >= 1 ? "active" : ""}`}>
          <div className="ff-confirm__step-icon">
            <svg viewBox="0 0 48 48" className="ff-confirm__icon-svg">
              <rect
                x="8"
                y="12"
                width="32"
                height="24"
                rx="2"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <line
                x1="16"
                y1="24"
                x2="32"
                y2="24"
                stroke="var(--text-2)"
                strokeWidth="2"
              />
              <circle cx="24" cy="24" r="4" fill="var(--accent)" />
            </svg>
          </div>
          <div className="ff-confirm__step-label">{"私钥签名"}</div>
          <div className="ff-confirm__step-desc">{"证明你同意此操作"}</div>
        </div>

        <div className={`ff-confirm__arrow ${phase >= 2 ? "visible" : ""}`}>
          {"→"}
        </div>

        <div className={`ff-confirm__step ${phase >= 2 ? "active" : ""}`}>
          <div className="ff-confirm__step-icon">
            <svg viewBox="0 0 48 48" className="ff-confirm__icon-svg">
              <circle
                cx="24"
                cy="24"
                r="16"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <circle cx="12" cy="18" r="3" fill="var(--text-2)" />
              <circle cx="36" cy="18" r="3" fill="var(--text-2)" />
              <circle cx="24" cy="36" r="3" fill="var(--text-2)" />
              <line
                x1="24"
                y1="24"
                x2="12"
                y2="18"
                stroke="var(--rule)"
                strokeWidth="1"
              />
              <line
                x1="24"
                y1="24"
                x2="36"
                y2="18"
                stroke="var(--rule)"
                strokeWidth="1"
              />
              <line
                x1="24"
                y1="24"
                x2="24"
                y2="36"
                stroke="var(--rule)"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="ff-confirm__step-label">{"广播网络"}</div>
          <div className="ff-confirm__step-desc">{"发送到区块链节点"}</div>
        </div>

        <div className={`ff-confirm__arrow ${phase >= 3 ? "visible" : ""}`}>
          {"→"}
        </div>

        <div className={`ff-confirm__step ${phase >= 3 ? "active" : ""}`}>
          <div className="ff-confirm__step-icon">
            <svg viewBox="0 0 48 48" className="ff-confirm__icon-svg">
              <path
                d="M24 8 L38 16 L38 32 L24 40 L10 32 L10 16 Z"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <path
                d="M18 24 L22 28 L30 20"
                fill="none"
                stroke="var(--text)"
                strokeWidth="2.5"
              />
            </svg>
          </div>
          <div className="ff-confirm__step-label">{"节点验证"}</div>
          <div className="ff-confirm__step-desc">{"检查交易是否合法"}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Step 5: 链上处理
 * 打包区块 + 合约执行 + NFT 记录
 */
function StepOnChain() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="ff-onchain">
      <div className="ff-onchain__header">
        <span className="ff-onchain__prompt">{">"}</span>
        <span className="ff-onchain__title">{"block.process()"}</span>
      </div>

      <div className="ff-onchain__visual">
        {/* 区块打包 */}
        <div className={`ff-onchain__block ${phase >= 1 ? "visible" : ""}`}>
          <svg viewBox="0 0 200 160" className="ff-onchain__block-svg">
            <rect
              x="10"
              y="10"
              width="180"
              height="140"
              fill="var(--surface-2)"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <text
              x="100"
              y="40"
              textAnchor="middle"
              fill="var(--text-mute)"
              fontSize="12"
              fontFamily="var(--font-mono)"
            >
              {"BLOCK #12345678"}
            </text>
            <rect
              x="30"
              y="55"
              width="140"
              height="20"
              fill="var(--surface-3)"
              stroke="var(--rule)"
              strokeWidth="1"
            />
            <text
              x="100"
              y="69"
              textAnchor="middle"
              fill="var(--text-2)"
              fontSize="10"
              fontFamily="var(--font-mono)"
            >
              {"tx: mint(0x7a3b...e5f2)"}
            </text>
            <rect
              x="30"
              y="85"
              width="140"
              height="20"
              fill="var(--surface-3)"
              stroke="var(--rule)"
              strokeWidth="1"
            />
            <text
              x="100"
              y="99"
              textAnchor="middle"
              fill="var(--text-faint)"
              fontSize="10"
              fontFamily="var(--font-mono)"
            >
              {"tx: 0x9f2c...a1b3"}
            </text>
            <rect
              x="30"
              y="115"
              width="140"
              height="20"
              fill="var(--surface-3)"
              stroke="var(--rule)"
              strokeWidth="1"
            />
            <text
              x="100"
              y="129"
              textAnchor="middle"
              fill="var(--text-faint)"
              fontSize="10"
              fontFamily="var(--font-mono)"
            >
              {"tx: 0x3d7e...c4f5"}
            </text>
          </svg>
          <div className="ff-onchain__block-label">{"区块打包完成"}</div>
        </div>

        {/* 合约执行 */}
        <div className={`ff-onchain__contract ${phase >= 2 ? "visible" : ""}`}>
          <div className="ff-onchain__contract-icon">
            <svg viewBox="0 0 64 64" className="ff-onchain__contract-svg">
              <rect
                x="8"
                y="8"
                width="48"
                height="48"
                rx="4"
                fill="var(--surface-2)"
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <text
                x="32"
                y="30"
                textAnchor="middle"
                fill="var(--accent)"
                fontSize="10"
                fontFamily="var(--font-mono)"
              >
                {"NFT"}
              </text>
              <text
                x="32"
                y="44"
                textAnchor="middle"
                fill="var(--text-2)"
                fontSize="10"
                fontFamily="var(--font-mono)"
              >
                {"Contract"}
              </text>
            </svg>
          </div>
          <div className="ff-onchain__contract-label">
            {"合约执行 Mint 逻辑"}
          </div>
        </div>

        {/* NFT 记录 */}
        <div className={`ff-onchain__nft ${phase >= 3 ? "visible" : ""}`}>
          <div className="ff-onchain__nft-card">
            <svg viewBox="0 0 120 120" className="ff-onchain__nft-svg">
              <rect
                x="10"
                y="10"
                width="100"
                height="100"
                fill="var(--surface-3)"
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <polygon
                points="60,25 95,95 25,95"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <circle
                cx="60"
                cy="65"
                r="18"
                fill="none"
                stroke="var(--text-2)"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="ff-onchain__nft-info">
            <div className="ff-onchain__nft-id">{"NFT #1337"}</div>
            <div className="ff-onchain__nft-owner">{"owner: 0x7a3b...e5f2"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Step 6: 完成确认
 * 区块浏览器查看交易详情
 */
function StepExplorer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`ff-explorer ${visible ? "visible" : ""}`}>
      <div className="ff-explorer__header">
        <span className="ff-explorer__dot" />
        <span className="ff-explorer__dot" />
        <span className="ff-explorer__dot" />
        <span className="ff-explorer__title">
          {"sepolia.etherscan.io"}
        </span>
      </div>
      <div className="ff-explorer__body">
        <div className="ff-explorer__tx-hash">
          {"Tx: 0xabc123...def456"}
        </div>
        <div className="ff-explorer__status">
          <span className="ff-explorer__status-dot" />
          {"Success"}
        </div>
        <div className="ff-explorer__details">
          <div className="ff-explorer__row">
            <span className="ff-explorer__label">{"Block"}</span>
            <span className="ff-explorer__value">{"#12345678"}</span>
          </div>
          <div className="ff-explorer__row">
            <span className="ff-explorer__label">{"From"}</span>
            <span className="ff-explorer__value">{"0x7a3b...e5f2"}</span>
          </div>
          <div className="ff-explorer__row">
            <span className="ff-explorer__label">{"To"}</span>
            <span className="ff-explorer__value">{"0xNFT...Contract"}</span>
          </div>
          <div className="ff-explorer__row">
            <span className="ff-explorer__label">{"Gas Used"}</span>
            <span className="ff-explorer__value">{"0.002 ETH"}</span>
          </div>
          <div className="ff-explorer__row">
            <span className="ff-explorer__label">{"Method"}</span>
            <span className="ff-explorer__value">{"mint()"}</span>
          </div>
        </div>
        <div className="ff-explorer__footer">
          {"// 一切都清清楚楚"}
        </div>
      </div>
    </div>
  );
}
