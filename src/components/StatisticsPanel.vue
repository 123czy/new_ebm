<template>
    <div class="statistics-panel">
      <h3 class="panel-title">{{ t('statistics.title') }}</h3>
      <div class="stats-grid">
        <div v-for="stat in statistics" 
             :key="stat.id" 
             class="stat-card">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ t(stat.label) }}</div>
          <el-tooltip :content="t(stat.tooltip)" placement="top">
            <el-icon class="info-icon"><InfoFilled /></el-icon>
          </el-tooltip>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { InfoFilled } from '@element-plus/icons-vue';
  
  const { t } = useI18n();
  
  const statistics = [
    { id: 1, value: '18.34', label: 'stats.ebmScore', tooltip: 'tooltips.ebmScore' },
    { id: 2, value: '17', label: 'stats.ranking', tooltip: 'tooltips.ranking' },
    { id: 3, value: '0', label: 'stats.socialInteractions', tooltip: 'tooltips.socialInteractions' },
    { id: 4, value: '0', label: 'stats.mentions', tooltip: 'tooltips.mentions' },
    { id: 5, value: '0', label: 'stats.shares', tooltip: 'tooltips.shares' },
    { id: 6, value: '3,095,780', label: 'stats.totalReach', tooltip: 'tooltips.totalReach' }
  ];
  </script>
  
  <style lang="scss" scoped>
  .statistics-panel {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  
    .panel-title {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 20px;
    }
  
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
  
    .stat-card {
      position: relative;
      padding: 16px;
      border: 1px solid #eee;
      border-radius: 6px;
      text-align: center;
  
      .stat-value {
        font-size: 24px;
        font-weight: 600;
        color: #333;
      }
  
      .stat-label {
        font-size: 14px;
        color: #666;
        margin-top: 8px;
      }
  
      .info-icon {
        position: absolute;
        top: 8px;
        right: 8px;
        font-size: 16px;
        color: #909399;
        cursor: help;
      }
    }
  }
  
  @media (max-width: 768px) {
    .statistics-panel {
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
  
  @media (max-width: 480px) {
    .statistics-panel {
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  }
  </style>