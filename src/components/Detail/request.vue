<template>
  <div class="detail-panel">
    <template v-if="elementInfo.title">
      <header class="detail-header">
        <div class="title-row">
          <h1>{{ elementInfo.title }}</h1>
          <a-button
            v-if="elementInfo.type === 'request'"
            type="primary"
            size="small"
            @click="sendRequest"
          >
            {{ $t('debug.Actions.Send') }}
          </a-button>
        </div>
        <div class="meta-row">
          <span class="type-badge" :class="elementInfo.type">{{ elementInfo.type }}</span>
          <span v-for="t in elementInfo.tags" :key="t" class="tag-badge">{{ t }}</span>
        </div>
        <div class="description" v-html="elementInfo.des" />
      </header>

      <section class="section">
        <EventViewer />
      </section>

      <section v-if="elementInfo.type === 'request'" class="section">
        <div class="section-header">
          <h3>{{ $t('debug.Titles.Detail.Query') }}</h3>
        </div>
        <a-table
          :columns="QueryColumns"
          :data-source="requestParams"
          size="small"
          :pagination="false"
          :bordered="false"
          class="params-table"
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'name'">
              <span v-if="record.require" class="required">*</span>
              <CaretRightOutlined v-if="record.type === 'Object'" class="object-icon" />
              <span :class="record.parentNode ? 'child-node' : ''">{{ text }}</span>
            </template>
            <template v-else-if="column.dataIndex === 'model'">
              <RequestFieldInput
                v-model="draft[record.name]"
                :field="record"
                :has-child-fields="hasChildFields(record)"
              />
            </template>
            <template v-else>{{ text }}</template>
          </template>
        </a-table>
      </section>

      <section v-if="elementInfo.type === 'request'" class="section payload-section">
        <div class="section-header">
          <h3>Payload Builder</h3>
          <a-space size="small">
            <a-button size="small" @click="copyCurrentPayload">
              <CopyOutlined />
              Copy
            </a-button>
          </a-space>
        </div>
        <pre
          class="payload-preview"
          :class="{ invalid: currentPayloadErrors.length }"
        >{{ currentPayloadText }}</pre>
      </section>

      <section v-if="elementInfo.type === 'request'" class="section diff-section">
        <div class="section-header">
          <h3>Diff Inspector</h3>
          <span v-if="isDiffing" class="diff-status">Capturing...</span>
        </div>
        <div v-if="diffMessage" class="diff-empty">{{ diffMessage }}</div>
        <div v-else-if="diffItems.length" class="diff-list">
          <div v-for="item in diffItems" :key="item.path" class="diff-item" :class="item.type">
            <span class="diff-type">{{ item.type }}</span>
            <span class="diff-path">{{ item.path }}</span>
            <span class="diff-value before">{{ item.before || '∅' }}</span>
            <span class="diff-arrow">→</span>
            <span class="diff-value after">{{ item.after || '∅' }}</span>
          </div>
        </div>
        <div v-else class="diff-empty">
          Send a request while connected to inspect OBS state changes.
        </div>
      </section>

      <section v-if="elementInfo.type === 'request'" class="section presets-section">
        <div class="section-header">
          <h3>Request Presets</h3>
          <a-space size="small">
            <a-input
              v-model:value="presetGroup"
              size="small"
              class="preset-group-input"
              placeholder="Group"
            />
            <a-input
              v-model:value="presetName"
              size="small"
              class="preset-name-input"
              placeholder="Preset name"
              @press-enter="saveCurrentPreset"
            />
            <a-button size="small" type="primary" ghost @click="saveCurrentPreset">
              <StarOutlined />
              Save
            </a-button>
          </a-space>
        </div>
        <div v-if="groupedPresets.length" class="preset-groups">
          <div v-for="group in groupedPresets" :key="group.group" class="preset-group">
            <div class="preset-group-title">{{ group.group }}</div>
            <div class="preset-list">
              <div v-for="preset in group.presets" :key="preset.id" class="preset-item">
                <span class="preset-name">{{ preset.name }}</span>
                <a-space size="small">
                  <a-button size="small" @click="loadPreset(preset.payload)">
                    Load
                  </a-button>
                  <a-button size="small" type="primary" ghost @click="replayPreset(preset)">
                    <PlayCircleOutlined />
                    Replay
                  </a-button>
                  <a-button size="small" danger ghost @click="deletePreset(preset.id)">
                    <DeleteOutlined />
                  </a-button>
                </a-space>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="preset-empty">No presets for this request yet.</div>
      </section>

      <section class="section">
        <div class="section-header">
          <h3>{{ $t('debug.Titles.Detail.Response') }}</h3>
        </div>
        <a-table
          :columns="ResponseColumns"
          :data-source="responseParams"
          size="small"
          :pagination="false"
          :bordered="false"
          class="params-table"
        />
      </section>
    </template>

    <div v-else class="empty-state">
      <ApiOutlined class="empty-icon" />
      <p>{{ $t('debug.selectRequest') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { I_Request_Params, obsRequestDetailData, QueryColumns, ResponseColumns } from '../../data/requests'
import EventViewer from './EventViewer/index.vue'
import RequestFieldInput from './RequestFieldInput.vue'
import OBS from '../../obs'
import { WSEventAndRequestHistory } from '../../state'
import { computed, ref } from 'vue'
import { message } from 'ant-design-vue'
import {
  CaretRightOutlined,
  ApiOutlined,
  CopyOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  StarOutlined,
} from '@ant-design/icons-vue'
import { obsEventDetailData } from '../../data/events'
import { OBSRequestTypes } from 'obs-websocket-js'
import { useRequestDraft } from './useRequestDraft'
import { useRequestPresets, type RequestPreset } from './useRequestPresets'
import { collectDiffItems, type DiffItem } from './diffInspector'

const obs = OBS.getInstance()

const props = defineProps({
  name: {
    type: String,
    required: true,
    default: '',
  },
})

const elementInfo = computed(() => {
  const elementType =
    props.name in obsRequestDetailData
      ? 'request'
      : props.name in obsEventDetailData
        ? 'event'
        : ''

  if (!elementType) return {}

  const elementData =
    elementType === 'request'
      ? obsRequestDetailData[props.name]
      : obsEventDetailData[props.name]

  return {
    key: elementData.key,
    type: elementType,
    title: elementData.title,
    des: elementData.des,
    tags: elementData.tags,
  }
})

const requestName = computed(() => props.name)

const requestParams = computed(() => {
  if (props.name in obsRequestDetailData) {
    return obsRequestDetailData[props.name].requestParams as I_Request_Params[]
  }
  return [] as I_Request_Params[]
})

const { draft, hasChildFields, buildPayload, applyPayload } = useRequestDraft(requestName, requestParams)
const { groupedPresets, savePreset, deletePreset } = useRequestPresets(() => props.name)
const presetGroup = ref('Default')
const presetName = ref('')
const isDiffing = ref(false)
const diffItems = ref<DiffItem[]>([])
const diffMessage = ref('')

const responseParams = computed(() => {
  if (props.name in obsRequestDetailData) {
    return obsRequestDetailData[props.name].responseParams
  } else if (props.name in obsEventDetailData) {
    return obsEventDetailData[props.name].responseParams
  }
  return []
})

const currentPayloadResult = computed(() => buildPayload())
const currentPayloadErrors = computed(() => currentPayloadResult.value.errors)
const currentPayloadText = computed(() => {
  const { errors, payload } = currentPayloadResult.value
  if (errors.length || !payload) return errors[0] || 'request params are invalid'
  return JSON.stringify(payload, null, 2)
})

const sendRequest = async () => {
  if (!obs.connected.value) {
    message.error('websocket not connected')
    return
  }
  if (!props.name) {
    message.error('name is empty')
    return
  }

  const { errors, payload } = buildPayload()
  if (errors.length || !payload) {
    message.error(errors[0] || 'request params are invalid')
    return
  }

  isDiffing.value = true
  diffMessage.value = ''
  diffItems.value = []

  let beforeSnapshot: Record<string, unknown> | null = null
  try {
    beforeSnapshot = await obs.captureDiffSnapshot()
  } catch {
    diffMessage.value = 'Unable to capture OBS state before request.'
  }

  WSEventAndRequestHistory.value.push({
    uuid: Math.random().toString(),
    type: 'request',
    name: props.name,
    params: payload,
    timestamp: new Date().toLocaleTimeString(),
  })
  const result = await obs.sendRequest(props.name as keyof OBSRequestTypes, payload)

  if (!result.ok) {
    diffMessage.value = result.error
      ? `Request failed: ${result.error}`
      : 'Request failed. Diff skipped.'
    isDiffing.value = false
    return
  }

  if (beforeSnapshot) {
    try {
      const afterSnapshot = await obs.captureDiffSnapshot()
      diffItems.value = collectDiffItems(beforeSnapshot, afterSnapshot)
      diffMessage.value = diffItems.value.length ? '' : 'No tracked OBS state changes detected.'
    } catch {
      diffMessage.value = 'Unable to capture OBS state after request.'
    }
  }

  isDiffing.value = false
}

const saveCurrentPreset = () => {
  const { errors, payload } = buildPayload()
  if (errors.length || !payload) {
    message.error(errors[0] || 'request params are invalid')
    return
  }
  savePreset(presetName.value || props.name, presetGroup.value, payload)
  presetName.value = ''
  message.success('Preset saved')
}

const loadPreset = (payload: Record<string, unknown>) => {
  applyPayload(payload)
  message.success('Preset loaded')
}

const copyCurrentPayload = async () => {
  if (currentPayloadErrors.value.length) {
    message.error(currentPayloadErrors.value[0])
    return
  }
  try {
    await navigator.clipboard.writeText(currentPayloadText.value)
    message.success('Payload copied')
  } catch {
    message.error('Copy failed')
  }
}

const replayPreset = (preset: RequestPreset) => {
  if (!obs.connected.value) {
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
  obs.sendRequest(preset.requestName as keyof OBSRequestTypes, preset.payload)
}
</script>

<style scoped lang="scss">
.detail-panel {
  max-width: 900px;
}

.detail-header {
  margin-bottom: var(--space-lg);

  .title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-md);
    margin-bottom: var(--space-sm);

    h1 {
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
  }

  .meta-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: var(--space-md);
  }

  .type-badge {
    font-size: 11px;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.04em;

    &.request {
      background: var(--color-primary-light);
      color: var(--color-primary);
    }

    &.event {
      background: var(--color-info-bg);
      color: var(--color-info);
    }
  }

  .tag-badge {
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 4px;
    background: var(--color-bg-subtle);
    color: var(--color-text-secondary);
  }

  .description {
    font-size: 14px;
    color: var(--color-text-secondary);
    line-height: 1.7;
  }
}

.section {
  margin-bottom: var(--space-lg);

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-sm);

    h3 {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text);
    }
  }
}

