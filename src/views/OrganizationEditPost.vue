<template>
    <el-config-provider >
        <div class="app-container">
                <el-main>
                <p class="header"> 
                    <div>{{ title }}</div>
                    <div>
                        <div class="header-left" v-if="getRouteName !== 'Crawler'">
                            <el-button size="large" class="header_btn"  @click="handleAdd" :icon="Plus">{{ t('organization.newData') }}</el-button>
                        </div>
                        <div v-else class="header-right">
             <div class="filter-item">
              <span class="filter-label">渠道:</span>
              <el-select v-model="filters.channel" placeholder="微信" class="filter-select">
                <el-option label="微信" value="wechat" />
                <el-option label="所有渠道" value="all" />
              </el-select>
            </div>
  
            <div class="filter-item">
              <span class="filter-label">期间:</span>
              <el-select v-model="filters.period" placeholder="2025 - Week 3" class="filter-select">
                <el-option label="2025 - Week 3" value="2025-3" />
                <el-option label="2025 - Week 2" value="2025-2" />
              </el-select>
            </div>
                        </div>
                    </div>
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

    <CustomeTable v-if="getRouteName == 'OrganizationActivity'"  :showChannel="true" :data="ActivityTableData" @search="handleSearch" @page-change="handlePageChange">
      <el-table-column sortable width="500" prop="time" label="时间序列" />
      <el-table-column sortable prop="user" label="用户"/>
      <el-table-column sortable prop="desc" label="描述" />
      <el-table-column width="150" label="操作">
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
    

    <CustomeTable v-if="getRouteName == 'OrganizationCrawlerLog'" :showTableHeader="false"  :showChannel="true" :data="CrawlerLogTableData" @search="handleSearch" @page-change="handlePageChange">
      <el-table-column sortable width="200" prop="time" label="时间" />
      <el-table-column sortable prop="channel" label="渠道"/>
      <el-table-column sortable prop="status" label="状态" />
      <el-table-column sortable prop="status" label="数据">
        <template #default="scope">
          <el-tag :type="scope.row.status ? 'success' : 'info'" disable-transitions>
            <el-icon><CircleCheck v-if="scope.row.status" /></el-icon>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column sortable prop="count" label="发文数" />
      <el-table-column sortable width="300" prop="error" label="错误信息" />
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

    <CustomTable v-if="getRouteName == 'OrganizationChannel'"  :showChannel="true" :data="ChannelTableData" @search="handleSearch" @page-change="handlePageChange">
      <el-table-column sortable prop="desc" label="顺序" />
      <el-table-column sortable prop="name" label="名称"/>
      <el-table-column sortable prop="published" label="已发布" />
      <el-table-column sortable prop="count" label="#发文数" />
      <el-table-column width="150" label="操作">
        <template #header>
            <el-icon size="16"><Setting /></el-icon>
        </template>
        <template #default="scope">
            <div class="row_cell">
          <el-button class="table_btn" size="small" :icon="Edit"  @click="handleView(scope.row)" />
            </div>
        </template>
      </el-table-column>
    </CustomTable>

    <CustomeTable v-if="getRouteName == 'ApiUser'"  :showChannel="false" :data="ApiUserTableData" @search="handleSearch" @page-change="handlePageChange">
      <el-table-column sortable prop="name" label="名称"/>
      <el-table-column sortable prop="isActicve" label="已激活" />
      <el-table-column sortable prop="lastEvent" label="最后一次日志" />
      <el-table-column width="150" label="操作">
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

    <div v-if="getRouteName == 'Crawler'">
    <CustomeTable  :showTitle="true" tableTitle="渠道概览" :showTableHeader="false"  :showChannel="false" :data="CrawlerTableData" @search="handleSearch" @page-change="handlePageChange">
      <el-table-column  prop="channel" label="渠道"/>
      <el-table-column  prop="achieve" label="完成" >
        <template #default="scope">
            <el-progress :percentage="50" />
        </template>
      </el-table-column>
      <el-table-column  prop="newArticle" label="#新文章的数量" />
      <el-table-column  prop="error" label="错误" />
      <el-table-column  prop="lastEvent" label="最后抓去的时间" />
    </CustomeTable>
    <CustomeTable :showTitle="true" tableTitle="爬虫错误"  class="mt-24"  :showChannel="false" :data="CrawlerErrorTableData" @search="handleSearch" @page-change="handlePageChange">
      <el-table-column width="250" sortable prop="time" label="时间序列"/>
      <el-table-column sortable prop="channel" label="渠道"/>
      <el-table-column sortable prop="group" label="组织机构" />
      <el-table-column sortable prop="number" label="数据" />
      <el-table-column sortable prop="article" label="#发文数" />
      <el-table-column sortable prop="error" label="错误信息" />
      <el-table-column width="150" label="操作">
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
    </div>

    <CustomeTable v-if="getRouteName == 'AdminUser'" :showChannel="false" :data="AdminUserTableData" @search="handleSearch" @page-change="handlePageChange">
      <el-table-column sortable prop="name" label="名称"/>
      <el-table-column sortable prop="email" label="电子邮件"/>
      <el-table-column sortable prop="isActicve" label="已激活" />
      <el-table-column  prop="role" label="角色" />
      <el-table-column sortable prop="lastEvent" label="最后一次日志" />
      <el-table-column width="150" label="操作">
        <template #header>
            <el-icon size="16"><Setting /></el-icon>
        </template>
        <template #default="scope">
            <div class="row_cell">
          <el-button class="table_btn" size="small" :icon="Edit"  @click="handleView(scope.row)" />
          <el-button class="table_btn" size="small" :icon="Edit"  @click="handleView(scope.row)" />
            </div>
        </template>
      </el-table-column>
    </CustomeTable>


   
    <CustomeTable v-if="getRouteName == 'AdminActivity'" :showChannel="false" :data="AdminActivityTableData" @search="handleSearch" @page-change="handlePageChange">
      <el-table-column sortable prop="time" label="时间序列"/>
      <el-table-column sortable prop="log" label="日志"/>
      <el-table-column sortable prop="user" label="用户" />
      <el-table-column sortable prop="desc" label="描述" />
      <el-table-column  prop="theme" label="主题" />
      <el-table-column width="150" label="操作">
        <template #header>
            <el-icon size="16"><Setting /></el-icon>
        </template>
        <template #default="scope">
            <div class="row_cell">
          <el-button class="table_btn" size="small" :icon="View"  @click="handleView(scope.row)" />
            </div>
        </template>
      </el-table-column>
    </CustomeTable>

    <CustomeTable v-if="getRouteName == 'AdminNotification'" :showChannel="false" :data="AdminNotificationTableData" @search="handleSearch" @page-change="handlePageChange">
      <el-table-column sortable prop="time" label="时间序列"/>
      <el-table-column sortable prop="title" label="标题"/>
      <el-table-column sortable prop="type" label="类型" />
      <el-table-column sortable prop="status" label="状态">
        <template #default="scope">
            <div class="row_cell">
          <el-button class="table_btn" size="small" :icon="View"  @click="handleView(scope.row)" />
            </div>
        </template>
      </el-table-column>
      <el-table-column width="150" label="操作">
        <template #header>
            <el-icon size="16"><Setting /></el-icon>
        </template>
        <template #default="scope">
            <div class="row_cell">
          <el-button class="table_btn" size="small" :icon="View"  @click="handleView(scope.row)" />
            </div>
        </template>
      </el-table-column>
    </CustomeTable>
    

    <div class="table-footer" v-if="getRouteName !== 'ApiUser' && getRouteName !== 'Crawler' && getRouteName !== 'AdminUser' && getRouteName !== 'AdminActivity' && getRouteName !== 'AdminNotification'">
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

