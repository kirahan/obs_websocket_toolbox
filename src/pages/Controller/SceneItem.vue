<template>
  <div :class="['scene-item', { active: isActive }]" @click="$emit('select')">
    <div class="scene-content">
      {{ scene.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  scene: {
    name: string;
    sceneIndex: number;
  };
  isActive: boolean;
}>();

defineEmits<{
  (e: 'select'): void;
}>();
</script>

<style scoped>
.scene-item {
  width: 100%;
  aspect-ratio: 1 / 1;
  border: none;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  background-color: #3a3a3a;
  box-shadow: 
    0 1px 3px rgba(0,0,0,0.12), 
    0 1px 2px rgba(0,0,0,0.24),
    inset 0 1px 1px rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.scene-content {
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
}

.scene-item:hover {
  background-color: #4a4a4a;
}

.scene-item.active {
  background-color: #e74c3c;
  box-shadow: 
    0 3px 6px rgba(0,0,0,0.16), 
    0 3px 6px rgba(0,0,0,0.23),
    inset 0 1px 1px rgba(255,255,255,0.3);
}
</style>
