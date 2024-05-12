import { I_Response_Params } from "./requests"

export interface I_Event_Detail {
    key: string,
    title: string,
    des: string,
    tags: string[],
    responseParams: I_Response_Params[]
}


export const obsEventDetailData:{[index:string]:I_Event_Detail} = {}