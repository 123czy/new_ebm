<template>
    <section class="ebm-ranking">
      <h2>EBM排名</h2>
      <p class="section-desc">
        所选时期的EBM总体排名，根据人气（粉丝数量）、活动（帖子数量）和参与度（查看次数、点赞次数、分享/浏览次数和评论次数）对所有组织进行排名。
      </p>
  
      <div class="ranking-content">
        <div class="ranking-header">
          <h3>指数</h3>
        </div>
  
        <div class="filter-section">
          <el-input
            v-model="searchQuery"
            placeholder="搜索"
            class="search-input"
          />
          
          <div class="filter-group">
            <div class="filter-item">
              <span class="filter-label">行业:</span>
              <el-select v-model="filters.industry" placeholder="化工类" class="filter-select">
                <el-option label="化工类" value="chemical" />
                <el-option label="所有行业" value="all" />
              </el-select>
            </div>
  
            <div class="filter-item">
              <span class="filter-label">渠道:</span>
              <el-select v-model="filters.channel" placeholder="微信" class="filter-select">
                <el-option label="微信" value="wechat" />
                <el-option label="所有渠道" value="all" />
              </el-select>
            </div>
  
            <div class="filter-item">
              <span class="filter-label">期间:</span>
              <el-select v-model="filters.period" placeholder="2025 - Week 3" class="filter-select">
                <el-option label="2025 - Week 3" value="2025-3" />
                <el-option label="2025 - Week 2" value="2025-2" />
              </el-select>
            </div>
          </div>
        </div>
  
        <el-table 
          :data="tableData" 
          style="width: 100%"
          :default-sort="{ prop: 'ranking', order: 'ascending' }"
        >
          <el-table-column prop="ranking" label="排名" width="100" sortable>
            <template #header>
              <div class="column-header">
                <span>排名</span>
                <el-tooltip content="排名说明" placement="top">
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
  
          <el-table-column prop="organization" label="组织机构" min-width="200">
            <template #header>
              <div class="column-header">
                <span>组织机构</span>
                <el-tooltip content="组织机构说明" placement="top">
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
  
          <el-table-column prop="ebmScore" label="EBM得分" sortable>
            <template #header>
              <div class="column-header">
                <span>EBM得分</span>
                <el-tooltip content="EBM得分说明" placement="top">
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
  
          <el-table-column prop="activity" label="活动" sortable>
            <template #header>
              <div class="column-header">
                <span>活动</span>
                <el-tooltip content="活动说明" placement="top">
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </div>
            </template>
            <template #default="scope">
              <span class="activity-value">{{ scope.row.activity }}</span>
            </template>
          </el-table-column>
  
          <el-table-column prop="activityLevel" label="活跃度" sortable>
            <template #header>
              <div class="column-header">
                <span>活跃度</span>
                <el-tooltip content="活跃度说明" placement="top">
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
  
          <el-table-column prop="popularity" label="欢迎度" sortable>
            <template #header>
              <div class="column-header">
                <span>欢迎度</span>
                <el-tooltip content="欢迎度说明" placement="top">
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
  
          <el-table-column prop="participation" label="参与度" sortable>
            <template #header>
              <div class="column-header">
                <span>参与度</span>
                <el-tooltip content="参与度说明" placement="top">
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table>
  
        <div class="pagination-section">
          <span class="pagination-info">显示9条中的1至9条</span>
          <div class="pagination-controls">
            <el-button class="nav-button">上一页</el-button>
            <el-button type="primary">1</el-button>
            <el-button class="nav-button">下一页</el-button>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { QuestionFilled } from '@element-plus/icons-vue'
  
  const searchQuery = ref('')
  const filters = ref({
    industry: 'chemical',
    channel: 'wechat',
    period: '2025-3'
  })
  
  const tableData = [
    {
      ranking: '139',
      organization: '巴斯夫',
      ebmScore: '7.02',
      activity: '0.00',
      activityLevel: '8.66',
      popularity: '7.59',
      participation: '5.81'
    },
    {
      ranking: '167',
      organization: '盈创（中国）投资有限公司',
      ebmScore: '5.72',
      activity: '0.00',
      activityLevel: '3.13',
      popularity: '14.19',
      participation: '3.89'
    },
    {
      ranking: '215',
      organization: '林德中国',
      ebmScore: '3.69',
      activity: '0.00',
      activityLevel: '1.84',
      popularity: '11.17',
      participation: '1.80'
    },
    {
      ranking: '225',
      organization: '汉高',
      ebmScore: '3.38',
      activity: '0.00',
      activityLevel: '4.57',
      popularity: '4.99',
      participation: '2.02'
    },
    {
      ranking: '229',
      organization: '朗盛中国',
      ebmScore: '3.32',
      activity: '0.00',
      activityLevel: '1.76',
      popularity: '10.08',
      participation: '1.55'
    },
    {
      ranking: '250',
      organization: '安道麦',
      ebmScore: '2.58',
      activity: '0.00',
      activityLevel: '1.54',
      popularity: '7.95',
      participation: '1.06'
    },
    {
      ranking: '251',
      organization: '科思创',
      ebmScore: '2.57',
      activity: '0.00',
      activityLevel: '4.54',
      popularity: '3.01',
      participation: '1.22'
    },
    {
      ranking: '295',
      organization: '法国液化空气集团',
      ebmScore: '1.25',
      activity: '0.00',
      activityLevel: '3.57',
      popularity: '0.47',
      participation: '0.16'
    },
    {
      ranking: '338',
      organization: '杜邦',
      ebmScore: '0.00',
      activity: '0.00',
      activityLevel: '0.00',
      popularity: '0.00',
      participation: '0.00'
    }
  ]
  </script>
  
  <style lang="scss" scoped>
  .ebm-ranking {
    background: white;
    padding: 24px;
    border-radius: 8px;
  
    h2 {
      font-size: 20px;
      font-weight: 500;
      color: #333;
      margin-bottom: 12px;
    }
  
    .section-desc {
      color: #666;
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 24px;
    }
  
    .ranking-content {
      .ranking-header {
        margin-bottom: 16px;
        
        h3 {
          font-size: 16px;
          color: #333;
          font-weight: 500;
        }
      }
    }
  
    .filter-section {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      align-items: center;
  
      .search-input {
        width: 240px;
      }
  
      .filter-group {
        display: flex;
        gap: 16px;
        margin-left: auto;
  
        .filter-item {
          display: flex;
          align-items: center;
          gap: 8px;
  
          .filter-label {
            color: #606266;
            font-size: 14px;
          }
  
          .filter-select {
            width: 160px;
          }
        }
      }
    }
  
    :deep(.el-table) {
      margin-bottom: 16px;
      
      .el-table__header {
        th {
          background-color: #f5f7fa;
          color: #606266;
          font-weight: 500;
          padding: 8px 0;
          
          .cell {
            display: flex;
            align-items: center;
            justify-content: space-between;
            
            &::before {
              content: none;
            }
            
            .sort-caret {
              margin-left: 4px;
            }
          }
        }
      }
  
      .column-header {
        display: flex;
        align-items: center;
        gap: 4px;
        white-space: nowrap;
  
        .el-icon {
          font-size: 14px;
          color: #909399;
          cursor: help;
        }
      }
  
      .activity-value {
        color: #409EFF;
      }
    }
  
    .pagination-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
  
      .pagination-info {
        color: #606266;
        font-size: 14px;
      }
  
      .pagination-controls {
        display: flex;
        gap: 8px;
  
        .nav-button {
          border-color: #dcdfe6;
          color: #606266;
        }
      }
    }
  }
  </style>
  
  