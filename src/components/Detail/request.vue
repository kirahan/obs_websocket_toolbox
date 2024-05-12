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

            <div class="describe">{{ elementInfo?.des }}</div>

        </div>

        <div class="resulePanel flex_row">
            <EventViewer></EventViewer>
        </div>


        <div class="queryPanel flex_column">
            <h3>{{ $t('Titles.Detail.Query') }}</h3>
            <!-- 只有requests的时候才会显示发送按钮 -->
            <a-button v-if="elementInfo.type=='request'" size="small" type="primary" @click="sendRequest">{{$t('Actions.Send')}}</a-button>
            <!-- <a-input v-for="item in requestParams" v-model:value="useStorage(item.name,'').value" type="text" /> -->
            <!-- <input v-for="item in requestParams" v-model="modelStorage[item.name]" type="text" /> -->
            <!-- <a-input v-for="item in requestParams" v-model:value="modelStorage[item.name]" type="text" /> -->

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
                        {{text}}
                    </template>

                    <template v-else-if="column.dataIndex=='model'">

                        <a-input 
                        v-model:value="modelStorage[record.name]" 
                        :status="record.require && !modelStorage[record.name] ? 'error' : ''"
                        @blur="()=>inputBlur(record)"
                        type="text" />

                    </template>
                    <template v-else>
                        {{text}}
                    </template>
                </template>
            </a-table>
        </div>


        <div class="responsePanel flex_column">
            <h3>{{ $t('Titles.Detail.Response') }}</h3>
            <a-table
                :columns="ResponseColumns"
                :data-source="responseParams"
                bordered
                size="small"
                :pagination="false"
            >
            </a-table>
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

import { useStorage } from "@vueuse/core";
import { obsEventDetailData } from "../../data/events";
const obs = OBS.getInstance()

const props = defineProps({
    name: {
        type: String,
        required: true,
        default: ''
    }
})

// const modelRefs = ref({} as {[index:string]:any})
const modelStorage = useStorage('modelStorage',{})


const inputBlur = (record:I_Request_Params)=>{
    console.log('inputBlur',record);
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
        
        params.map((item)=>{
            if(!Object.keys(modelStorage.value).includes(item.name)){
                modelStorage.value[item.name] = item.default || '';
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
        if(modelStorage.value[item.name]){
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
                default:
                    break
            }
        }
    });
    console.log('requestParams',query);
    console.log("sendRequest");

    // @ts-ignore
    WSEventAndRequestHistory.value.push({
            type: "request",
            name: props.name,
            params: query,
            timestamp: new Date().toLocaleTimeString()
        });
    // @ts-ignore
    obs.ws.call(props.name,query).then((res)=>{
        // @ts-ignore
        res && WSEventAndRequestHistory.value.push({
            type: "response",
            name: props.name,
            params: res as any,
            timestamp: new Date().toLocaleTimeString()
        });
        console.log('===========ws====',res);
        message.success('Send Request Success');
    }).catch((err)=>{
        // 插入错误信息
        WSEventAndRequestHistory.value.push({
            type: "error",
            name: props.name,
            params: err.message as any,
            timestamp: new Date().toLocaleTimeString()
        });
        console.error('===========ws===err=',err.message)
        message.error('Send Request Error:'+err.message);
    });


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
    }

    
    .queryPanel{
        input{
            background-color: aliceblue;
        }
    }
}
</style>