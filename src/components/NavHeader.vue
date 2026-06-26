<template>
  <header class="nav-header">
    <div class="logo" @click="goHome">
      <ArrowLeftOutlined v-if="showBack" class="back-icon" />
      <span class="logo-text">{{ $t('main.title') }}</span>
    </div>
    <nav class="middle-section">
      <slot name="middle" />
    </nav>
    <div class="right-section">
      <a-select
        v-model:value="localLang"
        size="small"
        :bordered="false"
        class="lang-select"
        @change="switchLang"
      >
        <a-select-option v-for="lang in languages" :key="lang.value" :value="lang.value">
          {{ lang.label }}
        </a-select-option>
      </a-select>
      <a-tooltip :title="$t('main.github')">
        <GithubOutlined class="github-icon" @click="goToGithub" />
      </a-tooltip>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeftOutlined, GithubOutlined } from '@ant-design/icons-vue'
import { localLang, switchLang } from '../state'

const router = useRouter()
const route = useRoute()

const showBack = computed(() => route.path !== '/')

const languages = [
  { value: 'en', label: 'EN' },
  { value: 'zh', label: '简' },
  { value: 'tw', label: '繁' },
]

const goToGithub = () => {
  window.open('https://github.com/kirahan/obs_websocket_toolbox', '_blank')
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped lang="scss">
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--space-lg);
  height: var(--header-height);
  background: var(--color-bg-header);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  color: var(--color-text);
  min-width: 160px;

  .back-icon {
    font-size: 14px;
    color: var(--color-text-secondary);
  }

  .logo-text {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
}

.middle-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
}

.right-section {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  min-width: 160px;
  justify-content: flex-end;
}

.lang-select {
  width: 64px;
}

.github-icon {
  font-size: 16px;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 6px;
  border-radius: var(--radius-sm);
  transition: color 0.15s, background 0.15s;

  &:hover {
    color: var(--color-text);
    background: var(--color-bg-subtle);
  }
}

:deep(.ant-select-selector) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: var(--color-text-secondary) !important;
  font-size: 13px !important;
  padding: 0 8px !important;
}

:deep(.ant-select-arrow) {
  color: var(--color-text-muted) !important;
}
</style>
