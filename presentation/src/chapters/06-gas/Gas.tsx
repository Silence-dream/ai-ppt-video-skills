import { useState, useEffect } from "react";
import "./Gas.css";

/**
 * gas 章节 - Gas 费用讲解
 * 4 步：Hero 标语 → 燃料费类比 → 普通转账 vs Swap 对比 → Etherscan Gas Tracker
 */
export default function Gas({ step }: { step: number }) {
  return (
    <div className="gs-chapter">
      {step === 0 && <StepHero />}
      {step === 1 && <StepAnalogy />}
      {step === 2 && <StepComparison />}
      {step === 3 && <StepTracker />}
    </div>
  );
}

/* ─── Step 0: Hero 标语 ─── */
function StepHero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`gs-hero ${visible ? "visible" : ""}`}>
      <div className="gs-hero__cmd">
        <span className="gs-hero__prompt">{">"}</span>
        <span className="gs-hero__cmd-text">{"estimateGas(tx)"}</span>
      </div>
      <h1 className="gs-hero__title">
        区块链不是
        <br />
        <span className="gs-hero__accent">免费运行的</span>
      </h1>
      <div className="gs-hero__sub">
        {"// 每一笔交易都需要节点验证、计算和存储"}
      </div>
      <div className="gs-hero__cursor">{"▌"}</div>
    </div>
  );
}

/* ─── Step 1: 燃料费类比 ─── */
function StepAnalogy() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`gs-analogy ${visible ? "visible" : ""}`}>
      <div className="gs-analogy__header">
        <span className="gs-analogy__prompt">{">"}</span>
        <span className="gs-analogy__cmd">{"cat /gas/definition.txt"}</span>
      </div>

      <div className="gs-analogy__body">
        {/* 左侧：油表可视化 */}
        <div className="gs-analogy__gauge-wrap">
          <svg
            className="gs-analogy__gauge"
            viewBox="0 0 200 200"
            width="280"
            height="280"
          >
            {/* 背景圆弧 */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="var(--surface-3)"
              strokeWidth="12"
              strokeDasharray="377"
              strokeDashoffset="125"
              strokeLinecap="round"
              transform="rotate(135 100 100)"
            />
            {/* 动态填充圆弧 */}
            <circle
              className="gs-analogy__gauge-fill"
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="12"
              strokeDasharray="377"
              strokeDashoffset="377"
              strokeLinecap="round"
              transform="rotate(135 100 100)"
            />
            {/* 中心文字 */}
            <text
              x="100"
              y="92"
              textAnchor="middle"
              fill="var(--text)"
              fontFamily="var(--font-mono)"
              fontSize="36"
              fontWeight="700"
            >
              GAS
            </text>
            <text
              x="100"
              y="118"
              textAnchor="middle"
              fill="var(--text-mute)"
              fontFamily="var(--font-mono)"
              fontSize="14"
            >
              FUEL
            </text>
          </svg>
          {/* 发光效果 */}
          <div className="gs-analogy__glow" />
        </div>

        {/* 右侧：定义 */}
        <div className="gs-analogy__defs">
          <div className="gs-analogy__def gs-analogy__def--1">
            <span className="gs-analogy__eq">=</span>
            <div>
              <div className="gs-analogy__def-label">燃料费</div>
              <div className="gs-analogy__def-desc">
                驱动链上操作的能量
              </div>
            </div>
          </div>
          <div className="gs-analogy__def gs-analogy__def--2">
            <span className="gs-analogy__eq">=</span>
            <div>
              <div className="gs-analogy__def-label">计算资源费</div>
              <div className="gs-analogy__def-desc">
                节点为你执行计算的报酬
              </div>
            </div>
          </div>
          <div className="gs-analogy__def gs-analogy__def--3">
            <span className="gs-analogy__eq">=</span>
            <div>
              <div className="gs-analogy__def-label">手续费</div>
              <div className="gs-analogy__def-desc">
                你为交易上链支付的代价
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2: 普通转账 vs Swap 对比 ─── */
function StepComparison() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const items = [
    {
      label: "普通 TRANSFER",
      gas: "21,000",
      pct: 15,
      desc: "修改两个账户余额",
      color: "var(--text-2)",
    },
    {
      label: "SWAP 兑换",
      gas: "150,000+",
      pct: 85,
      desc: "调用 DEX 合约 · 计算兑换比例 · 更新池子余额",
      color: "var(--accent)",
    },
  ];

  return (
    <div className={`gs-compare ${visible ? "visible" : ""}`}>
      <div className="gs-compare__header">
        <span className="gs-compare__prompt">{">"}</span>
        <span className="gs-compare__cmd">
          {"compareGas --transfer --swap"}
        </span>
      </div>

      <div className="gs-compare__body">
        {items.map((item, i) => (
          <div key={item.label} className="gs-compare__row">
            <div className="gs-compare__info">
              <span
                className="gs-compare__label"
                style={{ color: item.color }}
              >
                {item.label}
              </span>
              <span className="gs-compare__desc">{item.desc}</span>
            </div>
            <div className="gs-compare__bar-track">
              <div
                className={`gs-compare__bar gs-compare__bar--${i}`}
                style={{
                  width: `${item.pct}%`,
                  background: item.color,
                }}
              />
            </div>
            <div className="gs-compare__gas" style={{ color: item.color }}>
              {item.gas}
              <span className="gs-compare__unit">Gas</span>
            </div>
          </div>
        ))}
      </div>

      <div className="gs-compare__note">
        {"// 操作越复杂 → 计算量越大 → Gas 越高"}
      </div>
    </div>
  );
}

