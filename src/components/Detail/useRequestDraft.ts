import { computed, watch, type ComputedRef } from 'vue'
import { useStorage } from '@vueuse/core'
import type { I_Request_Params } from '../../data/requests'
import {
  getDefaultDraftValue,
  isEmptyDraftValue,
  parseDraftValue,
  validateDraftValue,
  type RequestDraftValue,
} from './requestFieldAdapters'

type RequestDraft = Record<string, RequestDraftValue>
type RequestDraftStore = Record<string, RequestDraft>

function getRequestStorageKey(requestName: string) {
  return requestName || '__empty__'
}

function getChildKey(field: I_Request_Params) {
  if (!field.parentNode) return field.name
  return field.name.slice(field.parentNode.length + 1)
}

export function useRequestDraft(
  requestName: ComputedRef<string>,
  requestParams: ComputedRef<I_Request_Params[]>,
) {
  const requestDrafts = useStorage<RequestDraftStore>('requestDrafts', {})

  const draft = computed({
    get() {
      const key = getRequestStorageKey(requestName.value)
      if (!requestDrafts.value[key]) requestDrafts.value[key] = {}
      return requestDrafts.value[key]
    },
    set(value: RequestDraft) {
      requestDrafts.value[getRequestStorageKey(requestName.value)] = value
    },
  })

  const childParentNames = computed(() => {
    return new Set(
      requestParams.value
        .map((field) => field.parentNode)
        .filter((parentName): parentName is string => Boolean(parentName)),
    )
  })

  const hasChildFields = (field: I_Request_Params) => childParentNames.value.has(field.name)

  const resetDraft = () => {
    draft.value = {}
  }

  watch(
    [requestName, requestParams],
    () => {
      const nextDraft = { ...draft.value }
      for (const field of requestParams.value) {
        if (!(field.name in nextDraft)) {
          nextDraft[field.name] = getDefaultDraftValue(field)
        }
      }
      draft.value = nextDraft
    },
    { immediate: true },
  )

  const validate = () => {
    const errors: string[] = []
    for (const field of requestParams.value) {
      if (field.parentNode && isEmptyDraftValue(draft.value[field.name])) continue
      const error = validateDraftValue(field, draft.value[field.name])
      if (error) errors.push(error)
    }
    return errors
  }

  const buildPayload = () => {
    const errors = validate()
    if (errors.length) return { errors, payload: null }

    const payload: Record<string, unknown> = {}
    const fields = requestParams.value
    const fieldsByName = new Map(fields.map((field) => [field.name, field]))

    for (const field of fields) {
      if (field.parentNode) continue

      if (hasChildFields(field)) {
        const parentPayload: Record<string, unknown> = {}
        for (const childField of fields.filter((item) => item.parentNode === field.name)) {
          const childValue = draft.value[childField.name]
          if (!childField.require && isEmptyDraftValue(childValue)) continue

          const result = parseDraftValue(childField, childValue)
          if ('error' in result) return { errors: [result.error], payload: null }
          if (result.value !== undefined) parentPayload[getChildKey(childField)] = result.value
        }

        const parentValue = draft.value[field.name]
        if (Object.keys(parentPayload).length) {
          payload[field.name] = parentPayload
        } else if (field.require || !isEmptyDraftValue(parentValue)) {
          const result = parseDraftValue(field, parentValue)
          if ('error' in result) return { errors: [result.error], payload: null }
          if (result.value !== undefined) payload[field.name] = result.value
        }
        continue
      }

      const value = draft.value[field.name]
      if (!field.require && isEmptyDraftValue(value)) continue

      const result = parseDraftValue(field, value)
      if ('error' in result) return { errors: [result.error], payload: null }
      if (result.value !== undefined) payload[field.name] = result.value
    }

    for (const parentName of childParentNames.value) {
      if (!fieldsByName.has(parentName)) {
        payload[parentName] = payload[parentName] || {}
      }
    }

    return { errors: [], payload }
  }

  const applyPayload = (payload: Record<string, unknown>) => {
    const nextDraft = { ...draft.value }
    for (const field of requestParams.value) {
      if (field.parentNode) {
        const parentValue = payload[field.parentNode]
        if (parentValue && typeof parentValue === 'object' && !Array.isArray(parentValue)) {
          const childValue = (parentValue as Record<string, unknown>)[getChildKey(field)]
          nextDraft[field.name] = childValue === undefined ? null : childValue as RequestDraftValue
        }
        continue
      }

      const value = payload[field.name]
      if (value === undefined) {
        nextDraft[field.name] = getDefaultDraftValue(field)
      } else if (typeof value === 'object' && value !== null) {
        nextDraft[field.name] = JSON.stringify(value, null, 2)
      } else {
        nextDraft[field.name] = value as RequestDraftValue
      }
    }
    draft.value = nextDraft
  }

  return {
    draft,
    hasChildFields,
    resetDraft,
    validate,
    buildPayload,
    applyPayload,
  }
}
