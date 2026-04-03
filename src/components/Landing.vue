<script setup>
import { Motion } from "@motionone/vue"
import {
  Flag,
  Play,
  Sparkles,
  Swords,
  Zap
} from "lucide-vue-next"

const emit = defineEmits(["start"])

const features = [
  { icon: Zap, title: "High Speed", description: "Lightning-fast races" },
  { icon: Swords, title: "Competitive", description: "Challenge rivals" },
  { icon: Sparkles, title: "Realistic Physics", description: "True-to-life movement" }
]
const backgroundImage =
  "url(https://images.unsplash.com/photo-1675866949369-9a5dbbdd1884?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3JzZSUyMHJhY2luZyUyMHRyYWNrJTIwZmluaXNoJTIwbGluZXxlbnwxfHx8fDE3NzUyMzEzODV8MA&ixlib=rb-4.1.0&q=80&w=1080)"
</script>

<template>
  <section class="landing-page">
    <div class="landing-page__background">
      <div class="landing-page__background-image" :style="{ backgroundImage }"></div>
      <div class="landing-page__background-tint"></div>
      <div class="landing-page__background-glow"></div>
      <div class="landing-page__background-grid"></div>
      <div class="landing-page__rail landing-page__rail--top"></div>
      <div class="landing-page__rail landing-page__rail--bottom"></div>
    </div>

    <Motion
      class="landing-page__content"
      :initial="{ opacity: 0, y: 28 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.7 }"
    >
      <div class="landing-page__panel-shell">
        <div class="landing-page__panel">
          <div class="landing-page__frame"></div>
          <div class="landing-page__spark landing-page__spark--one"></div>
          <div class="landing-page__spark landing-page__spark--two"></div>

          <Motion
            class="landing-page__badge"
            :initial="{ scale: 0.9, opacity: 0 }"
            :animate="{ scale: 1, opacity: 1 }"
            :transition="{ delay: 0.3, duration: 0.4 }"
          >
            <Flag :size="14" />
            <span>Mini Game</span>
          </Motion>

          <Motion
            class="landing-page__title"
            :initial="{ y: 20, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :transition="{ delay: 0.4, duration: 0.6 }"
          >
            <span>Horse</span>
            <span>Racing</span>
          </Motion>

          <Motion
            class="landing-page__lead"
            :initial="{ y: 20, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :transition="{ delay: 0.5, duration: 0.6 }"
          >
            Get ready for the ultimate race of glory! Experience heart-pounding action,
            compete with the best, and claim your victory!
          </Motion>


          <Motion
            class="landing-page__features"
            :initial="{ y: 20, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :transition="{ delay: 0.8, duration: 0.6 }"
            aria-label="Game features"
          >
            <div
              v-for="(feature, index) in features"
              :key="feature.title"
              class="landing-page__info-card"
            >
              <div class="landing-page__info-icon">
                <component :is="feature.icon" :size="20" />
              </div>
              <div class="landing-page__info-copy">
                <div class="landing-page__info-value landing-page__info-value--feature">
                  {{ feature.title }}
                </div>
                <div class="landing-page__info-label">{{ feature.description }}</div>
              </div>
            </div>
          </Motion>

          <Motion
            class="landing-page__cta-wrap"
            :initial="{ scale: 0.9, opacity: 0 }"
            :animate="{ scale: 1, opacity: 1 }"
            :transition="{ delay: 1.1, duration: 0.5 }"
            :hover="{
              scale: 1.03,
              filter: 'brightness(1.05)',
              boxShadow: '0 26px 52px rgba(114, 110, 28, 0.28)'
            }"
            :press="{ scale: 0.97 }"
            @click="emit('start')"
          >
            <button class="landing-page__cta">
              <Play :size="22" />
              <span>Start the Race!</span>
            </button>
          </Motion>

          <Motion
            class="landing-page__footnote"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :transition="{ delay: 1.3, duration: 0.6 }"
          >
            No download required • Play instantly in browser
          </Motion>
        </div>
      </div>
    </Motion>
  </section>
</template>

<style scoped>
.landing-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
  background: linear-gradient(180deg, #1f3044 0%, #223852 34%, #bb7428 100%);
}

.landing-page__background,
.landing-page__background-image,
.landing-page__background-tint,
.landing-page__background-glow,
.landing-page__background-grid,
.landing-page__rail {
  position: absolute;
}

.landing-page__background {
  inset: 0;
  overflow: hidden;
}

