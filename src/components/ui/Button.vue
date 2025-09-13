<template>
  <button 
    @click="$emit('click')" 
    :disabled="disabled"
    :class="[
      'button',
      variant === 'landing' ? 'button--landing' : 'button--inner',
      { 'button--disabled': disabled }
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'inner',
    validator: (value) => ['landing', 'inner'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped>
/* Base button styles */
.button {
  padding: 18px 40px;
  font-size: 1.4rem;
  font-weight: 900;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Arial Black', sans-serif;
  position: relative;
  overflow: hidden;
  min-width: 200px;
}

.button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s;
}

.button:hover::before {
  left: 100%;
}

.button:disabled {
  background: linear-gradient(145deg, #666, #555);
  color: #999;
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
}

.button:disabled::before {
  display: none;
}

/* Landing page variant - Fun and energetic */
.button--landing {
  background: linear-gradient(145deg, #ff6b35, #ff8c42);
  color: white;
  box-shadow: 
    0 8px 0px #d63031,
    0 12px 20px rgba(214, 48, 49, 0.4),
    inset 0 2px 0px rgba(255, 255, 255, 0.2);
  animation: pulse 2s infinite;
}

.button--landing:hover {
  background: linear-gradient(145deg, #ff8c42, #ff6b35);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 
    0 12px 0px #d63031,
    0 16px 25px rgba(214, 48, 49, 0.5),
    inset 0 2px 0px rgba(255, 255, 255, 0.3);
}

.button--landing:active {
  transform: translateY(-1px) scale(1.02);
  box-shadow: 
    0 6px 0px #d63031,
    0 8px 15px rgba(214, 48, 49, 0.3),
    inset 0 2px 0px rgba(255, 255, 255, 0.1);
}

/* Inner page variant - Calm and professional */
.button--inner {
  background: linear-gradient(145deg, #4a5568, #2d3748);
  color: #f7fafc;
  box-shadow: 
    0 4px 0px #1a202c,
    0 6px 12px rgba(0, 0, 0, 0.15),
    inset 0 1px 0px rgba(255, 255, 255, 0.1);
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 8px;
  padding: 14px 32px;
  font-size: 1.1rem;
}

.button--inner:hover {
  background: linear-gradient(145deg, #2d3748, #4a5568);
  transform: translateY(-2px);
  box-shadow: 
    0 6px 0px #1a202c,
    0 8px 16px rgba(0, 0, 0, 0.2),
    inset 0 1px 0px rgba(255, 255, 255, 0.15);
}

.button--inner:active {
  transform: translateY(0px);
  box-shadow: 
    0 2px 0px #1a202c,
    0 4px 8px rgba(0, 0, 0, 0.15),
    inset 0 1px 0px rgba(255, 255, 255, 0.1);
}

/* Pulse animation for landing buttons */
@keyframes pulse {
  0% {
    box-shadow: 
      0 8px 0px #d63031,
      0 12px 20px rgba(214, 48, 49, 0.4),
      inset 0 2px 0px rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 
      0 8px 0px #d63031,
      0 12px 20px rgba(214, 48, 49, 0.6),
      inset 0 2px 0px rgba(255, 255, 255, 0.3);
  }
  100% {
    box-shadow: 
      0 8px 0px #d63031,
      0 12px 20px rgba(214, 48, 49, 0.4),
      inset 0 2px 0px rgba(255, 255, 255, 0.2);
  }
}
</style>
