<template>
  <div class="membership-plan">
    
    <div class="main-content">
      <el-collapse v-model="activeCollapse">
        <!-- 个人信息部分 -->
        <el-collapse-item name="profile">
          <template #title>
            <div class="card-header">
              <span>{{ t('profile.title') }}</span>
            </div>
          </template>
          
          <el-card class="profile-section">
            <el-form 
              label-position="top"
              :model="userInfo"
              :rules="rules"
              ref="formRef"
            >
              <el-form-item 
                :label="t('profile.name')"
                prop="name"
                :required="true"
              >
                <el-input v-model="userInfo.name" disabled />
              </el-form-item>
              
              <el-form-item 
                :label="t('profile.email')"
                prop="email"
                :required="true"
              >
                <el-input v-model="userInfo.email" disabled />
              </el-form-item>
              
              <el-form-item :label="t('profile.phone')">
                <el-input v-model="userInfo.phone" :placeholder="t('profile.phonePlaceholder')" />
              </el-form-item>
              
              <el-form-item :label="t('profile.organization')">
                <el-input v-model="userInfo.organization" disabled />
                <div class="support-text">
                  <el-icon><InfoFilled /></el-icon>
                  <span>{{ t('profile.organizationTip') }}</span>
                  <el-link type="primary">{{ t('profile.contactSupport') }}</el-link>
                </div>
              </el-form-item>
            </el-form>
          </el-card>
        </el-collapse-item>

        <!-- 邮件订阅设置 -->
        <el-collapse-item name="preferences">
          <template #title>
            <div class="card-header">
              <span>{{ t('emailPreferences.title') }}</span>
            </div>
          </template>
          
          <el-card class="email-preferences">
            <div class="preferences-list">
              <el-switch
                v-model="emailPreferences.weeklyReport"
                :active-text="t('emailPreferences.weeklyReport')"
              />
              <el-switch
                v-model="emailPreferences.monthlyReport"
                :active-text="t('emailPreferences.monthlyReport')"
              />
            </div>
          </el-card>
        </el-collapse-item>

        <!-- 会员计划折叠面板 -->
        <el-collapse-item name="currentPlan">
          <template #title>
            <div class="card-header">
              <span>{{ t('plans.currentPlan') }}</span>
            </div>
          </template>
          
          <el-card class="current-plan-section">
            <div class="current-plan-info">
              <span>{{ t('plans.yourCurrentPlan') }}: </span>
              <span class="plan-type">Enterprise User, Premium User</span>
              <el-button 
                type="primary" 
                size="small"
                class="upgrade-btn"
              >
                {{ t('plans.upgrade') }}
              </el-button>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>

      <!-- 会员计划部分 -->
      <el-card class="plans-section">
        <template #header>
          <div class="card-header">
            <span>{{ t('plans.title') }}</span>
          </div>
        </template>

        <div class="plans-container">
          <el-row :gutter="20">
            <el-col :span="8" v-for="plan in plans" :key="plan.type">
              <el-card 
                :class="['plan-card', { 'is-current': plan.isCurrent }]"
                :shadow="plan.isCurrent ? 'hover' : 'never'"
              >
                <h3>{{ t(`plans.${plan.type}.name`) }}</h3>
                <div class="price">
                  <span class="currency">$</span>
                  <span class="amount">{{ plan.price }}</span>
                  <span class="period">/{{ t('plans.year') }}</span>
                </div>
                
                <div class="features">
                  <div v-for="(feature, index) in plan.features" :key="index" class="feature-item">
                    <el-icon :class="{ 'is-active': feature.active }">
                      <Check v-if="feature.active" />
                      <Close v-else />
                    </el-icon>
                    <span>{{ t(`plans.features.${feature.key}`) }}</span>
                  </div>
                </div>

                <el-button 
                  :type="plan.isCurrent ? 'primary' : 'default'"
                  :disabled="plan.isCurrent"
                  class="plan-button"
                >
                  {{ plan.isCurrent ? t('plans.currentPlan') : t('plans.choosePlan') }}
                </el-button>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-card>

      <!-- 底部保存按钮 -->
      <div class="actions-footer">
        <el-button 
          type="primary" 
          :loading="saving"
          @click="handleSave"
        >
          {{ t('commonSaves.save') }}
        </el-button>
      </div>
    </div>

  
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Check, Close, InfoFilled } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'

const { t } = useI18n()
const formRef = ref<FormInstance>()
const saving = ref(false)

