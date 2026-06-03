# Teleprompter Mode (提词板)

独立路由的大字号阅读视图，方便录制视频时对着读稿。

## 路由

使用 React Router HashRouter：

```
/#/              → 幻灯片演示模式
/#/teleprompter  → 提词板模式
```

从演示模式切换到提词板：右下角小按钮或键盘快捷键 `T`。

## 布局

```
┌─────────────────────────────────────────────┐
│  [章节导航锚点]                              │
│                                             │
│     ┌───────────────────────────────┐       │
│     │                               │       │
│     │   大字号口播稿正文              │       │
│     │   28-36px                      │       │
│     │   1.8 行高                     │       │
│     │                               │       │
│     │   当前段落高亮                  │       │
│     │                               │       │
│     └───────────────────────────────┘       │
│                                             │
│  [自动滚动控制: ▶⏸ 速度 +/-]                │
└─────────────────────────────────────────────┘
```

- 单列居中，max-width 720px
- 无装饰元素，无图片，纯文字
- 章节标题作为可点击锚点

## 排版

```css
.teleprompter {
  max-width: 720px;
  margin: 0 auto;
  padding: 48px 24px;
  font-family: var(--sans-zh), system-ui, sans-serif;
  font-size: 32px;
  line-height: 1.8;
  color: var(--ink);
  background: var(--paper);
}

.teleprompter h1 {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 48px;
  padding-bottom: 24px;
  border-bottom: 2px solid var(--accent);
}

.teleprompter h2 {
  font-size: 28px;
  font-weight: 600;
  margin-top: 64px;
  margin-bottom: 24px;
  color: var(--accent);
}

.teleprompter p {
  margin-bottom: 24px;
}

/* 当前段落高亮 */
.teleprompter p.active {
  background: var(--accent-soft);
  border-radius: 4px;
  padding: 8px 12px;
  margin-left: -12px;
  margin-right: -12px;
}

/* 节奏标注 */
.teleprompter .cue {
  color: var(--muted);
  font-size: 18px;
  font-style: italic;
  display: block;
  margin: 12px 0;
}
```

## 章节导航

顶部固定导航栏：

```css
.teleprompter-nav {
  position: sticky;
  top: 0;
  background: var(--paper);
  border-bottom: 1px solid var(--line);
  padding: 12px 24px;
  display: flex;
  gap: 16px;
  overflow-x: auto;
  z-index: 10;
}

.teleprompter-nav a {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--muted);
  text-decoration: none;
  white-space: nowrap;
  letter-spacing: 0.05em;
}

.teleprompter-nav a.active {
  color: var(--accent);
  font-weight: 600;
}
```

## 自动滚动

底部控制栏：

```css
.autoscroll-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--paper);
  border-top: 1px solid var(--line);
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 10;
}
```

JS 实现：

```js
function useAutoScroll(speed = 1) {
  // speed: 1 = 慢速 (约 2字/秒), 2 = 中速 (约 3字/秒), 3 = 快速 (约 4字/秒)
  const interval = 1000 / (speed * 2); // 每次滚动间隔
  // 每次滚动 1px，平滑自然
}
```

## 键盘快捷键

| 按键 | 功能 |
|------|------|
| Space | 暂停/恢复自动滚动 |
| ↑ | 加快滚动速度 |
| ↓ | 减慢滚动速度 |
| T | 切换回演示模式 |
| 1-9 | 跳转到对应章节 |

## 深色模式

提词板支持深色模式（适合暗光录制环境）：

```css
.teleprompter.dark {
  --paper: #1a1a1a;
  --ink: #e8e8e8;
  --muted: #888888;
  --line: rgba(255,255,255,.12);
}
```

切换按钮在右上角，图标为 🌙/☀️。

## 舞台模式

超大字号，适合在舞台上用作提词器：

```css
.teleprompter.stage {
  font-size: 48px;
  line-height: 2;
  max-width: 900px;
}
```

通过 URL 参数启用：`/#/teleprompter?mode=stage`
