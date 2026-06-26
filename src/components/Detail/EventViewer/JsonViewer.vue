<template>
  <div class="json-viewer">
    <div v-if="viewMode === 'tree'" class="tree-view">
      <JsonNode
        v-for="entry in rootEntries"
        :key="entry.key"
        :node-key="entry.key"
        :value="entry.value"
        :depth="0"
      />
      <div v-if="rootEntries.length === 0" class="empty">{{ $t('debug.jsonViewer.empty') }}</div>
    </div>
    <div v-else class="raw-view">
      <pretty-json :key="formattedJson">{{ formattedJson }}</pretty-json>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import JsonNode from './JsonNode.vue'

const props = defineProps<{
  data: unknown
  viewMode: 'tree' | 'raw'
}>()

const formattedJson = computed(() => {
  try {
    return JSON.stringify(props.data ?? {}, null, 2)
  } catch {
    return String(props.data)
  }
})

const rootEntries = computed(() => {
  const data = props.data
  if (data === null || data === undefined) return []
  if (typeof data !== 'object') {
    return [{ key: 'value', value: data }]
  }
  if (Array.isArray(data)) {
    return data.map((item, index) => ({ key: String(index), value: item }))
  }
  return Object.entries(data as Record<string, unknown>).map(([key, value]) => ({
    key,
    value,
  }))
})
</script>

<style scoped lang="scss">
.json-viewer {
  font-size: 13px;
}

.tree-view {
  display: flex;
  flex-direction: column;
  gap: 1px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.raw-view {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: auto;
  max-height: calc(100vh - 160px);
  background: var(--color-bg-elevated);

  pretty-json {
    display: block;
    padding: var(--space-md);
    font-size: 12px;
  }
}

.empty {
  padding: var(--space-xl);
  text-align: center;
  color: var(--color-text-muted);
  font-size: 13px;
}
</style>
