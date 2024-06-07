<template>
    <div class="statusBar">
        <div class="item">OBS Websocket Debug Tools</div>
        <div v-if="WSconnected" class="leftItem container"> </div>

        <div v-if="WSconnected" class="rightItem container">
            <div class="websocket item">
                <div class="flexdiv">
                    <a-divider class="bottomDivider" type="vertical" />
                    <span>Profile:{{ Profile }}</span>
                    <a-divider class="bottomDivider" type="vertical" />
                    <span>SC:{{ SceneCollection }}</span>
                </div>
            </div>
            <div class="websocket item">
                <div class="flexdiv">
                    <a-divider class="bottomDivider" type="vertical" />
                    <span>Base:{{ baseSize }}</span>
                    <a-divider class="bottomDivider" type="vertical" />
                    <span>Out:{{ outputSize }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref,reactive, computed } from 'vue'
import { WindowsOutlined,BranchesOutlined,LinkOutlined,DisconnectOutlined,AppleOutlined } from '@ant-design/icons-vue';
import { WSconnected,OBSVideoConfig,OBSGeneralConfig } from '../../state';


const baseSize = computed(()=> OBSVideoConfig.baseWidth.value + 'x' + OBSVideoConfig.baseHeight.value)
const outputSize = computed(()=> OBSVideoConfig.outputWidth.value + 'x' + OBSVideoConfig.outputHeight.value)

const Profile = computed(() => OBSGeneralConfig.currentProfile.value );
const SceneCollection = computed(() => OBSGeneralConfig.currentSCname.value );



</script>

<style scoped lang="scss">
.statusBar{
    display: flex;
    color: rgb(147,161,161);
    font-size: 14px;
    font-weight: bold;
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