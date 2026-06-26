<template>
  <div class="scene-tree-panel panel-inner">
    <div class="panel-header">
      <h3>{{ $t('controller.sceneTree') }}</h3>
      <a-segmented
        v-if="studioMode"
        v-model:value="treeTarget"
        size="small"
        :options="targetOptions"
      />
    </div>

    <div v-if="!connected" class="empty-state">{{ $t('controller.notConnected') }}</div>
    <template v-else>
      <a-tree
        v-model:selected-keys="selectedKeys"
        v-model:expanded-keys="expandedKeys"
        :tree-data="treeData"
        block-node
        @select="onSelect"
      >
        <template #title="{ title, dataRef }">
          <div class="tree-node-row">
            <span>{{ title }}</span>
            <a-space v-if="dataRef?.kind === 'item'" size="small">
              <a-button type="text" size="small" @click.stop="toggleEnabled(dataRef)">
                <eye-outlined v-if="dataRef.enabled" />
                <eye-invisible-outlined v-else />
              </a-button>
              <a-button type="text" size="small" @click.stop="toggleLocked(dataRef)">
                <lock-outlined v-if="dataRef.locked" />
                <unlock-outlined v-else />
              </a-button>
            </a-space>
          </div>
        </template>
      </a-tree>

      <div v-if="selectedDetail" class="detail-card">
        <div class="detail-title">{{ selectedDetail.title }}</div>
        <div class="detail-row">
          <span>{{ $t('controller.enabled') }}</span>
          <strong :class="{ ok: selectedDetail.enabled }">{{ selectedDetail.enabled }}</strong>
        </div>
        <div class="detail-row">
          <span>{{ $t('controller.locked') }}</span>
          <strong>{{ selectedDetail.locked }}</strong>
        </div>
        <div v-if="selectedDetail.type" class="detail-row">
          <span>{{ $t('controller.type') }}</span>
          <strong>{{ selectedDetail.type }}</strong>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons-vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { WSconnected } from '../../state/websocket'
import { OBSstatus } from '../../state/websocket'
import { currentScene, previewScene } from '../../obs/state'
import {
  getSceneItemList,
  getSourceFilterList,
  setSceneItemEnabled,
  setSceneItemLocked,
  type SceneTreeItem,
} from '../../obs/controller'

type TreeNode = {
  key: string
  title: string
  children?: TreeNode[]
  kind?: 'scene' | 'item' | 'filter'
  sceneName?: string
  sceneItemId?: number
  enabled?: boolean
  locked?: boolean
  type?: string
  sourceName?: string
  isLeaf?: boolean
}

const { t } = useI18n()
const treeData = ref<TreeNode[]>([])
const selectedKeys = ref<string[]>([])
const expandedKeys = ref<string[]>([])
const treeTarget = ref<'program' | 'preview'>('program')
const itemsCache = ref<SceneTreeItem[]>([])

const connected = computed(() => WSconnected.value)
const studioMode = computed(() => OBSstatus.isStudioModule.value)
const activeSceneName = computed(() =>
  treeTarget.value === 'preview' && previewScene.value ? previewScene.value : currentScene.value,
)

const targetOptions = computed(() => [
  { label: t('controller.program'), value: 'program' },
  { label: t('controller.preview'), value: 'preview' },
])

const selectedDetail = computed(() => {
  const key = selectedKeys.value[0]
  if (!key) return null
  const node = findNode(treeData.value, key)
  if (!node || node.kind !== 'item') return null
  return {
    title: node.title,
    enabled: node.enabled,
    locked: node.locked,
    type: node.type,
  }
})

function findNode(nodes: TreeNode[], key: string): TreeNode | null {
  for (const node of nodes) {
    if (node.key === key) return node
    if (node.children) {
      const found = findNode(node.children, key)
      if (found) return found
    }
  }
  return null
}

async function loadTree() {
  if (!connected.value || !activeSceneName.value) {
    treeData.value = []
    return
  }
  const items = await getSceneItemList(activeSceneName.value)
  itemsCache.value = items
  const children = await Promise.all(
    items.map(async (item) => {
      const filters = await getSourceFilterList(item.sourceName)
      return {
        key: `item-${item.sceneItemId}`,
        title: item.sourceName,
        kind: 'item' as const,
        sceneName: activeSceneName.value,
        sceneItemId: item.sceneItemId,
        enabled: item.sceneItemEnabled,
        locked: item.sceneItemLocked,
        type: item.sourceType,
        sourceName: item.sourceName,
        children: filters.map((filter) => ({
          key: `filter-${item.sceneItemId}-${filter.filterName}`,
          title: filter.filterName,
          kind: 'filter' as const,
          isLeaf: true,
        })),
      }
    }),
  )
  treeData.value = [
    {
      key: `scene-${activeSceneName.value}`,
      title: activeSceneName.value,
      kind: 'scene',
      sceneName: activeSceneName.value,
      children,
    },
  ]
  expandedKeys.value = [`scene-${activeSceneName.value}`]
}

function onSelect(keys: string[]) {
  selectedKeys.value = keys
}

async function toggleEnabled(node: TreeNode) {
  if (!node.sceneName || node.sceneItemId === undefined) return
  const next = !node.enabled
  await setSceneItemEnabled(node.sceneName, node.sceneItemId, next)
  node.enabled = next
  treeData.value = [...treeData.value]
}

async function toggleLocked(node: TreeNode) {
  if (!node.sceneName || node.sceneItemId === undefined) return
  const next = !node.locked
  await setSceneItemLocked(node.sceneName, node.sceneItemId, next)
  node.locked = next
  treeData.value = [...treeData.value]
}

watch([connected, activeSceneName, studioMode], loadTree)
onMounted(loadTree)
</script>

<style scoped lang="scss">
.scene-tree-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);

  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
  }
}

.tree-node-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  width: 100%;
}

.detail-card {
  margin-top: var(--space-sm);
  padding: var(--space-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg-subtle);
}

.detail-title {
  font-weight: 600;
  margin-bottom: 8px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 4px 0;

  .ok {
    color: var(--color-success);
  }
}

.empty-state {
  color: var(--color-text-muted);
  font-size: 13px;
}

:deep(.ant-tree) {
  background: transparent;
  overflow: auto;
  min-height: 0;
  flex: 1;
}
</style>
