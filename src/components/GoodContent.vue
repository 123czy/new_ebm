<template>
    <section class="good-content">
      <h2>表现最好的内容</h2>
      <p class="section-desc">
        您可以查看选定的一周中表现最好的宣传推广排名 - 请使用行业和渠道过滤器以筛选出您期望的结果。
      </p>
      
      <div class="content-container">
        <el-tabs
          v-model="activeTab"
          tab-position="left"
          class="custom-tabs"
          @tab-change="handleTabChange"
        >
          <el-tab-pane name="most-views">
            <template #label>
              <div class="tab-label">
                <span>最多阅读数的文章</span>
                <el-icon><ArrowRight /></el-icon>
              </div>
            </template>
          </el-tab-pane>
          <el-tab-pane name="most-likes">
            <template #label>
              <div class="tab-label">
                <span>最多点赞数的文章</span>
                <el-icon><ArrowRight /></el-icon>
              </div>
            </template>
          </el-tab-pane>
          <el-tab-pane name="most-comments">
            <template #label>
              <div class="tab-label">
                <span>最多评论数的文章</span>
                <el-icon><ArrowRight /></el-icon>
              </div>
            </template>
          </el-tab-pane>
          <el-tab-pane name="most-shares">
            <template #label>
              <div class="tab-label">
                <span>最多分享/在看数的文章</span>
                <el-icon><ArrowRight /></el-icon>
              </div>
            </template>
          </el-tab-pane>
        </el-tabs>
  
        <div class="good-content-table-container">
          <el-table 
            :data="currentTableData" 
            style="width: 100%"
            v-loading="loading"
          >
            <el-table-column prop="company" label="公司名称" min-width="120" />
            <el-table-column prop="title" label="文章标题" min-width="200" />
            <el-table-column prop="views" label="阅读数" min-width="100" />
            <el-table-column prop="likes" label="点赞数" min-width="100" />
            <el-table-column prop="comments" label="评论数" min-width="100" />
            <el-table-column prop="shares" label="分享数/在看数" min-width="120" />
            <el-table-column prop="checks" label="查看数" min-width="100" />
          </el-table>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { ArrowRight } from '@element-plus/icons-vue'
  
  const activeTab = ref('most-views')
  const loading = ref(false)
  
  // Mock data for different tabs
  const mockData = {
    'most-views': [
      {
        company: '字节跳动',
        title: '2023年度技术创新报告',
        views: 150000,
        likes: 2300,
        comments: 456,
        shares: 789,
        checks: 12000
      },
      // Add more mock data...
    ],
    'most-likes': [
      {
        company: '华为',
        title: '华为最新5G技术突破',
        views: 89000,
        likes: 5600,
        comments: 890,
        shares: 1200,
        checks: 9800
      },
      // Add more mock data...
    ],
    'most-comments': [
      {
        company: '腾讯',
        title: '元宇宙发展白皮书',
        views: 92000,
        likes: 3400,
        comments: 2800,
        shares: 670,
        checks: 8900
      },
      // Add more mock data...
    ],
    'most-shares': [
      {
        company: '阿里巴巴',
        title: '数字经济新机遇',
        views: 78000,
        likes: 2900,
        comments: 560,
        shares: 4500,
        checks: 7600
      },
      // Add more mock data...
    ]
  }
  
  const currentTableData = computed(() => {
    return mockData[activeTab.value] || []
  })
  
  const handleTabChange = (tab) => {
    loading.value = true
    // Simulate API call delay
    setTimeout(() => {
      loading.value = false
    }, 500)
  }
  </script>
  
  <style lang="scss" scoped>
  .good-content {
    background: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  
    h2 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 12px;
    }
  
    .section-desc {
      color: #666;
      font-size: 14px;
      margin-bottom: 24px;
    }
  
    .content-container {
      display: flex;
      gap: 24px;
      min-height: 400px;
    }
  
    .custom-tabs {
      min-width: 200px;
  
      :deep(.el-tabs__nav) {
        width: 100%;
      }
  
      :deep(.el-tabs__item) {
        text-align: left;
        padding: 16px 20px;
        height: auto;
        
        &.is-active {
          background: #f0f7ff;
          color: #409EFF;
          
          .tab-label {
            .el-icon {
              opacity: 1;
            }
          }
        }
      }
    }
  
    .tab-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      
      .el-icon {
        opacity: 0;
        transition: opacity 0.3s;
      }
    }
  
    .good-content-table-container {
      flex: 1;
      overflow-x: auto;
    }
  
    :deep(.el-table) {
      --el-table-header-bg-color: #f5f7fa;
      
      th {
        font-weight: 600;
        color: #333;
      }
    }
  }
  </style>