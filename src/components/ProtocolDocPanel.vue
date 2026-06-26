<template>
  <aside class="protocol-doc-panel" :style="{ width: `${protocolDocPanelWidth}px` }">
    <div
      class="resize-handle"
      @mousedown="startResize"
    />
    <header class="panel-header">
      <div class="panel-title">
        <BookOutlined />
        <span class="name">{{ protocolDocName }}</span>
      </div>
      <a-space size="small">
        <a-tooltip :title="$t('main.protocolDoc.openInDebugger')">
          <a-button type="text" size="small" @click="openInDebugger">
            <ExportOutlined />
          </a-button>
        </a-tooltip>
        <a-tooltip :title="$t('main.protocolDoc.close')">
          <a-button type="text" size="small" @click="closeProtocolDoc">
            <CloseOutlined />
          </a-button>
        </a-tooltip>
      </a-space>
    </header>
    <iframe
      v-if="iframeSrc"
      :key="iframeSrc"
      class="doc-iframe"
      :src="iframeSrc"
      :title="protocolDocName"
    />
  </aside>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { BookOutlined, CloseOutlined, ExportOutlined } from '@ant-design/icons-vue'
import {
  buildProtocolDocUrl,
  closeProtocolDoc,
  protocolDocName,
  protocolDocPanelWidth,
} from '../state/protocol-doc'

const router = useRouter()

const iframeSrc = computed(() =>
  protocolDocName.value ? buildProtocolDocUrl(protocolDocName.value) : '',
)

const openInDebugger = async () => {
  if (!protocolDocName.value) return
  closeProtocolDoc()
  await router.push('/debug')
}

const startResize = (event: MouseEvent) => {
  event.preventDefault()
  const startX = event.clientX
  const startWidth = protocolDocPanelWidth.value

  const onMove = (moveEvent: MouseEvent) => {
    const delta = startX - moveEvent.clientX
    protocolDocPanelWidth.value = Math.min(900, Math.max(360, startWidth + delta))
  }

  const onUp = () => {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }

  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onUp)
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeProtocolDoc()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped lang="scss">
@import '../styles/resize-handle.scss';

.protocol-doc-panel {
  position: relative;
  flex-shrink: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--color-border);
  background: var(--color-bg-elevated);
  box-shadow: var(--shadow-md);
  z-index: 200;
}

.resize-handle {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6px;
  transform: translateX(-50%);
  cursor: col-resize;
  z-index: 2;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  padding: 0 var(--space-md);
  height: var(--header-height);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  min-width: 0;
  color: var(--color-text);
  font-size: 13px;
  font-weight: 600;

  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: var(--font-mono);
    font-weight: 500;
  }
}

.doc-iframe {
  flex: 1;
  width: 100%;
  border: none;
  background: var(--color-bg);
}
</style>
