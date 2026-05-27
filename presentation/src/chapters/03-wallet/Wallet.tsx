import { useState, useEffect } from "react";
import "./Wallet.css";

/**
 * wallet 章节 - 钱包 = 钥匙管理器
 * 10 步：选钱包 → 拿到地址 → 误区澄清 → 类比图 → 职责清单
 *       → 类比强化 → 实操演示 → 账户归属 → 安全提醒 → 高风险警示
 */
export default function Wallet({ step }: { step: number }) {
  return (
    <div className="wl-chapter">
      {step === 0 && <StepPickWallet />}
      {step === 1 && <StepAddress />}
      {step === 2 && <StepMythBuster />}
      {step === 3 && <StepAnalogy />}
      {step === 4 && <StepDuties />}
      {step === 5 && <StepAnalogyStrong />}
      {step === 6 && <StepImportDemo />}
      {step === 7 && <StepOwnership />}
      {step === 8 && <StepSecurityTips />}
      {step === 9 && <StepWarning />}
    </div>
  );
}

/* ─── Step 0: 选择钱包工具 ─── */
function StepPickWallet() {
  const [visibleCount, setVisibleCount] = useState(0);
  const wallets = [
    { name: "MetaMask", color: "#f6851b" },
    { name: "Rabby", color: "#8669f5" },
    { name: "OKX Wallet", color: "#fff" },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    wallets.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 300 + i * 300));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="wl-pick">
      <div className="wl-pick__header">
        <span className="wl-pick__prompt">{">"}</span>
        <span className="wl-pick__title">{"ls /wallet/tools/"}</span>
      </div>
      <div className="wl-pick__grid">
        {wallets.map((w, i) => (
          <div
            key={w.name}
            className={`wl-pick__card ${i < visibleCount ? "visible" : ""}`}
          >
            <div className="wl-pick__icon-box">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="8" fill="var(--surface-3)" />
                <path
                  d="M14 16h20v4H14zM14 24h14v4H14zM14 32h8v4H14z"
                  fill={w.color}
                  opacity="0.8"
                />
              </svg>
            </div>
            <div className="wl-pick__name">{w.name}</div>
            <div className="wl-pick__tag">EVM Compatible</div>
          </div>
        ))}
      </div>
      <div className={`wl-pick__note ${visibleCount >= 3 ? "visible" : ""}`}>
        {"// 常见钱包入口，支持以太坊及 EVM 生态"}
      </div>
    </div>
  );
}

