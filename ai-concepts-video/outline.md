# Video Outline

> **主题**：`tech-clarity`（Checkpoint Plan 待选定）—— 科技概念科普，清晰、专业、留白
> **总时长**：约 5 分 55 秒（口播 ~1420 字 ÷ 4 字/秒）
> **章节数**：8 章 / 42 步

---

## 1. coldopen — 冷开场（5 steps · ~32s）

**信息池**（chapter agent 按需挂角标 / 副标 / pull-quote / mono cue）：
- 现状：很多人只停留在“会问 ChatGPT”的阶段 —— 来源 article 第 2 段
- 差距来源：不是模型，而是理解 AI 背后的工作方式 —— 来源 article 第 3 段
- 核心路径：LLM → Prompt → Workflow → Tool Use → Agent → AI Coding —— 来源 article 第 5 段

**开发计划**：
- step 1 (~6s) — 全屏大标题：“LLM、Prompt、Workflow、Agent 到底是什么？”
- step 2 (~6s) — 屏幕中央显示问题陈述：“很多人只停留在会问 ChatGPT 的阶段”
- step 3 (~7s) — 差距来源点破：“真正拉开差距的，不是模型，而是理解工作方式”
- step 4 (~7s) — 6 概念路径图：LLM → Prompt → Workflow → Tool Use → Agent → AI Coding
- step 5 (~6s) — 钩子收尾：“这 6 个概念，决定了你能把 AI 用到什么程度”

口播节选：
> 你以为会用 ChatGPT 就懂 AI 了？
>
> 真正拉开差距的，不是你用哪个模型，而是你是否理解 AI 背后的工作方式。

---

## 2. llm — LLM：AI 的底层大脑（6 steps · ~45s）

**信息池**：
- LLM 全称：Large Language Model，大语言模型 —— 来源 article L7
- 训练数据：大量文本、代码和知识数据 —— 来源 article L8
- 核心能力：理解、生成、总结、翻译、推理、写代码 —— 来源 article L9
- 代表产品：ChatGPT、Claude、Gemini、DeepSeek、Qwen、Llama —— 来源 article L11-16
- 局限：需要清晰指令，否则输出模糊、跑偏、不稳定 —— 来源 article L21

**开发计划**：
- step 1 (~6s) — LLM 标题 + 大脑视觉
- step 2 (~7s) — 训练数据来源展示
- step 3 (~8s) — 核心能力列表：理解、生成、总结、翻译、推理、写代码
- step 4 (~8s) — 代表产品图标/名字列举：ChatGPT、Claude、Gemini、DeepSeek、Qwen、Llama
- step 5 (~8s) — 核心能力强调
- step 6 (~8s) — 局限性点出（为 Prompt 过渡）

口播节选：
> LLM 全称 Large Language Model，中文叫大语言模型。
>
> 你可以把它理解成 AI 的大脑。

---

## 3. prompt — Prompt：你给 AI 的指令（7 steps · ~55s）

**信息池**：
- Prompt 包含：问题、指令、背景信息、目标、约束条件、输出格式 —— 来源 article L25-30
- 普通 Prompt 示例：“帮我写一篇关于 AI 的文章” —— 来源 article L35
- 优化 Prompt 示例：角色 + 风格 + 要求 + 输出场景 —— 来源 article L38-44
- 核心区别：表达清楚真实需求，而不是写得复杂 —— 来源 article L52

**开发计划**：
- step 1 (~6s) — Prompt 标题 + 指令视觉
- step 2 (~7s) — 普通 Prompt 示例（模糊）
- step 3 (~8s) — 优化 Prompt 示例完整展示
- step 4 (~8s) — 角色/用户/任务/风格/场景 5 要素列表
- step 5 (~9s) — 普通 vs 优化 Prompt 对比卡片
- step 6 (~9s) — 核心理解：大脑 + 指令
- step 7 (~8s) — 过渡到 Workflow

口播节选：
> Prompt 就是你告诉 AI：“我要你做什么，以及怎么做。”

---

## 4. workflow — Workflow：让 AI 按流程做事（6 steps · ~50s）

**信息池**：
- Workflow 作用：把复杂任务拆成多个步骤，按顺序完成 —— 来源 article L57
- 反例：直接说“帮我写一篇文章” —— 来源 article L58
- 正例 6 步：分析读者 → 确定主题 → 生成大纲 → 逐段正文 → 优化标题 → 生成配图提示词 —— 来源 article L62-67
- 适用场景：内容创作、学习计划、产品设计、代码开发、数据分析、商业策划、自动化办公 —— 来源 article L72-78

**开发计划**：
- step 1 (~6s) — Workflow 标题 + 流程图视觉
- step 2 (~7s) — 反例：直接命令的混乱
- step 3 (~9s) — 正例 6 步流程列表展示
- step 4 (~9s) — 每步对应画面示意
- step 5 (~9s) — 适用场景标签云
- step 6 (~10s) — 本质：SOP 执行而非随便发挥

口播节选：
> Workflow 的本质是：把“让 AI 随便发挥”，变成“让 AI 按 SOP 执行”。

---

## 5. tooluse — Tool Use：让 AI 拥有外部能力（6 steps · ~45s）

