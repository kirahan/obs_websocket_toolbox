<template>
  <ModuleLayout>
    <template #header>
      <ControllerToolbar
        @toggle-record="onToggleRecord"
        @toggle-stream="onToggleStream"
        @toggle-studio="onToggleStudio"
        @toggle-vcam="onToggleVcam"
      />
    </template>

    <div class="controller-page">
      <ResizableVerticalSplit v-if="!isMobile" class="controller-split">
        <template #top>
          <div class="controller-upper">
            <MonitorSection ref="monitorRef" />
            <TransitionBar @trigger="onTrigger" @cut="onCut" />
          </div>
        </template>
        <template #bottom>
          <ResizableThreeColumns class="lower-columns panel">
            <template #col1>
              <ScenePanel />
            </template>
            <template #col2>
              <SceneTreePanel />
            </template>
            <template #col3>
              <AudioPanel />
            </template>
          </ResizableThreeColumns>
        </template>
      </ResizableVerticalSplit>

      <template v-else>
        <div class="controller-upper mobile-upper">
          <MonitorSection ref="monitorRef" />
          <TransitionBar @trigger="onTrigger" @cut="onCut" />
        </div>
        <div class="lower-tabs panel">
        <a-tabs v-model:active-key="mobileTab">
          <a-tab-pane key="scenes" :tab="$t('controller.scenes')">
            <ScenePanel />
          </a-tab-pane>
          <a-tab-pane key="tree" :tab="$t('controller.sceneTree')">
            <SceneTreePanel />
          </a-tab-pane>
          <a-tab-pane key="audio" :tab="$t('controller.audio')">
            <AudioPanel />
          </a-tab-pane>
        </a-tabs>
        </div>
      </template>
    </div>
  </ModuleLayout>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import ModuleLayout from '../../components/ModuleLayout.vue'
import ResizableThreeColumns from '../../components/ResizableThreeColumns.vue'
import ResizableVerticalSplit from '../../components/ResizableVerticalSplit.vue'
import { OBSstatus, WSconnected } from '../../state/websocket'
import {
  cutToPreview,
  initControllerData,
  refreshStatus,
  setStudioModeEnabled,
  subscribeControllerEvents,
  toggleRecord,
  toggleStream,
  toggleVirtualCam,
  triggerTransition,
} from '../../obs/controller'
import AudioPanel from './AudioPanel.vue'
import ControllerToolbar from './ControllerToolbar.vue'
import MonitorSection from './MonitorSection.vue'
import ScenePanel from './ScenePanel.vue'
import SceneTreePanel from './SceneTreePanel.vue'
import TransitionBar from './TransitionBar.vue'

const monitorRef = ref<{ refreshMonitors?: () => void } | null>(null)
const mobileTab = ref('scenes')
const isMobile = useMediaQuery('(max-width: 767px)')
let disposeEvents: (() => void) | null = null

async function bootstrap() {
  if (!WSconnected.value) return
  await initControllerData()
  monitorRef.value?.refreshMonitors?.()
}

async function onToggleRecord() {
  await toggleRecord()
}

async function onToggleStream() {
  await toggleStream()
}

async function onToggleStudio() {
  await refreshStatus()
  await setStudioModeEnabled(!OBSstatus.isStudioModule.value)
  await refreshStatus()
  await bootstrap()
}

async function onToggleVcam() {
  await toggleVirtualCam()
}

async function onTrigger() {
  await triggerTransition()
  monitorRef.value?.refreshMonitors?.()
}

async function onCut() {
  await cutToPreview()
  monitorRef.value?.refreshMonitors?.()
}

onMounted(() => {
  disposeEvents = subscribeControllerEvents({
    onProgramSceneChanged: () => monitorRef.value?.refreshMonitors?.(),
    onPreviewSceneChanged: () => monitorRef.value?.refreshMonitors?.(),
    onStudioModeChanged: () => bootstrap(),
  })
  bootstrap()
})

watch(WSconnected, (value) => {
  if (value) bootstrap()
})

onBeforeUnmount(() => {
  disposeEvents?.()
})
</script>

<style scoped lang="scss">
.controller-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}

.controller-split {
  flex: 1;
  min-height: 0;
}

.controller-upper {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  min-height: 0;
  overflow: hidden;
  padding: var(--space-md) var(--space-md) 0;
}

.controller-upper.mobile-upper {
  flex-shrink: 0;
  max-height: min(50vh, 360px);
}

.lower-columns {
  flex: 1;
  min-height: 0;
  margin: var(--space-sm) var(--space-md) var(--space-md);
  padding: var(--space-sm);
}

.lower-tabs {
  flex: 1;
  min-height: 0;
  margin: 0 var(--space-md) var(--space-md);
  padding: var(--space-sm);
  overflow: hidden;
}

.panel-inner {
  padding: var(--space-sm);
}

:deep(.panel) {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}
</style>
