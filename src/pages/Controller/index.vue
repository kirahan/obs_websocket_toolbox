<template>
  <div class="controller-container">
    <NavHeader>
      <template #middle>
        <div class="icon-button-group">
          <a-tooltip :title="isRecording ? $t('controller.stopRecording') : $t('controller.startRecording')">
            <video-camera-outlined 
              :class="['icon-button', { active: isRecording }]"
              @click="toggleRecord"
            />
          </a-tooltip>
          <a-tooltip :title="isStreaming ? $t('controller.stopStreaming') : $t('controller.startStreaming')">
            <wifi-outlined 
              :class="['icon-button', { active: isStreaming }]"
              @click="toggleStreaming"
            />
          </a-tooltip>
          <a-tooltip :title="isStudioMode ? $t('controller.exitStudioMode') : $t('controller.enterStudioMode')">
            <layout-outlined 
              :class="['icon-button', { active: isStudioMode }]"
              @click="toggleStudioMode"
            />
          </a-tooltip>
          <a-tooltip :title="isVirtualCameraOn ? $t('controller.stopVirtualCamera') : $t('controller.startVirtualCamera')">
            <camera-outlined 
              :class="['icon-button', { active: isVirtualCameraOn }]"
              @click="toggleVirtualCamera"
            />
          </a-tooltip>
        </div>
      </template>
    </NavHeader>
    <div class="content">
      <h1>{{ $t('controller.title') }}</h1>
      <div class="control-panel">
        <div class="section program">
          <h2>{{ $t('controller.program') }}</h2>
          <div class="scene-grid">
            <SceneItem 
              v-for="scene in scenesList" 
              :key="scene.sceneIndex"
              :scene="scene"
              :is-active="currentScene === scene.name"
              @select="setCurrentScene(scene.name)"
            />
          </div>
        </div>

        <div class="section source">
          <h2>{{ $t('controller.source') }}</h2>
          <div class="list-container">
            <SourceItem 
              v-for="source in sources" 
              :key="source.id" 
              :source="source"
              @toggle="toggleSource"
              @toggle-lock="toggleSourceLock"
              @delete="deleteSource"
            />
          </div>
        </div>

        <div class="section audio">
          <h2>{{ $t('controller.audio') }}</h2>
          <div class="list-container">
            <AudioItem 
              v-for="audio in audioSources" 
              :key="audio.id" 
              :audio="audio"
              @volume-change="updateAudioVolume"
              @mute-toggle="toggleAudioMute"
            />
          </div>
        </div>

        <div class="section transition">
          <h2>{{ $t('controller.transition') }}</h2>
          <div class="button-grid">
            <button 
              v-for="transition in transitions" 
              :key="transition"
              :class="['scene-button', { active: currentTransition === transition }]"
              @click="setTransition(transition)"
            >
              {{ $t(`controller.transitions.${transition}`) }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <a-layout-footer class="footer">
      <BottomBar></BottomBar>
    </a-layout-footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import OBSWebSocket from 'obs-websocket-js';
import NavHeader from '../../components/NavHeader.vue';
import BottomBar from '../../components/BottomBar/index.vue';
import SourceItem from './SourceItem.vue';
import AudioItem from './AudioItem.vue';
import SceneItem from './SceneItem.vue';
import { 
  VideoCameraOutlined, 
  WifiOutlined, 
  LayoutOutlined, 
  CameraOutlined 
} from '@ant-design/icons-vue';

const { t } = useI18n();
import OBS from '../../obs';
import { watch } from 'vue';
import { scenesList, currentScene } from '../../obs/state';

const obs = OBS.getInstance()
const scenes = ref<{ name: string; sceneIndex: number }[]>([]);

onMounted(() => {

});

const programSource = ref(1);
const isRecording = ref(false);
const isStreaming = ref(false);
const isStudioMode = ref(false);
const isVirtualCameraOn = ref(false);

// 更新模拟数据
const sources = ref([
  { id: 1, name: 'Camera 1', enabled: true, locked: false, type: 'video' },
  { id: 2, name: 'Screen Capture', enabled: false, locked: true, type: 'display_capture' },
  { id: 3, name: 'Browser Source', enabled: true, locked: false, type: 'browser' },
]);

const audioSources = ref([
  { id: 1, name: 'Mic/Aux', volume: 75, muted: false },
  { id: 2, name: 'Desktop Audio', volume: 100, muted: false },
  { id: 3, name: 'Browser Source', volume: 50, muted: true },
]);

const transitions = ['cut', 'fade', 'slide', 'stinger'];
const currentTransition = ref('cut');

const setProgramSource = (source: number) => {
  programSource.value = source;
  // 实现切换Program源的逻辑
};

const performTransition = (type: string) => {
  console.log(`Performing ${type} transition`);
  // 实现转场的逻辑
};

const toggleSource = (sourceId: number) => {
  const source = sources.value.find(s => s.id === sourceId);
  if (source) {
    source.enabled = !source.enabled;
    // 实现切换源可见性的逻辑
  }
};

const toggleSourceLock = (sourceId: number) => {
  const source = sources.value.find(s => s.id === sourceId);
  if (source) {
    source.locked = !source.locked;
    // 实现锁定/解锁源的逻辑
  }
};

const deleteSource = (sourceId: number) => {
  sources.value = sources.value.filter(s => s.id !== sourceId);
  // 实现删除源的逻辑
};

const updateAudioVolume = (audioId: number, volume: number) => {
  const audio = audioSources.value.find(a => a.id === audioId);
  if (audio) {
    audio.volume = volume;
    // 实现更新音量的逻辑
  }
};

const toggleAudioMute = (audioId: number) => {
  const audio = audioSources.value.find(a => a.id === audioId);
  if (audio) {
    audio.muted = !audio.muted;
    // 实现切换静音的逻辑
  }
};

const toggleRecord = () => {
  isRecording.value = !isRecording.value;
  // 实现录制逻辑
};

const toggleStreaming = () => {
  isStreaming.value = !isStreaming.value;
  // 实现直播逻辑
};

const toggleStudioMode = () => {
  isStudioMode.value = !isStudioMode.value;
  // 实现工作室模式切换逻辑
};

const toggleVirtualCamera = () => {
  isVirtualCameraOn.value = !isVirtualCameraOn.value;
  // 实现虚拟摄像头切换逻辑
};

const setTransition = (transition: string) => {
  currentTransition.value = transition;
  performTransition(transition);
};

const setCurrentScene = async (sceneName: string) => {
  try {
    // await obs.call('SetCurrentProgramScene', { sceneName });
    currentScene.value = sceneName;
  } catch (error) {
    console.error('Failed to set current scene:', error);
  }
};
</script>

<style src="@/styles/controller.css" scoped>
</style>

<style scoped>
.footer {
  background-color: rgb(0, 33, 43);
  padding: 0;
  height: 40px;
}

.icon-button-group {
  display: flex;
  gap: 16px;
}

.icon-button {
  font-size: 24px;
  color: #ffffff;
  cursor: pointer;
  transition: color 0.3s;
}

.icon-button:hover {
  color: #1890ff;
}

.icon-button.active {
  color: #1890ff;
}

/* 新增的样式 */
.icon-button.active[class*="video-camera"] {
  color: #ff4d4f; /* 红色 */
}

.icon-button.active[class*="wifi"] {
  color: #52c41a; /* 绿色 */
}

.list-container {
  max-height: 300px;
  overflow-y: auto;
}

/* 如果需要，可以为 transition 按钮添加特定样式 */
.transition .scene-button {
  font-size: 12px; /* 可能需要调整字体大小以适应更长的文本 */
}

.scene-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
</style>