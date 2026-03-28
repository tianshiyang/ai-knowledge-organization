# Agent

这篇文档用于梳理 AI 应用里最常见的 Agent 模式，重点回答三个问题：

- 这个模式是什么，适合什么场景
- 它在运行时是怎么工作的
- 用 LangChain 1.0 应该怎么实现

本文不追求学术穷举，而是聚焦工程上最常见、最值得落地的模式。默认实现语言为 `Python`，默认以 `LangChain 1.0 + LangGraph` 的官方口径来解释。

## 一句话结论

- `ReAct` 很经典，但它不是唯一的 Agent 模式。
- LangChain 1.0 里推荐入口是 `create_agent(...)`，不是旧版 `create_react_agent`。
- 很多问题用“单 Agent + tools”已经够了，不需要一上来就多 Agent。
- 模式越复杂，本质上越依赖“显式状态流 + 控制流”，而不是多写几个 prompt。
- 当你需要更稳定的编排能力时，应从纯 Agent 转向 `LangGraph workflow`。

## 1. Agent 模式总述

广义上，Agent 是一种“让模型在目标驱动下持续决策”的运行方式。它不只是生成一次答案，而是在任务未完成前，持续判断下一步该做什么：

- 直接回答
- 调用工具
- 读取工具结果
- 拆分任务
- 反思修正
- 把子任务交给别的 Agent

所以，Agent 的核心不是“会聊天”，而是：

- 有目标
- 有可调用能力
- 有中间状态
- 有循环或工作流
- 有结束条件

一个最小可用 Agent 通常至少包含：

- `model`：负责推理和决策
- `tools`：负责访问外部世界
- `state`：负责保存本轮运行中的上下文和中间结果
- `stop condition`：决定什么时候结束

## 2. 为什么不是所有任务都该 Agent 化

不是所有问题都适合上 Agent。下面这些场景往往不需要：

- 输入固定、输出固定，普通 prompt 或模板就能解决
- 流程稳定、步骤明确，用普通 workflow 更便宜更稳定
- 对时延极敏感，容不下多轮推理和工具调用
- 风险很高，但又没有加校验、人审、回退机制

更适合 Agent 化的任务通常有这些特征：

- 目标明确，但路径不固定
- 需要根据中间结果动态决定下一步
- 需要调用外部工具、知识源或系统
- 任务步骤较长，且可能中途失败、重试或改道

可以先用一个经验法则判断：

- 如果你已经知道完整流程，优先用 `workflow`
- 如果你只知道目标，不知道模型在中间要怎么决策，才考虑 `agent`

## 3. 常见模式总表

| 模式 | 核心思想 | 典型场景 | 复杂度 | LangChain 1.0 推荐实现 |
| --- | --- | --- | --- | --- |
| `Tool Calling` | 单 Agent 根据需要调用工具 | FAQ + 查询、简单操作助手 | 低 | `create_agent + tools` |
| `ReAct` | 推理、行动、观察循环 | 搜索、查询、调 API、逐步求解 | 低到中 | `create_agent + tools` |
| `Plan-and-Execute` | 先规划，再逐步执行 | 长任务、多步骤任务 | 中 | `planner + executor`，推荐 LangGraph |
| `Router` | 先分类，再分发 | 多领域入口、多知识源分流 | 中 | 路由节点 + 目标 agent / chain |
| `Reflection` | 生成后再审查和修正 | 高正确性、高质量输出 | 中到高 | 生成节点 + 评审节点 + 修正节点 |
| `Supervisor / Subagents` | 主 Agent 协调多个专长子 Agent | 多团队能力协作、复杂任务拆分 | 高 | supervisor + subagent tools，推荐 LangGraph |

## 4. 常见模式详解

下面按从简单到复杂的顺序展开。

### 4.1 Tool Calling / 单 Agent 工具调用

#### 定义

最基础的 Agent 模式。模型先理解用户目标，再决定是否调用某个工具；如果不需要工具，就直接回答。

它可以没有复杂规划，也可以没有多轮显式反思，但已经具备 Agent 的基本能力。

#### 适用场景

- 客服助手查询订单、物流、账号状态
- 企业助手查询知识库、数据库、工单系统
- 简单自动化助手调用天气、日历、搜索、发消息等工具

#### 不适用场景

- 任务很长，需要先整体规划
- 需要明确的多阶段质量审查
- 多领域能力差异很大，需要先做路由

