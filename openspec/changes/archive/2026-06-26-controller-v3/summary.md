# Controller 3.0 导播控制台整合重构

## 概述

**一句话**：按 V3 设计将 Controller 重构为「上 PVW/PGM 监视器 + 下三栏可调（场景·树·音频）」并接通 OBS API。

**背景与动机**：
现有 Controller 为早期 mock 原型，布局与全站浅色主题脱节，Rec/Stream/Studio 等未接 API。模块规划 #7–#12 的能力应合并为单一导播面。用户已确认 V3 布局（上半监视器、下半三栏、音频收窄）。

**影响范围**：`src/pages/Controller/` 全量重写，`src/obs/controller.ts` 新增，`src/components/ResizableThreeColumns.vue`，模拟器扩展，i18n，约 15–20 文件。

## 设计方案

### 改动点

| # | 改动 | 说明 | 涉及文件 |
|---|------|------|---------|
| 1 | 页面壳层迁移 | ModuleLayout + 浅色主题 | `Controller/index.vue`, 删除 `controller.css` |
| 2 | 三栏拖拽布局 | 28:44:28 默认，localStorage 持久化 | `ResizableThreeColumns.vue` |
| 3 | PVW/PGM 监视器 | 截图轮询 3s，Studio 双屏 | `MonitorSection.vue`, `obs/controller.ts` |
| 4 | 转场条 | T-Bar/Transition/Cut | `TransitionBar.vue` |
| 5 | 场景栏 | 缩略图 + 切场 + 导出 | `ScenePanel.vue`, `SceneCard.vue` |
| 6 | Scene Tree | 层级 + 显隐/锁 | `SceneTreePanel.vue` |
| 7 | 音频窄栏 | Mute/推子/电平 | `AudioPanel.vue`, `AudioStrip.vue` |
| 8 | OBS 封装 | Controller 专用 API | `src/obs/controller.ts` |
| 9 | 顶栏 | Rec/Stream/Studio/VCam | `ControllerToolbar.vue` |
| 10 | 模拟器 | 补齐 Screenshot/Preview/Tree/Audio | `mock-handler.ts`, `mock-state.ts` |
| 11 | i18n | V3 文案 | `locales/*/controller.json` |

### 关键决策

| 决策 | 选择 | 为什么不选其他方案 |
|------|------|-------------------|
| 路由 | 直接覆盖 `/controller` | 旧版不可用，并行路由增加维护 |
| Scene Tree | 默认 Program，Studio 可切 Preview | 导播主视角是 PGM |
| 三栏组件 | 自研 ResizableThreeColumns | 零依赖，可限制音频 max 320px |
| VolumeMeters | 独立订阅不写 history | 50ms 事件会淹没 Debugger |
| 截图频率 | PGM/PVW 3s，缩略图手动/5s | 全量高频会压垮 WS |

### 技术细节

```
连接 OBS → init scenes → 启动 PGM poll
Studio ON → 启动 PVW poll + 显示 T-Bar
SceneCard click → SetPreviewScene (studio) / SetProgramScene
Transition → TriggerStudioModeTransition
InputVolumeMeters → throttle 100ms → AudioStrip VU bar
```

布局：`flex column`；Monitor ~45vh；Transition 48px；三栏 `flex:1`。

## 验收标准

> 测试和产品验收以本节为准。

| # | 场景 | 操作 | 预期结果 |
|---|------|------|---------|
| 1 | 页面加载 | 访问 `/controller` | ModuleLayout 浅色主题 + BottomBar |
| 2 | 未连接 | 打开页面 | 空状态提示，无截图轮询 |
| 3 | 连接 OBS | BottomBar 连接 | 场景列表 + PGM 画面出现 |
| 4 | Studio 双监视器 | 开启 Studio Mode | PVW + PGM 并排，16:9 圆角 |
| 5 | 非 Studio | 关闭 Studio | 仅 PGM 全宽 |
| 6 | PGM 更新 | 切 Program 场景 | 3s 内 PGM 画面更新 |
| 7 | 转场条 Studio | 开启 Studio | T-Bar + Transition + Cut 可见 |
| 8 | Trigger | 点击 Transition | Program 变为 Preview 场景 |
| 9 | 场景徽章 | 查看场景栏 | Program 蓝标、Preview 橙标正确 |
| 10 | 切 Preview | Studio 下点击场景卡 | Preview 监视器更新 |
| 11 | 切 Program | 非 Studio 点击场景卡 | PGM 直接切换 |
| 12 | Refresh | 点击 Refresh | 缩略图重新加载 |
| 13 | Export All | 点击 Export All | 触发场景截图下载 |
| 14 | Scene Tree | 查看 Main 场景 | Camera/Browser 等节点可见 |
| 15 | 显隐源 | 点击 eye 图标 | OBS 源 visibility 切换 |
| 16 | 音频 Mute | 点击 M | 静音状态切换 |
| 17 | 音量推子 | 拖动推子 | OBS 音量更新 |
| 18 | 电平表 | 有声音输入 | VU 条随 InputVolumeMeters 变化 |
| 19 | 三栏拖拽 | 拖分隔条后刷新 | 比例保持 |
| 20 | 恢复默认 | 双击分隔条 | 恢复 28:44:28 |
| 21 | 顶栏 Record | OBS 录制中 | Record 图标 active |
| 22 | 模拟器 | 连模拟器开 Controller | 各面板有数据非 loading |
| 23 | 语言 | 切 English | 面板文案为英文 |

## 实现清单

| # | 任务 | 说明 | 依赖 |
|---|------|------|------|
| 1 | P1 布局骨架 | ModuleLayout + 三栏 + 占位 | — |
| 2 | P2 场景栏 | obs/controller.ts + ScenePanel | P1 |
| 3 | P3 监视器 | PVW/PGM 轮询 | P2 |
| 4 | P4 转场+顶栏 | TransitionBar + Toolbar API | P3 |
| 5 | P5 Scene Tree | 树 + 显隐锁 | P2 |
| 6 | P6 音频 | 窄栏 + VolumeMeters | P1 |
| 7 | P7 收尾 | 导出 + 模拟器 + i18n + 清理 | P4,P5,P6 |
| 8 | P8 可选 vitest | composable 单元测试 | P7 |

## 测试要点

- 真 OBS + 模拟器双环境逐条验收上表 23 项
- Studio Mode 开/关状态切换无 UI 残留
- InputVolumeMeters 不影响 Debugger 事件历史
- `yarn build` 无 TS 错误
- tab hidden 时截图 poll 暂停

## 文档索引

| 文件 | 用途 |
|------|------|
| `proposal.md` | 动机、范围、决策 |
| `design.md` | 架构、API、轮询策略 |
| `specs/controller/spec.md` | 完整 AC |
| `tasks.md` | 分任务实现清单 |
| `docs/modules/controller-v3-design.md` | UI 设计参考 |
