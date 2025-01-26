<template>
  <div class="ebm-formula" :class="{ 'scrolled': isScrolled }">
    <div class="formula-title">
      EBM 的算法配方
    </div>
    <div class="cards-container">
      <!-- 影响力卡片 -->
      <div 
        class="card" 
        :class="{ active: activeCard === 'influence' }"
        @click="setActiveCard('influence')"
      >
        <div class="card-content">
          <div class="card-title">影响力</div>
          <div class="card-icon">
            <img src="@/assets/icons/influence.svg" alt="影响力" />
          </div>
          <div class="card-text">{{ currentInfluenceText }}</div>
        </div>
        <div class="card-footer">
          <img 
            v-for="(icon, index) in socialIcons" 
            :key="index" 
            :src="icon.src" 
            @click.stop="changeInfluenceText(index)"
            alt="社交图标"
          />
        </div>
      </div>

      <!-- 活跃度卡片 -->
      <div 
        class="card" 
        :class="{ active: activeCard === 'activity' }"
        @click="setActiveCard('activity')"
      >
        <div class="card-content">
          <div class="card-title">活跃度</div>
          <div class="card-icon">
            <img src="@/assets/icons/activity.svg" alt="活跃度" />
          </div>
          <div class="card-text">{{ currentActivityText }}</div>
        </div>
        <div class="card-footer">
          <img 
            v-for="(icon, index) in socialIcons" 
            :key="index" 
            :src="icon.src" 
            @click.stop="changeActivityText(index)"
            alt="社交图标"
          />
        </div>
      </div>

      <!-- 互动粘性卡片 -->
      <div 
        class="card" 
        :class="{ active: activeCard === 'interaction' }"
        @click="setActiveCard('interaction')"
      >
        <div class="card-content">
          <div class="card-title">互动粘性</div>
          <div class="card-icon">
            <img src="@/assets/icons/interaction.svg" alt="互动粘性" />
          </div>
          <div class="card-text">{{ currentInteractionText }}</div>
        </div>
        <div class="card-footer">
          <img 
            v-for="(icon, index) in socialIcons" 
            :key="index" 
            :src="icon.src" 
            @click.stop="changeInteractionText(index)"
            alt="社交图标"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import WeixinIcon from '@/assets/svg/weixin.svg'
import WeiboIcon from '@/assets/svg/weibo.svg'

const isScrolled = ref(false)
const activeCard = ref('influence')

const socialIcons = [
  { src: WeixinIcon },
  { src: WeiboIcon }
]

// 文本内容
const influenceTexts = [
  '指衡量此社交招聘号吸引社会关注度的水平，代表了雇主发表的社交招聘的内容所能企及的人数和范围，简而言之，就是"粉丝基础"',
  '微信 平台的社交招聘影响力，是由该企业的微信招聘运营号拥有的活跃粉丝数，以及粉丝数的增减百分比来计算的。'
]

const activityTexts = [
  '活跃度微信说明文本',
  '活跃度微博说明文本'
]

const interactionTexts = [
  '互动粘性微信说明文本',
  '互动粘性微博说明文本'
]

const currentInfluenceText = ref(influenceTexts[0])
const currentActivityText = ref(activityTexts[0])
const currentInteractionText = ref(interactionTexts[0])

// 处理滚动
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// 切换卡片
const setActiveCard = (card: string) => {
  activeCard.value = card
}

// 切换文本
const changeInfluenceText = (index: number) => {
  currentInfluenceText.value = influenceTexts[index]
}

const changeActivityText = (index: number) => {
  currentActivityText.value = activityTexts[index]
}

const changeInteractionText = (index: number) => {
  currentInteractionText.value = interactionTexts[index]
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.ebm-formula {
  padding: 20px;
  transition: all 0.3s ease;
  
  &.scrolled {
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
  }

  .formula-title {
    font-size: 24px;
    color: #fff;
    margin-bottom: 20px;
  }

  .cards-container {
    display: flex;
    gap: 20px;
    
    .card {
      flex: 1;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 20px;
      cursor: pointer;
      transition: all 0.3s ease;

      &.active {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.05);
      }

      .card-content {
        .card-title {
          font-size: 20px;
          color: #fff;
          margin-bottom: 15px;
        }

        .card-icon {
          margin: 15px 0;
          img {
            width: 40px;
            height: 40px;
          }
        }

        .card-text {
          color: #fff;
          font-size: 14px;
          line-height: 1.5;
        }
      }

      .card-footer {
        margin-top: 20px;
        display: flex;
        gap: 10px;
        
        img {
          width: 24px;
          height: 24px;
          cursor: pointer;
          transition: opacity 0.3s;

          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
}
</style> 