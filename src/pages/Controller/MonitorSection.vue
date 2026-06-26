<template>
  <section class="monitor-section panel">
    <div class="monitor-row" :class="{ single: !studioMode }">
      <MonitorFrame
        v-if="studioMode"
        :label="$t('controller.preview')"
        :image-src="previewImage"
        :scene-name="previewSceneName"
        :placeholder="connected ? $t('controller.loading') : $t('controller.notConnected')"
        @click-monitor="openMenu('preview')"
      />
      <div v-if="studioMode" class="monitor-arrow" aria-hidden="true">
        <arrow-right-outlined />
      </div>
      <MonitorFrame
        :label="$t('controller.program')"
        :image-src="programImage"
        :scene-name="programSceneName"
        :placeholder="connected ? $t('controller.loading') : $t('controller.notConnected')"
        class="program-monitor"
        :class="{ bordered: true }"
        @click-monitor="openMenu('program')"
      />
    </div>

    <a-modal
      v-model:open="menuOpen"
      :title="$t('controller.screenshotMenu')"
      :footer="null"
      width="320px"
    >
      <a-space direction="vertical" style="width: 100%">
        <a-button block @click="downloadCurrent">{{ $t('controller.downloadScreenshot') }}</a-button>
        <a-button block @click="copyCurrent">{{ $t('controller.copyScreenshot') }}</a-button>
      </a-space>
    </a-modal>
  </section>
</template>

<script setup lang="ts">
import { ArrowRightOutlined } from '@ant-design/icons-vue'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { OBSstatus, WSconnected } from '../../state/websocket'
import { currentScene, previewScene } from '../../obs/state'
import {
  copyScreenshot,
  downloadDataUrl,
  getPreviewScene,
  getSceneScreenshot,
} from '../../obs/controller'
import MonitorFrame from './MonitorFrame.vue'

const programImage = ref('')
const previewImage = ref('')
const menuOpen = ref(false)
const menuTarget = ref<'preview' | 'program'>('program')
let pollTimer: ReturnType<typeof setInterval> | null = null

const connected = computed(() => WSconnected.value)
const studioMode = computed(() => OBSstatus.isStudioModule.value)
const programSceneName = computed(() => currentScene.value)
const previewSceneName = computed(() => previewScene.value)

async function refreshProgramImage() {
  if (!connected.value || !currentScene.value) {
    programImage.value = ''
    return
  }
  programImage.value = await getSceneScreenshot(currentScene.value, 640, 360)
}

async function refreshPreviewImage() {
  if (!connected.value || !studioMode.value) {
    previewImage.value = ''
    return
  }
  const name = previewScene.value || (await getPreviewScene())
  previewScene.value = name
  if (!name) {
    previewImage.value = ''
    return
  }
  previewImage.value = await getSceneScreenshot(name, 640, 360)
}

async function refreshMonitors() {
  if (document.hidden || !connected.value) return
  await Promise.allSettled([refreshProgramImage(), refreshPreviewImage()])
}

function startPolling() {
  stopPolling()
  refreshMonitors()
  pollTimer = setInterval(refreshMonitors, 3000)
}

function stopPolling() {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
}

function openMenu(target: 'preview' | 'program') {
  menuTarget.value = target
  menuOpen.value = true
}

function currentImage() {
  return menuTarget.value === 'preview' ? previewImage.value : programImage.value
}

function currentSceneName() {
  return menuTarget.value === 'preview' ? previewSceneName.value : programSceneName.value
}

function downloadCurrent() {
  const image = currentImage()
  if (!image) return
  downloadDataUrl(image, `${currentSceneName() || 'scene'}.jpg`)
  menuOpen.value = false
}

async function copyCurrent() {
  const image = currentImage()
  if (!image) return
  await copyScreenshot(image)
  menuOpen.value = false
}

watch([connected, studioMode, currentScene, previewScene], () => {
  if (connected.value) startPolling()
  else stopPolling()
})

onMounted(() => {
  if (connected.value) startPolling()
  document.addEventListener('visibilitychange', refreshMonitors)
})

onBeforeUnmount(() => {
  stopPolling()
  document.removeEventListener('visibilitychange', refreshMonitors)
})

defineExpose({ refreshMonitors })
</script>

<style scoped lang="scss">
.monitor-section {
  flex: 1 1 auto;
  min-height: 0;
  padding: 0;
  margin: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.monitor-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--space-md);
  align-items: stretch;
  flex: 1;
  min-height: 0;
  height: 100%;
}

.monitor-row.single {
  grid-template-columns: 1fr;
}

.monitor-arrow {
  color: var(--color-text-muted);
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.program-monitor.bordered :deep(.monitor-screen) {
  box-shadow: inset 0 0 0 2px var(--color-primary);
}
</style>
