import type { ChapterDef } from "./types";
import HookChapter from "../chapters/01-hook/Hook";
import { narrations as hookNarrations } from "../chapters/01-hook/narrations";
import AccountChapter from "../chapters/02-account/Account";
import { narrations as accountNarrations } from "../chapters/02-account/narrations";
import WalletChapter from "../chapters/03-wallet/Wallet";
import { narrations as walletNarrations } from "../chapters/03-wallet/narrations";
import SignatureChapter from "../chapters/04-signature/Signature";
import { narrations as signatureNarrations } from "../chapters/04-signature/narrations";
import TransactionChapter from "../chapters/05-transaction/Transaction";
import { narrations as transactionNarrations } from "../chapters/05-transaction/narrations";
import GasChapter from "../chapters/06-gas/Gas";
import { narrations as gasNarrations } from "../chapters/06-gas/narrations";
import ContractChapter from "../chapters/07-contract/Contract";
import { narrations as contractNarrations } from "../chapters/07-contract/narrations";
import TestnetChapter from "../chapters/08-testnet/Testnet";
import { narrations as testnetNarrations } from "../chapters/08-testnet/narrations";
import ExplorerChapter from "../chapters/09-explorer/Explorer";
import { narrations as explorerNarrations } from "../chapters/09-explorer/narrations";
import FullFlowChapter from "../chapters/10-full-flow/FullFlow";
import { narrations as fullFlowNarrations } from "../chapters/10-full-flow/narrations";
import SummaryChapter from "../chapters/11-summary/Summary";
import { narrations as summaryNarrations } from "../chapters/11-summary/narrations";

/**
 * Order = order of presentation.
 *
 * Each chapter MUST provide a `narrations: Narration[]` array. Its length
 * is the chapter's step count — there is no `totalSteps` to maintain
 * separately. This guarantees the audio synthesis pipeline, the runtime
 * stepper, and the chapter `.tsx` switch on `step` cannot drift apart.
 *
 * Visual styling (color, fonts) comes entirely from the active theme —
 * chapters never hard-code palette / font names. See THEMES.md.
 */
export const CHAPTERS: ChapterDef[] = [
  {
    id: "hook",
    title: "钩子开场",
    narrations: hookNarrations,
    Component: HookChapter,
  },
  {
    id: "account",
    title: "账户 = 链上身份",
    narrations: accountNarrations,
    Component: AccountChapter,
  },
  {
    id: "wallet",
    title: "钱包 = 钥匙管理器",
    narrations: walletNarrations,
    Component: WalletChapter,
  },
  {
    id: "signature",
    title: "签名 = 电子签字",
    narrations: signatureNarrations,
    Component: SignatureChapter,
  },
  {
    id: "transaction",
    title: "交易 = 状态修改请求",
    narrations: transactionNarrations,
    Component: TransactionChapter,
  },
  {
    id: "gas",
    title: "Gas = 燃料费",
    narrations: gasNarrations,
    Component: GasChapter,
  },
  {
    id: "contract",
    title: "智能合约 = 自动程序",
    narrations: contractNarrations,
    Component: ContractChapter,
  },
  {
    id: "testnet",
    title: "测试网 = 练习场",
    narrations: testnetNarrations,
    Component: TestnetChapter,
  },
  {
    id: "explorer",
    title: "区块浏览器 = 搜索引擎",
    narrations: explorerNarrations,
    Component: ExplorerChapter,
  },
  {
    id: "full-flow",
    title: "完整实操串联",
    narrations: fullFlowNarrations,
    Component: FullFlowChapter,
  },
  {
    id: "summary",
    title: "总结：跨过入门关键一步",
    narrations: summaryNarrations,
    Component: SummaryChapter,
  },
];
