/**
 * 从 obs-websocket protocol.md 同步协议数据
 *
 * 用法:
 *   node scripts/sync-protocol.mjs
 *   node scripts/sync-protocol.mjs --local path/to/protocol.md
 */

import fs from 'node:fs'
import path from 'node:path'
import https from 'node:https'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const PROTOCOL_URL =
  'https://raw.githubusercontent.com/obsproject/obs-websocket/master/docs/generated/protocol.md'

const OUTPUT_JSON = path.join(ROOT, 'src/data/generated/protocol.json')
const LOCALE_DIR = path.join(ROOT, 'src/locales')

const I18N_SECTIONS = ['RequestDes', 'EventDes', 'ReqParamsDes', 'ResParamsDes']

// ---------------------------------------------------------------------------
// Fetch
// ---------------------------------------------------------------------------

async function fetchProtocol(localPath) {
  if (localPath) {
    return fs.readFileSync(path.resolve(localPath), 'utf-8')
  }
  console.log(`Fetching ${PROTOCOL_URL}`)
  return new Promise((resolve, reject) => {
    https
      .get(PROTOCOL_URL, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to fetch protocol: ${res.statusCode}`))
          res.resume()
          return
        }
        let data = ''
        res.setEncoding('utf-8')
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => resolve(data))
      })
      .on('error', reject)
  })
}

// ---------------------------------------------------------------------------
// Parser helpers
// ---------------------------------------------------------------------------

function categoryToKey(title) {
  const isRequest = title.endsWith('Requests')
  const base = title.replace(/ (Requests|Events)$/, '')
  const camel = base
    .split(/[\s-]+/)
    .map((word, i) =>
      i === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join('')
  return camel + (isRequest ? 'Requests' : 'Events')
}

function categoryToTag(title) {
  return title.replace(/ (Requests|Events)$/, '')
}

function formatDescription(text) {
  return text
    .trim()
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, ' ').trim())
    .filter(Boolean)
    .join('<br><br>')
}

function parseMetadata(block) {
  const meta = {
    complexityRating: '1/5',
    rpcVersion: '1',
    websocketVersion: '5.0.0',
  }
  const cr = block.match(/Complexity Rating:\s*`([^`]+)`/)
  const rpc = block.match(/Latest Supported RPC Version:\s*`([^`]+)`/)
  const ver = block.match(/Added in v([\d.]+)/)
  if (cr) meta.complexityRating = cr[1]
  if (rpc) meta.rpcVersion = rpc[1]
  if (ver) meta.websocketVersion = ver[1]
  return meta
}

function parseTable(block, headerPattern) {
  const idx = block.search(headerPattern)
  if (idx === -1) return []

  const after = block.slice(idx)
  const lines = after.split('\n')
  const fields = []

  let inTable = false
  for (const line of lines) {
    if (!line.trim().startsWith('|')) {
      if (inTable) break
      continue
    }
    if (line.includes('----')) {
      inTable = true
      continue
    }
    if (!inTable) continue

    const cells = line
      .split('|')
      .slice(1, -1)
      .map((c) => c.trim())
    if (cells.length < 2 || cells[0] === 'Name') continue

    fields.push(cells)
  }
  return fields
}

function parseRequestTableRow(cells) {
  const rawName = cells[0]
  const required = !rawName.startsWith('?')
  const name = rawName.replace(/^\?/, '')
  const type = cells[1] || 'String'
  const description = cells[2] || ''
  const valueRestrictions = cells[3] || 'None'
  const defaultBehavior = cells[4] || 'N/A'

  const result = {
    name,
    type: normalizeType(type),
    description,
    required,
    valueRestrictions,
    defaultBehavior,
  }

  if (name.includes('.')) {
    const dotIndex = name.indexOf('.')
    result.parentNode = name.slice(0, dotIndex)
    result.isCustomerObject = false
  } else if (type.toLowerCase() === 'object') {
    result.isCustomerObject = true
  }

  return result
}

function parseResponseTableRow(cells) {
  const rawName = cells[0].replace(/^\?/, '')
  return {
    name: rawName,
    type: normalizeType(cells[1] || 'String'),
    description: cells[2] || '',
  }
}

function normalizeType(type) {
  const t = type.trim()
  if (t.startsWith('Array<')) return t
  const lower = t.toLowerCase()
  const map = {
    string: 'String',
    number: 'Number',
    boolean: 'Boolean',
    object: 'Object',
    any: 'Any',
  }
  return map[lower] || t.charAt(0).toUpperCase() + t.slice(1)
}

function parseItemBlock(block, kind) {
  const titleMatch = block.match(/^### ([A-Za-z0-9]+)/m)
  if (!titleMatch) return null

  const name = titleMatch[1]
  const afterTitle = block.slice(titleMatch.index + titleMatch[0].length)

  const metaStart = afterTitle.search(/^- Complexity Rating:/m)
  const descriptionRaw =
    metaStart === -1 ? afterTitle.trim() : afterTitle.slice(0, metaStart).trim()
  const metaBlock = metaStart === -1 ? '' : afterTitle.slice(metaStart)
  const meta = parseMetadata(metaBlock)

  const item = {
    key: name,
    title: name,
    description: formatDescription(descriptionRaw),
    complexityRating: meta.complexityRating,
    rpcVersion: meta.rpcVersion,
    websocketVersion: meta.websocketVersion,
  }

  if (kind === 'request') {
    item.requestParams = parseTable(afterTitle, /\*\*Request Fields:\*\*/).map(
      parseRequestTableRow,
    )
    item.responseParams = parseTable(afterTitle, /\*\*Response Fields:\*\*/).map(
      parseResponseTableRow,
    )
  } else {
    item.responseParams = parseTable(afterTitle, /\*\*Data Fields:\*\*/).map(
      parseResponseTableRow,
    )
  }

  return item
}

function parseSection(markdown, kind) {
  const categories = []
  const categoryRegex = /^## (.+ (?:Requests|Events))$/gm
  const matches = [...markdown.matchAll(categoryRegex)]

  for (let i = 0; i < matches.length; i++) {
    const catTitle = matches[i][1]
    if (catTitle.includes('Table of Contents')) continue

    const start = matches[i].index + matches[i][0].length
    const end = i + 1 < matches.length ? matches[i + 1].index : markdown.length
    const catBlock = markdown.slice(start, end)

    const items = []
    const itemRegex = /^### ([A-Za-z0-9]+)$/gm
    const itemMatches = [...catBlock.matchAll(itemRegex)]

    for (let j = 0; j < itemMatches.length; j++) {
      const iStart = itemMatches[j].index
      const iEnd = j + 1 < itemMatches.length ? itemMatches[j + 1].index : catBlock.length
      const item = parseItemBlock(catBlock.slice(iStart, iEnd), kind)
      if (item) items.push(item)
    }

    if (items.length > 0) {
      categories.push({
        title: catTitle,
        key: categoryToKey(catTitle),
        tag: categoryToTag(catTitle),
        items,
      })
    }
  }

  return categories
}

function parseProtocol(markdown) {
  const eventsStart = markdown.indexOf('# Events')
  const requestsStart = markdown.indexOf('# Requests')
  if (eventsStart === -1 || requestsStart === -1) {
    throw new Error('Cannot find Events or Requests section in protocol.md')
  }

  const eventsMd = markdown.slice(eventsStart, requestsStart)
  const requestsMd = markdown.slice(requestsStart)

  const versionMatch = markdown.match(/# obs-websocket ([^\n]+) Protocol/)
  return {
    meta: {
      source: PROTOCOL_URL,
      syncedAt: new Date().toISOString(),
      protocolVersion: versionMatch?.[1] || 'unknown',
    },
    events: parseSection(eventsMd, 'event'),
    requests: parseSection(requestsMd, 'request'),
  }
}

// ---------------------------------------------------------------------------
// i18n generation
// ---------------------------------------------------------------------------

function buildI18n(data) {
  const i18n = {
    RequestDes: {},
    EventDes: {},
    ReqParamsDes: {},
    ResParamsDes: {},
  }

  for (const cat of data.requests) {
    for (const item of cat.items) {
      i18n.RequestDes[item.key] = item.description

      if (item.requestParams.length) {
        i18n.ReqParamsDes[item.key] = {}
        for (const p of item.requestParams) {
          if (p.parentNode) {
            if (!i18n.ReqParamsDes[p.parentNode]) i18n.ReqParamsDes[p.parentNode] = {}
            const childKey = p.name.slice(p.parentNode.length + 1)
            i18n.ReqParamsDes[p.parentNode][childKey] = p.description
          } else {
            i18n.ReqParamsDes[item.key][p.name] = p.description
          }
        }
      }

      if (item.responseParams.length) {
        i18n.ResParamsDes[item.key] = {}
        for (const p of item.responseParams) {
          i18n.ResParamsDes[item.key][p.name] = p.description
        }
      }
    }
  }

  for (const cat of data.events) {
    for (const item of cat.items) {
      i18n.EventDes[item.key] = item.description

      if (item.responseParams.length) {
        i18n.ResParamsDes[item.key] = {}
        for (const p of item.responseParams) {
          i18n.ResParamsDes[item.key][p.name] = p.description
        }
      }
    }
  }

  return i18n
}

function mergeI18nSection(existing, generated, preserveExisting) {
  const result = { ...existing }
  for (const [key, value] of Object.entries(generated)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result[key] = mergeI18nSection(existing[key] || {}, value, preserveExisting)
    } else if (!preserveExisting || !(key in (existing || {}))) {
      result[key] = value
    }
  }
  return result
}

function mergeLocaleFile(localePath, generatedI18n, preserveExisting) {
  const existing = JSON.parse(fs.readFileSync(localePath, 'utf-8'))
  for (const section of I18N_SECTIONS) {
    if (generatedI18n[section]) {
      existing[section] = mergeI18nSection(
        existing[section] || {},
        generatedI18n[section],
        preserveExisting,
      )
    }
  }
  fs.writeFileSync(localePath, JSON.stringify(existing, null, 2) + '\n')
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

function printStats(data) {
  const reqCount = data.requests.reduce((n, c) => n + c.items.length, 0)
  const evtCount = data.events.reduce((n, c) => n + c.items.length, 0)
  console.log(`  Request categories: ${data.requests.length}`)
  console.log(`  Requests:           ${reqCount}`)
  console.log(`  Event categories:   ${data.events.length}`)
  console.log(`  Events:             ${evtCount}`)
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const localArg = process.argv.indexOf('--local')
  const localPath = localArg !== -1 ? process.argv[localArg + 1] : null

  const markdown = await fetchProtocol(localPath)
  const data = parseProtocol(markdown)
  const i18n = buildI18n(data)

  fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true })
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(data, null, 2) + '\n')
  console.log(`✓ Wrote ${path.relative(ROOT, OUTPUT_JSON)}`)

  const enPath = path.join(LOCALE_DIR, 'en/debug.json')
  mergeLocaleFile(enPath, i18n, false)
  console.log(`✓ Updated ${path.relative(ROOT, enPath)} (full replace of protocol i18n)`)

  for (const locale of ['zh', 'tw']) {
    const localePath = path.join(LOCALE_DIR, `${locale}/debug.json`)
    mergeLocaleFile(localePath, i18n, true)
    console.log(`✓ Merged ${path.relative(ROOT, localePath)} (kept existing translations)`)
  }

  printStats(data)
  console.log('\nDone. Run `yarn build` to verify.')
}

main().catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})
