import { createI18n } from 'vue-i18n'

import enMain from './en/main.json'
import enDebug from './en/debug.json'
import enController from './en/controller.json'
import enModules from './en/modules.json'
import zhMain from './zh/main.json'
import zhDebug from './zh/debug.json'
import zhController from './zh/controller.json'
import zhModules from './zh/modules.json'
import twMain from './tw/main.json'
import twDebug from './tw/debug.json'
import twController from './tw/controller.json'
import twModules from './tw/modules.json'

const messages = {
  en: {
    main: enMain,
    debug: enDebug,
    controller: enController,
    modules: enModules,
  },
  zh: {
    main: zhMain,
    debug: zhDebug,
    controller: zhController,
    modules: zhModules,
  },
  tw: {
    main: twMain,
    debug: twDebug,
    controller: twController,
    modules: twModules,
  },
}

const i18n = createI18n({
  legacy: false,
  locale: window.localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  messages,
})

export const t = (key: string, args?: unknown) => {
  if (!i18n) return key
  return i18n.global.t(key, args as Record<string, unknown>)
}

export default i18n
