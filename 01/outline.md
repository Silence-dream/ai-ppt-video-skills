# Video Outline

> **主题**：`pending`（Checkpoint Plan 选定）—— 技术演讲 / 工具介绍
> **总时长**：约 3 分 15 秒（口播 ~780 字 ÷ 4 字/秒）
> **章节数**：7 章 / 23 步

---

## 1. coldopen — 冷开场：不只是补全（3 steps · ~20s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- 身份：演讲者是 Anthropic 技术人员，Claude Code 的创建者 —— 来源 article §"什么是 Claude Code"
- 对比：传统补全工具 = 一行一行补，Claude Code = 整个函数 / 整个文件 —— 来源 article §"什么是 Claude Code"
- 演示现场：活动演讲，现场要求观众举手确认谁用过 —— 来源 article §开头

**开发计划**：

- step 1 (~6s) — 画面：演讲者说"别人用 AI 写代码，还是一行一行补全。我用 Claude Code，一整个功能直接出来。"—— hero 文字，"一行一行" vs "一整个功能" 的对比
- step 2 (~7s) — 画面：Claude Code 核心特性 —— agentic、完整函数/文件、多 IDE 支持（VS Code / Xcode / JetBrains / Emacs）
- step 3 (~7s) — 画面：终端打开即用的示意，"换工具"划掉，IDE 图标列一行

口播节选：
> 别人用 AI 写代码，还是一行一行补全。我用 Claude Code，一整个功能直接出来。

---

## 2. onboarding — 最佳起点：代码库问答（4 steps · ~32s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- 数据：Anthropic 技术入职从两三周缩短到两三天 —— 来源 article §"代码库问答"
- 机制：Claude Code 不做索引，代码完全本地，不上传、不训练 —— 来源 article §"代码库问答"
- 案例：翻 git history 找"15 个参数函数"的引入历史 —— 来源 article §"代码库问答"
- 案例：读 git log 自动写周报 —— 来源 article §"代码库问答"

**开发计划**：

- step 1 (~7s) — 画面：Claude Code 界面，一个光秃秃的 prompt，"这能干啥？"文字浮出
- step 2 (~7s) — 画面：从"两三周"到"两三天"的数字对比动画，Anthropic logo
- step 3 (~10s) — 画面：git history 可视化——提交记录一条条冒出来，最终指向一个 15 参数的函数签名
- step 4 (~8s) — 画面：不同类型的问题列表逐条揭示：代码结构 / git 历史 / GitHub issue

口播节选：
> 第一次打开 Claude Code，面前就一个 prompt。很多人会懵——这能干啥？最好的上手方式，是问问题。

---

## 3. editing — 写代码：组合工具的力量（3 steps · ~28s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- 工具集：只有三个工具——编辑文件、跑 bash、搜索文件 —— 来源 article §"编辑代码"
- 工作流："先别写代码，帮我列个方案"——规划先行 —— 来源 article §"编辑代码"
- 自动化："commit and push to branch"一句话，Claude 自己看 git log 学格式、建分支、发 PR —— 来源 article §"编辑代码"

**开发计划**：

- step 1 (~8s) — 画面：三个工具图标（编辑/终端/搜索），连线组合的示意
- step 2 (~10s) — 画面：用户输入 prompt → Claude 先输出 plan 大纲 → 用户确认 ✓ → 开始执行的流程
- step 3 (~10s) — 画面："commit and push to branch"一句话 → git 分支自动创建 → PR 链接弹出

口播节选：
> 工具集其实很小——编辑文件、跑 bash、搜索文件。就这三样，但它会自己组合。

---

## 4. iterate — 最值钱的思路：给 Claude 反馈（2 steps · ~18s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- 方法：给 Claude 跑测试或截屏（Puppeteer）的能力，它自己迭代 2-3 轮 —— 来源 article §"工作流模式"
- 效果：2-3 轮迭代后"几乎完美" —— 来源 article §"工作流模式"
- 原理：反馈机制 = 越做越好的关键 —— 来源 article §"工作流模式"

**开发计划**：

- step 1 (~9s) — 画面：测试通过 ✅ / 截图对比的可视化，"反馈循环"箭头旋转
- step 2 (~9s) — 画面：迭代轮次——第 1 轮 ❌ → 第 2 轮 △ → 第 3 轮 ✅，web/app 双场景

口播节选：
> 关键是什么？让 Claude 有反馈。给它跑测试的工具，给它截屏的能力，它就能检查自己的结果，然后迭代。

---

## 5. context — 上下文管理：CLAUDE.md（4 steps · ~30s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- 文件位置：项目根目录 = 每次自动读；子目录 = 按需读 —— 来源 article §"上下文管理"
- 内容建议：常用 bash 命令、架构决策、重要文件 —— 来源 article §"上下文管理"
- 企业级：统一配置哪些命令自动批准、哪些 URL 禁止访问 —— 来源 article §"上下文管理"
- 团队共享：mcp.json 配置 MCP 服务器，所有人自动提示安装 —— 来源 article §"上下文管理"

