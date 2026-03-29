# 前端开发常用技能

这页面向 `Vue / Vite` 前端工程师，优先整理那些能直接帮助你提升页面开发、组件设计、样式系统、视觉质量和联调效率的 OpenClaw 技能。

截至 `2026-03-29`，这里的推荐结合了 ClawHub 近期可核对页面、安装/使用量信号，以及“高频实用优先”的筛选标准。排序不等于热度榜，而是更偏向日常复用价值。

## 核心推荐

| 技能 | 定位 | 推荐等级 | 适用人群 | 倾向 | 安装命令 | 风险提示 |
|------|------|------|------|------|------|------|
| [NextJS](https://clawhub.ai/skills/nextjs) | 用于 Next.js 15、App Router、缓存、鉴权和生产模式的框架型技能 | A | 前端工程师、全栈前端 | 前端优先 | `npx clawhub@latest install nextjs` | 偏 React / Next.js 生态，Vue 用户更适合把它当作工程模式参考 |
| [Frontend Design](https://clawhub.ai/skills/frontend-design-guidelines) | 提升页面视觉质量，避免“AI 味”很重的默认设计 | A | 前端工程师、设计工程师 | 前端优先 | `npx clawhub@latest install frontend-design-guidelines` | 更偏设计方向，适合和业务/品牌约束一起使用 |
| [TailwindCss Complete Documentation](https://clawhub.ai/skills/lb-tailwindcss-skill) | 把 Tailwind 文档直接变成可调用技能，适合查类名、响应式和主题配置 | A | Tailwind 用户、组件开发者 | 前端优先 | `npx clawhub@latest install lb-tailwindcss-skill` | ClawHub 安全扫描提示需人工检查，建议先阅读说明再装 |
| [React Composition](https://clawhub.ai/skills/react-composition) | 沉淀组件组合、Compound Component、Context 等可复用模式 | B | 组件库维护者、复杂页面开发者 | 前端优先 | `npx clawhub@latest install react-composition` | 偏 React，但对 Vue 组件 API 设计和插槽思路很有借鉴价值 |
| [Agency Agents](https://clawhub.ai/skills/agency-agents) | 用多个前端/设计/测试 Agent 协作完成复杂项目 | B | 需要编排多人设 Agent 的开发者 | 前端优先 | `npx clawhub@latest install agency-agents` | 编排能力强，但不建议替代你自己的技术判断 |

## 按场景整理

### 1. 项目初始化与脚手架

| 技能 | 为什么值得看 | Vue / Vite 视角 |
|------|------|------|
| [NextJS](https://clawhub.ai/skills/nextjs) | 它是当前很强的框架型技能，ClawHub 页面显示有较高使用量 | 虽然不是 Vue 专属，但它在目录组织、路由、缓存、鉴权上的约束方式很适合拿来反推 Vite 项目结构 |

### 2. 组件架构与重构

| 技能 | 为什么值得看 | Vue / Vite 视角 |
|------|------|------|
| [React Composition](https://clawhub.ai/skills/react-composition) | 更像“组件架构模式指南”，适合解决布尔参数爆炸、组件职责混乱的问题 | 可以把它当成“插槽设计、组合式 API、组件职责拆分”的参考，不要把它当成 Vue 代码生成器 |

### 3. UI 设计与视觉优化

| 技能 | 为什么值得看 | Vue / Vite 视角 |
|------|------|------|
| [Frontend Design](https://clawhub.ai/skills/frontend-design-guidelines) | 直接约束页面审美和实现风格，适合落地页、官网和营销页 | 对任何前端栈都适用，尤其适合你在 Vue 项目里做品牌页面、专题页和后台视觉升级 |

### 4. 样式系统与文档

| 技能 | 为什么值得看 | Vue / Vite 视角 |
|------|------|------|
| [TailwindCss Complete Documentation](https://clawhub.ai/skills/lb-tailwindcss-skill) | 对 Tailwind 工具类、暗色模式、配置项、插件都有较完整的本地化说明 | 如果你的 Vue / Vite 项目本身使用 Tailwind，这类技能会非常高频；如果不用 Tailwind，就属于场景型工具 |

### 5. 页面调试与联调自动化

| 技能 | 为什么值得看 | Vue / Vite 视角 |
|------|------|------|
| [Browser Automation CLI](https://clawhub.ai/skills/browser-pc) | 能自动导航页面、点击、截图、提取信息，适合联调和回归检查 | 对前端调试很有帮助，但权限面较大，建议放在“进阶与谨慎使用”里按需启用 |

## 适配说明

- `NextJS` 和 `React Composition` 不属于 Vue 专属技能，但很适合你借鉴工程结构、组件模式和 API 设计方法。
- `Frontend Design` 是真正跨框架的前端技能，对 Vue / Vite 项目的适配成本最低。
- `TailwindCss Complete Documentation` 的收益和你是否使用 Tailwind 强相关；如果你的项目是 UnoCSS 或原生 CSS Modules，它的优先级会下降。
- 如果你经常做联调、验收、抓图、表单回放，浏览器自动化相关技能会很值；否则不建议放入默认工具链。

## 来源说明

- [NextJS](https://clawhub.ai/skills/nextjs)：ClawHub 页面显示较高使用量，适合作为框架型参考技能。
- [Frontend Design](https://clawhub.ai/skills/frontend-design-guidelines)：ClawHub 页面显示使用量较高，定位清晰。
- [React Composition](https://clawhub.ai/skills/react-composition)：适合组件复用和架构重构。
- [TailwindCss Complete Documentation](https://clawhub.ai/skills/lb-tailwindcss-skill)：适合样式系统和文档查询。
- [Agency Agents](https://clawhub.ai/skills/agency-agents)：适合复杂项目前端协作和编排。
