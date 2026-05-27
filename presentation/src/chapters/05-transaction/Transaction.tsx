import "./Transaction.css";

/**
 * transaction 章节 - 区块链交易
 * 7 步：Hero → 类型清单 → 本质 → 实操 → 签名广播 → 浏览器 → 详情
 */
export default function Transaction({ step }: { step: number }) {
  return (
    <div className="tx-chapter">
      {step === 0 && <StepHero />}
      {step === 1 && <StepTypes />}
      {step === 2 && <StepEssence />}
      {step === 3 && <StepDemo />}
      {step === 4 && <StepBroadcast />}
      {step === 5 && <StepExplorer />}
      {step === 6 && <StepDetails />}
    </div>
  );
}

/**
 * Step 0: Hero 标语 — 交易不只是转账
 */
function StepHero() {
  return (
    <div className="tx-hero">
      <div className="tx-hero__label">{"// TRANSACTION"}</div>
      <h1 className="tx-hero__title">
        交易<em>不只是转账</em>
      </h1>
      <div className="tx-hero__sub">
        修改链上状态 = <em>发起交易</em>
      </div>
    </div>
  );
}

/**
 * Step 1: 交易类型清单
 * 逐个揭示各类交易
 */
function StepTypes() {
  const types = [
    { icon: "ETH", text: "转 ETH", arrow: "send" },
    { icon: "TKN", text: "转 Token", arrow: "transfer" },
    { icon: "NFT", text: "Mint NFT", arrow: "mint" },
    { icon: "SWP", text: "Swap 代币", arrow: "swap" },
    { icon: "STK", text: "质押资产", arrow: "stake" },
    { icon: "DEP", text: "部署智能合约", arrow: "deploy" },
    { icon: "CLL", text: "调用合约方法", arrow: "call" },
  ];

  return (
    <div className="tx-types">
      <div className="tx-types__header">
        <span className="tx-types__prompt">{">"}</span>
        <span>ls /transactions/types</span>
      </div>
      <div className="tx-types__list">
        {types.map((t) => (
          <div key={t.icon} className="tx-types__item">
            <div className="tx-types__item-icon">{t.icon}</div>
            <span className="tx-types__item-text">{t.text}</span>
            <span className="tx-types__item-arrow">{`→ ${t.arrow}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Step 2: 本质定义 — 状态修改请求
 * 用状态机示意图展示
 */
function StepEssence() {
  return (
    <div className="tx-essence">
      <h1 className="tx-essence__hero">
        交易 = <em>状态修改请求</em>
      </h1>
      <div className="tx-essence__diagram">
        <div className="tx-essence__state-box">
          <div className="tx-essence__state-label">{"// State Before"}</div>
          <div className="tx-essence__state-value">余额: 1.500 ETH</div>
        </div>
        <div className="tx-essence__arrow">{"-->"}</div>
        <div className="tx-essence__tx-box">
          <div className="tx-essence__tx-label">TX: 转 0.001 ETH</div>
        </div>
        <div className="tx-essence__arrow">{"-->"}</div>
        <div className="tx-essence__state-box">
          <div className="tx-essence__state-label">{"// State After"}</div>
          <div className="tx-essence__state-value">余额: 1.499 ETH</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Step 3: 实操演示 — 转 0.001 ETH
 * 模拟钱包发送界面
 */
function StepDemo() {
  return (
    <div className="tx-demo">
      <h1 className="tx-demo__title">发送 0.001 ETH</h1>
      <div className="tx-demo__wallet">
        <div className="tx-demo__wallet-header">Send Transaction</div>
        <div className="tx-demo__wallet-body">
          <div className="tx-demo__wallet-field">
            <div className="tx-demo__wallet-label">{"// To (recipient)"}</div>
            <div className="tx-demo__wallet-input">
              0x742d...35Fc
            </div>
          </div>
          <div className="tx-demo__wallet-field">
            <div className="tx-demo__wallet-label">{"// Amount"}</div>
            <div className="tx-demo__wallet-amount">
              <div className="tx-demo__wallet-input" style={{ flex: 1 }}>
                0.001
              </div>
              <span className="tx-demo__wallet-unit">ETH</span>
            </div>
          </div>
          <div className="tx-demo__wallet-balance">
            Balance: 1.500 ETH
          </div>
          <div className="tx-demo__wallet-btn" data-no-advance>
            Confirm
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Step 4: 交易生成 — 签名 + 广播流程
 * 展示从签名到网络广播的节点流程
 */
function StepBroadcast() {
  return (
    <div className="tx-broadcast">
      <h1 className="tx-broadcast__title">签名 + 广播</h1>
      <div className="tx-broadcast__flow">
        <div className="tx-broadcast__node">
          <span className="tx-broadcast__node-icon">{"{}"}</span>
          <span className="tx-broadcast__node-label">构建交易</span>
          <span className="tx-broadcast__node-desc">组装参数</span>
        </div>
        <span className="tx-broadcast__arrow">{"-->"}</span>
        <div className="tx-broadcast__node tx-broadcast__node--active">
          <span className="tx-broadcast__node-icon">SIG</span>
          <span className="tx-broadcast__node-label">私钥签名</span>
          <span className="tx-broadcast__node-desc">ECDSA secp256k1</span>
        </div>
        <span className="tx-broadcast__arrow">{"-->"}</span>
        <div className="tx-broadcast__node">
          <span className="tx-broadcast__node-icon">NET</span>
          <span className="tx-broadcast__node-label">广播到网络</span>
          <span className="tx-broadcast__node-desc">P2P gossip</span>
        </div>
        <span className="tx-broadcast__arrow">{"-->"}</span>
        <div className="tx-broadcast__node">
          <span className="tx-broadcast__node-icon">BLK</span>
          <span className="tx-broadcast__node-label">打包出块</span>
          <span className="tx-broadcast__node-desc">Validator</span>
        </div>
      </div>
      <div className="tx-broadcast__network">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`tx-broadcast__network-node ${i < 5 ? "tx-broadcast__network-node--on" : ""}`}
          />
        ))}
        <span className="tx-broadcast__network-label">
          5/8 节点已确认
        </span>
      </div>
    </div>
  );
}

/**
 * Step 5: 区块浏览器 — 查看交易
 * 模拟区块浏览器界面
 */
function StepExplorer() {
  return (
    <div className="tx-explorer">
      <h1 className="tx-explorer__title">区块浏览器</h1>
      <div className="tx-explorer__window">
        <div className="tx-explorer__bar">
          <div className="tx-explorer__bar-dot" />
          <div className="tx-explorer__bar-dot" />
          <div className="tx-explorer__bar-dot" />
          <span className="tx-explorer__bar-url">
            etherscan.io/tx/0x8a7f...e3b2
          </span>
        </div>
        <div className="tx-explorer__body">
          <div className="tx-explorer__header-row">
            <span className="tx-explorer__header-title">
              Transaction Details
            </span>
            <span className="tx-explorer__header-badge">Success</span>
          </div>
          {/* 下一步展示详情 */}
        </div>
      </div>
    </div>
  );
}

/**
 * Step 6: 交易详情展示 + 结语
 * 展示完整的交易详情字段
 */
function StepDetails() {
  const rows = [
    { key: "Status", val: "Success", accent: true },
    { key: "From", val: "0x1234...abcd" },
    { key: "To", val: "0x742d...35Fc" },
    { key: "Value", val: "0.001 ETH", accent: true },
    { key: "Gas Used", val: "21,000" },
    { key: "Block", val: "#19,234,567" },
    { key: "Timestamp", val: "2024-01-15 10:30:22 UTC" },
  ];

  return (
    <div className="tx-details">
      <h1 className="tx-details__title">交易详情</h1>
      <div className="tx-details__table">
        {rows.map((row) => (
          <div key={row.key} className="tx-details__row">
            <div className="tx-details__key">{row.key}</div>
            <div
              className={`tx-details__val ${row.accent ? "tx-details__val--accent" : ""}`}
            >
              {row.val}
            </div>
          </div>
        ))}
      </div>
      <div className="tx-details__footer">
        真正的链上记录，要去<em>区块浏览器</em>里查
      </div>
    </div>
  );
}
