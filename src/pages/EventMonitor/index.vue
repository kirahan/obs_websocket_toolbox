<template>
  <ModuleLayout>
    <div class="module-body full-width event-monitor-page">
      <header class="page-header row">
        <div>
          <h1>{{ $t('modules.eventMonitor.title') }}</h1>
          <p>{{ $t('modules.eventMonitor.subtitle') }}</p>
        </div>
        <a-space>
          <a-button :type="paused ? 'primary' : 'default'" @click="paused = !paused">
            {{ paused ? $t('modules.eventMonitor.resume') : $t('modules.eventMonitor.pause') }}
          </a-button>
          <a-button @click="exportJson">{{ $t('modules.eventMonitor.exportJson') }}</a-button>
          <a-button @click="exportCsv">{{ $t('modules.eventMonitor.exportCsv') }}</a-button>
          <a-button @click="clearLocal">{{ $t('modules.eventMonitor.clear') }}</a-button>
        </a-space>
      </header>

      <div class="filters panel">
        <a-input
          v-model:value="search"
          :placeholder="$t('modules.eventMonitor.search')"
          allow-clear
          style="max-width: 240px"
        />
        <a-select
          v-model:value="categoryFilter"
          mode="multiple"
          :placeholder="$t('modules.eventMonitor.category')"
          style="min-width: 200px"
          :options="categoryOptions"
        />
        <a-checkbox v-model:checked="showRequests">{{ $t('modules.eventMonitor.showRequests') }}</a-checkbox>
      </div>

      <div class="timeline panel">
        <div class="timeline-header">
          <span>{{ $t('modules.eventMonitor.columns.time') }}</span>
          <span>{{ $t('modules.eventMonitor.columns.type') }}</span>
          <span>{{ $t('modules.eventMonitor.columns.name') }}</span>
          <span>{{ $t('modules.eventMonitor.columns.summary') }}</span>
          <span>{{ $t('modules.eventMonitor.columns.payload') }}</span>
        </div>
        <div
          v-for="item in filteredEvents"
          :key="item.uuid || item.name + item.timestamp"
          class="timeline-item"
          @click="selectItem(item)"
        >
          <span class="time">{{ item.timestamp }}</span>
          <span class="badge" :class="item.type">{{ typeLabel(item.type) }}</span>
          <button class="name" @click.stop="goToDoc(item)">{{ item.name }}</button>
          <EventSummaryLine :summary="getSummary(item)" />
          <span class="payload">{{ formatPayload(item.params) }}</span>
        </div>
        <div v-if="!filteredEvents.length" class="empty">{{ $t('modules.eventMonitor.empty') }}</div>
      </div>

      <a-drawer :open="drawerOpen" :title="selected?.name" :width="520" @close="drawerOpen = false">
        <EventSummaryLine v-if="selected" class="drawer-summary" :summary="getSummary(selected)" show-description />
        <JsonViewer v-if="selected" :data="selected.params" view-mode="tree" />
      </a-drawer>
    </div>
  </ModuleLayout>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ModuleLayout from '../../components/ModuleLayout.vue'
import EventSummaryLine from '../../components/EventSummaryLine.vue'
import JsonViewer from '../../components/Detail/EventViewer/JsonViewer.vue'
import { obsEventDetailData } from '../../data/events'
import { obsEventTreeData } from '../../data/events'
import {
  I_Event_item,
  WSEventAndRequestHistory,
} from '../../state'
import { openProtocolDoc } from '../../state/protocol-doc'
import { buildEventSummary, formatEventSummaryPlain } from '../../utils/event-summary'

const paused = ref(false)
const search = ref('')
const categoryFilter = ref<string[]>([])
const showRequests = ref(true)
const localEvents = ref<I_Event_item[]>([])
const drawerOpen = ref(false)
const selected = ref<I_Event_item | null>(null)

const obsEventNames = new Set(Object.keys(obsEventDetailData))

const eventToCategory = computed(() => {
  const map: Record<string, string> = {}
  obsEventTreeData.forEach((cat) => {
    cat.children?.forEach((child) => {
      if (child.key) map[child.key as string] = cat.title as string
    })
  })
  return map
})

const categoryOptions = computed(() =>
  obsEventTreeData.map((c) => ({ label: c.title as string, value: c.title as string })),
)

