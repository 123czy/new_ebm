<template>
  <div class="forgot-password-container">
    <div class="lang-switch">
      <el-button type="primary" plain @click="toggleLang">
        {{ currentLang === 'zh' ? 'En' : '简' }}
      </el-button>
    </div>

    <div class="content">
      <div class="logo">
        <img src="@/assets/svg/ebm-logo-purple.svg" alt="EBM" />
      </div>
      <div class="forgot-password-content">
        <div class="title">{{ $t('forgotPassword.title') }}</div>
        <div class="description">{{ $t('forgotPassword.description') }}</div>
        
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="top"
          class="forgot-password-form"
        >
          <el-form-item :label="$t('forgotPassword.email')" prop="email">
            <el-input 
              v-model="form.email"
              :placeholder="$t('forgotPassword.emailPlaceholder')"
            />
          </el-form-item>
          
          <el-form-item>
            <el-button size="large" class="submit-btn" @click="handleSubmit">
              {{ $t('forgotPassword.submit') }}
            </el-button>
          </el-form-item>
        </el-form>

        <div class="form-footer">
          <div class="back-to-login">
            {{ $t('forgotPassword.remembered') }} 
            <router-link to="/login">{{ $t('forgotPassword.backToLogin') }}</router-link>
            {{ $t('forgotPassword.loginPage') }}
          </div>
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
  email: ''
})

const rules = reactive<FormRules>({
  email: [
    { required: true, message: t('forgotPassword.emailRequired'), trigger: 'blur' },
    { type: 'email', message: t('forgotPassword.invalidEmail'), trigger: 'blur' }
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
      // 处理重置密码逻辑
    }
  })
}
</script>

<style lang="scss" scoped>
.forgot-password-container {
  min-height: 100vh;
  padding: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  margin-top: 0;
  width: 100%;
}

.lang-switch {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 10;
}

.forgot-password-content {
  max-width: 380px;
  background: $white;
  margin: 0 auto;
  padding: 40px;
  
  .title {
    font-size: 18px;
    line-height: 1.2;
    font-weight: 400;
  }

  .description {
    color: #666;
    margin: 24px 0;
  }
}

.logo {
  text-align: center;
  margin-bottom: 30px;
}

.logo img {
  max-width: 120px;
}

.forgot-password-form {
  width: 100%;
}

.submit-btn {
  width: 100%;
  color: $white;
  background-color: $purple;
  &:hover {
    background-color: $purple-light;
  }
}

.form-footer {
  margin-top: 32px;
  text-align: center;

  .back-to-login {
    color: #666;

    a {
      color: $purple;
      text-decoration: none;
      margin-left: 4px;
    }
  }
}

@media (max-width: 768px) {
  .forgot-password-content {
    padding: 20px 16px;
  }
}
</style> 