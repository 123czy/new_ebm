<template>
  <div class="register-container">
    <div class="lang-switch">
      <el-button type="primary" plain @click="toggleLang">
        {{ currentLang === 'zh' ? 'En' : '简' }}
      </el-button>
    </div>

    <div class="content">
        <div class="logo">
        <img src="@/assets/svg/ebm-logo-purple.svg" alt="EBM" />
        </div>
    <div class="register-content">
      <div class="title">{{ $t('register.title') }}</div>
      
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        class="register-form"
      >
        <el-form-item :label="$t('register.fullName')" prop="fullName">
          <el-input 
            v-model="form.fullName"
            :placeholder="$t('register.fullNamePlaceholder')"
          />
        </el-form-item>
        
        <el-form-item :label="$t('register.companyEmail')" prop="companyEmail">
          <el-input 
            v-model="form.companyEmail"
            :placeholder="$t('register.companyEmailPlaceholder')"
          />
        </el-form-item>
        
        <el-form-item :label="$t('register.company')" prop="company">
          <el-select 
            v-model="form.company"
            :placeholder="$t('register.companyPlaceholder')"
            class="w-100"
          >
            <el-option label="珍岛" value="珍岛" />
            <!-- 可以根据需要添加更多选项 -->
          </el-select>
        </el-form-item>
        
        <el-form-item :label="$t('register.phone')" prop="phone">
          <el-input 
            v-model="form.phone"
            :placeholder="$t('register.phonePlaceholder')"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" class="submit-btn" @click="handleSubmit">
            {{ $t('register.submit') }}
          </el-button>
        </el-form-item>
      </el-form>
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
  fullName: '',
  companyEmail: '',
  company: '',
  phone: ''
})

const rules = reactive<FormRules>({
  fullName: [
    { required: true, message: t('register.fullNameRequired'), trigger: 'blur' }
  ],
  companyEmail: [
    { required: true, message: t('register.companyEmailRequired'), trigger: 'blur' },
    { type: 'email', message: t('register.invalidEmail'), trigger: 'blur' }
  ],
  company: [
    { required: true, message: t('register.companyRequired'), trigger: 'change' }
  ],
  phone: [
    { pattern: /^\+?[\d\s-]+$/, message: t('register.invalidPhone'), trigger: 'blur' }
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
      // 处理表单提交逻辑
    }
  })
}
</script>

<style lang="scss" scoped>
.register-container {
  min-height: 100vh;
  padding: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
    margin-top:0;
    width: 100%;
}

.lang-switch {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 10;
}

.register-content {
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

h2 {
  text-align: center;
  margin-bottom: 30px;
}

.register-form {
  width: 100%;
}

.w-100 {
  width: 100%;
}

.submit-btn {
  width: 100%;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .register-content {
    padding: 20px 16px;
  }
}
</style> 