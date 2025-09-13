<template>
  <button
    @click="$emit('click')"
    :disabled="disabled"
    :class="['button', `button--${variant}`, { 'is-disabled': disabled }]"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'inner',
    validator: (value) => ['landing', 'inner', 'danger', 'success'].includes(value)
  },
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
}

.button:hover:not(.is-disabled) {
  transform: scale(1.05);
}

/* Disabled */
.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none !important;
  transform: none !important;
}

/* Variants */
.button--inner {
  background: linear-gradient(135deg, #ff512f 0%, #dd2476 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.button--inner:hover:not(.is-disabled) {
  box-shadow: 0 6px 18px rgba(221, 36, 118, 0.5);
}

.button--landing {
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
}

.button--landing:hover:not(.is-disabled) {
  box-shadow: 0 6px 18px rgba(46, 204, 113, 0.5);
}

/* Optional extra variants */
.button--danger {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: #fff;
}

.button--success {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: #fff;
}
</style>
