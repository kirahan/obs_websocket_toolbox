<template>
  <div class="audio-panel panel-inner">
    <div class="panel-header">
      <h3>{{ $t('controller.audio') }}</h3>
    </div>

    <div v-if="!connected" class="empty-state">{{ $t('controller.notConnected') }}</div>
    <div v-else class="audio-list">
      <AudioStrip
        v-for="audio in audioSources"
        :key="audio.name"
        :audio="audio"
        :level="levels[audio.name]"
        @toggle-mute="() => toggleMute(audio.name)"
        @volume-change="(value) => setVolume(audio.name, value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { WSconnected } from '../../state/websocket'
import { inputsList } from '../../obs/state'
import {
  getInputMute,
  getInputVolume,
  setInputVolume,
  subscribeVolumeMeters,
  toggleInputMute,
  unsubscribeVolumeMeters,
} from '../../obs/controller'
import AudioStrip from './AudioStrip.vue'

interface AudioSource {
  name: string
  volume: number
  muted: boolean
}

const audioSources = ref<AudioSource[]>([])
const levels = ref<Record<string, number>>({})
const connected = computed(() => WSconnected.value)

async function loadAudioSources() {
  if (!connected.value) {
    audioSources.value = []
    return
  }
  const entries = await Promise.allSettled(
    inputsList.value.map(async (input) => {
      const [volume, muted] = await Promise.all([
        getInputVolume(input.name),
        getInputMute(input.name),
      ])
      return { name: input.name, volume, muted } satisfies AudioSource
    }),
  )
  audioSources.value = entries
    .filter((entry): entry is PromiseFulfilledResult<AudioSource> => entry.status === 'fulfilled')
    .map((entry) => entry.value)
}

async function toggleMute(name: string) {
  await toggleInputMute(name)
  await loadAudioSources()
}

async function setVolume(name: string, volume: number) {
  await setInputVolume(name, volume)
  const target = audioSources.value.find((item) => item.name === name)
  if (target) target.volume = volume
}

function handleLevels(next: Record<string, number>) {
  levels.value = { ...levels.value, ...next }
}

watch([connected, () => inputsList.value.length], loadAudioSources)

onMounted(() => {
  loadAudioSources()
  subscribeVolumeMeters(handleLevels)
})

onBeforeUnmount(() => {
  unsubscribeVolumeMeters(handleLevels)
})
</script>

<style scoped lang="scss">
.audio-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.panel-header h3 {
  margin: 0 0 var(--space-sm);
  font-size: 14px;
  font-weight: 600;
}

.audio-list {
  overflow: auto;
  min-height: 0;
}

.empty-state {
  color: var(--color-text-muted);
  font-size: 13px;
}
</style>
