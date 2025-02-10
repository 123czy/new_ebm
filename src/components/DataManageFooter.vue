<template>
    <div class="footer">
        <el-button class="btn" size="large" icon="Back" @click="handleBack">{{ t('commonSaves.back') }}</el-button>
        <el-button class="btn" size="large" icon="Edit">{{ t('commonSaves.edit') }}</el-button>
        <el-button class="del_btn" size="large" icon="Delete">{{ t('commonSaves.delete') }}</el-button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const router = useRouter()

const handleBack = () => {
    router.go(-1)
}
</script>

<style lang="scss" scoped>
.footer {
    display: flex;
    justify-content: flex-start;
    padding: 16px 24px;
    margin:24px 0;
    background: #fff;
    border-top: 1px solid #eee;
    .btn{
        &:hover{
            color: #495057;
            background-color: #f6f6f6;
            border-color: rgba(0, 20, 49, .12);
        }
    }
    .del_btn{
        color: #cd201f;
        border-color: #cd201f;
        &:hover{
            background: #cd201f;
            color: #fff;
        }
    }
}
</style>