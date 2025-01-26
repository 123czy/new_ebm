<template>
  <section id="rank-index">
    <div class="container">
        <div v-if="!isMobile" class="container-grid-left l-cell-l-7 l-cell-m-8  l-cell-x-12">
        <h2>{{ t('rank.title') }}</h2>
    <div v-for="(item, index) in rankIndexItems" :key="index" class="index-card">
      <h3>{{ item.title }}</h3>
      <p v-html="item.description"></p>
    </div>
        </div>
        <div class="container-grid-right l-cell-l-5 l-cell-m-4  l-cell-x-12 "> 
            <h2>{{ t('apply.title') }}</h2>
            <h3 class="apply-description">{{ t('apply.description') }}</h3>
            <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="auto"
    class="custom-form-scope"
  >
    <el-form-item  prop="name">
      <el-input class="apply-input" placeholder="您的全名*" v-model="ruleForm.name" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item  prop="company">
      <el-input class="apply-input"
        v-model="ruleForm.company"
        placeholder="您的企业全称*"
        type="text"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item  prop="email">
      <el-input class="apply-input" placeholder="您的办公邮箱*" v-model="ruleForm.email" type="email" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button class="apply-button"  @click="submitForm(ruleFormRef)">
        提交
      </el-button>
    </el-form-item>
  </el-form>
        </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { reactive, ref,computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useStore } from 'vuex'
const store = useStore()
const ruleFormRef = ref<FormInstance>()
interface EbmIndexItem {
  title: string
  description: string
}

const isMobile = computed(() => store.state.device === 'mobile')
const { t,tm } = useI18n()  // 添加 tm (translateMessage) 方法
const rankIndexItems = computed<EbmIndexItem[]>(() => {
  // 使用 tm() 而不是 t() 来获取嵌套的消息对象
  return tm('rank.list') || []
})

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please enter your email'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    // if (ruleForm.checkPass !== '') {
    //   if (!ruleFormRef.value) return
    //   ruleFormRef.value.validateField('checkPass')
    // }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please enter your Company Name'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  name: '',
  company: '',
  email: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  name: [{ validator: validatePass, trigger: 'blur' }],
  company: [{ validator: validatePass2, trigger: 'blur' }],
  email: [{ validator: checkAge, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  })
}


</script>


<style lang="scss">
/* 移除 scoped，允许样式全局生效 */
.custom-form-scope {
    margin-top:15px;
    .el-form-item__error{
        color: $button-register-color;
        font-weight: 500;
        height: 20px;
    margin-top: -30px;
    margin-bottom: 5px;
    padding-left: 10px;
    font-size: 16px;
    line-height: 1.6;
    }

      /* 错误状态下的输入框样式 */
      .el-form-item.is-error {
        .el-input {
            margin-bottom: 32px !important;
            .el-input__wrapper {
                background-color: $button-register-color !important;
                box-shadow: none !important;
            }
        }
    }

    .apply-button {
    line-height: 1.6;
    min-width: 215px;
    padding: 15px 10px;
    border-radius: 20px;
    color: $white;
    border-color: $button-register-color;
    background-color: $button-register-color;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: color 0.5s ease;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background-color: $white;
      color: $button-register-color;
      transition: left 0.5s ease;
      z-index: -1;
    }

    &:hover {
      color: $button-register-color !important;
      background-color: $white;
      &::before {
        left: 0;
      }
    }
  }

     
  .el-input {
    .el-input__wrapper {
      background-color: $white !important;
      border-radius: 25px !important;
    }

    
    .el-input__inner { 
      padding: 0 25px;
      height: 48px;
      line-height: 48px;
      font-weight: 500;
      &::placeholder {
        z-index: 9999;
        color: #B4B4B4 !important;
      }
    }
  }

  .el-button {
    &.apply-button {
      min-width: 50%;
      height: 48px;
      line-height: 48px;
      margin: 15px auto;
      border-radius: 25px;
      background-color: $button-register-color;
      color: #fff;
    }
  }

  @include mobile {
    .el-form-item__error{
        color: $background-color;
        font-weight: 500;
        height: 20px;
    margin-top: -30px;
    margin-bottom: 5px;
    padding-left: 10px;
    font-size: 16px;
    line-height: 1.6;
    }
    .el-form-item.is-error {
        .el-input {
            margin-bottom: 32px !important;
            .el-input__wrapper {
                background-color: hsla(0,0%,94.1%,.8) !important;
                box-shadow: none !important;
            }
        }
    }
  }
}
</style>

<style lang="scss" scoped>
.container{
    min-height: 85vh;
    padding: 80px 0;
    color: $white;
    h2{
        padding-left: 20px;
        margin:60px 0;  
        font-size: 48px;
        line-height: 1.2;
        font-weight: 800;
    }
    .index-card {
  padding: 20px;
  background-color: $background-color;
  .container{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    .container-grid-left{
        grid-column: 1 / 2;
    }
    .container-grid-right{
        grid-column: 2 / 3;
        padding-left:30px;
        .apply-description{
            font-size: 16px;
            line-height: 1.6;
            font-weight: 500;
        }
    }
    
  }
}
@include mobile {
    min-height: 50vh;
  .container-grid-right{
    /* margin:20px 0; */
    padding: 20px 30px!important;
    background-color: $button-register-color;
    border-bottom-right-radius: 100px;
    border-top-right-radius: 100px;
    h2{
        padding-left: 0;  
        margin:30px 0;
        font-size: 28px;
        line-height: 1.2;
        font-weight: 800;
    }
    .el-button {
    &.apply-button {
      min-width: 50%;
      height: 48px;
      line-height: 48px;
      margin: 15px auto;
      border-radius: 25px;
      background-color: $button-register-color;
      border: 2px solid $white;
      color: #fff;
    }
  }
  }
}
}
</style>