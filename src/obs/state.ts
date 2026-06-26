import { ref } from 'vue'

export const scenesList = ref<{ name: string; sceneIndex: number }[]>([])
export const currentScene = ref('')
export const previewScene = ref('')
export const inputsList = ref<{ name: string; kind: string; uuid?: string }[]>([])
export const transitionsList = ref<{ name: string; kind?: string; uuid?: string }[]>([])
