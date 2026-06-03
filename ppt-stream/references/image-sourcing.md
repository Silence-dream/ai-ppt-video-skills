# Image Sourcing

从免费商用图库获取配图。

## 图库选择

| 图库 | 特点 | 适用场景 | 搜索方式 |
|------|------|---------|---------|
| Pexels | 支持中文搜索，通用场景 | 国内/中文相关内容 | `https://www.pexels.com/zh-cn/search/<关键词>/` |
| Unsplash | 摄影质感最强 | 人物、生活、空间、高质量封面 | `https://unsplash.com/s/photos/<keyword>` |
| Wallhaven | 游戏、摄影、壁纸 | 游戏、夜景、暗色题材 | `https://wallhaven.cc/search?q=<keyword>` |

## 获取流程

1. **确定关键词**：根据幻灯片内容提取 2-3 个搜索关键词
2. **选择图库**：根据内容类型选择最合适的图库
3. **搜索图片**：使用 WebFetch 访问搜索页面，提取图片 URL
4. **下载图片**：使用 curl 下载到 `public/images/`
5. **命名规范**：按用途命名，如 `hero-ai.jpg`、`chapter2-nature.png`
6. **记录来源**：写入 `public/images/SOURCES.md`

## 图片要求

- 最小宽度 1920px（全屏幻灯片用）
- 优先选择构图简洁的图片（文字叠加不杂乱）
- 避免带水印的图片
- 避免过于"图库感"的摆拍照片

## 搜索关键词策略

从口播稿中提取视觉关键词：

| 内容类型 | 关键词示例 |
|---------|-----------|
| 科技/AI | artificial intelligence, technology, digital, circuit |
| 商业 | business, meeting, office, strategy |
| 自然 | nature, forest, mountain, landscape |
| 人物 | person thinking, professional, portrait |
| 数据 | data visualization, chart, dashboard |
| 抽象 | abstract, gradient, texture, pattern |

## SOURCES.md 格式

```markdown
# 图片来源

| 文件名 | 来源 | 原始链接 | 用途 |
|--------|------|---------|------|
| hero-ai.jpg | Unsplash | https://unsplash.com/photos/xxx | 封面 |
| chapter2-nature.png | Pexels | https://www.pexels.com/photo/xxx | 第2章背景 |
```

## 注意事项

- Pexels 和 Unsplash 可免费商用，无需署名（但建议注明）
- Wallhaven 版权混乱，使用前确认许可证
- 如果 WebFetch 无法获取图片，提供手动下载指引
- 支持用户自备图片：将图片放入 `public/images/` 即可