/* ─── Step 1: 创建钱包后获得地址 ─── */
function StepAddress() {
  const [showAddr, setShowAddr] = useState(false);
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowAddr(true), 300);
    const t2 = setTimeout(() => setShowNote(true), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="wl-addr">
      <div className="wl-addr__header">
        <span className="wl-addr__prompt">{">"}</span>
        <span className="wl-addr__title">{"wallet.create() → address"}</span>
      </div>
      <div className={`wl-addr__display ${showAddr ? "visible" : ""}`}>
        <div className="wl-addr__label">YOUR NEW ADDRESS</div>
        <div className="wl-addr__hex">
          <span className="wl-addr__prefix">0x</span>
          <span className="wl-addr__body">7a9F</span>
          <span className="wl-addr__dots">...</span>
          <span className="wl-addr__body">12B8</span>
        </div>
      </div>
      <div className={`wl-addr__note ${showNote ? "visible" : ""}`}>
        <div className="wl-addr__note-line">{"// 别人可以往这个地址转"}</div>
        <div className="wl-addr__note-line">
          <span className="wl-addr__tag">ETH</span>
          <span className="wl-addr__tag">Token</span>
          <span className="wl-addr__tag">NFT</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2: 误区澄清 ─── */
function StepMythBuster() {
  const [showMyth, setShowMyth] = useState(false);
  const [showTruth, setShowTruth] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowMyth(true), 200);
    const t2 = setTimeout(() => setShowTruth(true), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="wl-myth">
      <div className="wl-myth__header">
        <span className="wl-myth__prompt">{">"}</span>
        <span className="wl-myth__title">{"echo $MISCONCEPTION"}</span>
      </div>
      <div className="wl-myth__content">
        <div className={`wl-myth__wrong ${showMyth ? "visible" : ""}`}>
          <span className="wl-myth__cross">{"✗"}</span>
          <span className="wl-myth__text">钱包是存币的地方</span>
        </div>
        <div className={`wl-myth__right ${showTruth ? "visible" : ""}`}>
          <span className="wl-myth__check">{"✓"}</span>
          <span className="wl-myth__text">钱包不是存币的地方</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 3: 类比图 — 钥匙管理器 vs 保险柜 ─── */
function StepAnalogy() {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowLeft(true), 300);
    const t2 = setTimeout(() => setShowRight(true), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="wl-analogy">
      <div className="wl-analogy__header">
        <span className="wl-analogy__prompt">{">"}</span>
        <span className="wl-analogy__title">{"cat /wallet/analogy.txt"}</span>
      </div>
      <div className="wl-analogy__body">
        <div className={`wl-analogy__box wl-analogy__box--wrong ${showLeft ? "visible" : ""}`}>
          <svg className="wl-analogy__svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
            <rect x="10" y="20" width="60" height="50" rx="4" stroke="var(--text-faint)" strokeWidth="2" fill="none" />
            <rect x="30" y="8" width="20" height="16" rx="2" stroke="var(--text-faint)" strokeWidth="2" fill="none" />
            <line x1="10" y1="35" x2="70" y2="35" stroke="var(--text-faint)" strokeWidth="1" />
          </svg>
          <div className="wl-analogy__label">保险柜</div>
          <div className="wl-analogy__sub">{"// 存东西的地方"}</div>
          <div className="wl-analogy__cross">{"✗"}</div>
        </div>
        <div className={`wl-analogy__box wl-analogy__box--right ${showRight ? "visible" : ""}`}>
          <svg className="wl-analogy__svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="32" cy="30" r="14" stroke="var(--accent)" strokeWidth="2" fill="none" />
            <circle cx="32" cy="30" r="5" fill="var(--accent)" />
            <rect x="28" y="44" width="8" height="24" rx="4" fill="var(--accent)" />
            <rect x="38" y="48" width="16" height="4" rx="2" fill="var(--accent)" />
            <rect x="38" y="56" width="12" height="4" rx="2" fill="var(--accent)" />
          </svg>
          <div className="wl-analogy__label wl-analogy__label--accent">钥匙管理器</div>
          <div className="wl-analogy__sub">{"// 管理私钥"}</div>
          <div className="wl-analogy__check">{"✓"}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 4: 职责清单（逐个亮起） ─── */
function StepDuties() {
  const [visibleCount, setVisibleCount] = useState(0);
  const duties = [
    { label: "创建账户", code: "create_account" },
    { label: "保存私钥 / 助记词", code: "store_keys" },
    { label: "展示链上资产", code: "display_assets" },
    { label: "连接 DApp", code: "connect_dapp" },
    { label: "发起签名", code: "sign_message" },
    { label: "发起交易", code: "send_tx" },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    duties.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 200 + i * 200));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="wl-duties">
      <div className="wl-duties__header">
        <span className="wl-duties__prompt">{">"}</span>
        <span className="wl-duties__title">{"wallet.listDuties()"}</span>
      </div>
      <div className="wl-duties__list">
        {duties.map((d, i) => (
          <div
            key={d.code}
            className={`wl-duties__item ${i < visibleCount ? "active" : ""} ${i < visibleCount - 1 ? "dim" : ""}`}
          >
            <span className="wl-duties__index">{String(i + 1).padStart(2, "0")}</span>
            <span className="wl-duties__code">{d.code}</span>
            <span className="wl-duties__label">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Step 5: 类比强化 ─── */
function StepAnalogyStrong() {
  const [showLine, setShowLine] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowLine(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="wl-strong">
      <div className="wl-strong__header">
        <span className="wl-strong__prompt">{">"}</span>
        <span className="wl-strong__title">{"echo $ANALOGY"}</span>
      </div>
      <div className={`wl-strong__content ${showLine ? "visible" : ""}`}>
        <div className="wl-strong__line">
          <span className="wl-strong__text">资产在链上</span>
        </div>
        <div className="wl-strong__line">
          <span className="wl-strong__text">钱包拿着钥匙</span>
        </div>
      </div>
      <div className={`wl-strong__diagram ${showLine ? "visible" : ""}`}>
        <svg width="700" height="120" viewBox="0 0 700 120" fill="none">
          {/* 链上 */}
          <rect x="0" y="20" width="200" height="80" rx="0" fill="var(--surface-2)" stroke="var(--rule)" />
          <text x="100" y="55" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14" fill="var(--text-mute)">BLOCKCHAIN</text>
          <text x="100" y="80" textAnchor="middle" fontFamily="var(--font-display-cn)" fontSize="20" fill="var(--text)">资产存储</text>
          {/* 箭头 */}
          <line x1="220" y1="60" x2="350" y2="60" stroke="var(--accent)" strokeWidth="2" strokeDasharray="6 4" />
          <polygon points="345,54 355,60 345,66" fill="var(--accent)" />
          {/* 钱包 */}
          <rect x="370" y="20" width="200" height="80" rx="0" fill="var(--surface-3)" stroke="var(--accent)" />
          <text x="470" y="55" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14" fill="var(--text-mute)">WALLET</text>
          <text x="470" y="80" textAnchor="middle" fontFamily="var(--font-display-cn)" fontSize="20" fill="var(--accent)">钥匙管理</text>
        </svg>
      </div>
    </div>
  );
}

/* ─── Step 6: 实操演示 MetaMask → Rabby ─── */
function StepImportDemo() {
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
    <div className="wl-import">
      <div className="wl-import__header">
        <span className="wl-import__prompt">{">"}</span>
        <span className="wl-import__title">{"wallet.import(mnemonic)"}</span>
      </div>
      <div className="wl-import__flow">
        <div className={`wl-import__step ${phase >= 1 ? "visible" : ""}`}>
          <div className="wl-import__step-label">MetaMask 创建</div>
          <div className="wl-import__seed">
            {"abandon ... zoo"}
          </div>
          <div className="wl-import__step-note">获得助记词</div>
        </div>
        <div className={`wl-import__arrow ${phase >= 2 ? "visible" : ""}`}>
          {"→"}
        </div>
        <div className={`wl-import__step ${phase >= 2 ? "visible" : ""}`}>
          <div className="wl-import__step-label">导入 Rabby</div>
          <div className="wl-import__seed-input">
            {"输入同一组助记词"}
          </div>
          <div className="wl-import__step-note">导入同一组助记词</div>
        </div>
        <div className={`wl-import__arrow ${phase >= 3 ? "visible" : ""}`}>
          {"→"}
        </div>
        <div className={`wl-import__step wl-import__step--result ${phase >= 3 ? "visible" : ""}`}>
          <div className="wl-import__step-label">同一地址</div>
          <div className="wl-import__addr">0x7a9F...12B8</div>
          <div className="wl-import__step-note">完全相同的账户</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 7: 账户归属 ─── */
function StepOwnership() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="wl-own">
      <div className="wl-own__header">
        <span className="wl-own__prompt">{">"}</span>
        <span className="wl-own__title">{"cat /wallet/ownership.txt"}</span>
      </div>
      <div className={`wl-own__content ${show ? "visible" : ""}`}>
        <div className="wl-own__statement">
          账户不属于任何钱包 App
        </div>
        <div className="wl-own__statement wl-own__statement--accent">
          账户属于这组私钥 / 助记词
        </div>
        <div className="wl-own__apps">
          <span className="wl-own__app">MetaMask</span>
          <span className="wl-own__sep">/</span>
          <span className="wl-own__app">Rabby</span>
          <span className="wl-own__sep">/</span>
          <span className="wl-own__app">OKX Wallet</span>
        </div>
        <div className="wl-own__apps-note">只是不同的钱包工具</div>
      </div>
    </div>
  );
}

/* ─── Step 8: 安全提醒 — 助记词三条红线 ─── */
function StepSecurityTips() {
  const [visibleCount, setVisibleCount] = useState(0);
  const tips = [
    { text: "不要把助记词发给任何人", code: "NEVER_SHARE" },
    { text: "不要在陌生网站输入助记词", code: "NEVER_INPUT" },
    { text: "不要把助记词截图保存", code: "NEVER_SCREENSHOT" },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    tips.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 300 + i * 350));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="wl-tips">
      <div className="wl-tips__header">
        <span className="wl-tips__prompt">{">"}</span>
        <span className="wl-tips__title">{"cat /security/redlines.md"}</span>
      </div>
      <div className="wl-tips__list">
        {tips.map((t, i) => (
          <div
            key={t.code}
            className={`wl-tips__item ${i < visibleCount ? "visible" : ""}`}
          >
            <span className="wl-tips__redline">RED LINE {i + 1}</span>
            <span className="wl-tips__text">{t.text}</span>
            <span className="wl-tips__code">{"// "}{t.code}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Step 9: 高风险警示 ─── */
function StepWarning() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="wl-warn">
      <div className="wl-warn__header">
        <span className="wl-warn__prompt">{">"}</span>
        <span className="wl-warn__title">{"ALERT: PHISHING DETECTED"}</span>
      </div>
      <div className={`wl-warn__content ${show ? "visible" : ""}`}>
        <div className="wl-warn__icon-box">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <polygon points="40,8 72,68 8,68" stroke="#ff4141" strokeWidth="3" fill="none" />
            <line x1="40" y1="28" x2="40" y2="48" stroke="#ff4141" strokeWidth="4" strokeLinecap="round" />
            <circle cx="40" cy="58" r="3" fill="#ff4141" />
          </svg>
        </div>
        <div className="wl-warn__text-block">
          <div className="wl-warn__headline">网站要求输入助记词</div>
          <div className="wl-warn__verdict">{"→ 直接判断为高风险"}</div>
        </div>
      </div>
    </div>
  );
}
