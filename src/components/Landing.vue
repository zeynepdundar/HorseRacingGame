<script setup>
import Button from './ui/Button.vue';

const emit = defineEmits(["start"])
</script>

<template>
  <div class="landing">
    <!-- backdrop layer -->
    <div class="overlay">
      <h1>Horse Racing Game</h1>
      <Button @click="emit('start')">Play</Button>
    </div>
  </div>
</template>

<style scoped>
.landing {
  position: relative;
  height: 100vh;
  width: 100%;
  background:
    url('../assets/test.jpg') no-repeat center bottom / 100% auto,
    linear-gradient(to bottom, white 0%, white 60%, #f0f0f0 100%);
  background-color: white;
  background-position: bottom;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.overlay {
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
}

h1 {
  font-family: 'Racing Sans One', cursive;
  font-size: 4rem;
  margin-bottom: 4rem;
  color: #2a623d;
  text-shadow: 2px 2px 0px #f9c74f;
  letter-spacing: 2px;
}



/* Game button styling */
.game-button {
  padding: 18px 50px;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  background: linear-gradient(to bottom, #2a623d, #1e4a2f);
  color: white;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 6px #1a3d26, 0 10px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  font-family: 'Racing Sans One', cursive;
  position: relative;
  overflow: hidden;
}

h1 {
  font-size: 40px;
  margin-bottom: 20px;
  color: #ffd60a;
  margin-bottom: 20px;
  font-size: 2.8rem;
  text-shadow: 0 0 10px rgba(255, 214, 10, 0.5);
  letter-spacing: 2px;
  font-weight: 900;
  position: relative;
  display: inline-block;
}
</style>
