<template>
  <header class="nav-header">
    <div class="logo" @click="goHome">
      <!-- <img src="/path-to-your-logo.png" alt="Logo" /> -->  
      <ArrowLeftOutlined />
      <span>{{ $t('main.title') }}</span>
    </div>
    <nav class="middle-section">
      <slot name="middle">
        <!-- 默认内容，如果没有提供插槽内容 -->
        <!-- 可以添加更多默认导航链接 -->
      </slot>
    </nav>
    <div class="right-section">
      <a-select v-model:value="localLang" style="width: 120px" @change="switchLang">
        <a-select-option v-for="lang in languages" :key="lang.value" :value="lang.value">
          {{ lang.label }}
        </a-select-option>
      </a-select>
      <GithubOutlined style="margin-left: 16px; cursor: pointer; font-size: 16px;" @click="goToGithub"/>
      <!-- <a-avatar style="margin-left: 16px;">
        <template #icon><UserOutlined /></template>
      </a-avatar> -->
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeftOutlined, UserOutlined,GithubOutlined } from '@ant-design/icons-vue';
import { localLang,switchLang } from '../state';
const router = useRouter();

const languages = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '简体中文' },
  { value: 'tw', label: '繁體中文' }
];

const goToGithub = ()=>{
    window.open('https://github.com/kirahan/obs_websocket_toolbox', '_blank');
}

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 40px;
  background-color: #001529; /* 暗色背景 */
  color: #fff; /* 白色文字 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #fff; /* 确保 logo 文字为白色 */
}

.logo img {
  height: 40px;
  margin-right: 10px;
}

.middle-section {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

nav {
  display: flex;
  gap: 20px;
}

nav a {
  cursor: pointer;
  color: #fff; /* 导航链接为白色 */
  text-decoration: none;
}

nav a:hover {
  color: #1890ff; /* 鼠标悬停时变为蓝色 */
}

.right-section {
  display: flex;
  align-items: center;
}

/* 可能需要覆盖 Ant Design 的一些默认样式 */
:deep(.ant-select-selector) {
  background-color: #001529 !important;
  color: #fff !important;
  border-color: #1890ff !important;
}

:deep(.ant-select-arrow) {
  color: #fff !important;
}

:deep(.ant-avatar) {
  background-color: #1890ff !important;
}
</style>