<template>
  <div class="header-bar">
    <div v-if="!WSconnected" class="connection-status disconnected">
      <span class="status-dot" />
      <span>{{ $t('debug.connection.disconnected') }}</span>
    </div>
    <div v-else class="connection-info">
      <span class="status-dot connected" />
      <span class="info-item">{{ $t('debug.connection.profile') }}: {{ Profile }}</span>
      <span class="divider" />
      <span class="info-item">{{ $t('debug.connection.sceneCollection') }}: {{ SceneCollection }}</span>
      <span class="divider" />
      <span class="info-item">{{ $t('debug.connection.base') }}: {{ baseSize }}</span>
      <span class="divider" />
      <span class="info-item">{{ $t('debug.connection.output') }}: {{ outputSize }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { WSconnected, OBSVideoConfig, OBSGeneralConfig } from '../../state'

const baseSize = computed(
  () => OBSVideoConfig.baseWidth.value + '×' + OBSVideoConfig.baseHeight.value,
)
const outputSize = computed(
  () => OBSVideoConfig.outputWidth.value + '×' + OBSVideoConfig.outputHeight.value,
)
const Profile = computed(() => OBSGeneralConfig.currentProfile.value)
const SceneCollection = computed(() => OBSGeneralConfig.currentSCname.value)
</script>

<style scoped lang="scss">
.header-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 12px;
}

.connection-status {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-text-muted);
}

.connection-info {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--color-text-secondary);
  flex-wrap: wrap;
  justify-content: center;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-text-muted);
  flex-shrink: 0;

  &.connected {
    background: var(--color-success);
  }
}

.disconnected .status-dot {
  background: var(--color-error);
}

.info-item {
  white-space: nowrap;
}

.divider {
  width: 1px;
  height: 12px;
  background: var(--color-border);
  flex-shrink: 0;
}
</style>
