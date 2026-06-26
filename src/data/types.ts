import { DataNode } from 'ant-design-vue/es/vc-tree/interface'

export interface I_Request_Params {
  name: string
  type: string
  des: string
  default: string
  require: boolean
  valueRestrictions: string
  defaultBehavior: string
  parentNode?: string
  isCustomerObject?: boolean
}

export interface I_Response_Params {
  name: string
  type: string
  des: string
  example?: string
}

export interface I_Request_Detail {
  key: string
  title: string
  des: string
  tags: string[]
  requestParams: I_Request_Params[]
  responseParams: I_Response_Params[]
}

export interface I_Event_Detail {
  key: string
  title: string
  des: string
  tags: string[]
  responseParams: I_Response_Params[]
}

export interface ProtocolParam {
  name: string
  type: string
  description: string
  required: boolean
  valueRestrictions: string
  defaultBehavior: string
  parentNode?: string
  isCustomerObject?: boolean
}

export interface ProtocolItem {
  key: string
  title: string
  description: string
  complexityRating: string
  rpcVersion: string
  websocketVersion: string
  requestParams?: ProtocolParam[]
  responseParams: ProtocolParam[]
}

export interface ProtocolCategory {
  title: string
  key: string
  tag: string
  items: ProtocolItem[]
}

export interface ProtocolData {
  meta: {
    source: string
    syncedAt: string
    protocolVersion: string
  }
  events: ProtocolCategory[]
  requests: ProtocolCategory[]
}

export interface RequestTreeNode extends DataNode {
  complexity_rating?: string
  rpc_version?: string
  websocket_version?: string
  obs_version?: string
}
