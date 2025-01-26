<template>
  <div 
    class="main-table-container" 
    :class="{ 
      'fullscreen': isFullscreen,
      'mobile-view': isMobile 
    }"
  >
    <div class="table-header d-flex justify-between items-center px-20 py-10">
      <div class="search-section d-flex items-center">
        <el-input
          v-model="searchQuery"
          :placeholder="t('table.searchPlaceholder')"
          class="search-input"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        
        <el-tooltip :content="t('table.fullscreen')">
          <el-button 
            class="ml-10 fullscreen-btn" 
            @click="toggleFullscreen"
          >
            <el-icon><FullScreen /></el-icon>
          </el-button>
        </el-tooltip>
      </div>
      
      <div class="filter-section d-flex items-center">
        <el-select 
          v-model="selectedIndustry" 
          class="mx-10"
          :placeholder="t('industries.all')"
        >
          <el-option
            v-for="item in industries"
            :key="item.value"
            :label="t(`industries.${item.label}`)"
            :value="item.value"
          />
        </el-select>
        
        <el-select 
          v-model="selectedPlatform"
          :placeholder="t('platforms.all')"
        >
          <el-option
            v-for="item in platforms"
            :key="item.value"
            :label="t(`platforms.${item.label}`)"
            :value="item.value"
          />
        </el-select>

        <el-button 
          class="ml-10 fullscreen-btn"
          @click="resetFilters"
        >
          {{ t('table.resetFilters') }}
        </el-button>
      </div>
    </div>

    <el-table
      ref="tableRef"
      v-loading="loading"
      :data="filteredData"
      :stripe="true"
      :border="true"
      :height="tableHeight"
      table-layout="fixed"
      :highlight-current-row="true"
      :row-class-name="tableRowClassName"
      @row-click="handleRowClick"
      @cell-mouse-enter="handleCellMouseEnter"
      @cell-mouse-leave="handleCellMouseLeave"
      class="main-table-scope"
      cell-class-name="no-border-cell"
    >
      <el-table-column
        prop="rank"
        :label="t('table.rank')"
        :width="getColumnWidth('rank')"
      />
      <el-table-column
        prop="companyName"
        :label="t('table.companyName')"
        :width="getColumnWidth('companyName')"
      >
        <template #default="{ row }">
          <div class="d-flex items-center">
            <el-image
              :src="row.logo"
              class="company-logo mr-10"
              :preview-src-list="[row.logo]"
              fit="contain"
            >
              <template #error>
                <div class="logo-fallback">{{ row.companyName[0] }}</div>
              </template>
            </el-image>
            <span>{{ row.companyName }}</span>
          </div>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="ebmIndex"
        :label="t('table.ebmIndex')"
        :width="getColumnWidth('ebmIndex')"
        sortable
      >
        <template #header>
          <div class="header-with-icon">
            {{ t('table.ebmIndex') }}
            <el-popover
              placement="top"
              trigger="hover"
              :width="200"
            >
              <template #reference>
                <el-icon class="info-icon"><QuestionFilled /></el-icon>
              </template>
              {{ t('tooltips.ebmIndex') }}
            </el-popover>
          </div>
        </template>
        <template #default="{ row }">
          <div class="score-cell">
            {{ row.ebmIndex }}
            <el-progress
              :percentage="(row.ebmIndex / maxEbmIndex) * 100"
              :stroke-width="4"
              :show-text="false"
            />
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="indexChange"
        :label="t('table.indexChange')"
        :width="getColumnWidth('indexChange')"
      >
        <template #header>
          <div class="header-with-icon">
            {{ t('table.indexChange') }}
            <el-popover
              placement="top"
              trigger="hover"
              :width="200"
            >
              <template #reference>
                <el-icon class="info-icon"><QuestionFilled /></el-icon>
              </template>
              {{ t('tooltips.indexChange') }}
            </el-popover>
        
          </div>
        </template>
        <template #default="{ row }">
          <div :class="['change-cell', getChangeClass(row.indexChange)]">
            {{ row.indexChange }}
          </div>
        </template>
      </el-table-column>

      <el-table-column
        class="influence-column"    
        prop="influence"
        :label="t('table.influence')"
        :width="getColumnWidth('influence')"
        sortable
      >
        <template #header>
          <div class="header-with-icon">
            {{ t('table.influence') }}
            <el-popover
              placement="top"
              trigger="hover"
              :width="200"
            >
              <template #reference>
                <el-icon class="info-icon"><QuestionFilled /></el-icon>
              </template>
              {{ t('tooltips.influence') }}
            </el-popover>
          </div>
            <div >领英</div>
            <div >微博</div>
            <div >微信</div>
            <div >看准网</div>
        </template>
        <template #default="{ row }">
          <div class="influence-cell">
            <div class="influence-content">
              <span style="min-width: 70px;">{{ row.influence }}</span>
                <span >22</span>
                <span >33</span>
                <span >44</span>
                <span >44</span>
            </div>
            <el-icon 
              class="expand-icon"
              @click.stop="toggleColumnWidth('influence')"
            >
              <Rank />
            </el-icon>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="activity"
        :label="t('table.activity')"
        :width="getColumnWidth('activity')"
        sortable
      >
        <template #header>
          <div class="header-with-icon">
            {{ t('table.activity') }}
            <el-popover
              placement="top"
              trigger="hover"
              :width="200"
            >
              <template #reference>
                <el-icon class="info-icon"><QuestionFilled /></el-icon>
              </template>
              {{ t('tooltips.activity') }}
            </el-popover>
          </div>
        </template>
        <template #default="{ row }">
          <div class="activity-cell">
            <span>{{ row.activity }}</span>
            <el-icon 
              class="expand-icon"
              @click.stop="toggleColumnWidth('activity')"
            >
              <Rank />
            </el-icon>
          </div>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="interactivity"
        :label="t('table.interactivity')"
        :width="getColumnWidth('interactivity')"
        sortable
      >
        <template #header>
          <div class="header-with-icon">
            {{ t('table.interactivity') }}
            <el-popover
              placement="top"
              trigger="hover"
              :width="200"
            >
             <template #reference>
                <el-icon class="info-icon"><QuestionFilled /></el-icon>
              </template>
              {{ t('tooltips.interactivity') }}
            </el-popover>
          </div>
        </template>
        <template #default="{ row }">
          <div class="interactivity-cell">
            <span>{{ row.interactivity }}</span>
            <div class="action-icons">
              <el-icon 
                class="expand-icon"
                @click.stop="toggleColumnWidth('interactivity')"
              >
                <Rank />
              </el-icon>
              <el-icon 
                class="share-icon"
                v-show="currentHoverRow === row.rank"
                @click.stop="handleShare(row)"
              >
                <Share :size="20"/>
              </el-icon>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
    v-model="shareDialogVisible"
    center="true"
    width="400"
    align-center
    modal-class="share-dialog"
  >
  <template #header>
      <span style="font-size: 20px; font-weight: 800;color: #000">{{ t('table.dialogTitle') }}</span>
  </template>
    <div class="share-dialog-content">
      <img src="@/assets/svg/ic_linkedin.svg" alt="share" style="width: 50px;cursor: pointer;">
      <img src="@/assets/svg/ic_weibo.svg" alt="share" style="width: 50px;cursor: pointer;">
      <img src="@/assets/svg/ic_wechat.svg" alt="share" style="width: 50px;cursor: pointer;">
    </div>
  </el-dialog>

    <div 
      v-if="loading" 
      class="loading-more text-center py-10"
    >
      <el-icon class="loading-icon"><Loading /></el-icon>
      {{ t('table.loadingMore') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useElementSize, useMediaQuery } from '@vueuse/core'
import { Search, FullScreen, ArrowDown, Loading, InfoFilled, Share } from '@element-plus/icons-vue'
import type { TableRow } from '@/types/table'
const store = useStore()
const isMobile = computed(() => store.state.device === 'mobile')
const { t } = useI18n()

// State
const isFullscreen = ref(false)
const searchQuery = ref('')
const selectedIndustry = ref('')
const selectedPlatform = ref('')
const loading = ref(false)
const tableData = ref<any[]>([])
const tableHeight = ref('calc(100vh - 180px)')
const expandedColumns = ref({
  influence: false,
  activity: false,
  interactivity: false
})
const currentHoverRow = ref<number | null>(null)
const shareDialogVisible = ref(false)

// Mock data
const industries = [
  { label: 'all', value: 'all' },
  { label: 'tech', value: 'tech' },
  { label: 'finance', value: 'finance' },
]

const platforms = [
  { label: 'all', value: 'all' },
  { label: 'weibo', value: 'weibo' },
  { label: 'wechat', value: 'wechat' },
]

// Methods
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
  if (isFullscreen.value) {
    tableHeight.value = 'calc(100vh - 100px)'
  } else {
    tableHeight.value = 'calc(100vh - 180px)'
  }
}


