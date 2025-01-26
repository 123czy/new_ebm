import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import store from './store'
import router from './router'
import App from './App.vue'
import { messages } from './locales'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './styles/index.scss'

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages,
})

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store)
app.use(router)
app.use(i18n)
app.use(ElementPlus)

// 设置 rem 基准值
function setRem() {
  const baseSize = 16
  // 设计稿宽度为1920px
  const scale = document.documentElement.clientWidth / 1920
  // 设置最大缩放比例为2
  const fontSize = baseSize * Math.min(scale, 2)
  document.documentElement.style.fontSize = `${fontSize}px`
  // 额外设置 Element Plus 的基准大小
  document.documentElement.style.setProperty('--el-font-size-base', '14px')
}

// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.addEventListener('resize', setRem)

app.mount('#app')