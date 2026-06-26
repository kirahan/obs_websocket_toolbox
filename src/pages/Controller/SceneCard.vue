<template>
  <button
    type="button"
    class="scene-card"
    :class="{
      program: isProgram,
      preview: isPreview,
    }"
    @click="emit('select')"
  >
    <div class="scene-thumb">
      <img v-if="thumbnail" :src="thumbnail" :alt="scene.name" />
      <span v-else class="scene-thumb-placeholder">{{ scene.name.slice(0, 1) }}</span>
      <span v-if="isProgram" class="badge program">{{ $t('controller.programBadge') }}</span>
      <span v-if="isPreview" class="badge preview">{{ $t('controller.previewBadge') }}</span>
    </div>
    <span class="scene-name">{{ scene.name }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  scene: { name: string; sceneIndex: number }
  thumbnail?: string
  isProgram?: boolean
  isPreview?: boolean
}>()

const emit = defineEmits<{
  (e: 'select'): void
}>()
</script>

<style scoped lang="scss">
.scene-card {
  border: 1px solid var(--color-border);
  background: var(--color-bg-elevated);
  border-radius: var(--radius-sm);
  padding: 6px;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:hover {
    border-color: var(--color-primary);
  }

  &.program {
    border-color: var(--color-primary);
    box-shadow: inset 0 0 0 1px var(--color-primary);
  }

  &.preview {
    border-color: var(--color-warning);
  }
}

.scene-thumb {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 6px;
  overflow: hidden;
  background: var(--color-bg-subtle);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.scene-thumb-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text-muted);
}

.badge {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 999px;
  color: #fff;
}

.badge.program {
  background: var(--color-primary);
}

.badge.preview {
  background: var(--color-warning);
}

.scene-name {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: var(--color-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
