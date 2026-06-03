# Theme Presets

一套演示文稿只用一个主题系列（Ink 或 Swiss），不混用。

## Ink 系列（墨水系列）

编辑风格，衬线字体为主，纸张质感，适合深度内容。

### 墨水经典 Ink Classic

通用默认。商业话题、产品思考、不知道选啥时最安全的选择。

```css
[data-theme="ink-classic"] {
  --paper: #f1efea;
  --paper-2: #e8e4dc;
  --ink: #0a0a0b;
  --muted: #68625a;
  --line: rgba(10,10,11,.22);
  --accent: #111111;
  --accent-soft: #d8d2c6;
}
```

### 靛蓝瓷 Indigo Porcelain

科技、研究、AI、技术分享、数据分析。

```css
[data-theme="indigo-porcelain"] {
  --paper: #f1f3f5;
  --paper-2: #e5ebef;
  --ink: #0a1f3d;
  --muted: #5f6d78;
  --line: rgba(10,31,61,.20);
  --accent: #315d93;
  --accent-soft: #d7e1ec;
}
```

### 森林墨 Forest Ink

自然、可持续、户外、非虚构、田野笔记。

```css
[data-theme="forest-ink"] {
  --paper: #f5f1e8;
  --paper-2: #e8dfcf;
  --ink: #1a2e1f;
  --muted: #5d665d;
  --line: rgba(22,37,27,.22);
  --accent: #2e6b4f;
  --accent-soft: #d4dfd2;
}
```

### 牛皮纸 Kraft Paper

怀旧、人文、阅读、文学、手工艺。

```css
[data-theme="kraft-paper"] {
  --paper: #eedfc7;
  --paper-2: #dfc9a8;
  --ink: #2a1e13;
  --muted: #755f49;
  --line: rgba(42,30,19,.24);
  --accent: #9b5a2e;
  --accent-soft: #d5b58f;
}
```

### 沙丘 Dune

艺术、设计、创意、时尚、美学研究。

```css
[data-theme="dune"] {
  --paper: #f0e6d2;
  --paper-2: #ded0b7;
  --ink: #1f1a14;
  --muted: #6f6557;
  --line: rgba(31,26,20,.22);
  --accent: #8f7650;
  --accent-soft: #d4c2a4;
}
```

### 午夜墨 Midnight Ink

唯一的深色墨水主题。游戏 key art、夜景、影调封面、黑神话/艾尔登法环类深色题材。

```css
[data-theme="midnight-ink"] {
  --paper: #0e0d0c;
  --paper-2: #1a1714;
  --ink: #ece2cf;
  --muted: #9a8c75;
  --line: rgba(236,226,207,.22);
  --accent: #d4a04a;
  --accent-soft: #3a2a14;
}
```

午夜墨额外覆盖：

```css
[data-theme="midnight-ink"] .grain {
  opacity: .26;
  mix-blend-mode: screen;
  background-image: radial-gradient(rgba(255,244,214,.10) 1px, transparent 1px);
}
[data-theme="midnight-ink"] .slide-bg {
  background:
    radial-gradient(80% 50% at 28% 16%, rgba(212,160,74,.12), transparent 64%),
    radial-gradient(70% 60% at 80% 86%, rgba(60,40,20,.20), transparent 72%),
    linear-gradient(180deg, rgba(236,226,207,.02), rgba(0,0,0,.32));
}
```

### Ink 系列规则

- `--paper` 做主背景，`--ink` 做主文字色
- `--accent` 节制使用：章节标记、页码、重点高亮
- `--paper-2` 用于图片区域、信息条带
- 浅色主题（前 5 个）保持真实对比度，不做米色叠米色
- 午夜墨不堆叠不透明卡片，靠图片出血 + 金色点缀建立层次

## Swiss 系列（瑞士系列）

国际主义风格，无衬线字体，纯色块 + 细线，适合现代商业。

### 克莱因蓝 IKB

通用默认。商业发布、AI 产品、方法论、设计工程。

```css
[data-accent="ikb"] {
  --paper: #fafaf8;
  --ink: #0a0a0a;
  --grey-1: #f0f0ee;
  --grey-2: #d4d4d2;
  --grey-3: #737373;
  --accent: #002FA7;
  --accent-on: #ffffff;
}
```

### 柠檬黄 Lemon

年轻、运动、零售、消费品、Y2K。

```css
[data-accent="lemon"] {
  --paper: #fafaf8;
  --ink: #0a0a0a;
  --grey-1: #f0f0ee;
  --grey-2: #d4d4d2;
  --grey-3: #737373;
  --accent: #FFD500;
  --accent-on: #0a0a0a;
}
```

### 柠檬绿 Lemon Green

生态、健康、Z 世代、绿色品牌。

```css
[data-accent="lemon-green"] {
  --paper: #fafaf8;
  --ink: #0a0a0a;
  --grey-1: #f0f0ee;
  --grey-2: #d4d4d2;
  --grey-3: #737373;
  --accent: #C5E803;
  --accent-on: #0a0a0a;
}
```

### 安全橙 Safety Orange

警示、新闻、工业、活力主题。

```css
[data-accent="safety-orange"] {
  --paper: #fafaf8;
  --ink: #0a0a0a;
  --grey-1: #f0f0ee;
  --grey-2: #d4d4d2;
  --grey-3: #737373;
  --accent: #FF6B35;
  --accent-on: #ffffff;
}
```

### Swiss 系列规则

- 只用一个 `--accent`，不用渐变、阴影、玻璃效果
- 黄色/绿色 accent 上的文字必须用 `--accent-on: #0a0a0a`
- 纯色块 + 细线 + 网格节奏

## 演示专用扩展变量

两个系列都需要在主题选择器内额外声明：

```css
/* 在各自的 [data-theme] 或 [data-accent] 选择器内 */
--slide-bg: var(--paper);
--slide-fg: var(--ink);
--transition-slide: 600ms ease;
--transition-content: 400ms ease;
--progress-height: 3px;
--progress-color: var(--accent);
```

## 字体栈

```css
/* Ink 系列 */
[data-theme] {
  --serif-zh: "Noto Serif SC", "Songti SC", serif;
  --serif-en: "Playfair Display", Georgia, serif;
  --sans-zh: "Noto Sans SC", "PingFang SC", sans-serif;
  --mono: "IBM Plex Mono", "Menlo", monospace;
}

/* Swiss 系列 */
[data-accent] {
  --sans: "Inter", "Helvetica Neue", "PingFang SC", sans-serif;
  --sans-zh: "Noto Sans SC", "PingFang SC", sans-serif;
  --mono: "IBM Plex Mono", "Menlo", monospace;
}
```

## 演示字号

比社交卡片大，因为是屏幕观看：

```
Ink 系列: display 72-96px / title 48-64px / body 24-28px / caption 18-20px
Swiss 系列: hero 120-160px / statement 96-120px / title 48-64px / body 24-28px
```
