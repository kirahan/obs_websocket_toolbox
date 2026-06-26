# OBS Websocket Toolkit — 模块规划

本目录收录工具集潜在功能模块的方向说明与 UI 效果图，供逐项评估是否开发。

## 现有模块

| 模块 | 状态 | 说明 |
|------|------|------|
| Debugger | ✅ 已上线 | 协议调试：连接、查文档、发请求、看事件 |
| Controller | ✅ 已上线 | 导播遥控：场景、源、音频、转场 |
| Simulator | 📋 规划中 | 模拟 OBS WebSocket 服务端 |

## 候选模块

### 开发 / 测试向

| 文档 | 模块 | 优先级直觉 |
|------|------|-----------|
| [01-simulator](./01-simulator.md) | OBS 模拟器 | ⭐⭐⭐ 高 |
| [02-batch-runner](./02-batch-runner.md) | 批处理执行器 | ⭐⭐ 中 |
| [03-event-monitor](./03-event-monitor.md) | 事件监视器 | ⭐⭐⭐ 高 |
| [04-code-generator](./04-code-generator.md) | 代码生成器 | ⭐⭐ 中 |
| [05-vendor-explorer](./05-vendor-explorer.md) | Vendor 探索器 | ⭐ 低 |

### 导播 / 运营向

| 文档 | 模块 | 优先级直觉 |
|------|------|-----------|
| [06-stream-deck](./06-stream-deck.md) | 自定义按钮面板 | ⭐⭐⭐ 高 |
| [07-audio-mixer](./07-audio-mixer.md) | 音频混音台 | ⭐⭐ 中 |
| [08-scene-preview](./08-scene-preview.md) | 场景预览网格 | ⭐⭐ 中 |
| [09-transition-control](./09-transition-control.md) | 转场控制台 | ⭐⭐ 中 |

### 监控 / 诊断向

| 文档 | 模块 | 优先级直觉 |
|------|------|-----------|
| [10-stats-dashboard](./10-stats-dashboard.md) | 性能仪表盘 | ⭐⭐⭐ 高 |
| [11-scene-inspector](./11-scene-inspector.md) | 场景结构查看器 | ⭐⭐ 中 |
| [12-screenshot-studio](./12-screenshot-studio.md) | 截图工作室 | ⭐ 低 |

### 自动化 / 集成向

| 文档 | 模块 | 优先级直觉 |
|------|------|-----------|
| [13-automation](./13-automation.md) | 自动化编排 | ⭐⭐⭐ 高 |
| [14-webhook-bridge](./14-webhook-bridge.md) | Webhook 桥接 | ⭐⭐ 中 |
| [15-multi-obs](./15-multi-obs.md) | 多实例管理 | ⭐ 低 |

## 横切能力（非独立模块）

- **AI 辅助**：自然语言 → Request 序列、错误解释、布局生成等，可挂载到 Debugger / Automation / Stream Deck

## 如何评估

每个文档包含：

1. 问题与价值
2. 核心功能列表
3. 与现有模块关系
4. 主要 API / 事件依赖
5. 实现复杂度（低 / 中 / 高）
6. UI 效果图

评估时可关注：**目标用户是否清晰、是否与现有模块重复、能否形成差异化**。
