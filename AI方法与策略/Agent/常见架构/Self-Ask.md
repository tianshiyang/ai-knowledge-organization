# Self-Ask

## 定义

`Self-Ask` 可以理解为“先把大问题拆成一串子问题，再逐步回答”的模式。它经常和搜索、知识查询结合使用。

## 适用场景

- 一个大问题天然包含多个中间判断
- 需要逐步分解事实链
- 适合边拆边查的任务

## 工作流程

`原问题 -> 生成子问题 -> 回答子问题 -> 汇总 -> 最终答案`

## 和相邻架构的区别

- 相比 `ReAct`，它更强调“问题分解”
- 相比 `Plan-and-Execute`，它更偏问答推理链，而不是完整任务计划
- 相比 `CoT`，它更容易接工具查询

## 面试回答话术

“Self-Ask 适合把复杂问题拆成一串更小的问题来求解。工程上它经常表现成‘先追问自己，再查工具’。”

## LangChain 1.0 实现口径

LangChain 1.0 里没有必要追求一个专门的 Self-Ask 构造器。更实用的方式是：

- 用 `create_agent` 让模型先分解再查工具
- 或者用 `LangGraph` 把“分解问题 -> 查询 -> 汇总”做成显式节点

```python
from langchain.agents import create_agent


def search_fact(question: str) -> dict:
    """Search a fact needed to answer a sub-question."""
    return {"question": question, "answer": "这是子问题的查询结果"}


agent = create_agent(
    model="openai:gpt-4.1",
    tools=[search_fact],
    system_prompt=(
        "你是分析助手。先把复杂问题拆成更小的子问题，"
        "对不确定的子问题调用工具查询，再整合最终答案。"
    ),
)
```

## 工程提醒

- 子问题数量要控制
- 不要让问题分解无限扩散
- 更适合查询型任务，不一定适合高副作用任务
