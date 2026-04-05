# 高级功能

## Hooks 系统

Hooks 是 Claude Code 中实现**100% 确定性自动化**的机制。与 CLAUDE.md 的「建议性」不同（约 80% 遵守率），Hooks 在指定事件触发时必定执行。

### CLAUDE.md vs Hooks

| 特性 | CLAUDE.md | Hooks |
|------|-----------|-------|
| 性质 | 建议性指引 | 确定性规则 |
| 遵守率 | ~80% | 100% |
| 适用场景 | 代码规范、架构决策 | 格式化、Lint、安全检查 |
| 配置方式 | Markdown 文件 | JSON 配置 |

**经验法则**：用 CLAUDE.md 定义「偏好」（prefer Bun over npm），用 Hooks 定义「必须遵守的规则」（always format with Prettier）。

### Hook 类型

| 类型 | 说明 | 适用场景 |
|------|------|---------|
| **Command Hook** | 执行 Shell 脚本 | 格式化、Lint、日志记录、安全检查 |
| **Prompt Hook** | 向 LLM 提问（Yes/No） | Shell 脚本难以判断的复杂决策 |
| **Agent Hook** | 启动多轮子代理 | 需要读取文件、执行命令的验证任务 |

### 生命周期事件

```
会话级别
  SessionStart ─── 会话开始时触发
  SessionEnd ───── 会话结束时触发

每轮交互
  UserPromptSubmit ─ 用户提交输入后
  PreToolUse ─────── 工具调用前
  PostToolUse ────── 工具调用后
  PostToolUseFailure ─ 工具调用失败后

异步事件
  FileChanged ──── 文件变化时
  CwdChanged ───── 工作目录变化时
  ConfigChange ─── 配置变化时

子代理
  SubagentStart ── 子代理启动时
  SubagentStop ─── 子代理停止时
  TaskCreated ──── 任务创建时
  TaskCompleted ── 任务完成时
```

### 实战示例

#### 1. 自动格式化：每次文件编辑后运行 Prettier

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write|Edit",
      "hooks": [{
        "type": "command",
        "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write 2>/dev/null; exit 0"
      }]
    }]
  }
}
```

#### 2. 安全防护：阻止危险的 Git 命令

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "if echo \"$TOOL_INPUT\" | grep -qE 'git (push --force|reset --hard|clean -fd)'; then echo 'BLOCKED: Dangerous git command'; exit 1; fi"
      }]
    }]
  }
}
```

#### 3. 会话启动时注入上下文

```json
{
  "hooks": {
    "SessionStart": [{
      "hooks": [{
        "type": "command",
        "command": "echo '--- Git Status ---' && git status --short && echo '--- Recent TODOs ---' && grep -rn 'TODO\\|FIXME' src/ | head -20"
      }]
    }]
  }
}
```

#### 4. 自动运行 ESLint 检查

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write|Edit",
      "hooks": [{
        "type": "command",
        "command": "jq -r '.tool_input.file_path' | xargs npx eslint --fix 2>/dev/null; exit 0"
      }]
    }]
  }
}
```

### 配置位置

```
~/.claude/settings.json              → 全局（所有项目）
.claude/settings.json                → 项目级（团队共享）
.claude/settings.local.json          → 本地（个人覆盖）
```

---

## 子代理（Subagents）

子代理是 Claude Code 的多代理编排能力。主代理可以创建多个子代理并行处理任务，每个子代理有独立的上下文窗口和工具集。

### 工作模式

```
主代理（Orchestrator）
  │
  ├── Task("重构 auth 模块")
  │     └── 子代理 A：独立上下文 → 读文件、改代码、跑测试
  │
  ├── Task("编写 API 文档")
  │     └── 子代理 B：独立上下文 → 读代码、生成文档
  │
  └── Task("优化数据库查询")
        └── 子代理 C：独立上下文 → 分析慢查询、改 SQL
```

### 核心优势

- **上下文隔离**：子代理有自己的上下文窗口，不会占用主代理的空间
- **并行加速**：多个独立任务同时执行
- **失败隔离**：一个子代理失败不影响其他任务
- **专业分工**：每个子代理专注单一领域，提高输出质量

### 使用建议

- 探索阶段使用子代理扫描代码库，保持主线程干净
- 大型重构时，拆分为多个子代理分别处理不同模块
- Plan Mode 中 Claude 会自动将仓库扫描委派给子代理

---

## Headless 模式与 SDK

Headless 模式让 Claude Code 脱离交互界面，以程序化方式运行——这是实现 CI/CD 集成和自动化脚本的基础。

### 基础用法

```bash
# 非交互式执行（核心 flag）
claude -p "分析这个项目中的安全漏洞"

