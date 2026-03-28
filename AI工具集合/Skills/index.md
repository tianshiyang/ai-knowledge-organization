# Skills

这里整理可复用的技能模块，包括它们解决的问题、触发方式和组合方式。

## 通用技能

### find-skills
- **技能目标**: 帮助用户发现和安装 agent skills
- **触发条件**: 当用户询问 "how do I do X"、"find a skill for X"、"is there a skill that can..." 或表达扩展功能的兴趣时
- **输入输出**: 接收用户需求描述，输出匹配的 skills 列表和安装建议
- **配套工具**: Skill 安装机制
- **示例任务**: 查找适合测试的 skill、发现新的开发工具 skill

### update-config
- **技能目标**: 通过 settings.json 配置 Claude Code harness
- **触发条件**: 当需要配置自动化行为（"from now on when X"、"each time X"、"whenever X"）时
- **输入输出**: 配置项和值
- **配套工具**: settings.json 配置文件
- **示例任务**: 设置自动格式化、配置 pre-commit 钩子行为

### loop
- **技能目标**: 定时重复运行 prompt 或 slash 命令
- **触发条件**: 用户需要设置重复任务、轮询状态或定时执行（如 "check the deploy every 5 minutes"）
- **输入输出**: 时间间隔（默认 10 分钟）和要执行的命令
- **配套工具**: 定时任务调度器
- **示例任务**: 每 5 分钟检查部署状态、定时拉取数据更新

### simplify
- **技能目标**: 审查代码变更的重用性、质量和效率，并修复发现的问题
- **触发条件**: 代码变更后需要优化审查时
- **输入输出**: 变更的代码 → 优化建议和修复
- **配套工具**: 代码分析工具
- **示例任务**: 重构冗余代码、优化代码结构

### agent-browser
- **技能目标**: 为 AI agent 提供浏览器自动化 CLI
- **触发条件**: 需要与网站交互，包括导航、填写表单、点击按钮、截图、提取数据、测试 web 应用等
- **输入输出**: 浏览器操作指令 → 执行结果/截图/数据
- **配套工具**: Puppeteer/Playwright 等浏览器自动化工具
- **示例任务**: 自动化网页测试、批量抓取网页数据、自动填写表单

---

## 开发类技能

### claude-api
- **技能目标**: 使用 Claude API 或 Anthropic SDK 构建应用
- **触发条件**: 代码导入 `anthropic`/`@anthropic-ai/sdk`/`claude_agent_sdk`，或用户请求使用 Claude API/Anthropic SDKs/Agent SDK
- **输入输出**: API 调用配置 → API 响应
- **配套工具**: Anthropic SDK、API 密钥管理
- **示例任务**: 构建聊天机器人、集成 Claude 到应用中

### testing-framework
- **技能目标**: 在 Vite 项目中设置和配置 Vitest 进行单元测试、集成测试和组件测试
- **触发条件**: 初始化测试设置、使用 Vitest 编写测试、配置测试环境、mock 依赖、运行覆盖率报告
- **输入输出**: 测试配置 → 测试运行结果和覆盖率报告
- **配套工具**: Vitest、Vue Test Utils、测试覆盖率工具
- **示例任务**: 设置项目测试框架、编写组件测试、配置 mock

### eslint-prettier
- **技能目标**: 设置和配置 ESLint + Prettier 进行代码质量检查和格式化
- **触发条件**: 初始化新项目的 linting/formatting、配置 ESLint 规则、集成 Prettier 与 ESLint、设置 pre-commit 自动格式化钩子
- **输入输出**: 配置文件 → 格式化和 lint 结果
- **配套工具**: ESLint、Prettier、lint-staged
- **示例任务**: 配置团队代码规范、设置自动格式化工作流

### husky-git-hooks
- **技能目标**: 配置 Husky 实现 Git hooks 自动化（pre-commit、commit-msg、pre-push）
- **触发条件**: 设置 pre-commit linting/formatting、强制 commit 消息规范、push 前运行测试、团队 Git hooks 管理
- **输入输出**: Git hook 脚本配置 → 自动化执行结果
- **配套工具**: Husky、lint-staged、commitlint
- **示例任务**: 配置 commit 消息规范检查、设置 pre-push 测试

### typescript-config
- **技能目标**: 为现代开发配置 TypeScript 项目和最优设置
- **触发条件**: 初始化 TypeScript、配置 tsconfig.json、设置严格类型检查、集成 Vite/ESBuild/Webpack、创建类型声明文件
- **输入输出**: TypeScript 配置 → 类型检查结果
- **配套工具**: TypeScript、tsconfig.json
- **示例任务**: 配置严格模式、设置路径别名、添加类型声明

### build-tools
- **技能目标**: 配置前端项目现代构建工具（Vite、Turborepo）
- **触发条件**: 设置 Vite dev server/builds、配置 Rollup 插件、monorepo 设置、优化生产构建、集成框架插件
- **输入输出**: 构建配置 → 构建产物
- **配套工具**: Vite、Turborepo、Rollup
- **示例任务**: 配置 Vite 项目、设置 monorepo 构建流水线

---

## 设计类技能

