<template>
  <div class="event-viewer">
    <div class="section-header">
      <h3>{{ $t('debug.Titles.Detail.EventViewer') }}</h3>
      <div class="event-summary">
        <span>{{ filteredEvents.length }} / {{ eventSource.length }}</span>
        <span>REQ {{ typeCounts.request }}</span>
        <span>RES {{ typeCounts.response }}</span>
        <span>ERR {{ typeCounts.error }}</span>
      </div>
    </div>

    <div class="monitor-toolbar">
      <a-input
        v-model:value="searchText"
        allow-clear
        size="small"
        placeholder="Search events"
      >
        <template #prefix>
          <SearchOutlined />
        </template>
      </a-input>
      <a-segmented
        v-model:value="typeFilter"
        size="small"
        :options="typeFilterOptions"
      />
      <a-button size="small" @click="togglePause">
        <PauseCircleOutlined v-if="!isPaused" />
        <PlayCircleOutlined v-else />
        {{ isPaused ? 'Resume' : 'Pause' }}
      </a-button>
      <a-button
        size="small"
        :disabled="!filteredEvents.length"
        @click="copyVisibleEvents"
      >
        <CopyOutlined />
        Copy
      </a-button>
      <a-button
        v-if="WSEventAndRequestHistory.length"
        size="small"
        danger
        ghost
        @click="clearAll"
      >
        {{ $t('debug.Actions.Clear') }}
      </a-button>
    </div>

    <div v-if="isPaused" class="pause-notice">
      Monitoring is paused. New events are still recorded and will appear after resume.
    </div>

    <div v-if="filteredEvents.length" class="event-list">
      <div
        v-for="item in filteredEvents"
        :key="item.uuid || item.name + item.timestamp"
        class="event-item"
        :class="item.type"
        @click="handleSelect(item)"
      >
        <button class="remove-btn" @click.stop="handleRemove(item)">
          <CloseOutlined />
        </button>
        <span class="type-label">{{ typeLabel(item.type) }}</span>
        <button class="name-btn" @click.stop="handleSeeDoc(item)">{{ item.name }}</button>
        <span class="timestamp">{{ item.timestamp }}</span>
        <div class="params-preview">
          <div
            v-if="item.name === 'GetSourceScreenshot' && item.type === 'response'"
            @click.stop
          >
            <a-image
              :src="item.params['imageData']"
              :preview="showBigImage"
              @click.stop="handleImageClick"
              :width="120"
            />
          </div>
          <span v-else>{{ formatParams(item.params) }}</span>
        </div>
        <a-button size="small" type="text" @click.stop="copyEvent(item)">
          <CopyOutlined />
        </a-button>
      </div>
    </div>

    <div v-else class="empty-events">
      <span>{{ WSEventAndRequestHistory.length ? 'No events match the current filters' : $t('debug.noEvents') }}</span>
    </div>

    <a-drawer
      placement="right"
      :closable="true"
      :width="520"
      :open="open"
      :body-style="{ padding: 0 }"
      @close="onClose"
    >
      <template #title>
        <div class="drawer-title">
          <span class="drawer-name">{{ selectedItem?.name }}</span>
          <span v-if="selectedItem" class="drawer-type-badge" :class="selectedItem.type">
            {{ typeLabel(selectedItem.type) }}
          </span>
        </div>
      </template>

      <template #extra>
        <div class="drawer-actions">
          <a-segmented
            v-model:value="viewMode"
            size="small"
            :options="viewModeOptions"
          />
          <a-tooltip :title="$t('debug.jsonViewer.copy')">
            <a-button type="text" size="small" @click="handleCopy">
              <CopyOutlined />
            </a-button>
          </a-tooltip>
        </div>
      </template>

      <div class="drawer-body">
        <div v-if="selectedItem" class="drawer-meta">
          <span class="meta-time">{{ selectedItem.timestamp }}</span>
          <span v-if="fieldCount > 0" class="meta-count">
            {{ $t('debug.jsonViewer.fieldCount', { count: fieldCount }) }}
          </span>
        </div>

        <div
          v-if="selectedItem?.name === 'GetSourceScreenshot' && selectedItem.type === 'response'"
          class="screenshot-wrap"
        >
          <a-image
            :src="selectedItem.params['imageData']"
            :width="'100%'"
          />
        </div>

        <JsonViewer
          v-else-if="selectedItem"
          :data="parsedParams"
          :view-mode="viewMode"
        />
      </div>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  CopyOutlined,
  CloseOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  I_Event_item,
  WSEventAndRequestHistory,
} from '../../../state'
import { openProtocolDoc } from '../../../state/protocol-doc'
import JsonViewer from './JsonViewer.vue'

