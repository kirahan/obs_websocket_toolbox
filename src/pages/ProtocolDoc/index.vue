<template>
  <div class="protocol-doc-embed">
    <Detail :name="docName" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Detail from '../../components/Detail/request.vue'

const route = useRoute()

const docName = computed(() => String(route.params.name || ''))
</script>

<style scoped lang="scss">
.protocol-doc-embed {
  min-height: 100vh;
  padding: var(--space-md);
  background: var(--color-bg);
  box-sizing: border-box;
}
</style>
