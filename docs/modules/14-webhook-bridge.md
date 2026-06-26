# Webhook 桥接 (Webhook Bridge)

![效果图](./assets/14-webhook-bridge.png)

## 一句话

OBS 事件 → HTTP 出站；外部 HTTP → OBS Request 入站，连接 OBS 与外部系统。

## 解决什么问题

- 想把 StreamStateChanged 推到 Discord / Slack / 自建服务
- 想从 Home Assistant、n8n 触发 OBS 操作
- 无编程能力的集成需求

## 核心功能

- [ ] 出站：Event 过滤 → POST 到 URL（JSON payload）
- [ ] 入站：本地 HTTP endpoint 接收 webhook → 映射到 Request（需后端或浏览器扩展？）
- [ ] Payload 模板（Mustache / JSON 映射）
- [ ] 重试、失败日志
- [ ] 预置模板：Discord Webhook、Generic REST

## 与现有模块关系

- **Automation**：Webhook 可作为 Automation 的触发器/动作
- **Event Monitor**：事件源相同

## 主要协议依赖

- 全部 Events（出站）
- 任意 Requests（入站动作）

## 实现复杂度

**高** — 纯浏览器无法做可靠 inbound webhook（需 Node 侧服务或 Cloudflare Worker）。

## 差异化

若做 inbound，需明确架构；outbound-only 可在浏览器实现（CORS 限制需注意）。

## 待决问题

- **架构**：纯前端 outbound vs 需要配套轻量 server？
- CORS：浏览器直 POST Discord 可能可行；自建 API 需 proxy
