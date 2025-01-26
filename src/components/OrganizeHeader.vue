<template>
    <div class="header-content" :class="{ 'is-fixed': isFixed }">
        <el-header>
          <div class="header-left">
            <img src="@/assets/svg/emb-logo-dark.svg" alt="logo" />
            <div class="header-title">我的企业组织</div>
            <div class="header-title2">最佳表现者</div>
          </div>
          <div class="header-right">
            <el-button class="lang-btn" link @click="toggleLang">
              {{ currentLang === 'zh' ? 'En' : '中' }}
             </el-button>
             <div class="user-info">
              <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f4879c98a5c8831643jpeg.jpeg" />
              <div class="user-name">
                <el-dropdown trigger="click" @command="handleCommand">
    <span class="el-dropdown-link">
      12306@qq.com
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="myOrganization"><el-icon><User /></el-icon>我的组织</el-dropdown-item>
        <el-dropdown-item command="changePassword"><el-icon><Lock /></el-icon>更改密码</el-dropdown-item>
        <el-dropdown-item command="myOrganizationSetting"><el-icon><Setting /></el-icon>我的组织设置</el-dropdown-item>
        <el-dropdown-item command="logout" divided><el-icon><SwitchButton /></el-icon>退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
                <div class="user-count">
                  user@gmail.com
                </div>
              </div>
             </div>
          </div>
        </el-header>
    </div>
 </template>

 <script setup lang="ts">
 import { ref, computed, onMounted, onUnmounted } from 'vue'
 import { useI18n } from 'vue-i18n'
 import { ArrowDown } from '@element-plus/icons-vue'
 const { locale } = useI18n()
 const currentLang = computed(() => locale.value)
 const isFixed = ref(false)

 const toggleLang = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
}
 const handleCommand = (command: string) => {
  console.log(command)
}

const handleScroll = () => {
  isFixed.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
 </script>  

<style lang="scss" scoped>
.header-content {
    margin: 0 auto;
    width: 100%;
    padding: 8px 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    position: relative;
    transition: all 0.3s ease;
    z-index: 1000;

    &.is-fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }

    .el-header {
        width: 1200px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0;
        @media (max-width: 768px) {
          width: 100%;
        }
        .header-left {
          width: 50%;
          display: flex;
          align-items: center;
          gap: 10px;
          img {
            width: 50px;
            height: 50px;
          }
          .header-title {
            font-size: 15px;
            color: rgba(0, 0, 0, .9);
            padding: 0 12px;
          }
          .header-title2 {
            font-size: 15px;
            color: rgba(0, 0, 0, .5);
            padding: 0 12px;
          }
        }
        .header-right {
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          .lang-btn {
            margin-right: 10px;
          }
          .user-info {
            display: flex;
            align-items: center;
            padding:0 12px;
          }
          .user-name {
            margin-left:12px;
          }
          .user-count {
            font-size: 12px;
            color: #9aa0ac!important;
          }
        }
    }
}

.header-content.is-fixed + * {
  margin-top: 76px;
}
</style>