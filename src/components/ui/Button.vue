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
  font-family: 'Segoe UI', sans-serif;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 1.8rem;
  font-size: 0.95rem;
  font-weight: 800;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.25s ease;
  user-select: none;
  color: #fff;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.18);
}

.button:hover:not(.is-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.22);
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
  background: linear-gradient(135deg, #9d9720, #bbaf20 58%, #e5dd76);
  color: #2d3414;
  border-color: rgba(59, 82, 144, 0.14);
}

.button--secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.24);
}

/* Start */
.button--start {
  background: linear-gradient(135deg, #9d9720, #bbaf20 58%, #e5dd76);
  color: #2d3414;
  border-color: rgba(59, 82, 144, 0.14);
  box-shadow: 0 14px 28px rgba(114, 110, 28, 0.24);
}

.button--start:hover:not(.is-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 18px 32px rgba(114, 110, 28, 0.28);
}
</style>
