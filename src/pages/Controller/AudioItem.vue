<template>
  <div class="audio-item">
    <div class="audio-info">
      <span class="audio-name">{{ audio.name }}</span>
    </div>
    <div class="audio-actions">
      <a-tooltip :title="audio.muted ? $t('controller.unmute') : $t('controller.mute')">
        <sound-outlined
          v-if="!audio.muted"
          :class="['action-icon']"
          @click="$emit('mute-toggle', audio.id)"
        />
        <stop-outlined
          v-else
          :class="['action-icon']"
          @click="$emit('mute-toggle', audio.id)"
        />
      </a-tooltip>
      <a-slider
        :value="audio.volume"
        :disabled="audio.muted"
        :min="0"
        :max="100"
        :step="1"
        @change="(value) => $emit('volume-change', audio.id, value)"
        style="width: 100px; margin-left: 10px;"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SoundOutlined, StopOutlined } from '@ant-design/icons-vue';

defineProps<{
  audio: {
    id: number;
    name: string;
    volume: number;
    muted: boolean;
  }
}>();

defineEmits<{
  (e: 'volume-change', id: number, volume: number): void;
  (e: 'mute-toggle', id: number): void;
}>();

const getColorByType = (type: string) => {
  const colors: { [key: string]: string } = {
    mic: '#1890ff',
    desktop: '#52c41a',
    browser: '#faad14',
    // 添加更多类型和颜色
  };
  return colors[type] || '#d9d9d9';
};
</script>

<style scoped>
.audio-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-radius: 8px;
  background-color: #3a3a3a;
  margin-bottom: 8px;
  transition: all 0.3s;
}

.audio-item:hover {
  background-color: #4a4a4a;
}

.audio-info {
  display: flex;
  align-items: center;
}

.audio-name {
  margin-left: 10px;
  font-weight: 500;
  color: #ffffff;
}

.audio-actions {
  display: flex;
  align-items: center;
}

.action-icon {
  font-size: 18px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s;
}

.action-icon:hover {
  color: #1890ff;
}

:deep(.ant-slider-rail) {
  background-color: #8c8c8c;
}

:deep(.ant-slider-track) {
  background-color: #1890ff;
}

:deep(.ant-slider-handle) {
  border-color: #1890ff;
}
</style>