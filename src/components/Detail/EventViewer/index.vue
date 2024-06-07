<template>
    <div class="no_p_m_body flex_column">
        <h3>{{ $t('Titles.Detail.EventViewer') }}
            <a-button v-if="WSEventAndRequestHistory.length" size="small" type="primary" @click="clearAll">{{$t('Actions.Clear')}}</a-button>
        </h3>
        <a-collapse v-model:activeKey="activeKey">
            <a-collapse-panel key="1" :header='$t("Actions.ClickToExpand")'>
                <div class="content">
                    <div class="event_container flex_column">
                        <div v-for="item in WSEventAndRequestHistory"
                        @click="()=>{handleSelect(item)}" 
                        :key="item.name+item.timestamp" 
                        class="item flex_row" :class="item.type">
                            <!-- <UploadOutlined v-if="item.type=='request'"/> -->
                            <!-- <DownloadOutlined  v-else/> -->
                            
                            <div class="w_5">
                                <a-button type="text" size="small" @click.stop="handleRemove(item)">
                                    <template  #icon>
                                        <CloseOutlined />
                                    </template>
                                </a-button>
                            </div>
                            <div class="w_10">
                                <a-tag :color="item.type=='request'?'green':'red'">{{ item.type=='request'? 'Req': 'Res' }}</a-tag>
                            </div>
                            <div class="w_40">
                                <a-button type="text" size="small" @click.stop="handleSeeDoc(item)">
                                    {{ item.name }}
                                </a-button>
                            </div>

                            <div class="w_10">
                                <span>{{ item.timestamp }}</span>
                            </div>

                            <div class="w_40">
                                <span>{{ item.params }}</span>
                            </div>
                        </div>
                    </div>

                    <a-drawer
                        placement="right"
                        :closable="true"
                        :mask="false"
                        :title="selectedTitle"
                        :width="500"
                        :headerStyle="headerStyle"
                        :maskClosable="false"
                        :open="open"
                        :style="{ position: 'absolute' }"
                        @close="onClose"
                        
                        >
                        <template #extra>
                            <a-button type="text" shape="circle" size="small">
                                <template #icon>
                                    <CopyOutlined @click="handleCopy"/>
                                </template>
                            </a-button>
                        </template>


                        <div ref="resultRef">
                            <pretty-json>{{ selectedData }}</pretty-json>
                        </div>
                    </a-drawer>

                    <!-- <div v-if="selectedData" ref="resultRef" class="resultData">
                            <pretty-json>{{ selectedData }}</pretty-json>
                    </div> -->
                </div>
            </a-collapse-panel>
        </a-collapse>


        
    </div>
</template>

<script setup lang="ts">
import { CopyOutlined,CloseOutlined } from "@ant-design/icons-vue";
import { I_Event_item, WSEventAndRequestHistory, detailName, expandedKeys, getParentListFromKey, selectedKeys } from "../../../state";
import {ref} from 'vue'

const activeKey = ref(['1'])

const headerStyle = {
    height:'5px!',
    padding: '0px',
}
const selectedTitle = ref('')
const selectedData = ref('{}')
const resultRef = ref()
const open = ref(false)

const onClose = ()=>{
    open.value = false
}

const clearAll = ()=>{
    WSEventAndRequestHistory.value = []
}


const handleSeeDoc = (item:I_Event_item)=>{
    console.log('see doc',item)
    detailName.value = item.name
    selectedKeys.value = [item.name]
    const expandedList = getParentListFromKey(item.name)
    // console.log('expandedList',expandedList)
    // 如果父节点不再expandedKeys中，添加进去，展开父节点
    if(expandedList.length){
        expandedList.forEach(key=>{
            if(!expandedKeys.value.includes(key)){
                expandedKeys.value.push(key)
            }
        })
    }
    // console.log('expandedKeys',expandedKeys.value)
}

const handleRemove = (element:I_Event_item)=>{

    const newArr = WSEventAndRequestHistory.value.filter(record=>record!=element)
    WSEventAndRequestHistory.value = newArr

}

const handleCopy = ()=>{
    console.log('copy')
    navigator.clipboard.writeText(selectedData.value)
}

const handleSelect = (item:I_Event_item)=>{
    console.log('item select',item.name)
    console.log('item params',item.params)
    open.value = true
    selectedTitle.value = item.name
    selectedData.value = JSON.stringify(item.params || {})
    // remove dom element
    if(resultRef.value){
        resultRef.value.innerHTML = ''
        // create new dom element
        const pretty_json = document.createElement('pretty-json')
        pretty_json.innerHTML = JSON.stringify(item.params)
        // resultRef?.value?.appendChild(pretty_json)
        resultRef.value.appendChild(pretty_json)
    }
    
}

</script>

<style scoped lang="scss">
.no_p_m_body{
    width: 100%;
    margin-left: 0px!important;
    .content{
        position: relative;
        width: 100%;
        height: 300px;
        overflow: auto;
        .event_container{
            width: 100%;
        }
        .resultData{
            position: absolute;
            background-color: black;
            overflow-x: auto;
            padding-left: 20px;
            z-index: 99;
            top: 0px;
            right: 0px;
            width:400px;
            height: 300px;
        }
    }
    .w_5{
        width: 5%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .w_10{
        width: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .w_40{
        width: 40%;
        span{
            padding-left: 10px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
        }
    }
    .w200{
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: end;
    }
    .w400{
        width: 400px;
    }




    .item{
        margin-bottom: 5px;
    }
    .flex_row{
        align-items: center;
    }

    .greenbg{
        background-color: #68f9ba73;
    }
    .redbg{
        background-color: #f5ada998;
    }


    .request{
        background-color: #68f9ba73;
    }

    .response{
        background-color: #6893f973;
    }

    .error{
        background-color: #f5ada998;
    }

}

</style>