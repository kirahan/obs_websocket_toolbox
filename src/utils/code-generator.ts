import { OBSConnectionConfig } from '../state'

export type CodeLanguage = 'javascript' | 'python' | 'curl' | 'json'

export function generateRequestCode(
  language: CodeLanguage,
  requestType: string,
  requestData: Record<string, unknown>,
): string {
  const host = OBSConnectionConfig.host.value
  const port = OBSConnectionConfig.port.value
  const password = OBSConnectionConfig.password.value
  const payload = JSON.stringify(requestData ?? {}, null, 2)

  switch (language) {
    case 'javascript':
      return `import OBSWebSocket from 'obs-websocket-js'

const obs = new OBSWebSocket()
await obs.connect('ws://${host}:${port}', '${password}')
const data = await obs.call('${requestType}', ${payload})
console.log(data)`
    case 'python':
      return `import obsws_python as obs

cl = obs.ReqClient(host='${host}', port=${port}, password='${password}')
data = cl.${toPythonMethod(requestType)}(${toPythonArgs(requestData)})
print(data)`
    case 'curl':
      return `curl -X POST http://${host}:${port} \\
  -H 'Content-Type: application/json' \\
  -d '${JSON.stringify({
        op: 6,
        d: { requestType, requestData },
      })}'`
    case 'json':
      return JSON.stringify({ requestType, requestData }, null, 2)
    default:
      return payload
  }
}

export function generateEventSubscribeCode(language: CodeLanguage, eventName: string): string {
  const host = OBSConnectionConfig.host.value
  const port = OBSConnectionConfig.port.value
  const password = OBSConnectionConfig.password.value

  if (language === 'javascript') {
    return `import OBSWebSocket from 'obs-websocket-js'

const obs = new OBSWebSocket()
await obs.connect('ws://${host}:${port}', '${password}')
obs.on('${eventName}', (data) => {
  console.log('${eventName}', data)
})`
  }
  if (language === 'python') {
    return `import obsws_python as obs

cl = obs.ReqClient(host='${host}', port=${port}, password='${password}')
# Register callback for ${eventName} via obsws_python event API`
  }
  return `Subscribe to event: ${eventName}`
}

function toPythonMethod(requestType: string) {
  const snake = requestType.replace(/([A-Z])/g, (m, p1, i) => (i ? '_' : '') + p1.toLowerCase())
  return snake
}

function toPythonArgs(data: Record<string, unknown>) {
  const entries = Object.entries(data)
  if (!entries.length) return ''
  return entries.map(([k, v]) => `${k}=${JSON.stringify(v)}`).join(', ')
}
