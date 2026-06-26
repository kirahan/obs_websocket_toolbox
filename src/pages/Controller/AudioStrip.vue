<template>
  <div class="audio-strip">
    <button
      type="button"
      class="mute-btn"
      :class="{ muted: audio.muted }"
      @click="emit('toggle-mute')"
    >
      M
    </button>
    <div class="audio-main">
      <div class="audio-name" :title="audio.name">{{ audio.name }}</div>
      <div class="audio-controls">
        <div class="vu-bar">
          <div class="vu-fill" :style="{ width: `${Math.min(level * 100, 100)}%` }" />
        </div>
        <a-slider
          :value="Math.round(audio.volume * 100)"
          :disabled="audio.muted"
          :min="0"
          :max="100"
          class="volume-slider"
          @change="onVolumeChange"
        />
        <span class="db-label">{{ dbLabel }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { mulToDb } from '../../obs/controller'

const props = defineProps<{
  audio: {
    name: string
    volume: number
    muted: boolean
  }
  level?: number
}>()

const emit = defineEmits<{
  (e: 'toggle-mute'): void
  (e: 'volume-change', value: number): void
}>()

const dbLabel = computed(() => mulToDb(props.audio.volume))
const level = computed(() => props.level ?? props.audio.volume * 0.6)

function onVolumeChange(value: number | number[]) {
  const numeric = Array.isArray(value) ? value[0] : value
  emit('volume-change', numeric / 100)
}
</script>

<style scoped lang="scss">
.audio-strip {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 56px;
  padding: 6px 0;
  border-bottom: 1px solid var(--color-border-light);
}

.mute-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-elevated);
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  flex-shrink: 0;

  &.muted {
    color: var(--color-error);
    border-color: var(--color-error);
    background: var(--color-error-bg);
  }
}

.audio-main {
  min-width: 0;
  flex: 1;
}

.audio-name {
  font-size: 12px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 4px;
}

.audio-controls {
  display: flex;
  align-items: center;
  gap: 6px;
}

.vu-bar {
  width: 48px;
  height: 8px;
  border-radius: 999px;
  background: var(--color-bg-subtle);
  overflow: hidden;
  flex-shrink: 0;
}

.vu-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-success), var(--color-warning), var(--color-error));
}

.volume-slider {
  flex: 1;
  min-width: 60px;
  margin: 0;
}

.db-label {
  font-size: 10px;
  color: var(--color-text-secondary);
  width: 52px;
  text-align: right;
  flex-shrink: 0;
}
</style>
