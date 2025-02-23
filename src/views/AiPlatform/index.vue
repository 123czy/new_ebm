<template>
    <div class="content-management">
      <div class="filter-section" >
        <div class="filter-row">
          <span class="label">信息筛选:</span>
          <el-select v-model="filterValue" placeholder="全文" class="filter-select">
            <el-option label="全文" value="all" />
          </el-select>
          <el-input
            v-model="searchText"
            placeholder="请输入搜索内容"
            :maxlength="60"
            show-word-limit
            class="search-input"
          />
          <el-button type="primary" class="search-btn">查询</el-button>
          <el-button>重置</el-button>
          <el-button 
            type="primary" 
            class="more-btn"
            @click="showMoreFilters = !showMoreFilters"
          >
            {{ showMoreFilters ? '收起筛选' : '更多筛选' }}
            <el-icon class="el-icon--right" :class="{ 'is-reverse': showMoreFilters }">
              <ArrowUpBold />
            </el-icon>
          </el-button>
        </div>
  
        <div :class="{ collapsed: !showMoreFilters }" >
          <div class="filter-block">
          <div class="filter-top">
          <div class="time-filter-row">
            <div class="time-section">
              <span class="label">发布时间</span>
              <el-radio-group v-model="publishTime">
                <el-radio-button label="today">今天</el-radio-button>
                <el-radio-button label="24h">24小时</el-radio-button>
                <el-radio-button label="3d">3天</el-radio-button>
                <el-radio-button label="7d">7天</el-radio-button>
                <el-radio-button label="30d">30天</el-radio-button>
              </el-radio-group>
              <!-- <el-date-picker
                size="large"
                v-model="customTimeRange"
                type="daterange"
                placeholder="开始时间-结束时间"
              /> -->
            </div>
            
            <div class="time-section">
              <span class="label">采集时间</span>
              <el-radio-group v-model="collectTime">
                <el-radio-button label="today">今天</el-radio-button>
                <el-radio-button label="24h">24小时</el-radio-button>
                <el-radio-button label="3d">3天</el-radio-button>
                <el-radio-button label="7d">7天</el-radio-button>
                <el-radio-button label="30d">30天</el-radio-button>
              </el-radio-group>
              <!-- <el-date-picker
                size="large"
                v-model="customCollectRange"
                type="daterange"
                placeholder="开始时间-结束时间"
              /> -->
            </div>
          </div>
  
          <div class="filter-row">
            <div class="content-type">
              <span class="label">内容性质</span>
              <el-radio-group v-model="contentType">
                <el-radio-button label="all">全部</el-radio-button>
                <el-radio-button label="suspicious">疑似负面</el-radio-button>
                <el-radio-button label="high">高度疑似负面</el-radio-button>
                <el-radio-button label="negative">非负面</el-radio-button>
              </el-radio-group>
            </div>
  
            <div class="account-type">
              <span class="label">账号类型</span>
              <el-radio-group v-model="accountType">
                <el-radio-button label="monitored">监控账号</el-radio-button>
                <el-radio-button label="unmonitored">非监控账号</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          </div>

          <div class="platform-stats">
            <span class="label">发布平台</span>
            <el-radio-group v-model="publishPlat">
                <el-radio-button label="all">全部(17.8万+)</el-radio-button>
                <el-radio-button label="douyin">抖音(2.1万+)</el-radio-button>
                <el-radio-button label="red">小红书(2.3万+)</el-radio-button>
                <el-radio-button label="blibli">bilibili(10万+)</el-radio-button>
                <el-radio-button label="weibo">微博(5.1万+)</el-radio-button>
            </el-radio-group>
          </div>
  
          <div class="filter-row">
            <div class="fermentation-status">
              <span class="label">发酵情况</span>
              <el-select v-model="fermentationType" placeholder="点赞数" class="ferment-select">
                <el-option label="点赞数" value="likes" />
                <el-option label="评论数" value="comments" />
                <el-option label="转发数" value="shares" />
              </el-select>
              <el-select v-model="fermentationOperator" placeholder="大于" class="ferment-select">
                <el-option label="大于" value="gt" />
                <el-option label="小于" value="lt" />
                <el-option label="等于" value="eq" />
              </el-select>
              <el-input
                size="large"
                v-model="fermentationValue"
                placeholder="请输入数字"
                class="ferment-input"
                type="number"
              />
            </div>
          </div>
  
         
          </div>
        </div>
  
        <div class="action-row">
          <div class="total">共计: {{ total }}条</div>
          <!-- <div class="buttons">
            <el-button type="primary">导出</el-button>
            <el-button type="primary">删除</el-button>
          </div> -->
        </div>
      </div>
  
      <div class="content-table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          
          <el-table-column label="标题及摘要" min-width="800">
            <template #default="{ row }">
              <div class="content-cell">
                <div class="platform-icon">
                  <img :src="getPlatformIcon(row.platform)" alt="platform icon" />
                </div>
                
                <div class="content-info">
                  <div class="title" @click="openDrawer(row)" >{{ row.title }}</div>
                  <div class="content-text">{{ row.content }}</div>
                  
                  <div class="meta-info">
                    <div class="engagement">
                      <span class="likes">
                        <img class="meta-icon" src="@/assets/svg/like.svg" alt="">
                        {{ row.likes }}
                      </span>
                      <span class="likes">
                        <el-icon><Star /></el-icon>
                        {{ row.likes }}
                      </span>
                      <span class="shares">
                        <el-icon><Share /></el-icon>
                        {{ row.shares }}
                      </span>
                      <span class="comments">
                        <el-icon><ChatDotRound /></el-icon>
                        {{ row.comments }}
                      </span>
                    </div>
                    
                    <div class="author">
                      作者：{{ row.author }}
                    </div>
                    
                    <div class="publish-time">
                      发布时间：{{ row.publishTime }}
                    </div>
                    
                    <el-link type="primary" class="detail-link">原文链接</el-link>
                  </div>
                  
                  <div class="tags">
                    <el-tag 
                      v-for="tag in getTags(row.type)"
                      :key="tag"
                      :type="getTagType(tag)"
                      effect="dark"
                    >
                      {{ tag }}
                    </el-tag>
                  </div>
                  
                  <div class="actions">
                    <el-button size="small">
                      <el-icon><DocumentAdd /></el-icon>
                      生成事件
                    </el-button>
                    <el-button size="small">
                      <el-icon><Position /></el-icon>
                      下发处置
                    </el-button>
                    <el-button size="small">
                      <el-icon><Edit /></el-icon>
                      标签编辑
                    </el-button>
                    <el-button size="small">
                      <el-icon><Delete /></el-icon>
                      删除
                    </el-button>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          
          <el-table-column 
            label="采集时间" 
            prop="collectTime" 
            width="180" 
            sortable="custom"
            :sort-orders="['ascending', 'descending']"
            @sort-change="handleSortChange"
          />
        </el-table>
  
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
      </div>

    <AiContentDrawer  v-model:visible="drawerVisible" :data="currentItem" :title="currentItem?.title" @close="closeDrawer"/>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref ,computed} from 'vue'
  import { 
    ArrowUpBold,
    Share,
    ChatDotRound,
    DocumentAdd,
    Position,
    Edit,
    Star,
    Delete
  } from '@element-plus/icons-vue'
  import { userApi, type LoginParams } from '@/api/user'
  // 筛选相关
  const showMoreFilters = ref(true)
  const filterValue = ref('all')
  const searchText = ref('')
  const publishTime = ref('today')
  const collectTime = ref('today')
  const customTimeRange = ref([])
  const customCollectRange = ref([])
  const contentType = ref('all')
  const accountType = ref('monitored')
  const publishPlat = ref('all')
  
  // 发酵情况相关的响应式变量
  const fermentationType = ref('likes')
  const fermentationOperator = ref('gt')
  const fermentationValue = ref('')
  
  // 表格相关
  const multipleTable = ref(null)
  const multipleSelection = ref([])

  // Mock数据