// Mock data

const filters = ref({
    industry: 'chemical',
    channel: 'wechat',
    period: '2025-3'
  })
const tableData = ref([
  { time: '2023-05-17 18:00', title: '测试标题', channel: '微信', status: true, column_data: 12 },
  { time: '2023-05-18 18:30', title: '测试标题喜欢的情节设定就撒谎多久啊和十九大精神的的撒娇的撒娇电话荣誉唯一入围与人文u', channel: '微信', status: false, column_data: 12 },
])

const EditTableData = ref([
  { time: '2024-Week 29', channel: '微信', fans: 12 },
  { time: '2024-Week 30', channel: '微信', fans: 123 },
  { time: '2024-Week 31', channel: '微信', fans: 12 },
])

const ActivityTableData = ref([])

const CrawlerLogTableData = ref([
  { time: '2024-Week 29', channel: '领英', number: 12,status:'Success',count:12,error:'Could not load organization page' },
  { time: '2024-Week 30', channel: '微信', number: 123,status:'Failed',count:12 ,error:'Could not load organization page'},
  { time: '2024-Week 31', channel: '微信', number: 12,status:'Failed', count:12,error:'Could not load organization page' },
])

const ChannelTableData = ref([
    { desc: '1', name: '领英', published: true ,count:12 },
    { desc: '2', name: '领英', published: true ,count:12 },
    { desc: '3', name: '领英', published: true ,count:12 },
])

