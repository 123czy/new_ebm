<template>
  <section class="ebm-index" id="ebm-index">
    <div class="container">
      <div class="index-grid ">
        <div v-for="(item, index) in ebmIndexItems" :key="index" class="index-card l-cell-l-7 l-cell-m-8 l-cell-s-10 l-cell-x-12">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

interface EbmIndexItem {
  title: string
  description: string
}

const { tm } = useI18n()  // 添加 tm (translateMessage) 方法
const ebmIndexItems = computed<EbmIndexItem[]>(() => {
  // 使用 tm() 而不是 t() 来获取嵌套的消息对象
  return tm('ebmindex.list') || []
})

// 用于调试
console.log('ebmIndexItems:', ebmIndexItems.value)
</script>

<style lang="scss" scoped>
.ebm-index {
  padding: 80px 0;
  background: $background-color;

  .index-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 40px;

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  .index-card {
    h3 {
      font-size: 24px;
      margin-bottom: 16px;
      color: $white;
      font-weight: 800;
     
    }

    p {
      color: $white;
      line-height: 1.6;
    }

    &:first-child {
      h3 {
        font-size: 48px;
        line-height: 1.4;
      }
    }
  }
}
</style>