import {createI18n} from 'vue-i18n'
import en from './en.json'
import zh from './zh.json'
import tw from './tw.json'


const messages = {
    en,
    zh,
    tw
}

const i18n = createI18n({
    locale: 'en',
    messages,
})

export const t = (key: string,args?:any) => {
    if (!i18n) return key;
    return i18n.global.t(key,args);
}

export default i18n