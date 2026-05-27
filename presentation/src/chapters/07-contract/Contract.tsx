import { useState, useEffect } from "react";
import "./Contract.css";

/**
 * contract 章节 - 智能合约讲解
 * 7 步：Hero 标语 → NFT Mint 流程 → 判断逻辑 → 执行结果 → Remix IDE → Remix 步骤 → 学习资源
 */
export default function Contract({ step }: { step: number }) {
  return (
    <div className="ct-chapter">
      {step === 0 && <StepHero />}
      {step === 1 && <StepMintFlow />}
      {step === 2 && <StepLogic />}
      {step === 3 && <StepResult />}
      {step === 4 && <StepRemix />}
      {step === 5 && <StepRemixSteps />}
      {step === 6 && <StepResources />}
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
    <div className={`ct-hero ${visible ? "visible" : ""}`}>
      <div className="ct-hero__cmd">
        <span className="ct-hero__prompt">{">"}</span>
        <span className="ct-hero__cmd-text">{"deploy --contract SmartContract"}</span>
      </div>
      <h1 className="ct-hero__title">
        链上的
        <br />
        <span className="ct-hero__accent">自动程序</span>
      </h1>
      <div className="ct-hero__sub">
        {"// 按照提前写好的代码规则自动执行，无人干预"}
      </div>
      <div className="ct-hero__cursor">{"▌"}</div>
    </div>
  );
}

/* ─── Step 1: NFT 合约示例：0.05 ETH → Mint ─── */
function StepMintFlow() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`ct-mint ${visible ? "visible" : ""}`}>
      <div className="ct-mint__header">
        <span className="ct-mint__prompt">{">"}</span>
        <span className="ct-mint__cmd">{"cat /contract/nft-mint.sol"}</span>
      </div>

      <div className="ct-mint__flow">
        {/* 用户端 */}
        <div className="ct-mint__node ct-mint__node--user">
          <div className="ct-mint__node-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="18" r="10" stroke="var(--text-2)" strokeWidth="2" fill="none"/>
              <path d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="var(--text-2)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="ct-mint__node-label">用户</div>
          <div className="ct-mint__node-action">点击 Mint</div>
        </div>

        {/* 箭头 + ETH */}
        <div className="ct-mint__arrow-group">
          <div className="ct-mint__eth">
            <span className="ct-mint__eth-val">0.05</span>
            <span className="ct-mint__eth-unit">ETH</span>
          </div>
          <div className="ct-mint__arrow-line">
            <div className="ct-mint__arrow-head">{"→"}</div>
          </div>
        </div>

        {/* 合约 */}
        <div className="ct-mint__node ct-mint__node--contract">
          <div className="ct-mint__node-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="6" width="32" height="36" rx="2" stroke="var(--accent)" strokeWidth="2" fill="none"/>
              <line x1="14" y1="16" x2="34" y2="16" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5"/>
              <line x1="14" y1="22" x2="30" y2="22" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5"/>
              <line x1="14" y1="28" x2="26" y2="28" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5"/>
              <line x1="14" y1="34" x2="22" y2="34" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5"/>
            </svg>
          </div>
          <div className="ct-mint__node-label ct-mint__node-label--accent">NFT 合约</div>
          <div className="ct-mint__node-action">执行 mint()</div>
        </div>

        {/* 箭头 */}
        <div className="ct-mint__arrow-group">
          <div className="ct-mint__arrow-line">
            <div className="ct-mint__arrow-head">{"→"}</div>
          </div>
          <div className="ct-mint__nft-tag">NFT #4521</div>
        </div>

        {/* 结果 */}
        <div className="ct-mint__node ct-mint__node--result">
          <div className="ct-mint__node-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="10" y="10" width="28" height="28" rx="2" stroke="var(--accent)" strokeWidth="2" fill="var(--accent-soft)"/>
              <path d="M20 24l3 3 6-6" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="ct-mint__node-label">你的账户</div>
          <div className="ct-mint__node-action">获得 NFT</div>
        </div>
      </div>

      <div className="ct-mint__note">
        {"// 不是和传统服务器交互，而是调用链上合约"}
      </div>
    </div>
  );
}

