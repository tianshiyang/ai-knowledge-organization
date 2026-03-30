# ReAct

## 定义

`ReAct` 是“推理 + 行动 + 观察”的循环模式。模型会在每次拿到工具结果后继续判断下一步，而不是只做一次调用。

## 适用场景

- 搜索后再总结
- 多步 API 查询
- 边查边修正路径的问题

## 工作流程

`输入 -> Thought -> Action -> Observation -> 再次 Thought -> ... -> Final Answer`

## 和相邻架构的区别

- 相比 `Tool Calling`，它更强调多轮循环
- 相比 `Plan-and-Execute`，它通常不先给完整计划
- 相比 `Reflection`，它围绕工具观察循环，而不是围绕结果质量循环

## 面试回答话术

“ReAct 适合边查边走的问题。它的关键不是‘会调工具’，而是拿到工具结果后还能继续决定下一步。”

## LangChain 1.0 实现口径

新项目默认从 `create_agent + tools` 开始，不把旧版 `create_react_agent` 作为默认推荐。

```python
from langchain.agents import create_agent


def search_docs(query: str) -> dict:
    """Search docs and return a short summary."""
    return {"query": query, "summary": "LangChain 1.0 推荐用 create_agent 构建 Agent。"}


agent = create_agent(
    model="openai:gpt-4.1",
    tools=[search_docs],
    system_prompt=(
        "你是研究助手。遇到不确定的问题先查工具，"
        "再根据结果判断是否继续查询。"
    ),
)
```

## 工程提醒

- 要限制最大轮数
- 要防止重复低收益调用
- 需要记录工具调用链路方便回放