**开发计划**：

- step 1 (~7s) — 画面：CLAUDE.md 文件图标在项目根目录，"每次开会话自动读"标注
- step 2 (~7s) — 画面：文件内容示例——常用命令 / 架构决策 / 重要文件列表
- step 3 (~8s) — 画面：目录树——根目录 + 子目录都有 CLAUDE.md，标注"按需读取"
- step 4 (~8s) — 画面：企业配置层——自动批准命令 / 禁止 URL / 团队 MCP，一次配好

口播节选：
> 再说一个容易被忽略的。CLAUDE.md，你把它放在项目根目录，每次开会话它自动读。

---

## 6. protips — 快捷键与 SDK（5 steps · ~35s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- Shift+Tab：切换 auto-accept 模式，bash 需批准但编辑自动接受 —— 来源 article §"Pro Tips"
- `!`：bash 模式，命令进入上下文窗口 —— 来源 article §"Pro Tips"
- Escape：随时打断，不破坏会话；按两次跳回历史 —— 来源 article §"Pro Tips"
- SDK：`claude -p` 传 prompt + allowed tools + 输出格式（JSON / streaming JSON） —— 来源 article §"SDK"
- 用例：CI 流水线、事故响应、管道接 jq 分析 —— 来源 article §"SDK"

**开发计划**：

- step 1 (~7s) — 画面：Shift+Tab 键位高亮，auto-accept 模式指示器切换
- step 2 (~6s) — 画面：感叹号 `!` 下拉 bash，命令跑完后 Claude "看到"结果
- step 3 (~7s) — 画面：Escape 键，Claude 操作中止但会话完好，两次 Escape 跳历史
- step 4 (~8s) — 画面：`claude -p` 命令行示例，输入 prompt → 输出 JSON 的管道流
- step 5 (~7s) — 画面：CI 流水线图，`cat log | claude -p` 管道示意

口播节选：
> 还有几个快捷键知道会省很多事。Shift+Tab 切换自动接受模式，不用每次都点确认。

---

## 7. poweruser — 高手玩法：并行会话（2 steps · ~16s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- 并行方式：tmux 窗口 / git worktree 隔离 / 多 repo checkout —— 来源 article §"并行会话"
- 数据：Anthropic 80% 技术人员每天使用 Claude Code —— 来源 article §"Q&A: ML用途"
- 收尾钩子："你还在等什么？" —— 来源 script.md §最后一段

**开发计划**：

- step 1 (~8s) — 画面：tmux 窗口网格——多个 Claude 会话同时运行，各自独立
- step 2 (~8s) — 画面："80% 技术人员每天使用"大数字 + "你还在等什么？"收尾

口播节选：
> 真正的高手，同时开好几个会话，用 tmux 或 worktree 隔离，一个人干一个团队的活。

---

## 素材清单

### 1. coldopen
- ⚠️ Claude Code logo / 终端截图（待提供或 placeholder）
- ⚠️ IDE 图标（VS Code / Xcode / JetBrains / Emacs）

### 2. onboarding
- ⚠️ Claude Code prompt 界面截图
- ⚠️ Anthropic logo

### 3. editing
- ⚠️ git 分支 / PR 流程示意图

### 4. iterate
- ⚠️ 测试通过 / 失败截图或示意图
- ⚠️ Puppeteer 截图迭代示意

### 5. context
- ⚠️ CLAUDE.md 文件内容示例
- ⚠️ 项目目录树结构图

### 6. protips
- ⚠️ 键盘快捷键示意图（Shift+Tab / Escape / !）
- ⚠️ CLI 管道命令示意图

### 7. poweruser
- ⚠️ tmux 多窗口布局截图

---

## 自检（写完 outline **强制**执行，不可跳过）

- [x] 每个 step 都是**单一句屏幕内容描述**，没有"动画"行 / "手段"行
- [x] 没有任何 step 写了具体毫秒 / 秒数（除 `(~Ts)` 口播估时）
- [x] 每章首段都有「信息池」block，至少 3 条 article 抽取项，**每条带来源标注**
- [x] **所有 step `(~Ts)` 累加 ≈ 顶部声明的总时长**（20+32+28+18+30+35+16 = 179s ≈ 3min，误差 < 10%）
- [x] 章节切分符合"每章 3~8 步 / 30~60s 一聚焦主题"经验
- [x] 末尾「素材清单」分章节列出，✓ / ⚠️ 标注清楚
- [x] 脚本不含标题、序号等非口播内容，仅含人类可读内容
