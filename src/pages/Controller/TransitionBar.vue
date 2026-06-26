<template>
  <section class="transition-bar panel">
    <div class="transition-controls">
      <a-select
        :value="transitionName"
        :options="transitionOptions"
        style="min-width: 120px"
        @change="onTransitionChange"
      />
      <a-input-number
        :value="duration"
        :min="0"
        :max="20000"
        :addon-after="$t('controller.ms')"
        @change="onDurationChange"
      />
      <template v-if="studioMode">
        <div class="tbar-wrap">
          <span class="tbar-label">T-Bar</span>
          <a-slider
            :value="tBar"
            :min="0"
            :max="100"
            style="width: 160px"
            @change="onTBarChange"
          />
          <span class="tbar-value">{{ tBar }}%</span>
        </div>
        <a-button type="primary" @click="emit('trigger')">{{ $t('controller.transitionAction') }}</a-button>
        <a-button @click="emit('cut')">{{ $t('controller.cut') }}</a-button>
      </template>
    </div>
    <div v-if="studioMode" class="transition-flow">
      Preview {{ previewSceneName || '—' }} → Program {{ programSceneName || '—' }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { OBSstatus } from '../../state/websocket'
import { currentScene, previewScene, transitionsList } from '../../obs/state'
import {
  getCurrentTransition,
  setCurrentTransition,
  setTransitionDuration,
  setTBarPosition,
} from '../../obs/controller'

const emit = defineEmits<{
  (e: 'trigger'): void
  (e: 'cut'): void
}>()

const transitionName = ref('Fade')
const duration = ref(300)
const tBar = ref(60)

const studioMode = computed(() => OBSstatus.isStudioModule.value)
const programSceneName = computed(() => currentScene.value)
const previewSceneName = computed(() => previewScene.value)
const transitionOptions = computed(() =>
  transitionsList.value.map((item) => ({ label: item.name, value: item.name })),
)

async function loadTransition() {
  const current = await getCurrentTransition()
  transitionName.value = current.name
  duration.value = current.duration
}

async function onTransitionChange(value: string) {
  transitionName.value = value
  await setCurrentTransition(value)
}

async function onDurationChange(value: number | null) {
  if (value === null) return
  duration.value = value
  await setTransitionDuration(value)
}

async function onTBarChange(value: number | number[]) {
  const position = Array.isArray(value) ? value[0] : value
  tBar.value = position
  await setTBarPosition(position / 100)
}

watch(
  () => transitionsList.value.length,
  () => {
    loadTransition()
  },
)

onMounted(loadTransition)
</script>

<style scoped lang="scss">
.transition-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  padding: 8px var(--space-md);
  min-height: 48px;
  flex-shrink: 0;
  margin: 0 var(--space-md) var(--space-sm);
  position: relative;
  z-index: 1;
}

.transition-controls {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.tbar-wrap {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.tbar-label,
.tbar-value {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.transition-flow {
  font-size: 12px;
  color: var(--color-text-secondary);
  white-space: nowrap;
}
</style>
