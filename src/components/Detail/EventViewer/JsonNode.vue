<template>
  <div class="json-node" :class="{ nested: depth > 0 }">
    <!-- 可展开对象 / 数组 -->
    <div
      v-if="isExpandable"
      class="expandable-row"
      :style="{ paddingLeft: `${depth * 16}px` }"
    >
      <button class="expand-btn" @click="expanded = !expanded">
        <CaretRightOutlined :class="{ rotated: expanded }" />
      </button>
      <span class="node-key">{{ nodeKey }}</span>
      <span class="type-badge">{{ typeLabel }}</span>
      <span class="preview">{{ collapsedPreview }}</span>
    </div>

    <!-- 叶子节点 -->
    <div
      v-else
      class="leaf-row"
      :style="{ paddingLeft: `${depth * 16 + (depth > 0 ? 22 : 0)}px` }"
    >
      <span class="node-key">{{ nodeKey }}</span>
      <span class="type-badge" :class="typeClass">{{ typeLabel }}</span>
      <span class="node-value" :class="typeClass">{{ displayValue }}</span>
    </div>

    <!-- 子节点 -->
    <div v-if="isExpandable && expanded" class="children">
      <JsonNode
        v-for="child in childEntries"
        :key="child.key"
        :node-key="child.key"
        :value="child.value"
        :depth="depth + 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CaretRightOutlined } from '@ant-design/icons-vue'

const props = defineProps<{
  nodeKey: string
  value: unknown
  depth: number
}>()

const expanded = ref(props.depth < 2)

const valueType = computed(() => {
  if (props.value === null) return 'null'
  if (Array.isArray(props.value)) return 'array'
  return typeof props.value
})

const isExpandable = computed(
  () =>
    valueType.value === 'object' ||
    valueType.value === 'array',
)

const typeLabel = computed(() => {
  switch (valueType.value) {
    case 'string':
      return 'String'
    case 'number':
      return 'Number'
    case 'boolean':
      return 'Boolean'
    case 'null':
      return 'Null'
    case 'array':
      return `Array[${(props.value as unknown[]).length}]`
    case 'object':
      return 'Object'
    default:
      return 'Unknown'
  }
})

const typeClass = computed(() => {
  if (valueType.value === 'boolean') {
    return props.value ? 'bool-true' : 'bool-false'
  }
  return valueType.value as string
})

const displayValue = computed(() => {
  const v = props.value
  if (v === null) return 'null'
  if (v === undefined) return 'undefined'
  if (typeof v === 'string') return v || '""'
  if (typeof v === 'boolean') return String(v)
  if (typeof v === 'number') return String(v)
  return String(v)
})

const collapsedPreview = computed(() => {
  if (valueType.value === 'array') {
    return `[${(props.value as unknown[]).length} items]`
  }
  if (valueType.value === 'object') {
    const keys = Object.keys(props.value as object)
    return `{${keys.length} keys}`
  }
  return ''
})

const childEntries = computed(() => {
  const v = props.value
  if (Array.isArray(v)) {
    return v.map((item, i) => ({ key: String(i), value: item }))
  }
  if (v && typeof v === 'object') {
    return Object.entries(v as Record<string, unknown>).map(([key, value]) => ({
      key,
      value,
    }))
  }
  return []
})
</script>

<style scoped lang="scss">
.json-node {
  &.nested {
    .leaf-row,
    .expandable-row {
      border-radius: 0;
    }
  }
}

.leaf-row,
.expandable-row {
  display: grid;
  grid-template-columns: minmax(80px, 1fr) auto 2fr;
  align-items: center;
  gap: var(--space-sm);
  padding: 8px var(--space-md);
  border-radius: var(--radius-sm);
  transition: background 0.12s;

  &:hover {
    background: var(--color-bg-subtle);
  }
}

.expandable-row {
  grid-template-columns: 22px minmax(80px, 1fr) auto 1fr;
}

.expand-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--color-text-muted);
  padding: 0;
  border-radius: 4px;

  &:hover {
    background: var(--color-border-light);
    color: var(--color-text);
  }

  .anticon {
    font-size: 10px;
    transition: transform 0.15s;

    &.rotated {
      transform: rotate(90deg);
    }
  }
}

.node-key {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.type-badge {
  font-size: 10px;
  font-weight: 500;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--color-bg-subtle);
  color: var(--color-text-muted);
  white-space: nowrap;
  flex-shrink: 0;
}

.node-value {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-secondary);
  text-align: right;
  word-break: break-all;
  white-space: pre-wrap;
  line-height: 1.5;

  &.string {
    color: var(--color-success);
  }

  &.number {
    color: var(--color-info);
  }

  &.bool-true {
    color: var(--color-primary);
  }

  &.bool-false {
    color: var(--color-text-muted);
  }

  &.null {
    color: var(--color-text-muted);
    font-style: italic;
  }
}

.preview {
  font-size: 11px;
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  text-align: right;
}

.children {
  border-left: 1px solid var(--color-border-light);
  margin-left: calc(var(--space-md) + 8px);
}
</style>
