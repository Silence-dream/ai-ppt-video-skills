---
name: ppt-stream
description: >
  Create web-based React presentations with animations from text content.
  Generates 口播稿 (spoken teleprompter scripts) as MD files, then builds
  an interactive slide deck with CSS/JS animations, image integration,
  progress bar, and a teleprompter reading mode for video recording.
  Use when the user asks for PPT, 演示文稿, 幻灯片, presentation slides,
  web slides, 口播稿, 提词板, teleprompter script, video script, slide deck,
  演讲稿, or wants to turn text/articles into a visual presentation.
  Also trigger when the user mentions 做个PPT, 帮我做个演示, 做slides,
  生成演讲稿, or any request to create a presentable visual from text.
---

# PPT-Stream

将文字内容转化为网页版 PPT 演示文稿，附带口播稿和提词板模式。

## 输出物

1. **口播稿** — 按章节拆分的 MD 文件，可直接用于视频录制
2. **React 网页演示** — 含动画、配图、键盘导航的交互式幻灯片
3. **提词板模式** — 独立路由，大字号高对比度，方便录制时阅读

## 必读参考文件

根据任务阶段读取对应文件：

| 阶段 | 读取文件 | 用途 |
|------|---------|------|
| 选主题 | `references/theme-presets.md` | 10 套主题配色 CSS 变量 |
| 规划幻灯片 | `references/slide-layouts.md` | 布局模式和 HTML 骨架 |
| 写口播稿 | `references/oral-script-guide.md` | 口播稿改写规则和格式 |
| 做动画 | `references/animation-guide.md` | CSS/JS 动画规范 |
| 找配图 | `references/image-sourcing.md` | Pexels/Unsplash/Wallhaven 获取方法 |
| 做提词板 | `references/teleprompter-spec.md` | 提词板路由和交互规范 |

## 工作流

### Step 1: 接收内容

收集用户提供的源文字（文章、笔记、大纲、要点均可）。缺少信息时主动询问：

- 内容来源是什么？（文章 / 笔记 / 大纲 / 只有主题）
- 输出到哪个文件夹？（默认：当前工作目录下 `ppt-<主题名>/`）
- 有偏好的风格吗？根据内容主题推荐：
  - 商业/AI/研究 → 靛蓝瓷 或 克莱因蓝
  - 自然/户外 → 森林墨
  - 怀旧/人文 → 牛皮纸
  - 艺术/设计 → 沙丘
  - 游戏/夜景 → 午夜墨
  - 通用默认 → 墨水经典（Ink 系列）或 克莱因蓝（Swiss 系列）
- 需要配图吗？（从 Pexels/Unsplash/Wallhaven 获取，或用户自备）

### Step 2: 生成口播稿

读取 `references/oral-script-guide.md`，将源文字改写为口播稿。

**先询问用户生成方式：**

- **一次性生成**：全部章节一口气生成完毕，适合内容较短或用户赶时间
- **按章节生成**：每生成一章暂停，等用户确认/修改后再继续下一章，适合需要精细调整的场景

按章节生成的流程：
1. 先生成 `00-开场.md`，展示给用户
2. 用户确认或提出修改意见
3. 根据反馈修改后，继续生成 `01-<章节名>.md`
4. 重复直到所有章节完成
5. 最后生成 `99-结尾.md`

口播稿规则：
- 口语化短句，像对朋友说话
- 按章节拆分，每章 2-5 个要点
- 包含节奏标注（`[停顿]`、`[展示图表]`）和时长预估
- 保存到 `口播稿/` 文件夹：
  - `口播稿/00-开场.md`
  - `口播稿/01-<章节名>.md`
  - `口播稿/99-结尾.md`

### Step 3: 规划幻灯片

读取 `references/slide-layouts.md`，创建幻灯片计划：

- 每章对应 2-5 张幻灯片
- 布局多样化，不连续使用同一布局
- 总数 15-30 张为宜
- 展示计划给用户确认

### Step 4: 选择主题

读取 `references/theme-presets.md`，根据用户选择设置主题：

- Ink 系列和 Swiss 系列不能混用
- 通过 `data-theme`（Ink）或 `data-accent`（Swiss）属性切换
- 主题切换是纯 CSS 操作，即时生效

### Step 5: 获取配图

读取 `references/image-sourcing.md`，按需获取图片：

- Pexels：支持中文搜索，通用场景
- Unsplash：摄影质感最强，人物/生活/空间首选
- Wallhaven：游戏、摄影、壁纸
- 图片至少 1920px 宽（全屏幻灯片用）
- 保存到 `public/images/`，记录来源到 `SOURCES.md`
- 展示来源给用户确认

### Step 6: 构建 React 演示

读取 `references/slide-layouts.md` 和 `references/animation-guide.md`：

- 使用 pnpm + Vite + React 项目结构
- 每张幻灯片是一个 React 组件
- 实现底部章节导航（hover 时显示，点击跳转对应章节）
- 实现左上角章节小标题
- 键盘导航：左右箭头、空格前进
- 复制对应系列的模板：Ink 系列用 `assets/template-editorial/`，Swiss 系列用 `assets/template-swiss/`

### Step 7: 实现提词板

读取 `references/teleprompter-spec.md`：

- 添加 `/teleprompter` 路由（HashRouter）
- 大字号（28-36px）、高对比度、极简 UI
- 章节锚点导航
- 可选自动滚动（速度可调）
- 从演示模式可切换到提词板

### Step 8: 交付

- 启动 `pnpm dev` 或提供启动指令
- 展示演示 URL
- 汇总：主题、幻灯片数、口播稿文件、配图来源
- 询问是否需要调整

## 非谈判规则

- 同一演示文稿不混用 Ink 系列和 Swiss 系列
- 幻灯片中不使用 emoji
- 不编造数据或统计数字
- 所有文字在演示分辨率下必须清晰可读
- 进度条不遮挡内容
- 提词板必须是干净无干扰的阅读体验
- 口播稿必须读起来像自然的口语，不是书面语