const mockData = [
  {
    id: 1,
    platform: 'xiaohongshu',
    platformIcon: 'https://placeholder.com/48x48/ff4d4f/ffffff.png?text=XHS',
    title: '这颗纯欲欧莱雅美日妆🌸美到我失语！',
    content: `夏日的炎配是什么？肯定是冰淇淋🍦啦~不吃冰淇淋的夏天是不圆满的，不过女生难免会心疼胖，到了夏天更是不敢吃什么甜食...终于这次被我发现了不长胖还得吃的HALO TOP低卡冰淇淋，我宣布我的夏天吃它承包了！

🥄说到低卡冰淇淋，好多人可能会担心有点影响口感，然而HALO TOP的低卡冰淇淋真的好吃到上头！四个口味个个惊艳，我已经用它们填满我家冰箱了这么好吃的冰淇淋每杯热量还不到100千卡，怎不得在美国能成为时代杂志封面~

🤎我最爱声巧布朗尼，也是巧克力控的福音！进口低脂可可粉嫩的，入口即化，还外外有香浓细腻，而且每一口都能吃到巧克力豆，有嚼又美味，简直太满足~

💗红颜莓莓大概是我吃过zui有草莓味的冰淇淋了，不像是用的日本品牌红颜草莓，看得到的草莓颗粒，吃起来更是超过瘾的，我特别喜欢咬它这个口感，一勺一个🍓真是解馋又解暑。

👀自从发现了HALO TOP冰淇淋就打开了新世界的大门，甜食控可以放心吃也没有负担！感觉国内不仅是冰淇淋，更是我一整个夏天的快乐~

😋对了现在官方还有吃货活动！真的是就要满满了，大家快冲！！

@HALO TOP #百内第一好HALOTOP #HALOTOP北极光环 #冰淇淋`,
    author: 'Joescon美瞳',
    publishTime: '2021-11-25 22:55',
    collectTime: '2021-11-25 23:00',
    likes: 1914,
    shares: 978,
    comments: 47,
    type: 'negative',
    commentList: [
      {
        id: 1,
        author: '可乐可乐',
        time: '06-28',
        content: '说到低卡冰淇淋，好多人可能会担心有点影响口感，然而HALO TOP的低卡冰淇淋真的好吃到上头！四个口味个个惊艳，我已经用它们填满我家冰箱了这么好吃的冰淇淋每杯热量还不到100千卡，怎不得在美国能成为时代杂志封面~',
        tag: '高度疑似负面',
        tagType: 'danger',
        score: 99
      },
      {
        id: 2,
        author: '铁影殿',
        time: '06-28',
        content: '1',
        tag: '非负面',
        tagType: 'normal',
        score: 0
      },
      {
        id: 3,
        author: '优聚聚（作者）',
        time: '06-28',
        content: '我已经用它们填满我家冰箱了这么好吃的冰淇淋每杯热量还不到100千卡，怎不得在美国能成为时代杂志封面~',
        tag: '疑似负面',
        tagType: 'warning',
        score: 99
      },
      {
        id: 4,
        author: '可乐可乐',
        time: '06-28',
        content: '说到低卡冰淇淋，好多人可能会担心有点影响口感，然而HALO TOP的低卡冰淇淋真的好吃到上头！四个口味个个惊艳，我已经用它们填满我家冰箱了这么好吃的冰淇淋每杯热量还不到100千卡，怎不得在美国能成为时代杂志封面~',
        tag: '高度疑似负面',
        tagType: 'danger',
        score: 99
      }
    ],
    tags: ['非负', '非负', '非负', '非负']
  },
  {
    id: 2,
    platform: 'douyin',
    platformIcon: 'https://placeholder.com/48x48/ff4d4f/ffffff.png?text=DY',
    title: '618用18🔥拿下moody半年抽美瞳',
    content: `买的是巧克力味的~真的半年自然百搭的颜色，带上很混眼😍素颜化妆都好看！ #美瞳种草 #Moody美瞳 #半年抽美瞳 #素颜 #刘亦菲`,
    author: 'Joescon美瞳',
    publishTime: '2021-11-25 22:50',
    collectTime: '2021-11-25 23:00',
    star: 2300,
    likes: 1914,
    shares: 978,
    comments: 47,
    type: 'negative',
    commentList: [
      {
        id: 1,
        author: '小红帽',
        time: '06-28',
        content: '真的很好看，我也想买！',
        tag: '非负面',
        tagType: 'normal',
        score: 0
      }
    ],
    tags: ['非负', '非负', '非负', '非负']
  }
]

