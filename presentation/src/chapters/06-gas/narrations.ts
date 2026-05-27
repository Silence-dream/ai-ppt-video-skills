/**
 * gas 章节的口播文本
 * 来源：script.md step 32-35
 */
export const narrations: string[] = [
  // step 0: Hero 标语
  "接下来说 Gas。区块链不是免费运行的。每一笔交易都需要节点进行验证、计算和存储。",

  // step 1: 类比：链上操作的燃料费
  "你需要为这次操作支付手续费，这个手续费就叫 Gas。你可以把它理解成链上操作的燃料费，或者计算资源费。",

  // step 2: 对比动画：普通转账 vs Swap 的 Gas 差异
  "对比一下。普通转账只是修改两个账户的余额，Gas 很低。但 Swap 需要调用去中心化交易所的合约，计算兑换比例、更新池子余额，Gas 就高多了。",

  // step 3: 工具推荐：Etherscan Gas Tracker
  "如果你想实时查看 Gas 情况，可以打开 Etherscan Gas Tracker。它会展示当前网络的 Gas 相关信息。",
];
