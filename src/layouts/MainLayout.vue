<template>
  <div class="main-layout">
    <organize-header />
    <main class="main-content">
      <div class="el-content-wrapper">
        <router-view></router-view>
      </div>
    </main>
    <organize-footer />
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .main-content {
    flex: 1;
    background: #F5F7FA;
    
    .el-content-wrapper {
      width: 100%;
      margin: 0 auto;
      padding: 24px;
      
      @media screen and (min-width: 1500px) {
        width: 1200px;
      }
      
      @media screen and (min-width: 768px) and (max-width: 1499px) {
        width: 80%;
      }
      
      @media screen and (max-width: 767px) {
        width: 100%;
        padding: 16px;
      }
    }
  }
}
</style> 