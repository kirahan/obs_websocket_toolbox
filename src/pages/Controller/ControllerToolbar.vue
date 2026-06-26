<template>
  <div class="controller-toolbar">
    <a-tooltip :title="isRecording ? $t('controller.stopRecording') : $t('controller.startRecording')">
      <button
        type="button"
        class="toolbar-btn"
        :class="{ active: isRecording, danger: isRecording }"
        @click="emit('toggle-record')"
      >
        <video-camera-outlined />
        <span>{{ $t('controller.record') }}</span>
      </button>
    </a-tooltip>
    <a-tooltip :title="isStreaming ? $t('controller.stopStreaming') : $t('controller.startStreaming')">
      <button
        type="button"
        class="toolbar-btn"
        :class="{ active: isStreaming, success: isStreaming }"
        @click="emit('toggle-stream')"
      >
        <wifi-outlined />
        <span>{{ $t('controller.stream') }}</span>
      </button>
    </a-tooltip>
    <a-tooltip :title="isStudioMode ? $t('controller.exitStudioMode') : $t('controller.enterStudioMode')">
      <button
        type="button"
        class="toolbar-btn"
        :class="{ active: isStudioMode }"
        @click="emit('toggle-studio')"
      >
        <layout-outlined />
        <span>{{ $t('controller.studio') }}</span>
      </button>
    </a-tooltip>
    <a-tooltip
      :title="isVirtualCam ? $t('controller.stopVirtualCamera') : $t('controller.startVirtualCamera')"
    >
      <button
        type="button"
        class="toolbar-btn"
        :class="{ active: isVirtualCam }"
        @click="emit('toggle-vcam')"
      >
        <camera-outlined />
        <span>{{ $t('controller.virtualCam') }}</span>
      </button>
    </a-tooltip>
  </div>
</template>

<script setup lang="ts">
import {
  CameraOutlined,
  LayoutOutlined,
  VideoCameraOutlined,
  WifiOutlined,
} from '@ant-design/icons-vue'
import { computed } from 'vue'
import { OBSstatus } from '../../state/websocket'

const emit = defineEmits<{
  (e: 'toggle-record'): void
  (e: 'toggle-stream'): void
  (e: 'toggle-studio'): void
  (e: 'toggle-vcam'): void
}>()

const isRecording = computed(() => OBSstatus.isRecording.value)
const isStreaming = computed(() => OBSstatus.isStreaming.value)
const isStudioMode = computed(() => OBSstatus.isStudioModule.value)
const isVirtualCam = computed(() => OBSstatus.isVirtualCam.value)
</script>

<style scoped lang="scss">
.controller-toolbar {
  display: flex;
  gap: var(--space-sm);
  align-items: center;
}

.toolbar-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-elevated);
  color: var(--color-text);
  border-radius: var(--radius-sm);
  padding: 6px 10px;
  cursor: pointer;
  font-size: 13px;

  &.active {
    border-color: var(--color-primary);
    color: var(--color-primary);
    background: var(--color-primary-light);
  }

  &.danger.active {
    border-color: var(--color-error);
    color: var(--color-error);
    background: var(--color-error-bg);
  }

  &.success.active {
    border-color: var(--color-success);
    color: var(--color-success);
    background: var(--color-success-bg);
  }
}
</style>
