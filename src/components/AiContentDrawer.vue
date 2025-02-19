<template>
    <el-drawer
      :model-value="visible"
      direction="rtl"
      size="80%"
      :show-close="false"
      :with-header="false"
      :before-close="handleClose"
    >
      <div class="drawer-container">
        <div class="drawer-layout">
          <!-- 左侧关键词区域 - 固定 -->
          <div class="keywords-section">
            <div class="keyword-group">
              <h4>搜索关键词：</h4>
              <div class="tag-list">
                <el-tag
                  v-for="tag in 4"
                  :key="tag"
                  type="primary"
                  effect="plain"
                  class="custom-tag"
                >
                  非负
                </el-tag>
              </div>
            </div>
  
            <div class="keyword-group">
              <h4>负面关键词：</h4>
              <div class="tag-list">
                <el-tag
                  v-for="tag in 4"
                  :key="tag"
                  type="primary"
                  effect="plain"
                  class="custom-tag"
                >
                  非负
                </el-tag>
              </div>
            </div>
  
            <div class="keyword-group">
              <h4>问题分类：</h4>
              <div class="tag-list">
                <el-tag
                  v-for="tag in 4"
                  :key="tag"
                  type="primary"
                  effect="plain"
                  class="custom-tag"
                >
                  非负
                </el-tag>
              </div>
            </div>
  
            <div class="keyword-group">
              <h4>内容情感：</h4>
              <div class="tag-list">
                <el-tag
                  type="primary"
                  effect="plain"
                  class="custom-tag"
                >
                  非负
                </el-tag>
              </div>
            </div>
  
            <div class="keyword-group">
              <h4>发酵程度：</h4>
              <div class="tag-list">
                <el-tag
                  type="primary"
                  effect="plain"
                  class="custom-tag"
                >
                  非负
                </el-tag>
              </div>
            </div>
          </div>
  
          <!-- 右侧内容区域 - 可滚动 -->
          <div class="content-section">
            <!-- 头部信息 -->
            <!-- 固定在右上角的操作按钮 -->
        <div class="action-buttons">
          <el-button type="text">
            <el-icon><DocumentAdd /></el-icon>
            生成事件
          </el-button>
          <el-button type="text">
            <el-icon><Position /></el-icon>
            下卡发送
          </el-button>
          <el-button type="text">
            <el-icon><Edit /></el-icon>
            标签编辑
          </el-button>
          <el-button type="text">
            <el-icon><Delete /></el-icon>
            删除
          </el-button>
        </div>
            <div class="drawer-header">
              <div class="platform-icon">
                <!-- <img :src="data.platformIcon" alt="platform icon" /> -->
              </div>
              <div class="header-content">
                <h3 class="title">{{ data.title }}</h3>
                <div class="meta">
                  <span>发布时间：{{ data.publishTime }}</span>
                  <span>作者：{{ data.author }}</span>
                  <el-link type="primary" class="source-link">查看原贴</el-link>
                </div>
              </div>
            </div>
  
            <!-- 滚动内容区域 -->
            <div class="content-scroll">
              <div class="content-body">
                {{ data.content }}
              </div>
  
              <div class="engagement-info">
                <span class="info-item">
                  <!-- <el-icon><Heart /></el-icon> -->
                  {{ data.likes }}
                </span>
                <span class="info-item">
                  <el-icon><Share /></el-icon>
                  {{ data.shares }}
                </span>
                <span class="info-item">
                  <el-icon><ChatDotRound /></el-icon>
                  {{ data.comments }}
                </span>
              </div>
  
              <div class="comments-section">
                <div class="section-header">
                  <h4 class="">评论：</h4>
                </div>
  
                <div class="comment-list">
                  <div v-for="comment in data.commentList" :key="comment.id" class="comment-item">
                    <div class="comment-header">
                      <span class="comment-author">{{ comment.author }}</span>
                      <span class="comment-time">{{ comment.time }}</span>
                      <div class="comment-right">
                        <span v-if="comment.tag" class="comment-tag" :class="comment.tagType">
                          {{ comment.tag }}
                        </span>
                        <span class="comment-score">点赞数：{{ comment.score }}</span>
                      </div>
                    </div>
                    <div class="comment-content">{{ comment.content }}</div>
                    <div class="comment-actions">
                      <div class="button-group">
                        <el-button size="small" type="primary">问题分类</el-button>
                        <el-button size="small" type="primary">问题分类</el-button>
                        <el-button size="small" type="primary">问题分类</el-button>
                        <el-button size="small" type="primary">内容情感</el-button>
                        <el-button size="small" type="primary">发酵程度</el-button>
                      </div>
                      <el-button size="small">
                        <el-icon><Edit /></el-icon>
                        标签编辑
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </template>
  
  <script setup>
  import { ref } from 'vue'
