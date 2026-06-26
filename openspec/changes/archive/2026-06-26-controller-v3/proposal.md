# Controller 3.0 导播控制台整合重构

## 概述

将 Controller 页面按 V3 设计文档重构为「上监下控」导播工作面：上半 PVW/PGM 大监视器 + 转场条，下半三栏可拖拽分栏（场景 · Scene Tree · 音频），并接通 OBS WebSocket API，替换现有 mock 实现。

## 动机

### 问题

1. **现有 Controller 不可用**：`src/pages/Controller/index.vue` 大量 mock 数据，Rec/Stream/Studio 等 toggle 未接 API，`SetCurrentProgramScene` 被注释
2. **布局过时**：2×2 文字按钮网格，与 V3 设计及全站简约浅色主题不一致
3. **功能分散**：模块规划 #7/#8/#9/#11/#12 本可合并为单一导播面，却未落地
4. **开发体验差**：模拟器缺少 Screenshot、Preview Scene、SceneItem、VolumeMeters 等，无法离线验证

### 价值

- 用户可在浏览器完成常见导播操作（切场、转场、调音、看结构），无需切多个页面
- 与 Debugger、Event Monitor 等模块形成完整工具链
- 模拟器可演示 Controller，降低上手门槛

## 范围

### In Scope

| 区域 | 能力 |
|------|------|
| 监视器 | PVW/PGM 截图轮询、非 Studio 单 PGM、圆角 16:9 |
| 转场条 | 类型/时长/T-Bar/Transition/Cut |
| 场景栏 | 缩略图网格、PROGRAM/PREVIEW 徽章、切场、刷新/导出 |
| Scene Tree | Scene → Item → Filter、详情、显隐/锁 |
| 音频栏 | 窄栏竖排通道、Mute、推子、电平表 |
| 布局 | 三栏拖拽 + localStorage 持久化 |
| 顶栏 | Rec/Stream/Studio/VCam 接 OBS API |
| 壳层 | 迁移至 ModuleLayout + theme 变量 |
| 模拟器 | 补齐 Controller 所需 Request/Event |
| i18n | zh/en/tw controller 文案扩展 |

### Out of Scope

- 新建独立路由 `controller-v3`（直接覆盖 `/controller`）
- 移动端完整适配（<768px 仅 Tab 降级，非首要目标）
- 场景/源的创建删除（CRUD）
- Filter 参数编辑面板
- PC / miniapp 端

## 参考文档

- 设计说明：`docs/modules/controller-v3-design.md`
- 效果图：`docs/modules/assets/controller-v3-unified.png`

## 关键决策

| 决策 | 选择 | 理由 |
|------|------|------|
| 路由策略 | 直接覆盖 `/controller` | 旧版不可用，无保留价值 |
| Scene Tree 绑定 | 默认 Program；Studio 下顶部可切换 Preview/Program | 导播以 PGM 为主，Preview 为辅助 |
| 截图轮询 | PVW/PGM 3s，场景缩略图 5s 或手动 | 平衡实时性与请求量 |
| 三栏组件 | 自研 `ResizableColumns`（2 handle） | 零新依赖，可限制音频栏 max 320px |
| OBS 封装 | `src/obs/controller.ts` composable 层调用 | 与 Debugger sendRequest 解耦，便于节流 |
| VolumeMeters | Controller 单独订阅，不写 WSEventAndRequestHistory | 50ms 高频会淹没 Debugger 历史 |

## 验收概要

1. 连接 OBS 或模拟器后，Controller 展示真实场景列表与 PGM 画面
2. Studio Mode 下 PVW/PGM 双监视器、T-Bar、Preview 切场可用
3. 三栏可拖拽，刷新页面后比例保持
4. 音频 Mute/推子/电平表可用
5. Scene Tree 展示当前场景层级，显隐/锁可操作
6. 浅色主题与全站一致，BottomBar 连接正常

## 风险

| 风险 | 缓解 |
|------|------|
| GetSourceScreenshot 请求过多 | 分级轮询 + 未连接停 poll |
| InputVolumeMeters 性能 | 节流 100ms + 独立订阅 |
| Scene Tree N+1 | 滤镜懒加载 |
| 模拟器与真 OBS 行为差异 | 关键 API 对齐 protocol |

## 分期

P1 骨架 → P2 场景 → P3 监视器 → P4 转场 → P5 树 → P6 音频 → P7 导出与模拟器/i18n

详见 `tasks.md`。
