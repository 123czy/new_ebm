<template>
  <footer class="footer" :class="{ 'is-fixed': isFixed }">
    <div class="footer-content">
      <div class="footer-left">
        <span class="copyright">Copyright © 2025 aTalent. All rights reserved.</span>
      </div>
      <div class="footer-right">
        <a href="#" class="support-link">Need help? Contact Support</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.footer {
  background-color: #fff;
  border-top: 1px solid #edf2f7;
  padding: 20px 0;
  width: 100%;
  position: relative;
  transition: transform 0.3s ease;
  z-index: 100;
  

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .footer-left {
      .copyright {
        color: #6b7280;
      }
    }
    
    .footer-right {
      .support-link {
        color: #6b7280;
        text-decoration: none;
        transition: color 0.2s ease;
        
        &:hover {
          color: #4a5568;
        }
      }
    }
  }
  
  // 平板设备适配
  @media (max-width: 1024px) {
    .footer-content {
      max-width: 100%;
      padding: 0 20px;
    }
  }
  
  // 移动设备适配
  @media (max-width: 640px) {
    padding: 12px 0;
    
    .footer-content {
      flex-direction: column;
      gap: 8px;
      text-align: center;
      padding: 0 16px;
      
      .footer-left {
        .copyright {
          font-size: 12px;
        }
      }
      
      .footer-right {
        .support-link {
          font-size: 12px;
        }
      }
    }
  }
}
</style>