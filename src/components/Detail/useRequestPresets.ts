import { computed } from 'vue'
import { useStorage } from '@vueuse/core'

export interface RequestPreset {
  id: string
  name: string
  group: string
  requestName: string
  payload: Record<string, unknown>
  createdAt: number
}

const DEFAULT_GROUP = 'Default'

export function useRequestPresets(requestName: () => string) {
  const presets = useStorage<RequestPreset[]>('requestPresets', [])

  const currentRequestPresets = computed(() =>
    presets.value
      .filter((preset) => preset.requestName === requestName())
      .sort((a, b) => b.createdAt - a.createdAt),
  )

  const groupedPresets = computed(() => {
    const groups: { group: string; presets: RequestPreset[] }[] = []
    for (const preset of currentRequestPresets.value) {
      let group = groups.find((item) => item.group === preset.group)
      if (!group) {
        group = { group: preset.group, presets: [] }
        groups.push(group)
      }
      group.presets.push(preset)
    }
    return groups
  })

  const savePreset = (
    name: string,
    group: string,
    payload: Record<string, unknown>,
  ) => {
    presets.value.unshift({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: name.trim() || requestName(),
      group: group.trim() || DEFAULT_GROUP,
      requestName: requestName(),
      payload,
      createdAt: Date.now(),
    })
  }

  const deletePreset = (id: string) => {
    presets.value = presets.value.filter((preset) => preset.id !== id)
  }

  return {
    groupedPresets,
    savePreset,
    deletePreset,
  }
}
