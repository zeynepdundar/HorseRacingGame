<script setup>
import Button from './ui/Button.vue';

const emit = defineEmits(["start"])
</script>

<template>
  <div class="landing">
    <!-- backdrop layer -->
    <div class="overlay">
      <div class="game-content">
        <div class="game-title">
          <h1>Horse Racing Game</h1>
          <p class="subtitle">Experience the thrill of the track!</p>
        </div>
        <div class="game-actions">
          <Button @click="emit('start')" variant="landing">Start Race</Button>
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
    url('../assets/landing-bg.jpg') no-repeat center center / cover,
    linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.landing::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
  z-index: 1;
}

.overlay {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  z-index: 2;
}

.game-content {
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.game-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

h1 {
  font-family: 'Arial Black', sans-serif;
  font-size: clamp(3rem, 8vw, 6rem);
  margin: 0;
  color: #ffd700;
  text-shadow: 
    3px 3px 0px #ff6b35,
    6px 6px 0px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(255, 215, 0, 0.5);
  letter-spacing: 3px;
  font-weight: 900;
  text-transform: uppercase;
  animation: titleGlow 2s ease-in-out infinite alternate;
}

.subtitle {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-weight: 300;
  letter-spacing: 1px;
  margin: 0;
  opacity: 0.9;
}

.game-actions {
  display: flex;
  justify-content: center;
  align-items: center;
}

.play-button {
  transform: scale(1.1);
  animation: buttonPulse 2s ease-in-out infinite;
}

@keyframes titleGlow {
  from {
    text-shadow: 
      3px 3px 0px #ff6b35,
      6px 6px 0px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(255, 215, 0, 0.5);
  }
  to {
    text-shadow: 
      3px 3px 0px #ff6b35,
      6px 6px 0px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(255, 215, 0, 0.8),
      0 0 40px rgba(255, 107, 53, 0.3);
  }
}

@keyframes buttonPulse {
  0%, 100% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.15);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .game-content {
    gap: 2rem;
    padding: 0 1rem;
  }
  
  h1 {
    letter-spacing: 2px;
  }
  
  .subtitle {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .game-content {
    gap: 1.5rem;
  }
  
  h1 {
    letter-spacing: 1px;
  }
  
  .play-button {
    transform: scale(1);
    animation: none;
  }
}
</style>
