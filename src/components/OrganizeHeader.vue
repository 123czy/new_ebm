<template>
  <div class="header-content" :class="{ 'is-fixed': isFixed }">
      <el-header>
        <div class="header-left">
          <img src="@/assets/svg/emb-logo-dark.svg" alt="logo" />
          <div class="header-title" @click="toPath('my-organization')">我的企业组织</div>
          <div class="header-title2" @click="toPath('')">最佳表现者</div>
          <el-dropdown trigger="click" @command="handleManageCommand">
      <span class="el-dropdown-link px-20">
        数据管理<el-icon class="el-icon--right"><CaretBottom /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in dataManageList" :key="item.id"  :icon="item.icon" :command="item.command">{{ item.title }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown trigger="click"  @command="handleAdminCommand">
      <span class="el-dropdown-link pl-20">
        管理员<el-icon class="el-icon--right"><CaretBottom /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in managerList" :key="item.id"  :icon="item.icon" :command="item.command">{{ item.title }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown trigger="click"  @command="handleAiCommand">
      <span class="el-dropdown-link pl-20">
        AI预警<el-icon class="el-icon--right"><CaretBottom /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in AiList" :key="item.id"  :icon="item.icon" :command="item.command">{{ item.title }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="header-title" @click="openWindow">AI平台</div>
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
import { ref,computed, onMounted, onUnmounted } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { User,ArrowDown } from '@element-plus/icons-vue'
const { locale } = useI18n()
const router = useRouter()
const currentLang = computed(() => locale.value)
const isFixed = ref(false)
const dataManageList = [
 {
   id:1,
   icon: 'ArrowDown',
   title: '组织机构',
   command:'organization',
   path: '/organization'
 },
 {
   id:2,
   icon: 'User',
   command:'industry',
   title: '行业',
   path: '/industry'
 },
 {
   id:3,
   icon: 'ArrowDown',
   command:'channel',
   title: '渠道',
   path: '/channel'
 },
 {
   id:4,
   icon: 'ArrowDown',
   command:'crawler',
   title: '抓取器仪表板',
   path: '/crawler'
 },
 {
  id:5,
   icon: 'ArrowDown',
   command:'api-user',
   title: '访问API',
   path: '/api-user'
 }
]

const managerList = [
{
 id:1,
 icon: 'User',
 command:'user',
 title: '用户',
 path: '/user'
},
{
 id:2,
 icon: 'ArrowDown',
 title: '活动日志',
 command:'activity',
 path: '/activity'
},
{
 id:3,
 icon: 'ArrowDown',
 command:'notification',
 title: '通知',
 path: '/notification'
}
]

const AiList = ref([
  {
    id:1,
    icon:'User',
    title:'预警规则',
    command:'rule',
    path: '/rule'
  },
  {
    id:2,
    icon:'User',
    title:'预警事件',
    command:'event',
    path: '/event'
  }
])
const toggleLang = () => {
locale.value = locale.value === 'zh' ? 'en' : 'zh'
}
const openWindow = () => {
  router.push('/app/ai')
}

const toPath = (val: string) => {
router.push('/app/'+ val)
}

const handleCommand = (command: string) => {
  router.push('/app/management/'+ command)
}

const handleManageCommand = (command: string) => {
router.push('/app/management/'+ command)
console.log("handleCommand",command)
}

const handleAdminCommand = (command: string) => {
router.push('/app/admin/'+ command)
console.log("handleCommand",command)
}

const handleAiCommand = (command: string) => {
router.push('/app/'+ command)
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
        display: flex;
        flex: 1;
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