<template>
    <div class="no_p_m_body flex_body" >
        <!-- 具体的请求 -->
        <div v-if="options.websocket_version" :class="supported?'':'notsupported'">
            <a-tag  class="version" color="green">{{ options.websocket_version }}</a-tag>
            <span class="title">{{ options.title }}</span>
            <a-tag v-if="!supported" color="red">Not Supported</a-tag>
            <!-- <MoreOutlined /> -->
        <!-- <span v-if="options.complexity_rating" class="rating">{{ options.complexity_rating }}</span> -->
        </div>
        <div v-else-if="options.key=='Requests'">
            <PhoneOutlined />
            <span class="title">{{ options.title }}</span>
        </div>
        <div v-else-if="options.key=='Events'">
            <BellOutlined />
            <span class="title">{{ options.title }}</span>
        </div>
        <!-- 父级 显示图标和计数 -->
        <div v-else>
            <FolderOutlined />
            <span class="title">{{ options.title }}</span>
            <a-badge count="5" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType, defineProps, ref } from 'vue'
import { FolderOutlined,BellOutlined,PhoneOutlined,MoreOutlined } from "@ant-design/icons-vue";
import { computed } from 'vue';
import { WSversions } from "../../state";
import semver from 'semver';
import {obsTreeData} from "../../data";


interface TreeItemProps {
    title: string,
    key: string,
    selectable?: boolean,
    complexity_rating?: string,
    rpc_version?: string,
    websocket_version: string,
    obs_version?: string
}


const supported = computed(() => {
    const localVersion = WSversions.value.obsWebSocketVersion || '0.0.0'
    const remoteVersion = props.options.websocket_version || '5.0.0'
    return semver.gt(localVersion,remoteVersion)
})


const props = defineProps({
    options: {
        type: Object as PropType<TreeItemProps>,
        required: true,
        default: {
            title: "",
            key: "",
            selectable: true,
            complexity_rating: "1/5",
            rpc_version: "1",
            websocket_version: "5.0.0",
            obs_version: "28"
        }
    }
})

</script>

<style scoped lang="scss">

.flex_body{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    span{
        margin: 0 10px;
        font-size: 20px;
    }
    .title{
        color : #000;
    }
    .rating{
        color: red;
    }
}

.notsupported{
    opacity: 0.5;

}


</style>