**信息池**：
- Tool Use 定义：AI 调用外部工具完成任务 —— 来源 article L81
- LLM 局限：不能查询网页、读文件、执行代码、操作数据库、调用 API、发送邮件、创建日历、生成图片、操作浏览器 —— 来源 article L84-94
- 示例 1：新加坡天气 → 调用天气工具 —— 来源 article L96-97
- 示例 2：分析 Excel → 读取文件、分析数据、生成结论 —— 来源 article L99-100
- 比喻：大脑配上眼睛和手 —— 来源 article L104

**开发计划**：
- step 1 (~6s) — Tool Use 标题 + 工具图标
- step 2 (~7s) — LLM 局限列表（9 项）
- step 3 (~8s) — 天气查询示例演示
- step 4 (~8s) — Excel 分析示例演示
- step 5 (~8s) — 工具调用前后对比
- step 6 (~8s) — 比喻：眼睛和手

口播节选：
> Tool Use 的本质是：让 AI 从“只会说”，变成“可以做”。

---

## 6. agent — Agent：可以自主执行任务的 AI（7 steps · ~55s）

**信息池**：
- Agent 定义：围绕目标自主行动的 AI 系统 —— 来源 article L106
- 普通对话：你问一句，它答一句 —— 来源 article L108-109
- Agent 行为：拆解任务、调用工具、执行步骤、检查结果、继续推进 —— 来源 article L111
- Web3 博客示例 9 步流程 —— 来源 article L114-123
- 关键能力：自主规划、任务拆解、工具调用、结果检查、多轮执行、根据反馈优化 —— 来源 article L127-133
- 比喻：AI 员工而非大脑 —— 来源 article L126

**开发计划**：
- step 1 (~6s) — Agent 标题 + 自主行动视觉
- step 2 (~7s) — 普通对话 vs Agent 对比
- step 3 (~8s) — Web3 博客 9 步流程列表展示
- step 4 (~8s) — 每步画面示意
- step 5 (~9s) — 关键能力 6 项列表
- step 6 (~9s) — AI 员工比喻强化
- step 7 (~8s) — 桥梁定位总结

口播节选：
> Agent 更像一个会自己干活的 AI 员工。

---

## 7. aicoding — AI Coding：AI 参与编程开发（6 steps · ~50s）

**信息池**：
- AI Coding 定义：AI 辅助或自动化完成编程工作 —— 来源 article L137
- 包含内容：解释代码、生成代码、修复 Bug、重构项目、生成测试、编写文档、分析报错、设计数据库、创建前端页面、调用 API、部署项目 —— 来源 article L139-150
- 基础示例：React + Tailwind 写钱包连接页面 —— 来源 article L152
- 进阶示例：阅读项目、修复登录问题、不影响原有功能 —— 来源 article L155
- 工具列表：Cursor、Claude Code、GitHub Copilot、Windsurf、ChatGPT、Devin 类 Agent —— 来源 article L158-163
- 核心价值：提高效率而非替代程序员 —— 来源 article L165

**开发计划**：
- step 1 (~6s) — AI Coding 标题 + 代码视觉
- step 2 (~7s) — 11 项能力列表
- step 3 (~8s) — 基础示例代码片段
- step 4 (~9s) — 进阶示例项目上下文
- step 5 (~10s) — 工具矩阵展示
- step 6 (~10s) — 效率提升 5 点总结

口播节选：
> AI Coding 的核心价值，不是替代程序员，而是提高开发效率。

---

## 8. summary — 总结：能力路径（4 steps · ~30s）

**信息池**：
- 6 概念关系：LLM → Prompt → Workflow → Tool Use → Agent → AI Coding —— 来源 article 第 6 段总结
- 能力升级路径：会提问 → 会写 Prompt → 会设计 Workflow → 会使用工具 → 会搭建 Agent → 会用 AI Coding 做项目 —— 来源 article 最后一段
- 核心价值：不是替代程序员，而是提高开发效率 —— 来源 article L165

**开发计划**：
- step 1 (~7s) — 6 概念关系图最终呈现
- step 2 (~8s) — 能力升级路径图
- step 3 (~8s) — 结语：这才是真正值得掌握的路径
- step 4 (~7s) — 结束画面 + CTA

口播节选：
> 这才是 AI 时代真正值得掌握的能力路径。

---

## 素材清单

### 1. coldopen
- ⚠️ 大标题视觉元素（待设计）
- ⚠️ 6 概念路径图资源（待提供）

### 2. llm
- ⚠️ 大脑 / 神经网络抽象视觉（待设计）
- ⚠️ 6 个 LLM 产品 Logo / 图标（待提供）

### 3. prompt
- ⚠️ 普通 vs 优化 Prompt 对比卡片（待设计）
- ⚠️ 5 要素拆解图（待提供）

### 4. workflow
- ⚠️ 流程图（6 步）（待设计）
- ⚠️ 7 个适用场景标签（待提供）

### 5. tooluse
- ⚠️ 9 种工具图标（待提供）
- ⚠️ 天气 / Excel 示例演示画面资源（待提供）

### 6. agent
- ⚠️ AI 员工 / 自主行动视觉（待设计）
- ⚠️ Web3 博客 9 步流程图（待提供）

### 7. aicoding
- ⚠️ 代码编辑器 / IDE 视觉（待设计）
- ⚠️ 工具矩阵（6 工具）（待提供）

### 8. summary
- ⚠️ 能力路径图（待设计）
- ⚠️ 结束 CTA 画面（待提供）
