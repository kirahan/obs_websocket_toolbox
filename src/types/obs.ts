import { OBSResponseTypes } from "obs-websocket-js";

export type T_OBS_Versions = {
    obsVersion:string,
    obsWebSocketVersion:string,
    rpcVersion:number,
}
export type T_OBS_Stats = OBSResponseTypes['GetStats']

export type T_OBS_ScreenShort = {
    imageFormat?:string;
    imageWidth?:number;
    imageHeight?:number;
    imageCompressionQuality?:number
}


// 用于记录各种类型的obs数据
// export type T_OBS_Select = {
//     scene
// }


