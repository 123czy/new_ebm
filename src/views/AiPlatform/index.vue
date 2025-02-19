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
  
        <div :class="{ collapsed: !showMoreFilters }">
          <div class="time-filter-row">
            <div class="time-section">
              <span class="label">发布时间:</span>
              <el-radio-group v-model="publishTime">
                <el-radio-button label="today">今天</el-radio-button>
                <el-radio-button label="24h">24小时</el-radio-button>
                <el-radio-button label="3d">3天</el-radio-button>
                <el-radio-button label="7d">7天</el-radio-button>
                <el-radio-button label="30d">30天</el-radio-button>
              </el-radio-group>
              <!-- <el-date-picker
                v-model="customTimeRange"
                type="daterange"
                placeholder="开始时间-结束时间"
              /> -->
            </div>
            
            <div class="time-section">
              <span class="label">采集时间:</span>
              <el-radio-group v-model="collectTime">
                <el-radio-button label="today">今天</el-radio-button>
                <el-radio-button label="24h">24小时</el-radio-button>
                <el-radio-button label="3d">3天</el-radio-button>
                <el-radio-button label="7d">7天</el-radio-button>
                <el-radio-button label="30d">30天</el-radio-button>
              </el-radio-group>
              <!-- <el-date-picker
                v-model="customCollectRange"
                type="daterange"
                placeholder="开始时间-结束时间"
              /> -->
            </div>
          </div>
  
          <div class="filter-row">
            <div class="content-type">
              <span class="label">内容性质:</span>
              <el-radio-group v-model="contentType">
                <el-radio-button label="all">全部</el-radio-button>
                <el-radio-button label="suspicious">疑似负面</el-radio-button>
                <el-radio-button label="high">高度疑似负面</el-radio-button>
                <el-radio-button label="negative">非负面</el-radio-button>
              </el-radio-group>
            </div>
  
            <div class="account-type">
              <span class="label">账号类型:</span>
              <el-radio-group v-model="accountType">
                <el-radio-button label="monitored">监控账号</el-radio-button>
                <el-radio-button label="unmonitored">非监控账号</el-radio-button>
              </el-radio-group>
            </div>
          </div>
  
          <div class="filter-row">
            <div class="fermentation-status">
              <span class="label">发酵情况:</span>
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
                v-model="fermentationValue"
                placeholder="请输入数字"
                class="ferment-input"
                type="number"
              />
            </div>
          </div>
  
          <div class="platform-stats">
            <div class="stat-item">
              <span>全部</span>
              <span class="count">(17.8万+)</span>
            </div>
            <div class="stat-item">
              <span>抖音</span>
              <span class="count">(2.1万+)</span>
            </div>
            <div class="stat-item">
              <span>快手</span>
              <span class="count">(3.2万+)</span>
            </div>
            <div class="stat-item">
              <span>小红书</span>
              <span class="count">(2.3万+)</span>
            </div>
            <div class="stat-item">
              <span>bilibili</span>
              <span class="count">(10.1万+)</span>
            </div>
            <div class="stat-item">
              <span>知乎</span>
              <span class="count">(2,300)</span>
            </div>
            <div class="stat-item">
              <span>微博</span>
              <span class="count">(2,300)</span>
            </div>
          </div>
        </div>
  
        <div class="action-row">
          <div class="total">共计: {{ total }}条</div>
          <div class="buttons">
            <el-button type="primary">导出</el-button>
            <el-button type="primary">删除</el-button>
          </div>
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
                        <!-- <el-icon><Heart /></el-icon> -->
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
  
        <div class="pagination">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="10"
            :total="total"
            layout="total, prev, pager, next, jumper"
          />
        </div>
      </div>

    <AiContentDrawer  v-model:visible="drawerVisible" :data="currentItem" :title="currentItem?.title" @close="closeDrawer"/>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { 
    ArrowUpBold,
    Share,
    ChatDotRound,
    DocumentAdd,
    Position,
    Edit,
    Delete
  } from '@element-plus/icons-vue'
  
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
  
  // 发酵情况相关的响应式变量
  const fermentationType = ref('likes')
  const fermentationOperator = ref('gt')
  const fermentationValue = ref('')
  
  // 表格相关
  const multipleTable = ref(null)
  const currentPage = ref(1)
  const total = ref(178545)
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
  
        .label {
          margin-right: 10px;
          color: #606266;
        }
  
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
        gap: 10px;
  
        .ferment-select {
          width: 120px;
        }
  
        .ferment-input {
          width: 200px;
        }
      }
  
      .platform-stats {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-bottom: 20px;
  
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
                  color: #6b4c93;
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
                }
              }
            }
  
            .tags {
              margin-bottom: 12px;
              
              .el-tag {
                margin-right: 8px;
                background-color: #6b4c93;
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
          background-color: #6b4c93;
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
  
    .pagination {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
  
  :deep(.el-button--primary) {
    background-color: #6b4c93;
    border-color: #6b4c93;
  
    &:hover {
      background-color: #7d5ba8;
      border-color: #7d5ba8;
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