#### 运行机制

典型流程如下：

`用户输入 -> 模型判断是否需要工具 -> 调用工具 -> 读取结果 -> 组织最终答案 -> 结束`

状态变化通常很简单：

- 输入进入消息状态
- 工具调用结果追加到消息状态
- 模型基于当前状态输出最终答复

结束条件也简单：

- 模型给出 final answer
- 或达到最大迭代次数

#### 优点

- 最容易落地
- 成本低、时延低
- 足以覆盖大量“查一查、做一步”的业务需求

#### 风险与成本

- 工具太多时，模型容易选错
- 复杂任务容易在中间迷路
- 缺少显式规划时，可解释性一般

#### 与其他模式的区别

- 它是最小基线，不强调显式“思考-行动-观察”循环
- 和 `ReAct` 相比，它可以更轻，但推理过程通常没那么显式

#### LangChain 1.0 实现方式

首选 `create_agent(model=..., tools=[...])`。

- `tools` 表达外部能力
- `middleware` 负责横切逻辑，如重试、动态模型、审计
- `state` / `runtime` 可以向工具注入用户态、会话态、依赖对象

#### 最小伪代码

```python
from langchain.agents import create_agent

def get_order_status(order_id: str) -> str:
    """查询订单状态"""
    return f"订单 {order_id} 当前状态为：已发货"

agent = create_agent(
    model="openai:gpt-4.1",
    tools=[get_order_status],
    system_prompt="你是企业客服助手，需要在必要时调用工具。"
)

result = agent.invoke(
    {"messages": [{"role": "user", "content": "帮我查一下 A123 的订单状态"}]}
)
```

### 4.2 ReAct

#### 定义

`ReAct` 指的是 `Reason + Act`，工程上通常可理解为“推理 + 行动 + 观察”的循环。模型不是只决定一次要不要调工具，而是在每次拿到工具结果后，继续判断下一步。

它是最经典的 Agent 执行模式之一，但不是所有 Agent 的总称。

#### 适用场景

- 搜索后再总结
- 多步 API 查询
- 查询一轮结果后决定是否继续查下一步
- 需要边看结果边修正路径的问题求解

#### 不适用场景

- 流程已经固定，直接 workflow 更合适
- 输出必须高度确定，不允许模型自由探索
- 工具调用代价很高，不适合多轮试探

#### 运行机制

典型闭环如下：

`用户输入 -> 模型判断 -> 调工具 -> 读取 Observation -> 再判断 -> 输出最终答案`

更展开一点是：

1. 模型读入当前任务与历史状态
2. 决定当前是直接回答，还是调用某个工具
3. 如果调用工具，把工具结果写回状态
4. 模型再次读取新状态，判断是否还需要继续行动
5. 当模型认为信息足够时，输出最终答案并结束

结束条件通常是：

- 输出 final answer
- 或达到 `max_iterations`

#### 优点

- 灵活，适合动态探索
- 比一次性回答更能利用外部工具
- 比纯 workflow 更适合路径不固定的问题

#### 风险与成本

- 多轮循环会增加成本和时延
- 工具选择错误会逐步放大偏差
- 如果工具返回噪声，模型可能陷入无效循环

#### 与其他模式的区别

- 和 `Tool Calling` 的区别是：它更强调循环和 Observation 驱动的后续决策
- 和 `Plan-and-Execute` 的区别是：它不一定先做整体规划，而是边走边判断

#### LangChain 1.0 实现方式

在 LangChain 1.0 中，推荐直接用 `create_agent(...)` 实现这类模式。官方把它统一到新的 agent 入口里，而不是继续推荐旧的 `create_react_agent`。

工程上可以这样理解：

- 如果你只是需要“会多轮工具调用的 Agent”，用 `create_agent + tools`
- 如果你需要精细控制循环、状态与分支，再下沉到 LangGraph

#### 最小伪代码

```python
from langchain.agents import create_agent

def search_docs(query: str) -> str:
    """搜索文档"""
    return f"关于 {query} 的搜索结果：..."

def get_price(product: str) -> str:
    """查询价格"""
    return f"{product} 当前价格为 199 元"

agent = create_agent(
    model="openai:gpt-4.1",
    tools=[search_docs, get_price],
    system_prompt=(
        "你是研究助手。遇到不确定的信息时先查工具，"
        "拿到结果后再判断是否继续查，最后给出结论。"
    ),
)

result = agent.invoke(
    {"messages": [{"role": "user", "content": "先查 LangChain 1.0 的 agent 入口，再告诉我实现推荐"}]}
)
```

