# Slide Layouts

演示文稿布局模式。每个布局是一个 React 组件骨架。

## Ink 系列布局

### TitleSlide

大标题页，用于开场和章节分隔。

```jsx
<section className="slide slide-title">
  <div className="slide-bg" />
  <div className="slide-content">
    <h1 className="display">{title}</h1>
    <p className="subtitle">{subtitle}</p>
  </div>
</section>
```

- display: 72-96px serif，居中
- subtitle: 24px muted，标题下方
- 可选：背景氛围画布（WebGL 墨流效果）

### ContentBlock

正文内容页，标题 + 段落。

```jsx
<section className="slide slide-content-block">
  <div className="slide-content">
    <h2 className="title">{title}</h2>
    <div className="body">{children}</div>
  </div>
</section>
```

- title: 48-64px serif
- body: 24-28px serif，max-width 720px，居中
- 段落间距 1.5em

### PullQuote

引用页，大号斜体引文。

```jsx
<section className="slide slide-quote">
  <div className="slide-content">
    <blockquote className="pull-quote">{quote}</blockquote>
    <cite className="quote-source">— {source}</cite>
  </div>
</section>
```

- quote: 36-48px italic serif
- 左侧 accent 色竖线（4px）
- source: 18px muted

### ImageHero

全出血图片 + 文字叠加。

```jsx
<section className="slide slide-hero">
  <img className="hero-img" src={src} alt={alt} />
  <div className="hero-overlay">
    <h2 className="title">{title}</h2>
  </div>
</section>
```

- 图片填满视口，object-fit: cover
- 文字区域半透明暗色叠加
- 标题白色，48-64px

### SplitView

左右分栏，文字 + 图片。

```jsx
<section className="slide slide-split">
  <div className="split-text">
    <h2 className="title">{title}</h2>
    <div className="body">{children}</div>
  </div>
  <div className="split-image">
    <img src={src} alt={alt} />
  </div>
</section>
```

- 左 50% 文字，右 50% 图片
- 中间 accent 色细线分隔
- 垂直居中对齐

### LedgerList

编号列表，每行标题 + 说明。

```jsx
<section className="slide slide-list">
  <h2 className="title">{title}</h2>
  <ul className="ledger">
    {items.map((item, i) => (
      <li key={i}>
        <span className="ledger-num">{String(i+1).padStart(2,'0')}</span>
        <span className="ledger-title">{item.title}</span>
        <span className="ledger-desc">{item.desc}</span>
      </li>
    ))}
  </ul>
</section>
```

- 编号 accent 色，mono 字体
- 行间细线分隔
- hover 时行背景高亮

### ChapterDivider

章节分隔页，WebGL 背景 + 章节编号。

```jsx
<section className="slide slide-chapter">
  <div className="slide-bg" />
  <div className="slide-content">
    <span className="chapter-num">{chapterNum}</span>
    <h2 className="chapter-title">{title}</h2>
  </div>
</section>
```

- 章节编号超大（120px+），accent-soft 色
- 标题 48px，居中
- 可选 WebGL 墨流背景

### DataShowcase

数据展示页，大数字 + 说明。

```jsx
<section className="slide slide-data">
  <h2 className="title">{title}</h2>
  <div className="data-grid">
    {metrics.map((m, i) => (
      <div key={i} className="data-item">
        <span className="data-num">{m.value}</span>
        <span className="data-label">{m.label}</span>
      </div>
    ))}
  </div>
</section>
```

- 数字 72-96px，accent 色
- 标签 18px muted
- 2-3 列网格布局

### ClosingSlide

结尾页，要点回顾 + 结束语。

```jsx
<section className="slide slide-closing">
  <div className="slide-content">
    <h2 className="title">{title}</h2>
    <ul className="closing-points">
      {points.map((p, i) => <li key={i}>{p}</li>)}
    </ul>
    <p className="sign-off">{signOff}</p>
  </div>
</section>
```

---

## Swiss 系列布局

### TitleSlide (Swiss)

大号轻字重无衬线标题 + accent 色条。

