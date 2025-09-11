<template>
  <button @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup>
defineEmits(['click'])
</script>

<style scoped>
button {
  background-color: #646cff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.25s;
}

button:hover {
  background-color: #535bf2;
}

button:focus,
button:focus-visible {
  outline: 2px solid #646cff;
  outline-offset: 2px;
}
</style> 