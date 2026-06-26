<template>
  <div class="main-page">
    <NavHeader />
    <main class="main-content">
      <div class="hero">
        <h1>{{ $t('main.title') }}</h1>
        <p class="subtitle">{{ $t('main.subtitle') }}</p>
      </div>
      <div class="modules-grid">
        <article
          v-for="module in modules"
          :key="module.name"
          class="module-card"
          :class="{ disabled: module.disabled }"
          @click="navigateTo(module)"
        >
          <div class="card-icon" :class="module.name">
            <component :is="module.icon" />
          </div>
          <div class="card-body">
            <h2>{{ $t(`main.modules.${module.name}.title`) }}</h2>
            <p>{{ $t(`main.modules.${module.name}.description`) }}</p>
          </div>
          <div class="card-action">
            <span v-if="module.disabled" class="badge-coming">{{ $t('main.comingSoon') }}</span>
            <span v-else class="badge-enter">
              {{ $t('main.enterModule') }}
              <ArrowRightOutlined />
            </span>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  BugOutlined,
  ControlOutlined,
  ExperimentOutlined,
  ApartmentOutlined,
  RadarChartOutlined,
  CodeOutlined,
  ApiOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons-vue'
import NavHeader from '../../components/NavHeader.vue'

const router = useRouter()

const modules = [
  { name: 'debugger', route: '/debug', disabled: false, icon: BugOutlined },
  { name: 'controller', route: '/controller', disabled: false, icon: ControlOutlined },
  { name: 'simulator', route: '/simulator', disabled: false, icon: ExperimentOutlined },
  { name: 'batchRunner', route: '/batch-runner', disabled: false, icon: ApartmentOutlined },
  { name: 'eventMonitor', route: '/event-monitor', disabled: false, icon: RadarChartOutlined },
  { name: 'codeGenerator', route: '/code-generator', disabled: false, icon: CodeOutlined },
  { name: 'vendorExplorer', route: '/vendor-explorer', disabled: false, icon: ApiOutlined },
]

const navigateTo = (module: { route: string; disabled: boolean }) => {
  if (module.disabled) return
  router.push(module.route)
}
</script>

<style scoped lang="scss">
.main-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-xl) var(--space-lg);
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
}

.hero {
  text-align: center;
  margin-bottom: var(--space-xl);

  h1 {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: var(--space-sm);
  }

  .subtitle {
    color: var(--color-text-secondary);
    font-size: 15px;
    margin: 0;
  }
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-md);
  width: 100%;
}

.module-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);

  &:hover:not(.disabled) {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  &.disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background: var(--color-bg-subtle);
  color: var(--color-text-secondary);

  &.debugger {
    background: var(--color-primary-light);
    color: var(--color-primary);
  }

  &.controller {
    background: var(--color-success-bg);
    color: var(--color-success);
  }

  &.simulator {
    background: var(--color-info-bg);
    color: var(--color-info);
  }

  &.batchRunner,
  &.eventMonitor,
  &.codeGenerator,
  &.vendorExplorer {
    background: var(--color-primary-light);
    color: var(--color-primary);
  }
}

.card-body {
  flex: 1;

  h2 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: var(--space-xs);
  }

  p {
    font-size: 13px;
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin: 0;
  }
}

.card-action {
  .badge-enter {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 500;
    color: var(--color-primary);
  }

  .badge-coming {
    font-size: 12px;
    color: var(--color-text-muted);
    background: var(--color-bg-subtle);
    padding: 2px 10px;
    border-radius: 12px;
  }
}
</style>
