<template>
    <div class="back-to-top" v-show="show">
        <el-icon  size="28" color="#fff" @click="backToTop"><Upload /></el-icon>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const show = ref(false)

const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
    show.value = window.scrollY > 1000
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.back-to-top{
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 70px;
    right: 20px;
    background-color: #36235f;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
</style>