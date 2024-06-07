<template>
    <div class="no_p_m_body flex_column">
        <div class="basePanel flex_column">
            <div class="summary">
                <span>{{ elementInfo.title }}</span>
                <!-- 只有requests的时候才会显示发送按钮 -->
                <a-button v-if="elementInfo.type=='request'" size="small" type="primary" @click="sendRequest">{{$t('Actions.Send')}}</a-button>
                <a-tag color="magenta">{{ elementInfo.type }}</a-tag>
                <a-tag color="cyan" v-for="t in elementInfo.tags" :key="t">{{ t }}</a-tag>
            </div>

            <div class="describe" v-html="elementInfo?.des"></div>
            <!-- <div class="describe" v-html="elementInfo?.des">{{ elementInfo?.des }}</div> -->

        </div>

        <div class="resulePanel flex_row">
            <EventViewer></EventViewer>
        </div>

        <!-- 只有requests的时候才会显示query -->
        <div v-if="elementInfo.type=='request'" class="queryPanel flex_column">
            <h3>{{ $t('Titles.Detail.Query') }} 
                <a-button size="small" type="primary" @click="sendRequest">{{$t('Actions.Send')}}</a-button>
            </h3>
            <a-collapse v-model:activeKey="activeReq">
                <a-collapse-panel key="1" :header='$t("Actions.ClickToExpand")'>
                    <a-table
                        :columns="QueryColumns"
                        :data-source="requestParams"
                        bordered
                        size="small"
                        :pagination="false"
                        @resizeColumn="handleResizeColumn"
                    >
                        <template #bodyCell="{column,text,record}">
                            <!-- 如果require 给name前面增加一个* -->
                            <template v-if="column.dataIndex=='name'">
                                <span v-if="record.require" class="require">*</span>
                                <CaretRightOutlined v-if="record.type=='Object'" />
                                <span :class="!!record.parentNode ? 'ObjectChildNode' :''">{{text}}</span>
                            </template>

                            <template v-else-if="column.dataIndex=='model'">
                                <a-input 
                                v-if="record.type != 'Object'"
                                v-model:value="modelStorage[record.name]" 
                                :status="record.require && !modelStorage[record.name] ? 'error' : ''"
                                @blur="()=>inputBlur(record)"
                                type="text" />

                                <!-- 当type为Object时候需要创建子节点 -->
                                <a-textarea v-else
                                :disabled="!record.isCustomerObject"
                                :rows="4" 
                                v-model:value="modelStorage[record.name]" 
                                :status="record.require && !modelStorage[record.name] ? 'error' : ''"
                                ></a-textarea>


                                <!-- <a-input v-else type="text" :disabled="true" 
                                v-model:value="modelStorage[record.name]" 
                                ></a-input> -->
                            </template>
                            <template v-else>
                                {{text}}
                            </template>
                        </template>
                    </a-table>
                </a-collapse-panel>
            </a-collapse>
            
        </div>


        <div class="responsePanel flex_column">
            <h3>{{ $t('Titles.Detail.Response') }}</h3>
            <a-collapse v-model:activeKey="activeRes">
                <a-collapse-panel key="1" :header='$t("Actions.ClickToExpand")'>
                    <a-table
                        :columns="ResponseColumns"
                        :data-source="responseParams"
                        bordered
                        size="small"
                        :pagination="false"
                    >
                    </a-table>
                </a-collapse-panel>
            </a-collapse>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { I_Request_Params, obsRequestDetailData,QueryColumns,ResponseColumns } from "../../data/requests";
import EventViewer from "./EventViewer/index.vue";
import OBS from '../../obs';
import { WSEventAndRequestHistory } from "../../state";
import { computed } from "vue";
import { ref } from "vue";
import { message } from 'ant-design-vue';
import { CaretRightOutlined } from "@ant-design/icons-vue";

import { useStorage } from "@vueuse/core";
import { obsEventDetailData } from "../../data/events";
import { OBSRequestTypes } from "obs-websocket-js";
const obs = OBS.getInstance()

const props = defineProps({
    name: {
        type: String,
        required: true,
        default: ''
    }
})

const activeReq = ref(['1'])
const activeRes = ref(['1'])


// const modelRefs = ref({} as {[index:string]:any})
const modelStorage = useStorage('modelStorage',{} as {[index:string]:any})


const inputBlur = (record:I_Request_Params)=>{
    console.log('inputBlur',record);
    // 如果更新的是子节点则需要同步更新父节点的值
    updateParentNode(record)
}


