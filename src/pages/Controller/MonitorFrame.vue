<template>
  <div
    class="monitor-frame"
    :class="{ clickable: !!imageSrc }"
    @click="emit('click-monitor')"
  >
    <div class="monitor-label">{{ label }}</div>
    <div class="monitor-screen">
      <img v-if="imageSrc" :src="imageSrc" :alt="label" class="monitor-image" />
      <div v-else class="monitor-placeholder">
        <span>{{ placeholder }}</span>
      </div>
    </div>
    <div v-if="sceneName" class="monitor-scene-name">{{ sceneName }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  imageSrc?: string
  sceneName?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'click-monitor'): void
}>()
</script>

<style scoped lang="scss">
.monitor-frame {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  min-width: 0;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.monitor-frame.clickable .monitor-screen {
  cursor: pointer;
}

.monitor-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

.monitor-screen {
  position: relative;
  flex: 1 1 auto;
  min-height: 80px;
  width: auto;
  max-width: 100%;
  max-height: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-bg-subtle);
}

.monitor-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  background: #111;
}

.monitor-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  font-size: 13px;
  text-align: center;
  padding: var(--space-md);
}

.monitor-scene-name {
  font-size: 12px;
  color: var(--color-text-secondary);
  flex-shrink: 0;
}
</style>
