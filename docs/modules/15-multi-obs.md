# 多实例管理 (Multi-OBS Manager)

![效果图](./assets/15-multi-obs.png)

## 一句话

同时连接多台 OBS，统一查看状态并批量或分别遥控。

## 解决什么问题

- 多机位、多房间、远程 + 本地 OBS 并存
- 需要一眼看哪台在播、哪台在录
- 批量操作（全部 Start Stream）节省时间

## 核心功能

- [ ] 连接列表：host:port + 别名 + 连接状态
- [ ] 每台卡片：OBS 版本、当前场景、Stream/Record 状态
- [ ] 切换「当前操作目标」或并排视图
- [ ] 批量 Request（对选中实例）
- [ ] 统一 Event 聚合（带来源标签）
- [ ] 连接配置导入 / 导出

## 与现有模块关系

- **全局 Connection Manager**：应抽取现有 OBS 单例为多连接架构
- **Controller / Stream Deck**：需选择目标实例
- **Event Monitor / Stats Dashboard**：可聚合多实例数据

## 主要协议依赖

- GetVersion、GetStreamStatus、GetRecordStatus、GetCurrentProgramScene
- 底层：多个 obs-websocket-js 实例

## 实现复杂度

**高** — 架构重构（单例 → 连接池）+ 各模块适配。

## 差异化

专业多机位场景；普通用户单 OBS 用不到。

## 待决问题

- 是否作为「基础设施」而非独立模块页面？
- 浏览器同时维持 N 个 WS 连接的限制？
