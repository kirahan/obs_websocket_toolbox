export interface VendorDefinition {
  vendorName: string
  description: string
  requests: { requestType: string; description: string; sampleData?: Record<string, unknown> }[]
  events: { eventType: string; description: string }[]
}

export const vendorRegistry: VendorDefinition[] = [
  {
    vendorName: 'obs-websocket',
    description: 'Built-in obs-websocket vendor extensions.',
    requests: [
      {
        requestType: 'GetVersion',
        description: 'Gets plugin and RPC version via vendor channel.',
        sampleData: {},
      },
    ],
    events: [],
  },
  {
    vendorName: 'my-plugin',
    description: 'Example third-party plugin vendor for testing.',
    requests: [
      {
        requestType: 'GetPluginStatus',
        description: 'Returns plugin runtime status.',
        sampleData: { detail: true },
      },
      {
        requestType: 'RunPluginAction',
        description: 'Runs a plugin action by id.',
        sampleData: { actionId: 'refresh' },
      },
    ],
    events: [
      { eventType: 'PluginStatusChanged', description: 'Emitted when plugin status changes.' },
      { eventType: 'PluginError', description: 'Emitted on plugin errors.' },
    ],
  },
]
