<template>
    <div class="organization-settings">
        <div class="header">
            <div class="header-left">{{ t('organization.settings') }}</div>
            <div class="header-right">
                <el-button class="btn" size="large" @click="toPath(1,'/post')">{{ t('organization.btn_posts') }}</el-button>
                <el-button class="btn" size="large" @click="toPath(1,'/data')">{{ t('organization.btn_data') }}</el-button>
                <el-button class="btn" size="large" @click="toPath(2,'/app/management/organization/activity/')">{{ t('organization.btn_activity') }}</el-button>
                <el-button class="btn" size="large" @click="toPath(2,'/app/management/organization/')">{{ t('organization.btn_daily') }}</el-button>
            </div>
        </div>

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
                prop="publish"
              >
              <div>
                <p>
                <el-switch v-model="orgInfo.publish" /> <span class="switch_btn_text">{{ t('organization.publish') }}</span>
              </p>  
              <p class="switch_text"><el-icon class="mr-8"><QuestionFilled /></el-icon>{{ t('organization.publish_text') }}</p>
              </div>
              </el-form-item>
              <el-form-item 
                prop="accquire"
              >
              <div>
                <p>
                <el-switch v-model="orgInfo.accquire" /> <span class="switch_btn_text">{{ t('organization.fetch') }}</span>
              </p>
              <p class="switch_text"><el-icon class="mr-8"><QuestionFilled /></el-icon>{{ t('organization.fetch_text') }}</p>
              </div>
             
              </el-form-item>
              <el-form-item :label="t('organization.name')"
                prop="name"
                required>
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
              <el-form-item :label="t('organization.Competitors')">
                <div class="logo-upload">
                  <el-input v-model="orgInfo.logo" :placeholder="t('organization.CompetitorsPlaceholder')"  />
                </div>
                <p class="switch_text"><el-icon class="mr-8"><QuestionFilled /></el-icon>{{ t('organization.Competitors_text') }}</p>
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
      <DataManageFooter>
        <el-button 
           size="large"
          :icon="Document"
          color="#467fcf"
          :loading="saving"
          @click="handleSave"
        >
          {{ t('commonSaves.save') }}
        </el-button>
      </DataManageFooter>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute,useRouter } from 'vue-router'
  import type { FormInstance } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import { Document } from '@element-plus/icons-vue'
  
  const { t } = useI18n()
  const formRef = ref<FormInstance>()
  const saving = ref(false)
  const router = useRouter()
  const route = useRoute()
  const activeCollapse = ref(['orgInfo', 'socialChannels'])
  
  const orgInfo = ref({
    name: 'BMW',
    industry: 'Automotive',
    publish: true,
    accquire:true,
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
      await new Promise(resolve => setTimeout(resolve, 1000))
      ElMessage.success(t('common.saveSuccess'))
    } catch (error) {
      console.error('Validation failed:', error)
    } finally {
      saving.value = false
    }
  }


  const toPath = (type:number,val:string) => {
    if(type === 1){
        router.push({path: route.fullPath + val})
    }else{
      const id = route.params.id
      router.push({path: val + id + '/crawler-log'})
    }
  }
  
  </script>
  
  <style lang="scss" scoped>
  .organization-settings {
    .header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: $table-header-color;
      margin-bottom: 24px;
      font-size: 24px;
      .header-right{
        .btn{
        &:hover{
            color: #495057;
            background-color: #f6f6f6;
            border-color: rgba(0, 20, 49, .12) ;
        }
       }
      }
    }
    
    .el-collapse {
      margin-bottom: 24px;
      border: none;
      :deep(.el-collapse-item) {
        border-radius: 8px;
        margin-bottom: 16px;
        overflow: hidden;
            .card-header{
                color: $table-header-color;
                font-size: 18px;
                font-weight: 400;
                padding: 16px 20px;
            }
        .el-collapse-item__header{
            border-bottom: 1px solid rgba(0,40,100,.12);
        }
        .el-collapse-item__content {
          padding: 0;
        }
        .el-switch.is-checked .el-switch__core{
          background-color: $purple;
          border-color: $purple;
        }
        .switch_btn_text{
            margin-left: 8px;
            font-size: 15px;
            color: $table-header-color;
        }
        .switch_text{
            color:#9aa0ac;
            display: flex;
            align-items: center;
        }
        .el-card {
          border: none;
          box-shadow: none;
          
          > .el-card__body {
            padding: 24px;
          }
          .el-form-item__label{
            font-weight: 600;
            font-size: 14px;
          }
        }
      }
    }
 
    .logo-upload {
      display: flex;
      gap: 12px;
      width: 100%;
      .el-button {
        flex: 0 0 100px; // 固定宽度为100px
      }

      .el-input {
        flex: 1; // 占据剩余空间
      }
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