watch(
  WSEventAndRequestHistory,
  (history) => {
    if (paused.value) return
    const latest = history[history.length - 1]
    if (!latest) return
    if (localEvents.value.some((e) => e.uuid === latest.uuid && e.timestamp === latest.timestamp)) return
    localEvents.value.push({ ...latest, uuid: latest.uuid || crypto.randomUUID() })
  },
  { deep: true },
)

const filteredEvents = computed(() => {
  return localEvents.value
    .filter((item) => {
      if (!showRequests.value && item.type === 'request') return false
      if (!showRequests.value && item.type === 'error') return false
      if (!showRequests.value && !obsEventNames.has(item.name) && item.type !== 'request') {
        // keep responses that are request responses
        if (item.type === 'response' && !obsEventNames.has(item.name)) return false
      }
      if (search.value) {
        const q = search.value.toLowerCase()
        const inName = item.name.toLowerCase().includes(q)
        const inSummary = formatEventSummaryPlain(item).toLowerCase().includes(q)
        const inPayload = formatPayload(item.params).toLowerCase().includes(q)
        if (!inName && !inSummary && !inPayload) return false
      }
      if (categoryFilter.value.length && obsEventNames.has(item.name)) {
        const cat = eventToCategory.value[item.name]
        if (!categoryFilter.value.includes(cat)) return false
      }
      return true
    })
    .reverse()
})

const getSummary = (item: I_Event_item) => buildEventSummary(item)

const typeLabel = (type: string) => {
  if (type === 'request') return 'REQ'
  if (type === 'error') return 'ERR'
  return 'EVT'
}

const formatPayload = (params: unknown) => {
  try {
    const s = typeof params === 'string' ? params : JSON.stringify(params)
    return s.length > 120 ? `${s.slice(0, 120)}…` : s
  } catch {
    return String(params)
  }
}

const selectItem = (item: I_Event_item) => {
  selected.value = item
  drawerOpen.value = true
}

const goToDoc = (item: I_Event_item) => {
  openProtocolDoc(item.name)
}

const clearLocal = () => {
  localEvents.value = []
}

const exportJson = () => {
  const blob = new Blob([JSON.stringify(localEvents.value, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'obs-events.json'
  a.click()
  URL.revokeObjectURL(url)
}

const exportCsv = () => {
  const rows = localEvents.value.map((e) =>
    [e.timestamp, e.type, e.name, formatEventSummaryPlain(e), formatPayload(e.params)]
      .map((c) => `"${String(c).replace(/"/g, '""')}"`)
      .join(','),
  )
  const csv = ['timestamp,type,name,summary,payload', ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'obs-events.csv'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped lang="scss">
@import '../../styles/module-page.scss';

.full-width {
  max-width: 1400px;
}

.page-header.row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-md);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  align-items: center;
  margin-bottom: var(--space-md);
  padding: var(--space-md);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.timeline {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg-elevated);
  max-height: calc(100vh - 220px);
  overflow-y: auto;
}

.timeline-header {
  display: grid;
  grid-template-columns: 80px 48px 180px minmax(180px, 1fr) minmax(220px, 1.2fr);
  gap: var(--space-sm);
  padding: 8px var(--space-md);
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  background: var(--color-bg-elevated);
  z-index: 1;
}

.timeline-item {
  display: grid;
  grid-template-columns: 80px 48px 180px minmax(180px, 1fr) minmax(220px, 1.2fr);
  gap: var(--space-sm);
  align-items: start;
  padding: 10px var(--space-md);
  border-bottom: 1px solid var(--color-border-light);
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: var(--color-bg-subtle);
  }
}

.time {
  font-family: var(--font-mono);
  color: var(--color-text-muted);
}

.badge {
  font-size: 10px;
  font-weight: 700;
  &.request { color: var(--color-success); }
  &.response { color: var(--color-primary); }
  &.error { color: var(--color-error); }
}

.name {
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 500;
  text-align: left;
  padding: 0;
  color: var(--color-text);
  align-self: start;
  padding-top: 2px;
}

.drawer-summary {
  padding: var(--space-md);
  border-bottom: 1px solid var(--color-border-light);
  margin-bottom: var(--space-sm);
}

.payload {
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-self: start;
  padding-top: 2px;
}

.empty {
  padding: var(--space-xl);
  text-align: center;
  color: var(--color-text-muted);
}
</style>
