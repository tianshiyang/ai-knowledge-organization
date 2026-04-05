# 快速上手

## 安装

### 推荐方式（原生安装）

```bash
# macOS / Linux / WSL
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex

# Windows CMD
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

### 包管理器

```bash
# Homebrew (macOS)
brew install --cask claude-code

# WinGet (Windows)
winget install Anthropic.ClaudeCode
```

### 系统要求

| 项目 | 要求 |
|------|------|
| 操作系统 | macOS 13.0+、Windows 10 1809+、Ubuntu 20.04+、Debian 10+、Alpine 3.19+ |
| 内存 | 4GB+ |
| 网络 | 需要联网 |
| Shell | Bash、Zsh、PowerShell 或 CMD |
| Windows 附加 | 需安装 Git for Windows |

## 认证与配置

```bash
# 启动并登录
claude auth login

# 在项目目录中启动
cd your-project
claude
```

支持三种认证方式：
- **Anthropic Console**：从 [console.anthropic.com](https://console.anthropic.com/) 获取 API Key
- **Amazon Bedrock**：企业用户可通过 Bedrock 接入
- **Google Vertex AI**：企业用户可通过 Vertex AI 接入

## 使用界面

Claude Code 提供四种使用方式：

| 方式 | 说明 |
|------|------|
| **终端 CLI** | 核心入口，运行 `claude` 进入交互模式 |
| **VS Code 扩展** | 在 VS Code / Cursor 中以侧边栏形式使用 |
| **桌面应用** | macOS 和 Windows 原生客户端 |
| **Web 界面** | 浏览器中访问 |

## CLAUDE.md — 项目记忆

CLAUDE.md 是 Claude Code 最重要的配置基础设施。每次会话启动时自动加载，让 Claude 理解你的项目。

### 作用域层级

```
~/.claude/CLAUDE.md          → 全局配置（所有项目生效）
./CLAUDE.md                  → 项目配置（团队共享，提交到 Git）
./CLAUDE.local.md            → 本地配置（个人偏好，加入 .gitignore）
./src/CLAUDE.md              → 目录配置（按需加载，进入目录时读取）
```

### 编写建议

**应该写什么：**
- 构建/测试/部署命令（`npm run test`、`make build`）
- 代码规范和约定（命名风格、文件组织）
- 架构决策（为什么选 X 而不选 Y）
- 常见陷阱和注意事项
- 第三方服务和 API 的使用方式

**不应该写什么：**
- Claude 能从代码推断出的内容
- 过于冗长的说明（建议控制在 50-200 行）
- 不稳定、频繁变化的信息

### 快速初始化

```bash
# 自动生成初始 CLAUDE.md
claude /init
```

### 示例

```markdown
# CLAUDE.md

## 构建命令
- `pnpm install` — 安装依赖
- `pnpm dev` — 启动开发服务器
- `pnpm test` — 运行测试（Vitest）
- `pnpm lint` — ESLint 检查

## 代码规范
- 使用 TypeScript strict 模式
- 组件使用 PascalCase，工具函数使用 camelCase
- Vue 组件必须使用 Composition API + `<script setup>`
- 所有 API 请求通过 `src/api/` 下的模块发起

## 架构
- 前端：Vue 3 + Vite + Pinia
- 后端：Node.js + Fastify
- 数据库：PostgreSQL + Drizzle ORM

## 注意事项
- 不要修改 `src/generated/` 目录，这些文件由代码生成器维护
- 测试文件放在与源文件同级的 `__tests__/` 目录
- 提交前必须通过 `pnpm lint && pnpm test`
```

## 基础交互

```bash
# 启动交互模式
claude

# 直接执行单次任务
claude -p "解释这个项目的结构"

# 恢复上一次会话
claude --resume

# 切换模型
/model sonnet       # 使用 Sonnet（更快、更省）
/model opus         # 使用 Opus（更强推理能力）
/model opus[1m]     # 使用 Opus + 100万 token 上下文
```

### 常用斜杠命令

| 命令 | 作用 |
|------|------|
| `/init` | 自动生成 CLAUDE.md |
| `/clear` | 清空当前上下文 |
| `/model` | 切换模型 |
| `/permissions` | 管理工具权限白名单 |
| `/voice` | 语音输入模式 |
| `/rewind` | 撤销上一步操作 |
| `/compact` | 压缩上下文，释放空间 |