### 4.3 Plan-and-Execute

#### 定义

`Plan-and-Execute` 是“先规划，再执行”的模式。模型先产出一个任务计划，再由执行器逐步完成每一步。

它的重点不是自由探索，而是把长任务拆成更可控的阶段。

#### 适用场景

- 研究报告生成
- 跨多个系统的长流程任务
- 软件交付中的“先分析、再实现、再验证”
- 用户目标很大，不适合一次直接做完

#### 不适用场景

- 简短问题，一次工具调用就能解决
- 环境变化太快，初始计划很快失效
- 对时延要求高，容不下规划阶段

#### 运行机制

典型流程如下：

`用户目标 -> planner 生成计划 -> executor 执行步骤 1 -> 写回结果 -> 执行步骤 2 -> ... -> 汇总 -> 结束`

状态里通常会出现：

- 原始目标
- 任务计划
- 当前步骤索引
- 每一步执行结果
- 失败记录或重试记录

结束条件通常是：

- 所有计划步骤完成
- 或某一步失败且无法恢复
- 或 planner 触发重新规划后达到上限

#### 优点

- 可控性强
- 比纯 ReAct 更适合长任务
- 中间过程更易审计、更适合插入人工确认

#### 风险与成本

- 规划质量直接影响整体结果
- 初始计划可能不够稳，需要重规划
- 比单 Agent 模式更重，延迟更高

#### 与其他模式的区别

- 和 `ReAct` 相比，它先有整体计划，再逐步执行
- 和 `Supervisor` 相比，它强调阶段化任务推进，不一定需要多个专长 Agent

#### LangChain 1.0 实现方式

推荐思路是：

- `planner` 负责任务拆解
- `executor` 负责执行当前步骤
- 用 LangGraph 把“规划 -> 执行 -> 检查是否继续”串起来

如果只用单个 `create_agent`，也能用 prompt 模拟“先列计划再执行”，但稳定性通常不如显式工作流。

#### 最小伪代码

```python
from langgraph.graph import StateGraph, END

class TaskState(dict):
    pass

def planner(state: TaskState) -> TaskState:
    state["plan"] = [
        "收集需求背景",
        "整理方案结构",
        "生成初稿",
        "检查缺漏"
    ]
    state["step_index"] = 0
    state["results"] = []
    return state

def executor(state: TaskState) -> TaskState:
    current_step = state["plan"][state["step_index"]]
    state["results"].append(f"已完成：{current_step}")
    state["step_index"] += 1
    return state

def route_after_execute(state: TaskState) -> str:
    return "executor" if state["step_index"] < len(state["plan"]) else "finish"

graph = StateGraph(TaskState)
graph.add_node("planner", planner)
graph.add_node("executor", executor)
graph.set_entry_point("planner")
graph.add_edge("planner", "executor")
graph.add_conditional_edges("executor", route_after_execute, {
    "executor": "executor",
    "finish": END,
})
```

### 4.4 Router

#### 定义

`Router` 模式本质是“先判断任务属于哪一类，再分发给对应处理单元”。它更像一个智能入口层，而不是多 Agent 自主协作。

#### 适用场景

- 用户问题可能属于售前、售后、财务、技术支持中的任意一种
- 不同领域对应不同知识库、工具集或子 Agent
- 同一入口需要把请求送到不同工作流

#### 不适用场景

- 所有任务都可由同一 Agent 高质量完成
- 分类标准不清晰，路由收益不大
- 请求往往跨多个领域，硬切分反而造成割裂

#### 运行机制

典型流程如下：

`用户输入 -> 路由判断 -> 选择目标链路 -> 目标链路执行 -> 返回结果 -> 结束`

状态里常见的信息有：

- 原始请求
- 路由标签
- 目标 handler / agent 名称
- 执行结果

结束条件通常很简单：

- 目标链路执行完成并返回

#### 优点

- 降低单个 Agent 的复杂度
- 让不同领域能力更清晰
- 更适合权限隔离、知识隔离、团队分工

#### 风险与成本

- 路由错了，后面全错
- 需要维护分类标准
- 复杂请求可能需要跨路由协同