.landing-page__background-image {
  inset: 0;
  background-position: center;
  background-size: cover;
  transform: scale(1.05);
  filter: saturate(1.06) contrast(1.04);
}

.landing-page__background-tint {
  inset: 0;
  background:
    linear-gradient(90deg, rgba(14, 24, 38, 0.12) 0%, rgba(16, 28, 43, 0.16) 28%, rgba(15, 24, 37, 0.48) 100%),
    linear-gradient(180deg, rgba(255, 216, 123, 0.12), rgba(11, 17, 29, 0.24));
}

.landing-page__background-glow {
  inset: 0;
  background: radial-gradient(circle at top, rgba(255, 225, 126, 0.55) 0%, transparent 26%);
}

.landing-page__background-grid {
  inset: 0;
  opacity: 0.12;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 64px 64px;
}

.landing-page__rail {
  left: 28px;
  right: 28px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 211, 102, 0.45), transparent);
}

.landing-page__rail--top {
  top: 28px;
}

.landing-page__rail--bottom {
  bottom: 28px;
}

.landing-page__content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1360px;
}

.landing-page__panel-shell {
  display: flex;
  justify-content: center;
}

.landing-page__panel {
  position: relative;
  width: 100%;
  max-width: 980px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 56px 48px;
  border-radius: 38px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: linear-gradient(
    180deg,
    rgba(15, 25, 45, 0.65),
    rgba(25, 35, 55, 0.6),
    rgba(35, 45, 65, 0.65)
  );
  box-shadow:
    0 22px 48px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.landing-page__frame {
  position: absolute;
  inset: 18px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  pointer-events: none;
}

.landing-page__spark {
  position: absolute;
  border-radius: 999px;
  opacity: 0.5;
  pointer-events: none;
}

.landing-page__spark--one {
  top: -12px;
  right: 18px;
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, rgba(187, 116, 40, 0.4), transparent 68%);
}

.landing-page__spark--two {
  bottom: -8px;
  left: -22px;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(255, 220, 100, 0.5), transparent 70%);
}

.landing-page__badge {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
  padding: 0 14px;
  margin-bottom: 20px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.landing-page__title {
  position: relative;
  z-index: 1;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.02em;
  color: #fff;
  font-size: clamp(3rem, 8vw, 5.6rem);
  line-height: 0.88;
  font-style: italic;
  font-weight: 900;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  text-shadow: 0 8px 24px rgba(187, 116, 40, 0.8), 0 0 40px rgba(255, 220, 100, 0.4);
}

.landing-page__lead {
  position: relative;
  z-index: 1;
  max-width: 520px;
  margin: 16px 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.7;
}

.landing-page__features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 32px;
}

.landing-page__info-card {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 140px;
  padding: 12px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.landing-page__info-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(187, 116, 40, 0.4), rgba(157, 151, 32, 0.3));
  color: #ffd966;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.landing-page__info-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.landing-page__info-value {
  color: #fff;
  font-size: 1rem;
  font-weight: 900;
}

.landing-page__info-value--feature {
  font-size: 0.84rem;
  line-height: 1.2;
}

.landing-page__info-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.7rem;
  font-weight: 600;
}

.landing-page__cta-wrap {
  position: relative;
  z-index: 1;
  display: inline-block;
}

.landing-page__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-width: 260px;
  padding: 16px 32px;
  border: 1px solid rgba(59, 82, 144, 0.14);
  border-radius: 999px;
  background: linear-gradient(135deg, #9d9720, #bbaf20 58%, #e5dd76);
  color: #2d3414;
  font-size: 1rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  box-shadow: 0 20px 44px rgba(255, 153, 36, 0.24);
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
}

.landing-page__cta:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
  box-shadow: 0 26px 52px rgba(114, 110, 28, 0.28);
}

.landing-page__footnote {
  position: relative;
  z-index: 1;
  margin-top: 24px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
}

@media (max-width: 920px) {
  .landing-page {
    padding: 18px;
  }
}

@media (max-width: 640px) {
  .landing-page {
    padding: 14px;
  }

  .landing-page__panel {
    padding: 36px 22px;
  }

  .landing-page__stats,
  .landing-page__features {
    flex-direction: column;
    align-items: stretch;
  }

  .landing-page__info-card {
    min-width: 0;
  }

  .landing-page__cta {
    width: 100%;
    min-width: 0;
  }

  .landing-page__rail {
    left: 14px;
    right: 14px;
  }
}
</style>
