<template>
  <div class="event-viewer">
    <div class="section-header">
      <h3>{{ $t('debug.Titles.Detail.EventViewer') }}</h3>
      <a-button
        v-if="WSEventAndRequestHistory.length"
        size="small"
        type="text"
        @click="clearAll"
      >
        {{ $t('debug.Actions.Clear') }}
      </a-button>
    </div>

    <div v-if="WSEventAndRequestHistory.length" class="event-list">
      <div
        v-for="item in WSEventAndRequestHistory"
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
      </div>
    </div>

    <div v-else class="empty-events">
      <span>{{ $t('debug.noEvents') }}</span>
    </div>

    <a-drawer
      placement="right"
      :closable="true"
      :title="selectedTitle"
      :width="480"
      :open="open"
      @close="onClose"
    >
      <template #extra>
        <a-button type="text" size="small" @click="handleCopy">
          <CopyOutlined />
        </a-button>
      </template>
      <div ref="resultRef">
        <pretty-json>{{ selectedData }}</pretty-json>
      </div>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { CopyOutlined, CloseOutlined } from '@ant-design/icons-vue'
import {
  I_Event_item,
  WSEventAndRequestHistory,
  detailName,
  expandedKeys,
  getParentListFromKey,
  selectedKeys,
} from '../../../state'
import { ref } from 'vue'

const showBigImage = ref(false)
const selectedTitle = ref('')
const selectedData = ref('{}')
const resultRef = ref<HTMLElement>()
const open = ref(false)

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
}

const handleImageClick = () => {
  showBigImage.value = true
}

const handleSeeDoc = (item: I_Event_item) => {
  detailName.value = item.name
  selectedKeys.value = [item.name]
  const expandedList = getParentListFromKey(item.name)
  expandedList.forEach((key) => {
    if (!expandedKeys.value.includes(key)) {
      expandedKeys.value.push(key)
    }
  })
}

const handleRemove = (element: I_Event_item) => {
  WSEventAndRequestHistory.value = WSEventAndRequestHistory.value.filter(
    (record) => record !== element,
  )
}

const handleCopy = () => {
  navigator.clipboard.writeText(selectedData.value)
}

const handleSelect = (item: I_Event_item) => {
  open.value = true
  selectedTitle.value = item.name
  selectedData.value = JSON.stringify(item.params || {}, null, 2)
  if (resultRef.value) {
    resultRef.value.innerHTML = ''
    const prettyJson = document.createElement('pretty-json')
    prettyJson.textContent = JSON.stringify(item.params, null, 2)
    resultRef.value.appendChild(prettyJson)
  }
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
  margin-bottom: var(--space-sm);

  h3 {
    font-size: 14px;
    font-weight: 600;
  }
}

.event-list {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  max-height: 240px;
  overflow-y: auto;
}

.event-item {
  display: grid;
  grid-template-columns: 24px 36px 1fr 72px 2fr;
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

  &.request {
    .type-label {
      color: var(--color-success);
    }
  }

  &.response {
    .type-label {
      color: var(--color-primary);
    }
  }

  &.error {
    .type-label {
      color: var(--color-error);
    }
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
</style>
