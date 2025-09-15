<template>
  <button
    @click="$emit('click')"
    :disabled="disabled"
    :class="['button', variantClass, { 'is-disabled': disabled }]"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  disabled: { type: Boolean, default: false },
  variant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'start'].includes(value)
  }
})

defineEmits(['click'])

const variantClass = computed(() => `button--${props.variant}`)
</script>

<style scoped>
/* Base button */
.button {
  font-family: 'Poppins', sans-serif;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  user-select: none;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.button:hover:not(.is-disabled) {
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

/* Disabled state */
.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none !important;
  transform: none !important;
}

/* Variants */

/* Primary */
.button--primary {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: #fff;
}

.button--primary:hover:not(.is-disabled) {
  /* same as base hover (scale + translate + shadow) */
}

/* Secondary */
.button--secondary {
  background: linear-gradient(135deg, #FF6B35, #FFD700);
  color: #222;
  transition: all 0.25s ease-in-out;
}

.button--secondary:hover:not(.is-disabled) {
  /* same as base hover (scale + translate + shadow) */
}

/* Start */
.button--start {
  background: linear-gradient(135deg, #FF6B35, #FFD700);
  color: #222;
  box-shadow: 0 5px 15px rgba(255, 193, 7, 0.6);
  transition: all 0.25s ease-in-out;
}

.button--start:hover:not(.is-disabled) {
  transform: scale(1.1) translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.8);
}
</style>