```jsx
<section className="slide slide-title swiss">
  <div className="accent-bar" />
  <h1 className="hero-title">{title}</h1>
  <p className="subtitle">{subtitle}</p>
</section>
```

- hero: 120-160px，font-weight 200
- accent-bar: 左侧或顶部，4px accent 色
- subtitle: 24px grey-3

### CardGrid

卡片网格，信息矩阵。

```jsx
<section className="slide slide-cards swiss">
  <h2 className="title">{title}</h2>
  <div className="card-grid">
    {cards.map((card, i) => (
      <div key={i} className="card-fill">
        <h3>{card.title}</h3>
        <p>{card.desc}</p>
      </div>
    ))}
  </div>
</section>
```

- 2x2 或 3x2 网格
- 卡片背景 grey-1，细线边框
- 无阴影、无圆角

### StatementSlide

一句话声明，超大字号。

```jsx
<section className="slide slide-statement swiss">
  <h2 className="h-statement">{statement}</h2>
</section>
```

- 96-120px，font-weight 200
- 居中，max-width 80%
- 无其他装饰元素

### KPITower

关键指标展示，大数字 + 标签。

```jsx
<section className="slide slide-kpi swiss">
  <h2 className="title">{title}</h2>
  <div className="kpi-row">
    {kpis.map((kpi, i) => (
      <div key={i} className="kpi-item">
        <span className="kpi-value">{kpi.value}</span>
        <span className="kpi-label">{kpi.label}</span>
      </div>
    ))}
  </div>
</section>
```

- 数字 120px+，accent 色
- 标签 14px uppercase，grey-3
- 水平排列，细线分隔

### ComparisonSlide

对比页，A vs B。

```jsx
<section className="slide slide-compare swiss">
  <h2 className="title">{title}</h2>
  <div className="compare-grid">
    <div className="compare-col">
      <h3>{leftTitle}</h3>
      {leftItems.map((item, i) => <p key={i}>{item}</p>)}
    </div>
    <div className="compare-divider" />
    <div className="compare-col">
      <h3>{rightTitle}</h3>
      {rightItems.map((item, i) => <p key={i}>{item}</p>)}
    </div>
  </div>
</section>
```

### HBarChart

水平条形图，纯 CSS 实现。

```jsx
<section className="slide slide-chart swiss">
  <h2 className="title">{title}</h2>
  <div className="hbar-chart">
    {bars.map((bar, i) => (
      <div key={i} className="hbar-row">
        <span className="hbar-label">{bar.label}</span>
        <div className="hbar-track">
          <div className="hbar-fill" style={{width: bar.pct + '%'}} />
        </div>
        <span className="hbar-value">{bar.value}</span>
      </div>
    ))}
  </div>
</section>
```

- 条形用 accent 色，背景 grey-1
- 标签左对齐，数值右对齐
- 入场动画：宽度从 0 过渡到目标值

### ChapterDivider (Swiss)

章节分隔，accent 色块 + 编号。

```jsx
<section className="slide slide-chapter swiss">
  <div className="chapter-accent-block" />
  <span className="chapter-num">{chapterNum}</span>
  <h2 className="chapter-title">{title}</h2>
</section>
```

### ImageHero (Swiss)

干净的图片框 + 说明文字。

```jsx
<section className="slide slide-hero swiss">
  <div className="hero-frame">
    <img src={src} alt={alt} />
  </div>
  <p className="hero-caption">{caption}</p>
</section>
```

- 图片带 1px 细线边框
- caption: 14px mono，grey-3

### ClosingSlide (Swiss)

编号要点回顾。

```jsx
<section className="slide slide-closing swiss">
  <h2 className="title">{title}</h2>
  <ol className="closing-list">
    {points.map((p, i) => <li key={i}>{p}</li>)}
  </ol>
</section>
```

---

## 布局选择规则

- 不连续使用同一布局（至少间隔 1 张）
- 每章开头必须用 ChapterDivider
- 数据密集章节用 DataShowcase/KPITower
- 引用/金句用 PullQuote（Ink）或 StatementSlide（Swiss）
- 图文搭配用 ImageHero 或 SplitView
- 列表超过 4 项用 LedgerList（Ink）或 CardGrid（Swiss）