#### 与其他模式的区别

- 和 `Supervisor` 的区别是：Router 更像“一次性分流”，Supervisor 更像“持续协调”
- 和 `Tool Calling` 的区别是：Router 先选处理路径，而不是让一个 Agent 自己持有所有能力

#### LangChain 1.0 实现方式

推荐在 LangGraph 里显式做一个路由节点：

- 路由节点先输出分类结果
- 根据结果进入不同 agent、chain 或 workflow
- 对分类稳定性要求高时，可把路由做成结构化输出

#### 最小伪代码

```python
from langgraph.graph import StateGraph, END

class RouterState(dict):
    pass

def router(state: RouterState) -> RouterState:
    text = state["query"]
    if "报销" in text or "发票" in text:
        state["route"] = "finance"
    elif "bug" in text or "报错" in text:
        state["route"] = "tech"
    else:
        state["route"] = "general"
    return state

def finance_handler(state: RouterState) -> RouterState:
    state["answer"] = "进入财务处理链路"
    return state

def tech_handler(state: RouterState) -> RouterState:
    state["answer"] = "进入技术支持链路"
    return state

def general_handler(state: RouterState) -> RouterState:
    state["answer"] = "进入通用问答链路"
    return state

graph = StateGraph(RouterState)
graph.add_node("router", router)
graph.add_node("finance", finance_handler)
graph.add_node("tech", tech_handler)
graph.add_node("general", general_handler)
graph.set_entry_point("router")
graph.add_conditional_edges("router", lambda s: s["route"], {
    "finance": "finance",
    "tech": "tech",
    "general": "general",
})
graph.add_edge("finance", END)
graph.add_edge("tech", END)
graph.add_edge("general", END)
```

### 4.5 Reflection / Critic-Self-Refine

#### 定义

`Reflection` 模式是在首次生成结果后，再增加一个“审查、批评、修正”的回路。它不只是让模型多生成一次，而是让系统显式区分：

- 生成者
- 评审者
- 修正者

有时这三个角色可以是同一个模型扮演，有时也可以拆成不同节点。

#### 适用场景

- 合同、报告、方案等高质量文本生成
- 代码生成后做自检
- 结构化抽取后做一致性检查
- 高正确性、高完整性要求的输出

#### 不适用场景

- 低时延场景
- 任务本身很简单，反思成本大于收益
- 没有清晰评判标准时，反思可能只是在“自我重复”

#### 运行机制

典型流程如下：

`用户目标 -> 生成初稿 -> critic 评审 -> 如果不通过则修正 -> 再评审 -> 通过后输出`

状态里通常需要保存：

- 初稿
- 评审意见
- 修订稿
- 当前轮次
- 是否通过

结束条件通常是：

- 达到质量门槛
- 或达到最大反思轮数

#### 优点

- 能明显提升正确性、完整性和表达质量
- 更适合和规则校验、人工审核结合
- 对高价值输出很有帮助

#### 风险与成本

- 成本更高，时延更长
- 如果评审标准不清晰，容易空转
- 有时会“越改越散”

#### 与其他模式的区别

- 和 `ReAct` 的区别是：ReAct 的循环围绕“工具观察”，Reflection 的循环围绕“结果质量”
- 和 `Plan-and-Execute` 的区别是：它关注产出修正，而不是任务规划

#### LangChain 1.0 实现方式

推荐使用 LangGraph 建一个简单闭环：

- `draft_node`
- `critic_node`
- `revise_node`
- 条件边决定是否继续

如果需要更强可控性，可以把评审结果结构化成：

- `pass/fail`
- `issues`
- `revision_instructions`

#### 最小伪代码

```python
from langgraph.graph import StateGraph, END

class ReviewState(dict):
    pass

def draft(state: ReviewState) -> ReviewState:
    state["draft"] = "这是第一版输出"
    return state

def critic(state: ReviewState) -> ReviewState:
    state["issues"] = ["缺少风险说明"] if state.get("round", 0) == 0 else []
    state["passed"] = len(state["issues"]) == 0
    return state

def revise(state: ReviewState) -> ReviewState:
    state["draft"] = state["draft"] + "；已补充风险说明"
    state["round"] = state.get("round", 0) + 1
    return state

graph = StateGraph(ReviewState)
graph.add_node("draft", draft)
graph.add_node("critic", critic)
graph.add_node("revise", revise)
graph.set_entry_point("draft")
graph.add_edge("draft", "critic")
graph.add_conditional_edges("critic", lambda s: "finish" if s["passed"] else "revise", {
    "finish": END,
    "revise": "revise",
})
graph.add_edge("revise", "critic")
```

