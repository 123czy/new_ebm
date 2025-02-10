<template>
  <div class="change-password">
    
    <div class="main-content">
      <el-card class="password-form">
        <template #header>
          <div class="card-header">
            <span>{{ t('changePassword.title') }}</span>
          </div>
        </template>
        
        <el-form 
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-position="top"
        >
          <el-form-item 
            :label="t('changePassword.newPassword')"
            prop="newPassword"
            required
          >
            <el-input 
              v-model="formData.newPassword"
              type="password"
              :placeholder="t('changePassword.newPasswordPlaceholder')"
              show-password
            />
          </el-form-item>
          
          <el-form-item 
            :label="t('changePassword.confirmPassword')"
            prop="confirmPassword"
            required
          >
            <el-input 
              v-model="formData.confirmPassword"
              type="password"
              :placeholder="t('changePassword.confirmPasswordPlaceholder')"
              show-password
            />
          </el-form-item>
          
          <div class="form-actions">
            <el-button 
              text
              @click="handleReturn"
            >
              <el-icon><ArrowLeft /></el-icon>
              {{ t('changePassword.returnToProfile') }}
            </el-button>
            
            <el-button 
              type="primary"
              :loading="saving"
              @click="handleSubmit"
            >
              {{ t('commonSaves.save') }}
            </el-button>
          </div>
        </el-form>
      </el-card>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'

const { t } = useI18n()
const router = useRouter()
const formRef = ref<FormInstance>()
const saving = ref(false)

// 表单数据
const formData = ref({
  newPassword: '',
  confirmPassword: ''
})

// 验证两次密码是否一致
const validateConfirmPassword = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error(t('validation.confirmPasswordRequired')))
  } else if (value !== formData.value.newPassword) {
    callback(new Error(t('validation.passwordsNotMatch')))
  } else {
    callback()
  }
}

// 表单验证规则
const rules: FormRules = {
  newPassword: [
    { required: true, message: t('validation.newPasswordRequired'), trigger: 'blur' },
    { min: 6, message: t('validation.passwordLength'), trigger: 'blur' }
  ],
  confirmPassword: [
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}

// 返回个人资料页面
const handleReturn = () => {
  router.push('/membership')
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    saving.value = true
    await formRef.value.validate()
    
    // TODO: 实现密码更新逻辑
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    ElMessage.success(t('changePassword.successMessage'))
    router.push('/membership')
  } catch (error) {
    console.error('Validation failed:', error)
  } finally {
    saving.value = false
  }
}
</script>

<style lang="scss" scoped>
.change-password {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.password-form {
  border-radius: 8px;
  
  @media screen and (max-width: 767px) {
    margin: 0 -16px;
    border-radius: 0;
  }
  
  .card-header {
    font-size: 18px;
    font-weight: 600;
  }
  
  :deep(.el-form-item__label) {
    font-weight: 500;
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 32px;
    
    .el-button {
      .el-icon {
        margin-right: 4px;
      }
    }
  }
}
</style> 