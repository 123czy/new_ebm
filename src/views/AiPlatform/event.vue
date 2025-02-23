<template>
    <div class="warning-rules">
      <!-- 搜索区域 -->
      <div class="search-section">
        <div class="search-item">
          <span class="label">事件等级：</span>
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
          <span class="label">事件状态：</span>
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
              <!-- 表格区域 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="headerCellStyle"
      >
      <el-table-column prop="eventId" label="事件编号" width="180">
  <template #default="{ row }">
    <div class="event-id"
      @click="handleEventDetail(row)"
    >
      {{ row.eventId }}
    </div>
  </template>
</el-table-column>
      <el-table-column prop="level" label="事件等级"  />
      <el-table-column prop="category" label="问题类别" min-width="180" />
      <el-table-column prop="interaction" label="内容互动数" width="120">
        <template #default="{ row }">
          <span :class="{ 'highlight-number': isHighlightNumber(row.interaction) }">
            {{ formatInteraction(row.interaction) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="creator" label="事件生成人" width="120" />
      <el-table-column prop="createTime" label="事件生成时间" width="180" />
      <el-table-column prop="status" label="事件状态" width="100">
        <template #default="{ row }">
          <el-tag
            :type="row.status === 'processing' ? 'warning' : 'success'"
            effect="plain"
          >
            {{ row.status === 'processing' ? '处理中' : '已完成' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="事件更新时间" width="180" />
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

      <EventDetail  v-model:visible="detailVisible" :data="currentEvent" @submit="handleAddRuleSubmit"/>
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
  eventId: string
  level: string
  category: string
  interaction: number | string
  creator: string
  createTime: string
  status: string
  updateTime: string
}

interface EventDetail extends TableItem {
  orderId: string
  platform: string
  title: string
  publishTime: string
  author: string
  content: string
}

  const addRuleVisible = ref(false)

  // 搜索表单数据
  const searchForm = reactive<SearchForm>({
    ruleName: '',
    platform: '',
    level: ''
  })
  
  // Mock数据
const tableData = ref<TableItem[]>([
  {
    eventId: '3423423424',
    level: 'A',
    category: '物流问题、产品问题',
    interaction: 3200,
    creator: '路人甲',
    createTime: '2022-06-21 13:22:11',
    status: 'processing',
    updateTime: '2022-06-21 13:25:11'
  },
  {
    eventId: '3423423424',
    level: 'B',
    category: '物流问题、产品问题',
    interaction: 3200,
    creator: '路人甲',
    createTime: '2022-06-21 13:22:11',
    status: 'processing',
    updateTime: '2022-06-21 13:25:11'
  },
  {
    eventId: '3423423424',
    level: 'A',
    category: '物流问题、产品问题',
    interaction: 4211,
    creator: '路人甲',
    createTime: '2022-06-21 13:22:11',
    status: 'processing',
    updateTime: '2022-06-21 13:25:11'
  },
  {
    eventId: '3423423424',
    level: 'C',
    category: '物流问题、产品问题',
    interaction: 3200,
    creator: '路人甲',
    createTime: '2022-06-21 13:22:11',
    status: 'processing',
    updateTime: '2022-06-21 13:25:11'
  },
  {
    eventId: '3423423424',
    level: 'A',
    category: '物流问题、产品问题',
    interaction: '4.5W+',
    creator: '路人甲',
    createTime: '2022-06-21 13:22:11',
    status: 'processing',
    updateTime: '2022-06-21 13:25:11'
  },
  {
    eventId: '3423423424',
    level: 'A',
    category: '物流问题、产品问题',
    interaction: 3200,
    creator: '路人甲',
    createTime: '2022-06-21 13:22:11',
    status: 'completed',
    updateTime: '2022-06-21 13:25:11'
  },
  {
    eventId: '3423423424',
    level: 'A',
    category: '物流问题、产品问题',
    interaction: 3200,
    creator: '路人甲',
    createTime: '2022-06-21 13:22:11',
    status: 'completed',
    updateTime: '2022-06-21 13:25:11'
  }
])


const detailVisible = ref(false)
const currentEvent = ref<EventDetail | null>(null)

const handleEventDetail = (row: TableItem) => {
  currentEvent.value = {
    ...row,
    orderId: '--',
    platform: 'xiaohongshu',
    title: '这颗纯欲欧莱雅美日妆🌸美到我失语！',
    publishTime: '2021-11-25 22:50',
    author: '优聚聚',
    content: '💗夏日的标配是什么？肯定是冰淇淋🍦啦~不吃冰淇淋的夏天是不圆满的，不过女生难免会心疼胖，到了夏天更是不敢吃什么甜食...终于这次被我发现了不长胖还得吃的HALO TOP低卡冰淇淋，我宣布我的夏天被它承包了！'
  }
  detailVisible.value = true
}
  
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


// 判断是否需要高亮显示数字
const isHighlightNumber = (value: number | string): boolean => {
  if (typeof value === 'string') {
    return value.includes('W+')
  }
  return value > 4000
}

// 格式化互动数
const formatInteraction = (value: number | string): string => {
  return value.toString()
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
        :deep(.el-pagination) {

&.is-background {
  .btn-prev,
  .btn-next,
  .el-pager li {
    &:hover {
      color: $ai-page-color;
    }

    &.is-active {
      background-color: $ai-page-color;
      color: #fff;
    }
  }
}
}
    }
  
  }

  .event-id {
    color: $purple;
    cursor: pointer;
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
  
 
  
  :deep(.el-pagination.is-background) {
    .el-pager li:not(.is-disabled).is-active {
      background-color: $table-button;
    }
  }
  </style>