<template>
  <div class="organization-settings">
    <h2>{{ t('organization.settings') }}</h2>
    
    <el-collapse v-model="activeCollapse">
      <!-- Organization Information -->
      <el-collapse-item name="orgInfo">
        <template #title>
          <div class="card-header">
            <span>{{ t('organization.information') }}</span>
          </div>
        </template>
        
        <el-card class="org-info-section">
          <el-form 
            label-position="top"
            :model="orgInfo"
            :rules="rules"
            ref="formRef"
          >
            <el-form-item 
              :label="t('organization.name')"
              prop="name"
              required
            >
              <el-input v-model="orgInfo.name" />
            </el-form-item>
            
            <el-form-item 
              :label="t('organization.industry')"
              prop="industry"
              required
            >
              <el-select v-model="orgInfo.industry" class="w-100">
                <el-option value="Automotive" label="Automotive" />
                <!-- Add more industry options as needed -->
              </el-select>
            </el-form-item>
            
            <el-form-item :label="t('organization.introduction')">
              <el-input 
                v-model="orgInfo.introduction" 
                type="textarea" 
                :rows="4"
                :placeholder="t('organization.introductionPlaceholder')"
              />
            </el-form-item>
            
            <el-form-item :label="t('organization.website')">
              <el-input 
                v-model="orgInfo.website"
                :placeholder="t('organization.websitePlaceholder')"
              />
            </el-form-item>
            
            <el-form-item :label="t('organization.logo')">
              <div class="logo-upload">
                <el-input v-model="orgInfo.logo" disabled />
                <el-button>{{ t('common.browse') }}</el-button>
              </div>
              <div class="logo-preview" v-if="orgInfo.logo">
                <img :src="orgInfo.logo" alt="Logo" />
              </div>
            </el-form-item>
          </el-form>
        </el-card>
      </el-collapse-item>

      <!-- Social Channels -->
      <el-collapse-item name="socialChannels">
        <template #title>
          <div class="card-header">
            <span>{{ t('organization.socialChannels') }}</span>
          </div>
        </template>
        
        <el-card class="social-channels-section">
          <el-form 
            label-position="top"
            :model="socialChannels"
          >
            <el-form-item label="LinkedIn">
              
              <el-input v-model="socialChannels.linkedin" >
                <template #prepend>https://www.linkedin.com/company/</template>
              </el-input>
            </el-form-item>
            
            <el-form-item label="WeChat">
              <el-input v-model="socialChannels.wechat" />
            </el-form-item>
            
            <el-form-item label="Weibo">
              <el-input v-model="socialChannels.weibo" >
                <template #prepend>https://weibo.com/p/</template>
              </el-input>
            </el-form-item>
            
            <el-form-item label="Kanzhun">
                <el-input v-model="socialChannels.kanzhun">
                    <template #prepend>https://m.kanzhun.com/gsr</template>
                    <template #append>.html</template>
                </el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-collapse-item>
    </el-collapse>

    <!-- Bottom Actions -->
    <div class="actions-footer">
      <el-button @click="handleBack">{{ t('common.back') }}</el-button>
      <el-button 
        type="primary" 
        :loading="saving"
        @click="handleSave"
      >
        {{ t('common.save') }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'

const { t } = useI18n()
const router = useRouter()
const formRef = ref<FormInstance>()
const saving = ref(false)

const activeCollapse = ref(['orgInfo', 'socialChannels'])

const orgInfo = ref({
  name: 'BMW',
  industry: 'Automotive',
  introduction: '',
  website: '',
  logo: ''
})

const socialChannels = ref({
  linkedin: 'https://www.linkedin.com/company/2387',
  wechat: 'BMW_recruitment',
  weibo: 'https://weibo.com/p/1006061901601741',
  kanzhun: '68472'
})

const rules = {
  name: [
    { required: true, message: t('validation.nameRequired'), trigger: 'blur' }
  ],
  industry: [
    { required: true, message: t('validation.industryRequired'), trigger: 'change' }
  ]
}

const handleSave = async () => {
  if (!formRef.value) return
  
  try {
    saving.value = true
    await formRef.value.validate()
    // TODO: Implement save logic
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success(t('common.saveSuccess'))
  } catch (error) {
    console.error('Validation failed:', error)
  } finally {
    saving.value = false
  }
}

const handleBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.organization-settings {
  h2 {
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 500;
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
      }
      
      .el-collapse-item__content {
        padding: 0;
      }
      
      .el-card {
        border: none;
        box-shadow: none;
        
        > .el-card__body {
          padding: 0 20px 20px;
        }
      }
    }
  }

  .card-header {
    font-size: 18px;
    font-weight: 600;
  }

  .logo-upload {
    display: flex;
    gap: 12px;
  }

  .logo-preview {
    margin-top: 12px;
    max-width: 200px;
    
    img {
      width: 100%;
      height: auto;
    }
  }

  .w-100 {
    width: 100%;
  }

  .actions-footer {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: 24px;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style> 