<template>
    <div class="competitor-analysis">
      <div class="table-header">
        <h3>{{ t('analysis.title') }}</h3>
        <div class="select-container">
          <el-select
            v-model="value"
            placeholder="所有渠道"
      style="width: 200px"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="t('platforms.' + item.value)"
        :value="item.value"
      />
    </el-select>
        <el-button class="ml-24" type="primary" @click="addCompetitor">
          {{ t('analysis.addCompetitor') }}
        </el-button>
      </div>
      </div>
      
      <el-table 
        :data="competitorData" 
        style="width: 100%"
        @row-click="handleRowClick"
        highlight-current-row>
        <el-table-column class-name="column1" prop="metric" :label="t('analysis.columns.metric')" width="200" >
          <template #default="scope"> 
            <div>
              <span>{{ t('analysis.metric.'+ scope.row.metric) }}</span>
            <el-tooltip content="查看详情" placement="top">
                  <el-icon class="question-icon ml-8" size="16"><QuestionFilled /></el-icon>
            </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column 
          v-for="column in tableColumns" 
          :key="column.prop"
          :prop="column.prop"
          :label="t(column.label)"
          :width="column?.width">
          <template #default="scope">
            <span :class="{ 'highlight': isHighlighted(scope.row, column.prop) }">
              {{ formatValue(scope.row[column.prop]) }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      
        <p class="metric-description">
        <el-icon class="info-icon" size="16"><Warning /></el-icon>
        {{ t('analysis.metricDescription') }}</p>
        <div class="trend-chart" ref="chartRef"></div>
      
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import * as echarts from 'echarts';
  
  const { t } = useI18n();
  const chartRef = ref<HTMLElement>();
  let chart: echarts.ECharts;
  
  const tableColumns = [
    { prop: 'bmw', label: 'analysis.columns.bmw' },
    { prop: 'benz', label: 'analysis.columns.benz'  },
    { prop: 'audi', label: 'analysis.columns.audi'},
  ];
  
  interface CompetitorData {
    metric: string;
    bmw: number;
    benz: number;
    audi: number;
    volvo: number;
    ford: number;
    tesla: number;
  }

  const competitorData = ref<CompetitorData[]>([
    { 
      metric: 'newFollowers',
      bmw: 0,
      benz: 0,
      audi: 0,
      volvo: 0,
      ford: 0,
      tesla: 0
    },
    {
      metric: 'posts',
      bmw: 0,
      benz: 0,
      audi: 0,
      volvo: 0,
      ford: 0,
      tesla: 0
    },
    {
      metric: 'wechatReads',
      bmw: 0,
      benz: 0,
      audi: 0,
      volvo: 0,
      ford: 0,
      tesla: 0
    },
    {
      metric: 'avgReads',
      bmw: 0,
      benz: 0,
      audi: 0,
      volvo: 0,
      ford: 0,
      tesla: 0
    },
    {
      metric: 'readsToFollowersRatio',
      bmw: 0.00037,
      benz: 0.00087,
      audi: 0.00004,
      volvo: 0.00127,
      ford: 0.00003,
      tesla: 0.00007
    },
    {
      metric: 'likes',
      bmw: 0,
      benz: 0,
      audi: 0,
      volvo: 0,
      ford: 0,
      tesla: 0
    },
    {
      metric: 'avgLikes',
      bmw: 0,
      benz: 0,
      audi: 0,
      volvo: 0,
      ford: 0,
      tesla: 0
    },
    {
      metric: 'likesToFollowersRatio',
      bmw: 0.00037,
      benz: 0.00016,
      audi: 0.00109,
      volvo: 0.00073,
      ford: 0.00010,
      tesla: 0.00004
    },
    {
      metric: 'viewsAndLikes',
      bmw: 0,
      benz: 0,
      audi: 0,
      volvo: 0,
      ford: 0,
      tesla: 0
    },
    {
      metric: 'avgViewsAndLikes',
      bmw: 0,
      benz: 0,
      audi: 0,
      volvo: 0,
      ford: 0,
      tesla: 0
    },
    {
      metric: 'viewsToFollowersRatio',
      bmw: 0.00000,
      benz: 0.00000,
      audi: 0.00052,
      volvo: 0.00009,
      ford: 0.00001,
      tesla: 0.00000
    },
    {
      metric: 'engagementRate',
      bmw: 0,
      benz: 0,
      audi: 0,
      volvo: 0,
      ford: 0,
      tesla: 0
    }
  ]);

  const value = ref('')

const options = [
  {
    value: 'linkedin',
    label: '领英',
  },
  {
    value: 'wechat',
    label: '微信',
  },
  {
    value: 'kanzhun',
    label: '看准',
  },
  {
    value: 'weibo',
    label: '微博',
  }
]
  
  const formatValue = (value: number) => {
    return typeof value === 'number' ? value.toFixed(5) : value;
  };
  
  const isHighlighted = (row: any, prop: string) => {
    if (prop === 'metric') return false;
    const values = Object.entries(row)
      .filter(([key]) => key !== 'metric')
      .map(([, value]) => value as number);
    return Math.max(...values) === row[prop];
  };
  
  const currentMetric = ref<string>('');
  const chartData = ref({
    weeks: ['2024 - Week 48', '2024 - Week 49', '2024 - Week 50', '2024 - Week 51', 
           '2024 - Week 52', '2025 - Week 1', '2025 - Week 2', '2025 - Week 3'],
    series: [
      {
        name: '宝马',
        data: [0.00037, 0.00037, 0.00037, 0.00037, 0.00037, 0.00037, 0.00037, 0.00037]
      },
      {
        name: '沃尔沃',
        data: [0.00087, 0.00087, 0.00087, 0.00087, 0.00087, 0.00087, 0.00087, 0.00087]
      },
      {
        name: '戴姆勒/梅赛德斯-奔驰',
        data: [0.00004, 0.00004, 0.00004, 0.00004, 0.00004, 0.00004, 0.00004, 0.00004]
      }
    ]
  });

  const handleRowClick = (row: CompetitorData) => {
    currentMetric.value = row.metric;
    updateChart(row);
  };

  const updateChart = (row: CompetitorData) => {
    if (!chart) return;
    
    const option = {
      title: {
        text: t(`analysis.metric.${currentMetric.value}`),
        left: 'center',
        top: 30,
        padding: [0, 0, 30, 0]
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        top: 'bottom',
        data: ['宝马', '沃尔沃', '戴姆勒/梅赛德斯-奔驰']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '18%',
        top: '20%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: chartData.value.weeks,
        axisLabel: {
          interval: 0,
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => value.toFixed(5)
        }
      },
      series: chartData.value.series.map(item => ({
        name: item.name,
        type: 'line',
        data: item.data,
        smooth: true
      }))
    };
    
    chart.setOption(option);
  };

  const initChart = () => {
    if (!chartRef.value) return;
    
    chart = echarts.init(chartRef.value);
    // 初始化时显示第一行数据
    if (competitorData.value.length > 0) {
      handleRowClick(competitorData.value[0]);
    }
  };
  
  const addCompetitor = () => {
    // Implementation for adding competitor
  };
  
  // 获取指标的本地化名称
  const getMetricLabel = (metric: string) => {
    return t(`metric.${metric}`)
  }
  
  onMounted(() => {
    initChart();
    window.addEventListener('resize', () => chart?.resize());
  });
  
  onUnmounted(() => {
    chart?.dispose();
    window.removeEventListener('resize', () => chart?.resize());
  });
  </script>
  
  <style lang="scss" scoped>
  .competitor-analysis {
    border-radius: 8px;
    margin-top: 20px;
  
    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
  
      h3 {
        color: #333;
        font-size: 20px;
        font-weight: 600;
        margin: 0;
      }

    
    }

    .question-icon {
      color: #999;
      cursor: pointer;
      position: relative;
      top: 3px;
      font-weight: 600;
    }
  
    .highlight {
      font-weight: 600;
    }
    .metric-description{
      padding: 20px 0;  
      background-color: #fff;
      color: #9aa0ac;
      font-size: 16px;
      text-align: center;
      .info-icon{
        position: relative;
        top: 3px;
      }
    }
    
  }
  .trend-chart {
      background-color: #fff;
      height: 500px;
      padding: 20px;
    }

  
  @media (max-width: 768px) {
    .competitor-analysis {
      .el-table {
        width: 100%;
        overflow-x: auto;
      }
      
      .trend-chart {
        background-color: #fff;
        height: 400px;
      }
    }
  }
  </style>