const handleRowClick = (row: any) => {
  console.log('Row clicked:', row)
}

const loadMoreData = async () => {
  if (loading.value) return
  loading.value = true
  
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newData = generateMockData(10)
    tableData.value.push(...newData)
  } catch (error) {
    ElMessage.error(t('table.loadError'))
  } finally {
    loading.value = false
  }
}

const generateMockData = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    rank: tableData.value.length + index + 1,
    companyName: `Company ${tableData.value.length + index + 1}`,
    logo: `https://placeholder.com/32x32`,
    ebmIndex: (Math.random() * 50).toFixed(2),
    indexChange: '0.00%',
    influence: (Math.random() * 50).toFixed(2),
    activity: (Math.random() * 50).toFixed(2),
    interactivity: (Math.random() * 30).toFixed(2),
    platformData: {
      weibo: Math.floor(Math.random() * 100),
      wechat: Math.floor(Math.random() * 100),
      douyin: Math.floor(Math.random() * 100),
      redbook: Math.floor(Math.random() * 100),
    },
    showPlatformData: false
  }))
}

// Lifecycle
onMounted(() => {
  tableData.value = generateMockData(20)
  
  // Implement infinite scroll
  const handleScroll = (e: Event) => {
    const element = e.target as HTMLElement
    if (element.scrollHeight - element.scrollTop - element.clientHeight < 50) {
      loadMoreData()
    }
  }

  const tableWrapper = document.querySelector('.el-table__body-wrapper')
  if (tableWrapper) {
    tableWrapper.addEventListener('scroll', handleScroll)
  }
})

