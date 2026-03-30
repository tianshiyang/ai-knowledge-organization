# Prompt 与推理策略

这页专门用来区分一些常见但容易混淆的概念。

## 这页讲什么

这里讨论的不是“标准 Agent 架构”，而是和 Agent 经常一起出现的推理或提示策略：

- `CoT`
- `ToT`
- `Prompt Chaining`

## CoT

`Chain-of-Thought` 是让模型按步骤展开推理的一种提示方式。

更适合描述为：

- 推理策略
- 提示技巧

而不是默认推荐的 Agent 架构入口。

## ToT

`Tree-of-Thought` 是把推理过程扩展成树状探索，而不是一条单链。

它的价值在于：

- 探索多个候选思路
- 再选择更好的路径

但工程复杂度也会更高。

## Prompt Chaining

Prompt Chaining 是把复杂任务拆成多个连续提示步骤。

它更像：

- Workflow
- 固定链式编排

而不是自由探索型 Agent。

## 它们和 Agent 的边界

一个常见的混淆点是：这些技巧经常出现在 Agent 里，但它们不是和 `ReAct`、`Router`、`Supervisor` 同一层的概念。

可以这样区分：

- `ReAct`、`Router`、`Reflection`、`Supervisor`：更像系统架构或执行模式
- `CoT`、`ToT`、`Prompt Chaining`：更像推理或提示策略

## LangChain 1.0 里怎么落地

- `CoT`：体现在系统提示或任务提示里
- `Prompt Chaining`：体现在链式组合或固定图节点里
- `ToT`：如果真要做，通常更适合自己设计图节点和候选路径选择逻辑

## 面试回答话术

“CoT、ToT 和 Prompt Chaining 经常会和 Agent 一起出现，但我会把它们当成推理或编排技巧，而不是默认的 Agent 架构分类。”
