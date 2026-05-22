# Claude Code 实用技巧 - 演讲整理

> 来源：Anthropic 技术人员在活动上的演讲，主题是 Claude Code 的实用技巧和使用方式。

## 什么是 Claude Code

Claude Code 是一种新型 AI 编程助手，与其他代码补全工具不同，它是完全 agentic 的，用于构建功能、编写完整函数和文件、修复整个 bug。它可以与所有工具和 IDE 配合工作——VS Code、Xcode、JetBrains，任何终端都可以。本地运行、远程 SSH、各种环境都支持。

## 初始环境设置

- 一键终端设置：获得 Shift+Enter 换行能力，无需反斜杠
- `/theme` 设置主题（深色/浅色/自适应）
- `/config` 打开配置 GUI
- GitHub 集成：在 issue 或 PR 中 @mention Claude
- 自定义允许的工具权限，减少重复确认
- macOS 听写功能：系统设置 → 辅助功能 → 听写，双击听写键直接语音输入 prompt

## 技巧一：代码库问答（最推荐的入门方式）

Anthropic 用这个培训新员工。技术入职从两三周缩短到两三天。Claude Code 不做索引，代码完全本地，不上传、不用来训练模型，无需等待，即开即用。

可以问的问题类型：
- 代码结构和实例化方式
- Git 历史：为什么这个函数有 15 个参数？谁引入的？当时什么情况？
- GitHub issue 上下文
- 个人工作周报：读 git log 自动总结本周交付

## 技巧二：编辑代码

Claude Code 的工具集很小：编辑文件、运行 bash、搜索文件。它会自动编排这些工具来探索、构思和编辑代码。

推荐工作流：先让它思考或制定计划，确认后再写代码。常见命令如 "commit and push to branch"，Claude 会自己看 git log 学习 commit 格式，创建分支，推送，发 PR。

## 技巧三：工作流模式

三种模式：
1. 探索 → 规划 → 确认后写代码（入门推荐）
2. 让 Claude 迭代：给它测试工具或截图工具（如 Puppeteer），让它检查自己的工作并迭代改进，通常 2-3 轮就能接近完美
3. 并行运行

关键：给 Claude 一种反馈机制，它就能自我迭代，结果会好很多。

## 技巧四：上下文管理（CLAUDE.md）

CLAUDE.md 是特殊文件名，放在项目根目录，每次会话自动读取。

内容建议：常用 bash 命令、MCP 工具、架构决策、重要文件。保持简短，太长会消耗上下文。

层级体系：
- 嵌套目录中的 CLAUDE.md：在对应目录工作时按需读取
- 全局配置：跨所有项目
- 企业策略：为所有员工统一配置，包括自动批准命令和禁止 fetch 的 URL

团队共享 MCP：在 mcp.json 中配置，任何人运行 Claude Code 时都会提示安装。

`/memory` 命令查看所有被读取的 memory 文件，`##` 让 Claude 记住特定内容到指定 memory 文件。

## 技巧五：Pro Tips

- Shift+Tab：切换 auto-accept 模式（bash 命令需批准，但编辑自动接受）
- `##`：让 Claude 记住某些东西，自动写入 CLAUDE.md
- `!`：下拉到 bash 模式，命令进入上下文窗口，Claude 下一轮能看到
- Escape：随时停止 Claude 的操作，不会破坏会话
- Escape 两次：跳回历史
- `--resume` / `--continue`：恢复上次会话
- Ctrl+C：查看完整输出

## Claude Code SDK

`claude -p` 就是 SDK。可以传 prompt、allowed tools、输出格式（JSON / streaming JSON）。

用途：CI 流水线、事故响应、各种自动化。可以管道输入输出，如 `cat data | claude -p` 配合 jq 分析。

## 高级：并行会话

Power user 通常同时运行多个 Claude 会话，使用 tmux、多终端标签、多个 repo checkout 或 git worktree 实现隔离和并行。

## Q&A

**最难实现的部分**：bash 命令安全性。bash 本质上危险，但每次都手动批准又太烦。解决方案：静态分析区分只读命令，加上多层级权限系统（allow/block）。

**多模态**：Claude Code 全程支持多模态，可以拖拽图片、传文件路径、粘贴截图。

**为什么做 CLI 而不是 IDE**：Anthropic 内部用的 IDE 种类太多（VS Code、Xcode、JetBrains、Emacs），终端是最大公约数。另外模型进化太快，过度投资 UI 层可能很快没用。

**ML 建模用途**：Anthropic 80% 技术人员每天使用 Claude Code，包括研究人员用 notebook 工具编辑和运行 notebook。
