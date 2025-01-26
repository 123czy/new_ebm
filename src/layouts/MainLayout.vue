<template>
  <div class="main-layout">
    <organize-header />
    <main class="main-content">
      <router-view></router-view>
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
  }
}
</style> 