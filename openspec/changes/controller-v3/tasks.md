# Controller 3.0 Implementation Tasks

## P1 布局骨架

- [x] Task 1.1: 创建 `ResizableThreeColumns.vue`（双 handle、min/max、useStorage 持久化、双击恢复默认）
  - [x] Test: 手动验证 AC-7.1/7.2/7.3；可选 vitest 测试 storage 读写与 clamp 逻辑

- [x] Task 1.2: 重构 `Controller/index.vue` 使用 `ModuleLayout`，搭建 MonitorSection / TransitionBar / 三栏占位
  - [x] Test: 手动验证 AC-1.1；访问 `/controller` 见浅色布局 + BottomBar

- [x] Task 1.3: 创建 `ControllerToolbar.vue`，接入 `OBSstatus` 显示 Rec/Stream/Studio/VCam active 态（只读，API 在 P4）
  - [x] Test: 连接 OBS 后 active 态与 OBS 实际状态一致（AC-8.1 只读部分）

- [x] Task 1.4: 删除深色 `controller.css` 依赖，子组件改用 theme 变量
  - [x] Test: 页面无 `#1e1e1e` 背景，与 Debugger 风格一致

## P2 OBS 封装与场景栏

- [x] Task 2.1: 创建 `src/obs/controller.ts`（场景列表、切 Program/Preview、截图、状态查询）
  - [x] Test: 模拟器下 `getSceneList`、`setProgramScene` 返回/更新正确

- [x] Task 2.2: 创建 `ScenePanel.vue` + `SceneCard.vue`（缩略图、PROGRAM/PREVIEW 徽章、空状态）
  - [x] Test: 手动验证 AC-4.1/4.2/4.3/4.4/4.5

- [x] Task 2.3: 实现场景缩略图拉取（Refresh 按钮，width=160）与 `SetCurrentProgramScene` / `SetCurrentPreviewScene`
  - [x] Test: 手动验证 AC-4.6；切场后 currentScene 更新

- [x] Task 2.4: 订阅 `CurrentProgramSceneChanged` / `CurrentPreviewSceneChanged` 更新 UI
  - [x] Test: OBS 外部切场时 Controller 徽章同步

## P3 监视器

- [x] Task 3.1: 创建 `MonitorSection.vue`（双监视器 16:9 圆角、箭头、非 Studio 单 PGM）
  - [x] Test: 手动验证 AC-2.1/2.2/2.5

- [x] Task 3.2: 实现 PGM/PVW 截图轮询（3s、jpg 640×360、visibility 暂停）
  - [x] Test: 手动验证 AC-2.3/2.4/AC-1.2（未连接不 poll）

- [x] Task 3.3: 监视器单击截图菜单（下载/复制 base64）
  - [x] Test: 单击 PGM 可下载图片文件

## P4 转场与顶栏 API

- [x] Task 4.1: 创建 `TransitionBar.vue`（类型、时长、T-Bar、Transition、Cut）
  - [x] Test: 手动验证 AC-3.1/3.2/3.3

- [x] Task 4.2: 接通转场 API + Studio Mode 条件显示
  - [x] Test: 手动验证 AC-3.4/3.5

- [x] Task 4.3: `ControllerToolbar` 接通 Record/Stream/Studio/VCam API
  - [x] Test: 手动验证 AC-8.1/8.2/8.3/8.4

## P5 Scene Tree

- [x] Task 5.1: 创建 `SceneTreePanel.vue`（a-tree、Preview/Program 切换 header）
  - [x] Test: 手动验证 AC-5.1/5.4

- [x] Task 5.2: 实现 `GetSceneItemList` + 滤镜 lazy load + 详情区
  - [x] Test: 手动验证 AC-5.2

- [x] Task 5.3: 显隐/锁操作 `SetSceneItemEnabled` / `SetSceneItemLocked`
  - [x] Test: 手动验证 AC-5.3

## P6 音频

- [x] Task 6.1: 创建 `AudioPanel.vue` + `AudioStrip.vue`（窄栏 ~56px 行高）
  - [x] Test: 手动验证 AC-6.1/6.5

- [x] Task 6.2: 接通 GetInputVolume / SetInputVolume / ToggleInputMute
  - [x] Test: 手动验证 AC-6.2/6.4

- [x] Task 6.3: 独立订阅 InputVolumeMeters（100ms 节流，不写 history）
  - [x] Test: 手动验证 AC-6.3；Debugger 历史不被 meters 刷屏

## P7 导出、模拟器、i18n、清理

- [x] Task 7.1: Export All 批量下载场景截图
  - [x] Test: 手动验证 AC-4.7

- [x] Task 7.2: 扩展 `mock-handler.ts` / `mock-state.ts` 支持 Controller 全部 API（见 design.md）
  - [x] Test: 手动验证 AC-9.1/9.2

- [x] Task 7.3: 补充 `locales/zh|en|tw/controller.json` V3 文案
  - [x] Test: 手动验证 AC-10.1

- [x] Task 7.4: 删除废弃 `SourceItem.vue`、旧 `SceneItem.vue`、`AudioItem.vue`（若已替换）
  - [x] Test: `yarn build` 通过，无 dead import

- [x] Task 7.5: 响应式 <768px Tab 降级（可选，时间允许）
  - [x] Test: 窄屏下三栏变为 Tabs 可切换

## P8 测试基础设施（可选）

- [x] Task 8.1: 引入 vitest + 首批 composable 单元测试
  - [x] Test: `yarn test` 通过 pane sizes 与 throttle 测试