const { t } = useI18n()

const showBigImage = ref(false)
const selectedItem = ref<I_Event_item | null>(null)
const open = ref(false)
const viewMode = ref<'tree' | 'raw'>('tree')
const searchText = ref('')
const typeFilter = ref<'all' | 'request' | 'response' | 'error'>('all')
const isPaused = ref(false)
const pausedEvents = ref<I_Event_item[]>([])

const viewModeOptions = computed(() => [
  { label: t('debug.jsonViewer.tree'), value: 'tree' },
  { label: t('debug.jsonViewer.raw'), value: 'raw' },
])

const typeFilterOptions = [
  { label: 'All', value: 'all' },
  { label: 'REQ', value: 'request' },
  { label: 'RES', value: 'response' },
  { label: 'ERR', value: 'error' },
]

const eventSource = computed(() =>
  isPaused.value ? pausedEvents.value : WSEventAndRequestHistory.value,
)

const filteredEvents = computed(() => {
  const query = searchText.value.trim().toLowerCase()
  return eventSource.value.filter((item) => {
    if (typeFilter.value !== 'all' && item.type !== typeFilter.value) return false
    if (!query) return true
    return [
      item.type,
      item.name,
      item.timestamp,
      formatParams(item.params),
    ].some((value) => value.toLowerCase().includes(query))
  })
})

const typeCounts = computed(() => {
  return eventSource.value.reduce(
    (counts, item) => {
      if (item.type === 'request') counts.request += 1
      else if (item.type === 'error') counts.error += 1
      else counts.response += 1
      return counts
    },
    { request: 0, response: 0, error: 0 },
  )
})

const parsedParams = computed(() => {
  const params = selectedItem.value?.params
  if (typeof params === 'string') {
    try {
      return JSON.parse(params)
    } catch {
      return { message: params }
    }
  }
  return params ?? {}
})

const fieldCount = computed(() => {
  const data = parsedParams.value
  if (!data || typeof data !== 'object') return 0
  return Object.keys(data).length
})

const typeLabel = (type: string) => {
  if (type === 'request') return 'REQ'
  if (type === 'error') return 'ERR'
  return 'RES'
}

const formatParams = (params: unknown) => {
  if (typeof params === 'string') return params
  try {
    const str = JSON.stringify(params)
    return str.length > 80 ? str.slice(0, 80) + '…' : str
  } catch {
    return String(params)
  }
}

const onClose = () => {
  open.value = false
}

const clearAll = () => {
  WSEventAndRequestHistory.value = []
  pausedEvents.value = []
  selectedItem.value = null
  open.value = false
}

const handleImageClick = () => {
  showBigImage.value = true
}

const handleSeeDoc = (item: I_Event_item) => {
  openProtocolDoc(item.name)
}

const handleRemove = (element: I_Event_item) => {
  WSEventAndRequestHistory.value = WSEventAndRequestHistory.value.filter(
    (record) => record !== element,
  )
  pausedEvents.value = pausedEvents.value.filter((record) => record !== element)
}