# 指定输出格式
claude -p "列出所有 TODO" --output-format json

# 限制执行范围
claude -p "修复 lint 错误" --max-turns 10 --max-budget-usd 5

# 预授权工具（避免交互确认）
claude -p "运行测试" --allowedTools 'Read' 'Bash(npm test *)'

# Bare 模式（跳过 Hooks/MCP，适合 CI）
claude -p "检查代码质量" --bare
```

### 输出格式

| 格式 | 说明 |
|------|------|
| `text` | 纯文本（默认） |
| `json` | 结构化 JSON |
| `stream-json` | 流式 JSON（实时追踪） |

还可以用 `--json-schema` 强制输出符合指定的 JSON Schema。

### Agent SDK

Anthropic 提供 TypeScript 和 Python SDK，支持将 Claude Code 嵌入你的应用：

```bash
# 安装 SDK
npm install @anthropic-ai/claude-agent-sdk
```

SDK 提供与交互式 Claude Code 完全相同的工具集和代理循环。

### CI/CD 集成

#### GitHub Actions

```yaml
name: Claude Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: anthropics/claude-code-action@v1
        with:
          prompt: |
            审查这个 PR 的代码变更，关注：
            1. 潜在的 bug 和安全问题
            2. 性能影响
            3. 代码风格一致性
          max_turns: 20
```

#### 自动化场景

| 场景 | 命令示例 |
|------|---------|
| PR 自动审查 | `claude -p "审查 PR 变更" --bare` |
| 自动生成 Changelog | `claude -p "根据最近 10 个 commit 生成 CHANGELOG"` |
| 代码质量检查 | `claude -p "分析代码质量并给出改进建议" --json` |
| 漏洞扫描 | `claude -p "检查依赖中的安全漏洞" --max-budget-usd 2` |
| 测试用例生成 | `claude -p "为 src/utils/ 下的函数补充单元测试"` |

### 安全控制

| Flag | 作用 |
|------|------|
| `--max-turns N` | 限制最大交互轮数 |
| `--max-budget-usd N` | 限制 API 费用上限 |
| `--allowedTools` | 预授权工具白名单 |
| `--bare` | 跳过 Hooks/MCP，确保可复现 |

---

## 自定义 Skills

Skills 是比斜杠命令更强大的扩展机制，支持自动发现和丰富的上下文。

### 创建 Skill

```
.claude/skills/
  └── my-skill/
      ├── SKILL.md        # 入口文件，描述 Skill 的触发条件和执行逻辑
      └── templates/      # 可选：模板文件等辅助资源
```

### SKILL.md 示例

```markdown
---
name: commit-and-pr
description: 提交代码并创建 PR 的完整流程
---

# Commit & PR Skill

执行以下步骤：
1. 运行 lint 和测试
2. 生成 commit message（基于 diff）
3. 创建 commit
4. 推送到远程
5. 创建 PR（包含变更摘要和测试计划）
```

调用方式：`/commit-and-pr` 或当 Claude 判断相关时自动触发。

### 常用内置 Skill

| Skill | 作用 |
|-------|------|
| `/batch` | 批量处理多个任务 |
| `/debug` | 系统化调试工作流 |
| `/loop` | 定时循环执行检查 |
| `/simplify` | 简化复杂代码 |

---

## 记忆系统（Auto Memory）

Claude Code 会自动记录跨会话的学习内容，存储在 `~/.claude/projects/*/memory/` 目录。

### 工作原理

- Claude 在交互过程中自动识别值得记忆的模式和偏好
- 每次新会话自动加载前 200 行（或 25KB）的记忆内容
- 无需手动维护，但可以手动编辑和清理

### 记忆层级

```
~/.claude/CLAUDE.md              → 全局偏好（手动）
~/.claude/projects/*/memory/     → 项目记忆（自动）
./CLAUDE.md                      → 项目规范（手动）
./CLAUDE.local.md                → 个人配置（手动）
```

自动记忆补充了 CLAUDE.md 无法覆盖的「经验性」知识，如你的编码习惯、常用工作流和项目特有的模式。
