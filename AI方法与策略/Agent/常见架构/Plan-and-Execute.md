# Plan-and-Execute

## 定义

这是“先规划，再执行”的长任务模式，也可以顺带提到 `Plan-and-Solve` 这类先拆步骤再求解的思路。

## 适用场景

- 调研报告
- 跨系统长流程任务
- 需要中间过程可检查的复杂任务

## 工作流程

`目标 -> planner 生成计划 -> executor 执行步骤 -> 检查是否完成或重规划 -> 结束`

## 和相邻架构的区别

- 相比 `ReAct`，它更强调先有整体计划
- 相比 `Self-Ask`，它更偏任务计划而不是问题分解
- 相比 `Supervisor`，它强调步骤推进，不强调角色协作

## 面试回答话术

“如果任务明显比较长，而且中间过程需要可检查、可重试、可插手，我会优先考虑 Plan-and-Execute。”

## LangChain 1.0 实现口径

这类模式更适合直接用 `LangGraph`。

```python
from typing import TypedDict

from langgraph.graph import END, StateGraph


class TaskState(TypedDict, total=False):
    goal: str
    plan: list[str]
    step_index: int
    tool_results: list[str]


def planner(state: TaskState) -> TaskState:
    return {
        **state,
        "plan": ["收集资料", "整理要点", "输出答案"],
        "step_index": 0,
        "tool_results": [],
    }


def executor(state: TaskState) -> TaskState:
    plan = state["plan"]
    index = state["step_index"]
    tool_results = state["tool_results"] + [f"已完成: {plan[index]}"]
    return {**state, "step_index": index + 1, "tool_results": tool_results}


def next_step(state: TaskState) -> str:
    return "executor" if state["step_index"] < len(state["plan"]) else "finish"


graph = StateGraph(TaskState)
graph.add_node("planner", planner)
graph.add_node("executor", executor)
graph.set_entry_point("planner")
graph.add_edge("planner", "executor")
graph.add_conditional_edges("executor", next_step, {"executor": "executor", "finish": END})
```

## 工程提醒

- 计划不要太长
- 要允许重规划
- 执行失败要有降级路径
