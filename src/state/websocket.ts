import { computed, ref,Ref } from 'vue'
import { useStorage } from '@vueuse/core'
import {T_OBS_Stats,  T_OBS_Versions } from '../types/index'


export const WSplatform = ref('')
export const WSstats = ref({} as T_OBS_Stats) 
export const WSversions = ref({} as T_OBS_Versions) 
export const WSconnected = ref(false)


export interface I_Event_item {
    type: string,
    name: string,
    params: {
        [index:string]:any
    },
    timestamp: string
}
export const WSEventAndRequestHistory = ref([] as I_Event_item[])


export const OBSstatus = {
    isStudioModule: ref(false),
    isStreaming: ref(false),
    isRecording: ref(false),
    isReplayBufferActive: ref(false),
    isVirtualCam: ref(false),
    outputName: ref('')
};

export const OBSVideoConfig = {
    fpsDenominator: ref(0),
    fpsNumerator: ref(0),
    baseHeight: ref(0),
    baseWidth: ref(0),
    outputHeight: ref(0),
    outputWidth: ref(0)
}


// 连接相关的config
const port = useStorage('port','4455')
const host = useStorage('host','localhost')
// const host = useStorage('host','10.0.32.72')
const password = useStorage('password','')
export const OBSConnectionConfig = {
    host,
    port,
    password,
}

// obs本身的一些配置
const currentSCname = useStorage('currentSCname','');
const sceneCollectionList = useStorage('sceneCollectionList',['']);
const currentProfile = useStorage('currentProfile','');
const profileList = useStorage('profileList',['']);
export const OBSGeneralConfig = {
    currentSCname,
    currentProfile,
    profileList,
    sceneCollectionList,
}
