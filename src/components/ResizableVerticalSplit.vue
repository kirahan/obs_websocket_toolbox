<template>
  <div ref="containerRef" class="vertical-split">
    <div class="vertical-split-top" :style="{ height: `${upperPercent}%` }">
      <slot name="top" />
    </div>
    <div
      class="vertical-split-handle"
      :class="{ 'is-dragging': dragging }"
      role="separator"
      aria-orientation="horizontal"
      :title="handleHint"
      @mousedown="startDrag"
      @dblclick="resetSplit"
    />
    <div class="vertical-split-bottom">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStorage } from '@vueuse/core'
import {
  clampRowSplit,
  DEFAULT_ROW_SPLIT,
  rowSplitFromPointer,
} from '../utils/controller-row-split'

const { t } = useI18n()
const containerRef = ref<HTMLElement | null>(null)
const upperPercent = useStorage('controller-v3-row-split', DEFAULT_ROW_SPLIT)

const handleHint = computed(() => t('controller.resizeUpperLower'))

const dragging = ref(false)

function resetSplit() {
  upperPercent.value = DEFAULT_ROW_SPLIT
}

function startDrag(event: MouseEvent) {
  event.preventDefault()
  dragging.value = true
  document.body.classList.add('is-row-resizing')
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
}

function onDrag(event: MouseEvent) {
  if (!dragging.value || !containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  upperPercent.value = rowSplitFromPointer(event.clientY, rect.top, rect.height)
}

function stopDrag() {
  dragging.value = false
  document.body.classList.remove('is-row-resizing')
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  if (containerRef.value) {
    upperPercent.value = clampRowSplit(upperPercent.value, containerRef.value.clientHeight)
  }
}

onBeforeUnmount(stopDrag)
</script>

<style scoped lang="scss">
@use '@/styles/resize-handle.scss' as handle;

.vertical-split {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.vertical-split-top {
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.vertical-split-bottom {
  flex: 1 1 0;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.vertical-split-handle {
  @include handle.resize-handle-horizontal;
}
</style>
