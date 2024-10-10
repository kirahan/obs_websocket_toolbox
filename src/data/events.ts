import { I_Response_Params } from "./requests"
import {DataNode} from 'ant-design-vue/es/vc-tree/interface'
import { t } from "../locales";
interface EventNode extends DataNode {
    complexity_rating?: string;
    rpc_version?: string;
    websocket_version?: string;
    obs_version?: string;
}

const defaultData = {
    selectable: true,
    complexity_rating: '1/5',
    rpc_version: '1',
    websocket_version: '5.0.0',
    obs_version: '28',
}

const generalEvents:EventNode = {
    title: 'General Events',
    key: 'generalEvents',
    children: [
        {
            ...defaultData,
            title:'ExitStarted',
            key:'ExitStarted',
        },
        {
            ...defaultData,
            title:'VendorEvent',
            key:'VendorEvent',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'CustomEvent',
            key:'CustomEvent',
        }
    ]
}

const configEvents:EventNode = {
    title: 'Config Events',
    key: 'configEvents',
    children: [
        {
            ...defaultData,
            title:'CurrentSceneCollectionChanging',
            key:'CurrentSceneCollectionChanging',
        },
        {
            ...defaultData,
            title:'CurrentSceneCollectionChanged',
            key:'CurrentSceneCollectionChanged',
        },
        {
            ...defaultData,
            title:'SceneCollectionListChanged',
            key:'SceneCollectionListChanged',
        },
        {
            ...defaultData,
            title:'CurrentProfileChanging',
            key:'CurrentProfileChanging',
        },
        {
            ...defaultData,
            title:'CurrentProfileChanged',
            key:'CurrentProfileChanged',
        },
        {
            ...defaultData,
            title:'ProfileListChanged',
            key:'ProfileListChanged',
        }
    ]
}

const scenesEvents:EventNode = {
    title: 'Scenes Events',
    key: 'scenesEvents',
    children: [
        {
            ...defaultData,
            title:'SceneCreated',
            key:'SceneCreated',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SceneRemoved',
            key:'SceneRemoved',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SceneNameChanged',
            key:'SceneNameChanged',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'CurrentProgramSceneChanged',
            key:'CurrentProgramSceneChanged',
        },
        {
            ...defaultData,
            title:'CurrentPreviewSceneChanged',
            key:'CurrentPreviewSceneChanged',
        },
        {
            ...defaultData,
            title:'SceneListChanged',
            key:'SceneListChanged',
            complexity_rating: '2/5',
        }
    ]
}

const inputsEvents:EventNode = {
    title: 'Inputs Events',
    key: 'inputsEvents',
    children: [
        {
            ...defaultData,
            title:'InputCreated',
            key:'InputCreated',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'InputRemoved',
            key:'InputRemoved',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'InputNameChanged',
            key:'InputNameChanged',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'InputSettingsChanged',
            key:'InputSettingsChanged',
            complexity_rating: '3/5',
            websocket_version: '5.4.0',
        },
        {
            ...defaultData,
            title:'InputActiveStateChanged',
            key:'InputActiveStateChanged',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'InputShowStateChanged',
            key:'InputShowStateChanged',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'InputMuteStateChanged',
            key:'InputMuteStateChanged',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'InputVolumeChanged',
            key:'InputVolumeChanged',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'InputAudioBalanceChanged',
            key:'InputAudioBalanceChanged',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'InputAudioSyncOffsetChanged',
            key:'InputAudioSyncOffsetChanged',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'InputAudioTracksChanged',
            key:'InputAudioTracksChanged',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'InputAudioMonitorTypeChanged',
            key:'InputAudioMonitorTypeChanged',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'InputVolumeMeters',
            key:'InputVolumeMeters',
            complexity_rating: '4/5',
        }
    ]
}

const transitionsEvents:EventNode = {
    title: 'Transitions Events',
    key: 'transitionsEvents',
    children: [
        {
            ...defaultData,
            title:'CurrentSceneTransitionChanged',
            key:'CurrentSceneTransitionChanged',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'CurrentSceneTransitionDurationChanged',
            key:'CurrentSceneTransitionDurationChanged',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SceneTransitionStarted',
            key:'SceneTransitionStarted',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SceneTransitionEnded',
            key:'SceneTransitionEnded',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SceneTransitionVideoEnded',
            key:'SceneTransitionVideoEnded',
            complexity_rating: '3/5',
        }
    ]
}

