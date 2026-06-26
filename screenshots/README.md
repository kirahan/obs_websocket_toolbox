# Screenshots / 截图

按模块分子目录。已上线模块为 **Playwright 实机截取**（简体中文 UI），且每张截图前均会：

1. 将连接配置设为 `__simulator__:4455`
2. 刷新页面并点击底栏 **连接** 按钮
3. 确认底栏出现绿色链环图标与 OBS/CPU 统计后再截图

`planned/` 为规划中模块的 UI 设计稿。

```
screenshots/
├── home/
│   ├── overview.png
│   ├── planned-modules.png
│   └── protocol-doc-panel.png
├── debugger/
│   ├── connected.png
│   ├── request-detail.png
│   ├── search.png
│   ├── event-viewer.png
│   └── json-drawer.png
├── controller/overview.png
├── simulator/overview.png
├── batch-runner/overview.png
├── event-monitor/
│   ├── overview.png
│   └── detail-drawer.png
├── code-generator/overview.png
├── vendor-explorer/overview.png
├── screenshot-studio/overview.png
└── planned/
    ├── stream-deck.png
    ├── automation.png
    ├── webhook-bridge.png
    └── multi-obs.png
```

## 重新生成

```bash
# 终端 1
yarn dev

# 终端 2（需要 Node 18+）
node scripts/capture-screenshots.mjs
```

也可在 Cursor 中用 Playwright MCP 按同样流程截取。
