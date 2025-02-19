<template>
    <el-drawer
      :model-value="visible"
      direction="rtl"
      size="50%"
      :show-close="false"
      :with-header="false"
      :before-close="handleClose"
    >
      <div class="event-detail">
        <!-- 顶部信息 -->
        <div class="header-section">
          <div class="main-info">
            <div class="event-id">
              事件编号：{{ data.eventId }}
            </div>
            <el-tag
              :type="data.status === 'processing' ? 'warning' : 'success'"
              class="status-tag"
            >
              {{ data.status === 'processing' ? '处理中' : '已完成' }}
            </el-tag>
          </div>
          
          <div class="info-grid">
            <div class="info-item">
              <span class="label">订单号：</span>
              <span class="value">{{ data.orderId || '- -' }}</span>
            </div>
            <div class="info-item">
              <span class="label">生成时间：</span>
              <span class="value">{{ data.createTime }}</span>
            </div>
            <div class="info-item">
              <span class="label">事件级别：</span>
              <span class="value">{{ data.level }}</span>
            </div>
          </div>
  
          <div class="category-section">
            <span class="label">问题分类：</span>
            <div class="category-tags">
              <el-tag
                v-for="(category, index) in data.category.split('、')"
                :key="index"
                class="category-tag"
              >
                {{ category }}
              </el-tag>
            </div>
          </div>
  
          <div class="update-time">
            <span class="label">事件更新时间：</span>
            <span class="value">{{ data.updateTime }}</span>
          </div>
        </div>
  
        <!-- 内容区域 -->
        <div class="content-section">
          <div class="content-header">
            <div class="platform-icon">
              <img :src="getPlatformIcon(data.platform)" alt="platform icon" />
            </div>
            <div class="content-title">{{ data.title }}</div>
            <div class="content-meta">
              <span>发布时间：{{ data.publishTime }}</span>
              <span>作者：{{ data.author }}</span>
              <el-link type="primary">原文链接</el-link>
            </div>
          </div>
  
          <div class="content-body">
            {{ data.content }}
          </div>
  
          <div class="content-footer">
            <el-tag type="danger" effect="plain">
              高度疑似负面
            </el-tag>
            <span class="comment-count">
              负面评论：15条
            </span>
          </div>
        </div>
  
        <!-- 处理记录 -->
        <div class="record-section">
          <div class="record-header">
            <h3>处理记录</h3>
            <el-button type="primary" @click="handleAddRecord">
              添加记录
            </el-button>
          </div>
  
          <div class="record-list">
            <div
              v-for="(record, index) in records"
              :key="index"
              class="record-item"
            >
              <div class="record-info">
                <span class="record-user">{{ record.user }}</span>
                <span class="record-time">{{ record.time }}</span>
              </div>
              <div class="record-content">
                {{ record.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  interface EventDetailData {
    eventId: string
    orderId?: string
    createTime: string
    level: string
    status: string
    category: string
    updateTime: string
    platform: string
    title: string
    publishTime: string
    author: string
    content: string
  }
  
  interface Record {
    user: string
    time: string
    content: string
  }
  
  const props = defineProps<{
    visible: boolean
    data: EventDetailData
  }>()
  
  const emit = defineEmits(['update:visible'])
  
  // Mock处理记录数据
  const records = ref<Record[]>([
    {
      user: '铁影殿',
      time: '2022-06-25 13:22:21',
      content: '说到低卡冰淇淋，好多人可能会担心有点影响口感，然而HALO TOP的低卡冰淇淋真的好吃到上头！四个口味个个惊艳，我已经用它们填满我家冰箱了这么好吃的冰淇淋每杯热量还不到100千卡，怎不得在美国能成为时代杂志最佳发明诶~'
    },
    {
      user: '铁影殿',
      time: '2022-06-24 13:22:21',
      content: '说到低卡冰淇淋，好多人可能会担心有点影响口感，然而HALO TOP的低卡冰淇淋真的好吃到上头！四个口味个个惊艳，我已经用它们填满我家冰箱了这么好吃的冰淇淋每杯热量还不到100千卡，怎不得在美国能成为时代杂志最佳发明诶~'
    },
    {
      user: '铁影殿',
      time: '2022-06-23 13:22:21',
      content: '说到低卡冰淇淋，好多人可能会担心有点影响口感，然而HALO TOP的低卡冰淇淋真的好吃到上头！四个口味个个惊艳，我已经用它们填满我家冰箱了这么好吃的冰淇淋每杯热量还不到100千卡，怎不得在美国能成为时代杂志最佳发明诶~'
    }
  ])
  
  const handleClose = () => {
    emit('update:visible', false)
  }
  
  const getPlatformIcon = (platform: string): string => {
    // 实际应用中返回真实的平台图标
    return 'https://placeholder.com/48x48/ff4d4f/ffffff.png?text=XHS'
  }
  
  const handleAddRecord = () => {
    // TODO: 实现添加记录的逻辑
    console.log('添加记录')
  }
  </script>
  
  <style lang="scss" scoped>
  .event-detail {
    padding: 20px;
  
    .header-section {
      margin-bottom: 24px;
  
      .main-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
  
        .event-id {
          font-size: 16px;
          font-weight: 500;
        }
  
        .status-tag {
          font-size: 14px;
        }
      }
  
      .info-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
        margin-bottom: 16px;
  
        .info-item {
          .label {
            color: #909399;
            margin-right: 8px;
          }
        }
      }
  
      .category-section {
        margin-bottom: 16px;
        display: flex;
        align-items: center;
  
        .label {
          color: #909399;
          margin-right: 8px;
        }
  
        .category-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
      }
  
      .update-time {
        .label {
          color: #909399;
          margin-right: 8px;
        }
      }
    }
  
    .content-section {
      background-color: #f5f7fa;
      padding: 20px;
      margin-bottom: 24px;
      border-radius: 4px;
  
      .content-header {
        margin-bottom: 16px;
  
        .platform-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 12px;
          
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 4px;
          }
        }
  
        .content-title {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 8px;
        }
  
        .content-meta {
          color: #909399;
          font-size: 14px;
          display: flex;
          gap: 16px;
          align-items: center;
        }
      }
  
      .content-body {
        font-size: 14px;
        line-height: 1.6;
        margin-bottom: 16px;
        color: #606266;
      }
  
      .content-footer {
        display: flex;
        align-items: center;
        gap: 12px;
  
        .comment-count {
          color: #f56c6c;
        }
      }
    }
  
    .record-section {
      .record-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
  
        h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 500;
        }
      }
  
      .record-list {
        .record-item {
          padding: 16px;
          background-color: #f5f7fa;
          border-radius: 4px;
          margin-bottom: 12px;
  
          .record-info {
            margin-bottom: 8px;
  
            .record-user {
              font-weight: 500;
              margin-right: 12px;
            }
  
            .record-time {
              color: #909399;
              font-size: 14px;
            }
          }
  
          .record-content {
            font-size: 14px;
            line-height: 1.6;
            color: #606266;
          }
        }
      }
    }
  }
  
  :deep(.el-drawer__header) {
    margin-bottom: 0;
  }
  
  :deep(.el-button--primary) {
    background-color: #6b4c93;
    border-color: #6b4c93;
  
    &:hover,
    &:focus {
      background-color: #7d5ba8;
      border-color: #7d5ba8;
    }
  }
  
  :deep(.el-tag) {
    &.el-tag--danger {
      --el-tag-bg-color: var(--el-color-danger-light-9);
    }
  }
  </style>