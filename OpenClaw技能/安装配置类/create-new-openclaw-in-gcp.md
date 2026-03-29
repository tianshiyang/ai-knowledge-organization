# Create New OpenClaw Instance on GCP VM

## 基本信息

| 项目 | 内容 |
|------|------|
| **Slug** | create-new-openclaw-in-gcp |
| **名称** | Create New OpenClaw Instance on GCP VM |
| **版本** | 1.0.0 |
| **所有者** | divide-by-0 |
| **创建时间** | 2026-02-04 |
| **更新时间** | 2026-03-29 |
| **License** | MIT-0 |
| **推荐等级** | C：了解即可 / 谨慎使用 |
| **标签** | OpenClaw 平台专项、安装配置、云部署、GCP、高权限 |

## 一句话定位

用于在 GCP VM 上部署和配置 OpenClaw 的云端安装技能，涵盖网络、搜索集成和凭证处理。

## 适合谁

- 需要把 OpenClaw 部署到云服务器的用户
- 同时负责网络、安全和基础设施配置的人
- 熟悉 GCP VM 的技术人员

## 典型使用场景

- 在 Google Cloud Platform 上部署 OpenClaw
- 需要 Tailscale 网络配置
- 集成 Brave Search
- 安全凭证管理

## 为什么值得用

- 把 OpenClaw 云端部署时常见的环境准备串在一起，减少来回查资料。
- 对想做公网访问、远程节点或云端常驻的用户很有帮助。

## 前端视角说明

除非你同时负责自己的 OpenClaw 运行环境，否则它不是前端日常高频技能。

## 通用性说明

通用性较低，偏基础设施和云部署。

## 风险与注意事项

- 涉及云资源、网络配置、凭证管理和外部服务接入。
- 如果你只是本地使用 OpenClaw，可以完全跳过。
- 安装和配置前应先确认自己的 GCP、Tailscale 和搜索服务权限边界。

## 安装方式

```bash
clawhub install create-new-openclaw-in-gcp
```
