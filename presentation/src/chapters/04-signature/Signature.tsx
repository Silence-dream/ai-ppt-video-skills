import "./Signature.css";

/**
 * signature 章节 - 数字签名
 * 7 步：没有登录 → 四作用 → 电子签字 → Connect Wallet → 弹窗 → 两类对比 → 警示
 */
export default function Signature({ step }: { step: number }) {
  return (
    <div className="sg-chapter">
      {step === 0 && <StepNoLogin />}
      {step === 1 && <StepPurposes />}
      {step === 2 && <StepAnalogy />}
      {step === 3 && <StepConnect />}
      {step === 4 && <StepPopup />}
      {step === 5 && <StepCompare />}
      {step === 6 && <StepWarning />}
    </div>
  );
}

/**
 * Step 0: 没有手机号验证码
 * 展示传统登录方式被否定
 */
function StepNoLogin() {
  return (
    <div className="sg-no-login">
      <div className="sg-no-login__label">{"// SIGNATURE"}</div>
      <h1 className="sg-no-login__hero">
        区块链没有
        <br />
        <em>手机号验证码</em>
      </h1>
      <div className="sg-no-login__form">
        <div className="sg-no-login__form-label">手机号</div>
        <div className="sg-no-login__form-input">138 **** 8888</div>
        <div className="sg-no-login__form-label">验证码</div>
        <div className="sg-no-login__form-input">____</div>
        <div className="sg-no-login__form-btn">发送验证码</div>
        {/* SVG 划线 */}
        <svg className="sg-no-login__strike" viewBox="0 0 420 280">
          <line
            className="sg-no-login__strike-line"
            x1="0"
            y1="280"
            x2="420"
            y2="0"
          />
        </svg>
      </div>
    </div>
  );
}

/**
 * Step 1: 签名四作用
 * 证明授权 / 不暴露私钥 / 防伪造 / 防篡改
 */
