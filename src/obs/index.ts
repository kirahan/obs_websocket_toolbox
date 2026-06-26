
import OBSWebSocket, { RequestBatchExecutionType, RequestBatchRequest, ResponseBatchMessage, ResponseMessage } from 'obs-websocket-js'
import { OBSConnectionConfig, OBSGeneralConfig, OBSVideoConfig, OBSstatus, WSEventAndRequestHistory, WSconnected, WSplatform, WSstats, WSversions } from '../state';
import { OBSEventTypes, OBSRequestTypes, OBSResponseTypes } from 'obs-websocket-js'
import { obsEventDetailData } from '../data/events';
import { message } from 'ant-design-vue';
import { currentScene, inputsList, scenesList, transitionsList } from './state';
import { isSimulatorConnection } from '../simulator/connection';
import { mockObsClient } from '../simulator';

type ObsRpcClient = {
    call(request: string, data?: Record<string, unknown>): Promise<any>
    on(event: string, callback: (data: unknown) => void): void
    disconnect(): Promise<void>
    connect(url: string, password?: string): Promise<unknown>
}

type DiffSnapshotValue = string | number | boolean | unknown[] | Record<string, unknown>

export type OBSDiffSnapshot = Record<string, DiffSnapshotValue>

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

    private getClient(): ObsRpcClient {
        return (isSimulatorConnection() ? mockObsClient : this.ws) as ObsRpcClient
    }

    async connect(){
        if(this.connected.value) return;
        try {
            if (isSimulatorConnection()) {
                console.log('[obs]连接模拟器')
                const res = await mockObsClient.connect()
                console.log('[obs]模拟器连接成功', res)
                this.connected.value = true
                await this.initWhenConnected()
                this.registOBSEvent()
                return
            }
            const wsUrl = `ws://${this.config.host.value}:${this.config.port.value}`
            console.log("[obs]开始连接", wsUrl);
            const res = await this.ws.connect(wsUrl, this.config.password.value);
            console.log("[obs]连接成功", res);
            this.connected.value = true;
            await this.initWhenConnected();
            this.registOBSEvent();
        } catch (error) {
            console.error("[obs]连接失败", error);
            message.error("[obs]连接失败"+JSON.stringify(error));
            this.connected.value = false;
        }
    };

    async disconnect(){
        if(!this.connected.value) return;
        try {
            console.log("[obs]开始断开连接");
            await this.getClient().disconnect();
            console.log("[obs]断开连接成功");
            this.connected.value = false;
        } catch (error) {
            console.error("[obs]断开连接失败", error);
            this.connected.value = true;
        }
    };

    async getStatus() {
        const SS = await this.getClient().call("GetStreamStatus");
        const RS = await this.getClient().call("GetRecordStatus");
        const { studioModeEnabled } = await this.getClient().call("GetStudioModeEnabled");

        this.status.isStreaming.value = !!SS.outputActive;
        this.status.isRecording.value = !!RS.outputActive;
        this.status.isStudioModule.value = !!studioModeEnabled;
        console.log("[obs]obsState", this.status);
        console.log("[obs]isStudioModule", this.status.isStudioModule.value);
    }

    async getVersions() {
        const version = await this.getClient().call("GetVersion");
        this.version.value = {
            obsVersion: version.obsVersion,
            obsWebSocketVersion: version.obsWebSocketVersion,
            rpcVersion: version.rpcVersion
        }
        this.platform.value = version.platform;
        console.log("[obs]GetVersion", version);
    }

    async getStats() {
        const stats = await this.getClient().call("GetStats");
        this.stats.value = stats;
        console.log("[obs]GetStats", stats);
    }

    async getVideoSettings() {
        const videoConfig = await this.getClient().call("GetVideoSettings");
        this.videoConfig.fpsDenominator.value = videoConfig.fpsDenominator;
        this.videoConfig.fpsNumerator.value = videoConfig.fpsNumerator;
        this.videoConfig.baseHeight.value = videoConfig.baseHeight;
        this.videoConfig.baseWidth.value = videoConfig.baseWidth;
        this.videoConfig.outputHeight.value = videoConfig.outputHeight;
        this.videoConfig.outputWidth.value = videoConfig.outputWidth;
        console.log("[obs]getVideoSettings", this.videoConfig);
    }

    async getSceneCollectionList(){
        const { currentSceneCollectionName, sceneCollections } = await this.getClient().call("GetSceneCollectionList");
        this.generalConfig.currentSCname.value = currentSceneCollectionName;
        this.generalConfig.sceneCollectionList.value = sceneCollections
        console.log("[obs]sceneCollections", sceneCollections);
        console.log("[obs]currentSceneCollectionName", currentSceneCollectionName);
    }

    async getProfileList(){
        const { currentProfileName, profiles } = await this.getClient().call("GetProfileList");
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
        await this.getSceneList();
        await this.getInputList();
        await this.getSceneTransitionList();
        
    }

    async getSceneList() {
        const { scenes, currentProgramSceneName } = await this.getClient().call("GetSceneList");
        scenesList.value = scenes.map((scene, index) => ({
            name: scene.sceneName as string,
            sceneIndex: index
        }));
        currentScene.value = currentProgramSceneName;
        console.log("[obs]场景列表", scenes);
        console.log("[obs]当前场景", currentProgramSceneName);
    }

    async getInputList() {
        const { inputs } = await this.getClient().call("GetInputList");
        inputsList.value = inputs.map((input) => ({
            name: input.inputName as string,
            kind: input.inputKind as string,
            uuid: input.inputUuid as string | undefined
        }));
        console.log("[obs]输入列表", inputs);
    }

    async getSceneTransitionList() {
        const { transitions } = await this.getClient().call("GetSceneTransitionList");
        transitionsList.value = transitions.map((transition) => ({
            name: transition.transitionName as string,
            kind: transition.transitionKind as string | undefined,
            uuid: transition.transitionUuid as string | undefined
        }));
        console.log("[obs]转场列表", transitions);
    }

    private async safeSnapshotCall<T>(fallback: unknown, call: () => Promise<T>): Promise<any> {
        try {
            return await call()
        } catch (error) {
            console.warn('[obs]diff snapshot failed', error)
            return fallback
        }
    }

    async captureDiffSnapshot(): Promise<OBSDiffSnapshot> {
        const sceneList = await this.safeSnapshotCall(
            { currentProgramSceneName: '', scenes: [] as any[] },
            () => this.getClient().call('GetSceneList'),
        )
        const inputList = await this.safeSnapshotCall(
            { inputs: [] as any[] },
            () => this.getClient().call('GetInputList'),
        )
        const transition = await this.safeSnapshotCall(
            { transitionName: '', transitionDuration: 0 },
            () => this.getClient().call('GetCurrentSceneTransition'),
        )
        const streamStatus = await this.safeSnapshotCall(
            { outputActive: false, outputTimecode: '' },
            () => this.getClient().call('GetStreamStatus'),
        )
        const recordStatus = await this.safeSnapshotCall(
            { outputActive: false, outputTimecode: '' },
            () => this.getClient().call('GetRecordStatus'),
        )
        const profileList = await this.safeSnapshotCall(
            { currentProfileName: '', profiles: [] as string[] },
            () => this.getClient().call('GetProfileList'),
        )
        const sceneCollectionList = await this.safeSnapshotCall(
            { currentSceneCollectionName: '', sceneCollections: [] as string[] },
            () => this.getClient().call('GetSceneCollectionList'),
        )

        return {
            currentProgramScene: sceneList.currentProgramSceneName,
            scenes: sceneList.scenes.map((scene) => scene.sceneName as string),
            inputs: inputList.inputs.map((input) => ({
                name: input.inputName,
                kind: input.inputKind,
                uuid: input.inputUuid,
            })),
            currentTransition: {
                name: transition.transitionName,
                duration: transition.transitionDuration,
            },
            stream: {
                active: streamStatus.outputActive,
            },
            record: {
                active: recordStatus.outputActive,
            },
            currentProfile: profileList.currentProfileName,
            profiles: profileList.profiles,
            currentSceneCollection: sceneCollectionList.currentSceneCollectionName,
            sceneCollections: sceneCollectionList.sceneCollections,
        }
    }

    async sendRequest(request: keyof OBSRequestTypes,query?:any) {
        try {
            const res = await this.getClient().call(request,query)
            // @ts-ignore
            res && WSEventAndRequestHistory.value.push({
                uuid: Math.random().toString(),
                type: "response",
                name: request,
                params: res as any,
                timestamp: new Date().toLocaleTimeString()
            });
            console.log('===========ws====',res);
            message.success('Send Request Success');
            return { ok: true, response: res as unknown }
        } catch (err) {
            const error = err as Error
            // 插入错误信息
            WSEventAndRequestHistory.value.push({
                uuid: Math.random().toString(),
                type: "error",
                name: request,
                params: error.message as any,
                timestamp: new Date().toLocaleTimeString()
            });
            console.error('===========ws===err=',error.message)
            message.error('Send Request Error:'+error.message);
            return { ok: false, error: error.message }
        }
    }

    registOBSEvent(){
        const client = this.getClient()
        for(let item in obsEventDetailData){
            const eventName = obsEventDetailData[item].key
            // @ts-ignore
            client.on(eventName,async(data)=>{
                console.log(`[obs event]${eventName}:`, data)
                WSEventAndRequestHistory.value.push({
                    uuid: Math.random().toString(),
                    type: 'response',
                    name: eventName,
                    timestamp: new Date().toLocaleTimeString(),
                    params: data,
                })
            })
        }
        if (!isSimulatorConnection()) {
            this.ws.on('ConnectionClosed',()=>{
                this.connected.value = false
            })
            this.ws.on('ConnectionError',(err)=>{
                console.error('ConnectionError',err)
            })
        }
    }



}


export default OBS;
