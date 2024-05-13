
import OBSWebSocket, { RequestBatchExecutionType, RequestBatchRequest, ResponseBatchMessage, ResponseMessage } from 'obs-websocket-js'
import { OBSConnectionConfig, OBSGeneralConfig, OBSVideoConfig, OBSstatus, WSEventAndRequestHistory, WSconnected, WSplatform, WSstats, WSversions } from '../state';
import { OBSEventTypes, OBSRequestTypes, OBSResponseTypes } from 'obs-websocket-js'

class OBS {
    static instance: OBS;
    static getInstance(): OBS {
        if (!OBS.instance) {
            OBS.instance = new OBS();
        }
        return OBS.instance;
    }

    ws:OBSWebSocket = new OBSWebSocket();
    connected = WSconnected;
    version = WSversions;
    stats = WSstats;
    platform = WSplatform;

    status = OBSstatus;
    config = OBSConnectionConfig;
    videoConfig = OBSVideoConfig;
    generalConfig = OBSGeneralConfig;


    private constructor() {
    }

    

    async connect(){
        if(this.connected.value) return;
        try {
            const wsUrl = `ws://${this.config.host.value}:${this.config.port.value}`
            console.log("[obs]开始连接", wsUrl);
            const res = await this.ws.connect(wsUrl, this.config.password.value);
            console.log("[obs]连接成功", res);
            this.connected.value = true;
            await this.initWhenConnected();
            this.registOBSEvent();
        } catch (error) {
            console.error("[obs]连接失败", error);
            this.connected.value = false;
        }
    };

    async disconnect(){
        if(!this.connected.value) return;
        try {
            console.log("[obs]开始断开连接");
            await this.ws.disconnect();
            console.log("[obs]断开连接成功");
            this.connected.value = false;
        } catch (error) {
            console.error("[obs]断开连接失败", error);
            this.connected.value = true;
        }
    };

    async getStatus() {
        const SS = await this.ws?.call("GetStreamStatus");
        const RS = await this.ws?.call("GetRecordStatus");
        const { studioModeEnabled } = await this.ws?.call("GetStudioModeEnabled");

        this.status.isStreaming.value = !!SS.outputActive;
        this.status.isRecording.value = !!RS.outputActive;
        this.status.isStudioModule.value = !!studioModeEnabled;
        console.log("[obs]obsState", this.status);
        console.log("[obs]isStudioModule", this.status.isStudioModule.value);
    }

    async getVersions() {
        const version = await this.ws?.call("GetVersion");
        this.version.value = {
            obsVersion: version.obsVersion,
            obsWebSocketVersion: version.obsWebSocketVersion,
            rpcVersion: version.rpcVersion
        }
        this.platform.value = version.platform;
        console.log("[obs]GetVersion", version);
    }

    async getStats() {
        const stats = await this.ws?.call("GetStats");
        this.stats.value = stats;
        console.log("[obs]GetStats", stats);
    }

    async getVideoSettings() {
        const videoConfig = await this.ws?.call("GetVideoSettings");
        this.videoConfig.fpsDenominator.value = videoConfig.fpsDenominator;
        this.videoConfig.fpsNumerator.value = videoConfig.fpsNumerator;
        this.videoConfig.baseHeight.value = videoConfig.baseHeight;
        this.videoConfig.baseWidth.value = videoConfig.baseWidth;
        this.videoConfig.outputHeight.value = videoConfig.outputHeight;
        this.videoConfig.outputWidth.value = videoConfig.outputWidth;
        console.log("[obs]getVideoSettings", this.videoConfig);
    }

    async getSceneCollectionList(){
        const { currentSceneCollectionName, sceneCollections } = await this.ws?.call("GetSceneCollectionList");
        this.generalConfig.currentSCname.value = currentSceneCollectionName;
        this.generalConfig.sceneCollectionList.value = sceneCollections
        console.log("[obs]sceneCollections", sceneCollections);
        console.log("[obs]currentSceneCollectionName", currentSceneCollectionName);
    }

    async getProfileList(){
        const { currentProfileName, profiles } = await this.ws?.call("GetProfileList");
        this.generalConfig.currentProfile.value = currentProfileName;
        this.generalConfig.profileList.value = profiles
        console.log("[obs]profileList", profiles);
        console.log("[obs]currentProfile", currentProfileName);
    }

    async initWhenConnected() {
        await this.getVersions();
        await this.getStats();
        await this.getStatus();
        await this.getVideoSettings();
        await this.getSceneCollectionList();
        await this.getProfileList();
    }

    // async sendRequest(request: RequestBatchRequest): Promise<ResponseBatchMessage> {
    //     return await this.ws.send(request);
    // }

    registOBSEvent(){
        this.ws.on('CurrentPreviewSceneChanged', async (data) => {
            console.log('[obs]CurrentPreviewSceneChanged', data)
            WSEventAndRequestHistory.value.push({
                uuid: Math.random().toString(),
                type: 'event',
                name: 'CurrentPreviewSceneChanged',
                timestamp: new Date().toLocaleTimeString(),
                params: data,
            })
        });
        this.ws.on('SceneItemEnableStateChanged', async (data) => {
            console.log('[obs]SceneItemEnableStateChanged', data)
            WSEventAndRequestHistory.value.push({
                uuid: Math.random().toString(),
                type: 'event',
                name: 'SceneItemEnableStateChanged',
                timestamp: new Date().toLocaleTimeString(),
                params: data,
            })
        });
        this.ws.on('CurrentProgramSceneChanged', async (data) => {
            console.log('[obs]CurrentProgramSceneChanged', data)
            WSEventAndRequestHistory.value.push({
                uuid: Math.random().toString(),
                type: 'event',
                name: 'CurrentPreviewSceneChanged',
                timestamp: new Date().toLocaleTimeString(),
                params: data,
            })
        });
    }

}


export default OBS;