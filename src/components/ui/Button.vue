<template>
  <button
    @click="$emit('click')"
    :disabled="disabled"
    :class="['button', { 'is-disabled': disabled }]"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped>
/* Base */
.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  user-select: none;
  
  background: linear-gradient(135deg, #ff512f 0%, #dd2476 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.button:hover:not(.is-disabled) {
  transform: scale(1.05);
  box-shadow: 0 6px 18px rgba(221, 36, 118, 0.5);
}

/* Disabled */
.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none !important;
  transform: none !important;
}
</style>