// Add new computed properties
const maxEbmIndex = computed(() => {
  return Math.max(...tableData.value.map(row => row.ebmIndex))
})

const filteredData = computed(() => {
  let data = tableData.value

  if (searchQuery.value) {
    data = data.filter(row => 
      row.companyName.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedIndustry.value !== 'all') {
    // Add industry filtering logic
  }

  if (selectedPlatform.value !== 'all') {
    // Add platform filtering logic
  }

  return data
})

// Add new methods
const tableRowClassName = ({ row }: { row: TableRow }) => {
  return {
    'hover-row': true,
    'expanded-row': row.showPlatformData
  }
}

const getChangeClass = (change: string) => {
  const value = parseFloat(change)
  return {
    'positive': value > 0,
    'negative': value < 0,
    'neutral': value === 0
  }
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedIndustry.value = 'all'
  selectedPlatform.value = 'all'
}

const toggleColumnWidth = (column: 'influence' | 'activity' | 'interactivity') => {
  expandedColumns.value[column] = !expandedColumns.value[column]
}

const getColumnWidth = (column: string): number => {
  const baseWidths: Record<string, number> = {
    rank: 80,
    companyName: 200,
    ebmIndex: 120,
    indexChange: 120,
    influence: expandedColumns.value.influence ? 400 : 200,
    activity: expandedColumns.value.activity ? 200 : 120,
    interactivity: expandedColumns.value.interactivity ? 200 : 120
  }
  return baseWidths[column]
}

const handleShare = (row: TableRow) => {
  shareDialogVisible.value = true
  console.log('Share clicked:', row)
  // 在这里实现分享逻辑
}

const handleCellMouseEnter = (row: TableRow, column: any, cell: any, event: Event) => {
  currentHoverRow.value = row.rank
}

const handleCellMouseLeave = (row: TableRow, column: any, cell: any, event: Event) => {
  currentHoverRow.value = null
}

</script>

<style lang="scss">
.main-table-scope {
    background: $table-bg;
    width: 100% !important;
    
    .el-table__inner-wrapper {
        width: 100%;
    }
    
    .el-table__header, 
    .el-table__body {
        width: 100% !important;
    }
    
    .el-table__body-wrapper,
    .el-table__header-wrapper {
        width: 100% !important;
    }
    
    // 自定义单元格样式
    .no-border-cell {
        border-bottom: none !important;
    }

    .el-table__header-wrapper{
        /* background: red !important; */
    }

    
    // 保持表头底部边框
    .el-table__header {
        th.el-table__cell {
            /* border-bottom: 1px solid #EBEEF5 !important; */
            .cell{
                display: flex;
                align-items: center;
               
            }
        }
        .el-table_1_column_5{
            .cell{
                width: 90%;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .header-with-icon{
                min-width: 70px;
                position: relative;
            }
            .caret-wrapper{
                    position: absolute !important;
                    left: 80px !important;
            }
        }
    }

    
    // 移除表格外边框
    &::before {
        display: none;
    }

    // Add hover effects for table rows
    .el-table__body {
        tr.el-table__row {
            transition: all 0.3s ease;
            
            &:hover {
                background-color: rgba(64, 158, 255, 0.1) !important;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                transform: translateY(-1px);
            }
            
            &.hover-row > td.el-table__cell {
                background-color: rgba(64, 158, 255, 0.1) !important;
            }
        }
    }
}
</style>

<style lang="scss" scoped>
.main-table-container {
  margin: 0;
  padding: 30px;
  transition: all 0.3s;
  width: 100%;
  
  &.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    padding: 0;
  }
}

.search-input {
  width: 300px;
  
  @media (max-width: $breakpoint-md) {
    width: 200px;
  }
}

.fullscreen-btn{
    background: $table-button;
    color: $white;
}

.table-header{
    position: relative;
    &:before{
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 98%;
        height: 4px;
        transform: translateX(-50%);
        background: $table-border-color;
    }
}

.company-logo {
  width: 32px;
  height: 32px;
  border-radius: 4px;
}

.influence-cell,
.activity-cell,
.interactivity-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
  
  .expand-icon {
    cursor: pointer;
    color: $purple;
    transition: transform 0.3s;
    
    &:hover {
      transform: scale(1.1);
    }
  }
}

