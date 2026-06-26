<template>
  <ModuleLayout>
    <div class="module-body">
      <header class="page-header">
        <h1>{{ $t('modules.simulator.title') }}</h1>
        <p>{{ $t('modules.simulator.subtitle') }}</p>
      </header>

      <div class="toolbar">
        <a-space>
          <a-button
            :type="simulatorRunning ? 'default' : 'primary'"
            :danger="simulatorRunning"
            @click="toggleSimulator"
          >
            {{ simulatorRunning ? $t('modules.simulator.stop') : $t('modules.simulator.start') }}
          </a-button>
          <a-button @click="connectDebugger">{{ $t('modules.simulator.connectDebugger') }}</a-button>
          <a-button @click="resetSimulatorState">{{ $t('modules.simulator.reset') }}</a-button>
        </a-space>
        <a-tag :color="simulatorRunning ? 'success' : 'default'">
          {{ simulatorRunning ? $t('modules.simulator.running') : $t('modules.simulator.stopped') }}
        </a-tag>
      </div>

      <div class="grid">
        <section class="panel">
          <h3>{{ $t('modules.simulator.state') }}</h3>
          <a-form layout="vertical" class="state-form">
            <a-form-item :label="$t('modules.simulator.currentScene')">
              <a-select v-model:value="simulatorState.currentProgramScene" style="width: 100%">
                <a-select-option v-for="s in simulatorState.scenes" :key="s.sceneName" :value="s.sceneName">
                  {{ s.sceneName }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-switch v-model:checked="simulatorState.streaming" />
                <span>{{ $t('modules.simulator.streaming') }}</span>
              </a-space>
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-switch v-model:checked="simulatorState.recording" />
                <span>{{ $t('modules.simulator.recording') }}</span>
              </a-space>
            </a-form-item>
          </a-form>
        </section>

        <section class="panel">
          <h3>{{ $t('modules.simulator.emitEvent') }}</h3>
          <a-form layout="vertical">
            <a-form-item :label="$t('modules.simulator.eventName')">
              <a-select v-model:value="emitEventName" show-search style="width: 100%">
                <a-select-option v-for="name in eventNames" :key="name" :value="name">{{ name }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label="$t('modules.simulator.eventData')">
              <a-textarea v-model:value="emitEventData" :rows="5" />
            </a-form-item>
            <a-button type="primary" :disabled="!simulatorRunning" @click="broadcastEvent">
              {{ $t('modules.simulator.broadcast') }}
            </a-button>
          </a-form>
        </section>

        <section class="panel wide">
          <h3>{{ $t('modules.simulator.customResponse') }}</h3>
          <p class="hint">{{ $t('modules.simulator.customResponseHint') }}</p>
          <a-form layout="vertical">
            <a-form-item :label="$t('modules.simulator.requestType')">
              <a-input v-model:value="customRequestType" placeholder="GetVersion" />
            </a-form-item>
            <a-form-item :label="$t('modules.simulator.responseJson')">
              <a-textarea v-model:value="customResponseJson" :rows="8" />
            </a-form-item>
            <a-button @click="saveCustomResponse">{{ $t('modules.simulator.saveResponse') }}</a-button>
          </a-form>
        </section>
      </div>
    </div>
  </ModuleLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import ModuleLayout from '../../components/ModuleLayout.vue'
import { obsEventDetailData } from '../../data/events'
import OBS from '../../obs'
import {
  emitSimulatorEvent,
  simulatorCustomResponses,
  simulatorRunning,
  simulatorState,
  startSimulator,
  stopSimulator,
  resetSimulatorState,
} from '../../simulator'
import { applySimulatorConnectionProfile } from '../../simulator/connection'
import { WSEventAndRequestHistory } from '../../state'

const router = useRouter()
const obs = OBS.getInstance()

const eventNames = computed(() => Object.keys(obsEventDetailData))
const emitEventName = ref('SceneItemEnableStateChanged')
const emitEventData = ref(
  JSON.stringify(
    {
      sceneName: '场景',
      sceneItemId: 2,
      sceneItemEnabled: true,
    },
    null,
    2,
  ),
)

const customRequestType = ref('GetVersion')
const customResponseJson = ref('')

const toggleSimulator = () => {
  if (simulatorRunning.value) {
    stopSimulator()
    if (obs.connected.value) obs.disconnect()
  } else {
    startSimulator()
  }
}

const connectDebugger = async () => {
  startSimulator()
  applySimulatorConnectionProfile()
  await obs.connect()
  message.success('Simulator ready — open Debugger to send requests')
  router.push('/debug')
}

const broadcastEvent = () => {
  try {
    const data = JSON.parse(emitEventData.value)
    emitSimulatorEvent(emitEventName.value, data)
    WSEventAndRequestHistory.value.push({
      uuid: crypto.randomUUID(),
      type: 'response',
      name: emitEventName.value,
      params: data,
      timestamp: new Date().toLocaleTimeString(),
    })
    message.success('Event broadcasted')
  } catch {
    message.error('Invalid event JSON')
  }
}

const saveCustomResponse = () => {
  if (!customRequestType.value.trim()) return
  try {
    simulatorCustomResponses.value[customRequestType.value.trim()] = JSON.parse(customResponseJson.value)
    message.success('Custom response saved')
  } catch {
    message.error('Invalid response JSON')
  }
}
</script>

<style scoped lang="scss">
@import '../../styles/module-page.scss';
</style>
