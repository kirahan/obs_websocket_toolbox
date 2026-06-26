<template>
  <ModuleLayout>
    <div class="module-body full-width">
      <header class="page-header">
        <h1>{{ $t('modules.vendorExplorer.title') }}</h1>
        <p>{{ $t('modules.vendorExplorer.subtitle') }}</p>
      </header>

      <div class="layout">
        <section class="panel vendor-list">
          <h3>{{ $t('modules.vendorExplorer.vendors') }}</h3>
          <button
            v-for="vendor in vendorRegistry"
            :key="vendor.vendorName"
            class="vendor-item"
            :class="{ active: selectedVendor?.vendorName === vendor.vendorName }"
            @click="selectVendor(vendor)"
          >
            <span class="name">{{ vendor.vendorName }}</span>
            <span class="meta">{{ vendor.requests.length }} req / {{ vendor.events.length }} evt</span>
          </button>
        </section>

        <section v-if="selectedVendor" class="panel detail">
          <h3>{{ selectedVendor.vendorName }}</h3>
          <p class="desc">{{ selectedVendor.description }}</p>

          <h4>{{ $t('modules.vendorExplorer.requests') }}</h4>
          <div v-for="req in selectedVendor.requests" :key="req.requestType" class="req-card">
            <div class="req-head">
              <strong>{{ req.requestType }}</strong>
              <a-button size="small" type="primary" :disabled="!WSconnected" @click="sendVendor(req)">
                {{ $t('modules.vendorExplorer.send') }}
              </a-button>
            </div>
            <p>{{ req.description }}</p>
            <a-textarea
              v-model:value="requestDataJson[req.requestType]"
              :rows="3"
              @focus="initRequestJson(req)"
            />
          </div>

          <h4>{{ $t('modules.vendorExplorer.events') }}</h4>
          <ul class="event-list">
            <li v-for="evt in selectedVendor.events" :key="evt.eventType">
              <strong>{{ evt.eventType }}</strong> — {{ evt.description }}
            </li>
          </ul>
        </section>

        <section class="panel log-panel">
          <h3>{{ $t('modules.vendorExplorer.vendorLog') }}</h3>
          <div v-for="item in vendorLogs" :key="item.uuid" class="log-row">
            <span class="badge">{{ item.type }}</span>
            <span>{{ item.name }}</span>
            <span class="time">{{ item.timestamp }}</span>
          </div>
          <div v-if="!vendorLogs.length" class="empty">{{ $t('modules.vendorExplorer.emptyLog') }}</div>
        </section>
      </div>
    </div>
  </ModuleLayout>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import ModuleLayout from '../../components/ModuleLayout.vue'
import { vendorRegistry, type VendorDefinition } from '../../data/vendors'
import OBS from '../../obs'
import { I_Event_item, WSEventAndRequestHistory, WSconnected } from '../../state'

const obs = OBS.getInstance()
const selectedVendor = ref<VendorDefinition | null>(vendorRegistry[0] ?? null)
const requestDataJson = reactive<Record<string, string>>({})

const vendorLogs = computed(() =>
  WSEventAndRequestHistory.value.filter(
    (item) =>
      item.name === 'CallVendorRequest' ||
      item.name === 'VendorEvent' ||
      (typeof item.params === 'object' &&
        item.params &&
        'vendorName' in (item.params as Record<string, unknown>)),
  ) as I_Event_item[],
)

const selectVendor = (vendor: VendorDefinition) => {
  selectedVendor.value = vendor
}

const initRequestJson = (req: VendorDefinition['requests'][0]) => {
  if (!requestDataJson[req.requestType]) {
    requestDataJson[req.requestType] = JSON.stringify(req.sampleData ?? {}, null, 2)
  }
}

const sendVendor = async (req: VendorDefinition['requests'][0]) => {
  if (!selectedVendor.value) return
  let requestData = {}
  try {
    requestData = JSON.parse(requestDataJson[req.requestType] || '{}')
  } catch {
    return
  }
  await obs.sendRequest('CallVendorRequest', {
    vendorName: selectedVendor.value.vendorName,
    requestType: req.requestType,
    requestData,
  })
}
</script>

<style scoped lang="scss">
@import '../../styles/module-page.scss';

.full-width {
  max-width: 1200px;
}

.layout {
  display: grid;
  grid-template-columns: 220px 1fr 280px;
  gap: var(--space-md);

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
}

.panel {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
}

.vendor-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: left;
  border: 1px solid var(--color-border-light);
  background: var(--color-bg-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-sm);
  margin-bottom: var(--space-sm);
  cursor: pointer;

  &.active {
    border-color: var(--color-primary);
    background: var(--color-primary-light);
  }

  .meta {
    font-size: 11px;
    color: var(--color-text-muted);
  }
}

.desc {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-md);
}

.req-card {
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  padding: var(--space-sm);
  margin-bottom: var(--space-sm);

  p {
    font-size: 12px;
    color: var(--color-text-secondary);
    margin: 4px 0 8px;
  }
}

.req-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.event-list {
  font-size: 13px;
  padding-left: var(--space-md);
  color: var(--color-text-secondary);
}

.log-row {
  display: flex;
  gap: var(--space-sm);
  font-size: 12px;
  padding: 4px 0;
  border-bottom: 1px solid var(--color-border-light);
}

.badge {
  font-weight: 600;
  color: var(--color-primary);
}

.time {
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}

.empty {
  color: var(--color-text-muted);
  font-size: 13px;
  padding: var(--space-md);
  text-align: center;
}
</style>
