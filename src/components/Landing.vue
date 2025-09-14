<script setup>
import Button from './ui/Button.vue';

const emit = defineEmits(["start"])
</script>

<template>
  <div class="landing">
    <div class="overlay">
      <div class="game-content">
        <div class="game-title">
          <h1>Horse Racing</h1>
          <p class="subtitle">Get ready for the ultimate race of glory!</p>
        </div>
        <div class="game-actions">
          <Button class="start-btn" @click="emit('start')">▶ Start the Race!</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing {
  position: relative;
  height: 100vh;
  width: 100%;
  background:
    url('../assets/gettyimages-165931562-612x612.jpg') no-repeat center center / cover,
    linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.landing::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(0,0,0,0.3), rgba(0,0,0,0.7));
  z-index: 1;
}

.overlay {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.game-content {
  text-align: center;
  max-width: 800px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.game-title h1 {
  font-family: 'Press Start 2P', cursive, sans-serif;
  font-size: clamp(2.5rem, 6vw, 5rem);
  margin: 0;
  color: #ffd700;
  text-shadow: 3px 3px 0px #ff6b35,
               6px 6px 0px rgba(0, 0, 0, 0.5),
               0 0 25px rgba(255, 215, 0, 0.7);
  letter-spacing: 3px;
  animation: titleGlow 2s ease-in-out infinite alternate;
}

.subtitle {
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  color: #fff;
  font-weight: bold;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
  animation: fadeIn 2s ease-in-out infinite alternate;
}

.start-btn {
  font-size: 1.5rem;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #ff6b35, #ffd700);
  border-radius: 12px;
  color: #222;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: buttonPulse 1.5s infinite;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
}

.start-btn:hover {
  transform: scale(1.1) rotate(-2deg);
  box-shadow: 0 0 30px rgba(255, 107, 53, 0.9);
}


/* Animations */
@keyframes titleGlow {
  from { text-shadow: 3px 3px 0px #ff6b35, 0 0 20px #ffd700; }
  to   { text-shadow: 3px 3px 0px #ff6b35, 0 0 40px #ffd700, 0 0 60px #ff6b35; }
}

@keyframes buttonPulse {
  0%, 100% { transform: scale(1.05); }
  50%      { transform: scale(1.15); }
}



@keyframes fadeIn {
  from { opacity: 0.7; }
  to   { opacity: 1; }
}

/* Mobile tweaks */
@media (max-width: 768px) {
  .game-content { gap: 2rem; }
  .game-title h1 { font-size: clamp(2rem, 7vw, 4rem); }
  .subtitle { font-size: 1rem; }
  .start-btn { font-size: 1.2rem; padding: 0.8rem 2rem; }
}
</style>
