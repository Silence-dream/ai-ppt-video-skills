# Video Outline

> **主题**：`blueprint`（建议）—— 工程蓝图 / 技术拆解气质，适合把 prompt caching 讲成 agent 架构约束。
> **总时长**：约 6 分 20 秒（口播约 1520 字 ÷ 4 字/秒）
> **章节数**：9 章 / 38 步

---

## 1. coldopen — 缓存不是小技巧（5 steps · ~50s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- 主张：长会话 agent 的成本和延迟，很大部分靠 prompt caching 扛住 —— 来源 article §1 / L6-L8
- 产品信号：Claude Code 会监控 prompt cache hit rate，低了会报警，严重时按事故处理 —— 来源 article §1 / L9-L11
- 结论：缓存是产品架构约束，不是性能小优化 —— 来源 article §1 / L12

**开发计划**：

- step 1 (~8s) — 黑底工程图上只出现一句大字：“Prompt caching 不是省钱小技巧”
- step 2 (~10s) — 地基/结构隐喻的主视觉，标出“成本”“延迟”“体验”三根承重梁
- step 3 (~10s) — Claude Code 长会话 agent 的简化流程图，突出“前缀复用”
- step 4 (~12s) — cache hit rate 警报面板，显示命中率下降带来的成本与等待感
- step 5 (~10s) — 章节收束成一句判断：“agent 一跑长，缓存就是地基”

口播节选：
> 别小看 prompt caching。对长会话 agent 来说。它不是省钱小技巧。它更像地基。

---

## 2. prefix-rule — 前缀匹配决定一切（6 steps · ~60s）

**信息池**：
- 机制：prompt caching 是 prefix matching，从请求开头匹配到 `cache_control` breakpoint —— 来源 article §2 / L5-L7
- 排序原则：稳定、共享的内容放前面，动态内容放后面 —— 来源 article §2 / L8-L10
- Claude Code 顺序：system prompt + tools → CLAUDE.md → session context → messages —— 来源 article §2 / L11-L13

**开发计划**：

- step 1 (~8s) — 一条从左到右的请求前缀时间线，标出“从开头开始匹配”
- step 2 (~8s) — cache breakpoint 作为垂直刻度插入时间线
- step 3 (~10s) — 一个字节变化点把后半段标成“miss”
- step 4 (~12s) — 四层结构图：Static prompt/tools、CLAUDE.md、session context、messages
- step 5 (~12s) — 共享范围从“全局”缩到“项目”再缩到“会话”的层级标注
- step 6 (~10s) — 大字结论：“稳定的放前面，会变的放后面”

口播节选：
> 它是 prefix matching。从请求开头开始对。只要中间一个地方变了。后面就别想复用。

---

## 3. fragile-prefix — 小改动也会打碎缓存（5 steps · ~45s）

**信息池**：
- 坑 1：详细时间戳放进静态 system prompt，会让前缀频繁变化 —— 来源 article §3 / L5-L6
- 坑 2：工具定义顺序非确定性，会制造无意义 cache miss —— 来源 article §3 / L6-L7
- 坑 3：工具参数里的可调用 agent 列表变化，也会改变前缀 —— 来源 article §3 / L7-L8

**开发计划**：

- step 1 (~8s) — 稳定前缀像蓝图网格一样铺开
- step 2 (~9s) — “timestamp”标签插入静态区，后方区域全部变成 miss
- step 3 (~9s) — 工具列表顺序被打乱，两份看似相同的请求无法重合
- step 4 (~9s) — agent 参数列表变化，被高亮为“业务没大变，字节已经变了”
- step 5 (~10s) — 三个坑合并成检查清单：时间、顺序、参数

口播节选：
> 这些改动看着都不大。但字节一变。缓存就被切开了。

---

## 4. message-state — 动态状态走消息层（4 steps · ~40s）

**信息池**：
- 动态信息包括时间变化、用户改文件、状态更新 —— 来源 article §4 / L5-L7
- Claude Code 使用类似 `<system-reminder>` 的方式把更新放进下一轮 user message 或 tool result —— 来源 article §4 / L8-L10
- 设计原则：模型看到新信息，稳定前缀继续命中 —— 来源 article §4 / L11-L12

**开发计划**：

- step 1 (~8s) — system prompt 区被锁住，旁边出现“不要动”的工程封签
- step 2 (~10s) — 文件变更和时间更新从底部进入 message lane
- step 3 (~12s) — `<system-reminder>` 作为轻量提示贴到下一条消息上
- step 4 (~10s) — 对比画面：改 prompt = miss，发 message = hit

口播节选：
> 时间变了。文件被用户改了。当前状态更新了。这些都可以放进下一条 message。

---

## 5. model-cache — 中途换模型不一定省钱（3 steps · ~30s）

**信息池**：
- 模型缓存彼此隔离，Opus 的缓存不能直接给 Haiku 用 —— 来源 article §5 / L5-L8
- 长会话中途换便宜模型，可能因为重建缓存而更贵 —— 来源 article §5 / L8-L10
- subagent hand-off 可以把背景压成子任务交给另一个模型 —— 来源 article §5 / L11-L13

**开发计划**：

- step 1 (~10s) — Opus 长会话缓存块已堆到很长，旁边出现 Haiku 空缓存
- step 2 (~10s) — “便宜模型”标签被重建缓存成本抵消
- step 3 (~10s) — hand-off message 把长上下文压成任务交接卡片

口播节选：
> 中途换模型。不一定省钱。Haiku 没有 Opus 的缓存。它得重新建一遍。

---

