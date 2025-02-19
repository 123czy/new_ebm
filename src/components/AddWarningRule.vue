<template>
    <el-drawer
      :model-value="visible"
      title="新增预警规则"
      direction="rtl"
      size="50%"
      :show-close="false"
      :before-close="handleClose"
    >
      <div class="drawer-content">
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-width="120px"
          class="warning-form"
        >
          <!-- 基本信息 -->
          <el-form-item 
            label="预警规则名称" 
            prop="ruleName"
            required
          >
            <el-input
              v-model="form.ruleName"
              placeholder="请输入预警规则名称"
            />
          </el-form-item>
  
          <el-form-item 
            label="平台" 
            prop="platform"
            required
          >
            <el-select
              v-model="form.platform"
              placeholder="请选择平台"
              class="full-width"
            >
              <el-option label="小红书" value="xiaohongshu" />
              <el-option label="微博" value="weibo" />
              <el-option label="bilibili" value="bilibili" />
              <el-option label="快手" value="kuaishou" />
              <el-option label="抖音" value="douyin" />
              <el-option label="知乎" value="zhihu" />
            </el-select>
          </el-form-item>
  
          <el-form-item label="账号粉丝数">
            <div class="fans-count-wrapper">
              <el-select
                v-model="form.fansCountOperator"
                placeholder="大于等于"
                class="operator-select"
              >
                <el-option label="大于等于" value="gte" />
                <el-option label="小于等于" value="lte" />
                <el-option label="等于" value="eq" />
              </el-select>
              <el-input
                v-model="form.fansCount"
                placeholder="请输入数字"
                class="fans-input"
              />
            </div>
          </el-form-item>
  
          <!-- 筛选条件 -->
          <el-form-item label="设置筛选条件">
            <div class="selector">
            <el-button
              size="small"
              type="primary"
              class="add-filter-btn"
              @click="addFilter"
            >
              <el-icon><Plus /></el-icon>
              添加筛选条件
            </el-button>

            <div class="filter-list">
                <el-switch
                 v-if="form.filters && form.filters.length > 1"
                 v-model="value3"
                 size="large"
                  inline-prompt
                  active-text="并"
                  inactive-text="或"
                 inactive-icon=""/>
              <div 
                v-for="(filter, index) in form.filters" 
                :key="index"
                class="filter-item"
              > 
               
                <el-select
                  v-model="filter.type"
                  placeholder="点赞"
                  class="filter-type"
                >
                  <el-option label="点赞" value="like" />
                  <el-option label="评论" value="comment" />
                  <el-option label="收藏" value="collect" />
                  <el-option label="转发" value="share" />
                  <el-option label="互动总数" value="interaction" />
                </el-select>
                <el-select
                  v-model="filter.operator"
                  placeholder="大于等于"
                  class="filter-operator"
                >
                  <el-option label="大于等于" value="gte" />
                  <el-option label="小于等于" value="lte" />
                  <el-option label="等于" value="eq" />
                </el-select>
                <el-input
                  v-model="filter.value"
                  placeholder="请输入数字"
                  class="filter-value"
                />
                <el-button
                  v-if="index !== 0"
                  circle
                  size="small"
                  type="danger"
                  class="delete-btn"
                  @click="removeFilter(index)"
                >
                  <el-icon><Minus /></el-icon>
                </el-button>
              </div>
            </div>
            
            </div>
            
          </el-form-item>
  
          <el-form-item 
            label="预警级别" 
            prop="level"
            required
          >
            <el-select
              v-model="form.level"
              placeholder="请选择预警级别"
              class="full-width"
            >
              <el-option label="A" value="A" />
              <el-option label="B" value="B" />
              <el-option label="C" value="C" />
            </el-select>
          </el-form-item>
  
          <el-form-item 
            label="预警对象" 
            prop="targets"
            required
          >
            <div class="targets-wrapper">
              <el-button 
                size="small"
                type="primary"
                class="add-member-btn"
                @click="showAddMember"
              >
                + 添加成员
              </el-button>
              <div class="target-tags">
                <el-tag
                  v-for="target in form.targets"
                  :key="target"
                  closable
                  class="target-tag"
                  @close="removeTarget(target)"
                >
                  <el-avatar 
                    :size="24" 
                    class="target-avatar"
                  >
                    {{ target.charAt(0) }}
                  </el-avatar>
                  {{ target }}
                </el-tag>
              </div>
             
            </div>
          </el-form-item>
        </el-form>
        
        
      </div>
      <template #footer>
            <div class="drawer-footer">
             <el-button @click="handleClose">取消</el-button>
             <el-button type="primary" @click="handleSubmit">保存</el-button>
            </div>
        </template>
    </el-drawer>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { User, Plus, Minus } from '@element-plus/icons-vue'
  
  interface FilterItem {
    type: string
    operator: string
    value: string | number
  }
  
  interface WarningRuleForm {
    ruleName: string
    platform: string
    fansCountOperator: string
    fansCount: string | number
    filters: FilterItem[]
    level: string
    targets: string[]
  }
  
  const props = defineProps<{
    visible: boolean
  }>()
  
  const emit = defineEmits(['update:visible', 'submit'])
  
  const formRef = ref<FormInstance>()
  
  const form = reactive<WarningRuleForm>({
    ruleName: '',
    platform: '',
    fansCountOperator: 'gte',
    fansCount: '',
    filters: [
      {
        type: 'like',
        operator: 'gte',
        value: ''
      }
    ],
    level: '',
    targets: ['张文', '雨季', '李承灵']
  })

  const value3 = ref(false)
  
  const rules: FormRules = {
    ruleName: [
      { required: true, message: '请输入预警规则名称', trigger: 'blur' }
    ],
    platform: [
      { required: true, message: '请选择平台', trigger: 'change' }
    ],
    level: [
      { required: true, message: '请选择预警级别', trigger: 'change' }
    ],
    targets: [
      { required: true, message: '请添加预警对象', trigger: 'change' }
    ]
  }
  
  const handleClose = () => {
    emit('update:visible', false)
  }
  
  const handleSubmit = async () => {
    if (!formRef.value) return
    
    await formRef.value.validate((valid, fields) => {
      if (valid) {
        console.log('submit form:', form)
        emit('submit', form)
        handleClose()
      }
    })
  }
  
  const addFilter = () => {
    form.filters.push({
      type: 'like',
      operator: 'gte',
      value: ''
    })
  }
  
  const removeFilter = (index: number) => {
    form.filters.splice(index, 1)
  }
  
  const removeTarget = (target: string) => {
    const index = form.targets.indexOf(target)
    if (index !== -1) {
      form.targets.splice(index, 1)
    }
  }
  
  const showAddMember = () => {
    // TODO: 实现添加成员的逻辑
    console.log('show add member dialog')
  }
  </script>
  
  <style lang="scss" scoped>
  .drawer-content {
    padding: 20px;
    height: calc(100% - 40px);
    display: flex;
    flex-direction: column;
  
    .warning-form {
      flex: 1;
      overflow-y: auto;
  
      .full-width {
        width: 100%;
      }
  
      .fans-count-wrapper {
        display: flex;
        gap: 12px;
  
        .operator-select {
          width: 120px;
        }
  
        .fans-input {
          flex: 1;
        }
      }

      .selector {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
      }
  
      .filter-label {
        display: flex;
        align-items: center;
        gap: 4px;
        color: #606266;
        margin-bottom: 12px;
      }
  
      .filter-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
  
        .filter-item {
          display: flex;
          align-items: center;
          gap: 12px;
  
          .filter-type,
          .filter-operator {
            width: 120px;
          }
  
          .filter-value {
            width:150px;
          }
  
          .delete-btn {
            padding: 8px;
            color: $white;
          }
        }
      }
  
      .add-filter-btn {
        width: 120px;
        margin-top: 8px;
        margin-bottom: 12px;
        gap: 4px;
      }
  
      .targets-wrapper {
        .target-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
  
          .target-tag {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 4px 8px;
  
            .target-avatar {
              background-color: #6b4c93;
            }
          }
        }
  
        .add-member-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 8px;
        }
      }
    }
  
    .drawer-footer {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
  }
  
  :deep(.el-drawer__header) {
    margin-bottom: 0;
  }
  
  :deep(.el-button--primary) {
    border-color: #6b4c93;
    background-color: transparent !important;
    color:#6b4c93;
    &:hover,
    &:focus {
      background-color: #6b4c93 !important;
      border-color: #6b4c93;
      color:$white;
    }
  }

  </style>