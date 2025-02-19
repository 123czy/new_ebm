<template>
    <div class="content-item">
      <el-checkbox v-model="checked" />
      
      <div class="item-content">
        <div class="platform-icon">
          
        </div>
        
        <div class="main-content">
          <div class="title">{{ item.title }}</div>
          <div class="content-text">{{ item.content }}</div>
          
          <div class="meta-info">
            <div class="engagement">
              <span class="likes">
                {{ item.likes }}
              </span>
              <span class="shares">
                <el-icon><Share /></el-icon>
                {{ item.shares }}
              </span>
              <span class="comments">
                <el-icon><ChatDotRound /></el-icon>
                {{ item.comments }}
              </span>
            </div>
            
            <div class="author">
              作者：{{ item.author }}
            </div>
            
            <div class="publish-time">
              发布时间：{{ item.publishTime }}
            </div>
            
            <el-link type="primary" class="detail-link">原文链接</el-link>
          </div>
          
          <div class="tags">
            <el-tag 
              v-for="tag in getTags(item.type)"
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
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import {  Share, ChatDotRound, DocumentAdd, Position, Edit, Delete } from '@element-plus/icons-vue'
  
  const props = defineProps({
    item: {
      type: Object,
      required: true
    }
  })
  
  const checked = ref(false)
  
  
  const getTags = (type) => {
    return ['非负']
  }
  
  const getTagType = (tag) => {
    return 'danger'
  }
  </script>
  
  <style lang="scss" scoped>
  .content-item {
    display: flex;
    padding: 20px;
    border-bottom: 1px solid #ebeef5;
    
    &:hover {
      background-color: #f5f7fa;
    }
  
    .item-content {
      display: flex;
      margin-left: 20px;
      flex: 1;
  
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
  
      .main-content {
        flex: 1;
  
        .title {
          font-size: 16px;
          font-weight: 500;
          color: #303133;
          margin-bottom: 8px;
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
  }
  </style>