### 4.6 Supervisor / Subagents

#### 定义

`Supervisor` 模式是由一个主 Agent 负责协调多个专长子 Agent。主 Agent 不直接掌握所有细节，而是把任务交给最合适的子 Agent，再汇总结果。

这是一种典型的多 Agent 架构。

#### 适用场景

- 日历、邮件、搜索、财务等能力差异很大
- 一个系统里工具过多，不适合全塞给单 Agent
- 希望团队按能力域维护不同 Agent
- 需要部分任务并行或隔离上下文

#### 不适用场景

- 问题很简单，单 Agent 足够
- 子 Agent 边界不清晰，拆分后反而更乱
- 没有统一的协调策略，容易互相推诿

#### 运行机制

典型流程如下：

`用户目标 -> supervisor 理解整体任务 -> 选择/调用子 Agent -> 子 Agent 完成子任务 -> supervisor 决定是否继续分派 -> 汇总结果 -> 结束`

状态里经常包括：

- 全局目标
- 已分派的子任务
- 各子 Agent 返回结果
- 当前整体进度
- 是否需要人工确认

结束条件通常是：

- 所有必要子任务完成
- supervisor 输出最终整合结果

#### 优点

- 适合复杂系统的能力分层
- 便于维护专长边界
- 有利于权限控制、上下文隔离和团队协作

#### 风险与成本

- 编排复杂度高
- 子 Agent 之间上下文传递容易失真
- 成本、时延、故障面都更高

#### 与其他模式的区别

- 和 `Router` 的区别是：Router 常常只分发一次，Supervisor 会持续协调
- 和 `Plan-and-Execute` 的区别是：它强调“谁来做”，而不只是“先做哪一步”

#### LangChain 1.0 实现方式

官方推荐的常见做法是：把 `subagent` 包装成 `tool`，让 `supervisor agent` 进行调用。

也就是说：

- 子 Agent 对外暴露成一个可调用接口
- 主 Agent 根据任务需要决定何时调用哪个子 Agent
- 复杂编排下推荐直接使用 LangGraph 来管理状态和流转

如果任务带外部动作风险，比如发邮件、提交审批、执行写操作，可以在关键边上加 `human-in-the-loop` 审批点。

#### 最小伪代码

```python
from langchain.agents import create_agent

calendar_agent = create_agent(
    model="openai:gpt-4.1-mini",
    tools=[],
    system_prompt="你是日历助手，只处理日程安排相关问题。"
)

email_agent = create_agent(
    model="openai:gpt-4.1-mini",
    tools=[],
    system_prompt="你是邮件助手，只处理邮件起草与发送建议。"
)

def call_calendar_agent(query: str) -> str:
    result = calendar_agent.invoke(
        {"messages": [{"role": "user", "content": query}]}
    )
    return str(result)

def call_email_agent(query: str) -> str:
    result = email_agent.invoke(
        {"messages": [{"role": "user", "content": query}]}
    )
    return str(result)

supervisor = create_agent(
    model="openai:gpt-4.1",
    tools=[call_calendar_agent, call_email_agent],
    system_prompt=(
        "你是总协调助手。需要根据任务选择日历助手或邮件助手，"
        "必要时多次调用，再给出统一结论。"
    ),
)
```

## 5. LangChain 1.0 实现映射

下面给一个实用的映射关系，帮助快速选型。

### 5.1 单 Agent 场景

如果需求是：

- 问答
- 查询
- 少量工具调用
- 不需要显式工作流

优先从 `create_agent(...)` 开始：

```python
from langchain.agents import create_agent

agent = create_agent(
    model="openai:gpt-4.1",
    tools=[...],
    system_prompt="..."
)
```

这类场景里：

- `tools` 表示外部能力
- `middleware` 表示模型选择、重试、鉴权、审计等横切逻辑
- `runtime` / `context` / `state` 表示运行时注入与短期状态访问

### 5.2 复杂工作流场景

如果需求开始出现下面这些信号，就应考虑 LangGraph：

- 要先规划再执行
- 要显式路由
- 要加反思闭环
- 要多个 Agent 协同
- 要人审节点
- 要把状态结构化保存下来

