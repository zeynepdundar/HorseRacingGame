<script setup>
import { Motion } from "@motionone/vue"
import { Play, Trophy, Sparkles, Swords, Zap } from "lucide-vue-next"

const emit = defineEmits(["start"])
</script>

<template>
  <section class="hero">
    <!-- Background -->
    <div class="bg-layer">
      <div class="dots top-left"></div>
      <div class="dots bottom-right"></div>

      <!-- Rotating Circle -->
      <Motion :animate="{ rotate: 360 }" :transition="{ duration: 20, repeat: Infinity, easing: 'linear' }"
        class="rotating-circle" />

      <!-- Floating Triangle -->
      <Motion :animate="{ y: [0, -20, 0], rotate: [0, 10, 0] }" :transition="{ duration: 5, repeat: Infinity }"
        class="floating-triangle" />

      <!-- Pulsing Circle -->
      <Motion :animate="{ scale: [1, 1.1, 1] }" :transition="{ duration: 3, repeat: Infinity }" class="pulsing-circle">
        <div class="inner-circle"></div>
      </Motion>
    </div>

    <!-- Content -->
    <Motion :initial="{ opacity: 0, y: 30 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: 0.6 }"
      class="content">
      <!-- Trophy -->
      <Motion :animate="{ y: [0, -10, 0] }" :transition="{ duration: 2, repeat: Infinity, easing: 'ease-in-out' }"
        class="trophy-wrapper">
        <div class="trophy-container">
          <div class="trophy-glow"></div>

          <div class="trophy-box">
            <Trophy :size="48" color="#FFD700" :stroke-width="2.5" />
          </div>
        </div>
      </Motion>


      <h1 class="hero-title">
        <span>Horse</span>
        <span>Racing</span>
      </h1>
      <div class="description">
        <p>
          Get ready for the ultimate race of glory!
        </p>
      </div>

      <!-- Button -->
      <Motion
  :hover="{ scale: 1.05 }"
  :press="{ scale: 0.95 }"
  class="start-btn-wrapper"
  @click="emit('start')"
> 
        <button class="start-btn">
          <Play :size="26" />
          <span>Start the Race!</span>
        </button>
      </Motion>

      <!-- Features -->
      <div class="features">
        <div>
          <Zap :size="20" />
          <span>High Speed</span>
        </div>
        <div>
          <Swords :size="20" />
          <span>Competitive</span>
        </div>
        <div>
          <Sparkles :size="20" />
          <span>Realistic Physics</span>
        </div>
      </div>
    </Motion>

    <div class="bottom-gradient"></div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  background: #FFD700;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: sans-serif;
}

/* Background */

.bg-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hero-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 3.75rem;
  font-weight: 900;
  line-height: 1;
  /* font-black */
  color: black;
  /* text-black */
  text-transform: uppercase;
  /* uppercase */
  font-style: italic;
  /* italic */
  letter-spacing: -0.05em;
  /* tracking-tighter */
  margin-bottom: 1rem;
  /* mb-4 */
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
  /* drop-shadow-sm */
}

/* md:text-9xl (responsive) */
@media (min-width: 768px) {
  .hero-title {
    font-size: 6rem;
    /* text-9xl = 128px */
  }
}


.description {
  margin: 25px 0 50px;
  max-width: 700px;
}

.description p {
  font-size: 1.3rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  margin: 10px 0;
  line-height: 1.6;
}


.dots {
  position: absolute;
  width: 260px;
  height: 260px;
  opacity: 0.2;
  background-image: radial-gradient(circle, black 2px, transparent 2px);
  background-size: 24px 24px;
}

.top-left {
  top: 0;
  left: 0;
}

.bottom-right {
  bottom: 0;
  right: 0;
}

.rotating-circle {
  position: absolute;
  top: 80px;
  right: 10%;
  width: 120px;
  height: 120px;
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
}

.floating-triangle {
  position: absolute;
  bottom: 150px;
  left: 15%;
  width: 0;
  height: 0;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-bottom: 70px solid rgba(0, 0, 0, 0.1);
}

.pulsing-circle {
  position: absolute;
  top: 20%;
  left: 5%;
  width: 90px;
  height: 90px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inner-circle {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
}

/* Content */

.content {
  position: relative;
  text-align: center;
  z-index: 2;
  max-width: 900px;
}

.trophy-wrapper {
  margin-bottom: 30px;
}

.trophy-box {
  background: black;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  display: inline-flex;
}

h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: -2px;
}

.subtitle {
  font-size: 1.4rem;
  margin: 20px 0 50px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.8);
}

/* Button */

.start-btn-wrapper {
  display: inline-block;
  margin-bottom: 60px;
}

.start-btn {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 18px 50px;
  font-size: 1.4rem;
  font-weight: 900;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  background: linear-gradient(45deg, #ff6a00, #ffb300);
  color: black;
  text-transform: uppercase;
  transition: 0.3s;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
}

.start-btn:hover {
  transform: translateY(-3px);
}

/* Features */

.features {
  display: flex;
  gap: 60px;
  justify-content: center;
  opacity: 0.75;
}

.features div {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  gap: 6px;
}

/* Bottom Fade */

.bottom-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent);
}
</style>