/* ─── Step 2: 合约判断逻辑流程图 ─── */
function StepLogic() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const checks = [
    { id: 0, text: "ETH >= 0.05?", y: 40 },
    { id: 1, text: "Mint 是否开放?", y: 160 },
    { id: 2, text: "白名单资格?", y: 280 },
    { id: 3, text: "未超数量限制?", y: 400 },
  ];

  return (
    <div className={`ct-logic ${visible ? "visible" : ""}`}>
      <div className="ct-logic__header">
        <span className="ct-logic__prompt">{">"}</span>
        <span className="ct-logic__cmd">{"cat /contract/validation.flow"}</span>
      </div>

      <div className="ct-logic__body">
        <svg className="ct-logic__svg" viewBox="0 0 600 520" width="600" height="520">
          {/* 连接线 - 先画线再画节点 */}
          {checks.map((c, i) => (
            <g key={`line-${c.id}`}>
              {/* 向下的连接线 */}
              {i < checks.length - 1 && (
                <line
                  x1="300" y1={c.y + 60}
                  x2="300" y2={c.y + 100}
                  stroke="var(--rule)"
                  strokeWidth="2"
                  className={`ct-logic__line ct-logic__line--${i}`}
                />
              )}
              {/* YES 标签 */}
              {i < checks.length - 1 && (
                <text
                  x="316" y={c.y + 86}
                  fill="var(--accent)"
                  fontFamily="var(--font-mono)"
                  fontSize="12"
                  className={`ct-logic__yes ct-logic__yes--${i}`}
                >
                  YES
                </text>
              )}
            </g>
          ))}

          {/* 判断节点 */}
          {checks.map((c, i) => (
            <g key={c.id} className={`ct-logic__node ct-logic__node--${i}`}>
              {/* 菱形 */}
              <polygon
                points={`300,${c.y} 400,${c.y + 30} 300,${c.y + 60} 200,${c.y + 30}`}
                fill="var(--surface-2)"
                stroke={i === checks.length - 1 ? "var(--accent)" : "var(--rule)"}
                strokeWidth="2"
              />
              <text
                x="300" y={c.y + 35}
                textAnchor="middle"
                fill={i === checks.length - 1 ? "var(--accent)" : "var(--text)"}
                fontFamily="var(--font-mono)"
                fontSize="14"
                fontWeight="600"
              >
                {c.text}
              </text>
            </g>
          ))}

          {/* 最终结果 */}
          <g className="ct-logic__result">
            <rect
              x="220" y="480" width="160" height="40" rx="2"
              fill="var(--accent-soft)"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <text
              x="300" y="505"
              textAnchor="middle"
              fill="var(--accent)"
              fontFamily="var(--font-mono)"
              fontSize="16"
              fontWeight="700"
            >
              Mint 成功
            </text>
          </g>

          {/* 从最后一个菱形到结果的线 */}
          <line
            x1="300" y1="460"
            x2="300" y2="478"
            stroke="var(--accent)"
            strokeWidth="2"
            className="ct-logic__line ct-logic__line--3"
          />
          <text
            x="316" y="474"
            fill="var(--accent)"
            fontFamily="var(--font-mono)"
            fontSize="12"
            className="ct-logic__yes ct-logic__yes--3"
          >
            YES
          </text>

          {/* NO 分支 — 每个节点右侧 */}
          {checks.map((c, i) => (
            <g key={`no-${i}`} className={`ct-logic__no ct-logic__no--${i}`}>
              <line
                x1="400" y1={c.y + 30}
                x2="500" y2={c.y + 30}
                stroke="var(--text-faint)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
              />
              <text
                x="420" y={c.y + 22}
                fill="var(--text-faint)"
                fontFamily="var(--font-mono)"
                fontSize="12"
              >
                NO
              </text>
              <text
                x="500" y={c.y + 34}
                fill="var(--text-faint)"
                fontFamily="var(--font-mono)"
                fontSize="13"
              >
                Revert
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

/* ─── Step 3: 合约执行结果：NFT 记录到账户 ─── */
function StepResult() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`ct-result ${visible ? "visible" : ""}`}>
      <div className="ct-result__header">
        <span className="ct-result__prompt">{">"}</span>
        <span className="ct-result__cmd">{"cast call --mint-status"}</span>
      </div>

      <div className="ct-result__body">
        {/* 终端输出 */}
        <div className="ct-result__terminal">
          <div className="ct-result__line ct-result__line--1">
            <span className="ct-result__key">tx_hash</span>
            <span className="ct-result__val">0x7a3f...e91b</span>
          </div>
          <div className="ct-result__line ct-result__line--2">
            <span className="ct-result__key">status</span>
            <span className="ct-result__status">SUCCESS</span>
          </div>
          <div className="ct-result__line ct-result__line--3">
            <span className="ct-result__key">token_id</span>
            <span className="ct-result__val">#4521</span>
          </div>
          <div className="ct-result__line ct-result__line--4">
            <span className="ct-result__key">owner</span>
            <span className="ct-result__val">0x8B21...3aF7</span>
          </div>
          <div className="ct-result__line ct-result__line--5">
            <span className="ct-result__key">contract</span>
            <span className="ct-result__val">0x1234...abcd</span>
          </div>
        </div>

        {/* NFT 卡片可视化 */}
        <div className="ct-result__nft-card">
          <div className="ct-result__nft-visual">
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
              <rect width="180" height="180" rx="4" fill="var(--surface-3)"/>
              {/* 抽象 NFT 图形 */}
              <circle cx="90" cy="70" r="35" stroke="var(--accent)" strokeWidth="2" fill="var(--accent-soft)"/>
              <polygon points="90,45 110,80 70,80" stroke="var(--accent)" strokeWidth="1.5" fill="none"/>
              <rect x="55" y="110" width="70" height="8" rx="1" fill="var(--text-faint)" opacity="0.5"/>
              <rect x="65" y="126" width="50" height="6" rx="1" fill="var(--text-faint)" opacity="0.3"/>
            </svg>
          </div>
          <div className="ct-result__nft-id">NFT #4521</div>
          <div className="ct-result__nft-owner">
            <span className="ct-result__nft-owner-label">owner:</span>
            <span className="ct-result__nft-owner-addr">0x8B21...3aF7</span>
          </div>
        </div>
      </div>

      <div className="ct-result__note">
        {"// NFT 已永久记录到你的账户地址下"}
      </div>
    </div>
  );
}

/* ─── Step 4: Remix IDE 模拟 ─── */
function StepRemix() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`ct-remix ${visible ? "visible" : ""}`}>
      <div className="ct-remix__header">
        <span className="ct-remix__prompt">{">"}</span>
        <span className="ct-remix__cmd">{"open remix.ethereum.org"}</span>
      </div>

      <div className="ct-remix__browser">
        {/* 浏览器标题栏 */}
        <div className="ct-remix__titlebar">
          <span className="ct-remix__dot ct-remix__dot--r" />
          <span className="ct-remix__dot ct-remix__dot--y" />
          <span className="ct-remix__dot ct-remix__dot--g" />
          <div className="ct-remix__url">
            <span className="ct-remix__url-text">remix.ethereum.org</span>
          </div>
        </div>

        {/* IDE 内容 */}
        <div className="ct-remix__ide">
          {/* 侧边栏 */}
          <div className="ct-remix__sidebar">
            <div className="ct-remix__sidebar-icon ct-remix__sidebar-icon--active">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="3" width="14" height="14" rx="1" stroke="var(--accent)" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <div className="ct-remix__sidebar-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7" stroke="var(--text-faint)" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <div className="ct-remix__sidebar-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 6h12M4 10h12M4 14h8" stroke="var(--text-faint)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {/* 文件树 */}
          <div className="ct-remix__files">
            <div className="ct-remix__file-title">EXPLORER</div>
            <div className="ct-remix__file ct-remix__file--open">
              <span className="ct-remix__file-icon">{"</>"}</span>
              <span className="ct-remix__file-name">MyNFT.sol</span>
            </div>
            <div className="ct-remix__file">
              <span className="ct-remix__file-icon">{">_"}</span>
              <span className="ct-remix__file-name">deploy.js</span>
            </div>
          </div>

          {/* 编辑器 */}
          <div className="ct-remix__editor">
            <div className="ct-remix__code">
              <div className="ct-remix__code-line">
                <span className="ct-remix__kw">pragma</span>{" solidity ^0.8.20;"}
              </div>
              <div className="ct-remix__code-line">
                <span className="ct-remix__kw">import</span>{" \"@openzeppelin/contracts/...\";"}
              </div>
              <div className="ct-remix__code-line ct-remix__code-line--hl">
                <span className="ct-remix__kw">contract</span>{" MyNFT "}
                <span className="ct-remix__kw">is</span>{" ERC721 {"}
              </div>
              <div className="ct-remix__code-line">
                {"  "}
                <span className="ct-remix__kw">uint</span>
                <span className="ct-remix__fn"> price</span>
                {" = "}
                <span className="ct-remix__num">0.05</span>
                {" ether;"}
              </div>
              <div className="ct-remix__code-line">
                {"  "}
                <span className="ct-remix__kw">function</span>
                <span className="ct-remix__fn"> mint</span>
                {"() "}
                <span className="ct-remix__kw">external</span>
                {" payable {"}
              </div>
              <div className="ct-remix__code-line">
                {"    "}
                <span className="ct-remix__cm">{"// ...mint logic"}</span>
              </div>
              <div className="ct-remix__code-line">{"  }"}</div>
              <div className="ct-remix__code-line">{"}"}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="ct-remix__tip">
        {"// 浏览器内编写、测试、部署智能合约的 Web3 IDE"}
      </div>
    </div>
  );
}

