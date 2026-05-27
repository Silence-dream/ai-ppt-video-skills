# 音频合成

把每个章节 `narrations.ts` 里的口播文字按 **step 颗粒度**合成音频，
落到 `presentation/public/audio/<chapter-id>/<step-N>.mp3`。运行时
Auto 模式会自动按 step 播放并自动推进——录屏可以一镜到底。

> **真相源**：每个章节的 `src/chapters/<NN>-<id>/narrations.ts` 是 step
> 数 + 口播文本的**唯一来源**。`outline.md` 不再参与音频合成，章节代码
> 也不再手写 `totalSteps`。这一改根除了"网页 step 和音频文件数对不上"
> 这个老问题。

默认用 **Xiaomi MiMo V2.5 TTS**（OpenAI 兼容 API）。需要一个 API key
保存在 `presentation/.env` 文件中。

---

## TTS 引擎：Xiaomi MiMo V2.5 TTS

### API 概览

| 项目 | 值 |
|---|---|
| Endpoint | `https://api.xiaomimimo.com/v1/chat/completions` |
| Model | `mimo-v2.5-tts` |
| 认证 | Header `api-key: $MIMO_API_KEY` |
| 协议 | OpenAI Chat Completions 兼容 |
| 输出格式 | wav（可转 mp3） |
| 价格 | **限时免费** |

### 内置音色列表

| 音色名 | 音色 ID | 语言 | 性别 |
|---|---|---|---|
| MiMo-默认 | `mimo_default` | 中文（国内集群默认冰糖） | — |
| 冰糖 | `冰糖` | 中文 | 女 |
| 茉莉 | `茉莉` | 中文 | 女 |
| 苏打 | `苏打` | 中文 | 男 |
| 白桦 | `白桦` | 中文 | 男 |
| Mia | `Mia` | 英文 | 女 |
| Chloe | `Chloe` | 英文 | 女 |
| Milo | `Milo` | 英文 | 男 |
| Dean | `Dean` | 英文 | 男 |

默认音色为 `冰糖`。可通过 `--voice=<音色ID>` 切换。

### 请求格式

```json
{
  "model": "mimo-v2.5-tts",
  "messages": [
    { "role": "user", "content": "风格指令（自然语言）" },
    { "role": "assistant", "content": "要合成的口播文字" }
  ],
  "audio": {
    "format": "wav",
    "voice": "冰糖"
  }
}
```

- `user` 消息：风格控制指令（可选），用自然语言描述语调、情绪、语速
- `assistant` 消息：要合成的目标文字（必填）
- `audio.voice`：音色 ID
- `audio.format`：`wav`（非流式）或 `pcm16`（流式）

响应中 `choices[0].message.audio.data` 为 base64 编码的音频。

### 风格控制

MiMo TTS 支持两种风格控制方式：

**1. 自然语言控制**（放在 `user` 消息中）

> 用轻松愉快、略带兴奋的语气朗读，语速稍快，语调上扬。

> 像纪录片旁白一样沉稳、大气，语速适中，吐字清晰。

**2. 音频标签控制**（放在 `assistant` 消息的文字中）

在文字前加 `(风格)` 标签：

- `(开心)今天真是个好日子！`
- `(磁性)夜深了，城市还在呼吸。`
- `(东北话)哎呀妈呀，今天可太冷了！`
- `(唱歌)原谅我这一生不羁放纵爱自由。`

支持的风格：开心、难过、生气、害怕、温柔、冷淡、活泼、严肃、磁性、
甜美、沙哑、优雅、夹子音、大叔音、东北话、四川话、粤语 等。

---

## 文件命名约定

```
presentation/public/audio/
├── coldopen/
│   ├── 1.mp3
│   ├── 2.mp3
│   └── ...
├── hook/
│   └── ...
└── ...
```

- 章节子目录名 = `chapters.ts` 里的 `id`
- 文件名 = `<step-N>.mp3`（**1-indexed**，对齐 narrations 数组的 index + 1）
- 格式默认 mp3（需 ffmpeg）；无 ffmpeg 时保存 wav

---

## 标准流程

### 1. 配置 API Key

在 `presentation/.env` 文件中设置：

```
MIMO_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
```

API Key 在 https://platform.xiaomimimo.com 获取。

### 2. 抽取 segments

```bash
cd presentation
pnpm run extract-narrations
```

这会扫所有章节的 `narrations.ts`，按 `chapters.ts` 注册顺序生成
`audio-segments.json`：

```json
[
  { "chapter": "coldopen", "step": 1, "text": "...", "audio": "coldopen/1.mp3" },
  { "chapter": "coldopen", "step": 2, "text": "...", "audio": "coldopen/2.mp3" },
  ...
]
```

让用户**先扫一眼这个 json**，确认文本和切分都对，再开始烧 token 合成。

> 空字符串的 narration 会被自动跳过（不烧 TTS token）——运行时 Auto 模式
> 按字数估时撑过这种"无声过场"step。

### 3. 合成

