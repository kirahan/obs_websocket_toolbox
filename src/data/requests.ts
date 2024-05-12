
import { TreeProps, } from "ant-design-vue";
import {DataNode} from 'ant-design-vue/es/vc-tree/interface'
import { t } from "../locales";
import { ref,Ref } from "vue";

interface RequestNode extends DataNode {
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


const generalRequests:RequestNode = {
    title: 'General Requests',
    key: 'generalRequests',
    children: [
        {
            ...defaultData,
            title:'GetVersion',
            key:'GetVersion',
        },
        {
            ...defaultData,
            title:'GetStats',
            key:'GetStats',
            complexity_rating:'2/5',
        },
        {
            ...defaultData,
            title:'BroadcastCustomEvent',
            key:'BroadcastCustomEvent',
        },
        {
            ...defaultData,
            title:'CallVendorRequest',
            key:'CallVendorRequest',
            complexity_rating:'3/5',
        },
        {
            ...defaultData,
            title:'GetHotkeyList',
            key:'GetHotkeyList',
            complexity_rating:'4/5',
        },
        {
            ...defaultData,
            title:'TriggerHotkeyByName',
            key:'TriggerHotkeyByName',
            complexity_rating:'4/5',
        },
        {
            ...defaultData,
            title:'TriggerHotkeyByKeySequence',
            key:'TriggerHotkeyByKeySequence',
            complexity_rating:'4/5',
        },
        {
            ...defaultData,
            title:'Sleep',
            key:'Sleep',
            complexity_rating:'2/5',
        }
    ]
}

const sourcesRequests:RequestNode = {
    title: 'Sources Requests',
    key: 'sourcesRequests',
    children: [
        {
            ...defaultData,
            title:'GetSourceActive',
            key:'GetSourceActive',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'GetSourceScreenshot',
            key:'GetSourceScreenshot',
            complexity_rating: '4/5',
        },
        {
            ...defaultData,
            title:'SaveSourceScreenshot',
            key:'SaveSourceScreenshot',
            complexity_rating: '3/5',
        }
    ]
}

const scenesRequests:RequestNode = {
    title: 'Scenes Requests',
    key: 'scenesRequests',
    children: [
        {
            ...defaultData,
            title:'GetSceneList',
            key:'GetSceneList',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'GetGroupList',
            key:'GetGroupList',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'GetCurrentProgramScene',
            key:'GetCurrentProgramScene',
        },
        {
            ...defaultData,
            title:'SetCurrentProgramScene',
            key:'SetCurrentProgramScene',
        },
        {
            ...defaultData,
            title:'GetCurrentPreviewScene',
            key:'GetCurrentPreviewScene',
        },
        {
            ...defaultData,
            title:'SetCurrentPreviewScene',
            key:'SetCurrentPreviewScene',
        },
        {
            ...defaultData,
            title:'CreateScene',
            key:'CreateScene',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'RemoveScene',
            key:'RemoveScene',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SetSceneName',
            key:'SetSceneName',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'GetSceneSceneTransitionOverride',
            key:'GetSceneSceneTransitionOverride',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SetSceneSceneTransitionOverride',
            key:'SetSceneSceneTransitionOverride',
            complexity_rating: '2/5',
        }
    ]
}

const configRequests:RequestNode = {
    title: 'Config Requests',
    key: 'configRequests',
    children: [
        {
            ...defaultData,
            title:'GetPersistentData',
            key:'GetPersistentData',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SetPersistentData',
            key:'SetPersistentData',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'GetSceneCollectionList',
            key:'GetSceneCollectionList',
        },
        {
            ...defaultData,
            title:'SetCurrentSceneCollection',
            key:'SetCurrentSceneCollection',
        },
        {
            ...defaultData,
            title:'CreateSceneCollection',
            key:'CreateSceneCollection',
        },
        {
            ...defaultData,
            title:'GetProfileList',
            key:'GetProfileList',
        },
        {
            ...defaultData,
            title:'SetCurrentProfile',
            key:'SetCurrentProfile',
        },
        {
            ...defaultData,
            title:'CreateProfile',
            key:'CreateProfile',
        },
        {
            ...defaultData,
            title:'RemoveProfile',
            key:'RemoveProfile',
        },
        {
            ...defaultData,
            title:'GetProfileParameter',
            key:'GetProfileParameter',
            complexity_rating: '4/5',
        },
        {
            ...defaultData,
            title:'SetProfileParameter',
            key:'SetProfileParameter',
            complexity_rating: '4/5',
        },
        {
            ...defaultData,
            title:'GetVideoSettings',
            key:'GetVideoSettings',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SetVideoSettings',
            key:'SetVideoSettings',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'GetStreamServiceSettings',
            key:'GetStreamServiceSettings',
            complexity_rating: '4/5',
        },
        {
            ...defaultData,
            title:'GetStreamServiceSettings',
            key:'GetStreamServiceSettings',
            complexity_rating: '4/5',
        },
        {
            ...defaultData,
            title:'SetStreamServiceSettings',
            key:'SetStreamServiceSettings',
            complexity_rating: '4/5',
        },
        {
            ...defaultData,
            title:'GetRecordDirectory',
            key:'GetRecordDirectory',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SetRecordDirectory',
            key:'SetRecordDirectory',
            complexity_rating: '2/5',
        }
    ]
}

const inputsRequests:RequestNode = {
    title: 'Inputs Requests',
    key: 'inputsRequests',
    children: [
        {
            ...defaultData,
            title:'GetInputList',
            key:'GetInputList',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'GetInputKindList',
            key:'GetInputKindList',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'GetSpecialInputs',
            key:'GetSpecialInputs',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'CreateInput',
            key:'CreateInput',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'RemoveInput',
            key:'RemoveInput',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SetInputName',
            key:'SetInputName',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'GetInputDefaultSettings',
            key:'GetInputDefaultSettings',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'GetInputSettings',
            key:'GetInputSettings',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'SetInputSettings',
            key:'SetInputSettings',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'GetInputMute',
            key:'GetInputMute',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SetInputMute',
            key:'SetInputMute',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'ToggleInputMute',
            key:'ToggleInputMute',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'GetInputVolume',
            key:'GetInputVolume',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'SetInputVolume',
            key:'SetInputVolume',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'GetInputAudioBalance',
            key:'GetInputAudioBalance',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SetInputAudioBalance',
            key:'SetInputAudioBalance',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'GetInputAudioSyncOffset',
            key:'GetInputAudioSyncOffset',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'SetInputAudioSyncOffset',
            key:'SetInputAudioSyncOffset',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'GetInputAudioMonitorType',
            key:'GetInputAudioMonitorType',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SetInputAudioMonitorType',
            key:'SetInputAudioMonitorType',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'GetInputAudioTracks',
            key:'GetInputAudioTracks',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SetInputAudioTracks',
            key:'SetInputAudioTracks',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'GetInputPropertiesListPropertyItems',
            key:'GetInputPropertiesListPropertyItems',
            complexity_rating: '4/5',
        },
        {
            ...defaultData,
            title:'PressInputPropertiesButton',
            key:'PressInputPropertiesButton',
            complexity_rating: '4/5',
        }
        
    ]
}

const transitionsRequests:RequestNode = {
    title: 'Transitions Requests',
    key: 'transitionsRequests',
    children: [
        {
            ...defaultData,
            title:'GetTransitionKindList',
            key:'GetTransitionKindList',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'GetSceneTransitionList',
            key:'GetSceneTransitionList',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'GetCurrentSceneTransition',
            key:'GetCurrentSceneTransition',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SetCurrentSceneTransition',
            key:'SetCurrentSceneTransition',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SetCurrentSceneTransitionDuration',
            key:'SetCurrentSceneTransitionDuration',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SetCurrentSceneTransitionSettings',
            key:'SetCurrentSceneTransitionSettings',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'GetCurrentSceneTransitionCursor',
            key:'GetCurrentSceneTransitionCursor',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'TriggerStudioModeTransition',
            key:'TriggerStudioModeTransition',
        },
        {
            ...defaultData,
            title:'SetTBarPosition',
            key:'SetTBarPosition',
            complexity_rating: '3/5',
        }
    ]
}

const filtersRequests:RequestNode = {
    title: 'Filters Requests',
    key: 'filtersRequests',
    children: [
        {
            ...defaultData,
            title:'GetSourceFilterKindList',
            key:'GetSourceFilterKindList',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'GetSourceFilterList',
            key:'GetSourceFilterList',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'GetSourceFilterDefaultSettings',
            key:'GetSourceFilterDefaultSettings',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'CreateSourceFilter',
            key:'CreateSourceFilter',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'RemoveSourceFilter',
            key:'RemoveSourceFilter',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SetSourceFilterName',
            key:'SetSourceFilterName',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'GetSourceFilter',
            key:'GetSourceFilter',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SetSourceFilterIndex',
            key:'SetSourceFilterIndex',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SetSourceFilterSettings',
            key:'SetSourceFilterSettings',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'SetSourceFilterEnabled',
            key:'SetSourceFilterEnabled',
            complexity_rating: '3/5',
        }
    ]
}

const sceneItemsRequests:RequestNode = {
    title: 'Scene Items Requests',
    key: 'sceneItemsRequests',
    children: [
        {
            ...defaultData,
            title:'GetSceneItemList',
            key:'GetSceneItemList',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'GetGroupSceneItemList',
            key:'GetGroupSceneItemList',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'GetSceneItemId',
            key:'GetSceneItemId',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'CreateSourceFilter',
            key:'CreateSourceFilter',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'GetSceneItemSource',
            key:'GetSceneItemSource',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'CreateSceneItem',
            key:'CreateSceneItem',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'RemoveSceneItem',
            key:'RemoveSceneItem',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'DuplicateSceneItem',
            key:'DuplicateSceneItem',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'GetSceneItemTransform',
            key:'GetSceneItemTransform',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'SetSceneItemTransform',
            key:'SetSceneItemTransform',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'GetSceneItemEnabled',
            key:'GetSceneItemEnabled',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'SetSceneItemEnabled',
            key:'SetSceneItemEnabled',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'GetSceneItemLocked',
            key:'GetSceneItemLocked',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'SetSceneItemLocked',
            key:'SetSceneItemLocked',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'GetSceneItemIndex',
            key:'GetSceneItemIndex',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'SetSceneItemIndex',
            key:'SetSceneItemIndex',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'GetSceneItemBlendMode',
            key:'GetSceneItemBlendMode',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SetSceneItemBlendMode',
            key:'SetSceneItemBlendMode',
            complexity_rating: '3/5',
        }
    ]
}

const outputsRequests:RequestNode = {
    title: 'Outputs Requests',
    key: 'outputsRequests',
    children: [
        {
            ...defaultData,
            title:'GetVirtualCamStatus',
            key:'GetVirtualCamStatus',
        },
        {
            ...defaultData,
            title:'ToggleVirtualCam',
            key:'ToggleVirtualCam',
        },
        {
            ...defaultData,
            title:'StartVirtualCam',
            key:'StartVirtualCam',
        },
        {
            ...defaultData,
            title:'StopVirtualCam',
            key:'StopVirtualCam',
        },
        {
            ...defaultData,
            title:'GetReplayBufferStatus',
            key:'GetReplayBufferStatus',
        },
        {
            ...defaultData,
            title:'ToggleReplayBuffer',
            key:'ToggleReplayBuffer',
        },
        {
            ...defaultData,
            title:'StartReplayBuffer',
            key:'StartReplayBuffer',
        },
        {
            ...defaultData,
            title:'StopReplayBuffer',
            key:'StopReplayBuffer',
        },
        {
            ...defaultData,
            title:'SaveReplayBuffer',
            key:'SaveReplayBuffer',
        },
        {
            ...defaultData,
            title:'GetLastReplayBufferReplay',
            key:'GetLastReplayBufferReplay',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'GetOutputList',
            key:'GetOutputList',
            complexity_rating: '4/5',
        },
        {
            ...defaultData,
            title:'GetOutputStatus',
            key:'GetOutputStatus',
            complexity_rating: '4/5',
        },
        {
            ...defaultData,
            title:'ToggleOutput',
            key:'ToggleOutput',
            complexity_rating: '4/5',
        },
        {
            ...defaultData,
            title:'StartOutput',
            key:'StartOutput',
            complexity_rating: '4/5',
        },
        {
            ...defaultData,
            title:'StopOutput',
            key:'StopOutput',
            complexity_rating: '4/5',
        },
        {
            ...defaultData,
            title:'GetOutputSettings',
            key:'GetOutputSettings',
            complexity_rating: '4/5',
        },
        {
            ...defaultData,
            title:'SetOutputSettings',
            key:'SetOutputSettings',
            complexity_rating: '4/5',
        }
    ]
}

const streamRequests:RequestNode = {
    title: 'Stream Requests',
    key: 'streamRequests',
    children: [
        {
            ...defaultData,
            title:'GetStreamStatus',
            key:'GetStreamStatus',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'ToggleStream',
            key:'ToggleStream',
        },
        {
            ...defaultData,
            title:'StartStream',
            key:'StartStream',
        },
        {
            ...defaultData,
            title:'StopStream',
            key:'StopStream',
        },
        {
            ...defaultData,
            title:'SendStreamCaption',
            key:'SendStreamCaption',
            complexity_rating: '2/5',
        }
    ]
}

const recordRequests:RequestNode = {
    title: 'Record Requests',
    key: 'recordRequests',
    children: [
        {
            ...defaultData,
            title:'GetRecordStatus',
            key:'GetRecordStatus',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'ToggleRecord',
            key:'ToggleRecord',
        },
        {
            ...defaultData,
            title:'StartRecord',
            key:'StartRecord',
        },
        {
            ...defaultData,
            title:'StopRecord',
            key:'StopRecord',
        },
        {
            ...defaultData,
            title:'ToggleRecordPause',
            key:'ToggleRecordPause',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'PauseRecord',
            key:'PauseRecord',
        },
        {
            ...defaultData,
            title:'ResumeRecord',
            key:'ResumeRecord',
        }
    ]
}

const mediaInputsRequests:RequestNode = {
    title: 'Media Inputs Requests',
    key: 'mediaInputsRequests',
    children: [
        {
            ...defaultData,
            title:'GetMediaInputStatus',
            key:'GetMediaInputStatus',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'SetMediaInputCursor',
            key:'SetMediaInputCursor',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'OffsetMediaInputCursor',
            key:'OffsetMediaInputCursor',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'TriggerMediaInputAction',
            key:'TriggerMediaInputAction',
            complexity_rating: '2/5',
        }
    ]
}

const uiRequests:RequestNode = {
    title: 'Ui Requests',
    key: 'uiRequests',
    children: [
        {
            ...defaultData,
            title:'GetStudioModeEnabled',
            key:'GetStudioModeEnabled',
        },
        {
            ...defaultData,
            title:'SetStudioModeEnabled',
            key:'SetStudioModeEnabled',
        },
        {
            ...defaultData,
            title:'OpenInputPropertiesDialog',
            key:'OpenInputPropertiesDialog',
        },
        {
            ...defaultData,
            title:'OpenInputFiltersDialog',
            key:'OpenInputFiltersDialog',
        },
        {
            ...defaultData,
            title:'OpenInputInteractDialog',
            key:'OpenInputInteractDialog',
        },
        {
            ...defaultData,
            title:'GetMonitorList',
            key:'GetMonitorList',
            complexity_rating: '2/5',
        },
        {
            ...defaultData,
            title:'OpenVideoMixProjector',
            key:'OpenVideoMixProjector',
            complexity_rating: '3/5',
        },
        {
            ...defaultData,
            title:'OpenSourceProjector',
            key:'OpenSourceProjector',
            complexity_rating: '3/5',
        }
    ]
}





export interface I_Request_Params {
    name: string,
    type: string,
    des: string,
    default: string,
    require: boolean,
    valueRestrictions: string,
    defaultBehavior: string
}

export interface I_Response_Params {
    name: string,
    type: string,
    des: string,
    example?: string
}

export interface I_Request_Detail {
    key: string,
    title: string,
    des: string,
    tags: string[],
    requestParams: I_Request_Params[],
    responseParams: I_Response_Params[]
}

export const obsRequestTreeData = [
    generalRequests,
    sourcesRequests,
    scenesRequests,
    configRequests,
    inputsRequests,
    transitionsRequests,
    filtersRequests,
    sceneItemsRequests,
    outputsRequests,
    streamRequests,
    recordRequests,
    mediaInputsRequests,
    uiRequests,
]

export const obsRequestDetailData:{[index:string]:I_Request_Detail} = {
    GetVersion: {
        key: 'GetVersion',
        title: 'GetVersion',
        des: t('RequestDes.GetVersion'),
        tags: ['General'],
        requestParams: [],
        responseParams: [
            {
                name: 'obsVersion',
                type: "String",
                des: t('ParamsDes.obsVersion'),
            },
            {
                name: 'obsWebSocketVersion',
                type: "String",
                des: t('ParamsDes.obsWebSocketVersion'),
            },
            {
                name: 'rpcVersion',
                type: "Number",
                des: t('ParamsDes.rpcVersion'),
            },
            {
                name: 'availableRequests',
                type: "Array<String>",
                des: t('ParamsDes.availableRequests'),
            },
            {
                name: 'supportedImageFormats',
                type: 'Array<String>',
                des: t('ParamsDes.supportedImageFormats'),
            },
            {
                name: 'platform',
                type: 'String',
                des: t('ParamsDes.platform'),
            },
            {
                name: 'platformDescription',
                type: 'String',
                des: t('ParamsDes.platformDescription'),
            }
        ]
    },
    SetSceneItemEnabled: {
        key: 'SetSceneItemEnabled',
        title: 'SetSceneItemEnabled',
        des: 'Enable or disable a specified source item within a scene',
        tags: ['Scene'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ParamsDes.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unkown'
            },
            {
                name: 'sceneUuid',
                type: "String",
                default: '',
                des: t('ParamsDes.itemName'),
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unkown'
            },
            {
                name: 'sceneItemId',
                type: "Number",
                default: '',
                des: t('ParamsDes.sceneItemId'),
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'N/A'
            },
            {
                name: 'sceneItemEnabled',
                type: "Boolean",
                default: 'false',
                des: t('ParamsDes.sceneItemEnabled'),
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            }
        ] as I_Request_Params[],
        responseParams: []
    
    },
    SetCurrentPreviewScene: {
        key: 'SetCurrentPreviewScene',
        title: 'SetCurrentPreviewScene',
        des: 'Set the active scene in Studio Mode',
        tags: ['Studio'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                default: '',
                des: t('ParamsDes.sceneName'),
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'Unkown'
            },
            {
                name: 'sceneUuid',
                type: "String",
                default: '',
                des: t('ParamsDes.itemName'),
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unkown'
            },
        ],
        responseParams: []
    
    },
}

export const QueryColumns = [
    {
        title: t('QueryHeaders.Params'),
        dataIndex: 'name', 
        resizable: true,
        width: 100,
    },
    {
        title: t('QueryHeaders.Value'),
        dataIndex: 'model', 
        resizable: true,
        width: 200,
    },
    {
        title: t('QueryHeaders.Type'),
        dataIndex: 'type', 
        width: 100,
    },
    {
        title: t('QueryHeaders.Des'),
        dataIndex: 'des', 
        width: 300,
    },
    {
        title: t('QueryHeaders.ValueRestrictions'),
        dataIndex: 'valueRestrictions',
        width: 100,
    },
    {
        title: t('QueryHeaders.DefaultBehavior'),
        dataIndex: 'defaultBehavior', 
        width: 100,
    }
];

export const ResponseColumns = [
    {
        title: t('QueryHeaders.Params'),
        dataIndex: 'name', 
        width: '15%',
    },
    {
        title: t('QueryHeaders.Type'),
        dataIndex: 'type', 
        width: '15%',
    },
    {
        title: t('QueryHeaders.Des'),
        dataIndex: 'des', 
        width: '35%',
    }
];






