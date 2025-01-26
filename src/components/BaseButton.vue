<template>
  <button
    class="base-button"
    :class="[size, type]"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value: string) => ['small', 'medium', 'large'].includes(value)
  },
  type: {
    type: String,
    default: 'default',
    validator: (value: string) => ['default', 'primary', 'danger'].includes(value)
  }
})

defineEmits(['click'])
</script>

<style lang="scss" scoped>
.base-button {
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  // Sizes
  &.small {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
  }
  
  &.medium {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
  
  &.large {
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  }
  
  // Types
  &.default {
    background-color: #f5f5f5;
    color: $text-color;
    
    &:hover {
      background-color: darken(#f5f5f5, 5%);
    }
  }
  
  &.primary {
    background-color: $primary-color;
    color: white;
    
    &:hover {
      background-color: darken($primary-color, 5%);
    }
  }
  
  &.danger {
    background-color: #f56c6c;
    color: white;
    
    &:hover {
      background-color: darken(#f56c6c, 5%);
    }
  }
}
</style>