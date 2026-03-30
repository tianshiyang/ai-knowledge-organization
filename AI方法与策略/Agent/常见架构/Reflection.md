# Reflection

## 定义

`Reflection` 是“生成 -> 评审 -> 修订”的质量闭环。

## 适用场景

- 报告、方案、合同等高质量文本输出
- 代码生成后的自检
- 结构化抽取后的校验

## 工作流程

`draft -> critic -> revise -> critic -> ... -> finish`

## 和相邻架构的区别

- 相比 `ReAct`，它围绕质量闭环，不围绕工具观察
- 相比 `Plan-and-Execute`，它关注输出修订，不关注任务拆解

## 面试回答话术

“Reflection 的关键不是多跑一轮模型，而是明确评审标准，让系统知道为什么要改、改什么。”

## LangChain 1.0 实现口径

这类模式最适合用 `LangGraph` 建闭环。

```python
from typing import TypedDict

from langgraph.graph import END, StateGraph


class ReviewState(TypedDict, total=False):
    draft: str
    review: list[str]
    passed: bool
    round: int


def draft_node(state: ReviewState) -> ReviewState:
    return {**state, "draft": "这是第一版答案"}


def critic_node(state: ReviewState) -> ReviewState:
    issues = [] if state.get("round", 0) > 0 else ["缺少风险说明"]
    return {**state, "review": issues, "passed": len(issues) == 0}


def revise_node(state: ReviewState) -> ReviewState:
    return {
        **state,
        "draft": state["draft"] + "；已补充风险说明",
        "round": state.get("round", 0) + 1,
    }


graph = StateGraph(ReviewState)
graph.add_node("draft", draft_node)
graph.add_node("critic", critic_node)
graph.add_node("revise", revise_node)
graph.set_entry_point("draft")
graph.add_edge("draft", "critic")
graph.add_conditional_edges("critic", lambda s: "finish" if s["passed"] else "revise", {
    "finish": END,
    "revise": "revise",
})
graph.add_edge("revise", "critic")
```

## 工程提醒

- 必须限制最大轮数
- 评审标准尽量结构化
- 没标准的反思很容易空转
