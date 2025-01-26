<template>
    <div class="company-header">
      <div class="header-content">
        <div class="company-info ">
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
        
        <div class="score-section ">
          <div class="score-card">
            <div class="score-item">
              <p class="score-change">
                <span class="change-value">0.00%</span>
                <span class="trend">—</span>
              </p>
              
              <p class="score-value">
                <span class="number fs-32 fw-600">18.34</span>
                <el-tooltip content="查看详情" placement="top">
                  <el-icon class="info-icon" size="16"><QuestionFilled /></el-icon>
                </el-tooltip>
              </p>
              <p class="score-label text-center">EBM得分</p>
            </div>
          </div>
          
          <div class="score-card">
            <div class="score-item">
              <p class="score-change">
                <span class="change-value ">0</span>
                <span class="trend">—</span>
              </p>
              <p class="score-value">
                <span class="number fs-32 fw-600">17</span>
                <span class="total ">of 421</span>
                <el-tooltip content="查看详情" placement="top">
                  <el-icon class="info-icon" size="16"><QuestionFilled /></el-icon>
                </el-tooltip>
              </p>
              <p class="score-label text-center">排名</p>
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
    background: #F5F7FA;
    width: 100%;
    .header-content {
      display: grid;
      grid-template-columns: 60% 40%;
      gap: 24px;
      max-width: 100%;
      margin: 0 auto;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 24px;
      }
    }

  
    .company-info {
      width: 100%;
      position: relative;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: flex-start;
      padding: 30px;
      background: #FFFFFF;
      border: 1px solid rgba(0, 40, 100, .12);
      border-radius: 3px;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);

      @media (max-width: 768px) {
        padding: 20px;
      }

      .company-info-wrapper{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media (max-width: 768px) {
          flex-direction: column;
          gap: 16px;
          align-items: flex-start;
        }
      }
      &:before{
        content: '';
        position: absolute;
        top: 55%;
        left: 3%;
        width: 93%;
        height: 1px;
        background: #EAEAEA;
      }
    }
  
    .logo-section {
      display: flex;
      align-items: center;
      gap: 16px;

      @media (max-width: 768px) {
        width: 100%;
        justify-content: flex-start;
      }

      .emb-logo{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: #EAEAEA;

        @media (max-width: 768px) {
          width: 80px;
          height: 80px;
        }
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
      width: 100%;
      gap: 24px;

      @media (max-width: 768px) {
        gap: 16px;
      }
    }
  
    .score-card {
      width: 95%;
      background: #FFFFFF;
      padding: 16px;
      min-width: 240px;
      border: 1px solid rgba(0, 40, 100, .12);
      border-radius: 3px;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);

      @media (max-width: 768px) {
        min-width: unset;
        width: 100%;
      }
    }
  
    .score-item {
      text-align: right;
  
      .score-value {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
  
        .number {
          font-size: 28px;
          font-weight: 600;
          color: #333;
        }
  
        .total {
          font-size: 16px;
          color: #333;
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

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 12px;
      }

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