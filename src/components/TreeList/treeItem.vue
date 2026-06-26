<template>
  <div class="tree-item">
    <div v-if="options.websocket_version" :class="['leaf-node', { unsupported: !supported }]">
      <span class="node-title">{{ options.title }}</span>
      <span v-if="!supported" class="unsupported-tag">{{ $t('debug.notSupported') }}</span>
    </div>
    <div v-else-if="options.key === 'Requests'" class="root-node">
      <ApiOutlined />
      <span class="node-title">{{ options.title }}</span>
    </div>
    <div v-else-if="options.key === 'Events'" class="root-node">
      <BellOutlined />
      <span class="node-title">{{ options.title }}</span>
    </div>
    <div v-else-if="options.children?.length" class="folder-node">
      <FolderOutlined />
      <span class="node-title">{{ options.title }}</span>
      <span class="count-badge">{{ options.children.length }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { FolderOutlined, BellOutlined, ApiOutlined } from '@ant-design/icons-vue'
import { WSversions } from '../../state'
import semver from 'semver'

interface TreeItemProps {
  title: string
  key: string
  selectable?: boolean
  complexity_rating?: string
  rpc_version?: string
  websocket_version?: string
  obs_version?: string
  children?: unknown[]
}

const props = defineProps({
  options: {
    type: Object as PropType<TreeItemProps>,
    required: true,
    default: () => ({
      title: '',
      key: '',
    }),
  },
})

const supported = computed(() => {
  const localVersion = WSversions.value.obsWebSocketVersion || '0.0.0'
  if (localVersion === '0.0.0') return true
  const remoteVersion = props.options.websocket_version || '5.0.0'
  return semver.gte(localVersion, remoteVersion)
})
</script>

<style scoped lang="scss">
.tree-item {
  display: flex;
  align-items: center;
}

.leaf-node,
.root-node,
.folder-node {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
}

.node-title {
  font-size: 13px;
  color: var(--color-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.unsupported {
  opacity: 0.45;
}

.unsupported-tag {
  font-size: 10px;
  color: var(--color-error);
  flex-shrink: 0;
}

.count-badge {
  font-size: 10px;
  color: var(--color-text-muted);
  background: var(--color-bg-subtle);
  padding: 0 6px;
  border-radius: 8px;
  flex-shrink: 0;
  margin-left: auto;
}
</style>
