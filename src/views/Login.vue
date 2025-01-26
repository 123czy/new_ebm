<template>
  <div class="login-container">
    <div class="lang-switch">
      <el-button type="primary" plain @click="toggleLang">
        {{ currentLang === 'zh' ? 'En' : '简' }}
      </el-button>
    </div>

     
    <div class="content">
      <div class="logo">
        <img src="@/assets/svg/ebm-logo-purple.svg" alt="EBM" />
      </div>
      <div class="login-content">
        <div class="title">{{ $t('login.title') }}</div>
        
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="top"
          class="login-form"
        >
          <el-form-item :label="$t('login.email')" prop="email">
            <el-input 
              v-model="form.email"
              :placeholder="$t('login.emailPlaceholder')"
            />
          </el-form-item>
          
          <el-form-item :label="$t('login.password')" prop="password">
            <el-input 
              v-model="form.password"
              type="password"
              :placeholder="$t('login.passwordPlaceholder')"
            />
          </el-form-item>

          <div class="remember-me">
            <el-checkbox v-model="form.remember">{{ $t('login.rememberMe') }}</el-checkbox>
          </div>
          
          <el-form-item>
            <el-button size="large" class="submit-btn" @click="handleSubmit">
              {{ $t('login.submit') }}
            </el-button>
          </el-form-item>
        </el-form>

        <div class="form-footer">
          <router-link to="/forgot-password" class="forgot-password">
            {{ $t('login.forgotPassword') }}
          </router-link>
        </div>
        <div class="register-link">
        {{ $t('login.noAccount') }} 
        <router-link to="/register">{{ $t('login.register') }}</router-link>
       </div>
      </div>
    
    
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import type { FormInstance, FormRules } from 'element-plus'

const { t, locale } = useI18n()
const currentLang = ref(locale.value)

const formRef = ref<FormInstance>()
const form = reactive({
  email: '',
  password: '',
  remember: false
})

const rules = reactive<FormRules>({
  email: [
    { required: true, message: t('login.emailRequired'), trigger: 'blur' },
    { type: 'email', message: t('login.invalidEmail'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: t('login.passwordRequired'), trigger: 'blur' }
  ]
})

const toggleLang = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
  currentLang.value = locale.value
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      console.log('Submit:', form)
      // 处理登录逻辑
    }
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  padding: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 100%;
}

.lang-switch {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 10;
}

.login-content {
  max-width: 380px;
  background: $white;
  margin: 0 auto;
  padding: 40px;
  
  .title {
    font-size: 18px;
    line-height: 1.2;
    font-weight: 400;
    margin-bottom: 24px;
  }
}

.logo {
  text-align: center;
  margin-bottom: 30px;
}

.logo img {
  max-width: 120px;
}

.login-form {
  width: 100%;
}

.remember-me {
  margin-bottom: 20px;
}

.submit-btn {
  background-color: $purple;
  width: 100%;
  color: $white;
  &:hover {
    background-color: $purple-light;
  }
}

.form-footer {
  margin-top: 20px;
  text-align: center;

  .forgot-password {
    color: $purple;
    text-decoration: none;
    font-size: 14px;
    display: block;
    margin-bottom: 12px;
  }
}

.register-link {
    margin-top: 20px;
    color: #666;
    text-align: center;
    a {
      color: $purple;
      text-decoration: none;
      margin-left: 4px;
    }
  }

@media (max-width: 768px) {
  .login-content {
    padding: 20px 16px;
  }
}
</style> 