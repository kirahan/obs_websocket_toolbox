// export * from './events';
// export * from './requests';
import { ref } from 'vue';
import {obsRequestTreeData} from './requests';


export const obsTreeData = [
    {
        title: 'Requests',
        key: 'Requests',
        children: obsRequestTreeData
    },
    {
        title: 'Events',
        key: 'Events',
        children:[]
    }
]
