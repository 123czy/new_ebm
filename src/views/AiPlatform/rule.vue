<template>
    <div class="warning-rules">
      <!-- 搜索区域 -->
      <div class="search-section">
        <div class="search-item">
          <span class="label">预警规则名称：</span>
          <el-input
            v-model="searchForm.ruleName"
            placeholder="请输入预警名称"
            clearable
          />
        </div>
        <div class="search-item">
          <span class="label">平台：</span>
          <el-select v-model="searchForm.platform" placeholder="全部" clearable>
            <el-option label="全部" value="" />
            <el-option label="小红书" value="xiaohongshu" />
            <el-option label="微博" value="weibo" />
            <el-option label="bilibili" value="bilibili" />
            <el-option label="快手" value="kuaishou" />
            <el-option label="抖音" value="douyin" />
            <el-option label="知乎" value="zhihu" />
          </el-select>
        </div>
        <div class="search-item">
          <span class="label">预警级别：</span>
          <el-select v-model="searchForm.level" placeholder="全部" clearable>
            <el-option label="全部" value="" />
            <el-option label="A" value="A" />
            <el-option label="B" value="B" />
            <el-option label="C" value="C" />
          </el-select>
        </div>
        <div class="search-buttons">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </div>
  
      <!-- 操作按钮区域 -->
      <div class="operation-table">
        <div class="operation-section">
        <el-button type="primary" @click="handleAddRule">
          新增预警规则
        </el-button>
        </div>
              <!-- 表格区域 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="headerCellStyle"
      >
        <el-table-column prop="ruleName" label="预警规则名称" min-width="200" />
        <el-table-column prop="platform" label="平台" width="120">
          <template #default="{ row }">
            {{ getPlatformName(row.platform) }}
          </template>
        </el-table-column>
        <el-table-column prop="fansCount" label="账号粉丝数" width="120">
          <template #default="{ row }">
            {{ row.fansCount }}W
          </template>
        </el-table-column>
        <el-table-column prop="target" label="预警对象" width="120" />
        <el-table-column prop="level" label="预警级别" width="100" />
        <el-table-column prop="creator" label="创建人" width="120" />
        <el-table-column prop="updateTime" label="更新时间" width="180" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button
              type="text"
              link
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              link
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      
  

  
      <!-- 分页区域 -->
      <!-- Pagination -->
      <div class="pagination-container">
        <span class="total-info">显示{{ tableData.length }}条中的{{ startIndex }}至{{ endIndex }}条</span>
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

      <AddWarningRule  v-model:visible="addRuleVisible" @submit="handleAddRuleSubmit"/>
    </div>
  </template>

  
  <script setup lang="ts">
  import { ref, reactive, computed } from 'vue'
  
  interface SearchForm {
    ruleName: string
    platform: string
    level: string
  }
  
  interface TableItem {
    id: number
    ruleName: string
    platform: string
    fansCount: number
    target: string
    level: string
    creator: string
    updateTime: string
  }

  const addRuleVisible = ref(false)

  // 搜索表单数据
  const searchForm = reactive<SearchForm>({
    ruleName: '',
    platform: '',
    level: ''
  })
  
  // 表格数据
  const tableData = ref<TableItem[]>([
    {
      id: 1,
      ruleName: '路人账号发布moody负面内容',
      platform: 'xiaohongshu',
      fansCount: 10.03,
      target: '路人甲',
      level: 'A',
      creator: '路人甲',
      updateTime: '2022-06-22 17:45:54'
    },
    {
      id: 2,
      ruleName: '路人账号发布moody负面内容',
      platform: 'weibo',
      fansCount: 10.03,
      target: '路人甲',
      level: 'A',
      creator: '路人甲',
      updateTime: '2022-06-22 17:45:54'
    },
    {
      id: 3,
      ruleName: '路人账号发布moody负面内容',
      platform: 'bilibili',
      fansCount: 10.03,
      target: '路人甲',
      level: 'A',
      creator: '路人甲',
      updateTime: '2022-06-22 17:45:54'
    },
    {
      id: 4,
      ruleName: '路人账号发布moody负面内容',
      platform: 'kuaishou',
      fansCount: 10.03,
      target: '路人甲',
      level: 'B',
      creator: '路人甲',
      updateTime: '2022-06-22 17:45:54'
    },
    {
      id: 5,
      ruleName: '路人账号发布moody负面内容',
      platform: 'douyin',
      fansCount: 10.03,
      target: '路人甲',
      level: 'A',
      creator: '路人甲',
      updateTime: '2022-06-22 17:45:54'
    },
    {
      id: 6,
      ruleName: '路人账号发布moody负面内容',
      platform: 'zhihu',
      fansCount: 10.03,
      target: '路人甲',
      level: 'C',
      creator: '路人甲',
      updateTime: '2022-06-22 17:45:54'
    }
  ])
  
  // 分页数据
  const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 74
  })
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = computed(() => tableData.value.length)
  
  const startIndex = computed(() => (currentPage.value - 1) * pageSize.value + 1)
  const endIndex = computed(() => Math.min(currentPage.value * pageSize.value, total.value))
  
  
  // 表头样式
  const headerCellStyle = {
    backgroundColor: '#36235f',
    color: '#ffffff',
    fontWeight: 'normal'
  }
  
  // 平台名称映射
  const getPlatformName = (platform: string): string => {
    const platformMap: Record<string, string> = {
      xiaohongshu: '小红书',
      weibo: '微博',
      bilibili: 'bilibili',
      kuaishou: '快手',
      douyin: '抖音',
      zhihu: '知乎'
    }
    return platformMap[platform] || platform
  }
  
  // 搜索方法
  const handleSearch = () => {
    console.log('搜索条件：', searchForm)
  }
  
  // 重置方法
  const handleReset = () => {
    searchForm.ruleName = ''
    searchForm.platform = ''
    searchForm.level = ''
    handleSearch()
  }
  
  // 新增规则
  const handleAddRule = () => {
    addRuleVisible.value = true
    console.log('新增规则')
    // TODO: 跳转到新增页面或打开新增弹窗
  }
  
  // 编辑规则
  const handleEdit = (row: TableItem) => {
    console.log('编辑规则：', row)
    // TODO: 跳转到编辑页面或打开编辑弹窗
  }

  // 添加提交处理方法