```bash
pnpm run synthesize-audio              # 增量：跳过已存在的文件
pnpm run synthesize-audio -- --force   # 全部重合成
pnpm run synthesize-audio -- --voice=茉莉  # 指定音色
```

脚本**串行**调 API（避免 rate limit），**自动跳过已存在文件**（断点续合
不烧重复 token）。每条打印进度：

```
TTS engine : Xiaomi MiMo V2.5 TTS
Voice      : 冰糖
Format     : mp3 (ffmpeg convert)
Segments   : 24

[  1/24] coldopen/1.mp3             ✓ 2.3s
[  2/24] coldopen/2.mp3             ✓ 1.8s
[  3/24] coldopen/3.mp3             skip (exists)
```

**依赖要求**：
- Node.js 18+（需要内置 `fetch`）
- `.env` 中有 `MIMO_API_KEY`
- （可选）`ffmpeg` 在 PATH 中——用于 wav→mp3 转换；没有则保存 wav

### 4. 校验时长

合成完后跑：

```bash
for f in public/audio/*/*.mp3; do
  d=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$f")
  echo "$f  ${d}s"
done
```

把每条的实际秒数汇总告诉用户。**重点关注 ≥ 15s 的条目**——口播太长意味
着该 step 的 narration 写得过密，或者 step 没拆够。让用户决定**改稿子
重合**还是**回章节代码拆 step**。

---

## 用户自带 TTS 的最小契约

任何 TTS 后端只要满足三个能力即可接进来：

| 能力 | 输入 | 输出 |
|---|---|---|
| 单段合成 | 一段文字（≤ 5000 字符）+ 音色 id（可选） | 一个 mp3 / wav 文件 |
| 错误反馈 | —— | 失败时明确报错（rate limit / auth / 内容审核 / 网络） |
| 输出可指定路径 | 目标文件路径 | 直接写到该路径 |

替换 `scripts/synthesize-audio.ts` 中的 `synthesize()` 函数即可接入其它引擎。

---

## 运行时如何使用合成的音频

合成完成后，**不需要任何额外配置**——脚手架的 `App.tsx` 已经接好：

| 模式 | 触发方式 | 行为 |
|---|---|---|
| **Manual**（默认） | 直接打开页面 | 不播音频，点击 / 方向键推进 |
| **Audio**（半自动） | URL `?audio=1` 或按 `M` 键 | 进入 step 自动播音频，但你手动推进（点鼠标） |
| **Auto**（全自动） | URL `?auto=1` 或按两次 `M` 键 | 进入 step 播音频 → 播完自动 next() → 进下个 step → ... |

Auto 模式首次需要按一次 `Space` 启动（绕过浏览器自动播放限制），之后
全自动跑。**录屏时打开屏幕录制 → 按 Space → 整片自动跑完 → stop**。

> **Auto 模式的推进规则就一句话**：每段音频播完 + 200ms 缓冲 → 自动 next。
> **没有"等动画跑完"的兜底**——如果你写的视觉动画比口播长，会被当场切。
> 解决办法：写更长口播 / 拆 step / 调动画速度（详见
> [`CHAPTER-CRAFT.md`](CHAPTER-CRAFT.md) 「代码层最小约束」）。
>
> 音频文件缺失（还没合成 / 404）或 narration 是空串 → 退化到字数估时
>（`max(1500ms, 字数 × 250ms)`），保证预览也能整片跑通。

---

## 故障排查

| 现象 | 原因 / 修法 |
|---|---|
| `MIMO_API_KEY not set` | `.env` 文件中没有设置 `MIMO_API_KEY`，或环境变量未加载 |
| `MiMo API 401` | API Key 无效或过期，去 https://platform.xiaomimimo.com 重新获取 |
| `MiMo API 429` | 触发 rate limit，脚本串行调用一般不会；等一会重试 |
| `chapter id "X" registered but no matching folder found` | 章节文件夹应命名为 `NN-<id>`；id 必须等于 chapters.ts 里注册的 |
| `narrations.ts in X must export an array named "narrations"` | 该章节的 narrations.ts 没 export 名为 narrations 的数组 |
| 中间断了几条没合成 | `pnpm run synthesize-audio` 重跑 —— 已存在文件会跳过 |
| 中文音色不自然 | 试试 `--voice=茉莉` 或 `--voice=苏打`，不同音色效果不同 |
| 整段合成被截断 | 单段过长。在 narrations.ts 里把这条拆成两条（也意味着该 step 应该拆成两个 step） |
| 浏览器没播音频 | Auto / Audio 模式下首次需要用户手势——确认你按了 SPACE 启动 Auto，或者点过页面 |
| 音频 404 但 Auto 模式还能跑 | 找不到音频时 useAudioPlayer 退化到字数估时（4 字/秒），保证预览不中断 |

---

## 相关链接

- MiMo 开放平台：<https://platform.xiaomimimo.com>
- TTS v2.5 文档：<https://platform.xiaomimimo.com/docs/zh-CN/usage-guide/speech-synthesis-v2.5>
- API Key 获取：<https://platform.xiaomimimo.com>
