# 常见 Agent 架构总览

这组内容按“面试会怎么问架构题”的方式整理，而不是按学术分类穷举。

## 主架构

下面这些是工程面试里最常见、最值得讲清楚的主架构：

| 架构 | 核心特点 | 典型实现 |
| --- | --- | --- |
| `Tool Calling` | 单 Agent 按需调用工具 | `create_agent + tools` |
| `ReAct` | 推理-行动-观察循环 | `create_agent + tools` |
| `Self-Ask` | 把大问题拆成小问题逐步求解 | `create_agent` 或图编排 |
| `Plan-and-Execute / Plan-and-Solve` | 先计划，再执行 | `LangGraph` |
| `Router` | 先分流到对应链路 | `LangGraph` |
| `Reflection` | 生成-评审-修订 | `LangGraph` |
| `Supervisor / Multi-Agent` | 多角色协作，由主 Agent 调度 | `supervisor + subagent tools` |

## 推理增强技巧

下面这些经常和 Agent 一起被问到，但更适合被描述为“推理策略 / 提示策略”：

- `CoT`
- `ToT`
- `Prompt Chaining`

它们和 `ReAct`、`Router`、`Supervisor` 不是同一层概念。

## 推荐阅读顺序

1. [单Agent与Tool Calling.md](/Users/icourt1/Desktop/ai-knowledge-organization/AI方法与策略/Agent/常见架构/单Agent与Tool Calling.md)
2. [ReAct.md](/Users/icourt1/Desktop/ai-knowledge-organization/AI方法与策略/Agent/常见架构/ReAct.md)
3. [Self-Ask.md](/Users/icourt1/Desktop/ai-knowledge-organization/AI方法与策略/Agent/常见架构/Self-Ask.md)
4. [Plan-and-Execute.md](/Users/icourt1/Desktop/ai-knowledge-organization/AI方法与策略/Agent/常见架构/Plan-and-Execute.md)
5. [Router.md](/Users/icourt1/Desktop/ai-knowledge-organization/AI方法与策略/Agent/常见架构/Router.md)
6. [Reflection.md](/Users/icourt1/Desktop/ai-knowledge-organization/AI方法与策略/Agent/常见架构/Reflection.md)
7. [多Agent与Supervisor.md](/Users/icourt1/Desktop/ai-knowledge-organization/AI方法与策略/Agent/常见架构/多Agent与Supervisor.md)
8. [Prompt与推理策略.md](/Users/icourt1/Desktop/ai-knowledge-organization/AI方法与策略/Agent/常见架构/Prompt与推理策略.md)

## 面试里的推荐说法

比较稳的一种回答方式是：

“我会先从单 Agent + tools 起步，只有当任务显式出现多轮探索、规划、路由、反思、人审或多角色协作需求时，才逐步升级到 LangGraph 或多 Agent。”
