<template>
  <div class="source-item">
    <div class="source-info">
      <a-avatar :style="{ backgroundColor: getColorByType(source.type) }">
        {{ source.type.charAt(0).toUpperCase() }}
      </a-avatar>
      <span class="source-name">{{ source.name }}</span>
    </div>
    <div class="source-actions">
      <a-tooltip :title="source.enabled ? $t('controller.hideSource') : $t('controller.showSource')">
        <eye-outlined
          :class="['action-icon', { 'active': source.enabled }]"
          @click="$emit('toggle', source.id)"
        />
      </a-tooltip>
      <a-tooltip :title="source.locked ? $t('controller.unlockSource') : $t('controller.lockSource')">
        <lock-outlined
          :class="['action-icon', { 'active': source.locked }]"
          @click="$emit('toggle-lock', source.id)"
        />
      </a-tooltip>
      <a-tooltip :title="$t('controller.deleteSource')">
        <delete-outlined
          class="action-icon delete"
          @click="$emit('delete', source.id)"
        />
      </a-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EyeOutlined, LockOutlined, DeleteOutlined } from '@ant-design/icons-vue';

defineProps<{
  source: {
    id: number;
    name: string;
    enabled: boolean;
    locked: boolean;
    type: string;
  }
}>();

defineEmits<{
  (e: 'toggle', id: number): void;
  (e: 'toggle-lock', id: number): void;
  (e: 'delete', id: number): void;
}>();

const getColorByType = (type: string) => {
  const colors: { [key: string]: string } = {
    video: '#1890ff',
    display_capture: '#52c41a',
    audio: '#faad14',
    text: '#722ed1',
    browser: '#eb2f96',
    // 添加更多类型和颜色
  };
  return colors[type] || '#d9d9d9';
};
</script>

<style scoped>
.source-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-radius: 8px;
  background-color: #3a3a3a;
  margin-bottom: 8px;
  transition: all 0.3s;
}

.source-item:hover {
  background-color: #4a4a4a;
}

.source-info {
  display: flex;
  align-items: center;
}

.source-name {
  margin-left: 10px;
  font-weight: 500;
}

.source-actions {
  display: flex;
  gap: 12px;
}

.action-icon {
  font-size: 18px;
  color: #8c8c8c;
  cursor: pointer;
  transition: all 0.3s;
}

.action-icon:hover {
  color: #1890ff;
}

.action-icon.active {
  color: #1890ff;
}

.action-icon.delete:hover {
  color: #ff4d4f;
}
</style>