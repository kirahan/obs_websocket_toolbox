<template>
    <div class="statusBar">
        <div v-if="WSconnected" class="leftItem container">
            <div class="websocket item">
                <div   class="flexdiv">
                    <a-divider class="bottomDivider" type="vertical" />
                    <span>CPU:{{ CPU }}</span>
                    <span>memory:{{ Memory }}</span>
                    <span>DISK:{{ Disk }}</span>
                    <a-divider class="bottomDivider" type="vertical" />
                    <span>WebSocket:{{ WSversions.obsWebSocketVersion }}</span>
                    <a-divider class="bottomDivider" type="vertical" />
                    <span>OBS:{{ WSversions.obsVersion }}</span>
                </div>
            </div>
        </div>
        <div v-if="WSconnected" class="rightItem container">
            <span>未连接</span>
            <span>未连接</span>
            <span>未连接</span>
            <span>未连接</span>
        </div>
        <div v-else class="item">OBS Websocket Debug Tools</div>
    </div>
</template>

<script setup lang="ts">
import { ref,reactive, computed } from 'vue'
import { WindowsOutlined,BranchesOutlined,LinkOutlined,DisconnectOutlined,AppleOutlined } from '@ant-design/icons-vue';
import { WSstats,WSconnected,WSversions,WSplatform } from '../../state';

const CPU = computed(() => WSstats.value.cpuUsage?.toFixed(1) + '%');
const Memory = computed(() => WSstats.value.memoryUsage?.toFixed(1));
const Disk = computed(() => (WSstats.value.availableDiskSpace/1024)?.toFixed(1) + 'GB');


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