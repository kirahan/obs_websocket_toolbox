/**
 * Capture README screenshots with OBS WebSocket connected (simulator).
 * Requires Node 18+ and: npx playwright install chromium
 * Usage: yarn dev (separate terminal) && node scripts/capture-screenshots.mjs
 */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const shotRoot = path.join(rootDir, 'screenshots')
const base = process.env.SCREENSHOT_BASE_URL || 'http://127.0.0.1:5173/obs_websocket_toolbox'

const dirs = [
  'home',
  'debugger',
  'controller',
  'simulator',
  'batch-runner',
  'event-monitor',
  'code-generator',
  'vendor-explorer',
  'screenshot-studio',
  'planned',
]

async function ensureDirs() {
  await Promise.all(dirs.map((d) => mkdir(path.join(shotRoot, d), { recursive: true })))
}

/** Set simulator profile, reload, click connect until bottom bar shows connected. */
async function connectOnPage(page) {
  await page.locator('.bottom-bar').waitFor({ state: 'visible', timeout: 10000 })
  await page.evaluate(() => {
    localStorage.setItem('host', '__simulator__')
    localStorage.setItem('port', '4455')
    localStorage.setItem('password', '')
  })
  await page.reload()
  await page.locator('.bottom-bar').waitFor({ state: 'visible', timeout: 10000 })
  await page.waitForTimeout(700)
  if (!(await page.locator('.bottom-bar .icon-btn.connected').count())) {
    await page.locator('.bottom-bar .icon-btn.disconnected').click()
    await page.waitForTimeout(1200)
  }
  if (!(await page.locator('.bottom-bar .icon-btn.connected').count())) {
    throw new Error('OBS WebSocket not connected — bottom bar still disconnected')
  }
}

async function gotoConnected(page, route) {
  await page.goto(`${base}${route}`)
  await connectOnPage(page)
}

async function shot(page, relativePath, fullPage = false) {
  if (!(await page.locator('.bottom-bar .icon-btn.connected').count())) {
    await connectOnPage(page)
  }
  await page.waitForTimeout(300)
  await page.screenshot({ path: path.join(shotRoot, relativePath), fullPage })
}

async function main() {
  await ensureDirs()

  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

  try {
    await gotoConnected(page, '/simulator')
    await page.getByRole('button', { name: /启动模拟器|Start Simulator/i }).click().catch(() => {})
    await page.waitForTimeout(600)
    await shot(page, 'simulator/overview.png')

    await gotoConnected(page, '/')
    await shot(page, 'home/overview.png', true)
    await page.keyboard.press('Meta+k')
    await page.waitForTimeout(400)
    await page.locator('.command-palette-modal input').first().fill('SceneItemEnableStateChanged')
    await page.waitForTimeout(400)
    await page.locator('.command-item').first().click()
    await page.waitForTimeout(800)
    await shot(page, 'home/protocol-doc-panel.png')
    await page.keyboard.press('Escape')
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)
    await shot(page, 'home/planned-modules.png')

    await gotoConnected(page, '/debug')
    await shot(page, 'debugger/connected.png')

    const search = page.locator('.search-bar input').first()
    await search.click()
    await search.fill('GetVersion')
    await page.waitForTimeout(400)
    await page.locator('.ant-select-item').filter({ hasText: 'GetVersion' }).first().click()
    await page.waitForTimeout(700)
    await shot(page, 'debugger/request-detail.png')
    await page.locator('.title-row button').filter({ hasText: /发.*送|Send/i }).first().click()
    await page.waitForTimeout(900)
    await search.click()
    await search.fill('Scene')
    await page.waitForTimeout(600)
    await shot(page, 'debugger/search.png')
    await search.fill('')
    await page.keyboard.press('Escape')
    await page.locator('.event-viewer').scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)
    await shot(page, 'debugger/event-viewer.png')
    const ev = page.locator('.event-item').first()
    if (await ev.count()) {
      await ev.click()
      await page.waitForTimeout(600)
      await shot(page, 'debugger/json-drawer.png')
    }

    for (const [folder, route] of [
      ['controller', '/controller'],
      ['batch-runner', '/batch-runner'],
      ['code-generator', '/code-generator'],
      ['vendor-explorer', '/vendor-explorer'],
      ['screenshot-studio', '/screenshot-studio'],
    ]) {
      await gotoConnected(page, route)
      if (folder === 'batch-runner') {
        await page.getByRole('button', { name: /添加步骤|Add Step/i }).click().catch(() => {})
        await page.waitForTimeout(400)
      }
      if (folder === 'screenshot-studio') {
        await page.locator('button').filter({ hasText: /截取|Capture/i }).first().click().catch(() => {})
        await page.waitForTimeout(1000)
      }
      await shot(page, `${folder}/overview.png`)
    }

    await gotoConnected(page, '/event-monitor')
    await page.evaluate(async () => {
      const router = document.querySelector('#app')?.__vue_app__?.config.globalProperties.$router
      await router?.push('/debug')
    })
    await page.waitForTimeout(600)
    const debugSearch = page.locator('.search-bar input').first()
    for (const name of ['GetVersion', 'GetSceneList', 'GetInputList']) {
      await debugSearch.click()
      await debugSearch.fill(name)
      await page.waitForTimeout(350)
      await page.locator('.ant-select-item').filter({ hasText: name }).first().click()
      await page.waitForTimeout(400)
      await page.locator('.title-row button').filter({ hasText: /发.*送|Send/i }).first().click()
      await page.waitForTimeout(500)
    }
    await page.evaluate(async () => {
      const router = document.querySelector('#app')?.__vue_app__?.config.globalProperties.$router
      await router?.push('/event-monitor')
    })
    await page.waitForTimeout(1000)
    await shot(page, 'event-monitor/overview.png')
    const row = page.locator('.timeline-item').first()
    if (await row.count()) {
      await row.click()
      await page.waitForTimeout(600)
      await shot(page, 'event-monitor/detail-drawer.png')
    }

    console.log('Screenshots saved to', shotRoot)
  } finally {
    await browser.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