// 用于更新父节点对象数据，最终转为json字符串
const updateParentNode = (childRecord:I_Request_Params)=>{
    const childNode = childRecord.name
    const parentNode = childRecord.parentNode
    if(!parentNode) return;
    const realChildKey = childRecord.name.replace(childRecord.parentNode+'.','')

    // 如果规定初始化或者parentNodes是空
    if(!modelStorage.value[parentNode]){
        modelStorage.value[parentNode] = '{}'
    }

    const parentObject = JSON.parse(modelStorage.value[parentNode]) || {};
    parentObject[realChildKey] = modelStorage.value[childNode] || childRecord.default || ''
    modelStorage.value[parentNode] = JSON.stringify(parentObject);
}

const handleResizeColumn = (w:number, col)=>{
    console.log(w,col);
    col.width = w;
}

const elementInfo = computed(() => {
    const elementType = props.name in obsRequestDetailData ? 'request' :
    props.name in obsEventDetailData ? 'event' : '';

    // 不是request也不是event
    if(!elementType) return {};

    // 已经排除了不是request也不是event的情况，所以可以直接用三元
    const elementData = elementType === 'request' ? obsRequestDetailData[props.name] : obsEventDetailData[props.name];

    return {
        key: elementData.key,
        type: elementType,
        title: elementData.title,
        des: elementData.des,
        tags: elementData.tags,
    };
});

const requestParams = computed(() => {
    if(props.name in obsRequestDetailData){
        // 循环申明每个参数的ref
        // @ts-ignore
        const params = obsRequestDetailData[props.name].requestParams as I_Request_Params[]
        console.log('params is:',params);
        params.map((item)=>{
            if(!Object.keys(modelStorage.value).includes(item.name)){
                modelStorage.value[item.name] = item.default || item.type == 'Object'? '{}' :'';

                // 有父节点，表示这是父节点对象中的一个key，需要更新父节点的值
                if(item.parentNode){
                    updateParentNode(item)
                }
            }
        })
        
        
        return params;
    }
    return [] as I_Request_Params[]
});

const responseParams = computed(() => {
    if(props.name in obsRequestDetailData){
        // @ts-ignore
        return obsRequestDetailData[props.name].responseParams
    }else if(props.name in obsEventDetailData){
        // @ts-ignore
        return obsEventDetailData[props.name].responseParams
    }
    return []
});

const validateParams = () => {
    let valid = true;
    // 检查是否有必填项为空
    requestParams.value?.forEach((item)=>{
        if(item.require && !modelStorage.value[item.name]){
            message.error(`${item.name} is required`);
            valid = false;
        }
    });
    return valid;
};

const sendRequest = () => {
    if(!obs.connected.value){
        console.error('websocket not connected');
        message.error('websocket not connected');
        return;
    }
    if(!props.name) {
        console.error('name is empty');
        message.error('name is empty');
        return;
    };

    const valid = validateParams();
    if(!valid) return;

    const query = {} as {[index:string]:any};
    requestParams.value?.forEach((item)=>{
        console.log(item);
        console.log(modelStorage.value[item.name]);

        const isChildNode = item.parentNode
        // 排除子节点
        if(!isChildNode && modelStorage.value[item.name]){
            const dataType = item.type.toLocaleLowerCase()
            switch(dataType){
                case 'string':
                    query[item.name] = modelStorage.value[item.name];
                    break
                case 'number':
                    query[item.name] = Number(modelStorage.value[item.name]);
                    break
                case 'boolean':
                    query[item.name] = modelStorage.value[item.name] === 'true';
                    break
                case 'object':
                    query[item.name] = JSON.parse(modelStorage.value[item.name]);
                    break
                default:
                    break
            }
        }
    });
    console.log('requestParams',query);
    console.log("sendRequest");

    // @ts-ignore
    WSEventAndRequestHistory.value.push({
            uuid: Math.random().toString(),
            type: "request",
            name: props.name,
            params: query,
            timestamp: new Date().toLocaleTimeString()
        });
    obs.sendRequest(props.name as keyof OBSRequestTypes,query);
};

</script>

<style scoped lang="scss">
.no_p_m_body{
    margin-left: 10px;
}
.flex_column{
    margin-bottom: 20px;
    .basePanel{
        .summary{
            margin-top: 10px;
            justify-content: space-between;
            font-size: 20px;
            span{
                margin: 0px 5px;
            }
        }
        .describe{
            margin-top: 10px;
            font-size: large;
        }
    }

    .resulePanel{
    }

    .queryPanel{
        .require{
            color: red;
        }

        .ObjectChildNode{
            padding-left: 20px;
        }
    }

    
    .queryPanel{
        input{
            background-color: aliceblue;
        }
    }
}
</style>