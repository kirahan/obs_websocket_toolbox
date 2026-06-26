<template>
  <div class="module-layout">
    <NavHeader>
      <template v-if="$slots.header" #middle>
        <slot name="header" />
      </template>
    </NavHeader>
    <main class="module-layout-body">
      <slot />
    </main>
    <footer class="module-layout-footer">
      <BottomBar />
    </footer>
  </div>
</template>

<script setup lang="ts">
import NavHeader from './NavHeader.vue'
import BottomBar from './BottomBar/index.vue'
</script>

<style scoped lang="scss">
.module-layout {
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
  overflow: hidden;
}

.module-layout-body {
  flex: 1;
  overflow: auto;
  min-height: 0;
}

.module-layout-footer {
  height: var(--footer-height);
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-elevated);
  flex-shrink: 0;
}
</style>
