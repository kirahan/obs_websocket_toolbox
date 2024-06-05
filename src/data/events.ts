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
        des: t('EventDes.ExitStarted'),
        tags: ['General'],
        responseParams: [

        ]
    },
    VendorEvent:{
        key: 'VendorEvent',
        title: 'VendorEvent',
        des: t('EventDes.VendorEvent'),
        tags: ['General'],
        responseParams: [
            {
                name: 'vendorName',
                type: "String",
                des: t('ResParamsDes.VendorEvent.vendorName'),
            },
            {
                name: 'eventType',
                type: "String",
                des: t('ResParamsDes.VendorEvent.eventType'),
            },
            {
                name: 'eventData',
                type: "Object",
                des: t('ResParamsDes.VendorEvent.eventData'),
            },
        ]
    },
    CustomEvent:{
        key: 'CustomEvent',
        title: 'CustomEvent',
        des: t('EventDes.CustomEvent'),
        tags: ['General'],
        responseParams: [
            {
                name: 'eventData',
                type: "Object",
                des: t('ResParamsDes.CustomEvent.eventData'),
            },
        ]
    },
    // Config Events
    CurrentSceneCollectionChanging:{
        key: 'CurrentSceneCollectionChanging',
        title: 'CurrentSceneCollectionChanging',
        des: t('EventDes.CurrentSceneCollectionChanging'),
        tags: ['Config'],
        responseParams: [
            {
                name: 'sceneCollectionName',
                type: "String",
                des: t('ResParamsDes.CurrentSceneCollectionChanging.sceneCollectionName'),
            },
        ]
    },
    CurrentSceneCollectionChanged:{
        key: 'CurrentSceneCollectionChanged',
        title: 'CurrentSceneCollectionChanged',
        des: t('EventDes.CurrentSceneCollectionChanged'),
        tags: ['Config'],
        responseParams: [
            {
                name: 'sceneCollectionName',
                type: "String",
                des: t('ResParamsDes.CurrentSceneCollectionChanged.sceneCollectionName'),
            },
        ]
    },
    SceneCollectionListChanged:{
        key: 'SceneCollectionListChanged',
        title: 'SceneCollectionListChanged',
        des: t('EventDes.SceneCollectionListChanged'),
        tags: ['Config'],
        responseParams: [
            {
                name: 'sceneCollections',
                type: "Array<String>",
                des: t('ResParamsDes.SceneCollectionListChanged.sceneCollections'),
            },
        ]
    },
    CurrentProfileChanging:{
        key: 'CurrentProfileChanging',
        title: 'CurrentProfileChanging',
        des: t('EventDes.CurrentProfileChanging'),
        tags: ['Config'],
        responseParams: [
            {
                name: 'profileName',
                type: "String",
                des: t('ResParamsDes.CurrentProfileChanging.profileName'),
            },
        ]
    },
    CurrentProfileChanged:{
        key: 'CurrentProfileChanged',
        title: 'CurrentProfileChanged',
        des: t('EventDes.CurrentProfileChanged'),
        tags: ['Config'],
        responseParams: [
            {
                name: 'profileName',
                type: "String",
                des: t('ResParamsDes.CurrentProfileChanged.profileName'),
            },
        ]
    },
    ProfileListChanged:{
        key: 'ProfileListChanged',
        title: 'ProfileListChanged',
        des: t('EventDes.ProfileListChanged'),
        tags: ['Config'],
        responseParams: [
            {
                name: 'profiles',
                type: "Array<String>",
                des: t('ResParamsDes.ProfileListChanged.profiles'),
            },
        ]
    },
    // Scenes Events
    SceneCreated:{
        key: 'SceneCreated',
        title: 'SceneCreated',
        des: t('EventDes.SceneCreated'),
        tags: ['Scenes'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ResParamsDes.SceneCreated.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ResParamsDes.SceneCreated.sceneUuid'),
            },
            {
                name: 'isGroup',
                type: "Boolean",
                des: t('ResParamsDes.SceneCreated.isGroup'),
            },
        ]
    },
    SceneRemoved:{
        key: 'SceneRemoved',
        title: 'SceneRemoved',
        des: t('EventDes.SceneRemoved'),
        tags: ['Scenes'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ResParamsDes.SceneRemoved.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ResParamsDes.SceneRemoved.sceneUuid'),
            },
            {
                name: 'isGroup',
                type: "Boolean",
                des: t('ResParamsDes.SceneRemoved.isGroup'),
            },
        ]
    },
    SceneNameChanged:{
        key: 'SceneNameChanged',
        title: 'SceneNameChanged',
        des: t('EventDes.SceneNameChanged'),
        tags: ['Scenes'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ResParamsDes.SceneNameChanged.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ResParamsDes.SceneNameChanged.sceneUuid'),
            },
            {
                name: 'oldSceneName',
                type: "String",
                des: t('ResParamsDes.SceneNameChanged.oldSceneName'),
            },
        ]
    },
    CurrentProgramSceneChanged:{
        key: 'CurrentProgramSceneChanged',
        title: 'CurrentProgramSceneChanged',
        des: t('EventDes.CurrentProgramSceneChanged'),
        tags: ['Scenes'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ResParamsDes.CurrentProgramSceneChanged.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ResParamsDes.CurrentProgramSceneChanged.sceneUuid'),
            },
        ]
    },
    CurrentPreviewSceneChanged:{
        key: 'CurrentPreviewSceneChanged',
        title: 'CurrentPreviewSceneChanged',
        des: t('EventDes.CurrentPreviewSceneChanged'),
        tags: ['Scenes'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ResParamsDes.CurrentPreviewSceneChanged.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ResParamsDes.CurrentPreviewSceneChanged.sceneUuid'),
            },
        ]
    },
    SceneListChanged:{
        key: 'SceneListChanged',
        title: 'SceneListChanged',
        des: t('EventDes.SceneListChanged'),
        tags: ['Scenes'],
        responseParams: [
            {
                name: 'scenes',
                type: "Array<Object>",
                des: t('ResParamsDes.SceneListChanged.scenes'),
            },
        ]
    },
    // Inputs Events
    InputCreated:{
        key: 'InputCreated',
        title: 'InputCreated',
        des: t('EventDes.InputCreated'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ResParamsDes.InputCreated.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ResParamsDes.InputCreated.inputUuid'),
            },
            {
                name: 'inputKind',
                type: "String",
                des: t('ResParamsDes.InputCreated.inputKind'),
            },
            {
                name: 'unversionedInputKind',
                type: "String",
                des: t('ResParamsDes.InputCreated.unversionedInputKind'),
            },
            {
                name: 'inputSettings',
                type: "Object",
                des: t('ResParamsDes.InputCreated.inputSettings'),
            },
            {
                name: 'defaultInputSettings',
                type: "Object",
                des: t('ResParamsDes.InputCreated.defaultInputSettings'),
            },
        ]
    },
    InputRemoved:{
        key: 'InputRemoved',
        title: 'InputRemoved',
        des: t('EventDes.InputRemoved'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ResParamsDes.InputRemoved.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ResParamsDes.InputRemoved.inputUuid'),
            },
        ]
    },
    InputNameChanged:{
        key: 'InputNameChanged',
        title: 'InputNameChanged',
        des: t('EventDes.InputNameChanged'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ResParamsDes.InputNameChanged.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ResParamsDes.InputNameChanged.inputUuid'),
            },
            {
                name: 'oldInputName',
                type: "String",
                des: t('ResParamsDes.InputNameChanged.oldInputName'),
            },
        ]
    },
    InputSettingsChanged:{
        key: 'InputSettingsChanged',
        title: 'InputSettingsChanged',
        des: t('EventDes.InputSettingsChanged'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ResParamsDes.InputSettingsChanged.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ResParamsDes.InputSettingsChanged.inputUuid'),
            },
            {
                name: 'inputSettings',
                type: "Object",
                des: t('ResParamsDes.InputSettingsChanged.inputSettings'),
            },
        ]
    },
    InputActiveStateChanged:{
        key: 'InputActiveStateChanged',
        title: 'InputActiveStateChanged',
        des: t('EventDes.InputActiveStateChanged'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ResParamsDes.InputActiveStateChanged.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ResParamsDes.InputActiveStateChanged.inputUuid'),
            },
            {
                name: 'videoActive',
                type: "Boolean",
                des: t('ResParamsDes.InputActiveStateChanged.videoActive'),
            },
        ]
    },
    InputShowStateChanged:{
        key: 'InputShowStateChanged',
        title: 'InputShowStateChanged',
        des: t('EventDes.InputShowStateChanged'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ResParamsDes.InputShowStateChanged.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ResParamsDes.InputShowStateChanged.inputUuid'),
            },
            {
                name: 'videoShowing',
                type: "Boolean",
                des: t('ResParamsDes.InputShowStateChanged.videoShowing'),
            },
        ]
    },
    InputMuteStateChanged:{
        key: 'InputMuteStateChanged',
        title: 'InputMuteStateChanged',
        des: t('EventDes.InputMuteStateChanged'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ResParamsDes.InputMuteStateChanged.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ResParamsDes.InputMuteStateChanged.inputUuid'),
            },
            {
                name: 'inputMuted',
                type: "Boolean",
                des: t('ResParamsDes.InputMuteStateChanged.inputMuted'),
            },
        ]
    },
    InputVolumeChanged:{
        key: 'InputVolumeChanged',
        title: 'InputVolumeChanged',
        des: t('EventDes.InputVolumeChanged'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ResParamsDes.InputVolumeChanged.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ResParamsDes.InputVolumeChanged.inputUuid'),
            },
            {
                name: 'inputVolumeMul',
                type: "Number",
                des: t('ResParamsDes.InputVolumeChanged.inputVolumeMul'),
            },
            {
                name: 'inputVolumeDb',
                type: "Number",
                des: t('ResParamsDes.InputVolumeChanged.inputVolumeDb'),
            },
        ]
    },
    InputAudioBalanceChanged:{
        key: 'InputAudioBalanceChanged',
        title: 'InputAudioBalanceChanged',
        des: t('EventDes.InputAudioBalanceChanged'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ResParamsDes.InputAudioBalanceChanged.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ResParamsDes.InputAudioBalanceChanged.inputUuid'),
            },
            {
                name: 'inputAudioBalance',
                type: "Number",
                des: t('ResParamsDes.InputAudioBalanceChanged.inputAudioBalance'),
            },
        ]
    },
    InputAudioSyncOffsetChanged:{
        key: 'InputAudioSyncOffsetChanged',
        title: 'InputAudioSyncOffsetChanged',
        des: t('EventDes.InputAudioSyncOffsetChanged'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ResParamsDes.InputAudioSyncOffsetChanged.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ResParamsDes.InputAudioSyncOffsetChanged.inputUuid'),
            },
            {
                name: 'inputAudioSyncOffset',
                type: "Number",
                des: t('ResParamsDes.InputAudioSyncOffsetChanged.inputAudioSyncOffset'),
            },
        ]
    },
    InputAudioTracksChanged:{
        key: 'InputAudioTracksChanged',
        title: 'InputAudioTracksChanged',
        des: t('EventDes.InputAudioTracksChanged'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ResParamsDes.InputAudioTracksChanged.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ResParamsDes.InputAudioTracksChanged.inputUuid'),
            },
            {
                name: 'inputAudioTracks',
                type: "Object",
                des: t('ResParamsDes.InputAudioTracksChanged.inputAudioTracks'),
            },
        ]
    },
    InputAudioMonitorTypeChanged:{
        key: 'InputAudioMonitorTypeChanged',
        title: 'InputAudioMonitorTypeChanged',
        des: t('EventDes.InputAudioMonitorTypeChanged'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ResParamsDes.InputAudioMonitorTypeChanged.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ResParamsDes.InputAudioMonitorTypeChanged.inputUuid'),
            },
            {
                name: 'monitorType',
                type: "String",
                des: t('ResParamsDes.InputAudioMonitorTypeChanged.monitorType'),
            },
        ]
    },
    InputVolumeMeters:{
        key: 'InputVolumeMeters',
        title: 'InputVolumeMeters',
        des: t('EventDes.InputVolumeMeters'),
        tags: ['Inputs'],
        responseParams: [
            {
                name: 'inputs',
                type: "Array<Object>",
                des: t('ResParamsDes.InputVolumeMeters.inputs'),
            },
        ]
    },
    // Transitions Events
    CurrentSceneTransitionChanged:{
        key: 'CurrentSceneTransitionChanged',
        title: 'CurrentSceneTransitionChanged',
        des: t('EventDes.CurrentSceneTransitionChanged'),
        tags: ['Transitions'],
        responseParams: [
            {
                name: 'transitionName',
                type: "String",
                des: t('ResParamsDes.CurrentSceneTransitionChanged.transitionName'),
            },
            {
                name: 'transitionUuid',
                type: "String",
                des: t('ResParamsDes.CurrentSceneTransitionChanged.transitionUuid'),
            },
        ]
    },
    CurrentSceneTransitionDurationChanged:{
        key: 'CurrentSceneTransitionDurationChanged',
        title: 'CurrentSceneTransitionDurationChanged',
        des: t('EventDes.CurrentSceneTransitionDurationChanged'),
        tags: ['Transitions'],
        responseParams: [
            {
                name: 'transitionDuration',
                type: "Number",
                des: t('ResParamsDes.CurrentSceneTransitionDurationChanged.transitionDuration'),
            },
        ]
    },
    SceneTransitionStarted:{
        key: 'SceneTransitionStarted',
        title: 'SceneTransitionStarted',
        des: t('EventDes.SceneTransitionStarted'),
        tags: ['Transitions'],
        responseParams: [
            {
                name: 'transitionName',
                type: "String",
                des: t('ResParamsDes.SceneTransitionStarted.transitionName'),
            },
            {
                name: 'transitionUuid',
                type: "String",
                des: t('ResParamsDes.SceneTransitionStarted.transitionUuid'),
            },
        ]
    },
    SceneTransitionEnded:{
        key: 'SceneTransitionEnded',
        title: 'SceneTransitionEnded',
        des: t('EventDes.SceneTransitionEnded'),
        tags: ['Transitions'],
        responseParams: [
            {
                name: 'transitionName',
                type: "String",
                des: t('ResParamsDes.SceneTransitionEnded.transitionName'),
            },
            {
                name: 'transitionUuid',
                type: "String",
                des: t('ResParamsDes.SceneTransitionEnded.transitionUuid'),
            },
        ]
    },
    SceneTransitionVideoEnded:{
        key: 'SceneTransitionVideoEnded',
        title: 'SceneTransitionVideoEnded',
        des: t('EventDes.SceneTransitionVideoEnded'),
        tags: ['Transitions'],
        responseParams: [
            {
                name: 'transitionName',
                type: "String",
                des: t('ResParamsDes.SceneTransitionVideoEnded.transitionName'),
            },
            {
                name: 'transitionUuid',
                type: "String",
                des: t('ResParamsDes.SceneTransitionVideoEnded.transitionUuid'),
            },
        ]
    },
    // Filters Events
    SourceFilterListReindexed:{
        key: 'SourceFilterListReindexed',
        title: 'SourceFilterListReindexed',
        des: t('EventDes.SourceFilterListReindexed'),
        tags: ['Filters'],
        responseParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('ResParamsDes.SourceFilterListReindexed.sourceName'),
            },
            {
                name: 'filters',
                type: "Array<Object>",
                des: t('ResParamsDes.SourceFilterListReindexed.filters'),
            },
        ]
    },
    SourceFilterCreated:{
        key: 'SourceFilterCreated',
        title: 'SourceFilterCreated',
        des: t('EventDes.SourceFilterCreated'),
        tags: ['Filters'],
        responseParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('ResParamsDes.SourceFilterCreated.sourceName'),
            },
            {
                name: 'filterName',
                type: "String",
                des: t('ResParamsDes.SourceFilterCreated.filterName'),
            },
            {
                name: 'filterKind',
                type: "String",
                des: t('ResParamsDes.SourceFilterCreated.filterKind'),
            },
            {
                name: 'filterIndex',
                type: "Number",
                des: t('ResParamsDes.SourceFilterCreated.filterIndex'),
            },
            {
                name: 'filterSettings',
                type: "Object",
                des: t('ResParamsDes.SourceFilterCreated.filterSettings'),
            },
            {
                name: 'defaultFilterSettings',
                type: "Object",
                des: t('ResParamsDes.SourceFilterCreated.defaultFilterSettings'),
            },
        ]
    },
    SourceFilterRemoved:{
        key: 'SourceFilterRemoved',
        title: 'SourceFilterRemoved',
        des: t('EventDes.SourceFilterRemoved'),
        tags: ['Filters'],
        responseParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('ResParamsDes.SourceFilterRemoved.sourceName'),
            },
            {
                name: 'filterName',
                type: "String",
                des: t('ResParamsDes.SourceFilterRemoved.filterName'),
            },
        ]
    },
    SourceFilterNameChanged:{
        key: 'SourceFilterNameChanged',
        title: 'SourceFilterNameChanged',
        des: t('EventDes.SourceFilterNameChanged'),
        tags: ['Filters'],
        responseParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('ResParamsDes.SourceFilterNameChanged.sourceName'),
            },
            {
                name: 'filterName',
                type: "String",
                des: t('ResParamsDes.SourceFilterNameChanged.filterName'),
            },
            {
                name: 'oldFilterName',
                type: "String",
                des: t('ResParamsDes.SourceFilterNameChanged.oldFilterName'),
            },
        ]
    },
    SourceFilterSettingsChanged:{
        key: 'SourceFilterSettingsChanged',
        title: 'SourceFilterSettingsChanged',
        des: t('EventDes.SourceFilterSettingsChanged'),
        tags: ['Filters'],
        responseParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('ResParamsDes.SourceFilterSettingsChanged.sourceName'),
            },
            {
                name: 'filterName',
                type: "String",
                des: t('ResParamsDes.SourceFilterSettingsChanged.filterName'),
            },
            {
                name: 'filterSettings',
                type: "Object",
                des: t('ResParamsDes.SourceFilterSettingsChanged.filterSettings'),
            },
        ]
    },
    SourceFilterEnableStateChanged:{
        key: 'SourceFilterEnableStateChanged',
        title: 'SourceFilterEnableStateChanged',
        des: t('EventDes.SourceFilterEnableStateChanged'),
        tags: ['Filters'],
        responseParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('ResParamsDes.SourceFilterEnableStateChanged.sourceName'),
            },
            {
                name: 'filterName',
                type: "String",
                des: t('ResParamsDes.SourceFilterEnableStateChanged.filterName'),
            },
            {
                name: 'filterEnabled',
                type: "Boolean",
                des: t('ResParamsDes.SourceFilterEnableStateChanged.filterEnabled'),
            },
        ]
    },
    // Scene Items Events
    SceneItemCreated:{
        key: 'SceneItemCreated',
        title: 'SceneItemCreated',
        des: t('EventDes.SceneItemCreated'),
        tags: ['Scene Items'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ResParamsDes.SceneItemCreated.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ResParamsDes.SceneItemCreated.sceneUuid'),
            },
            {
                name: 'sourceName',
                type: "Number",
                des: t('ResParamsDes.SceneItemCreated.sourceName'),
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('ResParamsDes.SceneItemCreated.sourceUuid'),
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('ResParamsDes.SceneItemCreated.sceneItemId'),
            },
            {
                name: 'sceneItemIndex',
                type: "Number",
                des: t('ResParamsDes.SceneItemCreated.sceneItemIndex'),
            },
        ]
    },
    SceneItemRemoved:{
        key: 'SceneItemRemoved',
        title: 'SceneItemRemoved',
        des: t('EventDes.SceneItemRemoved'),
        tags: ['Scene Items'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ResParamsDes.SceneItemRemoved.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ResParamsDes.SceneItemRemoved.sceneUuid'),
            },
            {
                name: 'sourceName',
                type: "Number",
                des: t('ResParamsDes.SceneItemRemoved.sourceName'),
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('ResParamsDes.SceneItemRemoved.sourceUuid'),
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('ResParamsDes.SceneItemRemoved.sceneItemId'),
            },
        ]
    },
    SceneItemListReindexed:{
        key: 'SceneItemListReindexed',
        title: 'SceneItemListReindexed',
        des: t('EventDes.SceneItemListReindexed'),
        tags: ['Scene Items'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ResParamsDes.SceneItemListReindexed.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ResParamsDes.SceneItemListReindexed.sceneUuid'),
            },
            {
                name: 'sceneItems',
                type: "Array<Object>",
                des: t('ResParamsDes.SceneItemListReindexed.sceneItems'),
            },
        ]
    },
    SceneItemEnableStateChanged:{
        key: 'SceneItemEnableStateChanged',
        title: 'SceneItemEnableStateChanged',
        des: t('EventDes.SceneItemEnableStateChanged'),
        tags: ['Scene Items'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ResParamsDes.SceneItemEnableStateChanged.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ResParamsDes.SceneItemEnableStateChanged.sceneUuid'),
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('ResParamsDes.SceneItemEnableStateChanged.sceneItemId'),
            },
            {
                name: 'sceneItemEnabled',
                type: "Boolean",
                des: t('ResParamsDes.SceneItemEnableStateChanged.sceneItemEnabled'),
            },
        ]
    },
    SceneItemLockStateChanged:{
        key: 'SceneItemLockStateChanged',
        title: 'SceneItemLockStateChanged',
        des: t('EventDes.SceneItemLockStateChanged'),
        tags: ['Scene Items'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ResParamsDes.SceneItemLockStateChanged.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ResParamsDes.SceneItemLockStateChanged.sceneUuid'),
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('ResParamsDes.SceneItemLockStateChanged.sceneItemId'),
            },
            {
                name: 'sceneItemLocked',
                type: "Boolean",
                des: t('ResParamsDes.SceneItemLockStateChanged.sceneItemLocked'),
            },
        ]
    },
    SceneItemSelected:{
        key: 'SceneItemSelected',
        title: 'SceneItemSelected',
        des: t('EventDes.SceneItemSelected'),
        tags: ['Scene Items'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ResParamsDes.SceneItemSelected.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ResParamsDes.SceneItemSelected.sceneUuid'),
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('ResParamsDes.SceneItemSelected.sceneItemId'),
            },
        ]
    },
    SceneItemTransformChanged:{
        key: 'SceneItemTransformChanged',
        title: 'SceneItemTransformChanged',
        des: t('EventDes.SceneItemTransformChanged'),
        tags: ['Scene Items'],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ResParamsDes.SceneItemTransformChanged.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ResParamsDes.SceneItemTransformChanged.sceneUuid'),
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('ResParamsDes.SceneItemTransformChanged.sceneItemId'),
            },
            {
                name: 'sceneItemTransform',
                type: "Object",
                des: t('ResParamsDes.SceneItemTransformChanged.sceneItemTransform'),
            },
        ]
    },
    // Outputs Events
    StreamStateChanged:{
        key: 'StreamStateChanged',
        title: 'StreamStateChanged',
        des: t('EventDes.StreamStateChanged'),
        tags: ['Outputs'],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('ResParamsDes.StreamStateChanged.outputActive'),
            },
            {
                name: 'outputState',
                type: "String",
                des: t('ResParamsDes.StreamStateChanged.outputState'),
            },
        ]
    },
    RecordStateChanged:{
        key: 'RecordStateChanged',
        title: 'RecordStateChanged',
        des: t('EventDes.RecordStateChanged'),
        tags: ['Outputs'],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('ResParamsDes.RecordStateChanged.outputActive'),
            },
            {
                name: 'outputState',
                type: "String",
                des: t('ResParamsDes.RecordStateChanged.outputState'),
            },
            {
                name: 'outputPath',
                type: "String",
                des: t('ResParamsDes.RecordStateChanged.outputPath'),
            },
        ]
    },
    ReplayBufferStateChanged:{
        key: 'ReplayBufferStateChanged',
        title: 'ReplayBufferStateChanged',
        des: t('EventDes.ReplayBufferStateChanged'),
        tags: ['Outputs'],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('ResParamsDes.ReplayBufferStateChanged.outputActive'),
            },
            {
                name: 'outputState',
                type: "String",
                des: t('ResParamsDes.ReplayBufferStateChanged.outputState'),
            },
        ]
    },
    VirtualcamStateChanged:{
        key: 'VirtualcamStateChanged',
        title: 'VirtualcamStateChanged',
        des: t('EventDes.VirtualcamStateChanged'),
        tags: ['Outputs'],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('ResParamsDes.VirtualcamStateChanged.outputActive'),
            },
            {
                name: 'outputState',
                type: "String",
                des: t('ResParamsDes.VirtualcamStateChanged.outputState'),
            },
        ]
    },
    ReplayBufferSaved:{
        key: 'ReplayBufferSaved',
        title: 'ReplayBufferSaved',
        des: t('EventDes.ReplayBufferSaved'),
        tags: ['Outputs'],
        responseParams: [
            {
                name: 'savedReplayPath',
                type: "String",
                des: t('ResParamsDes.VirtualcamStateChanged.savedReplayPath'),
            },
        ]
    },
    // Media Inputs Events
    MediaInputPlaybackStarted:{
        key: 'MediaInputPlaybackStarted',
        title: 'MediaInputPlaybackStarted',
        des: t('EventDes.MediaInputPlaybackStarted'),
        tags: ['Media Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ResParamsDes.MediaInputPlaybackStarted.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ResParamsDes.MediaInputPlaybackStarted.inputUuid'),
            },
        ]
    },
    MediaInputPlaybackEnded:{
        key: 'MediaInputPlaybackEnded',
        title: 'MediaInputPlaybackEnded',
        des: t('EventDes.MediaInputPlaybackEnded'),
        tags: ['Media Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ResParamsDes.MediaInputPlaybackEnded.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ResParamsDes.MediaInputPlaybackEnded.inputUuid'),
            },
        ]
    },
    MediaInputActionTriggered:{
        key: 'MediaInputActionTriggered',
        title: 'MediaInputActionTriggered',
        des: t('EventDes.MediaInputActionTriggered'),
        tags: ['Media Inputs'],
        responseParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ResParamsDes.MediaInputActionTriggered.inputName'),
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ResParamsDes.MediaInputActionTriggered.inputUuid'),
            },
            {
                name: 'mediaAction',
                type: "String",
                des: t('ResParamsDes.MediaInputActionTriggered.mediaAction'),
            },
        ]
    },
    // Ui Events
    StudioModeStateChanged:{
        key: 'StudioModeStateChanged',
        title: 'StudioModeStateChanged',
        des: t('EventDes.StudioModeStateChanged'),
        tags: ['Ui'],
        responseParams: [
            {
                name: 'studioModeEnabled',
                type: "Boolean",
                des: t('ResParamsDes.StudioModeStateChanged.studioModeEnabled'),
            },
        ]
    },
    ScreenshotSaved:{
        key: 'ScreenshotSaved',
        title: 'ScreenshotSaved',
        des: t('EventDes.ScreenshotSaved'),
        tags: ['Ui'],
        responseParams: [
            {
                name: 'savedScreenshotPath',
                type: "String",
                des: t('ResParamsDes.ScreenshotSaved.savedScreenshotPath'),
            },
        ]
    },
}