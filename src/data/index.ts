// export * from './events';
// export * from './requests';
import { ref } from 'vue';
import {obsRequestTreeData} from './requests';
import {obsEventTreeData} from './events';


export const obsTreeData = [
    {
        title: 'Requests',
        key: 'Requests',
        children: obsRequestTreeData
    },
    {
        title: 'Events',
        key: 'Events',
        children:obsEventTreeData
    }
]