import {
  DocumentAdd,
  Position,
  Edit,
  Delete,
  Share,
  ChatDotRound
} from '@element-plus/icons-vue'

const props = defineProps({
  visible: Boolean,
  data: {
    type: Object,
    default: () => ({})
  },
  title: String
})

const emit = defineEmits(['update:visible'])

const handleClose = () => {
  emit('update:visible', false)
}
  </script>
  
  <style lang="scss" scoped>
  .drawer-container {
    height: 100%;
    position: relative;
  }
  
  .action-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 0px 20px;
    background-color: #fff;
  
    .el-button {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
  
  .drawer-layout {
    display: flex;
    height: 100%;
  }
  
  .keywords-section {
    width: 200px;
    padding: 20px;
    border-right: 1px solid #EBEEF5;
    flex-shrink: 0;
    height: 100%;
    position: fixed;
    background-color: #fff;
  
    .keyword-group {
      margin-bottom: 24px;
      
      h4 {
        margin: 0 0 12px;
        font-size: 14px;
        font-weight: 500;
        &::before {
          content: '';
          display: inline-block;
          width: 3px;
          height: 14px;
          background-color: $table-button;
          position: relative;
          top: 2px;
          right: 4px;
        }
      }
  
      .tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
  
        .custom-tag {
          background-color: $table-button;
          border-color: $table-button;
          color: #fff;
        }
      }
    }
  }
  
  .content-section {
    flex: 1;
    margin-left: 200px; // 左侧固定区域的宽度
  
    .drawer-header {
      padding: 20px;
      background-color: #fff;
      display: flex;
      gap: 16px;
  
      .platform-icon {
        width: 48px;
        height: 48px;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
        }
      }
  
      .header-content {
        flex: 1;
  
        .title {
          margin: 0 0 8px;
          font-size: 18px;
          font-weight: 500;
        }
  
        .meta {
          color: #909399;
          font-size: 14px;
          display: flex;
          gap: 16px;
          align-items: center;
        }
      }
    }
  
    .content-scroll {
      height: calc(100vh - 180px); // 减去头部和操作按钮的高度
      overflow-y: auto;
      padding: 20px;
  
      .content-body {
        font-size: 14px;
        line-height: 1.6;
        margin-bottom: 20px;
        color: #303133;
      }
  
      .engagement-info {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
        color: #909399;
  
        .info-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
  
      .comments-section {
        .section-header {
          margin-bottom: 16px;
          ::before{
            content: '';
            display: inline-block;
            width: 3px;
            height: 16px;
            background-color: $table-button;
            position: relative;
            top: 2px;
            right: 4px;
          }
          h4 {
            margin: 0;
            font-size: 16px;
            font-weight: 500;
          }
        }
  
        .comment-list {
          .comment-item {
            padding: 16px 0;
            border-bottom: 1px solid #EBEEF5;
  
            .comment-header {
              display: flex;
              align-items: center;
              margin-bottom: 8px;
  
              .comment-author {
                font-weight: 500;
                margin-right: 12px;
              }
  
              .comment-time {
                color: #909399;
                font-size: 14px;
              }
  
              .comment-right {
                margin-left: auto;
                display: flex;
                align-items: center;
                gap: 12px;
  
                .comment-tag {
                  padding: 2px 8px;
                  border-radius: 4px;
                  font-size: 12px;
                  color: #fff;
  
                  &.danger {
                    background-color: #F56C6C;
                  }
  
                  &.warning {
                    background-color: #E6A23C;
                  }
  
                  &.normal {
                    background-color: $table-button;
                  }
                }
  
                .comment-score {
                  font-size: 14px;
                  color: #909399;
                }
              }
            }
  
            .comment-content {
              font-size: 14px;
              line-height: 1.6;
              margin-bottom: 12px;
              color: #606266;
            }
  
            .comment-actions {
              display: flex;
              justify-content: space-between;
              align-items: center;
  
              .button-group {
                display: flex;
                gap: 8px;
  
                .el-button {
                  background-color: $table-button;
                  border-color: $table-button;
                  color: #fff;
  
                  &:hover {
                    background-color: #7d5ba8;
                    border-color: #7d5ba8;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  
  :deep(.el-drawer__header) {
    margin-bottom: 0;
    padding: 0;
    display: none;
  }
  
  :deep(.el-drawer__body) {
    padding: 0;
    height: 100%;
  }
  
  :deep(.el-button--primary) {
    background-color: $table-button;
    border-color: $table-button;
  
    &:hover {
      background-color: #7d5ba8;
      border-color: #7d5ba8;
    }
  }
  </style>