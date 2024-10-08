
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
        des: t('debug.RequestDes.GetVersion'),
        tags: ['General'],
        requestParams: [],
        responseParams: [
            {
                name: 'obsVersion',
                type: "String",
                des: t('debug.ResParamsDes.GetVersion.obsVersion'),
            },
            {
                name: 'obsWebSocketVersion',
                type: "String",
                des: t('debug.ResParamsDes.GetVersion.obsWebSocketVersion'),
            },
            {
                name: 'rpcVersion',
                type: "Number",
                des: t('debug.ResParamsDes.GetVersion.rpcVersion'),
            },
            {
                name: 'availableRequests',
                type: "Array<String>",
                des: t('debug.ResParamsDes.GetVersion.availableRequests'),
            },
            {
                name: 'supportedImageFormats',
                type: 'Array<String>',
                des: t('debug.ResParamsDes.GetVersion.supportedImageFormats'),
            },
            {
                name: 'platform',
                type: 'String',
                des: t('debug.ResParamsDes.GetVersion.platform'),
            },
            {
                name: 'platformDescription',
                type: 'String',
                des: t('debug.ResParamsDes.GetVersion.platformDescription'),
            }
        ]
    },
    GetStats: {
        key: 'GetStats',
        title: 'GetStats',
        des: t('debug.RequestDes.GetStats'),
        tags: ['General'],
        requestParams: [],
        responseParams: [
            {
                name: 'cpuUsage',
                type: "Number",
                des: t('debug.ResParamsDes.GetStats.cpuUsage'),
            },
            {
                name: 'memoryUsage',
                type: "Number",
                des: t('debug.ResParamsDes.GetStats.memoryUsage'),
            },
            {
                name: 'availableDiskSpace',
                type: "Number",
                des: t('debug.ResParamsDes.GetStats.availableDiskSpace'),
            },
            {
                name: 'activeFps',
                type: "Number",
                des: t('debug.ResParamsDes.GetStats.activeFps'),
            },
            {
                name: 'averageFrameRenderTime',
                type: 'Number',
                des: t('debug.ResParamsDes.GetStats.averageFrameRenderTime'),
            },
            {
                name: 'renderSkippedFrames',
                type: 'Number',
                des: t('debug.ResParamsDes.GetStats.renderSkippedFrames'),
            },
            {
                name: 'renderTotalFrames',
                type: 'Number',
                des: t('debug.ResParamsDes.GetStats.renderTotalFrames'),
            },
            {
                name: 'outputSkippedFrames',
                type: 'Number',
                des: t('debug.ResParamsDes.GetStats.outputSkippedFrames'),
            },
            {
                name: 'outputTotalFrames',
                type: 'Number',
                des: t('debug.ResParamsDes.GetStats.outputTotalFrames'),
            },
            {
                name: 'webSocketSessionIncomingMessages',
                type: 'Number',
                des: t('debug.ResParamsDes.GetStats.webSocketSessionIncomingMessages'),
            },
            {
                name: 'webSocketSessionOutgoingMessages',
                type: 'Number',
                des: t('debug.ResParamsDes.GetStats.webSocketSessionOutgoingMessages'),
            }
        ]
    },
    BroadcastCustomEvent: {
        key: 'BroadcastCustomEvent',
        title: 'BroadcastCustomEvent',
        des: t('debug.RequestDes.BroadcastCustomEvent'),
        tags: ['General'],
        requestParams: [
            {
                name: 'eventData',
                type: "Object",
                des: t('debug.ReqParamsDes.BroadcastCustomEvent.eventData'),
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
        des: t('debug.RequestDes.CallVendorRequest'),
        tags: ['General'],
        requestParams: [
            {
                name: 'vendorName',
                type: "String",
                des: t('debug.ReqParamsDes.CallVendorRequest.vendorName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'requestType',
                type: "String",
                des: t('debug.ReqParamsDes.CallVendorRequest.requestType'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'requestData',
                type: "Object",
                des: t('debug.ReqParamsDes.CallVendorRequest.requestData'),
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
                des: t('debug.ResParamsDes.CallVendorRequest.vendorName'),
            },
            {
                name: 'requestType',
                type: "String",
                des: t('debug.ResParamsDes.CallVendorRequest.requestType'),
            },
            {
                name: 'responseData',
                type: "Object",
                des: t('debug.ResParamsDes.CallVendorRequest.responseData'),
            },
        ]
    },
    GetHotkeyList: {
        key: 'GetHotkeyList',
        title: 'GetHotkeyList',
        des: t('debug.RequestDes.GetHotkeyList'),
        tags: ['General'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'hotkeys',
                type: "Array<String>",
                des: t('debug.ResParamsDes.GetHotkeyList.hotkeys'),
            },
        ]
    },
    TriggerHotkeyByName: {
        key: 'TriggerHotkeyByName',
        title: 'TriggerHotkeyByName',
        des: t('debug.RequestDes.TriggerHotkeyByName'),
        tags: ['General'],
        requestParams: [
            {
                name: 'hotkeyName',
                type: "String",
                des: t('debug.ReqParamsDes.TriggerHotkeyByName.hotkeyName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'contextName',
                type: "String",
                des: t('debug.ReqParamsDes.TriggerHotkeyByName.contextName'),
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
        des: t('debug.RequestDes.TriggerHotkeyByKeySequence'),
        tags: ['General'],
        requestParams: [
            {
                name: 'keyId',
                type: "String",
                des: t('debug.ReqParamsDes.TriggerHotkeyByKeySequence.keyId'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Not pressed'
            },
            {
                name: 'keyModifiers',
                type: "Object",
                des: t('debug.ReqParamsDes.TriggerHotkeyByKeySequence.keyModifiers'),
                default: '{}',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Ignored',
            },
            {
                name: 'keyModifiers.shift',
                type: "Boolean",
                des: t('debug.ReqParamsDes.keyModifiers.shift'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Not pressed',
                parentNode: 'keyModifiers',
            },
            {
                name: 'keyModifiers.control',
                type: "Boolean",
                des: t('debug.ReqParamsDes.keyModifiers.control'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Not pressed',
                parentNode: 'keyModifiers',
            },
            {
                name: 'keyModifiers.alt',
                type: "Boolean",
                des: t('debug.ReqParamsDes.keyModifiers.alt'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Not pressed',
                parentNode: 'keyModifiers',
            },
            {
                name: 'keyModifiers.command',
                type: "Boolean",
                des: t('debug.ReqParamsDes.keyModifiers.command'),
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
        des: t('debug.RequestDes.Sleep'),
        tags: ['General'],
        requestParams: [
            {
                name: 'sleepMillis',
                type: "Number",
                des: t('debug.ReqParamsDes.Sleep.sleepMillis'),
                default: '',
                require: false,
                valueRestrictions: '>= 0, <= 50000',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'sleepFrames',
                type: "Number",
                des: t('debug.ReqParamsDes.Sleep.sleepFrames'),
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
        des: t('debug.RequestDes.GetPersistentData'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'realm',
                type: "String",
                des: t('debug.ReqParamsDes.GetPersistentData.realm'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'slotName',
                type: "String",
                des: t('debug.ReqParamsDes.GetPersistentData.slotName'),
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
                des: t('debug.ResParamsDes.GetPersistentData.slotValue'),
            },
        ]
    },
    SetPersistentData: {
        key: 'SetPersistentData',
        title: 'SetPersistentData',
        des: t('debug.RequestDes.SetPersistentData'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'realm',
                type: "String",
                des: t('debug.ReqParamsDes.SetPersistentData.realm'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'slotName',
                type: "String",
                des: t('debug.ReqParamsDes.SetPersistentData.slotName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'slotValue',
                type: "Any",
                des: t('debug.ReqParamsDes.SetPersistentData.slotValue'),
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
        des: t('debug.RequestDes.GetSceneCollectionList'),
        tags: ['Config'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'currentSceneCollectionName',
                type: "String",
                des: t('debug.ResParamsDes.GetSceneCollectionList.currentSceneCollectionName'),
            },
            {
                name: 'sceneCollections',
                type: "String",
                des: t('debug.ResParamsDes.GetSceneCollectionList.sceneCollections'),
            },
        ]
    },
    SetCurrentSceneCollection: {
        key: 'SetCurrentSceneCollection',
        title: 'SetCurrentSceneCollection',
        des: t('debug.RequestDes.SetCurrentSceneCollection'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'sceneCollectionName',
                type: "String",
                des: t('debug.ReqParamsDes.SetCurrentSceneCollection.sceneCollectionName'),
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
        des: t('debug.RequestDes.CreateSceneCollection'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'sceneCollectionName',
                type: "String",
                des: t('debug.ReqParamsDes.CreateSceneCollection.sceneCollectionName'),
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
        des: t('debug.RequestDes.GetProfileList'),
        tags: ['Config'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'sceneCollectionName',
                type: "String",
                des: t('debug.ResParamsDes.GetProfileList.sceneCollectionName'),
            },
            {
                name: 'profiles',
                type: "Array<String>",
                des: t('debug.ResParamsDes.GetProfileList.profiles'),
            },
        ]
    },
    SetCurrentProfile: {
        key: 'SetCurrentProfile',
        title: 'SetCurrentProfile',
        des: t('debug.RequestDes.SetCurrentProfile'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'profileName',
                type: "String",
                des: t('debug.ReqParamsDes.SetCurrentProfile.profileName'),
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
        des: t('debug.RequestDes.CreateProfile'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'profileName',
                type: "String",
                des: t('debug.ReqParamsDes.CreateProfile.profileName'),
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
        des: t('debug.RequestDes.RemoveProfile'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'profileName',
                type: "String",
                des: t('debug.ReqParamsDes.RemoveProfile.profileName'),
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
        des: t('debug.RequestDes.GetProfileParameter'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'parameterCategory',
                type: "String",
                des: t('debug.ReqParamsDes.GetProfileParameter.parameterCategory'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'parameterName',
                type: "String",
                des: t('debug.ReqParamsDes.GetProfileParameter.parameterName'),
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
                des: t('debug.ResParamsDes.GetProfileParameter.parameterValue'),
            },
            {
                name: 'defaultParameterValue',
                type: "String",
                des: t('debug.ResParamsDes.GetProfileParameter.defaultParameterValue'),
            },
        ]
    },
    SetProfileParameter: {
        key: 'SetProfileParameter',
        title: 'SetProfileParameter',
        des: t('debug.RequestDes.SetProfileParameter'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'parameterCategory',
                type: "String",
                des: t('debug.ReqParamsDes.SetProfileParameter.parameterCategory'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'parameterName',
                type: "String",
                des: t('debug.ReqParamsDes.SetProfileParameter.parameterName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'parameterValue',
                type: "String",
                des: t('debug.ReqParamsDes.SetProfileParameter.parameterValue'),
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
        des: t('debug.RequestDes.GetVideoSettings'),
        tags: ['Config'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'fpsNumerator',
                type: "Number",
                des: t('debug.ResParamsDes.GetVideoSettings.fpsNumerator'),
            },
            {
                name: 'fpsDenominator',
                type: "Number",
                des: t('debug.ResParamsDes.GetVideoSettings.fpsDenominator'),
            },
            {
                name: 'baseWidth',
                type: "Number",
                des: t('debug.ResParamsDes.GetVideoSettings.baseWidth'),
            },
            {
                name: 'baseHeight',
                type: "Number",
                des: t('debug.ResParamsDes.GetVideoSettings.baseHeight'),
            },
            {
                name: 'outputWidth',
                type: "Number",
                des: t('debug.ResParamsDes.GetVideoSettings.outputWidth'),
            },
            {
                name: 'outputHeight',
                type: "Number",
                des: t('debug.ResParamsDes.GetVideoSettings.outputHeight'),
            },
        ]
    },
    SetVideoSettings: {
        key: 'SetVideoSettings',
        title: 'SetVideoSettings',
        des: t('debug.RequestDes.SetVideoSettings'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'fpsNumerator',
                type: "Number",
                des: t('debug.ReqParamsDes.SetVideoSettings.fpsNumerator'),
                default: '',
                require: false,
                valueRestrictions: '>= 1',
                defaultBehavior: 'Not changed'
            },
            {
                name: 'fpsDenominator',
                type: "Number",
                des: t('debug.ReqParamsDes.SetVideoSettings.fpsDenominator'),
                default: '',
                require: false,
                valueRestrictions: '>= 1',
                defaultBehavior: 'Not changed'
            },
            {
                name: 'baseWidth',
                type: "Number",
                des: t('debug.ReqParamsDes.SetVideoSettings.baseWidth'),
                default: '',
                require: false,
                valueRestrictions: '>= 1, <= 4096',
                defaultBehavior: 'Not changed'
            },
            {
                name: 'baseHeight',
                type: "Number",
                des: t('debug.ReqParamsDes.SetVideoSettings.baseHeight'),
                default: '',
                require: false,
                valueRestrictions: '>= 1, <= 4096',
                defaultBehavior: 'Not changed'
            },
            {
                name: 'outputWidth',
                type: "Number",
                des: t('debug.ReqParamsDes.SetVideoSettings.outputWidth'),
                default: '',
                require: false,
                valueRestrictions: '>= 1, <= 4096',
                defaultBehavior: 'Not changed'
            },
            {
                name: 'outputHeight',
                type: "Number",
                des: t('debug.ReqParamsDes.SetVideoSettings.outputHeight'),
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
        des: t('debug.RequestDes.GetStreamServiceSettings'),
        tags: ['Config'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'streamServiceType',
                type: "String",
                des: t('debug.ResParamsDes.GetStreamServiceSettings.streamServiceType'),
            },
            {
                name: 'streamServiceSettings',
                type: "Object",
                des: t('debug.ResParamsDes.GetStreamServiceSettings.streamServiceSettings'),
            },
        ]
    },
    SetStreamServiceSettings: {
        key: 'SetStreamServiceSettings',
        title: 'SetStreamServiceSettings',
        des: t('debug.RequestDes.SetStreamServiceSettings'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'streamServiceType',
                type: "String",
                des: t('debug.ReqParamsDes.SetStreamServiceSettings.streamServiceType'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'streamServiceSettings',
                type: "Object",
                des: t('debug.ReqParamsDes.SetStreamServiceSettings.streamServiceSettings'),
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
        des: t('debug.RequestDes.GetRecordDirectory'),
        tags: ['Config'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'recordDirectory',
                type: "String",
                des: t('debug.ResParamsDes.GetRecordDirectory.recordDirectory'),
            },
        ]
    },
    SetRecordDirectory: {
        key: 'SetRecordDirectory',
        title: 'SetRecordDirectory',
        des: t('debug.RequestDes.SetRecordDirectory'),
        tags: ['Config'],
        requestParams: [
            {
                name: 'recordDirectory',
                type: "String",
                des: t('debug.ReqParamsDes.SetRecordDirectory.recordDirectory'),
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
        des: t('debug.RequestDes.GetSourceActive'),
        tags: ['Sources'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('debug.ReqParamsDes.GetSourceActive.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetSourceActive.sourceUuid'),
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
                des: t('debug.ResParamsDes.GetSourceActive.videoActive'),
            },
            {
                name: 'videoShowing',
                type: "String",
                des: t('debug.ResParamsDes.GetSourceActive.videoShowing'),
            },
        ]
    },
    GetSourceScreenshot: {
        key: 'GetSourceScreenshot',
        title: 'GetSourceScreenshot',
        des: t('debug.RequestDes.GetSourceScreenshot'),
        tags: ['Sources'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('debug.ReqParamsDes.GetSourceScreenshot.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetSourceScreenshot.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'imageFormat',
                type: "String",
                des: t('debug.ReqParamsDes.GetSourceScreenshot.imageFormat'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'imageWidth',
                type: "Number",
                des: t('debug.ReqParamsDes.GetSourceScreenshot.imageWidth'),
                default: '',
                require: false,
                valueRestrictions: '>= 8, <= 4096',
                defaultBehavior: 'Source value is used'
            },
            {
                name: 'imageHeight',
                type: "Number",
                des: t('debug.ReqParamsDes.GetSourceScreenshot.imageHeight'),
                default: '',
                require: false,
                valueRestrictions: '>= 8, <= 4096',
                defaultBehavior: 'Source value is used'
            },
            {
                name: 'imageCompressionQuality',
                type: "Number",
                des: t('debug.ReqParamsDes.GetSourceScreenshot.imageCompressionQuality'),
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
                des: t('debug.ResParamsDes.GetSourceScreenshot.imageData'),
            },
        ]
    },
    SaveSourceScreenshot: {
        key: 'SaveSourceScreenshot',
        title: 'SaveSourceScreenshot',
        des: t('debug.RequestDes.SaveSourceScreenshot'),
        tags: ['Sources'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('debug.ReqParamsDes.SaveSourceScreenshot.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SaveSourceScreenshot.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'imageFormat',
                type: "String",
                des: t('debug.ReqParamsDes.SaveSourceScreenshot.imageFormat'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'imageFilePath',
                type: "String",
                des: t('debug.ReqParamsDes.SaveSourceScreenshot.imageFilePath'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'imageWidth',
                type: "Number",
                des: t('debug.ReqParamsDes.SaveSourceScreenshot.imageWidth'),
                default: '',
                require: false,
                valueRestrictions: '>= 8, <= 4096',
                defaultBehavior: 'Source value is used'
            },
            {
                name: 'imageHeight',
                type: "Number",
                des: t('debug.ReqParamsDes.SaveSourceScreenshot.imageHeight'),
                default: '',
                require: false,
                valueRestrictions: '>= 8, <= 4096',
                defaultBehavior: 'Source value is used'
            },
            {
                name: 'imageCompressionQuality',
                type: "Number",
                des: t('debug.ReqParamsDes.SaveSourceScreenshot.imageCompressionQuality'),
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
                des: t('debug.ResParamsDes.SaveSourceScreenshot.imageData'),
            },
        ]
    },
    // scenes requests
    GetSceneList: {
        key: 'GetSceneList',
        title: 'GetSceneList',
        des: t('debug.RequestDes.GetSceneList'),
        tags: ['Scenes'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'currentProgramSceneName',
                type: "String",
                des: t('debug.ResParamsDes.GetSceneList.currentProgramSceneName'),
            },
            {
                name: 'currentProgramSceneUuid',
                type: "String",
                des: t('debug.ResParamsDes.GetSceneList.currentProgramSceneUuid'),
            },
            {
                name: 'currentPreviewSceneName',
                type: "String",
                des: t('debug.ResParamsDes.GetSceneList.currentPreviewSceneName'),
            },
            {
                name: 'currentPreviewSceneUuid',
                type: "String",
                des: t('debug.ResParamsDes.GetSceneList.currentPreviewSceneUuid'),
            },
            {
                name: 'scenes',
                type: "Array<Object>",
                des: t('debug.ResParamsDes.GetSceneList.scenes'),
            },
        ]
    },
    GetGroupList: {
        key: 'GetGroupList',
        title: 'GetGroupList',
        des: t('debug.RequestDes.GetGroupList'),
        tags: ['Scenes'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'groups',
                type: "Array<String>",
                des: t('debug.ResParamsDes.GetGroupList.groups'),
            },
        ]
    },
    GetCurrentProgramScene: {
        key: 'GetCurrentProgramScene',
        title: 'GetCurrentProgramScene',
        des: t('debug.RequestDes.GetCurrentProgramScene'),
        tags: ['Scenes'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ResParamsDes.GetCurrentProgramScene.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ResParamsDes.GetCurrentProgramScene.sceneUuid'),
            },
            {
                name: 'currentProgramSceneName',
                type: "String",
                des: t('debug.ResParamsDes.GetCurrentProgramScene.currentProgramSceneName'),
            },
            {
                name: 'currentProgramSceneUuid',
                type: "String",
                des: t('debug.ResParamsDes.GetCurrentProgramScene.currentProgramSceneUuid'),
            },
        ]
    },
    SetCurrentProgramScene: {
        key: 'SetCurrentProgramScene',
        title: 'SetCurrentProgramScene',
        des: t('debug.RequestDes.SetCurrentProgramScene'),
        tags: ['Scenes'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.SetCurrentProgramScene.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unkown'
            },
            {
                name: 'sceneUuid',
                type: "String",
                default: '',
                des: t('debug.ReqParamsDes.SetCurrentProgramScene.sceneUuid'),
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
        des: t('debug.RequestDes.GetCurrentPreviewScene'),
        tags: ['Scenes'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ResParamsDes.GetCurrentPreviewScene.sceneName'),
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ResParamsDes.GetCurrentPreviewScene.sceneUuid'),
            },
            {
                name: 'currentPreviewSceneName',
                type: "String",
                des: t('debug.ResParamsDes.GetCurrentPreviewScene.currentPreviewSceneName'),
            },
            {
                name: 'currentPreviewSceneUuid',
                type: "String",
                des: t('debug.ResParamsDes.GetCurrentPreviewScene.currentPreviewSceneUuid'),
            },
        ]
    },
    SetCurrentPreviewScene: {
        key: 'SetCurrentPreviewScene',
        title: 'SetCurrentPreviewScene',
        des: t('debug.RequestDes.SetCurrentPreviewScene'),
        tags: ['Scenes'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.SetCurrentPreviewScene.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unkown'
            },
            {
                name: 'sceneUuid',
                type: "String",
                default: '',
                des: t('debug.ReqParamsDes.SetCurrentPreviewScene.sceneUuid'),
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
        des: t('debug.RequestDes.CreateScene'),
        tags: ['Scenes'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.CreateScene.sceneName'),
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
                des: t('debug.ResParamsDes.CreateScene.sceneUuid'),
            },
        ]
    },
    RemoveScene: {
        key: 'RemoveScene',
        title: 'RemoveScene',
        des: t('debug.RequestDes.RemoveScene'),
        tags: ['Scenes'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.RemoveScene.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.RemoveScene.sceneUuid'),
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
        des: t('debug.RequestDes.SetSceneName'),
        tags: ['Scenes'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.SetSceneName.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SetSceneName.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'newSceneName',
                type: "String",
                des: t('debug.ReqParamsDes.SetSceneName.newSceneName'),
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
        des: t('debug.RequestDes.GetSceneSceneTransitionOverride'),
        tags: ['Scenes'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.GetSceneSceneTransitionOverride.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetSceneSceneTransitionOverride.sceneUuid'),
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
                des: t('debug.ResParamsDes.GetSceneSceneTransitionOverride.transitionName'),
            },
            {
                name: 'transitionDuration',
                type: "Number",
                des: t('debug.ResParamsDes.GetSceneSceneTransitionOverride.transitionDuration'),
            },
        ]
    },
    SetSceneSceneTransitionOverride: {
        key: 'SetSceneSceneTransitionOverride',
        title: 'SetSceneSceneTransitionOverride',
        des: t('debug.RequestDes.SetSceneSceneTransitionOverride'),
        tags: ['Scenes'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.SetSceneSceneTransitionOverride.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SetSceneSceneTransitionOverride.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'transitionName',
                type: "String",
                des: t('debug.ReqParamsDes.SetSceneSceneTransitionOverride.transitionName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unchanged'
            },
            {
                name: 'transitionDuration',
                type: "Number",
                des: t('debug.ReqParamsDes.SetSceneSceneTransitionOverride.transitionDuration'),
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
        des: t('debug.RequestDes.GetInputList'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputKind',
                type: "String",
                des: t('debug.ReqParamsDes.GetInputList.inputKind'),
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
                des: t('debug.ResParamsDes.GetInputList.inputs'),
            },
        ]
    },
    GetInputKindList: {
        key: 'GetInputKindList',
        title: 'GetInputKindList',
        des: t('debug.RequestDes.GetInputKindList'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'unversioned',
                type: "Boolean",
                des: t('debug.ReqParamsDes.GetInputKindList.unversioned'),
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
                des: t('debug.ResParamsDes.GetInputKindList.inputKinds'),
            },
        ]
    },
    GetSpecialInputs: {
        key: 'GetSpecialInputs',
        title: 'GetSpecialInputs',
        des: t('debug.RequestDes.GetSpecialInputs'),
        tags: ['Inputs'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'desktop1',
                type: "String",
                des: t('debug.ResParamsDes.GetSpecialInputs.desktop1'),
            },
            {
                name: 'desktop2',
                type: "String",
                des: t('debug.ResParamsDes.GetSpecialInputs.desktop2'),
            },
            {
                name: 'mic1',
                type: "String",
                des: t('debug.ResParamsDes.GetSpecialInputs.mic1'),
            },
            {
                name: 'mic2',
                type: "String",
                des: t('debug.ResParamsDes.GetSpecialInputs.mic2'),
            },
            {
                name: 'mic3',
                type: "String",
                des: t('debug.ResParamsDes.GetSpecialInputs.mic3'),
            },
            {
                name: 'mic4',
                type: "String",
                des: t('debug.ResParamsDes.GetSpecialInputs.mic4'),
            },
        ]
    },
    CreateInput: {
        key: 'CreateInput',
        title: 'CreateInput',
        des: t('debug.RequestDes.CreateInput'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.CreateInput.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.CreateInput.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.CreateInput.inputName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'inputKind',
                type: "String",
                des: t('debug.ReqParamsDes.CreateInput.inputKind'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A'
            },
            {
                name: 'inputSettings',
                type: "Object",
                des: t('debug.ReqParamsDes.CreateInput.inputSettings'),
                default: '{}',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Default settings used',
                isCustomerObject: true,
            },
            {
                name: 'sceneItemEnabled',
                type: "Boolean",
                des: t('debug.ReqParamsDes.CreateInput.sceneItemEnabled'),
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
                des: t('debug.ResParamsDes.CreateInput.inputUuid'),
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('debug.ResParamsDes.CreateInput.sceneItemId'),
            },
        ]
    },
    RemoveInput: {
        key: 'RemoveInput',
        title: 'RemoveInput',
        des: t('debug.RequestDes.RemoveInput'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.RemoveInput.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.RemoveInput.inputUuid'),
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
        des: t('debug.RequestDes.SetInputName'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.SetInputName.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SetInputName.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'newInputName',
                type: "String",
                des: t('debug.ReqParamsDes.SetInputName.newInputName'),
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
        des: t('debug.RequestDes.GetInputDefaultSettings'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputKind',
                type: "String",
                des: t('debug.ReqParamsDes.GetInputDefaultSettings.inputName'),
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
                des: t('debug.ReqParamsDes.GetInputDefaultSettings.defaultInputSettings'),
            }
        ]
    },
    GetInputSettings: {
        key: 'GetInputSettings',
        title: 'GetInputSettings',
        des: t('debug.RequestDes.GetInputSettings'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.GetInputSettings.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetInputSettings.inputUuid'),
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
                des: t('debug.ReqParamsDes.GetInputSettings.inputSettings'),
            },
            {
                name: 'inputKind',
                type: "String",
                des: t('debug.ReqParamsDes.GetInputSettings.inputKind'),
            },
        ]
    },
    SetInputSettings: {
        key: 'SetInputSettings',
        title: 'SetInputSettings',
        des: t('debug.RequestDes.SetInputSettings'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.SetInputSettings.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SetInputSettings.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputSettings',
                type: "Object",
                des: t('debug.ReqParamsDes.SetInputSettings.inputSettings'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
                isCustomerObject: true,
            },
            {
                name: 'overlay',
                type: "Boolean",
                des: t('debug.ReqParamsDes.SetInputSettings.overlay'),
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
        des: t('debug.RequestDes.GetInputMute'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.GetInputMute.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetInputMute.inputUuid'),
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
                des: t('debug.ReqParamsDes.GetInputMute.inputMuted'),
            },
        ]
    },
    SetInputMute: {
        key: 'SetInputMute',
        title: 'SetInputMute',
        des: t('debug.RequestDes.SetInputMute'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.SetInputMute.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SetInputMute.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputMuted',
                type: "Boolean",
                des: t('debug.ReqParamsDes.SetInputMute.inputMuted'),
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
        des: t('debug.RequestDes.ToggleInputMute'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.ToggleInputMute.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.ToggleInputMute.inputUuid'),
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
                des: t('debug.ResParamsDes.ToggleInputMute.inputMuted'),
            }
        ]
    },
    GetInputVolume: {
        key: 'GetInputVolume',
        title: 'GetInputVolume',
        des: t('debug.RequestDes.GetInputVolume'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.GetInputVolume.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetInputVolume.inputUuid'),
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
                des: t('debug.ResParamsDes.GetInputVolume.inputVolumeMul'),
            },
            {
                name: 'inputVolumeDb',
                type: "Number",
                des: t('debug.ResParamsDes.GetInputVolume.inputVolumeDb'),
            }
        ]
    },
    SetInputVolume: {
        key: 'SetInputVolume',
        title: 'SetInputVolume',
        des: t('debug.RequestDes.SetInputVolume'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.SetInputVolume.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SetInputVolume.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputVolumeMul',
                type: "Number",
                des: t('debug.ReqParamsDes.SetInputVolume.inputVolumeMul'),
                default: '',
                require: false,
                valueRestrictions: '>= 0, <= 20',
                defaultBehavior: 'inputVolumeDb should be specified'
            },
            {
                name: 'inputVolumeDb',
                type: "Number",
                des: t('debug.ReqParamsDes.SetInputVolume.inputVolumeDb'),
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
        des: t('debug.RequestDes.GetInputAudioBalance'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.GetInputAudioBalance.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetInputAudioBalance.inputUuid'),
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
                des: t('debug.ResParamsDes.GetInputAudioBalance.inputAudioBalance'),
            },
        ]
    },
    SetInputAudioBalance: {
        key: 'SetInputAudioBalance',
        title: 'SetInputAudioBalance',
        des: t('debug.RequestDes.SetInputAudioBalance'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.SetInputAudioBalance.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SetInputAudioBalance.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputAudioBalance',
                type: "Number",
                des: t('debug.ReqParamsDes.SetInputAudioBalance.inputAudioBalance'),
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
        des: t('debug.RequestDes.GetInputAudioSyncOffset'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.GetInputAudioSyncOffset.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetInputAudioSyncOffset.inputUuid'),
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
                des: t('debug.ResParamsDes.GetInputAudioSyncOffset.inputAudioSyncOffset'),
            },
        ]
    },
    SetInputAudioSyncOffset: {
        key: 'SetInputAudioSyncOffset',
        title: 'SetInputAudioSyncOffset',
        des: t('debug.RequestDes.SetInputAudioSyncOffset'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.SetInputAudioSyncOffset.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SetInputAudioSyncOffset.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputAudioSyncOffset',
                type: "Number",
                des: t('debug.ReqParamsDes.SetInputAudioSyncOffset.inputAudioSyncOffset'),
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
        des: t('debug.RequestDes.GetInputAudioMonitorType'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.GetInputAudioMonitorType.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetInputAudioMonitorType.inputUuid'),
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
                des: t('debug.ResParamsDes.GetInputAudioMonitorType.inputAudioSyncOffset'),
            },
        ]
    },
    SetInputAudioMonitorType: {
        key: 'SetInputAudioMonitorType',
        title: 'SetInputAudioMonitorType',
        des: t('debug.RequestDes.SetInputAudioMonitorType'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.SetInputAudioMonitorType.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SetInputAudioMonitorType.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'monitorType',
                type: "String",
                des: t('debug.ReqParamsDes.SetInputAudioMonitorType.monitorType'),
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
        des: t('debug.RequestDes.GetInputAudioTracks'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.GetInputAudioTracks.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetInputAudioTracks.inputUuid'),
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
                des: t('debug.ResParamsDes.GetInputAudioTracks.inputAudioTracks'),
            },
        ]
    },
    SetInputAudioTracks: {
        key: 'SetInputAudioTracks',
        title: 'SetInputAudioTracks',
        des: t('debug.RequestDes.SetInputAudioTracks'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.SetInputAudioTracks.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SetInputAudioTracks.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputAudioTracks',
                type: "Object",
                des: t('debug.ReqParamsDes.SetInputAudioTracks.inputAudioTracks'),
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
        des: t('debug.RequestDes.GetInputPropertiesListPropertyItems'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.GetInputPropertiesListPropertyItems.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetInputPropertiesListPropertyItems.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'propertyName',
                type: "String",
                des: t('debug.ReqParamsDes.GetInputPropertiesListPropertyItems.propertyName'),
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
                des: t('debug.ResParamsDes.GetInputAudioTracks.propertyItems'),
            },
        ]
    },
    PressInputPropertiesButton: {
        key: 'PressInputPropertiesButton',
        title: 'PressInputPropertiesButton',
        des: t('debug.RequestDes.PressInputPropertiesButton'),
        tags: ['Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.PressInputPropertiesButton.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.PressInputPropertiesButton.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown'
            },
            {
                name: 'propertyName',
                type: "String",
                des: t('debug.ReqParamsDes.PressInputPropertiesButton.propertyName'),
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
        des: t('debug.RequestDes.GetTransitionKindList'),
        tags: ['Transitions'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'transitionKinds',
                type: "Array<String>",
                des: t('debug.ResParamsDes.GetTransitionKindList.transitionKinds'),
            },
        ]
    },
    GetSceneTransitionList: {
        key: 'GetSceneTransitionList',
        title: 'GetSceneTransitionList',
        des: t('debug.RequestDes.GetSceneTransitionList'),
        tags: ['Transitions'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'currentSceneTransitionName',
                type: "String",
                des: t('debug.ResParamsDes.GetSceneTransitionList.currentSceneTransitionName'),
            },
            {
                name: 'currentSceneTransitionUuid',
                type: "String",
                des: t('debug.ResParamsDes.GetSceneTransitionList.currentSceneTransitionUuid'),
            },
            {
                name: 'currentSceneTransitionKind',
                type: "String",
                des: t('debug.ResParamsDes.GetSceneTransitionList.currentSceneTransitionKind'),
            },
            {
                name: 'transitions',
                type: "Array<Object>",
                des: t('debug.ResParamsDes.GetSceneTransitionList.transitions'),
            },
        ]
    },
    GetCurrentSceneTransition: {
        key: 'GetCurrentSceneTransition',
        title: 'GetCurrentSceneTransition',
        des: t('debug.RequestDes.GetCurrentSceneTransition'),
        tags: ['Transitions'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'transitionName',
                type: "String",
                des: t('debug.ResParamsDes.GetCurrentSceneTransition.transitionName'),
            },
            {
                name: 'transitionUuid',
                type: "String",
                des: t('debug.ResParamsDes.GetCurrentSceneTransition.transitionUuid'),
            },
            {
                name: 'transitionKind',
                type: "String",
                des: t('debug.ResParamsDes.GetCurrentSceneTransition.transitionKind'),
            },
            {
                name: 'transitionFixed',
                type: "Boolean",
                des: t('debug.ResParamsDes.GetCurrentSceneTransition.transitionFixed'),
            },
            {
                name: 'transitionDuration',
                type: "Number",
                des: t('debug.ResParamsDes.GetCurrentSceneTransition.transitionDuration'),
            },
            {
                name: 'transitionConfigurable',
                type: "Boolean",
                des: t('debug.ResParamsDes.GetCurrentSceneTransition.transitionConfigurable'),
            },
            {
                name: 'transitionSettings',
                type: "Object",
                des: t('debug.ResParamsDes.GetCurrentSceneTransition.transitionSettings'),
            },
        ]
    },
    SetCurrentSceneTransition: {
        key: 'SetCurrentSceneTransition',
        title: 'SetCurrentSceneTransition',
        des: t('debug.RequestDes.SetCurrentSceneTransition'),
        tags: ['Transitions'],
        requestParams: [
            {
                name: 'transitionName',
                type: "String",
                des: t('debug.ReqParamsDes.SetCurrentSceneTransition.transitionName'),
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
        des: t('debug.RequestDes.SetCurrentSceneTransitionDuration'),
        tags: ['Transitions'],
        requestParams: [
            {
                name: 'transitionDuration',
                type: "Number",
                des: t('debug.ReqParamsDes.SetCurrentSceneTransitionDuration.transitionDuration'),
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
        des: t('debug.RequestDes.SetCurrentSceneTransitionSettings'),
        tags: ['Transitions'],
        requestParams: [
            {
                name: 'transitionSettings',
                type: "Object",
                des: t('debug.ReqParamsDes.SetCurrentSceneTransitionSettings.transitionSettings'),
                default: '{}',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
                isCustomerObject: true,
            },
            {
                name: 'overlay',
                type: "Boolean",
                des: t('debug.ReqParamsDes.SetCurrentSceneTransitionSettings.overlay'),
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
        des: t('debug.RequestDes.GetCurrentSceneTransitionCursor'),
        tags: ['Transitions'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'transitionCursor',
                type: "Number",
                des: t('debug.ResParamsDes.GetCurrentSceneTransitionCursor.transitionCursor'),
            },
        ]
    },
    TriggerStudioModeTransition: {
        key: 'TriggerStudioModeTransition',
        title: 'TriggerStudioModeTransition',
        des: t('debug.RequestDes.TriggerStudioModeTransition'),
        tags: ['Transitions'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    SetTBarPosition: {
        key: 'SetTBarPosition',
        title: 'SetTBarPosition',
        des: t('debug.RequestDes.SetTBarPosition'),
        tags: ['Transitions'],
        requestParams: [
            {
                name: 'position',
                type: "Number",
                des: t('debug.ReqParamsDes.SetTBarPosition.position'),
                default: '',
                require: true,
                valueRestrictions: '>= 0.0, <= 1.0',
                defaultBehavior: 'N/A',
            },
            {
                name: 'release',
                type: "Boolean",
                des: t('debug.ReqParamsDes.SetTBarPosition.release'),
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
        des: t('debug.RequestDes.GetSourceFilterKindList'),
        tags: ['Filters'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'sourceFilterKinds',
                type: "Array<String>",
                des: t('debug.ResParamsDes.GetSourceFilterKindList.sourceFilterKinds'),
            },
        ]
    },
    GetSourceFilterList: {
        key: 'GetSourceFilterList',
        title: 'GetSourceFilterList',
        des: t('debug.RequestDes.GetSourceFilterList'),
        tags: ['Filters'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('debug.ReqParamsDes.GetSourceFilterList.sourceName'),
                default: 'true',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetSourceFilterList.sourceUuid'),
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
                des: t('debug.ResParamsDes.GetSourceFilterList.filters'),
            },
        ]
    },
    GetSourceFilterDefaultSettings: {
        key: 'GetSourceFilterDefaultSettings',
        title: 'GetSourceFilterDefaultSettings',
        des: t('debug.RequestDes.GetSourceFilterDefaultSettings'),
        tags: ['Filters'],
        requestParams: [
            {
                name: 'filterKind',
                type: "String",
                des: t('debug.ReqParamsDes.GetSourceFilterDefaultSettings.filterKind'),
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
                des: t('debug.ResParamsDes.GetSourceFilterDefaultSettings.defaultFilterSettings'),
            },
        ]
    },
    CreateSourceFilter: {
        key: 'CreateSourceFilter',
        title: 'CreateSourceFilter',
        des: t('debug.RequestDes.CreateSourceFilter'),
        tags: ['Filters'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('debug.ReqParamsDes.CreateSourceFilter.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('debug.ReqParamsDes.CreateSourceFilter.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'filterName',
                type: "String",
                des: t('debug.ReqParamsDes.CreateSourceFilter.filterName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'filterKind',
                type: "String",
                des: t('debug.ReqParamsDes.CreateSourceFilter.filterKind'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'filterSettings',
                type: "Object",
                des: t('debug.ReqParamsDes.CreateSourceFilter.filterSettings'),
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
        des: t('debug.RequestDes.RemoveSourceFilter'),
        tags: ['Filters'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('debug.ReqParamsDes.RemoveSourceFilter.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('debug.ReqParamsDes.RemoveSourceFilter.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'filterName',
                type: "String",
                des: t('debug.ReqParamsDes.RemoveSourceFilter.filterName'),
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
        des: t('debug.RequestDes.SetSourceFilterName'),
        tags: ['Filters'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('debug.ReqParamsDes.SetSourceFilterName.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SetSourceFilterName.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'filterName',
                type: "String",
                des: t('debug.ReqParamsDes.SetSourceFilterName.filterName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'newFilterName',
                type: "String",
                des: t('debug.ReqParamsDes.SetSourceFilterName.newFilterName'),
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
        des: t('debug.RequestDes.GetSourceFilter'),
        tags: ['Filters'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('debug.ReqParamsDes.GetSourceFilter.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetSourceFilter.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'filterName',
                type: "String",
                des: t('debug.ReqParamsDes.GetSourceFilter.filterName'),
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
                des: t('debug.ResParamsDes.GetSourceFilter.filterEnabled'),
            },
            {
                name: 'filterIndex',
                type: "Number",
                des: t('debug.ResParamsDes.GetSourceFilter.filterIndex'),
            },
            {
                name: 'filterKind',
                type: "String",
                des: t('debug.ResParamsDes.GetSourceFilter.filterKind'),
            },
            {
                name: 'filters',
                type: "Array<Object>",
                des: t('debug.ResParamsDes.GetSourceFilter.filters'),
            },
        ]
    },
    SetSourceFilterIndex: {
        key: 'SetSourceFilterIndex',
        title: 'SetSourceFilterIndex',
        des: t('debug.RequestDes.SetSourceFilterIndex'),
        tags: ['Filters'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('debug.ReqParamsDes.SetSourceFilterIndex.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SetSourceFilterIndex.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'filterName',
                type: "String",
                des: t('debug.ReqParamsDes.SetSourceFilterIndex.filterName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'filterIndex',
                type: "Number",
                des: t('debug.ReqParamsDes.SetSourceFilterIndex.filterIndex'),
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
        des: t('debug.RequestDes.SetSourceFilterSettings'),
        tags: ['Filters'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('debug.ReqParamsDes.SetSourceFilterSettings.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SetSourceFilterSettings.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'filterName',
                type: "String",
                des: t('debug.ReqParamsDes.SetSourceFilterSettings.filterName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'filterIndex',
                type: "Object",
                des: t('debug.ReqParamsDes.SetSourceFilterSettings.filterIndex'),
                default: '{}',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'overlay',
                type: "Boolean",
                des: t('debug.ReqParamsDes.SetSourceFilterSettings.overlay'),
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
        des: t('debug.RequestDes.SetSourceFilterEnabled'),
        tags: ['Filters'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('debug.ReqParamsDes.SetSourceFilterEnabled.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SetSourceFilterEnabled.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'filterName',
                type: "String",
                des: t('debug.ReqParamsDes.SetSourceFilterEnabled.filterName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'filterEnabled',
                type: "Boolean",
                des: t('debug.ReqParamsDes.SetSourceFilterEnabled.filterEnabled'),
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
        des: t('debug.RequestDes.GetSceneItemList'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.GetSceneItemList.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetSceneItemList.sceneUuid'),
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
                des: t('debug.ResParamsDes.GetSceneItemList.sceneItems'),
            },
        ]
    },
    GetGroupSceneItemList: {
        key: 'GetGroupSceneItemList',
        title: 'GetGroupSceneItemList',
        des: t('debug.RequestDes.GetGroupSceneItemList'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.GetGroupSceneItemList.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetGroupSceneItemList.sceneUuid'),
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
                des: t('debug.ResParamsDes.GetGroupSceneItemList.sceneItems'),
            },
        ]
    },
    GetSceneItemId: {
        key: 'GetSceneItemId',
        title: 'GetSceneItemId',
        des: t('debug.RequestDes.GetSceneItemId'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.GetSceneItemId.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetSceneItemId.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceName',
                type: "String",
                des: t('debug.ReqParamsDes.GetSceneItemId.sourceName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'searchOffset',
                type: "Number",
                des: t('debug.ReqParamsDes.GetSceneItemId.searchOffset'),
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
                des: t('debug.ResParamsDes.GetSceneItemId.sceneItemId'),
            },
        ]
    },
    GetSceneItemSource: {
        key: 'GetSceneItemSource',
        title: 'GetSceneItemSource',
        des: t('debug.RequestDes.GetSceneItemSource'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.GetSceneItemSource.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetSceneItemSource.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('debug.ReqParamsDes.GetSceneItemSource.sceneItemId'),
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
                des: t('debug.ResParamsDes.GetSceneItemSource.sourceName'),
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('debug.ResParamsDes.GetSceneItemSource.sourceUuid'),
            },
        ]
    },
    CreateSceneItem: {
        key: 'CreateSceneItem',
        title: 'CreateSceneItem',
        des: t('debug.RequestDes.CreateSceneItem'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.CreateSceneItem.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.CreateSceneItem.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceName',
                type: "String",
                des: t('debug.ReqParamsDes.CreateSceneItem.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('debug.ReqParamsDes.CreateSceneItem.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemEnabled',
                type: "Boolean	",
                des: t('debug.ReqParamsDes.CreateSceneItem.sceneItemEnabled'),
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
                des: t('debug.ResParamsDes.CreateSceneItem.sceneItemId'),
            },
        ]
    },
    RemoveSceneItem: {
        key: 'RemoveSceneItem',
        title: 'RemoveSceneItem',
        des: t('debug.RequestDes.RemoveSceneItem'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.RemoveSceneItem.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.RemoveSceneItem.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('debug.ReqParamsDes.RemoveSceneItem.sceneItemId'),
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
        des: t('debug.RequestDes.DuplicateSceneItem'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.DuplicateSceneItem.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.DuplicateSceneItem.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('debug.ReqParamsDes.DuplicateSceneItem.sceneItemId'),
                default: '',
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'N/A',
            },
            {
                name: 'destinationSceneName',
                type: "String",
                des: t('debug.ReqParamsDes.DuplicateSceneItem.destinationSceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'From scene is assumed',
            },
            {
                name: 'destinationSceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.DuplicateSceneItem.destinationSceneUuid'),
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
                des: t('debug.ResParamsDes.DuplicateSceneItem.sceneItemId'),
            },
        ]
    },
    GetSceneItemTransform: {
        key: 'GetSceneItemTransform',
        title: 'GetSceneItemTransform',
        des: t('debug.RequestDes.GetSceneItemTransform'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.GetSceneItemTransform.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetSceneItemTransform.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('debug.ReqParamsDes.GetSceneItemTransform.sceneItemId'),
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
                des: t('debug.ResParamsDes.GetSceneItemTransform.sceneItemTransform'),
            },
        ]
    },
    SetSceneItemTransform: {
        key: 'SetSceneItemTransform',
        title: 'SetSceneItemTransform',
        des: t('debug.RequestDes.SetSceneItemTransform'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.SetSceneItemTransform.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SetSceneItemTransform.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('debug.ReqParamsDes.SetSceneItemTransform.sceneItemId'),
                default: '',
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'N/A',
            },
            {
                name: 'sceneItemTransform',
                type: "Object",
                des: t('debug.ReqParamsDes.SetSceneItemTransform.sceneItemTransform'),
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
        des: t('debug.RequestDes.GetSceneItemEnabled'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.GetSceneItemEnabled.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetSceneItemEnabled.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('debug.ReqParamsDes.GetSceneItemEnabled.sceneItemId'),
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
                des: t('debug.ResParamsDes.GetSceneItemEnabled.sceneItemEnabled'),
            },
        ]
    },
    SetSceneItemEnabled: {
        key: 'SetSceneItemEnabled',
        title: 'SetSceneItemEnabled',
        des: t('debug.RequestDes.SetSceneItemEnabled'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.SetSceneItemEnabled.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SetSceneItemEnabled.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('debug.ReqParamsDes.SetSceneItemEnabled.sceneItemId'),
                default: '',
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'N/A',
            },
            {
                name: 'sceneItemEnabled',
                type: "Boolean",
                des: t('debug.ReqParamsDes.SetSceneItemEnabled.sceneItemEnabled'),
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
        des: t('debug.RequestDes.GetSceneItemLocked'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.GetSceneItemLocked.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetSceneItemLocked.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('debug.ReqParamsDes.GetSceneItemLocked.sceneItemId'),
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
                des: t('debug.ResParamsDes.GetSceneItemLocked.sceneItemLocked'),
            },
        ]
    },
    SetSceneItemLocked: {
        key: 'SetSceneItemLocked',
        title: 'SetSceneItemLocked',
        des: t('debug.RequestDes.SetSceneItemLocked'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.SetSceneItemLocked.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SetSceneItemLocked.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('debug.ReqParamsDes.SetSceneItemLocked.sceneItemId'),
                default: '',
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'N/A',
            },
            {
                name: 'sceneItemLocked',
                type: "Boolean",
                des: t('debug.ReqParamsDes.SetSceneItemLocked.sceneItemLocked'),
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
        des: t('debug.RequestDes.GetSceneItemIndex'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.GetSceneItemIndex.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetSceneItemIndex.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('debug.ReqParamsDes.GetSceneItemIndex.sceneItemId'),
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
                des: t('debug.ResParamsDes.GetSceneItemIndex.sceneItemIndex'),
            },
        ]
    },
    SetSceneItemIndex: {
        key: 'SetSceneItemIndex',
        title: 'SetSceneItemIndex',
        des: t('debug.RequestDes.SetSceneItemIndex'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.SetSceneItemIndex.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SetSceneItemIndex.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('debug.ReqParamsDes.SetSceneItemIndex.sceneItemId'),
                default: '',
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'N/A',
            },
            {
                name: 'sceneItemIndex',
                type: "Number",
                des: t('debug.ReqParamsDes.SetSceneItemIndex.sceneItemIndex'),
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
        des: t('debug.RequestDes.GetSceneItemBlendMode'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.GetSceneItemBlendMode.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetSceneItemBlendMode.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('debug.ReqParamsDes.GetSceneItemBlendMode.sceneItemId'),
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
                des: t('debug.ResParamsDes.GetSceneItemBlendMode.sceneItemBlendMode'),
            },
        ]
    },
    SetSceneItemBlendMode: {
        key: 'SetSceneItemBlendMode',
        title: 'SetSceneItemBlendMode',
        des: t('debug.RequestDes.SetSceneItemBlendMode'),
        tags: ['Scene Items'],
        requestParams: [
            {
                name: 'sceneName',
                type: "String",
                des: t('debug.ReqParamsDes.SetSceneItemBlendMode.sceneName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SetSceneItemBlendMode.sceneUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sceneItemId',
                type: "Number",
                des: t('debug.ReqParamsDes.SetSceneItemBlendMode.sceneItemId'),
                default: '',
                require: true,
                valueRestrictions: '>= 0',
                defaultBehavior: 'N/A',
            },
            {
                name: 'sceneItemBlendMode',
                type: "String",
                des: t('debug.ReqParamsDes.SetSceneItemBlendMode.sceneItemBlendMode'),
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
        des: t('debug.RequestDes.GetVirtualCamStatus'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('debug.ResParamsDes.GetVirtualCamStatus.outputActive'),
            },
        ]
    },
    ToggleVirtualCam: {
        key: 'ToggleVirtualCam',
        title: 'ToggleVirtualCam',
        des: t('debug.RequestDes.ToggleVirtualCam'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('debug.ResParamsDes.ToggleVirtualCam.outputActive'),
            },
        ]
    },
    StartVirtualCam: {
        key: 'StartVirtualCam',
        title: 'StartVirtualCam',
        des: t('debug.RequestDes.StartVirtualCam'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    StopVirtualCam: {
        key: 'StopVirtualCam',
        title: 'StopVirtualCam',
        des: t('debug.RequestDes.StopVirtualCam'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    GetReplayBufferStatus: {
        key: 'GetReplayBufferStatus',
        title: 'GetReplayBufferStatus',
        des: t('debug.RequestDes.GetReplayBufferStatus'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('debug.ResParamsDes.GetReplayBufferStatus.outputActive'),
            },
        ]
    },
    ToggleReplayBuffer: {
        key: 'ToggleReplayBuffer',
        title: 'ToggleReplayBuffer',
        des: t('debug.RequestDes.ToggleReplayBuffer'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('debug.ResParamsDes.ToggleReplayBuffer.outputActive'),
            },
        ]
    },
    StartReplayBuffer: {
        key: 'StartReplayBuffer',
        title: 'StartReplayBuffer',
        des: t('debug.RequestDes.StartReplayBuffer'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    StopReplayBuffer: {
        key: 'StopReplayBuffer',
        title: 'StopReplayBuffer',
        des: t('debug.RequestDes.StopReplayBuffer'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    SaveReplayBuffer: {
        key: 'SaveReplayBuffer',
        title: 'SaveReplayBuffer',
        des: t('debug.RequestDes.SaveReplayBuffer'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    GetLastReplayBufferReplay: {
        key: 'GetLastReplayBufferReplay',
        title: 'GetLastReplayBufferReplay',
        des: t('debug.RequestDes.GetLastReplayBufferReplay'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'savedReplayPath',
                type: "Boolean",
                des: t('debug.ResParamsDes.GetLastReplayBufferReplay.savedReplayPath'),
            },
        ]
    },
    GetOutputList: {
        key: 'GetOutputList',
        title: 'GetOutputList',
        des: t('debug.RequestDes.GetOutputList'),
        tags: ['Outputs'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'outputs',
                type: "Array<Object>",
                des: t('debug.ResParamsDes.GetOutputList.outputs'),
            },
        ]
    },
    GetOutputStatus: {
        key: 'GetOutputStatus',
        title: 'GetOutputStatus',
        des: t('debug.RequestDes.GetOutputStatus'),
        tags: ['Outputs'],
        requestParams: [
            {
                name: 'outputName',
                type: "String",
                des: t('debug.ReqParamsDes.GetOutputStatus.outputName'),
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
                des: t('debug.ResParamsDes.GetOutputStatus.outputActive'),
            },
            {
                name: 'outputReconnecting',
                type: "Boolean",
                des: t('debug.ResParamsDes.GetOutputStatus.outputReconnecting'),
            },
            {
                name: 'outputTimecode',
                type: "String",
                des: t('debug.ResParamsDes.GetOutputStatus.outputTimecode'),
            },
            {
                name: 'outputDuration',
                type: "Number",
                des: t('debug.ResParamsDes.GetOutputStatus.outputDuration'),
            },
            {
                name: 'outputCongestion',
                type: "Number",
                des: t('debug.ResParamsDes.GetOutputStatus.outputCongestion'),
            },
            {
                name: 'outputBytes',
                type: "Number",
                des: t('debug.ResParamsDes.GetOutputStatus.outputBytes'),
            },
            {
                name: 'outputSkippedFrames',
                type: "Number",
                des: t('debug.ResParamsDes.GetOutputStatus.outputSkippedFrames'),
            },
            {
                name: 'outputTotalFrames',
                type: "Number",
                des: t('debug.ResParamsDes.GetOutputStatus.outputTotalFrames'),
            },
        ]
    },
    ToggleOutput: {
        key: 'ToggleOutput',
        title: 'ToggleOutput',
        des: t('debug.RequestDes.ToggleOutput'),
        tags: ['Outputs'],
        requestParams: [
            {
                name: 'outputName',
                type: "String",
                des: t('debug.ReqParamsDes.ToggleOutput.outputName'),
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
                des: t('debug.ResParamsDes.ToggleOutput.outputActive'),
            },
        ]
    },
    StartOutput: {
        key: 'StartOutput',
        title: 'StartOutput',
        des: t('debug.RequestDes.StartOutput'),
        tags: ['Outputs'],
        requestParams: [
            {
                name: 'outputName',
                type: "String",
                des: t('debug.ReqParamsDes.StartOutput.outputName'),
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
        des: t('debug.RequestDes.StopOutput'),
        tags: ['Outputs'],
        requestParams: [
            {
                name: 'outputName',
                type: "String",
                des: t('debug.ReqParamsDes.StopOutput.outputName'),
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
        des: t('debug.RequestDes.GetOutputSettings'),
        tags: ['Outputs'],
        requestParams: [
            {
                name: 'outputName',
                type: "String",
                des: t('debug.ReqParamsDes.GetOutputSettings.outputName'),
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
                des: t('debug.ResParamsDes.GetOutputSettings.outputSettings'),
            },
        ]
    },
    SetOutputSettings: {
        key: 'SetOutputSettings',
        title: 'SetOutputSettings',
        des: t('debug.RequestDes.SetOutputSettings'),
        tags: ['Outputs'],
        requestParams: [
            {
                name: 'outputName',
                type: "String",
                des: t('debug.ReqParamsDes.SetOutputSettings.outputName'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'outputSettings',
                type: "Object",
                des: t('debug.ReqParamsDes.SetOutputSettings.outputSettings'),
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
        des: t('debug.RequestDes.GetStreamStatus'),
        tags: ['Stream'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('debug.ResParamsDes.GetStreamStatus.outputActive'),
            },
            {
                name: 'outputReconnecting',
                type: "Boolean",
                des: t('debug.ResParamsDes.GetStreamStatus.outputReconnecting'),
            },
            {
                name: 'outputTimecode',
                type: "String",
                des: t('debug.ResParamsDes.GetStreamStatus.outputTimecode'),
            },
            {
                name: 'outputDuration',
                type: "Number",
                des: t('debug.ResParamsDes.GetStreamStatus.outputDuration'),
            },
            {
                name: 'outputCongestion',
                type: "Number",
                des: t('debug.ResParamsDes.GetStreamStatus.outputCongestion'),
            },
            {
                name: 'outputBytes',
                type: "Number",
                des: t('debug.ResParamsDes.GetStreamStatus.outputBytes'),
            },
            {
                name: 'outputSkippedFrames',
                type: "Number",
                des: t('debug.ResParamsDes.GetStreamStatus.outputSkippedFrames'),
            },
            {
                name: 'outputTotalFrames',
                type: "Number",
                des: t('debug.ResParamsDes.GetStreamStatus.outputTotalFrames'),
            },
        ]
    },
    ToggleStream: {
        key: 'ToggleStream',
        title: 'ToggleStream',
        des: t('debug.RequestDes.ToggleStream'),
        tags: ['Stream'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('debug.ResParamsDes.ToggleStream.outputActive'),
            },
        ]
    },
    StartStream: {
        key: 'StartStream',
        title: 'StartStream',
        des: t('debug.RequestDes.StartStream'),
        tags: ['Stream'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    StopStream: {
        key: 'StopStream',
        title: 'StopStream',
        des: t('debug.RequestDes.StopStream'),
        tags: ['Stream'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    SendStreamCaption: {
        key: 'SendStreamCaption',
        title: 'SendStreamCaption',
        des: t('debug.RequestDes.SendStreamCaption'),
        tags: ['Stream'],
        requestParams: [
            {
                name: 'captionText',
                type: "String",
                des: t('debug.ReqParamsDes.SendStreamCaption.captionText'),
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
        des: t('debug.RequestDes.GetRecordStatus'),
        tags: ['Record'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('debug.ResParamsDes.GetRecordStatus.outputActive'),
            },
            {
                name: 'outputPaused',
                type: "Boolean",
                des: t('debug.ResParamsDes.GetRecordStatus.outputPaused'),
            },
            {
                name: 'outputTimecode',
                type: "String",
                des: t('debug.ResParamsDes.GetRecordStatus.outputTimecode'),
            },
            {
                name: 'outputDuration',
                type: "Number",
                des: t('debug.ResParamsDes.GetRecordStatus.outputDuration'),
            },
            {
                name: 'outputBytes',
                type: "Number",
                des: t('debug.ResParamsDes.GetRecordStatus.outputBytes'),
            },
        ]
    },
    ToggleRecord: {
        key: 'ToggleRecord',
        title: 'ToggleRecord',
        des: t('debug.RequestDes.ToggleRecord'),
        tags: ['Record'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'outputActive',
                type: "Boolean",
                des: t('debug.ResParamsDes.ToggleRecord.outputActive'),
            },
        ]
    },
    StartRecord: {
        key: 'StartRecord',
        title: 'StartRecord',
        des: t('debug.RequestDes.StartRecord'),
        tags: ['Record'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    StopRecord: {
        key: 'StopRecord',
        title: 'StopRecord',
        des: t('debug.RequestDes.StopRecord'),
        tags: ['Record'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'outputPath',
                type: "String",
                des: t('debug.ResParamsDes.StopRecord.outputPath'),
            },
        ]
    },
    ToggleRecordPause: {
        key: 'ToggleRecordPause',
        title: 'ToggleRecordPause',
        des: t('debug.RequestDes.ToggleRecordPause'),
        tags: ['Record'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    PauseRecord: {
        key: 'PauseRecord',
        title: 'PauseRecord',
        des: t('debug.RequestDes.PauseRecord'),
        tags: ['Record'],
        requestParams: [
        ],
        responseParams: [
        ]
    },
    ResumeRecord: {
        key: 'ResumeRecord',
        title: 'ResumeRecord',
        des: t('debug.RequestDes.ResumeRecord'),
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
        des: t('debug.RequestDes.GetMediaInputStatus'),
        tags: ['Media Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.GetMediaInputStatus.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.GetMediaInputStatus.inputUuid'),
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
                des: t('debug.ResParamsDes.GetMediaInputStatus.mediaState'),
            },
            {
                name: 'mediaDuration',
                type: "Number",
                des: t('debug.ResParamsDes.GetMediaInputStatus.mediaDuration'),
            },
            {
                name: 'mediaCursor',
                type: "Number",
                des: t('debug.ResParamsDes.GetMediaInputStatus.mediaCursor'),
            },
        ]
    },
    SetMediaInputCursor: {
        key: 'SetMediaInputCursor',
        title: 'SetMediaInputCursor',
        des: t('debug.RequestDes.SetMediaInputCursor'),
        tags: ['Media Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.SetMediaInputCursor.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.SetMediaInputCursor.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'mediaCursor',
                type: "Number",
                des: t('debug.ReqParamsDes.SetMediaInputCursor.mediaCursor'),
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
        des: t('debug.RequestDes.OffsetMediaInputCursor'),
        tags: ['Media Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.OffsetMediaInputCursor.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.OffsetMediaInputCursor.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'mediaCursorOffset',
                type: "Number",
                des: t('debug.ReqParamsDes.OffsetMediaInputCursor.mediaCursorOffset'),
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
        des: t('debug.RequestDes.TriggerMediaInputAction'),
        tags: ['Media Inputs'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.TriggerMediaInputAction.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.TriggerMediaInputAction.inputUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'mediaAction',
                type: "Number",
                des: t('debug.ReqParamsDes.TriggerMediaInputAction.mediaAction'),
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
        des: t('debug.RequestDes.GetStudioModeEnabled'),
        tags: ['Ui'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'studioModeEnabled',
                type: "Boolean",
                des: t('debug.ResParamsDes.GetStudioModeEnabled.studioModeEnabled'),
            },
        ]
    },
    SetStudioModeEnabled: {
        key: 'SetStudioModeEnabled',
        title: 'SetStudioModeEnabled',
        des: t('debug.RequestDes.SetStudioModeEnabled'),
        tags: ['Ui'],
        requestParams: [
            {
                name: 'studioModeEnabled',
                type: "Boolean",
                des: t('debug.ReqParamsDes.SetStudioModeEnabled.inputName'),
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
        des: t('debug.RequestDes.OpenInputPropertiesDialog'),
        tags: ['Ui'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.OpenInputPropertiesDialog.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.OpenInputPropertiesDialog.inputUuid'),
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
        des: t('debug.RequestDes.OpenInputFiltersDialog'),
        tags: ['Ui'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.OpenInputFiltersDialog.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.OpenInputFiltersDialog.inputUuid'),
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
        des: t('debug.RequestDes.OpenInputInteractDialog'),
        tags: ['Ui'],
        requestParams: [
            {
                name: 'inputName',
                type: "String",
                des: t('debug.ReqParamsDes.OpenInputInteractDialog.inputName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'inputUuid',
                type: "String",
                des: t('debug.ReqParamsDes.OpenInputInteractDialog.inputUuid'),
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
        des: t('debug.RequestDes.GetMonitorList'),
        tags: ['Ui'],
        requestParams: [
        ],
        responseParams: [
            {
                name: 'monitors',
                type: "Array<Object>",
                des: t('debug.ResParamsDes.GetMonitorList.monitors'),
            },
        ]
    },
    OpenVideoMixProjector: {
        key: 'OpenVideoMixProjector',
        title: 'OpenVideoMixProjector',
        des: t('debug.RequestDes.OpenVideoMixProjector'),
        tags: ['Ui'],
        requestParams: [
            {
                name: 'videoMixType',
                type: "String",
                des: t('debug.ReqParamsDes.OpenVideoMixProjector.videoMixType'),
                default: '',
                require: true,
                valueRestrictions: 'None',
                defaultBehavior: 'N/A',
            },
            {
                name: 'monitorIndex',
                type: "Number",
                des: t('debug.ReqParamsDes.OpenVideoMixProjector.monitorIndex'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: '-1: Opens projector in windowed mode',
            },
            {
                name: 'projectorGeometry',
                type: "String",
                des: t('debug.ReqParamsDes.OpenVideoMixProjector.projectorGeometry'),
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
        des: t('debug.RequestDes.OpenSourceProjector'),
        tags: ['Ui'],
        requestParams: [
            {
                name: 'sourceName',
                type: "String",
                des: t('debug.ReqParamsDes.OpenSourceProjector.sourceName'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'sourceUuid',
                type: "String",
                des: t('debug.ReqParamsDes.OpenSourceProjector.sourceUuid'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: 'Unknown',
            },
            {
                name: 'monitorIndex',
                type: "Number",
                des: t('debug.ReqParamsDes.OpenSourceProjector.monitorIndex'),
                default: '',
                require: false,
                valueRestrictions: 'None',
                defaultBehavior: '-1: Opens projector in windowed mode',
            },
            {
                name: 'projectorGeometry',
                type: "String",
                des: t('debug.ReqParamsDes.OpenSourceProjector.projectorGeometry'),
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
        title: t('debug.QueryHeaders.Params'),
        dataIndex: 'name', 
        resizable: true,
        width: 100,
    },
    {
        title: t('debug.QueryHeaders.Value'),
        dataIndex: 'model', 
        resizable: true,
        width: 200,
    },
    {
        title: t('debug.QueryHeaders.Type'),
        dataIndex: 'type', 
        width: 100,
    },
    {
        title: t('debug.QueryHeaders.Des'),
        dataIndex: 'des', 
        width: 300,
    },
    {
        title: t('debug.QueryHeaders.ValueRestrictions'),
        dataIndex: 'valueRestrictions',
        width: 100,
    },
    {
        title: t('debug.QueryHeaders.DefaultBehavior'),
        dataIndex: 'defaultBehavior', 
        width: 100,
    }
];

export const ResponseColumns = [
    {
        title: t('debug.QueryHeaders.Params'),
        dataIndex: 'name', 
        width: '15%',
    },
    {
        title: t('debug.QueryHeaders.Type'),
        dataIndex: 'type', 
        width: '15%',
    },
    {
        title: t('debug.QueryHeaders.Des'),
        dataIndex: 'des', 
        width: '35%',
    }
];