const filtersEvents:EventNode = {
    title: 'Filters Events',
    key: 'filtersEvents',
    children: [
        {
            ...defaultData,
            title:'SourceFilterListReindexed',
            key:'SourceFilterListReindexed',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'SourceFilterCreated',
            key:'SourceFilterCreated',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SourceFilterRemoved',
            key:'SourceFilterRemoved',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SourceFilterNameChanged',
            key:'SourceFilterNameChanged',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SourceFilterSettingsChanged',
            key:'SourceFilterSettingsChanged',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'SourceFilterEnableStateChanged',
            key:'SourceFilterEnableStateChanged',
            complexity_rating: '3/5',
        }
    ]
}

const sceneItemsEvents:EventNode = {
    title: 'Scene Items Events',
    key: 'sceneItemsEvents',
    children: [
        {
            ...defaultData,
            title:'SceneItemCreated',
            key:'SceneItemCreated',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'SceneItemRemoved',
            key:'SceneItemRemoved',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'SceneItemListReindexed',
            key:'SceneItemListReindexed',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SceneItemEnableStateChanged',
            key:'SceneItemEnableStateChanged',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'SceneItemLockStateChanged',
            key:'SceneItemLockStateChanged',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'SceneItemSelected',
            key:'SceneItemSelected',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SceneItemTransformChanged',
            key:'SceneItemTransformChanged',
            complexity_rating: '4/5',
        }
    ]
}

const outputsEvents:EventNode = {
    title: 'Outputs Events',
    key: 'outputsEvents',
    children: [
        {
            ...defaultData,
            title:'StreamStateChanged',
            key:'StreamStateChanged',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'RecordStateChanged',
            key:'RecordStateChanged',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'ReplayBufferStateChanged',
            key:'ReplayBufferStateChanged',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'VirtualcamStateChanged',
            key:'VirtualcamStateChanged',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'ReplayBufferSaved',
            key:'ReplayBufferSaved',
            complexity_rating: '2/5',
        }
    ]
}


const mediaInputsEvents:EventNode = {
    title: 'Media Inputs Events',
    key: 'mediaInputsEvents',
    children: [
        {
            ...defaultData,
            title:'MediaInputPlaybackStarted',
            key:'MediaInputPlaybackStarted',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'MediaInputPlaybackEnded',
            key:'MediaInputPlaybackEnded',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'MediaInputActionTriggered',
            key:'MediaInputActionTriggered',
            complexity_rating: '2/5',
        }
    ]
}


const uiEvents:EventNode = {
    title: 'Ui Events',
    key: 'uiEvents',
    children: [
        {
            ...defaultData,
            title:'StudioModeStateChanged',
            key:'StudioModeStateChanged',
        },
        {
            ...defaultData,
            title:'ScreenshotSaved',
            key:'ScreenshotSaved',
            complexity_rating: '2/5',
            websocket_version: '5.1.0',
        }
    ]
}



export const obsEventTreeData = [
    generalEvents,
    scenesEvents,
    configEvents,
    inputsEvents,
    transitionsEvents,
    filtersEvents,
    sceneItemsEvents,
    outputsEvents,
    mediaInputsEvents,
    uiEvents,
]





export interface I_Event_Detail {
    key: string,
    title: string,
    des: string,
    tags: string[],
    responseParams: I_Response_Params[]
}


