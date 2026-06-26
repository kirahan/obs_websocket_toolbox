# Controller 3.0 技术设计

## 架构概览

```
ModuleLayout
├── header slot: ControllerToolbar (Rec/Stream/Studio/VCam)
└── ControllerPage (flex column, h=100%)
    ├── MonitorSection          ~45vh
    ├── TransitionBar           ~48px
    └── ResizableThreeColumns   flex 1
        ├── ScenePanel          pane 1
        ├── SceneTreePanel      pane 2
        └── AudioPanel          pane 3
```

## 目录结构

```
src/pages/Controller/
├── index.vue                 # 页面入口，组装子组件
├── ControllerToolbar.vue     # 顶栏 OBS 控制按钮
├── MonitorSection.vue        # PVW + PGM
├── TransitionBar.vue         # 转场控制
├── ScenePanel.vue            # 场景缩略图网格
├── SceneTreePanel.vue        # 结构树 + 详情
├── AudioPanel.vue            # 窄栏音频列表
├── SceneCard.vue             # 单场景卡片（替换 SceneItem）
├── AudioStrip.vue            # 单音频通道（替换 AudioItem）
└── SourceTreeNode.vue        # 树节点渲染（可选）

src/components/
└── ResizableThreeColumns.vue # 三栏拖拽（通用）

src/obs/
└── controller.ts             # Controller 专用 OBS API 封装

src/composables/controller/   # 可选：逻辑 composables
├── useControllerMonitors.ts
├── useControllerScenes.ts
├── useControllerTree.ts
├── useControllerTransitions.ts
└── useControllerAudio.ts

src/simulator/
├── mock-handler.ts           # 扩展 mock cases
└── mock-state.ts             # 扩展 previewScene, sceneItems 等
```

删除或废弃：`src/styles/controller.css` 深色样式；旧 `SceneItem.vue`/`AudioItem.vue`/`SourceItem.vue` 重写或移除。

## 布局与样式

### 垂直分区

| 区域 | 高度 | 说明 |
|------|------|------|
| MonitorSection | `min(45vh, calc(100vh - 320px))` | 双监视器 16:9，`object-fit: contain` |
| TransitionBar | 48px fixed | Studio 外隐藏 T-Bar |
| ThreeColumns | `flex: 1; min-height: 0` | 内部 scroll |

### 三栏拖拽

- 组件：`ResizableThreeColumns.vue`
- 默认比例：`[28, 44, 28]`（百分比）
- 最小宽度：200 / 240 / 160 px
- 音频栏 max：320px（拖宽时 clamp）
- 持久化：`useStorage('controller-v3-pane-sizes', [28, 44, 28])`
- 双击 handle：恢复默认

### 主题

全部使用 `var(--color-*)`、`--radius-*`。PROGRAM 边框 `--color-primary`；PREVIEW 徽章 `--color-warning`。

## 数据层

### obs/controller.ts

封装方法（均通过 `OBS.getInstance()` 的 client）：

```typescript
// 场景
getProgramScene() / setProgramScene(name)
getPreviewScene() / setPreviewScene(name)  // Studio only
getSceneList()

// 截图
getSceneScreenshot(sceneName, width?, height?) → base64 data URL

// 转场
getCurrentTransition() / setCurrentTransition(name)
getTransitionDuration() / setTransitionDuration(ms)
triggerTransition() / setTBarPosition(0-1)
getStudioModeEnabled() / setStudioModeEnabled(bool)

// 输出
toggleRecord() / toggleStream() / toggleVirtualCam()

// 树
getSceneItemList(sceneName)
getSourceFilterList(sourceName)  // lazy
setSceneItemEnabled / setSceneItemLocked

// 音频
getInputList()
getInputVolume(name) / setInputVolume(name, mul)
getInputMute(name) / toggleInputMute(name)
subscribeVolumeMeters(callback) / unsubscribeVolumeMeters()
```

### 状态来源

| 状态 | 来源 |
|------|------|
| scenesList, currentScene | 已有 `src/obs/state.ts` |
| isRecording, isStreaming, isStudioMode | `OBSstatus` in `src/state/websocket.ts` |
| previewScene | 新增 `previewScene` ref in obs/state 或 composable local |
| monitorImages | composable local Map |
| audioLevels | composable local, from InputVolumeMeters |

### 事件订阅

Controller mount 时额外注册（不经过全量 `registOBSEvent` 历史）：

- `CurrentProgramSceneChanged` → 更新 currentScene + 刷新 PGM
- `CurrentPreviewSceneChanged` → 更新 previewScene + 刷新 PVW
- `StudioModeStateChanged` → 更新 OBSstatus.isStudioModule
- `InputVolumeMeters` → 节流 100ms 更新电平

disconnect 时 unsubscribe。

## 截图轮询策略

