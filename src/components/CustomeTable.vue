<template>
    <div class="custom-table">
      <!-- Search Bar -->
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
  
      <!-- Table -->
      <el-table
        class="cus_table"
        :data="tableData"
        style="width: 100%"
        :border="border"
        v-bind="$attrs"
      >
        <slot></slot>
      </el-table>
  
      <!-- Pagination -->
      <div class="pagination-container">
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
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { Search } from '@element-plus/icons-vue'
  
  interface Props {
    data: any[]
    border?: boolean
  }
  
  const props = withDefaults(defineProps<Props>(), {
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
  
  <style scoped>
  .custom-table {
    background: #fff;
    border-radius: 4px;
    border:1px solid rgba(0,40,100,.12);
  }
  
  .search-bar {
    color: #495057;
    padding: 16px 12px ;
    border-bottom: 1px solid rgba(0,40,100,.12);
  }
  
  .search-input {
    width: 180px;
  }


  
  .pagination-container {
    padding: 16px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .total-info {
    color: #606266;
    font-size: 14px;
  }
  </style>