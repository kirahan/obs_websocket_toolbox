import { ref } from 'vue';
import { obsRequestTreeData } from '../data/requests';
import { obsEventTreeData } from '../data/events';

export * from './websocket';

export const detailName = ref('')
export const selectedKeys = ref<string[]>([]);
export const expandedKeys = ref<string[]>([]);


export const getParentListFromKey = (key: string) => {
    let parentList = [];
    obsRequestTreeData.forEach((item) => {
        if (item?.children?.some((subItem) => subItem.key === key)) {
            parentList = ['Requests',item.key];
            return;
        }
    });
    obsEventTreeData.forEach((item) => {
        if (item?.children?.some((subItem) => subItem.key === key)) {
            parentList = ['Events',item.key];
            return;
        }
    });
    return parentList;
};