.platform-data-popup {
  padding: 10px;
  min-width: 200px;
  
  .platform-item {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    
    &:not(:last-child) {
      border-bottom: 1px solid $secondary-color;
    }
  }
}

.score-cell {
  .el-progress {
    margin-top: 4px;
  }
}

.change-cell {
  &.positive {
    color: #67c23a;
  }
  
  &.negative {
    color: #f56c6c;
  }
  
  &.neutral {
    color: #909399;
  }
}

.logo-fallback {
  width: 32px;
  height: 32px;
  background: $purple-light;
  color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: bold;
}

.loading-icon {
  animation: rotating 2s linear infinite;
  margin-right: 8px;
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// Mobile optimizations
.mobile-view {
  .table-header {
    padding: 20px;
  }
  
  .search-input {
    width: 100%;
  }
  
  .filter-section {
    margin-top: 10px;
    width: 100%;
    
    .el-select {
      width: 100%;
      margin: 5px 0;
    }
  }
  
  .custom-table {
    :deep(.el-table__body-wrapper) {
      overflow-x: auto;
    }
  }
}

.header-with-icon {
  
  display: flex;
  align-items: center;
  gap: 4px;
  .info-icon {
    font-size: 20px;
    color: #b4b4b4;
    cursor: pointer;
    
    &:hover {
      color: #409EFF;
    }
  }
}

// 确保表格容器不出现横向滚动条
.main-table {
  overflow-x: hidden;
  
  :deep(.el-table__body-wrapper) {
    overflow-x: hidden;
  }
}

.influence-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .influence-content {
    width: 90%;
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
  }

  .platform-values {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .expand-icon {
    margin-left: 10px;
  }
}


// 确保表格内容不会溢出
.el-table {
  .cell {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.interactivity-cell {
  position: relative;
  
  .action-icons {
    display: flex;
    align-items: center;
    gap: 8px;
    
    .share-icon {
      opacity: 0;
      transition: all 0.3s ease;
    }
  }
}

:deep(.share-dialog){
  .share-dialog-content{
    display: flex;
    align-items: center;
    padding-bottom: 25px;
    justify-content: space-around;
  }
}

// 当鼠标悬浮在行上时显示图标
.el-table__row:hover {
  .share-icon {
    cursor: pointer;
    opacity: 1;
  }
}
</style>