const handleAddRuleSubmit = (formData: any) => {
  console.log('新增规则数据：', formData)
  // TODO: 调用接口保存数据
}
  
  // 删除规则
  const handleDelete = (row: TableItem) => {
    console.log('删除规则：', row)
    // TODO: 调用删除接口
  }
  
  // 分页方法
  const handleSizeChange = (val: number) => {
    pagination.pageSize = val
    handleSearch()
  }
  
  const handleCurrentChange = (val: number) => {
    pagination.currentPage = val
    handleSearch()
  }
  </script>
  
  <style lang="scss" scoped>
  .warning-rules {
    background-color: $secondary-color;
  
    .search-section {
      background-color: $white;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding:20px;
      margin-bottom: 20px;
      align-items: center;
  
      .search-item {
        display: flex;
        align-items: center;
  
        .label {
          white-space: nowrap;
          margin-right: 8px;
          color: #606266;
        }
  
        .el-input {
          width: 200px;
        }
  
        .el-select {
          width: 200px;
        }
      }
  
      .search-buttons {
        .el-button {
          margin-left: 0;
          margin-right: 8px;
  
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .operation-table{
      padding:20px;
      background-color: $white;
    }
    .operation-section {
      margin-bottom: 20px;
      display: flex;
      justify-content: flex-end;
    }

    .pagination-container {
        background-color: $white;
        padding: 16px 20px 22px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
  
  }
  
  :deep(.el-button--primary) {
    background-color: $table-button;
    border-color: $table-button;
  
    &:hover,
    &:focus {
      background-color: #7d5ba8;
      border-color: #7d5ba8;
    }
  }
  
  :deep(.el-button--primary.is-link) {
    color: $table-button;
  
    &:hover,
    &:focus {
      color: #7d5ba8;
    }
  }
  
  :deep(.el-pagination.is-background) {
    .el-pager li:not(.is-disabled).is-active {
      background-color: $table-button;
    }
  }
  </style>