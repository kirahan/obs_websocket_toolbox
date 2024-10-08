<template>
    <div class="statusBar">
        <div class="leftItem container">
            <a-tooltip
            key="connectOBS"
            :title="$t('debug.Tooltops.connectOBS')"
            >
                    <div class="iconBtn" :class="WSconnected?'':'red'">
                        <LinkOutlined v-if="WSconnected" @click="disConnectOBS"/>
                        <DisconnectOutlined v-else @click="connectOBS" />
                    </div>
            </a-tooltip>
            
            <a-tooltip
            key="configOBS"
            :title="$t('debug.Tooltops.configOBS')"
            >
                <div class="websocket item">
                        <div class="flexdiv">
                            <BranchesOutlined />
                        </div>

                        <a-popover trigger="click" v-model:open="isConnectionConfigPopVisible">
                            <template #content>
                                <a-form layout="vertical" 
                                :model="connectParms"
                                @finish="setConnectParmsFinish"
                                @finishFailed="setConnectParmsFailed"
                                >
                                <!-- name跟字段名字要对应上否则匹配无法识别 -->
                                    <a-form-item
                                        label="Host"
                                        name="host"
                                        :rules="[{ required: true, message: 'Please input Host!' }]"
                                    >
                                        <a-input placeholder="Host" v-model:value="connectParms.host"/>
                                    </a-form-item>

                                    <a-form-item
                                        label="Port"
                                        name="port"
                                        :rules="[{ required: true, message: 'Please input Port!' }]"
                                    >
                                        <a-input placeholder="Port" v-model:value="connectParms.port"/>
                                    </a-form-item>

                                    <a-form-item
                                        label="Password"
                                        name="password"
                                    >
                                        <a-input placeholder="Password" v-model:value="connectParms.password"/>
                                    </a-form-item>

                                    <a-form-item >
                                        <a-button type="primary" html-type="submit">Set</a-button>
                                    </a-form-item>
                                </a-form>
                            </template>
                            <div class="flexdiv clickAble">
                                <span>{{ OBSConnectionConfig.host.value }}:{{ OBSConnectionConfig.port.value }}</span>
                                <span>{{ OBSConnectionConfig.password.value }}</span>
                            </div>
                        </a-popover>

                        
                        
                        <div class="flexdiv" v-if="WSconnected">
                            <a-divider class="bottomDivider" type="vertical" />
                            <AppleOutlined v-if="WSplatform == 'macos'" />
                            <WindowsOutlined v-else />
                            <a-divider class="bottomDivider" type="vertical" />
                            <span>WebSocket:{{ WSversions.obsWebSocketVersion }}</span>
                            <a-divider class="bottomDivider" type="vertical" />
                            <span>OBS:{{ WSversions.obsVersion }}</span>
                        </div>
                    </div>
            </a-tooltip>

        </div>

        <div v-if="WSconnected" class="rightItem container">
            <a-tooltip
            key="loopGetStat"
            :title="$t('debug.Tooltops.LoopGetStat')"
            >
                <div class="iconBtn">
                    <ReloadOutlined v-if="!looptimer" @click="loopGetStat"/>
                    <PauseOutlined v-else @click="pauseOBSstat"/>
                </div>
            </a-tooltip>
            
            <div class="websocket item">
                <div class="flexdiv">
                    <a-divider class="bottomDivider" type="vertical" />
                    <span>CPU:{{ CPU }}</span>
                    <a-divider class="bottomDivider" type="vertical" />
                    <span>Memory:{{ Memory }}</span>
                    <a-divider class="bottomDivider" type="vertical" />
                    <span>DISK:{{ Disk }}</span>
                </div>
            </div>
        </div>

    <a-tooltip></a-tooltip>

    </div>
</template>

<script setup lang="ts">
import { ref,computed } from 'vue'
import { NotificationPlacement, notification } from 'ant-design-vue';
import { WindowsOutlined,BranchesOutlined,LinkOutlined,DisconnectOutlined,AppleOutlined,ReloadOutlined,PauseOutlined } from '@ant-design/icons-vue';
import { OBSConnectionConfig,WSconnected,WSversions,WSplatform,WSstats } from '../../state';
import OBS from '../../obs';
import { watch } from 'vue';
import { scenesList,currentScene } from '../../obs/state';

const obs = OBS.getInstance()

const CPU = computed(() => WSstats.value.cpuUsage?.toFixed(1) + '%');
const Memory = computed(() => WSstats.value.memoryUsage?.toFixed(1) + 'MB' );
const Disk = computed(() => (WSstats.value.availableDiskSpace/1024)?.toFixed(1) + 'GB');

const looptimer = ref(0)


const isConnectionConfigPopVisible = ref(false)

const connectParms = ref({
    host:OBSConnectionConfig.host.value,
    port:OBSConnectionConfig.port.value,
    password:OBSConnectionConfig.password.value
})

watch(WSconnected,(newVal,oldVal)=>{
    console.log('websocket connected',newVal)
    if(newVal){
        console.log('websocket connected')
        notification.success({
            message: 'WebSocket Connected',
            description: 'WebSocket Connected',
            placement: 'bottomRight' as NotificationPlacement
        })
    }else{
        console.log('websocket disconnected')
        notification.error({
            message: 'WebSocket Disconnected',
            description: 'WebSocket Disconnected',
            placement: 'bottomRight' as NotificationPlacement
        })
    }
})

const setConnectParmsFinish = ()=>{
    OBSConnectionConfig.host.value = connectParms.value.host
    OBSConnectionConfig.port.value = connectParms.value.port
    OBSConnectionConfig.password.value = connectParms.value.password
    console.log('update connection config',OBSConnectionConfig)
    isConnectionConfigPopVisible.value = false
}

const setConnectParmsFailed = (err:any)=>{
    console.log('config is',connectParms.value)
    console.log('update connection config failed',err)
}



const connectOBS = async()=>{
    await obs.connect()
    loopGetStat()
}

const disConnectOBS = async()=>{
    
    try{
        await obs.disconnect()
    }catch(e){
        console.log(e)
    }
}

const loopGetStat = ()=>{
    looptimer.value = setInterval(
        ()=>{
        obs.getStats()
    },3000
    )
}
const pauseOBSstat = ()=>{
    clearInterval(looptimer.value)
    looptimer.value = 0
}

</script>

<style scoped lang="scss">
.statusBar{
    display: flex;
    color: rgb(147,161,161);
    font-size: 14px;
    font-weight: 500;
    overflow: hidden;
    height:100%;
    width:100%;
    .container{
        .item:hover{
            background-color: rgba(147,161,161,0.1);
        }
        .item:hover .flexdiv{
            background-color: rgba(147,161,161,0.2);
        }
    }
    .leftItem{
        flex: 1;
        display: flex;
        align-items: center;
        .websocket{}
    }
    .rightItem{
        flex-direction: row-reverse;
        display: flex;
        align-items: center;
    }
}


.item{
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 0 0 5px;
}

.flexdiv{
    height: 100%;
    padding: 0 2px;
    display: flex;
    align-items: center;
    span{
        padding: 0 2px;
    }
}

.clickAble{
    cursor: pointer;
}



.bottomDivider{
    margin: 0 2px;
    height: 100%;
    background-color: rgba(147,161,161,0.2);
    top: 0;
}

</style>