<template>
  <div class="event-summary-line">
    <p v-if="summary.description && showDescription" class="summary-desc">{{ summary.description }}</p>
    <p v-if="summary.parts.length" class="summary-parts">
      <template v-for="(part, index) in summary.parts" :key="`${part.label}-${index}`">
        <span v-if="part.label" class="part-label">{{ part.label }}:</span>
        <span class="part-value" :class="part.valueKind">{{ part.value }}</span>
        <span v-if="index < summary.parts.length - 1" class="part-sep">, </span>
      </template>
    </p>
    <p v-if="summary.status" class="summary-status" :class="summary.status.kind">
      {{ summary.status.text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { EventSummary } from '../utils/event-summary'

defineProps<{
  summary: EventSummary
  showDescription?: boolean
}>()
</script>

<style scoped lang="scss">
.event-summary-line {
  min-width: 0;
  line-height: 1.5;
}

.summary-desc {
  margin: 0 0 2px;
  font-size: 11px;
  color: var(--color-text-muted);
}

.summary-parts {
  margin: 0;
  font-size: 12px;
  color: var(--color-text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.part-label {
  color: var(--color-text-muted);
}

.part-value {
  font-weight: 600;
  color: var(--color-text);

  &.boolean-true {
    color: var(--color-success);
  }

  &.boolean-false {
    color: var(--color-error);
  }
}

.part-sep {
  color: var(--color-text-muted);
  font-weight: 400;
}

.summary-status {
  margin: 2px 0 0;
  font-size: 12px;
  font-weight: 500;

  &.success {
    color: var(--color-success);
  }

  &.error {
    color: var(--color-error);
  }

  &.info {
    color: var(--color-text-secondary);
    font-weight: 400;
  }
}
</style>
