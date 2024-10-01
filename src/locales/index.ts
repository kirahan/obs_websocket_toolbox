import { createI18n } from 'vue-i18n'

import enMain from './en/main.json'
import enDebug from './en/debug.json'
import enController from './en/controller.json'
import zhMain from './zh/main.json'
import zhDebug from './zh/debug.json'
import zhController from './zh/controller.json'
import twMain from './tw/main.json'
import twDebug from './tw/debug.json'
import twController from './tw/controller.json'

const messages = {
  en: {
    main: enMain,
    debug: enDebug,
    controller: enController
  },
  zh: {
    main: zhMain,
    debug: zhDebug,
    controller: zhController
  },
  tw: {
    main: twMain,
    debug: twDebug,
    controller: twController
  }
}

const i18n = createI18n({
  legacy: false,
  locale: window.localStorage.getItem('lang') || 'en', // 设置默认语言
  fallbackLocale: 'en', // 设置回退语言
  messages,
})

export const t = (key: string,args?:any) => {
    if (!i18n) return key;
    return i18n.global.t(key)
}

export default i18n