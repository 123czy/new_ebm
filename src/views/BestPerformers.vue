<template>
    <el-config-provider :locale="locale">
      <div class="app-container">
  
        <main class="main-content">
            <div class="filters">
          <el-select v-model="filters.industry" placeholder="所有行业">
            <el-option
              v-for="item in industries"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="filters.channel" placeholder="所有渠道">
            <el-option
              v-for="item in channels"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="filters.week" placeholder="2023-Week 3">
            <el-option
              v-for="item in weeks"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

  
          <section class="best-performance">
            <h2>{{ t('sections.bestPerformance') }}</h2>
            <p class="section-desc">{{ t('sections.bestPerformanceDesc') }}</p>
            
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12" :md="8" v-for="card in performanceCards" :key="card.id">
                <el-card class="metric-card">
                  <h3>{{ t(card.title) }}</h3>
                  <div class="metric-content">
                    <span class="company">{{ card.company }}</span>
                    <span class="value">{{ card.value }}{{ card.unit }}</span>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </section>
  
          <GoodContent />
  
          <EbmRanking />
        </main>
      </div>
    </el-config-provider>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { ArrowDown, Monitor } from '@element-plus/icons-vue'
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
  import en from 'element-plus/dist/locale/en.mjs'
  
  const { t } = useI18n()
  const currentLang = ref('zh')
  const locale = ref(zhCn)
  
  const toggleLang = () => {
    currentLang.value = currentLang.value === 'zh' ? 'en' : 'zh'
    locale.value = currentLang.value === 'zh' ? zhCn : en
  }
  
  // Mock data
  const filters = reactive({
    industry: '',
    channel: '',
    week: '2023-3'
  })
  
  const performanceCards = [
    {
      id: 1,
      title: 'metrics.engagement',
      company: '字节跳动',
      value: '47.76',
      unit: '分'
    },
    {
      id: 2,
      title: 'metrics.influence',
      company: '艾佛维尔中国',
      value: '+0.00',
      unit: ''
    },
    {
      id: 3,
      title: 'metrics.activity',
      company: '中国联通',
      value: '27,155',
      unit: '次数'
    }
  ]
  
  const contentTabs = [
    {
      name: 'all',
      label: 'tabs.allContent',
      data: [],
      columns: [
        { prop: 'title', label: 'contentTable.title' },
        { prop: 'date', label: 'contentTable.date' },
        { prop: 'views', label: 'contentTable.views' }
      ]
    }
  ]
  
  const rankingData = [
    {
      company: '字节跳动',
      score: '47.76',
      engagement: '39.74',
      influence: '29.68',
      activity: '59.55'
    },
    {
      company: '华为',
      score: '41.69',
      engagement: '53.33',
      influence: '29.05',
      activity: '40.35'
    },
    {
      company: '腾讯',
      score: '41.69',
      engagement: '44.40',
      influence: '21.87',
      activity: '48.40'
    }
  ]
  
  const currentPage = ref(1)
  const handlePageChange = (page) => {
    currentPage.value = page
  }
  </script>
  
  <style lang="scss" scoped>
  .app-container {
    min-height: 100vh;
    background-color: #f5f7fa;
  }
  
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  
    .header-left, .header-right {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  
    .logo {
      height: 30px;
    }
  }
  
  .main-content {
  padding: 80px 20px 20px; /* Increased top padding */
  max-width: 1200px;
  margin: 0 auto;

  .filters {
    max-width: 1200px;
    margin: 0 auto;
    position: fixed;
    top: 60px; /* Adjust based on header height */
    left: 0;
    right: 0;
    z-index: 100;
    background-color: #f5f7fa;
    padding: 20px;
    display: flex;
    gap: 20px;
    justify-content: flex-end;

    .el-select {
      width: 200px;
    }
  }
}
  
  .metric-card {
    margin-bottom: 20px;
    
    h3 {
      color: #666;
      font-size: 14px;
      margin-bottom: 10px;
    }
  
    .metric-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
  
      .company {
        font-size: 16px;
        color: #333;
      }
  
      .value {
        font-size: 20px;
        font-weight: bold;
        color: #409EFF;
      }
    }
  }
  
  section {
    margin-bottom: 40px;
    background-color: #fff;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  
    h2 {
      font-size: 18px;
      color: #333;
      margin-bottom: 10px;
    }
  
    .section-desc {
      color: #666;
      font-size: 14px;
      margin-bottom: 20px;
    }
  }
  
  .ebm-ranking {
    :deep(.el-pagination) {
      margin-top: 20px;
      justify-content: center;
    }
  }
  </style>