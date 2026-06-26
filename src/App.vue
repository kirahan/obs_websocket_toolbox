<script setup lang="ts">
import { ConfigProvider, theme } from 'ant-design-vue'
import { computed } from 'vue'
import CommandPalette from './components/CommandPalette.vue'
import ProtocolDocPanel from './components/ProtocolDocPanel.vue'
import { protocolDocPanelOpen } from './state/protocol-doc'

const themeConfig = computed(() => ({
  token: {
    colorPrimary: '#2563eb',
    borderRadius: 6,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    colorBgContainer: '#ffffff',
    colorBorder: '#e5e7eb',
    colorText: '#1a1a2e',
    colorTextSecondary: '#6b7280',
    fontSize: 14,
  },
  algorithm: theme.defaultAlgorithm,
}))
</script>

<template>
  <ConfigProvider :theme="themeConfig">
    <div class="app-shell">
      <div class="app-main">
        <router-view />
      </div>
      <ProtocolDocPanel v-if="protocolDocPanelOpen" />
    </div>
    <CommandPalette />
  </ConfigProvider>
</template>

<style scoped lang="scss">
.app-shell {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.app-main {
  flex: 1;
  min-width: 0;
  overflow: auto;
}
</style>
