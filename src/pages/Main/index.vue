<template>
  <div class="main-container">
    <NavHeader />
    <div class="content">
      <h1>{{ $t('main.title') }}</h1>
      <div class="modules">
        <div v-for="module in modules" :key="module.name" class="module-card">
          <h2>{{ $t(`main.modules.${module.name}.title`) }}</h2>
          <p>{{ $t(`main.modules.${module.name}.description`) }}</p>
          <div class="button-container">
            <a-button type="primary" @click="navigateTo(module.route)">{{ $t('main.enterModule') }}</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import NavHeader from '../../components/NavHeader.vue';
import { message } from 'ant-design-vue';

const router = useRouter();

const modules = ref([
  {
    name: 'debugger',
    route: '/debug'
  },
  {
    name: 'controller',
    route: '/controller'
  },
  {
    name: 'simulator',
    route: '/simulator'
  }
]);

const navigateTo = (route: string) => {
  if(route === '/simulator' || route === '/controller'){
    message.warning('This module is not implemented yet');
    return;
  }
  router.push(route);
};
</script>

<style scoped>
.main-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.modules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

.module-card {
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.button-container {
  margin-top: auto;
  padding-top: 15px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5em;
  color: #1890ff;
}

h2 {
  color: #1890ff;
}

p {
  margin-bottom: 15px;
  flex-grow: 1;
}
</style>
