<template>
  <a-auto-complete
    v-if="kind === 'text' && dynamicOptions"
    :value="modelValue"
    :options="dynamicOptions.options"
    :placeholder="dynamicOptions.sourceLabel"
    :filter-option="filterOption"
    allow-clear
    size="small"
    class="field-control"
    @update:value="emitValue"
  />
  <a-input
    v-else-if="kind === 'text'"
    :value="modelValue"
    :status="status"
    size="small"
    @update:value="emitValue"
  />
  <a-input-number
    v-else-if="kind === 'number'"
    :value="modelValue"
    :min="range.min"
    :max="range.max"
    :status="status"
    size="small"
    class="field-control"
    @update:value="emitValue"
  />
  <a-radio-group
    v-else-if="kind === 'boolean'"
    :value="modelValue"
    size="small"
    option-type="button"
    button-style="solid"
    class="boolean-control"
    @update:value="emitValue"
  >
    <a-radio-button v-if="!field.require" :value="null">unset</a-radio-button>
    <a-radio-button :value="true">true</a-radio-button>
    <a-radio-button :value="false">false</a-radio-button>
  </a-radio-group>
  <div v-else class="json-builder">
    <a-textarea
      :value="modelValue"
      :disabled="kind === 'json' && hasChildFields"
      :rows="4"
      :status="status"
      size="small"
      @update:value="emitValue"
    />
    <div v-if="!hasChildFields" class="json-actions">
      <a-button size="small" @click="formatJson(2)">Format</a-button>
      <a-button size="small" @click="formatJson(0)">Minify</a-button>
      <a-button size="small" @click="copyValue">Copy</a-button>
      <a-button size="small" danger ghost @click="emitValue(null)">Clear</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { message } from 'ant-design-vue'
import type { I_Request_Params } from '../../data/requests'
import {
  formatJsonDraftValue,
  getFieldKind,
  getNumberRange,
  isEmptyDraftValue,
  type RequestDraftValue,
} from './requestFieldAdapters'
import { useDynamicFieldOptions } from './useDynamicFieldOptions'

const props = defineProps<{
  field: I_Request_Params
  modelValue?: RequestDraftValue
  hasChildFields?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: RequestDraftValue]
}>()

const kind = computed(() => getFieldKind(props.field))
const range = computed(() => getNumberRange(props.field))
const dynamicOptions = useDynamicFieldOptions(props.field)
const status = computed(() =>
  props.field.require && isEmptyDraftValue(props.modelValue) ? 'error' : '',
)

const emitValue = (value: RequestDraftValue) => {
  emit('update:modelValue', value ?? null)
}

const filterOption = (input: string, option: { value: string }) => {
  return option.value.toLowerCase().includes(input.toLowerCase())
}

const formatJson = (space: number) => {
  const result = formatJsonDraftValue(props.field, props.modelValue, space)
  if ('error' in result) {
    message.error(result.error)
    return
  }
  emitValue(result.value ?? null)
}

const copyValue = async () => {
  try {
    await navigator.clipboard.writeText(
      props.modelValue === null || props.modelValue === undefined ? '' : String(props.modelValue),
    )
    message.success('Copied')
  } catch {
    message.error('Copy failed')
  }
}
</script>

<style scoped>
.field-control {
  width: 100%;
}

.boolean-control {
  display: flex;
  width: 100%;

  :deep(.ant-radio-button-wrapper) {
    flex: 1;
    text-align: center;
  }
}

.json-builder {
  display: grid;
  gap: 6px;
}

.json-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
</style>
