<template>
    <div class="main">
      <a-layout class="nobackground">
        <!-- <a-layout-header  class="header">
          
        </a-layout-header> -->
        <NavHeader >
            <template #middle>
              <HeaderBar></HeaderBar>
            </template>
          </NavHeader>
  
        <a-layout class="middle">
          <a-layout-sider :width="leftTreeWidth" theme="light" class="side">
              <div class="listContainer">
                  <div class="searchSection flex-al-center">
                      <!-- <a-input v-model:value="searchValue" type="text">
                          <template #prefix>
                              <SearchOutlined />
                          </template>
                      </a-input> -->
                      <a-auto-complete
                          v-model:value="searchValue"
                          allowClear
                          style="width: 100%"
                          :options="searchOptions"
                          :filter-option="filterOption"
                          @search="handleSearch"
                          placeholder="input here"
                      />
                      <a-button @click="handleSearch">search</a-button>
                  </div>
                  <div class="summarySection flex-al-center" :class="summarySelected?'selected':''"
                      @click="handleSummaryClick"
                  >
                      <ReadOutlined />
                      <span>{{ $t('debug.Titles.TreeList.summary') }}</span>
                  </div>
                  <div class="listSection">
                      <a-directory-tree
                          :showIcon="false"
                          v-model:selectedKeys="selectedKeys"
                          v-model:expandedKeys="expandedKeys"
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
          <div class="sash vertical" :class="sashClass" @mousedown="(event)=>{startResize(event,true,'leftTreeWidth')}"></div>
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
  import NavHeader from '../../components/NavHeader.vue';

  import HeaderBar from "../../components/HeaderBar/index.vue";
  import BottomBar from "../../components/BottomBar/index.vue";
  import TreeItem from "../../components/TreeList/treeItem.vue";
  import Detail from "../../components/Detail/request.vue";
  import { ref,computed,onMounted } from "vue";
  import { TreeProps } from "ant-design-vue";
  import { SearchOutlined,ReadOutlined,PushpinOutlined } from "@ant-design/icons-vue";
  import { t } from "../../locales";
  import {obsTreeData} from "../../data";
  import { onBeforeRouteUpdate } from "vue-router";
  import { DataNode } from "ant-design-vue/es/tree";
  import { detailName, selectedKeys, expandedKeys, getParentListFromKey,leftTreeWidth,pageWidgets } from "../../state";
  
  
  const searchValue = ref("");
  const summarySelected = ref(false);
  
  const searchOptions = ref([])
  let animationFrameId = null
  let isResizeDirectionX = true
  let widgetNameNeedResize = ''
  
  // 用来保持显示sash的class
  const sashClass = ref('')
  
  const handleSearch = ()=>{
    if(searchValue.value){
      summarySelected.value = false;
      detailName.value = searchValue.value
      selectedKeys.value = [searchValue.value]
      const expandedList = getParentListFromKey(searchValue.value)
      // 如果父节点不再expandedKeys中，添加进去，展开父节点
      if(expandedList.length){
          expandedList.forEach(key=>{
              if(!expandedKeys.value.includes(key)){
                  expandedKeys.value.push(key)
              }
          })
      }
      // console.log('====expandedList',expandedList)
    }
  }
  
  const filterOption = (input: string, option:any) => {
    return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
  };
  
  
  const expendData = (lists:DataNode[])=>{
    lists.map(list=>{
      if(list.children && list.children.length){
        expendData(list.children)
      }else{
        // @ts-ignore
        searchOptions.value.push({
          value: list.title,
          key: list.key
        })
      }
    })
  }
  
  onMounted(()=>{
    expendData(obsTreeData)
  })
  
  const handleSummaryClick = () => {
      summarySelected.value = true;
      selectedKeys.value = [];
  };
  
  const handleClick = (e: Event,data:any) => {
      summarySelected.value = false;
      detailName.value = data.key
      console.log('handleClick data',data)
      console.log('data key',data.key)
      console.log('expandedKeys',expandedKeys.value);
      console.log('selectedKeys',selectedKeys.value);
  };
  
  const startResize = (event:MouseEvent,isX:boolean,storageName)=>{  
    isResizeDirectionX = isX
    widgetNameNeedResize = storageName
    sashClass.value = 'ischanging'
    document.addEventListener('mousemove',resizeWidget)
    document.addEventListener('mouseup',finishResize)
  }
  
  const finishResize = ()=>{
    document.removeEventListener('mousemove',resizeWidget);
    sashClass.value = ''
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }
  
  
  const resizeWidget = (event:MouseEvent)=>{
    if (animationFrameId !== null) {
      return;
    }
    animationFrameId = requestAnimationFrame(() => {
      pageWidgets[widgetNameNeedResize].value = isResizeDirectionX?event.clientX:event.clientY;
      animationFrameId = null;
    });
  }
  
  
  </script>
  
  <style scoped lang="scss">
  .main {
    height: 100vh;
    width: 100vw;
  
    // .header {
    //   // background-color: rgb(0, 33, 43);
    //   padding: 0;
    //   height: 40px;
    // }
    .middle {
      // background-color: rgb(0, 33, 43);
      padding: 0;
      height: calc(100vh - 80px);
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
      height: 40px;
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
  