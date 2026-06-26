<template>
  <div class="bottom-bar">
    <div class="left-group">
      <a-tooltip :title="WSconnected ? $t('debug.Tooltops.disconnectOBS') : $t('debug.Tooltops.connectOBS')">
        <button
          class="icon-btn"
          :class="WSconnected ? 'connected' : 'disconnected'"
          @click="WSconnected ? disConnectOBS() : connectOBS()"
        >
          <LinkOutlined v-if="WSconnected" />
          <DisconnectOutlined v-else />
        </button>
      </a-tooltip>

      <a-popover trigger="click" v-model:open="isConnectionConfigPopVisible" placement="topLeft">
        <template #content>
          <a-form
            layout="vertical"
            :model="connectParms"
            class="config-form"
            @finish="setConnectParmsFinish"
          >
            <a-form-item
              :label="$t('debug.connection.host')"
              name="host"
              :rules="[{ required: true, message: $t('debug.connection.hostRequired') }]"
            >
              <a-input v-model:value="connectParms.host" />
            </a-form-item>
            <a-form-item
              :label="$t('debug.connection.port')"
              name="port"
              :rules="[{ required: true, message: $t('debug.connection.portRequired') }]"
            >
              <a-input v-model:value="connectParms.port" />
            </a-form-item>
            <a-form-item :label="$t('debug.connection.password')" name="password">
              <a-input-password v-model:value="connectParms.password" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" size="small">
                {{ $t('debug.connection.save') }}
              </a-button>
            </a-form-item>
          </a-form>
        </template>
        <button class="config-btn">
          <SettingOutlined />
          <span>{{ OBSConnectionConfig.host.value }}:{{ OBSConnectionConfig.port.value }}</span>
        </button>
      </a-popover>

      <template v-if="WSconnected">
        <span class="divider" />
        <span class="stat-item">
          <AppleOutlined v-if="WSplatform === 'macos'" />
          <WindowsOutlined v-else />
          OBS {{ WSversions.obsVersion }}
        </span>
        <span class="divider" />
        <span class="stat-item">WS {{ WSversions.obsWebSocketVersion }}</span>
      </template>
    </div>

    <div v-if="WSconnected" class="right-group">
      <a-tooltip :title="looptimer ? $t('debug.Tooltops.pauseStat') : $t('debug.Tooltops.LoopGetStat')">
        <button class="icon-btn" @click="looptimer ? pauseOBSstat() : loopGetStat()">
          <PauseOutlined v-if="looptimer" />
          <ReloadOutlined v-else />
        </button>
      </a-tooltip>
      <span class="stat-item">CPU {{ CPU }}</span>
      <span class="divider" />
      <span class="stat-item">{{ $t('debug.connection.memory') }} {{ Memory }}</span>
      <span class="divider" />
      <span class="stat-item">{{ $t('debug.connection.disk') }} {{ Disk }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { notification } from 'ant-design-vue'
import {
  WindowsOutlined,
  LinkOutlined,
  DisconnectOutlined,
  AppleOutlined,
  ReloadOutlined,
  PauseOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'
import { OBSConnectionConfig, WSconnected, WSversions, WSplatform, WSstats } from '../../state'
import OBS from '../../obs'

const obs = OBS.getInstance()

const CPU = computed(() => WSstats.value.cpuUsage?.toFixed(1) + '%')
const Memory = computed(() => WSstats.value.memoryUsage?.toFixed(1) + ' MB')
const Disk = computed(() => (WSstats.value.availableDiskSpace / 1024)?.toFixed(1) + ' GB')

const looptimer = ref(0)
const isConnectionConfigPopVisible = ref(false)

const connectParms = ref({
  host: OBSConnectionConfig.host.value,
  port: OBSConnectionConfig.port.value,
  password: OBSConnectionConfig.password.value,
})

watch(WSconnected, (newVal) => {
  if (newVal) {
    notification.success({
      message: 'WebSocket Connected',
      placement: 'bottomRight',
    })
  } else {
    notification.error({
      message: 'WebSocket Disconnected',
      placement: 'bottomRight',
    })
  }
})

const setConnectParmsFinish = () => {
  OBSConnectionConfig.host.value = connectParms.value.host
  OBSConnectionConfig.port.value = connectParms.value.port
  OBSConnectionConfig.password.value = connectParms.value.password
  isConnectionConfigPopVisible.value = false
}

const connectOBS = async () => {
  await obs.connect()
  loopGetStat()
}

const disConnectOBS = async () => {
  try {
    await obs.disconnect()
  } catch (e) {
    console.log(e)
  }
}

const loopGetStat = () => {
  looptimer.value = setInterval(() => obs.getStats(), 3000) as unknown as number
}

const pauseOBSstat = () => {
  clearInterval(looptimer.value)
  looptimer.value = 0
}
</script>

<style scoped lang="scss">
.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 var(--space-md);
  font-size: 12px;
  color: var(--color-text-secondary);
  gap: var(--space-md);
  overflow: hidden;
}

.left-group,
.right-group {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  min-width: 0;
}

.right-group {
  flex-shrink: 0;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg-elevated);
  cursor: pointer;
  font-size: 13px;
  transition: background 0.15s, border-color 0.15s;
  padding: 0;

  &.connected {
    color: var(--color-success);
    border-color: var(--color-success);
    background: var(--color-success-bg);
  }

  &.disconnected {
    color: var(--color-error);
    border-color: var(--color-error);
    background: var(--color-error-bg);
  }

  &:hover {
    opacity: 0.85;
  }
}

.config-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg-subtle);
  cursor: pointer;
  font-size: 12px;
  color: var(--color-text-secondary);
  transition: background 0.15s;

  &:hover {
    background: var(--color-border-light);
  }
}

.config-form {
  width: 240px;
}

.stat-item {
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4px;
}

.divider {
  width: 1px;
  height: 14px;
  background: var(--color-border);
  flex-shrink: 0;
}
</style>
