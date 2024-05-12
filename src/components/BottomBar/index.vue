<template>
    <div class="statusBar">
        <div class="leftItem container">
            <div class="websocket item">
                <div class="iconBtn" :class="WSconnected?'':'red'">
                    <LinkOutlined v-if="WSconnected" @click="disConnectOBS"/>
                    <DisconnectOutlined v-else @click="connectOBS" />
                </div>

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
        </div>
        <div class="rightItem container">
            <span>未连接</span>
            <span>未连接</span>
            <span>未连接</span>
            <span>未连接</span>
        </div>


    </div>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue'
import { NotificationPlacement, notification } from 'ant-design-vue';
import { WindowsOutlined,BranchesOutlined,LinkOutlined,DisconnectOutlined,AppleOutlined } from '@ant-design/icons-vue';
import { OBSConnectionConfig,WSconnected,WSversions,WSplatform } from '../../state';
import OBS from '../../obs';
import { watch } from 'vue';
const obs = OBS.getInstance()



// const connectParms = reactive({
//     host:'',
//     port:'',
//     password:''
// })

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
}

const disConnectOBS = async()=>{
    try{
        await obs.disconnect()
    }catch(e){
        console.log(e)
    }
}
    
</script>

<style scoped lang="scss">
.statusBar{
    display: flex;
    color: rgb(147,161,161);
    font-size: 12px;
    overflow: hidden;
    height:100%;
    width:100%;
    .container{
        .item:hover{
            background-color: rgba(147,161,161,0.4);
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

.iconBtn{
    height: 100%;
    padding: 0 5px;
    display: flex;
    align-items: center;
    background-color: rgba(42, 161, 152, 0.6);
    cursor: pointer;
    &.red{
    background-color: rgba(255, 0, 0, 0.6);
}
}

.bottomDivider{
    margin: 0 2px;
    height: 100%;
    background-color: rgba(147,161,161,0.2);
    top: 0;
}

</style>