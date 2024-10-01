import { ref } from 'vue';

export const scenesList = ref<{ name: string; sceneIndex: number }[]>([]);
export const currentScene = ref('');

// ... 其他状态和函数 ...

