# 多 Agent 与 Supervisor

## 定义

这是一种由主 Agent 协调多个专长 Agent 的模式。主 Agent 负责调度，子 Agent 负责各自领域任务。

## 适用场景

- 能力域差异很大
- 权限边界很强
- 需要跨域持续协作

## 工作流程

`用户目标 -> supervisor 理解任务 -> 分派子 Agent -> 聚合结果 -> 决定是否继续调度 -> 输出答案`

## 和相邻架构的区别

- 相比 `Router`，它不是只分发一次
- 相比 `Plan-and-Execute`，它更强调“谁来做”而不是“先做哪一步”

## 面试回答话术

“我不会默认上多 Agent。只有当能力域、权限域和协作复杂度都明显上来时，我才会考虑 Supervisor。”

## LangChain 1.0 实现口径

常见做法是把子 Agent 包装成 tool。

```python
from langchain.agents import create_agent


calendar_agent = create_agent(
    model="openai:gpt-4.1-mini",
    tools=[],
    system_prompt="你是日历助手，只处理日程安排。",
)


email_agent = create_agent(
    model="openai:gpt-4.1-mini",
    tools=[],
    system_prompt="你是邮件助手，只处理邮件起草。",
)


def call_calendar_agent(query: str) -> str:
    """Use the calendar specialist."""
    result = calendar_agent.invoke({"messages": [{"role": "user", "content": query}]})
    return str(result)


def call_email_agent(query: str) -> str:
    """Use the email specialist."""
    result = email_agent.invoke({"messages": [{"role": "user", "content": query}]})
    return str(result)


supervisor = create_agent(
    model="openai:gpt-4.1",
    tools=[call_calendar_agent, call_email_agent],
    system_prompt=(
        "你是总协调助手。根据任务选择合适子助手，"
        "必要时多次调用并整合结果。"
    ),
)
```

## 工程提醒

- 上下文传递要清晰
- 子 Agent 输入输出边界要稳定
- 高风险动作要有人审
