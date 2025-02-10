<template>
    <el-config-provider >
        <div class="app-container">
                <el-main>
                        <p class="header"> 
                            <div>{{ title }}</div>
                            <el-button size="large" class="header_btn"  @click="handleAdd" :icon="Plus">{{ buttonText }}</el-button>
                        </p>
    <CustomeTable :data="tableData" @search="handleSearch" @page-change="handlePageChange">
      <el-table-column sortable prop="name" label="名称" />
      <el-table-column sortable prop="status" label="已发表">
        <template #default="scope">
          <el-tag :type="scope.row.status ? 'success' : 'info'" disable-transitions>
            <el-icon><CircleCheck v-if="scope.row.status" /></el-icon>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column sortable prop="count" label="#发文数" />
      <el-table-column sortable prop="column_data" label="#数据" />
      <el-table-column  label="操作">
        <template #header>
            <el-icon size="16"><Setting /></el-icon>
        </template>
        <template #default="scope">
            <div class="row_cell">
          <el-button class="table_btn" size="small" :icon="View"  @click="handleEdit(scope.row)" />
          <el-button class="table_btn" size="small" :icon="Edit"  @click="handleView(scope.row)" />
          <el-button :icon="Edit" size="small" @click="handleEdit(scope.row)" />
          <el-button :icon="Edit" size="small" @click="handleEdit(scope.row)" />
            </div>
        </template>
      </el-table-column>
    </CustomeTable>
                </el-main>
        </div>
    </el-config-provider>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import {useRouter,useRoute} from 'vue-router'
import {Plus,Edit,View} from '@element-plus/icons-vue'
const router = useRouter() 
const title = ref('组织机构')
const buttonText = ref('新增企业') 
import CustomTable from '@/components/CustomeTable.vue'
// Mock data
const tableData = ref([
  { index: 1, name: '领英', status: true, count: 130204,column_data: 12 },
  { index: 2, name: '微信', status: true, count: 72336,column_data: 12 },
  { index: 3, name: '微博', status: true, count: 528714,column_data: 12 },
  { index: 4, name: '看准网', status: true, count: 12500 ,column_data: 12}
])

const handleAdd = () => {
  console.log('Add button clicked')
}

const handleSearch = (query: string) => {
  console.log('Search query:', query)
  // Implement search logic here
}

const handlePageChange = (pagination: { page: number; pageSize: number }) => {
  console.log('Page changed:', pagination)
  // Implement pagination logic here
}

const handleEdit = (row: any) => {
  router.push({ path: '/management/organization/5' })
  console.log('Edit row:', row)
  // Implement edit logic here
}

const handleView = (row: any) => {
  router.push({ path: '/app/management/organization/edit/5' })
  console.log('View row:', row)
  // Implement view logic here
}   
</script>
  
<style lang="scss" scoped>
.app-container { 
    .el-main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      .header{
        margin: 25px auto;
        display: flex;
        justify-content: space-between;
        align-content: center;
        color: #495057;
        font-size: 24px;
        .header_btn{
            border: $purple solid 1px;
            color: $purple;
        }
      }
      :deep(.el-table) {
        .row_cell{
            display: flex;
            justify-content: center;
            .el-icon{
                font-size: 16px;
            }
        }
         .table_btn{
            border: $purple solid 1px;
            color: $purple;
            &:hover{
                background: $purple;
                color: #fff;
            }
         }
         thead th {
         font-weight: 400;
         .caret-wrapper {
            margin-left: 12px;
         }
       }
    }
    }
}

</style>