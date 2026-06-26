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
          <div class="profile-panel">
            <div class="profile-header">
              <span>Connection Profiles</span>
              <span class="profile-count">{{ connectionProfiles.length }}</span>
            </div>
            <div v-if="connectionProfiles.length" class="profile-list">
              <div
                v-for="profile in connectionProfiles"
                :key="profile.id"
                class="profile-item"
              >
                <button class="profile-main" @click="applyConnectionProfile(profile)">
                  <span class="profile-name">{{ profile.name }}</span>
                  <span class="profile-endpoint">{{ profile.host }}:{{ profile.port }}</span>
                </button>
                <a-button size="small" danger ghost @click="deleteConnectionProfile(profile.id)">
                  Delete
                </a-button>
              </div>
            </div>
            <div v-else class="profile-empty">No profiles yet.</div>
          </div>
          <a-form
            layout="vertical"
            :model="connectParms"
            class="config-form"
            @finish="setConnectParmsFinish"
          >
            <a-form-item label="Profile name">
              <a-input v-model:value="profileName" placeholder="Local OBS" />
            </a-form-item>
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
              <a-space size="small">
                <a-button type="primary" html-type="submit" size="small">
                  {{ $t('debug.connection.save') }}
                </a-button>
                <a-button size="small" @click="saveConnectionProfile">
                  Save profile
                </a-button>
              </a-space>
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
import { message, notification } from 'ant-design-vue'
import { useStorage } from '@vueuse/core'
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

interface ConnectionProfile {
  id: string
  name: string
  host: string
  port: string
  password: string
}

const connectionProfiles = useStorage<ConnectionProfile[]>('connectionProfiles', [])
const profileName = ref('')

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

const saveConnectionProfile = () => {
  if (!connectParms.value.host || !connectParms.value.port) {
    message.error('Host and port are required')
    return
  }

  const name = profileName.value.trim() || `${connectParms.value.host}:${connectParms.value.port}`
  const existingIndex = connectionProfiles.value.findIndex((profile) => profile.name === name)
  const nextProfile = {
    id: existingIndex >= 0 ? connectionProfiles.value[existingIndex].id : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    host: connectParms.value.host,
    port: connectParms.value.port,
    password: connectParms.value.password,
  }

  if (existingIndex >= 0) {
    connectionProfiles.value.splice(existingIndex, 1, nextProfile)
  } else {
    connectionProfiles.value.unshift(nextProfile)
  }
  profileName.value = ''
  message.success('Connection profile saved')
}

const applyConnectionProfile = (profile: ConnectionProfile) => {
  connectParms.value = {
    host: profile.host,
    port: profile.port,
    password: profile.password,
  }
  profileName.value = profile.name
  OBSConnectionConfig.host.value = profile.host
  OBSConnectionConfig.port.value = profile.port
  OBSConnectionConfig.password.value = profile.password
  message.success('Connection profile applied')
}

const deleteConnectionProfile = (id: string) => {
  connectionProfiles.value = connectionProfiles.value.filter((profile) => profile.id !== id)
  message.success('Connection profile deleted')
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

.config-form,
.profile-panel {
  width: 280px;
}

.profile-panel {
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--color-border-light);
}

.profile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-sm);
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text);
}

.profile-count {
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  font-weight: 400;
}

.profile-list {
  display: grid;
  gap: 6px;
  max-height: 160px;
  overflow-y: auto;
}

.profile-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--space-sm);
  align-items: center;
}

.profile-main {
  display: grid;
  gap: 2px;
  min-width: 0;
  padding: 6px var(--space-sm);
  text-align: left;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg-subtle);
  cursor: pointer;

  &:hover {
    border-color: var(--color-primary);
    background: var(--color-primary-light);
  }
}

.profile-name {
  color: var(--color-text);
  font-size: 12px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-endpoint,
.profile-empty {
  color: var(--color-text-muted);
  font-size: 11px;
  font-family: var(--font-mono);
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