这时推荐用“图”的思维来实现：

- 节点：planner、router、executor、critic、supervisor
- 边：正常流转、失败重试、条件分支、人工审批
- 状态：任务目标、计划、工具结果、审查意见、子任务结果

### 5.3 推荐映射表

| 需求 | 推荐起点 |
| --- | --- |
| 单轮或少量多轮工具调用 | `create_agent + tools` |
| 典型 ReAct 循环 | `create_agent + tools` |
| 先规划再执行 | `LangGraph` |
| 多路分类后转发 | `LangGraph router` |
| 生成后审查修订 | `LangGraph reflection loop` |
| 多 Agent 协同 | `supervisor + subagents`，通常配合 `LangGraph` |

## 6. 选型建议与落地顺序

实际做项目时，建议按下面顺序递进，而不是一开始就冲复杂架构：

1. 先做 `Tool Calling`
2. 如果出现明显的多轮探索需求，再升级到 `ReAct`
3. 如果任务变长、可解释性要求变高，再上 `Plan-and-Execute`
4. 如果入口复杂、领域分散，再补 `Router`
5. 如果输出质量要求很高，再加 `Reflection`
6. 如果能力域很多、组织协作复杂，再考虑 `Supervisor / Subagents`

可以用一句话辅助判断：

- 任务简单时，减少 Agent
- 任务复杂时，先显式工作流，再考虑多 Agent

## 7. 常见误区

### 误区 1：ReAct 就是 Agent

不是。`ReAct` 只是 Agent 体系里最经典的一种执行循环。

### 误区 2：多 Agent 一定比单 Agent 高级

不是。多 Agent 只是更复杂，不天然更好。很多业务里，“单 Agent + tools”反而是最优解。

### 误区 3：复杂模式就是多写几个 prompt

不是。真正让系统稳定的是状态设计、节点职责、条件边和结束条件。

### 误区 4：所有场景都应该上 LangGraph

也不是。能用 `create_agent` 解决的，就不要过度设计。

### 误区 5：Reflection 一定提升质量

不一定。如果没有明确评审标准，反思只会增加成本，不一定增加价值。

## 8. 模式之间的关键区别

### ReAct 和 Tool Calling 有什么关系

`Tool Calling` 是更泛的能力描述，表示 Agent 可以调用工具。`ReAct` 是一种更具体的运行循环，强调模型在每次工具 Observation 后继续判断下一步。

可以理解为：

- `Tool Calling` 是能力层
- `ReAct` 是执行策略层

### Router 和 Supervisor 有什么区别

- `Router` 是“先判断归类，再送到某条处理链路”
- `Supervisor` 是“持续协调多个子 Agent 共同完成任务”

前者更像智能分流，后者更像总控调度。

### 什么情况下要用 Plan-and-Execute

当任务比较长、需要显式步骤、希望中间过程可检查可插手时，就该考虑 `Plan-and-Execute`。

### Reflection 为什么会增加成本

因为它至少增加了一轮“评审”，很多时候还会增加一轮“修正”和再次评审，所以 token、延迟和系统复杂度都会上升。

### 为什么 LangChain 1.0 下复杂模式通常要借助 LangGraph

因为复杂模式的本质是显式控制流和状态流，而 LangGraph 更适合表达：

- 多节点
- 条件分支
- 回路
- 人工介入
- 结构化状态管理

## 9. 附录：补充但不是本文重点的模式

### Handoffs

把当前对话控制权从一个 Agent 转交给另一个 Agent，更强调“谁接管会话”，常见于客服转人工、专家接管等场景。

### Skills / 动态上下文装载

在运行时按任务装载特定能力说明、领域规则或操作手册，本质上更像上下文管理策略，而不是独立 Agent 模式。

### 完全自定义 Workflow

有些系统并不追求通用 Agent，而是把模型嵌入固定工作流中。此时模型只是某些节点的智能决策器，而整个系统仍以 workflow 为主。

## 10. 参考口径

本文的 LangChain 1.0 口径基于官方当前推荐方向整理：

- `create_agent(...)` 是标准 Agent 构建入口
- Agent 运行时底层建立在 `LangGraph` 之上
- `create_react_agent` 属于旧入口，不作为新项目默认推荐
- 多 Agent、路由、反思、计划执行等复杂模式更适合用图式编排实现
