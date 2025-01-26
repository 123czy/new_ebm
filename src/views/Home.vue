<template>
  <div class="home">
    <Header />
    <!-- Header Section -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <h1>{{ $t('home.title') }}</h1>
          <p>{{ $t('home.subtitle') }}</p>
          <el-button type="primary"  class="rank-button">
            {{ $t('home.rankButton') }}
          </el-button>
          <el-button type="primary"  class="register-button">
            {{ $t('home.startButton') }}
          </el-button>
        </div>
      </div>
    </header>

    <MainTable />

    <!-- Features Section -->
    <!-- <section class="features">
      <div class="container">
        <h2>{{ $t('home.featuresTitle') }}</h2>
        <div class="features-grid">
          <div v-for="(feature, index) in features" :key="index" class="feature-card">
            <el-icon :size="40" class="feature-icon">
              <component :is="feature.icon"></component>
            </el-icon>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section> -->

      <EbmIndex />

      <EbmFormula />

      <RankIndex />

      <BackToTop />


    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const features = ref([
  {
    icon: 'DataLine',
    title: '数据分析',
    description: '全面的雇主品牌数据分析'
  },
  {
    icon: 'TrendCharts',
    title: '市场洞察',
    description: '深入的市场趋势洞察'
  },
  {
    icon: 'Share',
    title: '竞争对标',
    description: '精准的竞争对手分析'
  }
])

</script>

<style lang="scss" scoped>
.home {
  background-color: $background-color;
  .header {
    
    padding: 80px 0;
    
    &-content {
      text-align: center;
      
      h1 {
        font-size: $font-size-xxl;
        color: $text-primary;
        margin-bottom: 20px;
      }
      
      p {
        font-size: $font-size-lg;
        color: $text-secondary;
        margin-bottom: 30px;
      }
    }
  }


  .rank-button {
    box-sizing: border-box;
    line-height: 1.6;
    font-size: 16px;
    min-width: 215px;
    padding: 25px 10px;
    border-radius: 30px;
    border: 2px solid $white;
    color: $white;
    background-color: transparent;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: color 0.5s ease;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background-color: $white;
      transition: left 0.5s ease;
      z-index: -1;
    }

    &:hover {
      color: $background-color;

      &::before {
        left: 0;
      }
    }
  }

  .register-button {
    margin-left: 30px;
    line-height: 1.6;
    font-size: 16px;
    min-width: 215px;
    padding: 25px 10px;
    border-radius: 30px;
    color: $white;
    border-color: $button-register-color;
    background-color: $button-register-color;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: color 0.5s ease;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background-color: $white;
      transition: left 0.5s ease;
      z-index: -1;
    }

    &:hover {
      color: $button-register-color;

      &::before {
        left: 0;
      }
    }
  }

  .features {
    padding: 80px 0;
    
    h2 {
      text-align: center;
      margin-bottom: 60px;
      font-size: $font-size-xl;
      color: $text-primary;
    }

    &-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 30px;
      
      @include responsive(md) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .feature-card {
      text-align: center;
      padding: 30px;
      background: $white;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      
      .feature-icon {
        color: $primary-color;
        margin-bottom: 20px;
      }
      
      h3 {
        font-size: $font-size-lg;
        margin-bottom: 15px;
        color: $text-primary;
      }
      
      p {
        color: $text-secondary;
      }
    }
  }

  .statistics {
    background-color: $primary-color;
    padding: 60px 0;
    
    &-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 30px;
      
      @include responsive(md) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .stat-card {
      text-align: center;
      color: $white;
      
      h3 {
        font-size: $font-size-xxl;
        margin-bottom: 10px;
      }
      
      p {
        font-size: $font-size-lg;
      }
    }
  }
}

.container {
  @include container;
}
</style>