## 6. stable-tools — 工具集保持稳定（4 steps · ~45s）

**信息池**：
- 工具定义属于缓存前缀，中途增删会让缓存重新来过 —— 来源 article §6 / L5-L9
- Plan Mode 不通过移除编辑工具实现，而是让工具集保持不变 —— 来源 article §6 / L10-L14
- EnterPlanMode / ExitPlanMode 被建模为工具，状态限制通过消息告诉模型 —— 来源 article §6 / L14-L16

**开发计划**：

- step 1 (~10s) — 工具定义被放进前缀区，标为“不要中途增删”
- step 2 (~12s) — 直觉方案：Plan Mode 移除编辑工具，画面显示缓存断裂
- step 3 (~13s) — Claude Code 方案：EnterPlanMode / ExitPlanMode 作为稳定工具
- step 4 (~10s) — 状态通过消息说明，工具集保持同一份

口播节选：
> 工具也是一样。不要在会话中途。增删工具。工具定义属于前缀。

---

## 7. defer-loading — 工具延迟加载（3 steps · ~30s）

**信息池**：
- 工具太多时，全量 schema 每轮都带上会贵，但移除工具会破坏缓存 —— 来源 article §7 / L5-L7
- `defer_loading` 用稳定轻量 stub 保住前缀，需要时再用 tool search 加载完整 schema —— 来源 article §7 / L8-L12
- 工具清单稳定后，成本不会被完整 schema 拖垮 —— 来源 article §7 / L11-L12

**开发计划**：

- step 1 (~10s) — 一排工具只显示轻量 stub，完整 schema 被收进侧边抽屉
- step 2 (~10s) — tool search 从抽屉里拉出某个工具的完整 schema
- step 3 (~10s) — 前缀区保持不动，新增内容只在后段出现

口播节选：
> 工具太多怎么办？也不是中途移除。而是 defer loading。

---

## 8. cache-safe-fork — compaction 也要复用前缀（4 steps · ~50s）

**信息池**：
- compaction 如果单独用不同 system prompt 和无工具调用，会从第一个 token 开始失去父会话缓存 —— 来源 article §8 / L5-L11
- cache-safe fork 沿用父会话 system prompt、上下文和工具定义，再在末尾追加总结请求 —— 来源 article §8 / L12-L17
- compaction 需要预留 buffer 给总结指令和输出 —— 来源 article §8 / L18-L20

**开发计划**：

- step 1 (~12s) — 错误 compaction：独立“请总结”请求与父会话前缀完全错开
- step 2 (~14s) — 正确 compaction：父会话前缀被原样复制成 fork
- step 3 (~12s) — 总结 prompt 放在末尾，只标红新增 token
- step 4 (~12s) — context window 末尾保留 compaction buffer 空位

口播节选：
> 还有一个坑。是 compaction。上下文快满了。你要总结前文。

---

## 9. checklist — 三件事先查起来（4 steps · ~30s）

**信息池**：
- 经验 1：prompt caching 是前缀匹配，系统要围绕它设计 —— 来源 article §9 / L5-L6
- 经验 2：动态更新走 messages，工具和模型不要中途换 —— 来源 article §9 / L7-L8
- 经验 3：侧向任务也应该共享父会话前缀 —— 来源 article §9 / L9-L11

**开发计划**：

- step 1 (~7s) — 终局蓝图合并成一张 agent caching 架构图
- step 2 (~8s) — 检查项一：静态 prompt 里有没有时间戳
- step 3 (~8s) — 检查项二：工具定义顺序是不是每轮一致
- step 4 (~7s) — 检查项三：compaction / summary 有没有沿用父会话前缀

口播节选：
> 如果你正在做 agent。可以先查三件事。你的静态 prompt 里。有没有时间戳？

---

## 素材清单

### 1. coldopen
- ⚠️ Claude Code / Anthropic 标识素材（如需使用，待用户确认授权和来源）
- ✓ 抽象工程蓝图线框（可由 CSS / SVG / Canvas 在项目内生成）
- ✓ cache hit rate 警报面板（可用本地 UI 伪数据生成）

### 2. prefix-rule
- ✓ 请求前缀时间线（可本地绘制）
- ✓ cache breakpoint 标记（可本地绘制）
- ✓ 四层 prompt 结构图（可本地绘制）

### 3. fragile-prefix
- ✓ timestamp / tool order / agent list 三类标签（可本地绘制）
- ✓ cache hit / miss 状态字样（可本地绘制）
- ✓ 蓝图网格背景（主题 token + CSS 生成）

### 4. message-state
- ✓ system prompt 锁定区（可本地绘制）
- ✓ message lane / tool result lane（可本地绘制）
- ✓ `<system-reminder>` 标签块（可本地绘制）

### 5. model-cache
- ✓ Opus / Haiku 缓存隔离示意（可本地绘制）
- ✓ hand-off message 卡片（可本地绘制）

### 6. stable-tools
- ✓ Plan Mode 工具状态图（可本地绘制）
- ✓ EnterPlanMode / ExitPlanMode 工具卡片（可本地绘制）
- ✓ 工具前缀稳定性对比图（可本地绘制）

### 7. defer-loading
- ✓ tool stub / full schema 抽屉（可本地绘制）

### 8. cache-safe-fork
- ✓ cache-safe fork 对比图（可本地绘制）
- ✓ context window + compaction buffer（可本地绘制）

### 9. checklist
- ✓ 三项检查清单（可本地绘制）
- ✓ 最终 agent caching 架构图（可本地绘制）
- ⚠️ 文章 URL 角标（建议在视频说明或片尾注明来源）