// 更新 tableData 的初始值
const tableData = ref(mockData)

// 分页数据
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = computed(() => tableData.value.length)
  
  const startIndex = computed(() => (currentPage.value - 1) * pageSize.value + 1)
  const endIndex = computed(() => Math.min(currentPage.value * pageSize.value, total.value))
  
const drawerVisible = ref(false)
const currentItem = ref(null)

const openDrawer = (row) => {
  currentItem.value = row
  drawerVisible.value = true
}
  
  // 方法
  const handleSelectionChange = (val) => {
    multipleSelection.value = val
  }
  
  const handleSortChange = ({ prop, order }) => {
    // 在实际应用中，这里可能需要调用API重新获取数据
    if (prop === 'collectTime') {
      tableData.value.sort((a, b) => {
        const timeA = new Date(a.collectTime).getTime()
        const timeB = new Date(b.collectTime).getTime()
        return order === 'ascending' ? timeA - timeB : timeB - timeA
      })
    }
  }

  const closeDrawer = () => {
    drawerVisible.value = false
  }
  
  const getPlatformIcon = (platform) => {
    // 实际应用中返回真实的平台图标
    return 'https://placeholder.com/icon.png'
  }

  const handleLogin = async () => {
  const loginData: LoginParams = {
    username: 'admin',
    password: '123456'
  }

  try {
    const res = await userApi.login(loginData)
    // 这里可以处理登录成功后的逻辑
    console.log('登录成功：', res.token)
    // 存储 token
    localStorage.setItem('token', res.token)
  } catch (error) {
    // 处理错误
    console.error('登录失败：', error)
  }
}

