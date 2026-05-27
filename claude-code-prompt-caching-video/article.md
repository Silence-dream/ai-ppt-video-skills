# Article Notes

> Source: https://claude.com/blog/lessons-from-building-claude-code-prompt-caching-is-everything
> Title: Lessons from building Claude Code: Prompt caching is everything
> Date: April 30, 2026
> Product/category: Claude Code

These notes paraphrase the article for video-production use. They are not a full copy of the source article.

---

## §1. 文章主张：长时间运行的 agent 离不开 prompt caching

- 文章说，Claude Code 这类长会话 agent 能跑得起来，很大程度靠 prompt caching。
- prompt caching 会复用上一次请求里已经算过的前缀，从而降低延迟和成本。
- Claude Code 的产品设计围绕缓存命中率展开；缓存命中率低会影响成本、速度和订阅计划的额度体验。
- 团队会监控 prompt cache hit rate，命中率太低时会报警，甚至按事故处理。
- 核心判断：对 agent 来说，缓存不是性能小优化，而是产品架构约束。
- 来源定位：网页 L273-L278，L337-L345。

---

## §2. 缓存的基本规则：前缀匹配，顺序非常要命

- prompt caching 本质是 prefix matching。
- API 会从请求开头开始匹配，直到每个 `cache_control` breakpoint。
- 只要前缀里任何位置发生变化，变化之后的部分就不能复用旧缓存。
- 因此内容排列顺序非常关键：越稳定、越共享的内容越应该放前面。
- Claude Code 的排列顺序是：静态 system prompt 和工具定义、项目级 CLAUDE.md、session context、conversation messages。
- 这个结构让不同会话、同一项目和同一 session 尽可能共享缓存。
- 来源定位：网页 L279-L294，L340-L341。

---

## §3. 这个结构很脆弱：小改动也会打碎缓存

- 看似无害的变化也会破坏缓存前缀。
- 文章举的坑包括：把详细时间戳放进静态 system prompt；工具定义顺序非确定性打乱；在工具参数里改可调用 agent 列表。
- 这些变化不一定改变业务含义，但会改变请求字节，导致缓存失效。
- 因此稳定性要落到工程细节：顺序稳定、定义稳定、动态信息不要塞进静态前缀。
- 来源定位：网页 L293-L294。

---

## §4. 更新信息时，优先用 messages，不要改 system prompt

- 会话里总会出现动态信息，比如时间变化、用户改了文件。
- 直觉上可以更新 prompt，但这会改变缓存前缀。
- Claude Code 的做法是把更新塞进下一轮 user message 或 tool result 里，例如用 `<system-reminder>` 标签告诉模型新情况。
- 这样模型能看到最新信息，同时保住前面的缓存。
- 设计原则：状态变化尽量走消息层，不要重写稳定前缀。
- 来源定位：网页 L295-L299，L341-L342。

---

## §5. 中途换模型不一定省钱

- prompt cache 是按模型隔离的。
- 如果一个会话已经在 Opus 上累积了很长上下文，突然切到 Haiku，可能并不省钱。
- 因为 Haiku 没有这段 Opus 缓存，需要重建整个 prompt cache。
- 文章给的思路是用 subagent 做模型切换：先让原模型准备 hand-off message，再交给另一个模型处理子任务。
- Claude Code 的 Explore agents 就经常用这种交接方式。
- 来源定位：网页 L299-L304。

---

## §6. 中途增删工具，是最常见的缓存破坏方式

- 工具定义属于缓存前缀的一部分。
- 如果会话中途添加或移除工具，整个前缀会变，缓存会失效。
- 直觉上你可能想“只给当前需要的工具”，但这对缓存不友好。
- Plan Mode 的设计避开了这个坑：工具集始终保持不变，进入和退出 plan mode 本身被建模成工具调用。
- agent 进入 plan mode 后，通过系统消息理解当前限制，例如只探索、不编辑、完成后退出。
- 额外好处是模型可以在发现复杂问题时主动进入 plan mode，而不需要换工具集。
- 来源定位：网页 L305-L313，L342-L343。

---

## §7. 工具太多时，用 defer loading，而不是移除工具

- Claude Code 可能有很多 MCP 工具。
- 全量工具 schema 每次都带上会很贵，但中途移除又会破坏缓存。
- 解决办法是 `defer_loading`：稳定地放轻量 tool stub，只保留工具名和延迟加载标记。
- 模型需要时再通过 tool search 发现并加载完整 schema。
- 这样前缀里的工具清单稳定，成本也不会被完整 schema 拖垮。
- 来源定位：网页 L314-L319。

---

## §8. compaction 的坑：摘要调用也要复用父会话前缀

- 上下文窗口满了之后，Claude Code 会总结前文，并用 summary 继续新 session。
- 直觉做法是单独发一个“请总结”的 API call，并且不给工具。
- 但这样 system prompt 和工具集从第一个 token 就不一样，父会话缓存完全用不上。
- 会话越长，这个 uncached summarization call 越贵。
- Claude Code 的做法是 cache-safe fork：compaction 调用使用和父会话完全一致的 system prompt、user context、system context 和工具定义。
- 它把父会话 messages 放前面，再把 compaction prompt 作为新的 user message 放在末尾。
- 这样 API 看到的前缀几乎和父会话上一轮一样，只有末尾的 compaction prompt 是新 token。
- 代价是要预留 compaction buffer，给摘要指令和摘要输出留空间。
- 来源定位：网页 L320-L336，L344-L345。

---

## §9. 文章最后的五条经验

- prompt caching 是前缀匹配，系统要围绕这个约束设计。
- 用 messages 表达动态更新，不要随手改 system prompt。
- 不要在会话中途换工具或模型；状态切换用工具建模，工具加载用延迟发现。
- 像监控 uptime 一样监控 cache hit rate，命中率掉几个百分点就可能影响成本和延迟。
- fork 出来的侧向任务，比如 compaction、summary、skill execution，也应该共享父会话前缀。
- 来源定位：网页 L337-L345。