const ApiUserTableData = ref([
    {  name: '领英21212', isActicve: true,lastEvent:'2024-10-27 23:20:04' },
    {  name: '领英hjhj', isActicve: true,lastEvent:'2024-10-27 23:20:04' },
    {  name: '领英tytyt', isActicve: true,lastEvent:'2024-10-27 23:20:04' },
])

const CrawlerTableData = ref([
    {  channel: '领英', achieve:"2",newArticle:"12",error:"12",lastEvent:'2024-10-27 23:20:04'  },
])

const CrawlerErrorTableData = ref([
    {  time:'2024-10-27 23:20:04',channel: '领英',group: '领英21212',number: '12',article:20,error: 'Could not load organization page'  },
    {  time:'2024-10-27 23:20:04',channel: '领英',group: '领英hjhj',number: '12', article:23,error: 'Could not load organization page'  },
    {  time:'2024-10-27 23:20:04',channel: '领英',group: '领英tytyt',number: '12',article:20,error: 'Could not load organization page'  }
])

const AdminUserTableData = ref([
    {  name: 'admin1', email:'1002158476@qq.com',role:'Super Admin, Premium User',isActicve: true,lastEvent:'2024-10-27 23:20:04'  },
    {  name: 'admin2', email:'1002158476@qq.com',role:'Super Admin, Premium User',isActicve: true,lastEvent:'2024-10-27 23:20:04'  },
    {  name: 'admin3', email:'1002158476@qq.com',role:'Super Admin, Premium User',isActicve: true,lastEvent:'2024-10-27 23:20:04'  }
])

const AdminActivityTableData = ref([
    {
        time:'2024-10-27 23:20:04',log:'user',user:'Anonymous user',desc:'created',theme:'2024 - Week 48'
    },
    {
        time:'2024-10-27 23:20:04',log:'user',user:'Anonymous user',desc:'created',theme:'2024 - Week 48'
    },
    {
        time:'2024-10-27 23:20:04',log:'user',user:'Anonymous user',desc:'created',theme:'2024 - Week 48'
    },
])

const AdminNotificationTableData = ref([
    {
        time:'2024-10-27 23:20:04',title:'New user registration for Jin Ling (ling.jin.eb@bmw-brilliance.cn)',type:'Anonymous user',status:1
    },
    {
        time:'2024-10-27 23:20:04',title:'New user registration for Jin Ling (ling.jin.eb@bmw-brilliance.c',type:'Anonymous user',status:2
    },
    {
        time:'2024-10-27 23:20:04',title:'user',type:'Anonymous user',status:3
    },
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
        .header-right{
            display: flex;
            font-size: 14px;
            font-weight: 600;
        }
        .header_btn{
            border: $purple solid 1px;
            color: $purple;
        }
        .filter-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 8px;
          .filter-label {
            color: #606266;
            font-size: 14px;
          }
  
          .filter-select {
            width: 160px;
          }
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