// 表单验证规则
const rules = {
  name: [
    { required: true, message: t('validation.nameRequired'), trigger: 'blur' }
  ],
  email: [
    { required: true, message: t('validation.emailRequired'), trigger: 'blur' },
    { type: 'email', message: t('validation.emailInvalid'), trigger: 'blur' }
  ]
}

// 用户信息
const userInfo = ref({
  name: '1002158476@qq.com',
  email: '1002158476@qq.com',
  phone: '',
  organization: '宝马'
})

// 邮件订阅设置
const emailPreferences = ref({
  weeklyReport: true,
  monthlyReport: true
})

// 会员计划数据
const plans = ref([
  {
    type: 'basic',
    price: '0',
    isCurrent: false,
    features: [
      { key: 'orgQuota', active: true },
      { key: 'exchanges', active: true },
      { key: 'weeklyReport', active: true },
      { key: 'topFive', active: false },
      { key: 'monitoring', active: false },
      { key: 'autoReport', active: false }
    ]
  },
  {
    type: 'premium',
    price: '1,500',
    isCurrent: true,
    features: [
      { key: 'orgQuota', active: true },
      { key: 'exchanges', active: true },
      { key: 'weeklyReport', active: true },
      { key: 'topFive', active: true },
      { key: 'monitoring', active: true },
      { key: 'autoReport', active: true }
    ]
  },
  {
    type: 'enterprise',
    price: '3,000',
    isCurrent: false,
    features: [
      { key: 'orgQuota', active: true },
      { key: 'exchanges', active: true },
      { key: 'weeklyReport', active: true },
      { key: 'topFive', active: true },
      { key: 'monitoring', active: true },
      { key: 'autoReport', active: true }
    ]
  }
])

// 折叠面板激活的项
const activeCollapse = ref(['profile', 'preferences', 'currentPlan'])

// 保存处理函数
const handleSave = async () => {
  if (!formRef.value) return
  
  try {
    saving.value = true
    await formRef.value.validate()
    // TODO: 实现保存逻辑
    
    // 模拟保存延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 显示成功提示
    ElMessage.success(t('commonSaves.saveSuccess'))
  } catch (error) {
    console.error('Validation failed:', error)
  } finally {
    saving.value = false
  }
}
</script>

<style lang="scss" scoped>
.membership-plan {
  min-height: 100vh;
  background-color: #f5f7fa;
  
  .el-card {
    margin-bottom: 24px;
    border-radius: 8px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.card-header {
  font-size: 18px;
  font-weight: 600;
}

.support-text {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #909399;
  font-size: 14px;
  margin-top: 8px;
}

.email-preferences {
  .preferences-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}

.plans-container {
  .plan-card {
    height: 100%;
    text-align: center;
    transition: all 0.3s;
    
    &.is-current {
      border: 2px solid var(--el-color-primary);
      transform: scale(1.02);
    }
    
    h3 {
      margin: 0 0 16px;
      color: #303133;
    }
    
    .price {
      margin-bottom: 24px;
      
      .currency {
        font-size: 24px;
        vertical-align: top;
      }
      
      .amount {
        font-size: 48px;
        font-weight: 600;
      }
      
      .period {
        color: #909399;
      }
    }
    
    .features {
      margin-bottom: 24px;
      
      .feature-item {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-bottom: 12px;
        
        .el-icon {
          &.is-active {
            color: var(--el-color-success);
          }
          &:not(.is-active) {
            color: var(--el-color-danger);
          }
        }
      }
    }
    
    .plan-button {
      width: 100%;
    }
  }
}

@media (max-width: 768px) {
  .plans-container {
    .el-col {
      width: 100%;
      margin-bottom: 16px;
    }
  }
}

.el-collapse {
  margin-bottom: 24px;
  border: none;
  
  :deep(.el-collapse-item) {
    background: #fff;
    border-radius: 8px;
    margin-bottom: 16px;
    overflow: hidden;
    
    .el-collapse-item__header {
      padding: 16px 20px;
      border: none;
      
      .card-header {
        margin: 0;
      }
    }
    
    .el-collapse-item__content {
      padding: 0;
    }
    
    .el-card {
      margin-bottom: 0;
      border: none;
      box-shadow: none;
      
      > .el-card__body {
        padding: 0 20px 20px;
      }
    }
  }
}

.current-plan-section {
  .current-plan-info {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .plan-type {
      font-weight: 600;
      color: var(--el-color-primary);
    }
    
    .upgrade-btn {
      margin-left: auto;
    }
  }
}

.actions-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style> 