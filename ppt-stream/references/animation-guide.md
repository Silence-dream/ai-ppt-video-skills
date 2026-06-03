# Animation Guide

CSS 和 JS 动画规范。只用 `transform` 和 `opacity`（GPU 加速），不用 `width`/`height`/`margin`。

## 幻灯片切换

前进和后退用不同方向：

```css
@keyframes slideInFromRight {
  from { transform: translateX(60px); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}
@keyframes slideInFromLeft {
  from { transform: translateX(-60px); opacity: 0; }
  to   { transform: translateX(0);     opacity: 1; }
}
@keyframes slideOutToLeft {
  from { transform: translateX(0);     opacity: 1; }
  to   { transform: translateX(-60px); opacity: 0; }
}
@keyframes slideOutToRight {
  from { transform: translateX(0);    opacity: 1; }
  to   { transform: translateX(60px); opacity: 0; }
}
```

应用：

```css
.slide-enter { animation: slideInFromRight var(--transition-slide) forwards; }
.slide-exit  { animation: slideOutToLeft var(--transition-slide) forwards; }
.slide-enter-back { animation: slideInFromLeft var(--transition-slide) forwards; }
.slide-exit-back  { animation: slideOutToRight var(--transition-slide) forwards; }
```

## 内容揭示

列表项逐个淡入上升（stagger）：

```css
@keyframes fadeInUp {
  from { transform: translateY(24px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

.slide-content li,
.slide-content .data-item,
.slide-content .card-fill {
  opacity: 0;
  animation: fadeInUp var(--transition-content) forwards;
}

/* 每项延迟 100ms */
.slide-content li:nth-child(1) { animation-delay: 0.1s; }
.slide-content li:nth-child(2) { animation-delay: 0.2s; }
.slide-content li:nth-child(3) { animation-delay: 0.3s; }
.slide-content li:nth-child(4) { animation-delay: 0.4s; }
.slide-content li:nth-child(5) { animation-delay: 0.5s; }
.slide-content li:nth-child(6) { animation-delay: 0.6s; }
```

## 打字机效果

用于重点词句：

```css
@keyframes typewriter {
  from { width: 0; }
  to   { width: 100%; }
}
@keyframes blink {
  50% { border-color: transparent; }
}

.typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid var(--accent);
  animation:
    typewriter 2s steps(20) forwards,
    blink 0.8s step-end infinite;
}
```

## 进度条

底部固定，hover 时显示：

```css
.progress-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  height: var(--progress-height);
  background: var(--progress-color);
  width: 0;
  transition: width 0.3s ease;
  opacity: 0;
  z-index: 100;
  pointer-events: none;
}

.presentation:hover .progress-bar {
  opacity: 1;
}

/* 宽度通过 JS 设置：(currentSlide / totalSlides) * 100 + '%' */
```

## 底部幻灯片导航

hover 底部时从下方滑出，按章节分组显示每一页幻灯片的圆点，点击可跳转到任意页：

```css
.slide-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background: var(--paper);
  border-top: 1px solid var(--line);
  padding: 10px 20px;
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 200;
  pointer-events: none;
}

.presentation:hover .slide-nav {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
```

## 章节小标题

左上角固定，章节切换时淡入淡出：

```css
.chapter-subtitle {
  position: fixed;
  top: 24px;
  left: 24px;
  font-family: var(--mono);
  font-size: 14px;
  letter-spacing: 0.1em;
  color: var(--muted);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 100;
  pointer-events: none;
}

.chapter-subtitle.visible {
  opacity: 1;
}

/* Ink 系列额外：首字母大写，其余 uppercase */
[data-theme] .chapter-subtitle {
  text-transform: uppercase;
}
```

## 条形图入场

水平条从左到右展开：

```css
@keyframes barGrow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.hbar-fill {
  transform-origin: left;
  animation: barGrow 0.8s ease forwards;
  animation-delay: 0.3s;
}

.hbar-row:nth-child(2) .hbar-fill { animation-delay: 0.5s; }
.hbar-row:nth-child(3) .hbar-fill { animation-delay: 0.7s; }
```

## 数字跳动

大数字从 0 跳到目标值（JS 实现）：

```js
function animateNumber(el, target, duration = 1000) {
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
```

## 减弱动画

尊重用户系统偏好：

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 动画时间参考

| 元素 | 时长 | 缓动 |
|------|------|------|
| 幻灯片切换 | 600ms | ease |
| 内容揭示 | 400ms | ease |
| 进度条 | 300ms | ease |
| 章节标题 | 400ms | ease |
| 条形图 | 800ms | ease |
| 数字跳动 | 1000ms | easeOutCubic |
| stagger 间隔 | 100ms | — |
