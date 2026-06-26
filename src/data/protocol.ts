import protocolData from './generated/protocol.json'
import { t } from '../locales'
import type {
  I_Event_Detail,
  I_Request_Detail,
  I_Request_Params,
  I_Response_Params,
  ProtocolCategory,
  ProtocolData,
  ProtocolItem,
  ProtocolParam,
  RequestTreeNode,
} from './types'

const data = protocolData as ProtocolData

const DEFAULT_TREE_META = {
  selectable: true,
  complexity_rating: '1/5',
  rpc_version: '1',
  websocket_version: '5.0.0',
  obs_version: '28',
}

function i18nKey(section: string, ...parts: string[]) {
  return `debug.${section}.${parts.join('.')}`
}

function translate(key: string, fallback: string) {
  const result = t(key)
  return result === key ? fallback : result
}

function buildRequestParam(requestKey: string, param: ProtocolParam): I_Request_Params {
  let desKey: string
  if (param.parentNode) {
    const childKey = param.name.slice(param.parentNode.length + 1)
    desKey = i18nKey('ReqParamsDes', param.parentNode, childKey)
  } else {
    desKey = i18nKey('ReqParamsDes', requestKey, param.name)
  }

  return {
    name: param.name,
    type: param.type,
    des: translate(desKey, param.description),
    default: param.type === 'Object' ? '{}' : '',
    require: param.required,
    valueRestrictions: param.valueRestrictions,
    defaultBehavior: param.defaultBehavior,
    parentNode: param.parentNode,
    isCustomerObject: param.isCustomerObject,
  }
}

function buildResponseParam(ownerKey: string, param: ProtocolParam): I_Response_Params {
  return {
    name: param.name,
    type: param.type,
    des: translate(i18nKey('ResParamsDes', ownerKey, param.name), param.description),
  }
}

function buildRequestDetail(item: ProtocolItem, tag: string): I_Request_Detail {
  return {
    key: item.key,
    title: item.title,
    des: translate(i18nKey('RequestDes', item.key), item.description),
    tags: [tag],
    requestParams: (item.requestParams || []).map((p) => buildRequestParam(item.key, p)),
    responseParams: item.responseParams.map((p) => buildResponseParam(item.key, p)),
  }
}

function buildEventDetail(item: ProtocolItem, tag: string): I_Event_Detail {
  return {
    key: item.key,
    title: item.title,
    des: translate(i18nKey('EventDes', item.key), item.description),
    tags: [tag],
    responseParams: item.responseParams.map((p) => buildResponseParam(item.key, p)),
  }
}

function buildTreeNodes(categories: ProtocolCategory[]): RequestTreeNode[] {
  return categories.map((cat) => ({
    title: cat.title,
    key: cat.key,
    children: cat.items.map((item) => ({
      ...DEFAULT_TREE_META,
      title: item.title,
      key: item.key,
      complexity_rating: item.complexityRating,
      rpc_version: item.rpcVersion,
      websocket_version: item.websocketVersion,
    })),
  }))
}

function buildDetailMap<T>(
  categories: ProtocolCategory[],
  builder: (item: ProtocolItem, tag: string) => T,
): Record<string, T> {
  const map: Record<string, T> = {}
  for (const cat of categories) {
    for (const item of cat.items) {
      map[item.key] = builder(item, cat.tag)
    }
  }
  return map
}

export const protocolMeta = data.meta

export const obsRequestTreeData = buildTreeNodes(data.requests)

export const obsEventTreeData = buildTreeNodes(data.events)

export const obsRequestDetailData = buildDetailMap(data.requests, buildRequestDetail)

export const obsEventDetailData = buildDetailMap(data.events, buildEventDetail)

export const QueryColumns = [
  {
    title: t('debug.QueryHeaders.Params'),
    dataIndex: 'name',
    resizable: true,
    width: 100,
  },
  {
    title: t('debug.QueryHeaders.Value'),
    dataIndex: 'model',
    resizable: true,
    width: 200,
  },
  {
    title: t('debug.QueryHeaders.Type'),
    dataIndex: 'type',
    width: 100,
  },
  {
    title: t('debug.QueryHeaders.Des'),
    dataIndex: 'des',
    width: 300,
  },
  {
    title: t('debug.QueryHeaders.ValueRestrictions'),
    dataIndex: 'valueRestrictions',
    width: 100,
  },
  {
    title: t('debug.QueryHeaders.DefaultBehavior'),
    dataIndex: 'defaultBehavior',
    width: 100,
  },
]

export const ResponseColumns = [
  {
    title: t('debug.QueryHeaders.Params'),
    dataIndex: 'name',
    width: '15%',
  },
  {
    title: t('debug.QueryHeaders.Type'),
    dataIndex: 'type',
    width: '15%',
  },
  {
    title: t('debug.QueryHeaders.Des'),
    dataIndex: 'des',
    width: '35%',
  },
]

export type {
  I_Event_Detail,
  I_Request_Detail,
  I_Request_Params,
  I_Response_Params,
} from './types'
