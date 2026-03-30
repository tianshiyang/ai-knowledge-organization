# 单 Agent 与 Tool Calling

## 定义

这是最小可用的 Agent 形态。模型根据当前问题决定是否调用某个工具，如果不需要工具，就直接回答。

## 适用场景

- 查询订单、物流、退款状态
- 企业问答助手查询知识库或数据库
- 简单自动化任务

## 工作流程

`用户输入 -> 模型判断 -> 工具调用 -> 读取结果 -> 输出答案`

## 和相邻架构的区别

- 相比 `ReAct`，它不强调显式多轮 Observation 驱动循环
- 相比 `Router`，它不先分发到其他链路
- 相比 `Multi-Agent`，它是单一决策中心

## 面试回答话术

“大多数业务我会先从单 Agent + tools 起步，因为它实现最轻、验证最快，而且足以覆盖很多真实场景。”

## LangChain 1.0 实现口径

```python
from langchain.agents import create_agent


def get_order_status(order_id: str) -> dict:
    """Query the current order status by order id."""
    return {
        "order_id": order_id,
        "status": "shipped",
        "carrier": "SF Express",
    }


agent = create_agent(
    model="openai:gpt-4.1",
    tools=[get_order_status],
    system_prompt=(
        "你是客服助手。涉及订单信息时优先调用工具，"
        "不要凭空猜测。"
    ),
)
```

## 工程提醒

- 工具描述会直接影响选工具效果
- 返回结果尽量结构化
- 高风险写操作不要默认暴露
