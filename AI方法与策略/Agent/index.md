# Agent 面试专题

这组内容参考“面试题汇总”的组织方式来重做，不再把 `Agent` 写成一篇偏百科式的模式总览，而是改成更贴近真实面试问法的专题入口。

这次专题只聚焦 `Agent核心+相邻题`：

- 什么是 Agent，核心组件有哪些
- 常见 Agent 架构有哪些
- Memory 怎么设计
- Tool Use 怎么做，怎么选工具
- 多 Agent 什么时候有必要
- 如何评估 Agent
- Agent 安全与权限控制
- LangChain Agent 如何工作
- ReAct、Self-Ask、Prompt Chaining 这些概念怎么区分

明确不展开：

- 微调
- 蒸馏
- 训练阶段细节

默认实现口径统一为：

- `Python`
- `LangChain 1.0`
- 复杂控制流用 `LangGraph`

## 阅读顺序

建议按面试节奏来读：

1. 先看 `面试题总览/index.md`
2. 再看 `面试题总览/高频题清单.md`
3. 接着看 `常见架构/index.md`
4. 最后看 `Python与LangChain1.0/index.md`

## 目录分工

- `面试题总览`
  负责按题目来整理答案、追问点和系统设计题
- `常见架构`
  负责把 `Tool Calling`、`ReAct`、`Self-Ask`、`Plan-and-Execute`、`Router`、`Reflection`、`Supervisor` 这些概念讲清楚
- `Python与LangChain1.0`
  负责把前面的题和架构，映射成“面试里能讲清楚的实现方式”

## 这组文档的写法原则

后面所有文档都尽量统一成下面这种表达：

1. 先给 `结论`
2. 再讲 `适用场景`
3. 再讲 `工作流程`
4. 再讲 `LangChain 1.0 如何实现`
5. 最后讲 `工程风险与追问点`

这样更适合准备面试，也方便你后续继续扩展。
