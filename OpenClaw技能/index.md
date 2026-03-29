# OpenClaw 技能整理

这部分不再把 `OpenClaw技能` 当成单纯的“运维 / 安全 / 安装”目录，而是重整为更适合长期使用的双层体系：

- `前端开发常用技能`：优先服务 `Vue / Vite` 前端工作流
- `通用常用技能`：覆盖搜索、浏览器自动化、写作、知识整理、协作、可视化表达等跨行业高频需求

原有 `安装配置类`、`安全类`、`运维类` 继续保留，但统一归入“OpenClaw 平台专项”，避免它们继续主导首页阅读路径。

截至 `2026-03-29`，这份整理结合了 ClawHub 当前可核对页面、技能定位、安全扫描提示和日常复用价值。这里的排序不是简单热度榜，而是“高频实用优先”。

## 核心推荐

### 前端优先

| 技能 | 为什么推荐 | 推荐等级 | 类型 |
|------|------|------|------|
| [NextJS](https://clawhub.ai/skills/nextjs) | 框架型技能强，适合借鉴项目结构、路由、缓存和鉴权模式 | A | 前端 |
| [Frontend Design](https://clawhub.ai/skills/frontend-design-guidelines) | 直接提升页面视觉质量，适合官网、专题页和品牌页 | A | 前端 |
| [TailwindCss Complete Documentation](https://clawhub.ai/skills/lb-tailwindcss-skill) | 对 Tailwind 使用者非常高频，适合查类名、响应式和主题配置 | A | 前端 |
| [React Composition](https://clawhub.ai/skills/react-composition) | 适合组件 API 设计、组合模式和重构参考 | B | 前端 |

### 通用优先

| 技能 | 为什么推荐 | 推荐等级 | 类型 |
|------|------|------|------|
| [Agency Agents](https://clawhub.ai/skills/agency-agents) | 提供多 Agent 团队能力，适合复杂任务编排 | A | 通用 |
| [Visual Explainer for OpenClaw](https://clawhub.ai/skills/visual-explainer-openclaw) | 把复杂内容转成可视化 HTML 页面，适合汇报和知识沉淀 | A | 通用 |
| [Browser Automation CLI](https://clawhub.ai/skills/browser-pc) | 网页抓取、截图、自动化联调和表单回放都很实用 | B | 通用 |

## 主要入口

### [前端开发常用技能](./前端开发常用技能/index.md)

面向 `Vue / Vite` 前端开发者，按以下场景组织：

- 项目初始化与脚手架
- 组件架构与重构
- UI 设计与视觉优化
- 样式系统与文档
- 页面调试与联调自动化

### [通用常用技能](./通用常用技能/index.md)

面向开发、产品、运营、写作者和知识工作者，按以下能力组织：

- 搜索与信息获取
- 浏览器与网页操作
- 写作与文档
- 知识整理与可视化表达
- 效率与协作
- 发现型入口

### [进阶与谨慎使用](./进阶与谨慎使用/index.md)

专门放那些“很强，但不适合默认推荐”的技能：

- 高权限系统工具箱
- 浏览器自动化
- 技能集合安装器
- 多 Agent 编排器

## OpenClaw 平台专项

如果你的目标是安装、维护、审计或排障 OpenClaw 本体，而不是扩展日常工作流，继续看下面这些分类：

### [安装配置类](./安装配置类/index.md)

用于 OpenClaw 部署、CLI 操作、插件配置和环境准备。

### [安全类](./安全类/index.md)

用于服务器加固、安全审计、策略检查和风险排查。

### [运维类](./运维类/index.md)

用于 Gateway / Node / Channel 管理、故障排查、运维防呆和日常维护。

## 内容说明

这部分文档目前包含两类内容：

- `生态精选`：来自 ClawHub 的前端向和通用向技能，帮助你快速建立常用工具链
- `平台专项`：仓库里已收录的 OpenClaw 本体相关技能，用于安装、维护与安全排查

如果你是第一次整理自己的 OpenClaw 技能库，建议阅读顺序是：

1. [前端开发常用技能](./前端开发常用技能/index.md)
2. [通用常用技能](./通用常用技能/index.md)
3. [进阶与谨慎使用](./进阶与谨慎使用/index.md)
4. 平台专项分类页
