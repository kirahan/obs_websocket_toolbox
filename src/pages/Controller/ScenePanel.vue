<template>
  <div class="scene-panel panel-inner">
    <div class="panel-header">
      <h3>{{ $t('controller.scenes') }}</h3>
      <a-space size="small">
        <a-button size="small" :disabled="!connected" @click="refreshThumbnails">
          {{ $t('controller.refresh') }}
        </a-button>
        <a-button size="small" :disabled="!connected" @click="exportAll">
          {{ $t('controller.exportAll') }}
        </a-button>
      </a-space>
    </div>

    <div v-if="!connected" class="empty-state">{{ $t('controller.notConnected') }}</div>
    <div v-else class="scene-grid">
      <SceneCard
        v-for="scene in scenesList"
        :key="scene.sceneIndex"
        :scene="scene"
        :thumbnail="thumbnails[scene.name]"
        :is-program="currentScene === scene.name"
        :is-preview="studioMode && previewScene === scene.name"
        @select="() => selectScene(scene.name)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { WSconnected } from '../../state/websocket'
import { OBSstatus } from '../../state/websocket'
import { currentScene, previewScene, scenesList } from '../../obs/state'
import {
  downloadDataUrl,
  getSceneScreenshot,
  setPreviewScene,
  setProgramScene,
} from '../../obs/controller'
import SceneCard from './SceneCard.vue'

const thumbnails = ref<Record<string, string>>({})
const connected = computed(() => WSconnected.value)
const studioMode = computed(() => OBSstatus.isStudioModule.value)

async function refreshThumbnails() {
  if (!connected.value) return
  const entries = await Promise.allSettled(
    scenesList.value.map(async (scene) => {
      const image = await getSceneScreenshot(scene.name, 160, 90)
      return [scene.name, image] as const
    }),
  )
  const next: Record<string, string> = {}
  entries.forEach((entry) => {
    if (entry.status === 'fulfilled') next[entry.value[0]] = entry.value[1]
  })
  thumbnails.value = next
}

async function selectScene(sceneName: string) {
  if (studioMode.value) await setPreviewScene(sceneName)
  else await setProgramScene(sceneName)
}

async function exportAll() {
  await refreshThumbnails()
  scenesList.value.forEach((scene) => {
    const image = thumbnails.value[scene.name]
    if (image) downloadDataUrl(image, `${scene.name}.jpg`)
  })
}

watch(connected, (value) => {
  if (value) refreshThumbnails()
})

onMounted(() => {
  if (connected.value) refreshThumbnails()
})
</script>

<style scoped lang="scss">
.scene-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-sm);

  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
  }
}

.scene-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-sm);
  overflow: auto;
  min-height: 0;
}

.empty-state {
  color: var(--color-text-muted);
  font-size: 13px;
  padding: var(--space-md) 0;
}
</style>