const handleCopy = async () => {
  try {
    const text = JSON.stringify(parsedParams.value, null, 2)
    await navigator.clipboard.writeText(text)
    message.success(t('debug.jsonViewer.copied'))
  } catch {
    message.error(t('debug.jsonViewer.copyFailed'))
  }
}

const stringifyEvent = (item: I_Event_item) => {
  return JSON.stringify(
    {
      type: item.type,
      name: item.name,
      timestamp: item.timestamp,
      params: item.params,
    },
    null,
    2,
  )
}

const writeClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    message.success(t('debug.jsonViewer.copied'))
  } catch {
    message.error(t('debug.jsonViewer.copyFailed'))
  }
}

const copyEvent = async (item: I_Event_item) => {
  await writeClipboard(stringifyEvent(item))
}

const copyVisibleEvents = async () => {
  await writeClipboard(`[${filteredEvents.value.map(stringifyEvent).join(',\n')}]`)
}

const togglePause = () => {
  if (!isPaused.value) {
    pausedEvents.value = [...WSEventAndRequestHistory.value]
    isPaused.value = true
    return
  }
  isPaused.value = false
  pausedEvents.value = []
}

const handleSelect = (item: I_Event_item) => {
  selectedItem.value = item
  viewMode.value = 'tree'
  open.value = true
}
</script>

<style scoped lang="scss">
.event-viewer {
  width: 100%;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);

  h3 {
    font-size: 14px;
    font-weight: 600;
  }
}

.event-summary {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--color-text-muted);
  font-size: 11px;
  font-family: var(--font-mono);
}

.monitor-toolbar {
  display: grid;
  grid-template-columns: minmax(160px, 1fr) auto auto auto auto;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.pause-notice {
  margin-bottom: var(--space-sm);
  padding: 6px var(--space-sm);
  color: var(--color-warning);
  background: var(--color-warning-bg);
  border: 1px solid var(--color-warning);
  border-radius: var(--radius-sm);
  font-size: 12px;
}

.event-list {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  max-height: 240px;
  overflow-y: auto;
}

.event-item {
  display: grid;
  grid-template-columns: 24px 36px minmax(120px, 1fr) 72px minmax(160px, 2fr) 28px;
  align-items: center;
  gap: var(--space-sm);
  padding: 6px var(--space-sm);
  font-size: 12px;
  border-bottom: 1px solid var(--color-border-light);
  cursor: pointer;
  transition: background 0.1s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--color-bg-subtle);
  }

  &.request .type-label {
    color: var(--color-success);
  }

  &.response .type-label {
    color: var(--color-primary);
  }

  &.error .type-label {
    color: var(--color-error);
  }
}

.remove-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--color-text-muted);
  border-radius: 4px;
  padding: 0;
  font-size: 10px;

  &:hover {
    background: var(--color-error-bg);
    color: var(--color-error);
  }
}

.type-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.name-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--color-text);
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: var(--color-primary);
  }
}

.timestamp {
  color: var(--color-text-muted);
  font-size: 11px;
  font-family: var(--font-mono);
}

.params-preview {
  color: var(--color-text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--font-mono);
  font-size: 11px;
}

.empty-events {
  padding: var(--space-lg);
  text-align: center;
  color: var(--color-text-muted);
  font-size: 13px;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
}

.drawer-title {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  min-width: 0;
}

.drawer-name {
  font-size: 14px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.drawer-type-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  letter-spacing: 0.04em;
  flex-shrink: 0;

  &.request {
    background: var(--color-success-bg);
    color: var(--color-success);
  }

  &.response {
    background: var(--color-primary-light);
    color: var(--color-primary);
  }

  &.error {
    background: var(--color-error-bg);
    color: var(--color-error);
  }
}

.drawer-actions {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.drawer-body {
  padding: var(--space-md);
}

.drawer-meta {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--color-border-light);
}

.meta-time {
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--color-text-muted);
}

.meta-count {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.screenshot-wrap {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}
</style>
