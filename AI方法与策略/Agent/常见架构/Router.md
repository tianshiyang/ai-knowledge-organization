# Router

## 定义

`Router` 是“先分类，再分发”的架构，本质上是智能分流层。

## 适用场景

- 一个入口承接财务、技术支持、知识问答等不同领域请求
- 不同领域有不同工具集或链路

## 工作流程

`输入 -> 路由判断 -> 进入目标链路 -> 返回结果`

## 和相邻架构的区别

- 相比 `Supervisor`，Router 通常只分发一次
- 相比 `Tool Calling`，Router 先选链路，而不是直接自己持有全部能力

## 面试回答话术

“Router 更像智能入口，不等于多 Agent 协作。它适合做分流，不一定适合做持续调度。”

## LangChain 1.0 实现口径

最适合用 `LangGraph` 的条件边来做。

```python
from typing import TypedDict

from langgraph.graph import END, StateGraph


class RouterState(TypedDict, total=False):
    query: str
    route: str
    answer: str


def router(state: RouterState) -> RouterState:
    query = state["query"]
    if "发票" in query or "报销" in query:
        route = "finance"
    else:
        route = "general"
    return {**state, "route": route}


def finance(state: RouterState) -> RouterState:
    return {**state, "answer": "进入财务链路"}


def general(state: RouterState) -> RouterState:
    return {**state, "answer": "进入通用链路"}


graph = StateGraph(RouterState)
graph.add_node("router", router)
graph.add_node("finance", finance)
graph.add_node("general", general)
graph.set_entry_point("router")
graph.add_conditional_edges("router", lambda s: s["route"], {
    "finance": "finance",
    "general": "general",
})
graph.add_edge("finance", END)
graph.add_edge("general", END)
```

## 工程提醒

- 最好有兜底路由
- 路由结果最好结构化
- 跨域请求过多时要考虑升级到 Supervisor
