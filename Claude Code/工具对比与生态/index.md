# 工具对比与生态

## Claude Code vs Cursor vs GitHub Copilot

### 定位差异

| 维度 | Claude Code | Cursor | GitHub Copilot |
|------|------------|--------|----------------|
| **核心定位** | 终端原生自主代理 | AI 原生 IDE | IDE 内 AI 助手 |
| **交互模式** | 描述任务 → AI 独立执行 | 你写代码 → AI 实时辅助 | 代码补全 + Chat |
| **界面** | CLI / VS Code 扩展 / 桌面 / Web | VS Code 分支（完整 IDE） | IDE 插件 |
| **模型支持** | Claude 系列（锁定） | 多模型（OpenAI, Claude, Gemini, xAI） | GPT-4o, Claude (via Copilot Chat) |
| **上下文窗口** | 最高 100 万 token | 实际约 7-12 万 token | 依赖底层模型 |

### 性能对比

**SWE-bench Verified 评分**（业界标准自主任务完成基准）：

| 配置 | 得分 |
|------|------|
| Claude Sonnet 4.6 | 79.6% |
| Claude Opus 4.6 | 80.8% |
| Claude Sonnet 4.5 + 并行计算 | 82.0% |

**效率指标**：
- Claude Code 的 Token 效率约为 Cursor 的 **5.5 倍**
- 返工率低 **30%**
- 开发者满意度：Claude Code 46% vs Cursor 19% vs Copilot 9%

### 各自擅长的场景

**Claude Code 更适合：**
- 大规模重构和多文件操作
- 跨大型代码库的复杂自主任务
- 终端优先的开发者
- 需要预先描述完整需求的工作模式
- CI/CD 集成和自动化

**Cursor 更适合：**
- 实时编码辅助和亚秒级补全
- 边想边写的探索式开发
- 需要多模型切换的场景
- 依赖可视化 IDE 功能的工作流

**GitHub Copilot 更适合：**
- 轻量级代码补全
- 已深度绑定 GitHub 生态的团队
- 需要最广泛 IDE 兼容性

### 组合使用

> 不少高级开发者的选择是**同时使用 Claude Code 和 Cursor**。

- **Cursor** 用于日常编码、探索和快速原型
- **Claude Code** 用于重型任务：大规模重构、复杂 Bug 修复、CI/CD 自动化

两者并不冲突——Claude Code 的 VS Code 扩展可以在 Cursor 中安装使用。

---

## Claude Code 设置体系

Claude Code 采用层级化的配置作用域：

```
Managed scope（组织级）
  └── 组织范围的安全策略和限制
  
User scope（用户级）
  └── ~/.claude/settings.json
  └── 个人偏好，跨项目生效
  
Project scope（项目级）
  └── .claude/settings.json
  └── 团队共享配置，提交到 Git
  
Local scope（本地级）
  └── .claude/settings.local.json
  └── 个人项目覆盖，不提交到 Git
```

优先级：Local > Project > User > Managed

---

## MCP 生态

MCP（Model Context Protocol）是 Anthropic 推出的开放协议，让 AI 工具能与外部服务进行标准化交互。

### Claude Code 中的 MCP

Claude Code 原生支持 MCP 服务器。配置方式：

```json
// .claude/settings.json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@anthropic-ai/mcp-playwright"]
    },
    "postgres": {
      "command": "npx",
      "args": ["@anthropic-ai/mcp-postgres", "postgresql://..."]
    }
  }
}
```

### 推荐 MCP 服务器

| MCP 服务器 | 功能 | 提效场景 |
|-----------|------|---------|
| **Playwright** | 浏览器自动化 | UI 测试、截图验证、端到端测试 |
| **PostgreSQL** | 数据库交互 | Schema 查询、数据分析、SQL 优化 |
| **MySQL** | 数据库交互 | 同上 |
| **Figma** | 设计工具集成 | 设计稿转代码、组件提取 |
| **Slack** | 即时通讯 | Bug 报告、状态通知 |
| **GitHub** | 代码托管 | PR 管理、Issue 跟踪 |
| **Sentry** | 错误监控 | 线上错误分析和修复 |

### CLI 工具 vs MCP

| 场景 | 推荐 | 原因 |
|------|------|------|
| 查看 git 状态 | `!git status` | CLI 更省 token |
| 执行简单命令 | `!curl ...` | 一次性操作用 CLI |
| 操作浏览器 | Playwright MCP | 需要持续交互 |
| 查询数据库 | DB MCP | 需要理解 Schema |
| 读取设计稿 | Figma MCP | 需要理解设计结构 |

---

## Skills 生态

### 什么是 Skills

Skills 是 Claude Code 的扩展能力包，遵循开放的 Agent Skills 标准。可以来自：

- **内置 Skills**：Claude Code 自带（如 `/batch`、`/debug`、`/loop`）
- **社区 Skills**：通过 OpenClaw / GitHub 等渠道共享
- **自定义 Skills**：团队或个人针对特定工作流编写

### 与本站 OpenClaw 技能的关系

本站 [OpenClaw 技能](/OpenClaw技能/) 专栏收录的技能可以直接在 Claude Code 中使用。安装方式：

```bash
# 将 Skill 文件放入项目
mkdir -p .claude/skills/skill-name/
# 编写 SKILL.md
```

或通过 OpenClaw CLI 安装：

```bash
openclaw install skill-name
```

---

## 定价与使用方案

### 使用方式

| 方案 | 说明 |
|------|------|
| **Claude Pro/Max 订阅** | 包含 Claude Code 使用额度 |
| **API 按量付费** | 通过 Anthropic Console 获取 API Key |
| **企业版** | 通过 Bedrock / Vertex AI 接入，支持 SSO 和合规要求 |

### 成本优化建议

- 日常开发使用 **Sonnet** 模型（更快、更便宜）
- 仅在复杂推理场景切换 **Opus**（更强但更贵）
- 利用 `/compact` 压缩上下文减少 token 消耗
- 善用 `--max-budget-usd` 控制自动化任务成本
- 并行任务优先用 Git Worktree + Sonnet，而非单线程 Opus
