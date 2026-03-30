# Agent 面试题的 LangChain 1.0 实现

这组文档专门承接前面的面试题，回答一个最常见的追问：

“如果让你用 Python + LangChain 1.0 实现，你会怎么写？”

## 统一实现口径

- 简单 Agent：`create_agent(model=..., tools=[...], system_prompt=...)`
- 复杂控制流：`LangGraph 的节点 + 条件边 + 结构化状态`
- 默认状态字段：`messages`、`goal`、`plan`、`step_index`、`tool_results`、`route`、`draft`、`review`

## 这组文档回答哪些问题

- Tool Calling 怎么写
- ReAct 怎么写
- Self-Ask 怎么模拟
- Memory 怎么接
- Router / Reflection / Supervisor 什么时候转 LangGraph

## 对应阅读

- 代码模板看 [核心实现模板.md](/Users/icourt1/Desktop/ai-knowledge-organization/AI方法与策略/Agent/Python与LangChain1.0/核心实现模板.md)
- 项目拆法看 [最小工程骨架.md](/Users/icourt1/Desktop/ai-knowledge-organization/AI方法与策略/Agent/Python与LangChain1.0/最小工程骨架.md)
- 工程追问看 [关键工程点.md](/Users/icourt1/Desktop/ai-knowledge-organization/AI方法与策略/Agent/Python与LangChain1.0/关键工程点.md)
- 踩坑问题看 [常见坑.md](/Users/icourt1/Desktop/ai-knowledge-organization/AI方法与策略/Agent/Python与LangChain1.0/常见坑.md)