/* ─── Step 3: Etherscan Gas Tracker ─── */
function StepTracker() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const tiers = [
    { label: "LOW", gwei: "12", time: "~5 min", color: "var(--text-2)" },
    { label: "AVG", gwei: "18", time: "~3 min", color: "var(--accent)" },
    { label: "HIGH", gwei: "28", time: "~15 sec", color: "var(--accent)" },
  ];

  return (
    <div className={`gs-tracker ${visible ? "visible" : ""}`}>
      <div className="gs-tracker__header">
        <span className="gs-tracker__prompt">{">"}</span>
        <span className="gs-tracker__cmd">
          {"open etherscan.io/gastracker"}
        </span>
      </div>

      <div className="gs-tracker__panel">
        <div className="gs-tracker__title-bar">
          <span className="gs-tracker__dot gs-tracker__dot--r" />
          <span className="gs-tracker__dot gs-tracker__dot--y" />
          <span className="gs-tracker__dot gs-tracker__dot--g" />
          <span className="gs-tracker__title">
            Etherscan Gas Tracker
          </span>
        </div>

        <div className="gs-tracker__content">
          <div className="gs-tracker__tiers">
            {tiers.map((t, i) => (
              <div key={t.label} className={`gs-tracker__tier gs-tracker__tier--${i}`}>
                <div className="gs-tracker__tier-label" style={{ color: t.color }}>
                  {t.label}
                </div>
                <div className="gs-tracker__tier-gwei" style={{ color: t.color }}>
                  {t.gwei}
                  <span className="gs-tracker__tier-unit"> Gwei</span>
                </div>
                <div className="gs-tracker__tier-time">{t.time}</div>
              </div>
            ))}
          </div>

          <div className="gs-tracker__meta">
            <div className="gs-tracker__meta-row">
              <span className="gs-tracker__meta-key">Base Fee</span>
              <span className="gs-tracker__meta-val">14.2 Gwei</span>
            </div>
            <div className="gs-tracker__meta-row">
              <span className="gs-tracker__meta-key">Priority Fee</span>
              <span className="gs-tracker__meta-val">1.5 Gwei</span>
            </div>
            <div className="gs-tracker__meta-row">
              <span className="gs-tracker__meta-key">Network</span>
              <span className="gs-tracker__meta-val">Ethereum Mainnet</span>
            </div>
          </div>
        </div>
      </div>

      <div className="gs-tracker__tip">
        {"// 实时查看 Gas → 在低谷时段操作 → 省钱"}
      </div>
    </div>
  );
}