.params-table {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.payload-preview {
  max-height: 240px;
  margin: 0;
  padding: var(--space-sm);
  overflow: auto;
  font-size: 12px;
  line-height: 1.6;
  color: var(--color-text);
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);

  &.invalid {
    color: var(--color-error);
    background: var(--color-error-bg);
    border-color: var(--color-error);
  }
}

.diff-status {
  color: var(--color-text-muted);
  font-size: 12px;
}

.diff-list {
  display: grid;
  gap: 4px;
  max-height: 260px;
  overflow: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.diff-item {
  display: grid;
  grid-template-columns: 72px minmax(120px, 1fr) minmax(120px, 1fr) 18px minmax(120px, 1fr);
  align-items: center;
  gap: var(--space-sm);
  padding: 7px var(--space-sm);
  font-size: 12px;

  & + & {
    border-top: 1px solid var(--color-border-light);
  }

  &.added .diff-type {
    color: var(--color-success);
  }

  &.removed .diff-type {
    color: var(--color-error);
  }

  &.changed .diff-type {
    color: var(--color-primary);
  }
}

.diff-type {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
}

.diff-path,
.diff-value,
.diff-arrow {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.diff-path {
  color: var(--color-text);
  font-family: var(--font-mono);
  font-weight: 600;
}

.diff-value {
  color: var(--color-text-secondary);
  font-family: var(--font-mono);

  &.before {
    color: var(--color-error);
  }

  &.after {
    color: var(--color-success);
  }
}

.diff-arrow {
  color: var(--color-text-muted);
  text-align: center;
}

.diff-empty {
  padding: var(--space-sm);
  color: var(--color-text-secondary);
  font-size: 13px;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
}

.preset-group-input {
  width: 100px;
}

.preset-name-input {
  width: 160px;
}

.preset-groups {
  display: grid;
  gap: var(--space-sm);
}

.preset-group {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.preset-group-title {
  padding: 6px var(--space-sm);
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary);
  background: var(--color-bg-subtle);
  border-bottom: 1px solid var(--color-border-light);
}

.preset-list {
  display: grid;
}

.preset-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  padding: 6px var(--space-sm);

  & + & {
    border-top: 1px solid var(--color-border-light);
  }
}

.preset-name {
  min-width: 0;
  font-size: 13px;
  color: var(--color-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.preset-empty {
  padding: var(--space-sm);
  font-size: 13px;
  color: var(--color-text-secondary);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
}

.required {
  color: var(--color-error);
  margin-right: 2px;
}

.object-icon {
  font-size: 10px;
  margin-right: 4px;
  color: var(--color-text-muted);
}

.child-node {
  padding-left: 16px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  color: var(--color-text-muted);

  .empty-icon {
    font-size: 40px;
    margin-bottom: var(--space-md);
    opacity: 0.4;
  }

  p {
    font-size: 14px;
    margin: 0;
  }
}
</style>