export const obsEventDetailData:{[index:string]:I_Event_Detail} = {
    // General Events
    ExitStarted:{
        key: 'ExitStarted',
        title: 'ExitStarted',
        des: t('debug.EventDes.ExitStarted'),
        tags: ['General'],
        responseParams: [

        ]
    },
    VendorEvent:{
        key: 'VendorEvent',
        title: 'VendorEvent',
        des: t('debug.EventDes.VendorEvent'),
        tags: ['General'],
        responseParams: [
            {
                name: 'vendorName',
                type: "String",
                des: t('debug.ResParamsDes.VendorEvent.vendorName'),
            },
            {
                name: 'eventType',
                type: "String",
                des: t('debug.ResParamsDes.VendorEvent.eventType'),
            },
            {
                name: 'eventData',
                type: "Object",
                des: t('debug.ResParamsDes.VendorEvent.eventData'),
            },
        ]
    },
    CustomEvent:{
        key: 'CustomEvent',
        title: 'CustomEvent',
        des: t('debug.EventDes.CustomEvent'),
        tags: ['General'],
        responseParams: [
            {
                name: 'eventData',
                type: "Object",
                des: t('debug.ResParamsDes.CustomEvent.eventData'),
            },
        ]
    },
    // Config Events
    CurrentSceneCollectionChanging:{
        key: 'CurrentSceneCollectionChanging',
        title: 'CurrentSceneCollectionChanging',
        des: t('debug.EventDes.CurrentSceneCollectionChanging'),
        tags: ['Config'],
        responseParams: [
            {
                name: 'sceneCollectionName',
                type: "String",
                des: t('debug.ResParamsDes.CurrentSceneCollectionChanging.sceneCollectionName'),
            },
        ]
    },
    CurrentSceneCollectionChanged:{
        key: 'CurrentSceneCollectionChanged',
        title: 'CurrentSceneCollectionChanged',
        des: t('debug.EventDes.CurrentSceneCollectionChanged'),
        tags: ['Config'],
        responseParams: [
            {
                name: 'sceneCollectionName',
                type: "String",
                des: t('debug.ResParamsDes.CurrentSceneCollectionChanged.sceneCollectionName'),
            },
        ]
    },
    SceneCollectionListChanged:{
        key: 'SceneCollectionListChanged',
        title: 'SceneCollectionListChanged',
        des: t('debug.EventDes.SceneCollectionListChanged'),
        tags: ['Config'],
        responseParams: [
            {
                name: 'sceneCollections',
                type: "Array<String>",
                des: t('debug.ResParamsDes.SceneCollectionListChanged.sceneCollections'),
            },
        ]
    },
    CurrentProfileChanging:{
        key: 'CurrentProfileChanging',
        title: 'CurrentProfileChanging',
        des: t('debug.EventDes.CurrentProfileChanging'),
        tags: ['Config'],
        responseParams: [
            {
                name: 'profileName',
                type: "String",
                des: t('debug.ResParamsDes.CurrentProfileChanging.profileName'),
            },
        ]
    },
    CurrentProfileChanged:{
        key: 'CurrentProfileChanged',
        title: 'CurrentProfileChanged',
        des: t('debug.EventDes.CurrentProfileChanged'),
        tags: ['Config'],
        responseParams: [
            {
                name: 'profileName',
                type: "String",
                des: t('debug.ResParamsDes.CurrentProfileChanged.profileName'),
            },
        ]
    },
    ProfileListChanged:{
        key: 'ProfileListChanged',
        title: 'ProfileListChanged',
        des: t('debug.EventDes.ProfileListChanged'),
        tags: ['Config'],
        responseParams: [
            {
                name: 'profiles',
                type: "Array<String>",
                des: t('debug.ResParamsDes.ProfileListChanged.profiles'),
            },
        ]
    },
    // Scenes Events
    SceneCreated:{
        key: 'SceneCreated',
        title: 'SceneCreated',
        des: t('debug.EventDes.SceneCreated'),
        tags: ['Scenes'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ResParamsDes.SceneCreated.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ResParamsDes.SceneCreated.sceneUuid'),
            },
            {
                name: 'isGroup',
                type: "Boolean",
                des: t('debug.ResParamsDes.SceneCreated.isGroup'),
            },
        ]
    },
    SceneRemoved:{
        key: 'SceneRemoved',
        title: 'SceneRemoved',
        des: t('debug.EventDes.SceneRemoved'),
        tags: ['Scenes'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ResParamsDes.SceneRemoved.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ResParamsDes.SceneRemoved.sceneUuid'),
            },
            {
                name: 'isGroup',
                type: "Boolean",
                des: t('debug.ResParamsDes.SceneRemoved.isGroup'),
            },
        ]
    },
    SceneNameChanged:{
        key: 'SceneNameChanged',
        title: 'SceneNameChanged',
        des: t('debug.EventDes.SceneNameChanged'),
        tags: ['Scenes'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ResParamsDes.SceneNameChanged.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ResParamsDes.SceneNameChanged.sceneUuid'),
            },
            {
                name: 'oldSceneName',
                type: "String",
                des: t('debug.ResParamsDes.SceneNameChanged.oldSceneName'),
            },
        ]
    },
    CurrentProgramSceneChanged:{
        key: 'CurrentProgramSceneChanged',
        title: 'CurrentProgramSceneChanged',
        des: t('debug.EventDes.CurrentProgramSceneChanged'),
        tags: ['Scenes'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ResParamsDes.CurrentProgramSceneChanged.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ResParamsDes.CurrentProgramSceneChanged.sceneUuid'),
            },
        ]
    },
    CurrentPreviewSceneChanged:{
        key: 'CurrentPreviewSceneChanged',
        title: 'CurrentPreviewSceneChanged',
        des: t('debug.EventDes.CurrentPreviewSceneChanged'),
        tags: ['Scenes'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ResParamsDes.CurrentPreviewSceneChanged.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ResParamsDes.CurrentPreviewSceneChanged.sceneUuid'),
            },
        ]
    },
    SceneListChanged:{
        key: 'SceneListChanged',
        title: 'SceneListChanged',
        des: t('debug.EventDes.SceneListChanged'),
        tags: ['Scenes'],
        responseParams: [
            {
                name: 'scenes',
                type: "Array<Object>",
                des: t('debug.ResParamsDes.SceneListChanged.scenes'),
            },
        ]
    },
    // Inputs Events
    InputCreated:{
        key: 'InputCreated',
        title: 'InputCreated',
        des: t('debug.EventDes.InputCreated'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ResParamsDes.InputCreated.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ResParamsDes.InputCreated.inputUuid'),
            },
            {
                name: 'inputKind',
                type: "String",
                des: t('debug.ResParamsDes.InputCreated.inputKind'),
            },
            {
                name: 'unversionedInputKind',
                type: "String",
                des: t('debug.ResParamsDes.InputCreated.unversionedInputKind'),
            },
            {
                name: 'inputSettings',
                type: "Object",
                des: t('debug.ResParamsDes.InputCreated.inputSettings'),
            },
            {
                name: 'defaultInputSettings',
                type: "Object",
                des: t('debug.ResParamsDes.InputCreated.defaultInputSettings'),
            },
        ]
    },
    InputRemoved:{
        key: 'InputRemoved',
        title: 'InputRemoved',
        des: t('debug.EventDes.InputRemoved'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ResParamsDes.InputRemoved.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ResParamsDes.InputRemoved.inputUuid'),
            },
        ]
    },
    InputNameChanged:{
        key: 'InputNameChanged',
        title: 'InputNameChanged',
        des: t('debug.EventDes.InputNameChanged'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ResParamsDes.InputNameChanged.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ResParamsDes.InputNameChanged.inputUuid'),
            },
            {
                name: 'oldInputName',
                type: "String",
                des: t('debug.ResParamsDes.InputNameChanged.oldInputName'),
            },
        ]
    },
    InputSettingsChanged:{
        key: 'InputSettingsChanged',
        title: 'InputSettingsChanged',
        des: t('debug.EventDes.InputSettingsChanged'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ResParamsDes.InputSettingsChanged.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ResParamsDes.InputSettingsChanged.inputUuid'),
            },
            {
                name: 'inputSettings',
                type: "Object",
                des: t('debug.ResParamsDes.InputSettingsChanged.inputSettings'),
            },
        ]
    },
    InputActiveStateChanged:{
        key: 'InputActiveStateChanged',
        title: 'InputActiveStateChanged',
        des: t('debug.EventDes.InputActiveStateChanged'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ResParamsDes.InputActiveStateChanged.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ResParamsDes.InputActiveStateChanged.inputUuid'),
            },
            {
                name: 'videoActive',
                type: "Boolean",
                des: t('debug.ResParamsDes.InputActiveStateChanged.videoActive'),
            },
        ]
    },
    InputShowStateChanged:{
        key: 'InputShowStateChanged',
        title: 'InputShowStateChanged',
        des: t('debug.EventDes.InputShowStateChanged'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ResParamsDes.InputShowStateChanged.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ResParamsDes.InputShowStateChanged.inputUuid'),
            },
            {
                name: 'videoShowing',
                type: "Boolean",
                des: t('debug.ResParamsDes.InputShowStateChanged.videoShowing'),
            },
        ]
    },
    InputMuteStateChanged:{
        key: 'InputMuteStateChanged',
        title: 'InputMuteStateChanged',
        des: t('debug.EventDes.InputMuteStateChanged'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ResParamsDes.InputMuteStateChanged.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ResParamsDes.InputMuteStateChanged.inputUuid'),
            },
            {
                name: 'inputMuted',
                type: "Boolean",
                des: t('debug.ResParamsDes.InputMuteStateChanged.inputMuted'),
            },
        ]
    },
    InputVolumeChanged:{
        key: 'InputVolumeChanged',
        title: 'InputVolumeChanged',
        des: t('debug.EventDes.InputVolumeChanged'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ResParamsDes.InputVolumeChanged.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ResParamsDes.InputVolumeChanged.inputUuid'),
            },
            {
                name: 'inputVolumeMul',
                type: "Number",
                des: t('debug.ResParamsDes.InputVolumeChanged.inputVolumeMul'),
            },
            {
                name: 'inputVolumeDb',
                type: "Number",
                des: t('debug.ResParamsDes.InputVolumeChanged.inputVolumeDb'),
            },
        ]
    },
    InputAudioBalanceChanged:{
        key: 'InputAudioBalanceChanged',
        title: 'InputAudioBalanceChanged',
        des: t('debug.EventDes.InputAudioBalanceChanged'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ResParamsDes.InputAudioBalanceChanged.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ResParamsDes.InputAudioBalanceChanged.inputUuid'),
            },
            {
                name: 'inputAudioBalance',
                type: "Number",
                des: t('debug.ResParamsDes.InputAudioBalanceChanged.inputAudioBalance'),
            },
        ]
    },
    InputAudioSyncOffsetChanged:{
        key: 'InputAudioSyncOffsetChanged',
        title: 'InputAudioSyncOffsetChanged',
        des: t('debug.EventDes.InputAudioSyncOffsetChanged'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ResParamsDes.InputAudioSyncOffsetChanged.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ResParamsDes.InputAudioSyncOffsetChanged.inputUuid'),
            },
            {
                name: 'inputAudioSyncOffset',
                type: "Number",
                des: t('debug.ResParamsDes.InputAudioSyncOffsetChanged.inputAudioSyncOffset'),
            },
        ]
    },
    InputAudioTracksChanged:{
        key: 'InputAudioTracksChanged',
        title: 'InputAudioTracksChanged',
        des: t('debug.EventDes.InputAudioTracksChanged'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ResParamsDes.InputAudioTracksChanged.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ResParamsDes.InputAudioTracksChanged.inputUuid'),
            },
            {
                name: 'inputAudioTracks',
                type: "Object",
                des: t('debug.ResParamsDes.InputAudioTracksChanged.inputAudioTracks'),
            },
        ]
    },
    InputAudioMonitorTypeChanged:{
        key: 'InputAudioMonitorTypeChanged',
        title: 'InputAudioMonitorTypeChanged',
        des: t('debug.EventDes.InputAudioMonitorTypeChanged'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ResParamsDes.InputAudioMonitorTypeChanged.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ResParamsDes.InputAudioMonitorTypeChanged.inputUuid'),
            },
            {
                name: 'monitorType',
                type: "String",
                des: t('debug.ResParamsDes.InputAudioMonitorTypeChanged.monitorType'),
            },
        ]
    },
    InputVolumeMeters:{
        key: 'InputVolumeMeters',
        title: 'InputVolumeMeters',
        des: t('debug.EventDes.InputVolumeMeters'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputs',
                type: "Array<Object>",
                des: t('debug.ResParamsDes.InputVolumeMeters.inputs'),
            },
        ]
    },
    // Transitions Events
    CurrentSceneTransitionChanged:{
        key: 'CurrentSceneTransitionChanged',
        title: 'CurrentSceneTransitionChanged',
        des: t('debug.EventDes.CurrentSceneTransitionChanged'),
        tags: ['Transitions'],
        responseParams: [
            {
                name: 'transitionName',
                type: "String",
                des: t('debug.ResParamsDes.CurrentSceneTransitionChanged.transitionName'),
            },
            {
                name: 'transitionUuid',
                type: "String",
                des: t('debug.ResParamsDes.CurrentSceneTransitionChanged.transitionUuid'),
            },
        ]
    },
    CurrentSceneTransitionDurationChanged:{
        key: 'CurrentSceneTransitionDurationChanged',
        title: 'CurrentSceneTransitionDurationChanged',
        des: t('debug.EventDes.CurrentSceneTransitionDurationChanged'),
        tags: ['Transitions'],
        responseParams: [
            {
                name: 'transitionDuration',
                type: "Number",
                des: t('debug.ResParamsDes.CurrentSceneTransitionDurationChanged.transitionDuration'),
            },
        ]
    },
    SceneTransitionStarted:{
        key: 'SceneTransitionStarted',
        title: 'SceneTransitionStarted',
        des: t('debug.EventDes.SceneTransitionStarted'),
        tags: ['Transitions'],
        responseParams: [
            {
                name: 'transitionName',
                type: "String",
                des: t('debug.ResParamsDes.SceneTransitionStarted.transitionName'),
            },
            {
                name: 'transitionUuid',
                type: "String",
                des: t('debug.ResParamsDes.SceneTransitionStarted.transitionUuid'),
            },
        ]
    },
    SceneTransitionEnded:{
        key: 'SceneTransitionEnded',
        title: 'SceneTransitionEnded',
        des: t('debug.EventDes.SceneTransitionEnded'),
        tags: ['Transitions'],
        responseParams: [
            {
                name: 'transitionName',
                type: "String",
                des: t('debug.ResParamsDes.SceneTransitionEnded.transitionName'),
            },
            {
                name: 'transitionUuid',
                type: "String",
                des: t('debug.ResParamsDes.SceneTransitionEnded.transitionUuid'),
            },
        ]
    },
    SceneTransitionVideoEnded:{
        key: 'SceneTransitionVideoEnded',
        title: 'SceneTransitionVideoEnded',
        des: t('debug.EventDes.SceneTransitionVideoEnded'),
        tags: ['Transitions'],
        responseParams: [
            {
                name: 'transitionName',
                type: "String",
                des: t('debug.ResParamsDes.SceneTransitionVideoEnded.transitionName'),
            },
            {
                name: 'transitionUuid',
                type: "String",
                des: t('debug.ResParamsDes.SceneTransitionVideoEnded.transitionUuid'),
            },
        ]
    },
    // Filters Events
    SourceFilterListReindexed:{
        key: 'SourceFilterListReindexed',
        title: 'SourceFilterListReindexed',
        des: t('debug.EventDes.SourceFilterListReindexed'),
        tags: ['Filters'],
        responseParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('debug.ResParamsDes.SourceFilterListReindexed.sourceName'),
            },
            {
                name: 'filters',
                type: "Array<Object>",
                des: t('debug.ResParamsDes.SourceFilterListReindexed.filters'),
            },
        ]
    },
    SourceFilterCreated:{
        key: 'SourceFilterCreated',
        title: 'SourceFilterCreated',
        des: t('debug.EventDes.SourceFilterCreated'),
        tags: ['Filters'],
        responseParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('debug.ResParamsDes.SourceFilterCreated.sourceName'),
            },
            {
                name: 'filterName',
                type: "String",
                des: t('debug.ResParamsDes.SourceFilterCreated.filterName'),
            },
            {
                name: 'filterKind',
                type: "String",
                des: t('debug.ResParamsDes.SourceFilterCreated.filterKind'),
            },
            {
                name: 'filterIndex',
                type: "Number",
                des: t('debug.ResParamsDes.SourceFilterCreated.filterIndex'),
            },
            {
                name: 'filterSettings',
                type: "Object",
                des: t('debug.ResParamsDes.SourceFilterCreated.filterSettings'),
            },
            {
                name: 'defaultFilterSettings',
                type: "Object",
                des: t('debug.ResParamsDes.SourceFilterCreated.defaultFilterSettings'),
            },
        ]
    },
    SourceFilterRemoved:{
        key: 'SourceFilterRemoved',
        title: 'SourceFilterRemoved',
        des: t('debug.EventDes.SourceFilterRemoved'),
        tags: ['Filters'],
        responseParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('debug.ResParamsDes.SourceFilterRemoved.sourceName'),
            },
            {
                name: 'filterName',
                type: "String",
                des: t('debug.ResParamsDes.SourceFilterRemoved.filterName'),
            },
        ]
    },
    SourceFilterNameChanged:{
        key: 'SourceFilterNameChanged',
        title: 'SourceFilterNameChanged',
        des: t('debug.EventDes.SourceFilterNameChanged'),
        tags: ['Filters'],
        responseParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('debug.ResParamsDes.SourceFilterNameChanged.sourceName'),
            },
            {
                name: 'filterName',
                type: "String",
                des: t('debug.ResParamsDes.SourceFilterNameChanged.filterName'),
            },
            {
                name: 'oldFilterName',
                type: "String",
                des: t('debug.ResParamsDes.SourceFilterNameChanged.oldFilterName'),
            },
        ]
    },
    SourceFilterSettingsChanged:{
        key: 'SourceFilterSettingsChanged',
        title: 'SourceFilterSettingsChanged',
        des: t('debug.EventDes.SourceFilterSettingsChanged'),
        tags: ['Filters'],
        responseParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('debug.ResParamsDes.SourceFilterSettingsChanged.sourceName'),
            },
            {
                name: 'filterName',
                type: "String",
                des: t('debug.ResParamsDes.SourceFilterSettingsChanged.filterName'),
            },
            {
                name: 'filterSettings',
                type: "Object",
                des: t('debug.ResParamsDes.SourceFilterSettingsChanged.filterSettings'),
            },
        ]
    },
    SourceFilterEnableStateChanged:{
        key: 'SourceFilterEnableStateChanged',
        title: 'SourceFilterEnableStateChanged',
        des: t('debug.EventDes.SourceFilterEnableStateChanged'),
        tags: ['Filters'],
        responseParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('debug.ResParamsDes.SourceFilterEnableStateChanged.sourceName'),
            },
            {
                name: 'filterName',
                type: "String",
                des: t('debug.ResParamsDes.SourceFilterEnableStateChanged.filterName'),
            },
            {
                name: 'filterEnabled',
                type: "Boolean",
                des: t('debug.ResParamsDes.SourceFilterEnableStateChanged.filterEnabled'),
            },
        ]
    },
    // Scene Items Events
    SceneItemCreated:{
        key: 'SceneItemCreated',
        title: 'SceneItemCreated',
        des: t('debug.EventDes.SceneItemCreated'),
        tags: ['Scene Items'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ResParamsDes.SceneItemCreated.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ResParamsDes.SceneItemCreated.sceneUuid'),
            },
            {
                name: 'sourceName',
                type: "Number",
                des: t('debug.ResParamsDes.SceneItemCreated.sourceName'),
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('debug.ResParamsDes.SceneItemCreated.sourceUuid'),
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('debug.ResParamsDes.SceneItemCreated.sceneItemId'),
            },
            {
                name: 'sceneItemIndex',
                type: "Number",
                des: t('debug.ResParamsDes.SceneItemCreated.sceneItemIndex'),
            },
        ]
    },
    SceneItemRemoved:{
        key: 'SceneItemRemoved',
        title: 'SceneItemRemoved',
        des: t('debug.EventDes.SceneItemRemoved'),
        tags: ['Scene Items'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ResParamsDes.SceneItemRemoved.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ResParamsDes.SceneItemRemoved.sceneUuid'),
            },
            {
                name: 'sourceName',
                type: "Number",
                des: t('debug.ResParamsDes.SceneItemRemoved.sourceName'),
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('debug.ResParamsDes.SceneItemRemoved.sourceUuid'),
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('debug.ResParamsDes.SceneItemRemoved.sceneItemId'),
            },
        ]
    },
    SceneItemListReindexed:{
        key: 'SceneItemListReindexed',
        title: 'SceneItemListReindexed',
        des: t('debug.EventDes.SceneItemListReindexed'),
        tags: ['Scene Items'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ResParamsDes.SceneItemListReindexed.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ResParamsDes.SceneItemListReindexed.sceneUuid'),
            },
            {
                name: 'sceneItems',
                type: "Array<Object>",
                des: t('debug.ResParamsDes.SceneItemListReindexed.sceneItems'),
            },
        ]
    },
    SceneItemEnableStateChanged:{
        key: 'SceneItemEnableStateChanged',
        title: 'SceneItemEnableStateChanged',
        des: t('debug.EventDes.SceneItemEnableStateChanged'),
        tags: ['Scene Items'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ResParamsDes.SceneItemEnableStateChanged.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ResParamsDes.SceneItemEnableStateChanged.sceneUuid'),
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('debug.ResParamsDes.SceneItemEnableStateChanged.sceneItemId'),
            },
            {
                name: 'sceneItemEnabled',
                type: "Boolean",
                des: t('debug.ResParamsDes.SceneItemEnableStateChanged.sceneItemEnabled'),
            },
        ]
    },
    SceneItemLockStateChanged:{
        key: 'SceneItemLockStateChanged',
        title: 'SceneItemLockStateChanged',
        des: t('debug.EventDes.SceneItemLockStateChanged'),
        tags: ['Scene Items'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ResParamsDes.SceneItemLockStateChanged.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ResParamsDes.SceneItemLockStateChanged.sceneUuid'),
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('debug.ResParamsDes.SceneItemLockStateChanged.sceneItemId'),
            },
            {
                name: 'sceneItemLocked',
                type: "Boolean",
                des: t('debug.ResParamsDes.SceneItemLockStateChanged.sceneItemLocked'),
            },
        ]
    },
    SceneItemSelected:{
        key: 'SceneItemSelected',
        title: 'SceneItemSelected',
        des: t('debug.EventDes.SceneItemSelected'),
        tags: ['Scene Items'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ResParamsDes.SceneItemSelected.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ResParamsDes.SceneItemSelected.sceneUuid'),
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('debug.ResParamsDes.SceneItemSelected.sceneItemId'),
            },
        ]
    },
    SceneItemTransformChanged:{
        key: 'SceneItemTransformChanged',
        title: 'SceneItemTransformChanged',
        des: t('debug.EventDes.SceneItemTransformChanged'),
        tags: ['Scene Items'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ResParamsDes.SceneItemTransformChanged.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ResParamsDes.SceneItemTransformChanged.sceneUuid'),
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('debug.ResParamsDes.SceneItemTransformChanged.sceneItemId'),
            },
            {
                name: 'sceneItemTransform',
                type: "Object",
                des: t('debug.ResParamsDes.SceneItemTransformChanged.sceneItemTransform'),
            },
        ]
    },
    // Outputs Events
    StreamStateChanged:{
        key: 'StreamStateChanged',
        title: 'StreamStateChanged',
        des: t('debug.EventDes.StreamStateChanged'),
        tags: ['Outputs'],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('debug.ResParamsDes.StreamStateChanged.outputActive'),
            },
            {
                name: 'outputState',
                type: "String",
                des: t('debug.ResParamsDes.StreamStateChanged.outputState'),
            },
        ]
    },
    RecordStateChanged:{
        key: 'RecordStateChanged',
        title: 'RecordStateChanged',
        des: t('debug.EventDes.RecordStateChanged'),
        tags: ['Outputs'],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('debug.ResParamsDes.RecordStateChanged.outputActive'),
            },
            {
                name: 'outputState',
                type: "String",
                des: t('debug.ResParamsDes.RecordStateChanged.outputState'),
            },
            {
                name: 'outputPath',
                type: "String",
                des: t('debug.ResParamsDes.RecordStateChanged.outputPath'),
            },
        ]
    },
    ReplayBufferStateChanged:{
        key: 'ReplayBufferStateChanged',
        title: 'ReplayBufferStateChanged',
        des: t('debug.EventDes.ReplayBufferStateChanged'),
        tags: ['Outputs'],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('debug.ResParamsDes.ReplayBufferStateChanged.outputActive'),
            },
            {
                name: 'outputState',
                type: "String",
                des: t('debug.ResParamsDes.ReplayBufferStateChanged.outputState'),
            },
        ]
    },
    VirtualcamStateChanged:{
        key: 'VirtualcamStateChanged',
        title: 'VirtualcamStateChanged',
        des: t('debug.EventDes.VirtualcamStateChanged'),
        tags: ['Outputs'],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('debug.ResParamsDes.VirtualcamStateChanged.outputActive'),
            },
            {
                name: 'outputState',
                type: "String",
                des: t('debug.ResParamsDes.VirtualcamStateChanged.outputState'),
            },
        ]
    },
    ReplayBufferSaved:{
        key: 'ReplayBufferSaved',
        title: 'ReplayBufferSaved',
        des: t('debug.EventDes.ReplayBufferSaved'),
        tags: ['Outputs'],
        responseParams: [
            {
                name: 'savedReplayPath',
                type: "String",
                des: t('debug.ResParamsDes.VirtualcamStateChanged.savedReplayPath'),
            },
        ]
    },
    // Media Inputs Events
    MediaInputPlaybackStarted:{
        key: 'MediaInputPlaybackStarted',
        title: 'MediaInputPlaybackStarted',
        des: t('debug.EventDes.MediaInputPlaybackStarted'),
        tags: ['Media Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ResParamsDes.MediaInputPlaybackStarted.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ResParamsDes.MediaInputPlaybackStarted.inputUuid'),
            },
        ]
    },
    MediaInputPlaybackEnded:{
        key: 'MediaInputPlaybackEnded',
        title: 'MediaInputPlaybackEnded',
        des: t('debug.EventDes.MediaInputPlaybackEnded'),
        tags: ['Media Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ResParamsDes.MediaInputPlaybackEnded.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ResParamsDes.MediaInputPlaybackEnded.inputUuid'),
            },
        ]
    },
    MediaInputActionTriggered:{
        key: 'MediaInputActionTriggered',
        title: 'MediaInputActionTriggered',
        des: t('debug.EventDes.MediaInputActionTriggered'),
        tags: ['Media Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ResParamsDes.MediaInputActionTriggered.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ResParamsDes.MediaInputActionTriggered.inputUuid'),
            },
            {
                name: 'mediaAction',
                type: "String",
                des: t('debug.ResParamsDes.MediaInputActionTriggered.mediaAction'),
            },
        ]
    },
    // Ui Events
    StudioModeStateChanged:{
        key: 'StudioModeStateChanged',
        title: 'StudioModeStateChanged',
        des: t('debug.EventDes.StudioModeStateChanged'),
        tags: ['Ui'],
        responseParams: [
            {
                name: 'studioModeEnabled',
                type: "Boolean",
                des: t('debug.ResParamsDes.StudioModeStateChanged.studioModeEnabled'),
            },
        ]
    },
    ScreenshotSaved:{
        key: 'ScreenshotSaved',
        title: 'ScreenshotSaved',
        des: t('debug.EventDes.ScreenshotSaved'),
        tags: ['Ui'],
        responseParams: [
            {
                name: 'savedScreenshotPath',
                type: "String",
                des: t('debug.ResParamsDes.ScreenshotSaved.savedScreenshotPath'),
            },
        ]
    },
}