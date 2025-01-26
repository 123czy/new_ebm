<template>
    <div class="company-header">
      <div class="header-content">
        <div class="company-info">
        <div class="company-info-wrapper">
            <div class="logo-section">
                <img class="emb-logo" src="@/assets/svg/emb-logo.svg" alt="">
            <!-- <img :src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hwmt3HnS444iLDUmSbEK8OKXoS4VE0.png" alt="BMW Logo" class="company-logo" /> -->
            <div class="company-name">
              <h1 class="chinese-name">宝马</h1>
              <span class="english-name">BMW</span>
            </div>
          </div>
          <div class="social-icons">
            <el-button circle class="social-btn linkedin">
              <i class="fab fa-linkedin-in"></i>
            </el-button>
            <el-button circle class="social-btn wechat">
              <i class="fab fa-weixin"></i>
            </el-button>
            <el-button circle class="social-btn weibo">
              <i class="fab fa-weibo"></i>
            </el-button>
            <el-button circle class="social-btn other">
              推
            </el-button>
          </div>
        </div>
          <div class="header-footer">
        <div class="industry-info">
          <p class="industry">汽车业</p>
          <p class="category">行业</p>
        </div>
        <div class="date-info">
          <p class="date">2019-06-26</p>
          <p class="status">纳入EBM样本库</p>
        </div>
      </div>
        </div>
        
        <div class="score-section">
          <div class="score-card">
            <div class="score-item">
              <div class="score-value">
                <span class="number">18.34</span>
                <el-tooltip content="查看详情" placement="top">
                  <el-icon class="info-icon"><QuestionFilled /></el-icon>
                </el-tooltip>
              </div>
              <div class="score-label">EBM得分</div>
              <div class="score-change">
                <span class="change-value">0.00%</span>
                <span class="trend">—</span>
              </div>
            </div>
          </div>
          
          <div class="score-card">
            <div class="score-item">
              <div class="score-value">
                <span class="number">17</span>
                <span class="total">of 421</span>
                <el-tooltip content="查看详情" placement="top">
                  <el-icon class="info-icon"><QuestionFilled /></el-icon>
                </el-tooltip>
              </div>
              <div class="score-label">排名</div>
              <div class="score-change">
                <span class="change-value">0</span>
                <span class="trend">—</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  
   
    </div>
  </template>
  
  <script setup>
  import { QuestionFilled } from '@element-plus/icons-vue'
  </script>
  
  <style lang="scss" scoped>
  .company-header {
    background: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  
    .header-content {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 90px;
    }
  
    .company-info {
      position: relative;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: flex-start;
      padding:0 30px 30px;
      .company-info-wrapper{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      &:before{
        content: '';
        position: absolute;
        top: 50%;
        left: 3%;
        width: 100%;
        height: 1px;
        background: #EAEAEA;
      }
    }
  
    .logo-section {
      display: flex;
      align-items: center;
      gap: 16px;
      .emb-logo{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: #EAEAEA;
      }
  
      .company-logo {
        width: 48px;
        height: 48px;
        object-fit: contain;
      }
  
      .company-name {
        .chinese-name {
          min-width: 100px;
          font-size: 32px;
          font-weight: 600;
          margin: 0;
          color: #495057;
        }
  
        .english-name {
          font-size: 18px;
          font-weight: 600;
          color: #495057;
        }
      }
    }
  
    .social-icons {
      display: flex;
      gap: 8px;
  
      .social-btn {
        width: 36px;
        height: 36px;
        padding: 0;
        
        &.linkedin {
          background-color: #0077B5;
          color: white;
        }
        
        &.wechat {
          background-color: #07C160;
          color: white;
        }
        
        &.weibo {
          background-color: #E6162D;
          color: white;
        }
        
        &.other {
          background-color: #4CAF50;
          color: white;
        }
      }
    }
  
    .score-section {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 0 24px;
      border-left: 1px solid #EAEAEA;
    }
  
    .score-card {
      background: #fff;
      padding: 16px;
      border-radius: 8px;
      min-width: 200px;
    }
  
    .score-item {
      text-align: right;
  
      .score-value {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 4px;
  
        .number {
          font-size: 28px;
          font-weight: 600;
          color: #333;
        }
  
        .total {
          font-size: 16px;
          color: #666;
          margin-left: 4px;
        }
  
        .info-icon {
          color: #999;
          cursor: pointer;
          font-size: 16px;
          margin-left: 4px;
        }
      }
  
      .score-label {
        font-size: 14px;
        color: #999;
        margin: 4px 0;
      }
  
      .score-change {
        font-size: 14px;
        
        .change-value {
          color: #F6A723;
        }
        
        .trend {
          color: #999;
          margin-left: 4px;
        }
      }
    }
  
    .header-footer {
        width: 100%;
      display: flex;
      justify-content: space-between;
      color: #666;
      font-size: 14px;
  
      .industry-info {
        .industry {
            font-size: 20px;
            font-weight: 600;
            color: #495057;
        }
        .category {
            font-size: 18px;
            color: #495057;
        }
        .divider {
          margin: 0 8px;
          color: #999;
        }
      }
  
      .date-info {
        .date {
            font-size: 20px;
            font-weight: 600;
            color: #495057;
        }
        .status {
            font-size: 18px;
            color: #495057;
        }
      }
    }
  }
  </style>