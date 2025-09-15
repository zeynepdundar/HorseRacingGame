<script setup>
import Button from './ui/Button.vue';

const emit = defineEmits(["start"])
</script>

<template>
  <div class="landing">
    <div class="overlay">
      <div class="game-content">
        <img src="../assets/trophy.png" alt="Trophy" class="title-icon">
        <div class="game-title">
          <h1>Horse Racing</h1>
          <p class="subtitle">Get ready for the ultimate race of glory!</p>
        </div>
        <div class="game-actions">
          <Button class="start-btn" variant="secondary" @click="emit('start')">▶ Start the Race!</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.landing {
  position: relative;
  height: 100vh;
  width: 100vw;
  background:
    url('../assets/landing-bg.png') no-repeat center center / cover,
    linear-gradient(135deg, rgba(255, 235, 59, 0.3), rgba(255, 193, 7, 0.3));
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.overlay {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.1); 
}

.game-content {
  text-align: center;
  max-width: 800px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

.title-icon {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 1rem;
  animation: trophyGlow 2s infinite alternate, trophyBounce 2s infinite ease-in-out;
}

@keyframes trophyGlow {
  0% { filter: drop-shadow(0 0 5px #FFD700); }
  50% { filter: drop-shadow(0 0 20px #FFD700); }
  100% { filter: drop-shadow(0 0 5px #FFD700); }
}
@keyframes trophyBounce {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}

.game-title h1 {
  font-family: 'Bangers', cursive;
  font-size: clamp(3rem, 8vw, 5rem);
  margin: 0;
  color: #222;

  text-shadow:
    2px 2px 0px #fff,
    0 0 15px rgba(255, 215, 0, 0.8); 

  letter-spacing: 3px;
  text-transform: uppercase;
  animation: titlePulse 2.5s ease-in-out infinite;
}

.subtitle {
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  color: #fff;
  text-shadow: 2px 2px 0 #222;
  letter-spacing: 1px;
}

.start-btn {
  font-size: 1.4rem;  
  border: none;
  border-radius: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
}

.start-btn:hover {
  transform: scale(1.1) translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 193, 7, 0.8);
}

@keyframes btnGlow {
  0%, 100% { box-shadow: 0 5px 15px rgba(255, 193, 7, 0.6); }
  50%      { box-shadow: 0 8px 25px rgba(255, 215, 0, 0.9); }
}

.start-btn {
  animation: btnGlow 2s infinite;
}

</style>
