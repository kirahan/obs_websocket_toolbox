<template>
  <ModuleLayout>
    <div class="module-body">
      <header class="page-header">
        <h1>{{ $t('modules.batchRunner.title') }}</h1>
        <p>{{ $t('modules.batchRunner.subtitle') }}</p>
      </header>

      <div class="toolbar">
        <a-space wrap>
          <a-select v-model:value="executionMode" style="width: 160px">
            <a-select-option value="serial">{{ $t('modules.batchRunner.modeSerial') }}</a-select-option>
            <a-select-option value="parallel">{{ $t('modules.batchRunner.modeParallel') }}</a-select-option>
          </a-select>
          <a-button type="primary" :loading="running" :disabled="!WSconnected" @click="runAll">
            {{ $t('modules.batchRunner.runAll') }}
          </a-button>
          <a-button @click="addStep">{{ $t('modules.batchRunner.addStep') }}</a-button>
          <a-button @click="exportBatch">{{ $t('modules.batchRunner.export') }}</a-button>
          <a-button @click="importBatch">{{ $t('modules.batchRunner.import') }}</a-button>
        </a-space>
        <a-tag :color="WSconnected ? 'success' : 'error'">
          {{ WSconnected ? $t('modules.batchRunner.connected') : $t('modules.batchRunner.notConnected') }}
        </a-tag>
      </div>

      <div class="layout">
        <section class="panel steps-panel">
          <h3>{{ $t('modules.batchRunner.steps') }}</h3>
          <div v-if="steps.length" class="step-list">
            <div v-for="(step, index) in steps" :key="step.id" class="step-item">
              <div class="step-head">
                <span class="step-index">{{ index + 1 }}</span>
                <a-select
                  v-model:value="step.requestType"
                  show-search
                  style="flex: 1"
                  :options="requestOptions"
                />
                <a-button size="small" @click="removeStep(step.id)">
                  <DeleteOutlined />
                </a-button>
              </div>
              <a-textarea
                v-model:value="stepDataJson[step.id]"
                :rows="3"
                placeholder="{}"
                @blur="syncStepData(step)"
              />
              <a-input-number
                v-model:value="step.delayAfterMs"
                :min="0"
                :max="60000"
                addon-after="ms"
                size="small"
                class="delay-input"
              />
              <a-button size="small" :disabled="!WSconnected" @click="runStep(step)">
                {{ $t('modules.batchRunner.runStep') }}
              </a-button>
            </div>
          </div>
          <div v-else class="empty">{{ $t('modules.batchRunner.emptySteps') }}</div>
        </section>

        <section class="panel log-panel">
          <h3>{{ $t('modules.batchRunner.log') }}</h3>
          <div v-if="logs.length" class="log-list">
            <div v-for="log in logs" :key="log.id" class="log-item" :class="{ error: !log.ok }">
              <span class="log-name">{{ log.requestType }}</span>
              <span class="log-meta">{{ log.durationMs }}ms</span>
              <span class="log-status">{{ log.ok ? 'OK' : 'ERR' }}</span>
            </div>
          </div>
          <div v-else class="empty">{{ $t('modules.batchRunner.emptyLog') }}</div>
        </section>
      </div>
    </div>
  </ModuleLayout>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { message } from 'ant-design-vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
import ModuleLayout from '../../components/ModuleLayout.vue'
import { obsRequestDetailData } from '../../data/requests'
import OBS from '../../obs'
import { WSconnected } from '../../state'
import type { BatchRunLog, BatchStep } from '../../state/batch'

const obs = OBS.getInstance()
const steps = useStorage<BatchStep[]>('batchRunnerSteps', [])
const executionMode = useStorage<'serial' | 'parallel'>('batchRunnerMode', 'serial')
const running = ref(false)
const logs = ref<BatchRunLog[]>([])
const stepDataJson = reactive<Record<string, string>>({})

const requestOptions = computed(() =>
  Object.keys(obsRequestDetailData).map((key) => ({ label: key, value: key })),
)

const syncStepData = (step: BatchStep) => {
  try {
    step.requestData = JSON.parse(stepDataJson[step.id] || '{}')
  } catch {
    message.error('Invalid JSON in step data')
  }
}

const addStep = () => {
  const id = crypto.randomUUID()
  steps.value.push({
    id,
    requestType: 'GetVersion',
    requestData: {},
    delayAfterMs: 0,
  })
  stepDataJson[id] = '{}'
}

const removeStep = (id: string) => {
  steps.value = steps.value.filter((s) => s.id !== id)
  delete stepDataJson[id]
}

const runStep = async (step: BatchStep) => {
  syncStepData(step)
  const start = performance.now()
  const result = await obs.sendRequest(step.requestType as never, step.requestData)
  logs.value.unshift({
    id: crypto.randomUUID(),
    requestType: step.requestType,
    ok: result?.ok ?? false,
    durationMs: Math.round(performance.now() - start),
    response: result?.ok ? result.response : undefined,
    error: result?.ok ? undefined : result?.error,
  })
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const runAll = async () => {
  if (!steps.value.length) return
  running.value = true
  logs.value = []
  try {
    if (executionMode.value === 'parallel') {
      await Promise.all(steps.value.map((step) => runStep(step)))
    } else {
      for (const step of steps.value) {
        await runStep(step)
        if (step.delayAfterMs > 0) await sleep(step.delayAfterMs)
      }
    }
  } finally {
    running.value = false
  }
}

const exportBatch = () => {
  const blob = new Blob([JSON.stringify({ steps: steps.value, mode: executionMode.value }, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'obs-batch.json'
  a.click()
  URL.revokeObjectURL(url)
}

const importBatch = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'application/json'
  input.onchange = async () => {
    const file = input.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const data = JSON.parse(text)
      steps.value = data.steps ?? []
      executionMode.value = data.mode ?? 'serial'
      steps.value.forEach((s) => {
        stepDataJson[s.id] = JSON.stringify(s.requestData ?? {}, null, 2)
      })
      message.success('Batch imported')
    } catch {
      message.error('Invalid batch file')
    }
  }
  input.click()
}

steps.value.forEach((s) => {
  stepDataJson[s.id] = JSON.stringify(s.requestData ?? {}, null, 2)
})
</script>

<style scoped lang="scss">
@import '../../styles/module-page.scss';

.layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--space-md);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.steps-panel,
.log-panel {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
}

.step-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.step-item {
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--space-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.step-head {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.step-index {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-muted);
  width: 20px;
}

.delay-input {
  width: 140px;
}

.log-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  max-height: 480px;
  overflow-y: auto;
}

.log-item {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: var(--space-sm);
  font-size: 12px;
  padding: 6px 8px;
  border-radius: var(--radius-sm);
  background: var(--color-bg-subtle);

  &.error {
    background: var(--color-error-bg);
  }
}

.empty {
  color: var(--color-text-muted);
  font-size: 13px;
  padding: var(--space-lg);
  text-align: center;
}
</style>