### frontend-design
- **技能目标**: 创建独特、高质量的生产级前端界面
- **触发条件**: 构建网页组件、页面、artifacts、海报或应用（网站、落地页、仪表板、React 组件等）
- **输入输出**: 设计需求 → 高质量前端代码
- **配套工具**: CSS/SCSS、UI 框架、设计系统
- **示例任务**: 创建落地页、设计仪表板界面、构建响应式组件

### web-design-guidelines
- **技能目标**: 审查 UI 代码是否符合 Web Interface Guidelines
- **触发条件**: 被要求 "review my UI"、"check accessibility"、"audit design"、"review UX" 或检查最佳实践
- **输入输出**: UI 代码 → 合规性审查报告和改进建议
- **配套工具**: 可访问性检查工具、性能分析
- **示例任务**: 可访问性审计、UX 最佳实践检查

---

## 文档类技能

### technical-writer
- **技能目标**: 为开发者和用户创建清晰的文档、API 参考、指南和技术内容
- **触发条件**: 编写文档、创建 README、记录 API、编写教程、创建用户指南
- **输入输出**: 技术内容需求 → 清晰结构化的文档
- **配套工具**: Markdown、文档生成工具
- **示例任务**: 编写 API 文档、创建项目 README、撰写用户指南

---

## Vue.js 专项技能

### vue-best-practices
- **技能目标**: 提供 Vue.js 最佳实践指导
- **触发条件**: 任何 Vue 相关任务，包括 .vue 文件、Vue Router、Pinia、Vite with Vue
- **核心建议**: 强烈推荐 Composition API + `<script setup>` + TypeScript 作为标准方案
- **输入输出**: Vue 代码问题 → 最佳实践解决方案
- **配套工具**: Volar、vue-tsc
- **示例任务**: 重构 Options API 到 Composition API、优化组件结构

### vue-debug-guides
- **技能目标**: Vue 3 调试和错误处理
- **触发条件**: 诊断或修复 Vue 问题，包括运行时错误、警告、异步失败、SSR/hydration 问题
- **输入输出**: 错误描述 → 诊断结果和修复方案
- **配套工具**: Vue DevTools、调试工具
- **示例任务**: 修复 hydration 错误、调试响应式问题

### vue-testing-best-practices
- **技能目标**: Vue.js 测试最佳实践
- **触发条件**: Vue 组件测试、Vitest 使用、Vue Test Utils、mocking、测试模式、E2E 测试
- **输入输出**: 测试需求 → 测试代码和配置
- **配套工具**: Vitest、Vue Test Utils、Playwright
- **示例任务**: 编写组件单元测试、设置 E2E 测试

### create-adaptable-composable
- **技能目标**: 创建库级别的 Vue composable，接受可能响应式的输入（MaybeRef / MaybeRefOrGetter）
- **触发条件**: 需要创建可复用的 Vue composable 时
- **输入输出**: Composable 需求 → 可接受多种输入类型的 composable
- **配套工具**: Vue 响应式 API（toValue/toRef）
- **示例任务**: 创建可复用的数据获取 composable、构建通用工具函数

### vue-jsx-best-practices
- **技能目标**: Vue 中的 JSX 语法最佳实践
- **触发条件**: 使用 JSX 语法编写 Vue 组件
- **输入输出**: JSX 代码 → 规范化的 JSX 写法
- **配套工具**: @vitejs/plugin-vue-jsx
- **示例任务**: 配置 JSX 插件、处理 class vs className

### vue-options-api-best-practices
- **技能目标**: Vue 3 Options API 风格开发
- **触发条件**: 使用 Options API（data()、methods、this 上下文）开发
- **输入输出**: Options API 代码 → 规范化解决方案
- **配套工具**: Vue 2/3 兼容工具
- **示例任务**: 迁移 Vue 2 代码、维护 Options API 项目

### vue-router-best-practices
- **技能目标**: Vue Router 4 路由最佳实践
- **触发条件**: 配置路由、导航守卫、路由参数、路由-组件生命周期交互
- **输入输出**: 路由配置需求 → 最佳实践路由方案
- **配套工具**: Vue Router 4
- **示例任务**: 配置导航守卫、处理路由参数

### vue-pinia-best-practices
- **技能目标**: Pinia 状态管理最佳实践
- **触发条件**: Pinia stores 设置、状态管理模式、store 响应式处理
- **输入输出**: 状态管理需求 → 最佳实践 store 设计
- **配套工具**: Pinia
- **示例任务**: 设计模块化 store、处理复杂状态逻辑

---

## 使用建议

### 技能组合示例

| 场景 | 推荐 Skills 组合 |
|------|------------------|
| 新建 Vue 项目 | `vue-best-practices` + `typescript-config` + `testing-framework` + `eslint-prettier` |
| 代码质量提升 | `simplify` + `eslint-prettier` + `husky-git-hooks` |
| 前端开发全流程 | `frontend-design` + `vue-best-practices` + `build-tools` |
| 项目文档完善 | `technical-writer` + `vue-testing-best-practices` |
| 自动化测试 | `testing-framework` + `vue-testing-best-practices` + `loop` |

### 触发方式

1. **显式调用**: 使用 `/skill-name` 格式直接调用
2. **自动触发**: 满足触发条件时自动激活
3. **组合使用**: 多个 skills 可以协同工作完成复杂任务
