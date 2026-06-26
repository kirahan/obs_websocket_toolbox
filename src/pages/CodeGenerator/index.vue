<template>
  <ModuleLayout>
    <div class="module-body full-width">
      <header class="page-header">
        <h1>{{ $t('modules.codeGenerator.title') }}</h1>
        <p>{{ $t('modules.codeGenerator.subtitle') }}</p>
      </header>

      <div class="layout">
        <section class="panel picker">
          <h3>{{ $t('modules.codeGenerator.pickRequest') }}</h3>
          <a-select
            v-model:value="selectedRequest"
            show-search
            style="width: 100%"
            :options="requestOptions"
          />
          <a-divider />
          <h3>{{ $t('modules.codeGenerator.params') }}</h3>
          <a-textarea v-model:value="paramsJson" :rows="10" />
        </section>

        <section class="panel output">
          <div class="output-head">
            <a-segmented v-model:value="language" :options="languageOptions" />
            <a-space>
              <a-button size="small" @click="copyCode">
                <CopyOutlined />
                {{ $t('modules.codeGenerator.copy') }}
              </a-button>
            </a-space>
          </div>
          <pre class="code-block">{{ generatedCode }}</pre>
        </section>
      </div>

      <section class="panel event-section">
        <h3>{{ $t('modules.codeGenerator.eventSubscribe') }}</h3>
        <a-space wrap>
          <a-select v-model:value="selectedEvent" show-search style="width: 280px" :options="eventOptions" />
          <a-button @click="copyEventCode">{{ $t('modules.codeGenerator.copyEvent') }}</a-button>
        </a-space>
        <pre class="code-block small">{{ eventCode }}</pre>
      </section>
    </div>
  </ModuleLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { message } from 'ant-design-vue'
import { CopyOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import ModuleLayout from '../../components/ModuleLayout.vue'
import { obsRequestDetailData } from '../../data/requests'
import { obsEventDetailData } from '../../data/events'
import {
  generateEventSubscribeCode,
  generateRequestCode,
  type CodeLanguage,
} from '../../utils/code-generator'

const { t } = useI18n()

const selectedRequest = ref('GetVersion')
const selectedEvent = ref('CurrentProgramSceneChanged')
const language = ref<CodeLanguage>('javascript')
const paramsJson = ref('{}')

const requestOptions = computed(() =>
  Object.keys(obsRequestDetailData).map((k) => ({ label: k, value: k })),
)
const eventOptions = computed(() =>
  Object.keys(obsEventDetailData).map((k) => ({ label: k, value: k })),
)

const languageOptions = computed(() => [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'curl', value: 'curl' },
  { label: 'JSON', value: 'json' },
])

const parsedParams = computed(() => {
  try {
    return JSON.parse(paramsJson.value || '{}')
  } catch {
    return {}
  }
})

const generatedCode = computed(() =>
  generateRequestCode(language.value, selectedRequest.value, parsedParams.value),
)

const eventCode = computed(() => generateEventSubscribeCode(language.value, selectedEvent.value))

const copyCode = async () => {
  await navigator.clipboard.writeText(generatedCode.value)
  message.success(t('modules.codeGenerator.copied'))
}

const copyEventCode = async () => {
  await navigator.clipboard.writeText(eventCode.value)
  message.success(t('modules.codeGenerator.copied'))
}
</script>

<style scoped lang="scss">
@import '../../styles/module-page.scss';

.full-width {
  max-width: 1100px;
}

.layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: var(--space-md);
  margin-bottom: var(--space-md);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.panel {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-md);

  h3 {
    font-size: 13px;
    font-weight: 600;
    margin-bottom: var(--space-sm);
  }
}

.output-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
  gap: var(--space-sm);
}

.code-block {
  margin: 0;
  padding: var(--space-md);
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;

  &.small {
    margin-top: var(--space-md);
    max-height: 200px;
  }
}

.event-section {
  margin-top: var(--space-md);
}
</style>
