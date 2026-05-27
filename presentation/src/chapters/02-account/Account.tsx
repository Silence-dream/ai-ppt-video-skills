import { useState, useEffect } from "react";
import "./Account.css";

/**
 * account 章节 - 账户 = 链上身份
 * 4 步：Hero 标语 + 地址 → 功能列表 → 传统 vs 区块链对比 → 安全规则
 */
export default function Account({ step }: { step: number }) {
  return (
    <div className="ac-chapter">
      {step === 0 && <StepHero />}
      {step === 1 && <StepFunctions />}
      {step === 2 && <StepCompare />}
      {step === 3 && <StepSecurity />}
    </div>
  );
}

/* ─── Step 0: Hero 标语 + 地址格式展示 ─── */
function StepHero() {
  const [showTitle, setShowTitle] = useState(false);
  const [showAddr, setShowAddr] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowTitle(true), 100);
    const t2 = setTimeout(() => setShowAddr(true), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="ac-hero">
      <div className="ac-hero__label">{"// ACCOUNT = ONCHAIN IDENTITY"}</div>
      <h1 className={`ac-hero__title ${showTitle ? "visible" : ""}`}>
        账户
        <span className="ac-hero__eq">=</span>
        链上身份
      </h1>
      <div className={`ac-hero__addr-block ${showAddr ? "visible" : ""}`}>
        <div className="ac-hero__addr-label">YOUR ADDRESS</div>
        <div className="ac-hero__addr">
          <span className="ac-hero__addr-prefix">0x</span>
          <span className="ac-hero__addr-hex">A1b2C3</span>
          <span className="ac-hero__addr-dots">...</span>
          <span className="ac-hero__addr-hex">89F</span>
        </div>
        <div className="ac-hero__addr-analogy">
          {"// 类比：身份证号 / 银行账户号"}
        </div>
      </div>
    </div>
  );
}

/* ─── Step 1: 功能列表（逐个亮起） ─── */
function StepFunctions() {
  const [visibleCount, setVisibleCount] = useState(0);
  const funcs = [
    { label: "接收资产", code: "receive" },
    { label: "发送资产", code: "send" },
    { label: "持有 Token", code: "token" },
    { label: "持有 NFT", code: "nft" },
    { label: "合约交互", code: "contract" },
  ];

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    funcs.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 200 + i * 220));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="ac-funcs">
      <div className="ac-funcs__header">
        <span className="ac-funcs__prompt">{">"}</span>
        <span className="ac-funcs__title">{"cat /account/capabilities.md"}</span>
      </div>
      <div className="ac-funcs__list">
        {funcs.map((f, i) => (
          <div
            key={f.code}
            className={`ac-funcs__item ${i < visibleCount ? "active" : ""} ${i < visibleCount - 1 ? "dim" : ""}`}
          >
            <span className="ac-funcs__index">{String(i + 1).padStart(2, "0")}</span>
            <span className="ac-funcs__code">{f.code}</span>
            <span className="ac-funcs__label">{f.label}</span>
          </div>
        ))}
      </div>
      <div className={`ac-funcs__analogy ${visibleCount >= funcs.length ? "visible" : ""}`}>
        {"// 这就是你的链上身份证号，它能做这些事"}
      </div>
    </div>
  );
}

/* ─── Step 2: 传统登录 vs 区块链私钥 对比 ─── */
function StepCompare() {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [showDivider, setShowDivider] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowLeft(true), 200);
    const t2 = setTimeout(() => setShowDivider(true), 600);
    const t3 = setTimeout(() => setShowRight(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="ac-compare">
      <div className="ac-compare__header">
        <span className="ac-compare__prompt">{">"}</span>
        <span className="ac-compare__title">{"diff traditional.txt blockchain.txt"}</span>
      </div>
      <div className="ac-compare__body">
        <div className={`ac-compare__col ac-compare__col--left ${showLeft ? "visible" : ""}`}>
          <div className="ac-compare__col-label">传统互联网</div>
          <div className="ac-compare__row">
            <span className="ac-compare__key">用户名</span>
            <span className="ac-compare__sign">+</span>
            <span className="ac-compare__key">密码</span>
          </div>
          <div className="ac-compare__row">
            <span className="ac-compare__key">手机号</span>
            <span className="ac-compare__sign">+</span>
            <span className="ac-compare__key">验证码</span>
          </div>
          <div className="ac-compare__note">平台控制你的账户</div>
        </div>
        <div className={`ac-compare__divider ${showDivider ? "visible" : ""}`}>
          <span>VS</span>
        </div>
        <div className={`ac-compare__col ac-compare__col--right ${showRight ? "visible" : ""}`}>
          <div className="ac-compare__col-label">区块链</div>
          <div className="ac-compare__row ac-compare__row--highlight">
            <span className="ac-compare__key">私钥</span>
          </div>
          <div className="ac-compare__note ac-compare__note--accent">私钥控制账户</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 3: 安全规则 ─── */
function StepSecurity() {
  const [showAddr, setShowAddr] = useState(false);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowAddr(true), 200);
    const t2 = setTimeout(() => setShowKey(true), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="ac-security">
      <div className="ac-security__header">
        <span className="ac-security__prompt">{">"}</span>
        <span className="ac-security__title">{"cat /security/rules.md"}</span>
      </div>
      <div className="ac-security__rules">
        <div className={`ac-security__rule ac-security__rule--ok ${showAddr ? "visible" : ""}`}>
          <span className="ac-security__icon">{"✓"}</span>
          <span className="ac-security__text">地址可以公开</span>
          <span className="ac-security__detail">{"// ADDRESS_PUBLIC=true"}</span>
        </div>
        <div className={`ac-security__rule ac-security__rule--danger ${showKey ? "visible" : ""}`}>
          <span className="ac-security__icon">{"✗"}</span>
          <span className="ac-security__text">私钥和助记词绝对不能公开</span>
          <span className="ac-security__detail">{"// PRIVATE_KEY_MUST_STAY_SECRET"}</span>
        </div>
      </div>
    </div>
  );
}
