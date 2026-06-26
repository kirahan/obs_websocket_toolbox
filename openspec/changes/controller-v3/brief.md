# Controller V3 Brief

## 背景

OBS Websocket Toolkit 已完成 Debugger 改版、协议同步、5 个新模块。Controller 仍停留在早期原型：深色 UI、mock 数据、OBS 集成不完整。

用户确认 V3 布局：**上半 PVW/PGM，下半 Scenes | Scene Tree | Audio 三栏可调，音频收窄**。

## 约束

- Vue 3 + Ant Design Vue + TypeScript + yarn
- 样式使用 `src/styles/theme.scss` CSS 变量，支持 i18n（zh/en/tw）
- 复用 `ModuleLayout`、`BottomBar`、OBS 单例 `src/obs/index.ts`
- 模拟器模式需可用（`isSimulatorConnection()`）
- commit 信息不含 `/` 和 `\`
- 不修改 pc / miniapp

## 用户画像

- 直播导播：需要快速切场、看 Preview/Program、调音量
- 开发者：用模拟器离线体验，或连本地 OBS 调试

## 成功标准

打开 `/controller`，连接 OBS 后 30 秒内可完成：切场景、看 PGM 画面、Mute 麦克风、Studio 下 Trigger Transition。