```
连接建立
  ├─ PGM poll: 每 3s GetSourceScreenshot(currentProgramScene)
  └─ PVW poll (studio only): 每 3s GetSourceScreenshot(previewScene)

ScenePanel thumbnails:
  ├─ 初次加载 + 手动 Refresh: 并行 GetSourceScreenshot (width=160)
  └─ 可选 auto 5s（默认关闭或连接后一次）

未连接 / tab hidden: 停止所有 poll (document.visibilityState)
```

参数：`imageFormat: 'jpg'`, `imageWidth: 640`, `imageHeight: 360`（监视器）；缩略图 160×90。

## Scene Tree

- 默认展示 **Program 场景** 结构
- Studio 模式下，面板 header 显示 `Program: Main` 或切换按钮 `Preview | Program`
- 树节点：SceneItem（icon by sourceType）→ 展开时 lazy load Filters
- 详情区：GetSceneItemEnabled, GetSceneItemLocked, transform 摘要（GetSceneItemTransform 可选 P5）
- 操作：Toggle eye → SetSceneItemEnabled；Lock → SetSceneItemLocked

## 音频栏 UI

每行 ~56px：

```
[M] Mic/Aux  [====VU====] [slider] -4.5dB
```

- VU：InputVolumeMeters 的 magnitude 数组可视化（CSS gradient bar）
- Slider：0–1 mul 映射，显示 dB（OBS 对数刻度可 Phase 2 精化）
- 超出 6 路：panel 内 scroll

## 转场条

| 控件 | API | Studio 要求 |
|------|-----|-------------|
| 类型下拉 | SetCurrentSceneTransition | 否 |
| 时长 input | SetCurrentSceneTransitionDuration | 否 |
| T-Bar slider | SetTBarPosition | 是 |
| Transition btn | TriggerStudioModeTransition | 是 |
| Cut btn | SetCurrentProgramScene(previewScene) 或 Trigger with cut | 是 |

非 Studio：隐藏 PVW、T-Bar、Transition/Cut（或 Cut 等价于直接 SetCurrentProgramScene）。

## 顶栏 Toolbar

绑定 `OBSstatus` + API：

| 按钮 | API |
|------|-----|
| Record | StartRecord / StopRecord 或 ToggleRecord |
| Stream | StartStream / StopStream 或 ToggleStream |
| Studio | SetStudioModeEnabled |
| VCam | StartVirtualCam / StopVirtualCam |

点击后 `getStatus()` 刷新。

## 模拟器扩展

`mock-state` 新增：

```typescript
previewScene: string
sceneItems: Record<sceneName, SceneItem[]>
inputVolumes: Record<inputName, { volumeMul, muted }>
```

`mock-handler` 新增 cases：

- GetSourceScreenshot → 返回 1×1 或生成的色块 base64
- GetCurrentPreviewScene / SetCurrentPreviewScene
- GetSceneItemList / GetSourceFilterList
- GetInputVolume / SetInputVolume / ToggleInputMute / SetInputMute
- SetCurrentSceneTransition / SetCurrentSceneTransitionDuration
- TriggerStudioModeTransition / SetTBarPosition
- SetStudioModeEnabled
- StartVirtualCam / StopVirtualCam / GetVirtualCamStatus

Mock client 需 emit：`InputVolumeMeters` interval 100ms、`CurrentPreviewSceneChanged` 等。

## 响应式

| 断点 | 行为 |
|------|------|
| ≥1200px | 完整布局 |
| 768–1199px | 三栏 min-width 触发 horizontal scroll |
| <768px | Monitor 单列；下半 a-tabs: Scenes / Tree / Audio |

## Testing Strategy

项目当前无 vitest。本变更测试策略：

1. **手动验收**：按 `specs/controller/spec.md` AC 逐条在真 OBS + 模拟器验证
2. **Composable 单元测试（推荐 P7 引入）**：添加 vitest + `@vue/test-utils`，测试：
   - `usePaneSizes` 持久化读写
   - `getSceneScreenshot` mock client 调用参数
   - VolumeMeters 节流逻辑
3. **模拟器集成**：Simulator 连接后 Controller 各面板非空、切场生效
4. **回归**：BottomBar 连接、Debugger 不受影响、路由 `/controller` 可达

测试文件位置（若引入 vitest）：

```
src/obs/__tests__/controller.test.ts
src/components/__tests__/ResizableThreeColumns.test.ts
src/composables/controller/__tests__/useControllerAudio.test.ts
```

## 迁移计划

1. 新建组件与 obs/controller.ts，保留旧 index.vue 直至 P1 完成
2. P1 完成后一次性替换 index.vue，删除 controller.css
3. i18n 键迁移至 `locales/*/controller.json` 并补充 V3 专用键

## 依赖

无新增 npm 依赖（自研 ResizableThreeColumns）。可选后续评估 `splitpanes`。