/* ─── Step 5: Remix 使用步骤 ─── */
function StepRemixSteps() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const steps = [
    { num: "01", label: "新建合约", desc: "创建 .sol 文件" },
    { num: "02", label: "编译合约", desc: "Solidity Compiler" },
    { num: "03", label: "连接钱包", desc: "Injected Provider" },
    { num: "04", label: "部署到测试网", desc: "Deploy & Run" },
    { num: "05", label: "查看合约地址", desc: "区块浏览器验证" },
  ];

  return (
    <div className={`ct-steps ${visible ? "visible" : ""}`}>
      <div className="ct-steps__header">
        <span className="ct-steps__prompt">{">"}</span>
        <span className="ct-steps__cmd">{"cat /remix/usage-guide.txt"}</span>
      </div>

      <div className="ct-steps__body">
        {steps.map((s, i) => (
          <div key={s.num} className={`ct-steps__item ct-steps__item--${i}`}>
            <span className="ct-steps__num">{s.num}</span>
            <div className="ct-steps__line" />
            <div className="ct-steps__content">
              <div className="ct-steps__label">{s.label}</div>
              <div className="ct-steps__desc">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Step 6: 学习资源 ─── */
function StepResources() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const resources = [
    {
      label: "Solidity 官方文档",
      url: "docs.soliditylang.org",
      desc: "合约语言规范 · 语法 · 最佳实践",
    },
    {
      label: "Ethereum 开发者文档",
      url: "ethereum.org/developers",
      desc: "开发框架 · 教程 · 工具链",
    },
  ];

  return (
    <div className={`ct-resources ${visible ? "visible" : ""}`}>
      <div className="ct-resources__header">
        <span className="ct-resources__prompt">{">"}</span>
        <span className="ct-resources__cmd">{"ls /learn/references"}</span>
      </div>

      <div className="ct-resources__body">
        {resources.map((r, i) => (
          <div key={r.label} className={`ct-resources__card ct-resources__card--${i}`}>
            <div className="ct-resources__card-top">
              <span className="ct-resources__card-icon">{">"}</span>
              <span className="ct-resources__card-label">{r.label}</span>
            </div>
            <div className="ct-resources__card-url">{r.url}</div>
            <div className="ct-resources__card-desc">{r.desc}</div>
          </div>
        ))}
      </div>

      <div className="ct-resources__footer">
        {"// 系统学习，从读文档开始"}
      </div>
    </div>
  );
}
