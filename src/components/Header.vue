<template>
  <header class="site-header">
    <div class="container header-container">
      <!-- Logo -->
      <div class="logo">
        <img src="@/assets/svg/emb-logo-dark.svg" alt="EBM Logo" />
      </div>

      <!-- Desktop Navigation -->
      <!-- Auth Buttons - Desktop -->
      <div class="auth-buttons" v-if="!isMobile">
        <nav class="nav-desktop" v-if="!isMobile">
          <ul class="nav-list">
            <li><a href="#" @click.prevent="scrollToSection('about')">{{ $t('common.about') }}</a></li>
            <li><a href="#" @click.prevent="scrollToSection('how')">{{ $t('common.how') }}</a></li>
          </ul>
        </nav>
        <el-button class="lang-btn" link @click="toggleLang">
          {{ currentLang === 'zh' ? 'En' : '中' }}
        </el-button>
        <el-button link @click="goToLogin">{{ $t('common.login') }}</el-button>
        <el-button type="primary" class="register-btn" @click="goToRegister">
          {{ $t('common.register') }}
        </el-button>
      </div>

      <!-- Mobile Menu Button -->
      <div class="mobile-menu" v-else>
        <el-button class="lang-btn" link @click="toggleLang">
          {{ currentLang === 'zh' ? 'En' : '中' }}
        </el-button>
        <el-button @click="showMobileMenu = true">
          <el-icon><Menu /></el-icon>
        </el-button>
      </div>

      <!-- Mobile Menu Drawer -->
      <el-drawer
        v-model="showMobileMenu"
        direction="rtl"
        size="80%"
        :with-header="false"
      >
        <nav class="nav-mobile">
          <ul class="nav-list">
            <li><a href="#" @click.prevent="scrollToSection('about')">{{ $t('common.about') }}</a></li>
            <li><a href="#" @click.prevent="scrollToSection('how')">{{ $t('common.how') }}</a></li>
            <li><a href="#">{{ $t('common.login') }}</a></li>
            <li>
              <el-button type="primary" class="register-btn">
                {{ $t('common.register') }}
              </el-button>
            </li>
          </ul>
        </nav>
      </el-drawer>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Menu } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()  
const store = useStore()
const { locale } = useI18n()
const showMobileMenu = ref(false)

const isMobile = computed(() => store.state.device === 'mobile')
const currentLang = computed(() => locale.value)

const goToRegister = () => {
    router.push('/register')
}

const goToLogin = () => {
    router.push('/login')
}

const toggleLang = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
}

const scrollToSection = (section: string) => {
  if (section === 'about') {
    const ebmIndex = document.getElementById('ebm-index')
    if (ebmIndex) {
      ebmIndex.scrollIntoView({ behavior: 'smooth' })
      showMobileMenu.value = false // 关闭移动端菜单
    }
  }
  if (section === 'how') {
    const howSection = document.getElementById('rank-index')
    if (howSection) {
      howSection.scrollIntoView({ behavior: 'smooth' })
      showMobileMenu.value = false // 关闭移动端菜单
    }
  }
  // 可以添加其他部分的滚动逻辑
}
</script>

<style lang="scss" scoped>
.site-header {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba($white, 0.98);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 100;

  .header-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    height: 36px;
    
    img {
      height: 100%;
      width: auto;
    }
  }

  .nav-desktop {
    .nav-list {
      display: flex;
      gap: 32px;
      list-style: none;
      font-size: 14px;
      a {
        color: $text-primary;
        text-decoration: none;
        transition: color 0.3s;

        &:hover {
          color: $primary-color;
        }
      }
    }
  }

  .auth-buttons {
    display: flex;
    align-items: center;
    gap: 16px;

    .register-btn {
      border-radius: 20px;
      padding: 8px 24px;
    }
  }

  .mobile-menu {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .nav-mobile {
    padding: 20px;

    .nav-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 20px;

      a {
        color: $text-primary;
        text-decoration: none;
        font-size: 16px;
        display: block;
        padding: 8px 0;
      }

      .register-btn {
        width: 100%;
        margin-top: 16px;
        border-radius: 20px;
      }
    }
  }

  .lang-btn {
    font-weight: 500;
  }
}

// Mobile styles
@include mobile {
  .site-header {
    height: 50px;

    .logo {
      height: 28px;
    }
  }
}
</style> 