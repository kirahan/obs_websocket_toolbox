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


export const obsEventDetailData:{[index:string]:I_Event_Detail} = {}