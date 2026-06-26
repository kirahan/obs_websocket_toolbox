# Controller 3.0 Specification

## Capability

导播控制台（Controller）页面：整合场景预览、PVW/PGM 监视器、转场控制、场景结构树、音频混音于单一工作面。

## Requirements

### REQ-1 页面壳层与连接

**AC-1.1** Given 用户访问 `/controller`，When 页面加载，Then 显示 ModuleLayout（NavHeader + 内容区 + BottomBar），背景为浅色主题（`--color-bg`）。

**AC-1.2** Given OBS 未连接，When 页面展示，Then 各面板显示空状态提示（i18n），不发起截图轮询。

**AC-1.3** Given 用户通过 BottomBar 连接 OBS 或模拟器，When 连接成功，Then Controller 自动加载场景列表并显示 PGM 监视器内容。

### REQ-2 PVW/PGM 监视器

**AC-2.1** Given Studio Mode 已启用且 OBS 已连接，When 监视器区渲染，Then 左侧显示 PREVIEW 标签与预览场景画面，右侧显示 PROGRAM 标签与节目场景画面，中间有方向箭头。

**AC-2.2** Given Studio Mode 未启用，When 监视器区渲染，Then 仅 PROGRAM 监视器全宽显示，PVW 区域隐藏或显示「Studio Mode 关闭」提示。

**AC-2.3** Given OBS 已连接且当前 Program 场景为 `Main`，When PGM 轮询完成，Then PGM 监视器显示 `Main` 场景的截图（非占位文字）。

**AC-2.4** Given 用户切换 Program 场景，When `CurrentProgramSceneChanged` 事件到达或切场 API 成功，Then 3 秒内 PGM 画面更新为新场景。

**AC-2.5** Given 监视器容器，When 渲染，Then 画面容器保持 16:9 比例且圆角 ≥ 8px。

### REQ-3 转场控制条

**AC-3.1** Given OBS 已连接，When 转场条渲染，Then 显示当前转场类型下拉与时长（毫秒）输入，值为 OBS 当前配置。

**AC-3.2** Given Studio Mode 已启用，When 转场条渲染，Then 显示 T-Bar 滑块、Transition 按钮、Cut 按钮。

**AC-3.3** Given Studio Mode 未启用，When 转场条渲染，Then T-Bar、Transition、Cut 控件隐藏或 disabled。

**AC-3.4** Given Studio Mode 下 Preview=`场景` Program=`Main`，When 用户点击 Transition，Then 调用 `TriggerStudioModeTransition` 且 Program 变为 Preview 场景。

**AC-3.5** Given 用户修改转场类型，When 选择新类型，Then 调用 `SetCurrentSceneTransition` 且 OBS 当前转场更新。

### REQ-4 场景栏

**AC-4.1** Given OBS 已连接且有 N 个场景，When 场景栏渲染，Then 显示 N 个缩略图卡片，每张含场景名。

**AC-4.2** Given 当前 Program 场景为 `Main`，When 场景栏渲染，Then `Main` 卡片有 PROGRAM 蓝色高亮/徽章。

**AC-4.3** Given Studio Mode 且 Preview 为 `场景`，When 场景栏渲染，Then `场景` 卡片有 PREVIEW 橙色徽章。

**AC-4.4** Given Studio Mode 启用，When 用户单击某场景卡片，Then 调用 `SetCurrentPreviewScene` 且 Preview 监视器更新。

**AC-4.5** Given Studio Mode 未启用，When 用户单击某场景卡片，Then 调用 `SetCurrentProgramScene` 且 PGM 更新。

**AC-4.6** Given 用户点击 Refresh，When 操作完成，Then 所有场景缩略图重新拉取截图。

**AC-4.7** Given 用户点击 Export All，When 操作完成，Then 下载当前所有场景缩略图（至少 JPG/PNG 文件触发下载）。

### REQ-5 Scene Tree

**AC-5.1** Given Program 场景为 `Main` 且含 Camera、Browser Source，When Scene Tree 渲染，Then 树中可见 `Main` 下 `Camera` 与 `Browser Source` 节点。

**AC-5.2** Given 用户选中树中 `Camera` 节点，When 详情区渲染，Then 显示 enabled、locked 状态（与 OBS 一致）。

**AC-5.3** Given `Camera` 当前 enabled=true，When 用户点击显隐按钮，Then 调用 `SetSceneItemEnabled` 且 OBS 中该源 visibility 切换。

**AC-5.4** Given Studio Mode，When 用户切换 Tree 视图至 Preview 场景，Then 树展示 Preview 场景的结构而非 Program。

### REQ-6 音频栏

**AC-6.1** Given OBS 已连接且有音频输入，When 音频栏渲染，Then 每路显示名称、Mute 按钮、电平条、音量推子、dB 读数。

**AC-6.2** Given 某输入未静音，When 用户点击 M，Then 调用 `ToggleInputMute` 且该路 muted 状态切换。

**AC-6.3** Given 某输入有音频信号，When InputVolumeMeters 事件到达，Then 电平条在 100ms 内反映音量变化。

**AC-6.4** Given 用户拖动推子，When 释放，Then 调用 `SetInputVolume` 且 OBS 音量更新。

**AC-6.5** Given 音频栏宽度，When 用户拖拽三栏分隔条，Then 音频栏最大宽度不超过 320px。

### REQ-7 三栏布局

**AC-7.1** Given 默认首次访问，When 下半区渲染，Then 三栏宽度比例约为 28:44:28。

**AC-7.2** Given 用户拖拽分隔条改变比例，When 刷新页面，Then 比例与拖拽后一致（localStorage 持久化）。

**AC-7.3** Given 用户双击分隔条，When 操作完成，Then 三栏恢复默认 28:44:28。

### REQ-8 顶栏控制

**AC-8.1** Given OBS 正在录制，When 顶栏渲染，Then Record 图标为 active 状态（红色）。

**AC-8.2** Given 用户点击 Stream 按钮，When OBS 未推流，Then 调用 StartStream 且按钮变为 active。

**AC-8.3** Given 用户点击 Studio 按钮，When 当前 Studio 关闭，Then 调用 `SetStudioModeEnabled(true)` 且 PVW 区域出现。

**AC-8.4** Given 用户点击 VirtualCam 按钮，When 操作成功，Then 按钮 active 状态与 OBS VirtualCam 状态一致。

### REQ-9 模拟器兼容

**AC-9.1** Given 模拟器连接且未连真 OBS，When 打开 Controller，Then 场景栏、PGM 监视器、Scene Tree、音频栏均显示模拟数据（非永久 loading）。

**AC-9.2** Given 模拟器 Studio Mode 开启，When 用户切 Preview 场景并 Trigger Transition，Then mock state 中 currentProgramScene 更新。

### REQ-10 国际化

**AC-10.1** Given 语言切换为 English，When Controller 渲染，Then 面板标题、空状态、按钮文案均为英文（无硬编码中文，场景名除外）。

## Non-Functional

- 截图轮询在 tab hidden 时暂停
- InputVolumeMeters 不写入 WSEventAndRequestHistory
- 页面首屏可交互时间：连接后 2s 内显示场景列表
