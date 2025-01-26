<template>
    <el-config-provider >
      <div class="app-container">
        <!-- <OrganizeHeader /> -->
        <el-main>
            <div class="app-content">
            <!-- <img src="/logo.svg" alt="EBM Logo" class="logo" /> -->
            <el-select v-model="currentWeek" class="week-selector">
              <el-option
                v-for="week in weeks"
                :key="week"
                :label="week"
                :value="week"
              />
            </el-select>
          </div>
          <company-header />
          <statistics-panel />
          <competitor-analysis />
        </el-main>
      </div>
      <!-- <organize-footer /> -->
    </el-config-provider>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { ElConfigProvider } from 'element-plus';

  
  const currentWeek = ref('2025 - Week 3');
  const weeks = [
    '2025 - Week 3',
    '2025 - Week 2',
    '2025 - Week 1',
    '2024 - Week 52',
    '2024 - Week 51',
    '2024 - Week 50'
  ];
  </script>
  
  <style lang="scss" scoped>
  :root {
    --primary-color: #409EFF;
    --text-primary: #333333;
    --text-secondary: #666666;
    --border-color: #EBEEF5;
    --background-color: #F5F7FA;
  }
  
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background-color);
  }
  
  .app-container {
    min-height: 100vh;
    
   

    .app-content {
        margin: 0 auto;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: flex-end;   
        .logo {
          height: 32px;
        }
        
        .week-selector {
          width: 160px;
        }
      }
    .el-main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
  }
  
  @media (max-width: 768px) {
    .app-container {
      .el-header {
        .header-content {
          padding: 0 16px;
          
          .logo {
            height: 24px;
          }
          
          .week-selector {
            width: 140px;
          }
        }
      }
      
      .el-main {
        padding: 16px;
      }
    }
  }
  </style>