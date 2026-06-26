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
              <a-input
                v-if="record.type !== 'Object'"
                v-model:value="modelStorage[record.name]"
                :status="record.require && !modelStorage[record.name] ? 'error' : ''"
                size="small"
                @blur="() => inputBlur(record)"
              />
              <a-textarea
                v-else
                :disabled="!record.isCustomerObject"
                :rows="3"
                v-model:value="modelStorage[record.name]"
                :status="record.require && !modelStorage[record.name] ? 'error' : ''"
                size="small"
              />
            </template>
            <template v-else>{{ text }}</template>
          </template>
        </a-table>
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
import OBS from '../../obs'
import { WSEventAndRequestHistory } from '../../state'
import { computed } from 'vue'
import { message } from 'ant-design-vue'
import { CaretRightOutlined, ApiOutlined } from '@ant-design/icons-vue'
import { useStorage } from '@vueuse/core'
import { obsEventDetailData } from '../../data/events'
import { OBSRequestTypes } from 'obs-websocket-js'

const obs = OBS.getInstance()

const props = defineProps({
  name: {
    type: String,
    required: true,
    default: '',
  },
})

const modelStorage = useStorage('modelStorage', {} as { [index: string]: string })

const inputBlur = (record: I_Request_Params) => {
  updateParentNode(record)
}

const updateParentNode = (childRecord: I_Request_Params) => {
  const childNode = childRecord.name
  const parentNode = childRecord.parentNode
  if (!parentNode) return
  const realChildKey = childRecord.name.replace(childRecord.parentNode + '.', '')

  if (!modelStorage.value[parentNode]) {
    modelStorage.value[parentNode] = '{}'
  }

  const parentObject = JSON.parse(modelStorage.value[parentNode]) || {}
  parentObject[realChildKey] = modelStorage.value[childNode] || childRecord.default || ''
  modelStorage.value[parentNode] = JSON.stringify(parentObject)
}

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

const requestParams = computed(() => {
  if (props.name in obsRequestDetailData) {
    const params = obsRequestDetailData[props.name].requestParams as I_Request_Params[]
    params.forEach((item) => {
      if (!Object.keys(modelStorage.value).includes(item.name)) {
        modelStorage.value[item.name] = item.default || (item.type === 'Object' ? '{}' : '')
        if (item.parentNode) {
          updateParentNode(item)
        }
      }
    })
    return params
  }
  return [] as I_Request_Params[]
})

const responseParams = computed(() => {
  if (props.name in obsRequestDetailData) {
    return obsRequestDetailData[props.name].responseParams
  } else if (props.name in obsEventDetailData) {
    return obsEventDetailData[props.name].responseParams
  }
  return []
})

const validateParams = () => {
  let valid = true
  requestParams.value?.forEach((item) => {
    if (item.require && !modelStorage.value[item.name]) {
      message.error(`${item.name} is required`)
      valid = false
    }
  })
  return valid
}

const sendRequest = () => {
  if (!obs.connected.value) {
    message.error('websocket not connected')
    return
  }
  if (!props.name) {
    message.error('name is empty')
    return
  }

  if (!validateParams()) return

  const query = {} as { [index: string]: unknown }
  requestParams.value?.forEach((item) => {
    if (!item.parentNode && modelStorage.value[item.name]) {
      const dataType = item.type.toLocaleLowerCase()
      switch (dataType) {
        case 'string':
          query[item.name] = modelStorage.value[item.name]
          break
        case 'number':
          query[item.name] = Number(modelStorage.value[item.name])
          break
        case 'boolean':
          query[item.name] = modelStorage.value[item.name] === 'true'
          break
        case 'object':
          query[item.name] = JSON.parse(modelStorage.value[item.name])
          break
      }
    }
  })

  WSEventAndRequestHistory.value.push({
    uuid: Math.random().toString(),
    type: 'request',
    name: props.name,
    params: query,
    timestamp: new Date().toLocaleTimeString(),
  })
  obs.sendRequest(props.name as keyof OBSRequestTypes, query)
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