const getUserInfo = async () => {
  try {
    const userInfo = await userApi.getUserInfo()
    console.log('用户信息：', userInfo)
  } catch (error) {
    console.error('获取用户信息失败：', error)
  }
}
  
  const getTags = (type) => {
    return ['非负']
  }
  
  const getTagType = (tag) => {
    return 'danger'
  }
  </script>
  
  <style lang="scss" scoped>
  .content-management {
    padding: 20px;
    background: #fff;
  
    .filter-section {
      margin-bottom: 20px;
  
      .filter-row {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
  
  
        .filter-select {
          width: 120px;
          margin-right: 10px;
        }
  
        .search-input {
          width: 300px;
          margin-right: 10px;
        }
  
        .more-btn {
          margin-left: auto;
  
          .is-reverse {
            transform: rotate(180deg);
            transition: transform 0.3s;
          }
        }
      }

      .collapsed {
        .time-filter-row,
        .filter-row,
        .platform-stats {
          max-height: 0;
          opacity: 0;
          margin: 0;
          padding: 0;
        }
      }
  
      .time-filter-row,
      .filter-row,
      .platform-stats {
        transition: all 0.3s ease-in-out;
        overflow: hidden;
        transform-origin: top;
      }

      .filter-block {
        .time-filter-row,.filter-row{
          display: grid;
          grid-template-columns: repeat(2, 1fr); // 将内容分为两列
          gap: 20px; // 设置网格间距
          width: 100%;
          .label{
            margin-right: 12px;
          }
          .content-type,.account-type{
            display: flex;
            align-items: center;
          }
        }
  

  .time-filter-row {
    grid-column: 1 / -1; // 时间筛选占据整行
  }

  .content-type,
  .account-type {
    width: 100%;
  }

  .fermentation-status {
    grid-column: 1 / -1; // 发酵情况占据整行
  }

  .platform-stats {
    grid-column: 1 / -1; // 平台统计占据整行
  }
}
  
  
      .time-filter-row {
        margin-bottom: 20px;
  
        .time-section {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
  
          .el-radio-group {
            margin-right: 10px;
          }
        }
      }
  
      .fermentation-status {
        display: flex;
        align-items: center;
  
        .ferment-select {
          width: 120px;
          margin-right: 12px;
        }
  
        .ferment-input {
          width: 200px;
        }
      }
  
      .platform-stats {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 20px;
        .label{
          margin-right: 12px;
        }
  
        .stat-item {
          .count {
            color: #666;
            margin-left: 4px;
          }
        }
      }
  
      .action-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
  
        .total {
          color: #606266;
        }
  
        .buttons {
          display: flex;
          gap: 10px;
        }
      }
    }
  
    .content-table {
      :deep(.el-table) {
        .content-cell {
          display: flex;
          padding: 12px 0;
  
          .platform-icon {
            width: 48px;
            height: 48px;
            margin-right: 20px;
            
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 4px;
            }
          }
  
          .content-info {
            flex: 1;
  
            .title {
              font-size: 16px;
              font-weight: 500;
              color: #303133;
              margin-bottom: 8px;
              cursor: pointer;
  
              &:hover {
                  color: $ai-page-color;
             }
            }
  
            .content-text {
              color: #606266;
              margin-bottom: 12px;
            }
  
            .meta-info {
              display: flex;
              align-items: center;
              gap: 20px;
              margin-bottom: 12px;
              color: #909399;
  
              .engagement {
                display: flex;
                gap: 15px;
  
                span {
                  display: flex;
                  align-items: center;
                  gap: 4px;
                  img{
                    width: 18px;
                  }
                }
              }
              .detail-link{
                color: $ai-page-color;
              }
            }
  
            .tags {
              margin-bottom: 12px;
              
              .el-tag {
                margin-right: 8px;
                background-color: $ai-page-color;
              }
            }
  
            .actions {
              display: flex;
              gap: 10px;
  
              .el-button {
                display: flex;
                align-items: center;
                gap: 4px;
              }
            }
          }
        }
        th.el-table__cell {
          background-color: $ai-page-color;
          color: #ffffff;
          font-weight: 500;
  
          .el-table__sort-icon {
            color: #ffffff;
          }
  
          .el-checkbox__inner {
            border-color: #ffffff;
          }
        }
  
        th .el-checkbox__inner:hover {
          border-color: #ffffff;
        }
      }
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
  
  :deep(.el-button--primary) {
    background-color: $ai-page-color;
    border-color: $ai-page-color;
  
    &:hover {
      background-color: #7d5ba8;
      border-color: #7d5ba8;
    }
  }

  :deep(.el-radio-group) {
  .el-radio-button__inner {
    &:hover {
      color: $ai-page-color;
    }
  }
  
  .el-radio-button__original-radio:checked + .el-radio-button__inner {
    background-color: $ai-page-color;
    border-color: $ai-page-color;
    box-shadow: -1px 0 0 0 $ai-page-color;
  }
}
  
  .filter-transition-enter-active,
  .filter-transition-leave-active {
    transition: all 0.3s ease-in-out;
    max-height: 1000px; 
  }
  
  .filter-transition-enter-from,
  .filter-transition-leave-to {
    max-height: 0;
    opacity: 0;
  }
  
  .filter-transition-enter-to,
  .filter-transition-leave-from {
    max-height: 1000px;
    opacity: 1;
  }
  </style>