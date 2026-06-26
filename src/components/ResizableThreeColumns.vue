<template>
  <div ref="containerRef" class="resizable-columns">
    <div class="resizable-columns-pane" :style="{ width: `${leftSplit}%` }">
      <slot name="col1" />
    </div>
    <div
      class="resizable-columns-handle"
      :class="{ 'is-dragging': activeHandle === 0 }"
      role="separator"
      aria-orientation="vertical"
      @mousedown="(event) => startDrag(0, event)"
      @dblclick="resetSizes"
    />
    <div class="resizable-columns-pane" :style="{ width: `${middleSplitPercent}%` }">
      <slot name="col2" />
    </div>
    <div
      class="resizable-columns-handle"
      :class="{ 'is-dragging': activeHandle === 1 }"
      role="separator"
      aria-orientation="vertical"
      @mousedown="(event) => startDrag(1, event)"
      @dblclick="resetSizes"
    />
    <div class="resizable-columns-pane resizable-columns-pane-audio" :style="{ width: `${rightSplit}%` }">
      <slot name="col3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import {
  applyLeftSplitDrag,
  applyRightSplitDrag,
  clampSplitPair,
  DEFAULT_LEFT_SPLIT,
  DEFAULT_RIGHT_SPLIT,
  middleSplit,
  migrateLegacyPaneSizes,
} from '../utils/controller-pane-sizes'

const containerRef = ref<HTMLElement | null>(null)
const leftSplit = useStorage('controller-v3-left-split', DEFAULT_LEFT_SPLIT)
const rightSplit = useStorage('controller-v3-right-split', DEFAULT_RIGHT_SPLIT)

const middleSplitPercent = computed(() => middleSplit(leftSplit.value, rightSplit.value))

const activeHandle = ref<0 | 1 | null>(null)
let startX = 0
let startLeft = DEFAULT_LEFT_SPLIT
let startRight = DEFAULT_RIGHT_SPLIT

function migrateLegacyStorage() {
  const legacy = localStorage.getItem('controller-v3-pane-sizes')
  if (!legacy) return
  if (localStorage.getItem('controller-v3-left-split')) return
  try {
    const parsed = JSON.parse(legacy) as number[]
    const migrated = migrateLegacyPaneSizes(parsed)
    leftSplit.value = migrated.left
    rightSplit.value = migrated.right
  } catch {
    // ignore invalid legacy value
  }
}

function resetSizes() {
  leftSplit.value = DEFAULT_LEFT_SPLIT
  rightSplit.value = DEFAULT_RIGHT_SPLIT
}

function startDrag(handleIndex: 0 | 1, event: MouseEvent) {
  event.preventDefault()
  activeHandle.value = handleIndex
  startX = event.clientX
  startLeft = leftSplit.value
  startRight = rightSplit.value
  document.body.classList.add('is-col-resizing')
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
}

function onDrag(event: MouseEvent) {
  if (activeHandle.value === null || !containerRef.value) return
  const containerWidth = containerRef.value.clientWidth
  const deltaPercent = ((event.clientX - startX) / containerWidth) * 100

  if (activeHandle.value === 0) {
    leftSplit.value = applyLeftSplitDrag(startLeft, startRight, deltaPercent, containerWidth)
    return
  }

  rightSplit.value = applyRightSplitDrag(startLeft, startRight, deltaPercent, containerWidth)
}

function stopDrag() {
  activeHandle.value = null
  document.body.classList.remove('is-col-resizing')
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  if (!containerRef.value) return
  const clamped = clampSplitPair(leftSplit.value, rightSplit.value, containerRef.value.clientWidth)
  leftSplit.value = clamped.left
  rightSplit.value = clamped.right
}

onMounted(migrateLegacyStorage)
onBeforeUnmount(stopDrag)
</script>

<style scoped lang="scss">
@use '@/styles/resize-handle.scss' as handle;

.resizable-columns {
  display: flex;
  min-height: 0;
  height: 100%;
  overflow: hidden;
}

.resizable-columns-pane {
  min-width: 0;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.resizable-columns-handle {
  @include handle.resize-handle-vertical;
}
</style>
