<template>
  <div class="main">
    <a-layout class="nobackground">
      <a-layout-header  class="header">
        <HeaderBar></HeaderBar>
      </a-layout-header>

      <a-layout class="middle">
        <a-layout-sider width="400" theme="light" class="side">
            <div class="listContainer">
                <div class="searchSection flex-al-center">
                    <a-input v-model:value="searchValue" type="text">
                        <template #prefix>
                            <SearchOutlined />
                        </template>
                    </a-input>
                    <!-- <a-auto-complete
                        v-model:value="searchValue"
                        allowClear
                        style="width: 200px"
                        placeholder="input here"
                    /> -->
                    <a-button>search</a-button>
                </div>
                <div class="summarySection flex-al-center" :class="summarySelected?'selected':''"
                    @click="handleSummaryClick"
                >
                    <ReadOutlined />
                    <span>{{ $t('Titles.TreeList.summary') }}</span>
                </div>
                <div class="listSection">
                    <a-directory-tree
                        :showIcon="false"
                        v-model:selectedKeys="selectedKeys"
                        :tree-data="obsTreeData"
                        @click="handleClick"
                    >
                    <template #title="itemData">
                        <TreeItem :options="itemData"></TreeItem>
                    </template>
                    </a-directory-tree>
                </div>
            </div>
            
        </a-layout-sider>
        <a-layout-content class="content">
          <Detail :name="detailName"></Detail>
        </a-layout-content>
      </a-layout>

      <a-layout-footer class="footer">
        <BottomBar></BottomBar>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import HeaderBar from "../../components/HeaderBar/index.vue";
import BottomBar from "../../components/BottomBar/index.vue";
import TreeItem from "../../components/TreeList/treeItem.vue";
import Detail from "../../components/Detail/request.vue";
import { ref } from "vue";
import { TreeProps } from "ant-design-vue";
import { SearchOutlined,ReadOutlined,PushpinOutlined } from "@ant-design/icons-vue";
import { t } from "../../locales";
import {obsTreeData} from "../../data";


const searchValue = ref("");
const summarySelected = ref(false);
const detailName = ref('')

const selectedKeys = ref<string[]>([]);

const handleSummaryClick = () => {
    summarySelected.value = true;
    selectedKeys.value = [];
};

const handleClick = (e: Event,data:any) => {
    summarySelected.value = false;
    detailName.value = data.key
    console.log(data);
    console.log(data.key)
};



</script>

<style scoped lang="scss">
.main {
  height: 100vh;
  width: 100vw;

  .header {
    background-color: rgb(0, 33, 43);
    padding: 0;
    height: 30px;
  }
  .middle {
    // background-color: rgb(0, 33, 43);
    padding: 0;
    height: calc(100vh - 60px);
    .listContainer{
        overflow: auto;
        // background-color: aqua;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        // overflow: hidden;
        .searchSection, .summarySection{
            padding: 2px 10px;
            gap: 10px;
            intput{
                flex: 1;
            }
        }
        .summarySection:hover{
            background-color: rgba(94, 94, 94, 0.1);
        }
    }
    .content{
      overflow-y: scroll;
      &::-webkit-scrollbar{
        width: 5px;
        background-color: #F5F5F5;
      }
      &::-webkit-scrollbar-thumb{
        background-color: #666;
        border-radius: 2px;
      }
    }

  }

  .footer {
    background-color: rgb(0, 33, 43);
    padding: 0;
    height: 30px;
  }
}

.selected {
    background-color: #1677ff;
    // color: white;
}

.selected:hover {
    background-color: #1677ff !important;
    // color: white;
}

</style>
