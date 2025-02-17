<template>
    <div class="custom-table">
      <!-- Search Bar -->
      <div class="table_title" v-if="showTitle">
        <div class="title">
          <span class="title-text">{{ tableTitle }}</span>
        </div>
      </div>
      <div class="table_header" v-if="showTableHeader">
        <div class="search-bar">
        搜索
        <el-input
          v-model="searchQuery"
          placeholder=""
          class="search-input"
          @input="handleSearch"
        >
        </el-input>
        </div>
      <div class="channel" v-if="showChannel">
        <span class="filter-label">渠道：</span>
              <el-select v-model="channel" style="width: 150px" class="filter-select">
                <el-option v-for="item in channellist" :key="item.id" :label="t(`${item.label}`)" :value="item.value" />
              </el-select>
      </div>
      </div>
      
  
      <!-- Table -->
      <el-table
        class="cus_table"
        :data="tableData"
        style="width: 100%"
        :border="border"
        v-bind="$attrs"
        :empty-text="t('organization.noData')"
      >
        <slot></slot>
      </el-table>
  
      <!-- Pagination -->
      <div class="pagination-container">
        <div class="pagination-scroll-wrapper">
        <span class="total-info">显示{{ pageSize }}条中的{{ startIndex }}至{{ endIndex }}条</span>
        <el-pagination
          background 
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { Search } from '@element-plus/icons-vue'
  import {useI18n} from 'vue-i18n'
  const { t } = useI18n()
  interface Props {
    data: any[],
    tableTitle?: string,
    showTitle?: boolean,
    showTableHeader?: boolean,
    showChannel?: boolean,
    border?: boolean
  }
  interface Props2 {
    id: number
    value: string
    label: string
  }

  const channel = ref<string>('all')
  
  const channellist = ref<Props2[]>([
  { 
    id:0,
    value: 'all',
    label: 'platforms.ALL'
  },
  {
    id:1,
    value: 'wechat',
    label: 'platforms.wechat'
  },
  {
    id:2,
    value: 'linkedin',
    label: 'platforms.linkedin'
  },
  {
    id:3,
    value: 'weibo',
    label: 'platforms.weibo'
  },
  {
    id:4,
    value: 'kanzhun',
    label: 'platforms.kanzhun'
  }
  ])

  
  const props = withDefaults(defineProps<Props>(), {
    tableTitle:'',
    showTitle: false,
    showTableHeader: true,
    showChannel: false,
    border: false
  })
  
  const emit = defineEmits(['update:data', 'search', 'page-change'])
  
  // Search
  const searchQuery = ref('')
  const handleSearch = () => {
    emit('search', searchQuery.value)
  }
  
  // Pagination
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = computed(() => props.data.length)
  
  const startIndex = computed(() => (currentPage.value - 1) * pageSize.value + 1)
  const endIndex = computed(() => Math.min(currentPage.value * pageSize.value, total.value))
  
  const tableData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return props.data.slice(start, start + pageSize.value)
  })
  
  const handleSizeChange = (val: number) => {
    pageSize.value = val
    emit('page-change', { page: currentPage.value, pageSize: pageSize.value })
  }
  
  const handleCurrentChange = (val: number) => {
    currentPage.value = val
    emit('page-change', { page: currentPage.value, pageSize: pageSize.value })
  }
  </script>
  
  <style scoped lang="scss">
  .custom-table {
    background: #fff;
    border-radius: 4px;
    border:1px solid rgba(0,40,100,.12);
  }

  .table_header{
    padding: 16px 12px ;
    display: flex;
    justify-content: space-between;
    align-items: center;  
    border-bottom: 1px solid rgba(0,40,100,.12);
  }

  .table_title{
    padding: 16px 12px ;
    border-bottom: 1px solid rgba(0,40,100,.12);
    .title-text{
    font-size: 18px;
    color: $table-header-color;
    }
  }
  
  
  .search-bar {
    color: $table-header-color;
  }
  
  .search-input {
    width: 180px;
  }
  

  
  .pagination-container {
    
    .pagination-scroll-wrapper {
      padding: 16px 12px 22px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  overflow-x: scroll;
}

.pagination-scroll-wrapper::-webkit-scrollbar {
  height: 6px;
}

.pagination-scroll-wrapper::-webkit-scrollbar-thumb {
  background-color: $table-scroll-color;
  border-radius: 4px;
}

.pagination-scroll-wrapper::-webkit-scrollbar-track {
  background-color: $table-scroll-color;
  }
  }
  
  .total-info {
    color: #606266;
    font-size: 14px;
  }
  </style>