<template>
  <a-modal
    v-model:open="open"
    :footer="null"
    :width="640"
    class="command-palette-modal"
    @after-open-change="handleOpenChange"
  >
    <template #title>
      <div class="palette-title">
        <SearchOutlined />
        <span>Command Palette</span>
      </div>
    </template>

    <div class="command-palette">
      <a-input
        ref="searchInputRef"
        v-model:value="query"
        size="large"
        placeholder="Search requests, presets, profiles..."
        @press-enter="runFirstCommand"
      />

      <div v-if="filteredCommands.length" class="command-list">
        <button
          v-for="command in filteredCommands"
          :key="command.id"
          class="command-item"
          @click="runCommand(command)"
        >
          <span class="command-kind">{{ command.kind }}</span>
          <span class="command-copy">
            <span class="command-title">{{ command.title }}</span>
            <span class="command-subtitle">{{ command.subtitle }}</span>
          </span>
        </button>
      </div>

      <div v-else class="command-empty">No commands found.</div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useStorage } from '@vueuse/core'
import { SearchOutlined } from '@ant-design/icons-vue'
import OBS from '../obs'
import { OBSConnectionConfig, WSEventAndRequestHistory, WSconnected } from '../state'
import { openProtocolDoc } from '../state/protocol-doc'
import { obsEventDetailData } from '../data/events'
import { obsRequestDetailData } from '../data/requests'
import type { OBSRequestTypes } from 'obs-websocket-js'
import type { RequestPreset } from './Detail/useRequestPresets'

interface ConnectionProfile {
  id: string
  name: string
  host: string
  port: string
  password: string
}

interface PaletteCommand {
  id: string
  kind: string
  title: string
  subtitle: string
  search: string
  run: () => void | Promise<void>
}

const obs = OBS.getInstance()
const open = ref(false)
const query = ref('')
const searchInputRef = ref()
const requestPresets = useStorage<RequestPreset[]>('requestPresets', [])
const connectionProfiles = useStorage<ConnectionProfile[]>('connectionProfiles', [])

const navigateToProtocolItem = (name: string) => {
  openProtocolDoc(name)
}

const replayPreset = async (preset: RequestPreset) => {
  if (!WSconnected.value) {
    message.error('websocket not connected')
    return
  }
  WSEventAndRequestHistory.value.push({
    uuid: Math.random().toString(),
    type: 'request',
    name: preset.requestName,
    params: preset.payload,
    timestamp: new Date().toLocaleTimeString(),
  })
  await obs.sendRequest(preset.requestName as keyof OBSRequestTypes, preset.payload)
}

const applyConnectionProfile = (profile: ConnectionProfile) => {
  OBSConnectionConfig.host.value = profile.host
  OBSConnectionConfig.port.value = profile.port
  OBSConnectionConfig.password.value = profile.password
  message.success(`Applied ${profile.name}`)
}

const protocolCommands = computed<PaletteCommand[]>(() => {
  const requests = Object.values(obsRequestDetailData).map((item) => ({
    id: `request:${item.key}`,
    kind: 'Request',
    title: item.title,
    subtitle: item.tags.join(', '),
    search: `${item.title} ${item.tags.join(' ')}`,
    run: () => navigateToProtocolItem(item.key),
  }))

  const events = Object.values(obsEventDetailData).map((item) => ({
    id: `event:${item.key}`,
    kind: 'Event',
    title: item.title,
    subtitle: item.tags.join(', '),
    search: `${item.title} ${item.tags.join(' ')}`,
    run: () => navigateToProtocolItem(item.key),
  }))

  return [...requests, ...events]
})

const presetCommands = computed<PaletteCommand[]>(() =>
  requestPresets.value.map((preset) => ({
    id: `preset:${preset.id}`,
    kind: 'Preset',
    title: preset.name,
    subtitle: `${preset.group} / ${preset.requestName}`,
    search: `${preset.name} ${preset.group} ${preset.requestName}`,
    run: () => replayPreset(preset),
  })),
)

const profileCommands = computed<PaletteCommand[]>(() =>
  connectionProfiles.value.map((profile) => ({
    id: `profile:${profile.id}`,
    kind: 'Profile',
    title: profile.name,
    subtitle: `${profile.host}:${profile.port}`,
    search: `${profile.name} ${profile.host} ${profile.port}`,
    run: () => applyConnectionProfile(profile),
  })),
)

const commands = computed(() => [
  ...presetCommands.value,
  ...profileCommands.value,
  ...protocolCommands.value,
])

const filteredCommands = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return commands.value.slice(0, 24)
  return commands.value
    .filter((command) => command.search.toLowerCase().includes(q))
    .slice(0, 36)
})

const show = () => {
  open.value = true
}

const runCommand = async (command: PaletteCommand) => {
  await command.run()
  open.value = false
  query.value = ''
}

const runFirstCommand = async () => {
  const first = filteredCommands.value[0]
  if (first) await runCommand(first)
}

const handleKeydown = (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    show()
  }
}

const handleOpenEvent = () => show()

const handleOpenChange = async (visible: boolean) => {
  if (!visible) return
  await nextTick()
  searchInputRef.value?.focus?.()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('open-command-palette', handleOpenEvent)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('open-command-palette', handleOpenEvent)
})
</script>

<style scoped lang="scss">
.palette-title {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.command-palette {
  display: grid;
  gap: var(--space-md);
}

.command-list {
  display: grid;
  gap: 4px;
  max-height: 420px;
  overflow-y: auto;
}

.command-item {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  align-items: center;
  gap: var(--space-sm);
  width: 100%;
  padding: 8px var(--space-sm);
  text-align: left;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  background: transparent;
  cursor: pointer;

  &:hover {
    background: var(--color-bg-subtle);
    border-color: var(--color-border);
  }
}

.command-kind {
  color: var(--color-text-muted);
  font-size: 11px;
  font-family: var(--font-mono);
}

.command-copy {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.command-title {
  color: var(--color-text);
  font-size: 13px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.command-subtitle,
.command-empty {
  color: var(--color-text-muted);
  font-size: 12px;
}

.command-empty {
  padding: var(--space-lg);
  text-align: center;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
}
</style>