function StepPurposes() {
  const items = [
    { icon: "{ }", title: "证明授权", desc: "确认操作由你发起" },
    { icon: "***", title: "保护私钥", desc: "签名过程不暴露私钥" },
    { icon: "!=", title: "防止伪造", desc: "别人无法冒充你签名" },
    { icon: "==", title: "防止篡改", desc: "内容被改则签名失效" },
  ];

  return (
    <div className="sg-purposes">
      <div className="sg-purposes__header">
        <span className="sg-purposes__prompt">{">"}</span>
        <span>签名的四个作用</span>
      </div>
      <div className="sg-purposes__grid">
        {items.map((item) => (
          <div key={item.title} className="sg-purposes__item">
            <div className="sg-purposes__icon-box">
              <span className="sg-purposes__icon">{item.icon}</span>
            </div>
            <span className="sg-purposes__title">{item.title}</span>
            <span className="sg-purposes__desc">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Step 2: 链上的电子签字
 * 模拟手写签名动画
 */
function StepAnalogy() {
  return (
    <div className="sg-analogy">
      <h1 className="sg-analogy__hero">
        签名 =
        <em>链上的电子签字</em>
      </h1>
      <div className="sg-analogy__sign-area">
        <div className="sg-analogy__sign-line" />
        <span className="sg-analogy__signature">0xSig...7a2f</span>
        <span className="sg-analogy__sign-label">EIP-191 Personal Sign</span>
      </div>
    </div>
  );
}

/**
 * Step 3: Connect Wallet 按钮
 * 模拟 DApp 网页中的连接钱包按钮
 */
function StepConnect() {
  return (
    <div className="sg-connect">
      <h1 className="sg-connect__title">DApp 网页上的操作</h1>
      <div className="sg-connect__browser">
        <div className="sg-connect__browser-bar">
          <div className="sg-connect__browser-dot" />
          <div className="sg-connect__browser-dot" />
          <div className="sg-connect__browser-dot" />
          <span className="sg-connect__browser-url">app.example.dapp</span>
        </div>
        <div className="sg-connect__browser-body">
          <span className="sg-connect__browser-text">
            连接你的钱包以继续
          </span>
          <div className="sg-connect__btn" data-no-advance>
            Connect Wallet
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Step 4: 签名请求弹窗
 * 模拟钱包弹出签名请求
 */
function StepPopup() {
  return (
    <div className="sg-popup">
      <h1 className="sg-popup__title">签名请求弹窗</h1>
      <div className="sg-popup__dialog">
        <div className="sg-popup__dialog-header">MetaMask - Signature Request</div>
        <div className="sg-popup__dialog-body">
          <div className="sg-popup__dialog-site">app.example.dapp</div>
          <div className="sg-popup__dialog-msg">
            <span className="sg-popup__dialog-msg-label">
              {"// Message to sign:"}
            </span>
            Welcome to Example DApp.
            <br />
            Sign this message to verify your identity.
            <br />
            Nonce: 0xa3f8...c2d1
            <br />
            Timestamp: 2024-01-15T10:30:00Z
          </div>
          <div className="sg-popup__dialog-actions">
            <div className="sg-popup__dialog-btn sg-popup__dialog-btn--cancel">
              Reject
            </div>
            <div className="sg-popup__dialog-btn sg-popup__dialog-btn--sign">
              Sign
            </div>
          </div>
        </div>
      </div>
      <div className="sg-popup__no-gas">
        签名 <em>不一定消耗 Gas</em>，只是证明地址由你控制
      </div>
    </div>
  );
}

/**
 * Step 5: 两类签名对比
 * 消息签名 vs 交易签名
 */
function StepCompare() {
  return (
    <div className="sg-compare">
      <h1 className="sg-compare__title">两类签名</h1>
      <div className="sg-compare__cards">
        {/* 消息签名 */}
        <div className="sg-compare__card">
          <div className="sg-compare__card-header">
            <div className="sg-compare__card-icon">M</div>
            <span className="sg-compare__card-name">消息签名</span>
          </div>
          <div className="sg-compare__card-rows">
            <div className="sg-compare__card-row">
              <span className="sg-compare__card-key">用途</span>
              <span className="sg-compare__card-val">登录 / 验证身份</span>
            </div>
            <div className="sg-compare__card-row">
              <span className="sg-compare__card-key">Gas</span>
              <span className="sg-compare__card-val sg-compare__card-val--green">
                不消耗
              </span>
            </div>
            <div className="sg-compare__card-row">
              <span className="sg-compare__card-key">上链</span>
              <span className="sg-compare__card-val sg-compare__card-val--mute">
                不上链
              </span>
            </div>
            <div className="sg-compare__card-row">
              <span className="sg-compare__card-key">标准</span>
              <span className="sg-compare__card-val">EIP-191 / EIP-4361</span>
            </div>
          </div>
        </div>
        {/* 交易签名 */}
        <div className="sg-compare__card">
          <div className="sg-compare__card-header">
            <div className="sg-compare__card-icon">T</div>
            <span className="sg-compare__card-name">交易签名</span>
          </div>
          <div className="sg-compare__card-rows">
            <div className="sg-compare__card-row">
              <span className="sg-compare__card-key">用途</span>
              <span className="sg-compare__card-val">提交交易到链上</span>
            </div>
            <div className="sg-compare__card-row">
              <span className="sg-compare__card-key">Gas</span>
              <span className="sg-compare__card-val">消耗 Gas</span>
            </div>
            <div className="sg-compare__card-row">
              <span className="sg-compare__card-key">上链</span>
              <span className="sg-compare__card-val sg-compare__card-val--green">
                写入区块链
              </span>
            </div>
            <div className="sg-compare__card-row">
              <span className="sg-compare__card-key">标准</span>
              <span className="sg-compare__card-val">EIP-1559 / Legacy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Step 6: 警示 — 看清楚是普通签名还是交易确认
 */
function StepWarning() {
  return (
    <div className="sg-warning">
      <div className="sg-warning__icon">{"!>"}</div>
      <h1 className="sg-warning__text">
        每次钱包弹窗
        <br />
        都要看清楚
      </h1>
      <div className="sg-warning__sub">
        这是<em>普通签名</em>，还是<em>交易确认</em>？
      </div>
      <div className="sg-warning__border" />
    </div>
  );
}
