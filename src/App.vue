<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { useI18n } from 'vue-i18n'    
import { onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'

const { locale } = useI18n()
const store = useStore()

// 检查设备类型
const checkDeviceType = () => {
  const width = window.innerWidth
  store.dispatch('updateDeviceType', width)
}

// 监听窗口大小变化
onMounted(() => {
  // 初始化检查
  checkDeviceType()
  // 添加resize事件监听
  window.addEventListener('resize', checkDeviceType)
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('resize', checkDeviceType)
})
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif;
}

.app {
  min-height: 100vh;

  @include mobile {
    /* padding-top: 50px; // Mobile header height */
  }
}

.main {
  min-height: calc(100vh - 60px);
  
  @include mobile {
    min-height: calc(100vh - 50px);
  }
}
</style>