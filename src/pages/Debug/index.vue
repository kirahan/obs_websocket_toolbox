<template>
  <div class="debug-page">
    <a-layout class="debug-layout">
      <NavHeader>
        <template #middle>
          <HeaderBar />
        </template>
      </NavHeader>

      <a-layout class="debug-body">
        <a-layout-sider :width="leftTreeWidth" class="sidebar">
          <div class="sidebar-inner">
            <div class="search-bar">
              <a-auto-complete
                v-model:value="searchValue"
                allowClear
                style="width: 100%"
                :options="searchOptions"
                :filter-option="filterOption"
                :placeholder="$t('debug.searchPlaceholder')"
                @select="handleSearchSelect"
              />
            </div>
            <div
              class="summary-item"
              :class="{ active: summarySelected }"
              @click="handleSummaryClick"
            >
              <ReadOutlined />
              <span>{{ $t('debug.Titles.TreeList.summary') }}</span>
            </div>
            <div class="tree-section">
              <a-directory-tree
                :showIcon="false"
                v-model:selectedKeys="selectedKeys"
                v-model:expandedKeys="expandedKeys"
                :tree-data="obsTreeData"
                @click="handleClick"
              >
                <template #title="itemData">
                  <TreeItem :options="itemData" />
                </template>
              </a-directory-tree>
            </div>
          </div>
        </a-layout-sider>

        <div
          class="sash vertical"
          :class="sashClass"
          @mousedown="(event) => startResize(event, true, 'leftTreeWidth')"
        />

        <a-layout-content class="detail-area">
          <Detail :name="detailName" />
        </a-layout-content>
      </a-layout>

      <footer class="status-footer">
        <BottomBar />
      </footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import NavHeader from '../../components/NavHeader.vue'
import HeaderBar from '../../components/HeaderBar/index.vue'
import BottomBar from '../../components/BottomBar/index.vue'
import TreeItem from '../../components/TreeList/treeItem.vue'
import Detail from '../../components/Detail/request.vue'
import { ref, onMounted } from 'vue'
import { ReadOutlined } from '@ant-design/icons-vue'
import { obsTreeData } from '../../data'
import { DataNode } from 'ant-design-vue/es/tree'
import {
  detailName,
  selectedKeys,
  expandedKeys,
  getParentListFromKey,
  leftTreeWidth,
  pageWidgets,
} from '../../state'

const searchValue = ref('')
const summarySelected = ref(false)
const searchOptions = ref<{ value: string; key: string }[]>([])
let animationFrameId: number | null = null
let isResizeDirectionX = true
let widgetNameNeedResize = ''
const sashClass = ref('')

const navigateToItem = (key: string) => {
  if (!key) return
  summarySelected.value = false
  detailName.value = key
  selectedKeys.value = [key]
  const expandedList = getParentListFromKey(key)
  expandedList.forEach((k) => {
    if (!expandedKeys.value.includes(k)) {
      expandedKeys.value.push(k)
    }
  })
}

const handleSearchSelect = (value: string) => {
  navigateToItem(value)
}

const filterOption = (input: string, option: { value: string }) => {
  return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0
}

const expendData = (lists: DataNode[]) => {
  lists.forEach((list) => {
    if (list.children?.length) {
      expendData(list.children)
    } else {
      searchOptions.value.push({
        value: list.title as string,
        key: list.key as string,
      })
    }
  })
}

onMounted(() => {
  expendData(obsTreeData)
})

const handleSummaryClick = () => {
  summarySelected.value = true
  selectedKeys.value = []
}

const handleClick = (_e: Event, data: { key: string }) => {
  summarySelected.value = false
  detailName.value = data.key
}

const startResize = (_event: MouseEvent, isX: boolean, storageName: string) => {
  isResizeDirectionX = isX
  widgetNameNeedResize = storageName
  sashClass.value = 'ischanging'
  document.addEventListener('mousemove', resizeWidget)
  document.addEventListener('mouseup', finishResize)
}

const finishResize = () => {
  document.removeEventListener('mousemove', resizeWidget)
  document.removeEventListener('mouseup', finishResize)
  sashClass.value = ''
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

const resizeWidget = (event: MouseEvent) => {
  if (animationFrameId !== null) return
  animationFrameId = requestAnimationFrame(() => {
    pageWidgets[widgetNameNeedResize].value = isResizeDirectionX
      ? event.clientX
      : event.clientY
    animationFrameId = null
  })
}
</script>

<style scoped lang="scss">
.debug-page {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.debug-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.debug-body {
  flex: 1;
  overflow: hidden;
  display: flex;
}

.sidebar {
  border-right: 1px solid var(--color-border);
  overflow: hidden;
}

.sidebar-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.search-bar {
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--color-border-light);
  flex-shrink: 0;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  font-size: 13px;
  color: var(--color-text-secondary);
  cursor: pointer;
  border-bottom: 1px solid var(--color-border-light);
  flex-shrink: 0;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: var(--color-bg-subtle);
    color: var(--color-text);
  }

  &.active {
    background: var(--color-primary-light);
    color: var(--color-primary);
    font-weight: 500;
  }
}

.tree-section {
  flex: 1;
  overflow: auto;
  padding: var(--space-xs) var(--space-sm);

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 2px;
  }
}

.detail-area {
  overflow-y: auto;
  padding: var(--space-lg);

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 2px;
  }
}

.status-footer {
  height: var(--footer-height);
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-elevated);
  flex-shrink: 0;
}
</style>
