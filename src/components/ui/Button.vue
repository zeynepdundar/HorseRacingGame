<template>
  <button @click="$emit('click')" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup>
defineEmits(['click'])
</script>

<style scoped>
button {
  padding: 14px 32px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  background: #ffd60a; /* bright arcade yellow */
  color: #222;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px #b89b00;
  transition: all 0.15s ease;
}

button:hover {
  background: #ffcc00;
  transform: translateY(-2px);
  box-shadow: 0 6px #a07f00;
}

button:active {
  transform: translateY(2px);
  box-shadow: 0 2px #7a6000;
}

button:disabled {
  background: #aaa;
  color: #666;
  box-shadow: none;
  cursor: not-allowed;
}
</style>
