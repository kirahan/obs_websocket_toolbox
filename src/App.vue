<script setup lang="ts">
import { ConfigProvider, theme } from 'ant-design-vue'
import { computed } from 'vue'

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
    <router-view />
  </ConfigProvider>
</template>
