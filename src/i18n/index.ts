import { createI18n } from 'vue-i18n'
import en from '@/locales/en'
import zh from '@/locales/zh'
// import zhCN from '@/locales/zh-CN'

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: 'en', // 默认语言
  fallbackLocale: 'en', // 回退语言
  messages: {
    en,
    'zh-CN': zh
  }
})

export default i18n 