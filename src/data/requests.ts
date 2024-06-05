
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
    defaultBehavior: string,
    parentNode?: string,
    isCustomerObject?: boolean //会变成手动输入的模式
    // objectConfigs?: I_Request_Params[]
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
    // general requests
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
                des: t('ResParamsDes.obsVersion'),
            },
            {
                name: 'obsWebSocketVersion',
                type: "String",
                des: t('ResParamsDes.obsWebSocketVersion'),
            },
            {
                name: 'rpcVersion',
                type: "Number",
                des: t('ResParamsDes.rpcVersion'),
            },
            {
                name: 'availableRequests',
                type: "Array<String>",
                des: t('ResParamsDes.availableRequests'),
            },
            {
                name: 'supportedImageFormats',
                type: 'Array<String>',
                des: t('ResParamsDes.supportedImageFormats'),
            },
            {
                name: 'platform',
                type: 'String',
                des: t('ResParamsDes.platform'),
            },
            {
                name: 'platformDescription',
                type: 'String',
                des: t('ResParamsDes.platformDescription'),
            }
        ]
    },
    GetStats: {
        key: 'GetStats',
        title: 'GetStats',
        des: t('RequestDes.GetStats'),
        tags: ['General'],
        requestParams: [],
        responseParams: [
            {
                name: 'cpuUsage',
                type: "Number",
                des: t('ResParamsDes.cpuUsage'),
            },
            {
                name: 'memoryUsage',
                type: "Number",
                des: t('ResParamsDes.memoryUsage'),
            },
            {
                name: 'availableDiskSpace',
                type: "Number",
                des: t('ResParamsDes.availableDiskSpace'),
            },
            {
                name: 'activeFps',
                type: "Number",
                des: t('ResParamsDes.activeFps'),
            },
            {
                name: 'averageFrameRenderTime',
                type: 'Number',
                des: t('ResParamsDes.averageFrameRenderTime'),
            },
            {
                name: 'renderSkippedFrames',
                type: 'Number',
                des: t('ResParamsDes.renderSkippedFrames'),
            },
            {
                name: 'renderTotalFrames',
                type: 'Number',
                des: t('ResParamsDes.renderTotalFrames'),
            },
            {
                name: 'outputSkippedFrames',
                type: 'Number',
                des: t('ResParamsDes.outputSkippedFrames'),
            },
            {
                name: 'outputTotalFrames',
                type: 'Number',
                des: t('ResParamsDes.outputTotalFrames'),
            },
            {
                name: 'webSocketSessionIncomingMessages',
                type: 'Number',
                des: t('ResParamsDes.webSocketSessionIncomingMessages'),
            },
            {
                name: 'webSocketSessionOutgoingMessages',
                type: 'Number',
                des: t('ResParamsDes.webSocketSessionOutgoingMessages'),
            }
        ]
    },
    BroadcastCustomEvent: {
        key: 'BroadcastCustomEvent',
        title: 'BroadcastCustomEvent',
        des: t('RequestDes.BroadcastCustomEvent'),
        tags: ['General'],
        requestParams: [
            {
                name: 'eventData',
                type: "Object",
                des: t('ReqParamsDes.eventData'),
                default: '{}',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
                isCustomerObject: true,
            },
        ],
        responseParams: [
        ]
    },
    CallVendorRequest: {
        key: 'CallVendorRequest',
        title: 'CallVendorRequest',
        des: t('RequestDes.CallVendorRequest'),
        tags: ['General'],
        requestParams: [
            {
                name: 'vendorName',
                type: "String",
                des: t('ReqParamsDes.vendorName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'requestType',
                type: "String",
                des: t('ReqParamsDes.requestType'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'requestData',
                type: "Object",
                des: t('ReqParamsDes.requestData'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: '{}',
                isCustomerObject: true,
            },
        ],
        responseParams: [
            {
                name: 'vendorName',
                type: "String",
                des: t('ResParamsDes.vendorName'),
            },
            {
                name: 'requestType',
                type: "String",
                des: t('ResParamsDes.requestType'),
            },
            {
                name: 'responseData',
                type: "Object",
                des: t('ResParamsDes.responseData'),
            },
        ]
    },
    GetHotkeyList: {
        key: 'GetHotkeyList',
        title: 'GetHotkeyList',
        des: t('RequestDes.GetHotkeyList'),
        tags: ['General'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'hotkeys',
                type: "Array<String>",
                des: t('ResParamsDes.hotkeys'),
            },
        ]
    },
    TriggerHotkeyByName: {
        key: 'TriggerHotkeyByName',
        title: 'TriggerHotkeyByName',
        des: t('RequestDes.TriggerHotkeyByName'),
        tags: ['General'],
        requestParams: [
            {
                name: 'hotkeyName',
                type: "String",
                des: t('ReqParamsDes.hotkeyName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'contextName',
                type: "String",
                des: t('ReqParamsDes.contextName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
        ],
        responseParams: [
        ]
    },
    TriggerHotkeyByKeySequence: {
        key: 'TriggerHotkeyByKeySequence',
        title: 'TriggerHotkeyByKeySequence',
        des: t('RequestDes.TriggerHotkeyByKeySequence'),
        tags: ['General'],
        requestParams: [
            {
                name: 'keyId',
                type: "String",
                des: t('ReqParamsDes.keyId'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Not pressed'
            },
            {
                name: 'keyModifiers',
                type: "Object",
                des: t('ReqParamsDes.keyModifiers.title'),
                default: '{}',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Ignored',
            },
            {
                name: 'keyModifiers.shift',
                type: "Boolean",
                des: t('ReqParamsDes.keyModifiers.shift'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Not pressed',
                parentNode: 'keyModifiers',
            },
            {
                name: 'keyModifiers.control',
                type: "Boolean",
                des: t('ReqParamsDes.keyModifiers.control'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Not pressed',
                parentNode: 'keyModifiers',
            },
            {
                name: 'keyModifiers.alt',
                type: "Boolean",
                des: t('ReqParamsDes.keyModifiers.alt'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Not pressed',
                parentNode: 'keyModifiers',
            },
            {
                name: 'keyModifiers.command',
                type: "Boolean",
                des: t('ReqParamsDes.keyModifiers.command'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Not pressed',
                parentNode: 'keyModifiers',
            },
        ],
        responseParams: [
        ]
    },
    Sleep: {
        key: 'Sleep',
        title: 'Sleep',
        des: t('RequestDes.Sleep'),
        tags: ['General'],
        requestParams: [
            {
                name: 'sleepMillis',
                type: "Number",
                des: t('ReqParamsDes.sleepMillis'),
                default: '',
                require: false,
                valueRestrictions: '>= 0, <= 50000',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'sleepFrames',
                type: "Number",
                des: t('ReqParamsDes.sleepFrames'),
                default: '',
                require: false,
                valueRestrictions: '>= 0, <= 10000',
                defaultBehavior: 'Unknown'
            },
        ],
        responseParams: [
        ]
    },
    // config requests
    GetPersistentData: {
        key: 'GetPersistentData',
        title: 'GetPersistentData',
        des: t('RequestDes.GetPersistentData'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'realm',
                type: "String",
                des: t('ReqParamsDes.realm'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'slotName',
                type: "String",
                des: t('ReqParamsDes.slotName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
        ],
        responseParams: [
            {
                name: 'slotValue',
                type: "Any",
                des: t('ResParamsDes.slotValue'),
            },
        ]
    },
    SetPersistentData: {
        key: 'SetPersistentData',
        title: 'SetPersistentData',
        des: t('RequestDes.SetPersistentData'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'realm',
                type: "String",
                des: t('ReqParamsDes.realm'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'slotName',
                type: "String",
                des: t('ReqParamsDes.slotName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'slotValue',
                type: "Any",
                des: t('ReqParamsDes.slotValue'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
        ],
        responseParams: [
        ]
    },
    GetSceneCollectionList: {
        key: 'GetSceneCollectionList',
        title: 'GetSceneCollectionList',
        des: t('RequestDes.GetSceneCollectionList'),
        tags: ['Config'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'currentSceneCollectionName',
                type: "String",
                des: t('ResParamsDes.currentSceneCollectionName'),
            },
            {
                name: 'sceneCollections',
                type: "String",
                des: t('ResParamsDes.sceneCollections'),
            },
        ]
    },
    SetCurrentSceneCollection: {
        key: 'SetCurrentSceneCollection',
        title: 'SetCurrentSceneCollection',
        des: t('RequestDes.SetCurrentSceneCollection'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'sceneCollectionName',
                type: "String",
                des: t('ReqParamsDes.sceneCollectionName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
        ],
        responseParams: [
        ]
    },
    CreateSceneCollection: {
        key: 'CreateSceneCollection',
        title: 'CreateSceneCollection',
        des: t('RequestDes.CreateSceneCollection'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'sceneCollectionName',
                type: "String",
                des: t('ReqParamsDes.sceneCollectionName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
        ],
        responseParams: [
        ]
    },
    GetProfileList: {
        key: 'GetProfileList',
        title: 'GetProfileList',
        des: t('RequestDes.GetProfileList'),
        tags: ['Config'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'sceneCollectionName',
                type: "String",
                des: t('ResParamsDes.sceneCollectionName'),
            },
            {
                name: 'profiles',
                type: "Array<String>",
                des: t('ResParamsDes.profiles'),
            },
        ]
    },
    SetCurrentProfile: {
        key: 'SetCurrentProfile',
        title: 'SetCurrentProfile',
        des: t('RequestDes.SetCurrentProfile'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'profileName',
                type: "String",
                des: t('ReqParamsDes.profileName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
        ],
        responseParams: [
        ]
    },
    CreateProfile: {
        key: 'CreateProfile',
        title: 'CreateProfile',
        des: t('RequestDes.CreateProfile'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'profileName',
                type: "String",
                des: t('ReqParamsDes.profileName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
        ],
        responseParams: [
        ]
    },
    RemoveProfile: {
        key: 'RemoveProfile',
        title: 'RemoveProfile',
        des: t('RequestDes.RemoveProfile'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'profileName',
                type: "String",
                des: t('ReqParamsDes.profileName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
        ],
        responseParams: [
        ]
    },
    GetProfileParameter: {
        key: 'GetProfileParameter',
        title: 'GetProfileParameter',
        des: t('RequestDes.GetProfileParameter'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'parameterCategory',
                type: "String",
                des: t('ReqParamsDes.parameterCategory'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'parameterName',
                type: "String",
                des: t('ReqParamsDes.parameterName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
        ],
        responseParams: [
            {
                name: 'parameterValue',
                type: "String",
                des: t('ResParamsDes.parameterValue'),
            },
            {
                name: 'defaultParameterValue',
                type: "String",
                des: t('ResParamsDes.defaultParameterValue'),
            },
        ]
    },
    SetProfileParameter: {
        key: 'SetProfileParameter',
        title: 'SetProfileParameter',
        des: t('RequestDes.SetProfileParameter'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'parameterCategory',
                type: "String",
                des: t('ReqParamsDes.parameterCategory'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'parameterName',
                type: "String",
                des: t('ReqParamsDes.parameterName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'parameterValue',
                type: "String",
                des: t('ReqParamsDes.parameterValue'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
        ],
        responseParams: [
        ]
    },
    GetVideoSettings: {
        key: 'GetVideoSettings',
        title: 'GetVideoSettings',
        des: t('RequestDes.GetVideoSettings'),
        tags: ['Config'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'fpsNumerator',
                type: "Number",
                des: t('ResParamsDes.fpsNumerator'),
            },
            {
                name: 'fpsDenominator',
                type: "Number",
                des: t('ResParamsDes.fpsDenominator'),
            },
            {
                name: 'baseWidth',
                type: "Number",
                des: t('ResParamsDes.baseWidth'),
            },
            {
                name: 'baseHeight',
                type: "Number",
                des: t('ResParamsDes.baseHeight'),
            },
            {
                name: 'outputWidth',
                type: "Number",
                des: t('ResParamsDes.outputWidth'),
            },
            {
                name: 'outputHeight',
                type: "Number",
                des: t('ResParamsDes.outputHeight'),
            },
        ]
    },
    SetVideoSettings: {
        key: 'SetVideoSettings',
        title: 'SetVideoSettings',
        des: t('RequestDes.SetVideoSettings'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'fpsNumerator',
                type: "Number",
                des: t('ReqParamsDes.fpsNumerator'),
                default: '',
                require: false,
                valueRestrictions: '>= 1',
                defaultBehavior: 'Not changed'
            },
            {
                name: 'fpsDenominator',
                type: "Number",
                des: t('ReqParamsDes.fpsDenominator'),
                default: '',
                require: false,
                valueRestrictions: '>= 1',
                defaultBehavior: 'Not changed'
            },
            {
                name: 'baseWidth',
                type: "Number",
                des: t('ReqParamsDes.baseWidth'),
                default: '',
                require: false,
                valueRestrictions: '>= 1, <= 4096',
                defaultBehavior: 'Not changed'
            },
            {
                name: 'baseHeight',
                type: "Number",
                des: t('ReqParamsDes.baseHeight'),
                default: '',
                require: false,
                valueRestrictions: '>= 1, <= 4096',
                defaultBehavior: 'Not changed'
            },
            {
                name: 'outputWidth',
                type: "Number",
                des: t('ReqParamsDes.outputWidth'),
                default: '',
                require: false,
                valueRestrictions: '>= 1, <= 4096',
                defaultBehavior: 'Not changed'
            },
            {
                name: 'outputHeight',
                type: "Number",
                des: t('ReqParamsDes.outputHeight'),
                default: '',
                require: false,
                valueRestrictions: '>= 1, <= 4096',
                defaultBehavior: 'Not changed'
            },
        ],
        responseParams: [
        ]
    },
    GetStreamServiceSettings: {
        key: 'GetStreamServiceSettings',
        title: 'GetStreamServiceSettings',
        des: t('RequestDes.GetStreamServiceSettings'),
        tags: ['Config'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'streamServiceType',
                type: "String",
                des: t('ResParamsDes.streamServiceType'),
            },
            {
                name: 'streamServiceSettings',
                type: "Object",
                des: t('ResParamsDes.streamServiceSettings'),
            },
        ]
    },
    SetStreamServiceSettings: {
        key: 'SetStreamServiceSettings',
        title: 'SetStreamServiceSettings',
        des: t('RequestDes.SetStreamServiceSettings'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'streamServiceType',
                type: "String",
                des: t('ReqParamsDes.streamServiceType'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'streamServiceSettings',
                type: "Object",
                des: t('ReqParamsDes.streamServiceSettings'),
                default: '{}',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
                isCustomerObject: true,
            },
        ],
        responseParams: [
        ]
    },
    GetRecordDirectory: {
        key: 'GetRecordDirectory',
        title: 'GetRecordDirectory',
        des: t('RequestDes.GetRecordDirectory'),
        tags: ['Config'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'recordDirectory',
                type: "String",
                des: t('ResParamsDes.recordDirectory'),
            },
        ]
    },
    SetRecordDirectory: {
        key: 'SetRecordDirectory',
        title: 'SetRecordDirectory',
        des: t('RequestDes.SetRecordDirectory'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'recordDirectory',
                type: "String",
                des: t('ReqParamsDes.recordDirectory'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
        ],
        responseParams: [
        ]
    },
    // sources requests
    GetSourceActive: {
        key: 'GetSourceActive',
        title: 'GetSourceActive',
        des: t('RequestDes.GetSourceActive'),
        tags: ['Sources'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('ReqParamsDes.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('ReqParamsDes.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
        ],
        responseParams: [
            {
                name: 'videoActive',
                type: "String",
                des: t('ResParamsDes.videoActive'),
            },
            {
                name: 'videoShowing',
                type: "String",
                des: t('ResParamsDes.videoShowing'),
            },
        ]
    },
    GetSourceScreenshot: {
        key: 'GetSourceScreenshot',
        title: 'GetSourceScreenshot',
        des: t('RequestDes.GetSourceScreenshot'),
        tags: ['Sources'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('ReqParamsDes.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('ReqParamsDes.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'imageFormat',
                type: "String",
                des: t('ReqParamsDes.imageFormat'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'imageWidth',
                type: "Number",
                des: t('ReqParamsDes.imageWidth'),
                default: '',
                require: false,
                valueRestrictions: '>= 8, <= 4096',
                defaultBehavior: 'Source value is used'
            },
            {
                name: 'imageHeight',
                type: "Number",
                des: t('ReqParamsDes.imageHeight'),
                default: '',
                require: false,
                valueRestrictions: '>= 8, <= 4096',
                defaultBehavior: 'Source value is used'
            },
            {
                name: 'imageCompressionQuality',
                type: "Number",
                des: t('ReqParamsDes.imageCompressionQuality'),
                default: '-1',
                require: false,
                valueRestrictions: '>= -1, <= 100',
                defaultBehavior: '-1'
            },
        ],
        responseParams: [
            {
                name: 'imageData',
                type: "String",
                des: t('ResParamsDes.imageData'),
            },
        ]
    },
    SaveSourceScreenshot: {
        key: 'SaveSourceScreenshot',
        title: 'SaveSourceScreenshot',
        des: t('RequestDes.SaveSourceScreenshot'),
        tags: ['Sources'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('ReqParamsDes.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('ReqParamsDes.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'imageFormat',
                type: "String",
                des: t('ReqParamsDes.imageFormat'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'imageFilePath',
                type: "String",
                des: t('ReqParamsDes.imageFilePath'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'imageWidth',
                type: "Number",
                des: t('ReqParamsDes.imageWidth'),
                default: '',
                require: false,
                valueRestrictions: '>= 8, <= 4096',
                defaultBehavior: 'Source value is used'
            },
            {
                name: 'imageHeight',
                type: "Number",
                des: t('ReqParamsDes.imageHeight'),
                default: '',
                require: false,
                valueRestrictions: '>= 8, <= 4096',
                defaultBehavior: 'Source value is used'
            },
            {
                name: 'imageCompressionQuality',
                type: "Number",
                des: t('ReqParamsDes.imageCompressionQuality'),
                default: '-1',
                require: false,
                valueRestrictions: '>= -1, <= 100',
                defaultBehavior: '-1'
            },
        ],
        responseParams: [
            {
                name: 'imageData',
                type: "String",
                des: t('ResParamsDes.imageData'),
            },
        ]
    },
    // scenes requests
    GetSceneList: {
        key: 'GetSceneList',
        title: 'GetSceneList',
        des: t('RequestDes.GetSceneList'),
        tags: ['Scenes'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'currentProgramSceneName',
                type: "String",
                des: t('ResParamsDes.currentProgramSceneName'),
            },
            {
                name: 'currentProgramSceneUuid',
                type: "String",
                des: t('ResParamsDes.currentProgramSceneUuid'),
            },
            {
                name: 'currentPreviewSceneName',
                type: "String",
                des: t('ResParamsDes.currentPreviewSceneName'),
            },
            {
                name: 'currentPreviewSceneUuid',
                type: "String",
                des: t('ResParamsDes.currentPreviewSceneUuid'),
            },
            {
                name: 'scenes',
                type: "Array<Object>",
                des: t('ResParamsDes.scenes'),
            },
        ]
    },
    GetGroupList: {
        key: 'GetGroupList',
        title: 'GetGroupList',
        des: t('RequestDes.GetGroupList'),
        tags: ['Scenes'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'groups',
                type: "Array<String>",
                des: t('ResParamsDes.groups'),
            },
        ]
    },
    GetCurrentProgramScene: {
        key: 'GetCurrentProgramScene',
        title: 'GetCurrentProgramScene',
        des: t('RequestDes.GetCurrentProgramScene'),
        tags: ['Scenes'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ResParamsDes.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ResParamsDes.sceneUuid'),
            },
            {
                name: 'currentProgramSceneName',
                type: "String",
                des: t('ResParamsDes.currentProgramSceneName'),
            },
            {
                name: 'currentProgramSceneUuid',
                type: "String",
                des: t('ResParamsDes.currentProgramSceneUuid'),
            },
        ]
    },
    SetCurrentProgramScene: {
        key: 'SetCurrentProgramScene',
        title: 'SetCurrentProgramScene',
        des: t('RequestDes.SetCurrentProgramScene'),
        tags: ['Scenes'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unkown'
            },
            {
                name: 'sceneUuid',
                type: "String",
                default: '',
                des: t('ReqParamsDes.itemName'),
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unkown'
            },
        ],
        responseParams: []
    },
    GetCurrentPreviewScene: {
        key: 'GetCurrentPreviewScene',
        title: 'GetCurrentPreviewScene',
        des: t('RequestDes.GetCurrentPreviewScene'),
        tags: ['Scenes'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ResParamsDes.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ResParamsDes.sceneUuid'),
            },
            {
                name: 'currentPreviewSceneName',
                type: "String",
                des: t('ResParamsDes.currentPreviewSceneName'),
            },
            {
                name: 'currentPreviewSceneUuid',
                type: "String",
                des: t('ResParamsDes.currentPreviewSceneUuid'),
            },
        ]
    },
    SetCurrentPreviewScene: {
        key: 'SetCurrentPreviewScene',
        title: 'SetCurrentPreviewScene',
        des: t('RequestDes.SetCurrentPreviewScene'),
        tags: ['Scenes'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unkown'
            },
            {
                name: 'sceneUuid',
                type: "String",
                default: '',
                des: t('ReqParamsDes.itemName'),
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unkown'
            },
        ],
        responseParams: []
    },
    CreateScene: {
        key: 'CreateScene',
        title: 'CreateScene',
        des: t('RequestDes.CreateScene'),
        tags: ['Scenes'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.sceneName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
        ],
        responseParams: [
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ResParamsDes.sceneUuid'),
            },
        ]
    },
    RemoveScene: {
        key: 'RemoveScene',
        title: 'RemoveScene',
        des: t('RequestDes.RemoveScene'),
        tags: ['Scenes'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
        ],
        responseParams: [
        ]
    },
    SetSceneName: {
        key: 'SetSceneName',
        title: 'SetSceneName',
        des: t('RequestDes.SetSceneName'),
        tags: ['Scenes'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'newSceneName',
                type: "String",
                des: t('ReqParamsDes.newSceneName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
        ],
        responseParams: [
        ]
    },
    GetSceneSceneTransitionOverride: {
        key: 'GetSceneSceneTransitionOverride',
        title: 'GetSceneSceneTransitionOverride',
        des: t('RequestDes.GetSceneSceneTransitionOverride'),
        tags: ['Scenes'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
        ],
        responseParams: [
            {
                name: 'transitionName',
                type: "String",
                des: t('ResParamsDes.transitionName'),
            },
            {
                name: 'transitionDuration',
                type: "Number",
                des: t('ResParamsDes.transitionDuration'),
            },
        ]
    },
    SetSceneSceneTransitionOverride: {
        key: 'SetSceneSceneTransitionOverride',
        title: 'SetSceneSceneTransitionOverride',
        des: t('RequestDes.SetSceneSceneTransitionOverride'),
        tags: ['Scenes'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'transitionName',
                type: "String",
                des: t('ReqParamsDes.transitionName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unchanged'
            },
            {
                name: 'transitionDuration',
                type: "Number",
                des: t('ReqParamsDes.transitionDuration'),
                default: '',
                require: false,
                valueRestrictions: '>= 50, <= 20000',
                defaultBehavior: 'Unchanged'
            },

        ],
        responseParams: [
            
        ]
    },
    // inputs requests
    GetInputList: {
        key: 'GetInputList',
        title: 'GetInputList',
        des: t('RequestDes.GetInputList'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputKind',
                type: "String",
                des: t('ReqParamsDes.inputKind'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'All kinds included'
            },
        ],
        responseParams: [
            {
                name: 'inputs',
                type: "Array<Object>",
                des: t('ResParamsDes.inputs'),
            },
        ]
    },
    GetInputKindList: {
        key: 'GetInputKindList',
        title: 'GetInputKindList',
        des: t('RequestDes.GetInputKindList'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'unversioned',
                type: "Boolean",
                des: t('ReqParamsDes.unversioned'),
                default: 'false',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'false'
            },
        ],
        responseParams: [
            {
                name: 'inputKinds',
                type: "Array<String>",
                des: t('ResParamsDes.inputKinds'),
            },
        ]
    },
    GetSpecialInputs: {
        key: 'GetSpecialInputs',
        title: 'GetSpecialInputs',
        des: t('RequestDes.GetSpecialInputs'),
        tags: ['Inputs'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'desktop1',
                type: "String",
                des: t('ResParamsDes.desktop1'),
            },
            {
                name: 'desktop2',
                type: "String",
                des: t('ResParamsDes.desktop2'),
            },
            {
                name: 'mic1',
                type: "String",
                des: t('ResParamsDes.mic1'),
            },
            {
                name: 'mic2',
                type: "String",
                des: t('ResParamsDes.mic2'),
            },
            {
                name: 'mic3',
                type: "String",
                des: t('ResParamsDes.mic3'),
            },
            {
                name: 'mic4',
                type: "String",
                des: t('ResParamsDes.mic4'),
            },
        ]
    },
    CreateInput: {
        key: 'CreateInput',
        title: 'CreateInput',
        des: t('RequestDes.CreateInput'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.inputName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'inputKind',
                type: "String",
                des: t('ReqParamsDes.inputKind'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'inputSettings',
                type: "Object",
                des: t('ReqParamsDes.inputSettings'),
                default: '{}',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Default settings used',
                isCustomerObject: true,
            },
            {
                name: 'sceneItemEnabled',
                type: "Boolean",
                des: t('ReqParamsDes.sceneItemEnabled'),
                default: 'true',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'True'
            },
        ],
        responseParams: [
            {
                name: 'inputUuid',
                type: "String",
                des: t('ResParamsDes.CreateInput.inputUuid'),
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('ResParamsDes.CreateInput.sceneItemId'),
            },
        ]
    },
    RemoveInput: {
        key: 'RemoveInput',
        title: 'RemoveInput',
        des: t('RequestDes.RemoveInput'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.RemoveInput.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.RemoveInput.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
        ],
        responseParams: [
        ]
    },
    SetInputName: {
        key: 'SetInputName',
        title: 'SetInputName',
        des: t('RequestDes.SetInputName'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.SetInputName.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.SetInputName.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'newInputName',
                type: "String",
                des: t('ReqParamsDes.SetInputName.newInputName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
        ],
        responseParams: [
        ]
    },
    GetInputDefaultSettings: {
        key: 'GetInputDefaultSettings',
        title: 'GetInputDefaultSettings',
        des: t('RequestDes.GetInputDefaultSettings'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputKind',
                type: "String",
                des: t('ReqParamsDes.GetInputDefaultSettings.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
        ],
        responseParams: [
            {
                name: 'defaultInputSettings',
                type: "Object",
                des: t('ReqParamsDes.GetInputDefaultSettings.defaultInputSettings'),
            }
        ]
    },
    GetInputSettings: {
        key: 'GetInputSettings',
        title: 'GetInputSettings',
        des: t('RequestDes.GetInputSettings'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.GetInputSettings.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.GetInputSettings.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
        ],
        responseParams: [
            {
                name: 'inputSettings',
                type: "Object",
                des: t('ReqParamsDes.GetInputSettings.inputSettings'),
            },
            {
                name: 'inputKind',
                type: "String",
                des: t('ReqParamsDes.GetInputSettings.inputKind'),
            },
        ]
    },
    SetInputSettings: {
        key: 'SetInputSettings',
        title: 'SetInputSettings',
        des: t('RequestDes.SetInputSettings'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.SetInputSettings.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.SetInputSettings.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputSettings',
                type: "Object",
                des: t('ReqParamsDes.SetInputSettings.inputSettings'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
                isCustomerObject: true,
            },
            {
                name: 'overlay',
                type: "Boolean",
                des: t('ReqParamsDes.SetInputSettings.overlay'),
                default: 'true',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'true'
            },
        ],
        responseParams: [
        ]
    },
    GetInputMute: {
        key: 'GetInputMute',
        title: 'GetInputMute',
        des: t('RequestDes.GetInputMute'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.GetInputMute.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.GetInputMute.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
        ],
        responseParams: [
            {
                name: 'inputMuted',
                type: "Boolean",
                des: t('ReqParamsDes.GetInputMute.inputMuted'),
            },
        ]
    },
    SetInputMute: {
        key: 'SetInputMute',
        title: 'SetInputMute',
        des: t('RequestDes.SetInputMute'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.SetInputMute.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.SetInputMute.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputMuted',
                type: "Boolean",
                des: t('ReqParamsDes.SetInputMute.inputMuted'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
        ],
        responseParams: [
        ]
    },
    ToggleInputMute: {
        key: 'ToggleInputMute',
        title: 'ToggleInputMute',
        des: t('RequestDes.ToggleInputMute'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.ToggleInputMute.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.ToggleInputMute.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
        ],
        responseParams: [
            {
                name: 'inputMuted',
                type: "Boolean",
                des: t('ResParamsDes.ToggleInputMute.inputMuted'),
            }
        ]
    },
    GetInputVolume: {
        key: 'GetInputVolume',
        title: 'GetInputVolume',
        des: t('RequestDes.GetInputVolume'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.GetInputVolume.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.GetInputVolume.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
        ],
        responseParams: [
            {
                name: 'inputVolumeMul',
                type: "Number",
                des: t('ResParamsDes.GetInputVolume.inputVolumeMul'),
            },
            {
                name: 'inputVolumeDb',
                type: "Number",
                des: t('ResParamsDes.GetInputVolume.inputVolumeDb'),
            }
        ]
    },
    SetInputVolume: {
        key: 'SetInputVolume',
        title: 'SetInputVolume',
        des: t('RequestDes.SetInputVolume'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.SetInputVolume.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.SetInputVolume.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputVolumeMul',
                type: "Number",
                des: t('ReqParamsDes.SetInputVolume.inputVolumeMul'),
                default: '',
                require: false,
                valueRestrictions: '>= 0, <= 20',
                defaultBehavior: 'inputVolumeDb should be specified'
            },
            {
                name: 'inputVolumeDb',
                type: "Number",
                des: t('ReqParamsDes.SetInputVolume.inputVolumeDb'),
                default: '',
                require: false,
                valueRestrictions: '>= -100, <= 26',
                defaultBehavior: 'inputVolumeMul should be specified'
            },
        ],
        responseParams: [
        ]
    },
    GetInputAudioBalance: {
        key: 'GetInputAudioBalance',
        title: 'GetInputAudioBalance',
        des: t('RequestDes.GetInputAudioBalance'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.GetInputAudioBalance.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.GetInputAudioBalance.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
        ],
        responseParams: [
            {
                name: 'inputAudioBalance',
                type: "Number",
                des: t('ResParamsDes.GetInputAudioBalance.inputAudioBalance'),
            },
        ]
    },
    SetInputAudioBalance: {
        key: 'SetInputAudioBalance',
        title: 'SetInputAudioBalance',
        des: t('RequestDes.SetInputAudioBalance'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.SetInputAudioBalance.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.SetInputAudioBalance.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputAudioBalance',
                type: "Number",
                des: t('ReqParamsDes.SetInputAudioBalance.inputAudioBalance'),
                default: '',
                require: true,
                valueRestrictions: '>= 0.0, <= 1.0',
                defaultBehavior: 'N/A'
            },
        ],
        responseParams: [
        ]
    },
    GetInputAudioSyncOffset: {
        key: 'GetInputAudioSyncOffset',
        title: 'GetInputAudioSyncOffset',
        des: t('RequestDes.GetInputAudioSyncOffset'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.GetInputAudioSyncOffset.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.GetInputAudioSyncOffset.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
        ],
        responseParams: [
            {
                name: 'inputAudioSyncOffset',
                type: "Number",
                des: t('ResParamsDes.GetInputAudioSyncOffset.inputAudioSyncOffset'),
            },
        ]
    },
    SetInputAudioSyncOffset: {
        key: 'SetInputAudioSyncOffset',
        title: 'SetInputAudioSyncOffset',
        des: t('RequestDes.SetInputAudioSyncOffset'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.SetInputAudioSyncOffset.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.SetInputAudioSyncOffset.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputAudioSyncOffset',
                type: "Number",
                des: t('ReqParamsDes.SetInputAudioSyncOffset.inputAudioSyncOffset'),
                default: '',
                require: true,
                valueRestrictions: '>= -950, <= 20000',
                defaultBehavior: 'N/A'
            },
        ],
        responseParams: [
        ]
    },
    GetInputAudioMonitorType: {
        key: 'GetInputAudioMonitorType',
        title: 'GetInputAudioMonitorType',
        des: t('RequestDes.GetInputAudioMonitorType'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.GetInputAudioMonitorType.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.GetInputAudioMonitorType.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
        ],
        responseParams: [
            {
                name: 'monitorType',
                type: "String",
                des: t('ResParamsDes.GetInputAudioMonitorType.inputAudioSyncOffset'),
            },
        ]
    },
    SetInputAudioMonitorType: {
        key: 'SetInputAudioMonitorType',
        title: 'SetInputAudioMonitorType',
        des: t('RequestDes.SetInputAudioMonitorType'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.SetInputAudioMonitorType.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.SetInputAudioMonitorType.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'monitorType',
                type: "String",
                des: t('ReqParamsDes.SetInputAudioMonitorType.monitorType'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
        ],
        responseParams: [
        ]
    },
    GetInputAudioTracks: {
        key: 'GetInputAudioTracks',
        title: 'GetInputAudioTracks',
        des: t('RequestDes.GetInputAudioTracks'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.GetInputAudioTracks.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.GetInputAudioTracks.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
        ],
        responseParams: [
            {
                name: 'inputAudioTracks',
                type: "Object",
                des: t('ResParamsDes.GetInputAudioTracks.inputAudioTracks'),
            },
        ]
    },
    SetInputAudioTracks: {
        key: 'SetInputAudioTracks',
        title: 'SetInputAudioTracks',
        des: t('RequestDes.SetInputAudioTracks'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.SetInputAudioTracks.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.SetInputAudioTracks.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputAudioTracks',
                type: "Object",
                des: t('ReqParamsDes.SetInputAudioTracks.inputAudioTracks'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
                isCustomerObject: true,
            },
        ],
        responseParams: [
        ]
    },
    GetInputPropertiesListPropertyItems: {
        key: 'GetInputPropertiesListPropertyItems',
        title: 'GetInputPropertiesListPropertyItems',
        des: t('RequestDes.GetInputPropertiesListPropertyItems'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.GetInputPropertiesListPropertyItems.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.GetInputPropertiesListPropertyItems.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'propertyName',
                type: "String",
                des: t('ReqParamsDes.GetInputPropertiesListPropertyItems.propertyName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
        ],
        responseParams: [
            {
                name: 'propertyItems',
                type: "Array<Object>",
                des: t('ResParamsDes.GetInputAudioTracks.propertyItems'),
            },
        ]
    },
    PressInputPropertiesButton: {
        key: 'PressInputPropertiesButton',
        title: 'PressInputPropertiesButton',
        des: t('RequestDes.PressInputPropertiesButton'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.PressInputPropertiesButton.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.PressInputPropertiesButton.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'propertyName',
                type: "String",
                des: t('ReqParamsDes.PressInputPropertiesButton.propertyName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
        ]
    },
    // Transitions Requests
    GetTransitionKindList: {
        key: 'GetTransitionKindList',
        title: 'GetTransitionKindList',
        des: t('RequestDes.GetTransitionKindList'),
        tags: ['Transitions'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'transitionKinds',
                type: "Array<String>",
                des: t('ResParamsDes.GetTransitionKindList.transitionKinds'),
            },
        ]
    },
    GetSceneTransitionList: {
        key: 'GetSceneTransitionList',
        title: 'GetSceneTransitionList',
        des: t('RequestDes.GetSceneTransitionList'),
        tags: ['Transitions'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'currentSceneTransitionName',
                type: "String",
                des: t('ResParamsDes.GetSceneTransitionList.currentSceneTransitionName'),
            },
            {
                name: 'currentSceneTransitionUuid',
                type: "String",
                des: t('ResParamsDes.GetSceneTransitionList.currentSceneTransitionUuid'),
            },
            {
                name: 'currentSceneTransitionKind',
                type: "String",
                des: t('ResParamsDes.GetSceneTransitionList.currentSceneTransitionKind'),
            },
            {
                name: 'transitions',
                type: "Array<Object>",
                des: t('ResParamsDes.GetSceneTransitionList.transitions'),
            },
        ]
    },
    GetCurrentSceneTransition: {
        key: 'GetCurrentSceneTransition',
        title: 'GetCurrentSceneTransition',
        des: t('RequestDes.GetCurrentSceneTransition'),
        tags: ['Transitions'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'transitionName',
                type: "String",
                des: t('ResParamsDes.GetCurrentSceneTransition.transitionName'),
            },
            {
                name: 'transitionUuid',
                type: "String",
                des: t('ResParamsDes.GetCurrentSceneTransition.transitionUuid'),
            },
            {
                name: 'transitionKind',
                type: "String",
                des: t('ResParamsDes.GetCurrentSceneTransition.transitionKind'),
            },
            {
                name: 'transitionFixed',
                type: "Boolean",
                des: t('ResParamsDes.GetCurrentSceneTransition.transitionFixed'),
            },
            {
                name: 'transitionDuration',
                type: "Number",
                des: t('ResParamsDes.GetCurrentSceneTransition.transitionDuration'),
            },
            {
                name: 'transitionConfigurable',
                type: "Boolean",
                des: t('ResParamsDes.GetCurrentSceneTransition.transitionConfigurable'),
            },
            {
                name: 'transitionSettings',
                type: "Object",
                des: t('ResParamsDes.GetCurrentSceneTransition.transitionSettings'),
            },
        ]
    },
    SetCurrentSceneTransition: {
        key: 'SetCurrentSceneTransition',
        title: 'SetCurrentSceneTransition',
        des: t('RequestDes.SetCurrentSceneTransition'),
        tags: ['Transitions'],
        requestParams: [
            {
                name: 'transitionName',
                type: "String",
                des: t('ReqParamsDes.SetCurrentSceneTransition.transitionName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
        ]
    },
    SetCurrentSceneTransitionDuration: {
        key: 'SetCurrentSceneTransitionDuration',
        title: 'SetCurrentSceneTransitionDuration',
        des: t('RequestDes.SetCurrentSceneTransitionDuration'),
        tags: ['Transitions'],
        requestParams: [
            {
                name: 'transitionDuration',
                type: "Number",
                des: t('ReqParamsDes.SetCurrentSceneTransitionDuration.transitionDuration'),
                default: '',
                require: true,
                valueRestrictions: '>= 50, <= 20000',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
        ]
    },
    SetCurrentSceneTransitionSettings: {
        key: 'SetCurrentSceneTransitionSettings',
        title: 'SetCurrentSceneTransitionSettings',
        des: t('RequestDes.SetCurrentSceneTransitionSettings'),
        tags: ['Transitions'],
        requestParams: [
            {
                name: 'transitionSettings',
                type: "Object",
                des: t('ReqParamsDes.SetCurrentSceneTransitionSettings.transitionSettings'),
                default: '{}',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
                isCustomerObject: true,
            },
            {
                name: 'overlay',
                type: "Boolean",
                des: t('ReqParamsDes.SetCurrentSceneTransitionSettings.overlay'),
                default: 'true',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'true',
            },
        ],
        responseParams: [
        ]
    },
    GetCurrentSceneTransitionCursor: {
        key: 'GetCurrentSceneTransitionCursor',
        title: 'GetCurrentSceneTransitionCursor',
        des: t('RequestDes.GetCurrentSceneTransitionCursor'),
        tags: ['Transitions'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'transitionCursor',
                type: "Number",
                des: t('ResParamsDes.GetCurrentSceneTransitionCursor.transitionCursor'),
            },
        ]
    },
    TriggerStudioModeTransition: {
        key: 'TriggerStudioModeTransition',
        title: 'TriggerStudioModeTransition',
        des: t('RequestDes.TriggerStudioModeTransition'),
        tags: ['Transitions'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    SetTBarPosition: {
        key: 'SetTBarPosition',
        title: 'SetTBarPosition',
        des: t('RequestDes.SetTBarPosition'),
        tags: ['Transitions'],
        requestParams: [
            {
                name: 'position',
                type: "Number",
                des: t('ReqParamsDes.SetTBarPosition.position'),
                default: '',
                require: true,
                valueRestrictions: '>= 0.0, <= 1.0',
                defaultBehavior: 'N/A',
            },
            {
                name: 'release',
                type: "Boolean",
                des: t('ReqParamsDes.SetTBarPosition.release'),
                default: 'true',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'true',
            },
        ],
        responseParams: [
        ]
    },
    // Filters Requests
    GetSourceFilterKindList: {
        key: 'GetSourceFilterKindList',
        title: 'GetSourceFilterKindList',
        des: t('RequestDes.GetSourceFilterKindList'),
        tags: ['Filters'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'sourceFilterKinds',
                type: "Array<String>",
                des: t('ResParamsDes.GetSourceFilterKindList.sourceFilterKinds'),
            },
        ]
    },
    GetSourceFilterList: {
        key: 'GetSourceFilterList',
        title: 'GetSourceFilterList',
        des: t('RequestDes.GetSourceFilterList'),
        tags: ['Filters'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('ReqParamsDes.GetSourceFilterList.sourceName'),
                default: 'true',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('ReqParamsDes.GetSourceFilterList.sourceUuid'),
                default: 'true',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
        ],
        responseParams: [
            {
                name: 'filters',
                type: "Array<Object>",
                des: t('ResParamsDes.GetSourceFilterList.filters'),
            },
        ]
    },
    GetSourceFilterDefaultSettings: {
        key: 'GetSourceFilterDefaultSettings',
        title: 'GetSourceFilterDefaultSettings',
        des: t('RequestDes.GetSourceFilterDefaultSettings'),
        tags: ['Filters'],
        requestParams: [
            {
                name: 'filterKind',
                type: "String",
                des: t('ReqParamsDes.GetSourceFilterDefaultSettings.filterKind'),
                default: 'true',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
            {
                name: 'defaultFilterSettings',
                type: "Object",
                des: t('ResParamsDes.GetSourceFilterDefaultSettings.defaultFilterSettings'),
            },
        ]
    },
    CreateSourceFilter: {
        key: 'CreateSourceFilter',
        title: 'CreateSourceFilter',
        des: t('RequestDes.CreateSourceFilter'),
        tags: ['Filters'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('ReqParamsDes.CreateSourceFilter.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('ReqParamsDes.CreateSourceFilter.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'filterName',
                type: "String",
                des: t('ReqParamsDes.CreateSourceFilter.filterName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'filterKind',
                type: "String",
                des: t('ReqParamsDes.CreateSourceFilter.filterKind'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'filterSettings',
                type: "Object",
                des: t('ReqParamsDes.CreateSourceFilter.filterSettings'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Default settings used',
                isCustomerObject: true,
            },
        ],
        responseParams: [
        ]
    },
    RemoveSourceFilter: {
        key: 'RemoveSourceFilter',
        title: 'RemoveSourceFilter',
        des: t('RequestDes.RemoveSourceFilter'),
        tags: ['Filters'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('ReqParamsDes.RemoveSourceFilter.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('ReqParamsDes.RemoveSourceFilter.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'filterName',
                type: "String",
                des: t('ReqParamsDes.RemoveSourceFilter.filterName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
        ]
    },
    SetSourceFilterName: {
        key: 'SetSourceFilterName',
        title: 'SetSourceFilterName',
        des: t('RequestDes.SetSourceFilterName'),
        tags: ['Filters'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('ReqParamsDes.SetSourceFilterName.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('ReqParamsDes.SetSourceFilterName.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'filterName',
                type: "String",
                des: t('ReqParamsDes.SetSourceFilterName.filterName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'newFilterName',
                type: "String",
                des: t('ReqParamsDes.SetSourceFilterName.newFilterName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
        ]
    },
    GetSourceFilter: {
        key: 'GetSourceFilter',
        title: 'GetSourceFilter',
        des: t('RequestDes.GetSourceFilter'),
        tags: ['Filters'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('ReqParamsDes.GetSourceFilter.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('ReqParamsDes.GetSourceFilter.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'filterName',
                type: "String",
                des: t('ReqParamsDes.GetSourceFilter.filterName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
            {
                name: 'filterEnabled',
                type: "Boolean",
                des: t('ResParamsDes.GetSourceFilter.filterEnabled'),
            },
            {
                name: 'filterIndex',
                type: "Number",
                des: t('ResParamsDes.GetSourceFilter.filterIndex'),
            },
            {
                name: 'filterKind',
                type: "String",
                des: t('ResParamsDes.GetSourceFilter.filterKind'),
            },
            {
                name: 'filters',
                type: "Array<Object>",
                des: t('ResParamsDes.GetSourceFilter.filters'),
            },
        ]
    },
    SetSourceFilterIndex: {
        key: 'SetSourceFilterIndex',
        title: 'SetSourceFilterIndex',
        des: t('RequestDes.SetSourceFilterIndex'),
        tags: ['Filters'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('ReqParamsDes.SetSourceFilterIndex.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('ReqParamsDes.SetSourceFilterIndex.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'filterName',
                type: "String",
                des: t('ReqParamsDes.SetSourceFilterIndex.filterName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'filterIndex',
                type: "Number",
                des: t('ReqParamsDes.SetSourceFilterIndex.filterIndex'),
                default: '',
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
        ]
    },
    SetSourceFilterSettings: {
        key: 'SetSourceFilterSettings',
        title: 'SetSourceFilterSettings',
        des: t('RequestDes.SetSourceFilterSettings'),
        tags: ['Filters'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('ReqParamsDes.SetSourceFilterSettings.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('ReqParamsDes.SetSourceFilterSettings.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'filterName',
                type: "String",
                des: t('ReqParamsDes.SetSourceFilterSettings.filterName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'filterIndex',
                type: "Object",
                des: t('ReqParamsDes.SetSourceFilterSettings.filterIndex'),
                default: '{}',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'overlay',
                type: "Boolean",
                des: t('ReqParamsDes.SetSourceFilterSettings.overlay'),
                default: 'true',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
        ]
    },
    SetSourceFilterEnabled: {
        key: 'SetSourceFilterEnabled',
        title: 'SetSourceFilterEnabled',
        des: t('RequestDes.SetSourceFilterEnabled'),
        tags: ['Filters'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('ReqParamsDes.SetSourceFilterEnabled.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('ReqParamsDes.SetSourceFilterEnabled.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'filterName',
                type: "String",
                des: t('ReqParamsDes.SetSourceFilterEnabled.filterName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'filterEnabled',
                type: "Boolean",
                des: t('ReqParamsDes.SetSourceFilterEnabled.filterEnabled'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
        ]
    },
    // Scene Items Requests
    GetSceneItemList: {
        key: 'GetSceneItemList',
        title: 'GetSceneItemList',
        des: t('RequestDes.GetSceneItemList'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemList.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemList.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
        ],
        responseParams: [
            {
                name: 'sceneItems',
                type: "Array<Object>",
                des: t('ResParamsDes.GetSceneItemList.sceneItems'),
            },
        ]
    },
    GetGroupSceneItemList: {
        key: 'GetGroupSceneItemList',
        title: 'GetGroupSceneItemList',
        des: t('RequestDes.GetGroupSceneItemList'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.GetGroupSceneItemList.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.GetGroupSceneItemList.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
        ],
        responseParams: [
            {
                name: 'sceneItems',
                type: "Array<Object>",
                des: t('ResParamsDes.GetGroupSceneItemList.sceneItems'),
            },
        ]
    },
    GetSceneItemId: {
        key: 'GetSceneItemId',
        title: 'GetSceneItemId',
        des: t('RequestDes.GetSceneItemId'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemId.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemId.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceName',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemId.sourceName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'searchOffset',
                type: "Number",
                des: t('ReqParamsDes.GetSceneItemId.searchOffset'),
                default: '0',
                require: false,
                valueRestrictions: '>= -1',
                defaultBehavior: '0',
            },
        ],
        responseParams: [
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('ResParamsDes.GetSceneItemId.sceneItemId'),
            },
        ]
    },
    GetSceneItemSource: {
        key: 'GetSceneItemSource',
        title: 'GetSceneItemSource',
        des: t('RequestDes.GetSceneItemSource'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemSource.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemSource.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('ReqParamsDes.GetSceneItemSource.sceneItemId'),
                default: '0',
                require: true,
                valueRestrictions: '>=0',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('ResParamsDes.GetSceneItemSource.sourceName'),
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('ResParamsDes.GetSceneItemSource.sourceUuid'),
            },
        ]
    },
    CreateSceneItem: {
        key: 'CreateSceneItem',
        title: 'CreateSceneItem',
        des: t('RequestDes.CreateSceneItem'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.CreateSceneItem.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.CreateSceneItem.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceName',
                type: "String",
                des: t('ReqParamsDes.CreateSceneItem.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('ReqParamsDes.CreateSceneItem.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemEnabled',
                type: "Boolean	",
                des: t('ReqParamsDes.CreateSceneItem.sceneItemEnabled'),
                default: 'true',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'true',
            },
        ],
        responseParams: [
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('ResParamsDes.CreateSceneItem.sceneItemId'),
            },
        ]
    },
    RemoveSceneItem: {
        key: 'RemoveSceneItem',
        title: 'RemoveSceneItem',
        des: t('RequestDes.RemoveSceneItem'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.RemoveSceneItem.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.RemoveSceneItem.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "String",
                des: t('ReqParamsDes.RemoveSceneItem.sceneItemId'),
                default: '',
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
        ]
    },
    DuplicateSceneItem: {
        key: 'DuplicateSceneItem',
        title: 'DuplicateSceneItem',
        des: t('RequestDes.DuplicateSceneItem'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.DuplicateSceneItem.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.DuplicateSceneItem.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('ReqParamsDes.DuplicateSceneItem.sceneItemId'),
                default: '',
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'N/A',
            },
            {
                name: 'destinationSceneName',
                type: "String",
                des: t('ReqParamsDes.DuplicateSceneItem.destinationSceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'From scene is assumed',
            },
            {
                name: 'destinationSceneUuid',
                type: "String",
                des: t('ReqParamsDes.DuplicateSceneItem.destinationSceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'From scene is assumed',
            },
        ],
        responseParams: [
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('ResParamsDes.DuplicateSceneItem.sceneItemId'),
            },
        ]
    },
    GetSceneItemTransform: {
        key: 'GetSceneItemTransform',
        title: 'GetSceneItemTransform',
        des: t('RequestDes.GetSceneItemTransform'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemTransform.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemTransform.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemTransform.sceneItemId'),
                default: '',
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
            {
                name: 'sceneItemTransform',
                type: "Object",
                des: t('ResParamsDes.GetSceneItemTransform.sceneItemTransform'),
            },
        ]
    },
    SetSceneItemTransform: {
        key: 'SetSceneItemTransform',
        title: 'SetSceneItemTransform',
        des: t('RequestDes.SetSceneItemTransform'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.SetSceneItemTransform.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.SetSceneItemTransform.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "String",
                des: t('ReqParamsDes.SetSceneItemTransform.sceneItemId'),
                default: '',
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'N/A',
            },
            {
                name: 'sceneItemTransform',
                type: "Object",
                des: t('ReqParamsDes.SetSceneItemTransform.sceneItemTransform'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
                isCustomerObject: true,
            },
        ],
        responseParams: [
        ]
    },
    GetSceneItemEnabled: {
        key: 'GetSceneItemEnabled',
        title: 'GetSceneItemEnabled',
        des: t('RequestDes.GetSceneItemEnabled'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemEnabled.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemEnabled.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemEnabled.sceneItemId'),
                default: '',
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
            {
                name: 'sceneItemEnabled',
                type: "Boolean",
                des: t('ResParamsDes.GetSceneItemEnabled.sceneItemEnabled'),
            },
        ]
    },
    SetSceneItemEnabled: {
        key: 'SetSceneItemEnabled',
        title: 'SetSceneItemEnabled',
        des: t('RequestDes.SetSceneItemEnabled'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.SetSceneItemEnabled.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.SetSceneItemEnabled.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "String",
                des: t('ReqParamsDes.SetSceneItemEnabled.sceneItemId'),
                default: '',
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'N/A',
            },
            {
                name: 'sceneItemEnabled',
                type: "Boolean",
                des: t('ReqParamsDes.SetSceneItemEnabled.sceneItemEnabled'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
        ]
    },
    GetSceneItemLocked: {
        key: 'GetSceneItemLocked',
        title: 'GetSceneItemLocked',
        des: t('RequestDes.GetSceneItemLocked'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemLocked.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemLocked.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemLocked.sceneItemId'),
                default: '',
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
            {
                name: 'sceneItemLocked',
                type: "Boolean",
                des: t('ResParamsDes.GetSceneItemLocked.sceneItemLocked'),
            },
        ]
    },
    SetSceneItemLocked: {
        key: 'SetSceneItemLocked',
        title: 'SetSceneItemLocked',
        des: t('RequestDes.SetSceneItemLocked'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.SetSceneItemLocked.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.SetSceneItemLocked.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "String",
                des: t('ReqParamsDes.SetSceneItemLocked.sceneItemId'),
                default: '',
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'N/A',
            },
            {
                name: 'sceneItemLocked',
                type: "Boolean",
                des: t('ReqParamsDes.SetSceneItemLocked.sceneItemLocked'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
        ]
    },
    GetSceneItemIndex: {
        key: 'GetSceneItemIndex',
        title: 'GetSceneItemIndex',
        des: t('RequestDes.GetSceneItemIndex'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemIndex.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemIndex.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemIndex.sceneItemId'),
                default: '',
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
            {
                name: 'sceneItemIndex',
                type: "Number",
                des: t('ResParamsDes.GetSceneItemIndex.sceneItemIndex'),
            },
        ]
    },
    SetSceneItemIndex: {
        key: 'SetSceneItemIndex',
        title: 'SetSceneItemIndex',
        des: t('RequestDes.SetSceneItemIndex'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.SetSceneItemIndex.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.SetSceneItemIndex.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "String",
                des: t('ReqParamsDes.SetSceneItemIndex.sceneItemId'),
                default: '',
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'N/A',
            },
            {
                name: 'sceneItemIndex',
                type: "Number",
                des: t('ReqParamsDes.SetSceneItemIndex.sceneItemIndex'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
        ]
    },
    GetSceneItemBlendMode: {
        key: 'GetSceneItemBlendMode',
        title: 'GetSceneItemBlendMode',
        des: t('RequestDes.GetSceneItemBlendMode'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemBlendMode.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemBlendMode.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "String",
                des: t('ReqParamsDes.GetSceneItemBlendMode.sceneItemId'),
                default: '',
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
            {
                name: 'sceneItemBlendMode',
                type: "String",
                des: t('ResParamsDes.GetSceneItemBlendMode.sceneItemBlendMode'),
            },
        ]
    },
    SetSceneItemBlendMode: {
        key: 'SetSceneItemBlendMode',
        title: 'SetSceneItemBlendMode',
        des: t('RequestDes.SetSceneItemBlendMode'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('ReqParamsDes.SetSceneItemBlendMode.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('ReqParamsDes.SetSceneItemBlendMode.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "String",
                des: t('ReqParamsDes.SetSceneItemBlendMode.sceneItemId'),
                default: '',
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'N/A',
            },
            {
                name: 'sceneItemBlendMode',
                type: "String",
                des: t('ReqParamsDes.SetSceneItemBlendMode.sceneItemBlendMode'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
        ]
    },
    // Outputs Requests
    GetVirtualCamStatus: {
        key: 'GetVirtualCamStatus',
        title: 'GetVirtualCamStatus',
        des: t('RequestDes.GetVirtualCamStatus'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('ResParamsDes.GetVirtualCamStatus.outputActive'),
            },
        ]
    },
    ToggleVirtualCam: {
        key: 'ToggleVirtualCam',
        title: 'ToggleVirtualCam',
        des: t('RequestDes.ToggleVirtualCam'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('ResParamsDes.ToggleVirtualCam.outputActive'),
            },
        ]
    },
    StartVirtualCam: {
        key: 'StartVirtualCam',
        title: 'StartVirtualCam',
        des: t('RequestDes.StartVirtualCam'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    StopVirtualCam: {
        key: 'StopVirtualCam',
        title: 'StopVirtualCam',
        des: t('RequestDes.StopVirtualCam'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    GetReplayBufferStatus: {
        key: 'GetReplayBufferStatus',
        title: 'GetReplayBufferStatus',
        des: t('RequestDes.GetReplayBufferStatus'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('ResParamsDes.GetReplayBufferStatus.outputActive'),
            },
        ]
    },
    ToggleReplayBuffer: {
        key: 'ToggleReplayBuffer',
        title: 'ToggleReplayBuffer',
        des: t('RequestDes.ToggleReplayBuffer'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('ResParamsDes.ToggleReplayBuffer.outputActive'),
            },
        ]
    },
    StartReplayBuffer: {
        key: 'StartReplayBuffer',
        title: 'StartReplayBuffer',
        des: t('RequestDes.StartReplayBuffer'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    StopReplayBuffer: {
        key: 'StopReplayBuffer',
        title: 'StopReplayBuffer',
        des: t('RequestDes.StopReplayBuffer'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    SaveReplayBuffer: {
        key: 'SaveReplayBuffer',
        title: 'SaveReplayBuffer',
        des: t('RequestDes.SaveReplayBuffer'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    GetLastReplayBufferReplay: {
        key: 'GetLastReplayBufferReplay',
        title: 'GetLastReplayBufferReplay',
        des: t('RequestDes.GetLastReplayBufferReplay'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'savedReplayPath',
                type: "Boolean",
                des: t('ResParamsDes.GetLastReplayBufferReplay.savedReplayPath'),
            },
        ]
    },
    GetOutputList: {
        key: 'GetOutputList',
        title: 'GetOutputList',
        des: t('RequestDes.GetOutputList'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'outputs',
                type: "Array<Object>",
                des: t('ResParamsDes.GetOutputList.outputs'),
            },
        ]
    },
    GetOutputStatus: {
        key: 'GetOutputStatus',
        title: 'GetOutputStatus',
        des: t('RequestDes.GetOutputStatus'),
        tags: ['Outputs'],
        requestParams: [
            {
                name: 'outputName',
                type: "String",
                des: t('ReqParamsDes.GetOutputStatus.outputName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('ResParamsDes.GetOutputStatus.outputActive'),
            },
            {
                name: 'outputReconnecting',
                type: "Boolean",
                des: t('ResParamsDes.GetOutputStatus.outputReconnecting'),
            },
            {
                name: 'outputTimecode',
                type: "String",
                des: t('ResParamsDes.GetOutputStatus.outputTimecode'),
            },
            {
                name: 'outputDuration',
                type: "Number",
                des: t('ResParamsDes.GetOutputStatus.outputDuration'),
            },
            {
                name: 'outputCongestion',
                type: "Number",
                des: t('ResParamsDes.GetOutputStatus.outputCongestion'),
            },
            {
                name: 'outputBytes',
                type: "Number",
                des: t('ResParamsDes.GetOutputStatus.outputBytes'),
            },
            {
                name: 'outputSkippedFrames',
                type: "Number",
                des: t('ResParamsDes.GetOutputStatus.outputSkippedFrames'),
            },
            {
                name: 'outputTotalFrames',
                type: "Number",
                des: t('ResParamsDes.GetOutputStatus.outputTotalFrames'),
            },
        ]
    },
    ToggleOutput: {
        key: 'ToggleOutput',
        title: 'ToggleOutput',
        des: t('RequestDes.ToggleOutput'),
        tags: ['Outputs'],
        requestParams: [
            {
                name: 'outputName',
                type: "String",
                des: t('ReqParamsDes.ToggleOutput.outputName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('ResParamsDes.ToggleOutput.outputActive'),
            },
        ]
    },
    StartOutput: {
        key: 'StartOutput',
        title: 'StartOutput',
        des: t('RequestDes.StartOutput'),
        tags: ['Outputs'],
        requestParams: [
            {
                name: 'outputName',
                type: "String",
                des: t('ReqParamsDes.StartOutput.outputName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
        ]
    },
    StopOutput: {
        key: 'StopOutput',
        title: 'StopOutput',
        des: t('RequestDes.StopOutput'),
        tags: ['Outputs'],
        requestParams: [
            {
                name: 'outputName',
                type: "String",
                des: t('ReqParamsDes.StopOutput.outputName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
        ]
    },
    GetOutputSettings: {
        key: 'GetOutputSettings',
        title: 'GetOutputSettings',
        des: t('RequestDes.GetOutputSettings'),
        tags: ['Outputs'],
        requestParams: [
            {
                name: 'outputName',
                type: "String",
                des: t('ReqParamsDes.GetOutputSettings.outputName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
            {
                name: 'outputSettings',
                type: "Object",
                des: t('ResParamsDes.GetOutputSettings.outputSettings'),
            },
        ]
    },
    SetOutputSettings: {
        key: 'SetOutputSettings',
        title: 'SetOutputSettings',
        des: t('RequestDes.SetOutputSettings'),
        tags: ['Outputs'],
        requestParams: [
            {
                name: 'outputName',
                type: "String",
                des: t('ReqParamsDes.SetOutputSettings.outputName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'outputSettings',
                type: "Object",
                des: t('ReqParamsDes.SetOutputSettings.outputSettings'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
                isCustomerObject:true,
            },
        ],
        responseParams: [
        ]
    },
    // Stream Requests
    GetStreamStatus: {
        key: 'GetStreamStatus',
        title: 'GetStreamStatus',
        des: t('RequestDes.GetStreamStatus'),
        tags: ['Stream'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('ResParamsDes.GetStreamStatus.outputActive'),
            },
            {
                name: 'outputReconnecting',
                type: "Boolean",
                des: t('ResParamsDes.GetStreamStatus.outputReconnecting'),
            },
            {
                name: 'outputTimecode',
                type: "String",
                des: t('ResParamsDes.GetStreamStatus.outputTimecode'),
            },
            {
                name: 'outputDuration',
                type: "Number",
                des: t('ResParamsDes.GetStreamStatus.outputDuration'),
            },
            {
                name: 'outputCongestion',
                type: "Number",
                des: t('ResParamsDes.GetStreamStatus.outputCongestion'),
            },
            {
                name: 'outputBytes',
                type: "Number",
                des: t('ResParamsDes.GetStreamStatus.outputBytes'),
            },
            {
                name: 'outputSkippedFrames',
                type: "Number",
                des: t('ResParamsDes.GetStreamStatus.outputSkippedFrames'),
            },
            {
                name: 'outputTotalFrames',
                type: "Number",
                des: t('ResParamsDes.GetStreamStatus.outputTotalFrames'),
            },
        ]
    },
    ToggleStream: {
        key: 'ToggleStream',
        title: 'ToggleStream',
        des: t('RequestDes.ToggleStream'),
        tags: ['Stream'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('ResParamsDes.ToggleStream.outputActive'),
            },
        ]
    },
    StartStream: {
        key: 'StartStream',
        title: 'StartStream',
        des: t('RequestDes.StartStream'),
        tags: ['Stream'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    StopStream: {
        key: 'StopStream',
        title: 'StopStream',
        des: t('RequestDes.StopStream'),
        tags: ['Stream'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    SendStreamCaption: {
        key: 'SendStreamCaption',
        title: 'SendStreamCaption',
        des: t('RequestDes.SendStreamCaption'),
        tags: ['Stream'],
        requestParams: [
            {
                name: 'captionText',
                type: "String",
                des: t('ReqParamsDes.SendStreamCaption.captionText'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
        ]
    },
    // Stream Requests
    GetRecordStatus: {
        key: 'GetRecordStatus',
        title: 'GetRecordStatus',
        des: t('RequestDes.GetRecordStatus'),
        tags: ['Record'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('ResParamsDes.GetRecordStatus.outputActive'),
            },
            {
                name: 'outputPaused',
                type: "Boolean",
                des: t('ResParamsDes.GetRecordStatus.outputPaused'),
            },
            {
                name: 'outputTimecode',
                type: "String",
                des: t('ResParamsDes.GetRecordStatus.outputTimecode'),
            },
            {
                name: 'outputDuration',
                type: "Number",
                des: t('ResParamsDes.GetRecordStatus.outputDuration'),
            },
            {
                name: 'outputBytes',
                type: "Number",
                des: t('ResParamsDes.GetRecordStatus.outputBytes'),
            },
        ]
    },
    ToggleRecord: {
        key: 'ToggleRecord',
        title: 'ToggleRecord',
        des: t('RequestDes.ToggleRecord'),
        tags: ['Record'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('ResParamsDes.ToggleRecord.outputActive'),
            },
        ]
    },
    StartRecord: {
        key: 'StartRecord',
        title: 'StartRecord',
        des: t('RequestDes.StartRecord'),
        tags: ['Record'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    StopRecord: {
        key: 'StopRecord',
        title: 'StopRecord',
        des: t('RequestDes.StopRecord'),
        tags: ['Record'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'outputPath',
                type: "String",
                des: t('ResParamsDes.StopRecord.outputPath'),
            },
        ]
    },
    ToggleRecordPause: {
        key: 'ToggleRecordPause',
        title: 'ToggleRecordPause',
        des: t('RequestDes.ToggleRecordPause'),
        tags: ['Record'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    PauseRecord: {
        key: 'PauseRecord',
        title: 'PauseRecord',
        des: t('RequestDes.PauseRecord'),
        tags: ['Record'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    ResumeRecord: {
        key: 'ResumeRecord',
        title: 'ResumeRecord',
        des: t('RequestDes.ResumeRecord'),
        tags: ['Record'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    // Media Inputs Requests
    GetMediaInputStatus: {
        key: 'GetMediaInputStatus',
        title: 'GetMediaInputStatus',
        des: t('RequestDes.GetMediaInputStatus'),
        tags: ['Media Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.GetMediaInputStatus.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.GetMediaInputStatus.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
        ],
        responseParams: [
            {
                name: 'mediaState',
                type: "String",
                des: t('ResParamsDes.GetMediaInputStatus.mediaState'),
            },
            {
                name: 'mediaDuration',
                type: "Number",
                des: t('ResParamsDes.GetMediaInputStatus.mediaDuration'),
            },
            {
                name: 'mediaCursor',
                type: "Number",
                des: t('ResParamsDes.GetMediaInputStatus.mediaCursor'),
            },
        ]
    },
    SetMediaInputCursor: {
        key: 'SetMediaInputCursor',
        title: 'SetMediaInputCursor',
        des: t('RequestDes.SetMediaInputCursor'),
        tags: ['Media Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.SetMediaInputCursor.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.SetMediaInputCursor.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'mediaCursor',
                type: "Number",
                des: t('ReqParamsDes.SetMediaInputCursor.mediaCursor'),
                default: '',
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'Unknown',
            },
        ],
        responseParams: [
        ]
    },
    OffsetMediaInputCursor: {
        key: 'OffsetMediaInputCursor',
        title: 'OffsetMediaInputCursor',
        des: t('RequestDes.OffsetMediaInputCursor'),
        tags: ['Media Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.OffsetMediaInputCursor.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.OffsetMediaInputCursor.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'mediaCursorOffset',
                type: "Number",
                des: t('ReqParamsDes.OffsetMediaInputCursor.mediaCursorOffset'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
        ],
        responseParams: [
        ]
    },
    TriggerMediaInputAction: {
        key: 'TriggerMediaInputAction',
        title: 'TriggerMediaInputAction',
        des: t('RequestDes.TriggerMediaInputAction'),
        tags: ['Media Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.TriggerMediaInputAction.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.TriggerMediaInputAction.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'mediaAction',
                type: "Number",
                des: t('ReqParamsDes.TriggerMediaInputAction.mediaAction'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
        ],
        responseParams: [
        ]
    },
    // Ui Requests
    GetStudioModeEnabled: {
        key: 'GetStudioModeEnabled',
        title: 'GetStudioModeEnabled',
        des: t('RequestDes.GetStudioModeEnabled'),
        tags: ['Ui'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'studioModeEnabled',
                type: "Boolean",
                des: t('ResParamsDes.GetStudioModeEnabled.studioModeEnabled'),
            },
        ]
    },
    SetStudioModeEnabled: {
        key: 'SetStudioModeEnabled',
        title: 'SetStudioModeEnabled',
        des: t('RequestDes.SetStudioModeEnabled'),
        tags: ['Ui'],
        requestParams: [
            {
                name: 'studioModeEnabled',
                type: "Boolean",
                des: t('ReqParamsDes.SetStudioModeEnabled.inputName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
        ]
    },
    OpenInputPropertiesDialog: {
        key: 'OpenInputPropertiesDialog',
        title: 'OpenInputPropertiesDialog',
        des: t('RequestDes.OpenInputPropertiesDialog'),
        tags: ['Ui'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.OpenInputPropertiesDialog.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.OpenInputPropertiesDialog.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
        ],
        responseParams: [
        ]
    },
    OpenInputFiltersDialog: {
        key: 'OpenInputFiltersDialog',
        title: 'OpenInputFiltersDialog',
        des: t('RequestDes.OpenInputFiltersDialog'),
        tags: ['Ui'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.OpenInputFiltersDialog.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.OpenInputFiltersDialog.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
        ],
        responseParams: [
        ]
    },
    OpenInputInteractDialog: {
        key: 'OpenInputInteractDialog',
        title: 'OpenInputInteractDialog',
        des: t('RequestDes.OpenInputInteractDialog'),
        tags: ['Ui'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('ReqParamsDes.OpenInputInteractDialog.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('ReqParamsDes.OpenInputInteractDialog.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
        ],
        responseParams: [
        ]
    },
    GetMonitorList: {
        key: 'GetMonitorList',
        title: 'GetMonitorList',
        des: t('RequestDes.GetMonitorList'),
        tags: ['Ui'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'monitors',
                type: "Array<Object>",
                des: t('ResParamsDes.GetMonitorList.monitors'),
            },
        ]
    },
    OpenVideoMixProjector: {
        key: 'OpenVideoMixProjector',
        title: 'OpenVideoMixProjector',
        des: t('RequestDes.OpenVideoMixProjector'),
        tags: ['Ui'],
        requestParams: [
            {
                name: 'videoMixType',
                type: "String",
                des: t('ReqParamsDes.OpenVideoMixProjector.videoMixType'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'monitorIndex',
                type: "Number",
                des: t('ReqParamsDes.OpenVideoMixProjector.monitorIndex'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: '-1: Opens projector in windowed mode',
            },
            {
                name: 'projectorGeometry',
                type: "String",
                des: t('ReqParamsDes.OpenVideoMixProjector.projectorGeometry'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
        ]
    },
    OpenSourceProjector: {
        key: 'OpenSourceProjector',
        title: 'OpenSourceProjector',
        des: t('RequestDes.OpenSourceProjector'),
        tags: ['Ui'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('ReqParamsDes.OpenSourceProjector.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('ReqParamsDes.OpenSourceProjector.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'monitorIndex',
                type: "Number",
                des: t('ReqParamsDes.OpenSourceProjector.monitorIndex'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: '-1: Opens projector in windowed mode',
            },
            {
                name: 'projectorGeometry',
                type: "String",
                des: t('ReqParamsDes.OpenSourceProjector.projectorGeometry'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
        ],
        responseParams: [
        ]
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






