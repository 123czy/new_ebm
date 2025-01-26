<template>
    <div class="competitor-analysis">
      <div class="table-header">
        <h3>{{ t('analysis.title') }}</h3>
        <el-button type="primary" @click="addCompetitor">
          {{ t('analysis.addCompetitor') }}
        </el-button>
      </div>
      
      <el-table :data="competitorData" border style="width: 100%">
        <el-table-column 
          v-for="column in tableColumns" 
          :key="column.prop"
          :prop="column.prop"
          :label="t(column.label)"
          :width="column.width">
          <template #default="scope">
            <span :class="{ 'highlight': isHighlighted(scope.row, column.prop) }">
              {{ formatValue(scope.row[column.prop]) }}
            </span>
          </template>
        </el-table-column>
      </el-table>
  
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
    { prop: 'metric', label: 'analysis.columns.metric', width: '180' },
    { prop: 'bmw', label: 'analysis.columns.bmw' },
    { prop: 'benz', label: 'analysis.columns.benz' },
    { prop: 'audi', label: 'analysis.columns.audi' }
  ];
  
  const competitorData = ref([
    { metric: 'reads', bmw: 0.00037, benz: 0.00087, audi: 0.00004 },
    { metric: 'shares', bmw: 0, benz: 0, audi: 0 },
    { metric: 'engagement', bmw: 0.00037, benz: 0.00016, audi: 0.00109 }
  ]);
  
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
  
  const initChart = () => {
    if (!chartRef.value) return;
    
    chart = echarts.init(chartRef.value);
    const option = {
      title: {
        text: t('analysis.trendChart.title')
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['BMW', 'Mercedes-Benz', 'Audi']
      },
      xAxis: {
        type: 'category',
        data: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'BMW',
          type: 'line',
          data: [0.00037, 0.00035, 0.00036, 0.00037]
        },
        {
          name: 'Mercedes-Benz',
          type: 'line',
          data: [0.00087, 0.00085, 0.00086, 0.00087]
        },
        {
          name: 'Audi',
          type: 'line',
          data: [0.00004, 0.00004, 0.00004, 0.00004]
        }
      ]
    };
    
    chart.setOption(option);
  };
  
  const addCompetitor = () => {
    // Implementation for adding competitor
  };
  
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
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  
    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
  
      h3 {
        font-size: 16px;
        font-weight: 600;
        margin: 0;
      }
    }
  
    .highlight {
      color: #409EFF;
      font-weight: 600;
    }
  
    .trend-chart {
      height: 400px;
      margin-top: 30px;
    }
  }
  
  @media (max-width: 768px) {
    .competitor-analysis {
      .el-table {
        width: 100%;
        overflow-x: auto;
      }
      
      .trend-chart {
        height: 300px;
      }
    }
  }
  </style>