<template>
    <el-config-provider >
        <div class="app-container">
                <el-main>
                <p class="header"> 
                    <div>{{ title }}</div>
                    <el-button size="large" class="header_btn"  @click="handleAdd" :icon="Plus">{{ t('organization.newData') }}</el-button>
                </p>
    <CustomeTable v-if="getRouteName == 'OrganizationEditPost'"  :showChannel="true" :data="tableData" @search="handleSearch" @page-change="handlePageChange">
      <el-table-column sortable width="180" prop="time" label="发布时间" />
      <el-table-column sortable width="500" prop="title" label="标题" show-overflow-tooltip />
      <el-table-column sortable prop="channel" label="渠道"/>
      <el-table-column sortable   prop="status" label="获取">
        <template #default="scope">
          <el-tag :type="scope.row.status ? 'success' : 'info'" disable-transitions>
            <el-icon><CircleCheck v-if="scope.row.status" /></el-icon>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column sortable prop="column_data" label="数据" />
      <el-table-column width="120"  label="操作">
        <template #header>
            <el-icon size="16"><Setting /></el-icon>
        </template>
        <template #default="scope">
            <div class="row_cell">
          <el-button class="table_btn" size="small" :icon="Edit"  @click="handleView(scope.row)" />
          <el-button :icon="Edit" size="small" @click="handleEdit(scope.row)" />
            </div>
        </template>
      </el-table-column>
    </CustomeTable>

    <CustomeTable v-if="getRouteName == 'OrganizationEditData'"  :showChannel="true" :data="EditTableData" @search="handleSearch" @page-change="handlePageChange">
      <el-table-column sortable width="500" prop="time" label="时间" />
      <el-table-column sortable prop="channel" label="渠道"/>
      <el-table-column sortable prop="fans" label="粉丝数" />
      <el-table-column width="120" label="操作">
        <template #header>
            <el-icon size="16"><Setting /></el-icon>
        </template>
        <template #default="scope">
            <div class="row_cell">
          <el-button class="table_btn" size="small" :icon="Edit"  @click="handleView(scope.row)" />
            </div>
        </template>
      </el-table-column>
    </CustomeTable>
    <div class="table-footer">
        <el-button size="large" class="header_btn"  @click="toPath('list')" :icon="Back">{{ t('commonSaves.backToList') }}</el-button>
        <el-button size="large" class="header_btn"  @click="toPath('edit')" :icon="Back">{{ t('commonSaves.backToEdit') }}</el-button>
    </div>
    </el-main>
    </div>
    </el-config-provider>
</template>

<script setup lang="ts">
import { ref ,computed} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRouter,useRoute} from 'vue-router'
import {Plus,Edit,View,Back} from '@element-plus/icons-vue'
const { t } = useI18n()
const router = useRouter() 
const route = useRoute()
const title = ref('组织机构')
import CustomTable from '@/components/CustomeTable.vue'
// Mock data
const tableData = ref([
  { time: '2023-05-17 18:00', title: '测试标题', channel: '微信', status: true, column_data: 12 },
  { time: '2023-05-18 18:30', title: '测试标题喜欢的情节设定就撒谎多久啊和十九大精神的的撒娇的撒娇电话荣誉唯一入围与人文u', channel: '微信', status: false, column_data: 12 },
])

const EditTableData = ref([
  { time: '2024-Week 29', channel: '微信', fans: 12 },
  { time: '2024-Week 30', channel: '微信', fans: 123 },
  { time: '2024-Week 31', channel: '微信', fans: 12 },
])

const handleAdd = () => {
    // router.push({ path: '/app/management/organization/5' })
}
const toPath = (val: string) => {
    if(val == 'list'){
        router.push({ path: '/app/management/organization' })
    }else{
        const id = route.params.id
        router.push({ path: '/app/management/organization/edit/' + id})
    }
}

console.log("route.name",route)

const getRouteName = computed(() => {
  return route.name
})

const handleSearch = (query: string) => {
  console.log('Search query:', query)
  // Implement search logic here
}

const handlePageChange = (pagination: { page: number; pageSize: number }) => {
  console.log('Page changed:', pagination)
  // Implement pagination logic here
}

const handleEdit = (row: any) => {
  router.push({ path: '/app/management/organization/5' })
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
            justify-content: flex-start;
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
    .table-footer{
        padding: 16px 24px;
        background: $white;
        border: 1px solid rgba(0, 40, 100, .12);
        border-top: none;
        color: #6e7687;
    }
    }
}

</style>