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
  padding: 18px 40px;
  font-size: 1.4rem;
  font-weight: 900;
  border: none;
  border-radius: 15px;
  background: linear-gradient(145deg, #ffd700, #ffed4e);
  color: #1a1a1a;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 
    0 8px 0px #b8860b,
    0 12px 20px rgba(0, 0, 0, 0.3),
    inset 0 2px 0px rgba(255, 255, 255, 0.3);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Arial Black', sans-serif;
  position: relative;
  overflow: hidden;
  min-width: 200px;
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s;
}

button:hover {
  background: linear-gradient(145deg, #ffed4e, #ffd700);
  transform: translateY(-3px);
  box-shadow: 
    0 12px 0px #b8860b,
    0 16px 25px rgba(0, 0, 0, 0.4),
    inset 0 2px 0px rgba(255, 255, 255, 0.4);
}

button:hover::before {
  left: 100%;
}

button:active {
  transform: translateY(-1px);
  box-shadow: 
    0 6px 0px #b8860b,
    0 8px 15px rgba(0, 0, 0, 0.3),
    inset 0 2px 0px rgba(255, 255, 255, 0.2);
}

button:disabled {
  background: linear-gradient(145deg, #666, #555);
  color: #999;
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
}

button:disabled::before {
  display: none;
}

/* Special styling for play button */
.play-button {
  background: linear-gradient(145deg, #ff6b35, #ff8c42);
  color: white;
  box-shadow: 
    0 8px 0px #d63031,
    0 12px 20px rgba(214, 48, 49, 0.4),
    inset 0 2px 0px rgba(255, 255, 255, 0.2);
}

.play-button:hover {
  background: linear-gradient(145deg, #ff8c42, #ff6b35);
  box-shadow: 
    0 12px 0px #d63031,
    0 16px 25px rgba(214, 48, 49, 0.5),
    inset 0 2px 0px rgba(255, 255, 255, 0.3);
}

.play-button:active {
  box-shadow: 
    0 6px 0px #d63031,
    0 8px 15px rgba(214, 48, 49, 0.3),
    inset 0 2px 0px rgba(255, 255, 255, 0.1);
}
</style>
