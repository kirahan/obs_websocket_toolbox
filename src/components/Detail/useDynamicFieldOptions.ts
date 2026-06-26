import { computed } from 'vue'
import { OBSGeneralConfig } from '../../state'
import { inputsList, scenesList, transitionsList } from '../../obs/state'
import type { I_Request_Params } from '../../data/requests'

export interface DynamicFieldOptions {
  options: { value: string; label?: string }[]
  sourceLabel: string
}

function uniqueOptions(values: (string | undefined)[]) {
  return [...new Set(values.filter((value): value is string => Boolean(value)))]
    .sort((a, b) => a.localeCompare(b))
    .map((value) => ({ value }))
}

export function useDynamicFieldOptions(field: I_Request_Params) {
  return computed<DynamicFieldOptions | null>(() => {
    const fieldName = field.name.toLowerCase()

    if (field.type !== 'String') return null

    if (fieldName.endsWith('scenename')) {
      return {
        sourceLabel: 'OBS scenes',
        options: uniqueOptions(scenesList.value.map((scene) => scene.name)),
      }
    }

    if (fieldName.endsWith('inputname')) {
      return {
        sourceLabel: 'OBS inputs',
        options: uniqueOptions(inputsList.value.map((input) => input.name)),
      }
    }

    if (fieldName.endsWith('sourcename')) {
      return {
        sourceLabel: 'OBS sources',
        options: uniqueOptions([
          ...scenesList.value.map((scene) => scene.name),
          ...inputsList.value.map((input) => input.name),
        ]),
      }
    }

    if (fieldName.endsWith('transitionname')) {
      return {
        sourceLabel: 'OBS transitions',
        options: uniqueOptions(transitionsList.value.map((transition) => transition.name)),
      }
    }

    if (fieldName.endsWith('profilename')) {
      return {
        sourceLabel: 'OBS profiles',
        options: uniqueOptions(OBSGeneralConfig.profileList.value),
      }
    }

    if (fieldName.endsWith('scenecollectionname')) {
      return {
        sourceLabel: 'OBS scene collections',
        options: uniqueOptions(OBSGeneralConfig.sceneCollectionList.value),
      }
    }

    return null
  })
}
