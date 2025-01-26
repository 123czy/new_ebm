<template>
    <section class="footer">
        <div v-if="isMobile" class="footer-title">
            关注我们 即时更新榜单
        </div>
        <div  class="footer-icon">
            <div @click="centerDialogVisible = true" class="footer-icon-item" >  
                <img src="@/assets/svg/weixin.svg" alt="weixin">
            </div>
            <div class="footer-icon-item" > 
                <a href="https://www.weibo.com/p/1006062690478861" target="_blank"> 
                    <img src="@/assets/svg/weibo.svg" alt="weibo">
                </a>
            </div>
        </div>
        <div v-if="!isMobile" class="footer-top">
            <div class="footer-top-left l-cell-x-6">
                <h3>{{ $t('footer.title') }}</h3>
                <p >{{ $t('footer.description') }}</p>
            </div>
            <div class="footer-top-right l-cell-x-6">
                <h3 class="footer-top-right-title">{{ $t('footer.subTitle') }}</h3>
                <div class="footer-top-right-input-box">
                    <el-input  class="footer-top-right-input" v-model="email" @change="checkEmail" :placeholder="$t('footer.placeholder')" />
                    <el-button class="footer-top-right-button" @click="subscribe">{{ $t('footer.buttonText') }}</el-button>
                </div>
                <p v-if="showError" class="error-text">{{ errorText }}</p>   
            </div>
        </div>
        <div class="footer-content">
            <p>The Employer Branding Monitor™ © 2025. All Rights Reserved. 沪ICP备16053590号-8</p>
        </div>

        <el-dialog v-model="centerDialogVisible"  width="300"  center>
        <span>
            <img src="@/assets/images/qr_wechat.jpg" alt="weixin" style="width: 100%; height: 100%;">
        </span>
       </el-dialog>
    </section>
</template>

<script lang="ts" setup>
import { ref,computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const isMobile = computed(() => store.state.device === 'mobile')
const centerDialogVisible = ref(false)
const email = ref('')
const showError = ref(false)
const errorText = ref('Please enter your valid Email')
const subscribe = () => {
    if(email.value){
        console.log(email.value)
    }else{
        showError.value = true 
    }
}
const checkEmail = () => {
    if(email.value){
        showError.value = false
    }else{
        showError.value = true
    }
}

</script>

<style lang="scss" scoped>
.footer{
    max-width: 1600px;
    margin: 0 auto;
}
.footer-title{
    text-align: center;
    font-size: 28px;
    line-height: 1.2;
    font-weight: 800;
    margin-bottom: 15px;
    color: $white;
}
.footer-icon{
    position: relative;
    right: 30px;
    top: 30px;
    display: flex;
    justify-content: flex-end;
    margin: 15px 30px 0 0;
    @include mobile {
        position: relative;
        right: 0;
        top: 0;
        display:flex;
        justify-content: center;
        margin:45px 0 50px 0;
        
    }
    .footer-icon-item{
        width: 75px;
        height: 75px;
        margin-right: 15px;
        cursor: pointer;
        &:hover{
            transition: all 0.3s ease-in-out;
            transform: scale(1.2);
        }
        img{
            width: 100%;
            height: 100%;
        }
    }
}
.footer-top{
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        background-color: $button-register-color;
        padding: 50px 70px;
        .footer-top-left{
            color: $white;
            padding:15px 70px 15px 0;
            h3{
                font-weight: 700;
            }
        }       
        .footer-top-right{
            padding: 15px;
            .footer-top-right-title{
                font-size: 18px;
                font-weight: 700;
                color: $white;
                margin-bottom: 15px;
            }
            .footer-top-right-input-box{
                display: flex;
                align-items: center;
                .footer-top-right-input{
                    height: 48px;
                    line-height: 48px;
                    :deep(.el-input__wrapper){
                        padding: 0 25px;
                        border-radius: 25px;
                    }
                    
                }
            .footer-top-right-button{
                background-color: $button-register-color;
                color: $white;
                border: 2px solid $white;
                border-radius: 25px;
                padding: 0 30px;
                height: 48px;
                line-height: 48px;
                margin-left: 15px;
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
      transition: left 0.5s ease;
      z-index: -1;
    }

    &:hover {
      color: $button-register-color;
      &::before {
        left: 0;
      }
    }
            }
            
            }
            .error-text{
                color: $white;
                margin-top: 10px;
                font-size: 18px;
                padding-left:10px;
            }
        }
}
.footer-content{
    text-align: center;
    font-size: 12px;
    line-height: 1.6;
    padding: 30px;
    color: $white;
}
</style>
