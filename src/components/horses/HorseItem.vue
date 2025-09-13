<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import type { Horse } from '../../types/horse'

interface Props {
  horse?: Horse
  distance?: number
  raceStarted?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  horse: undefined,
  distance: 1000,
  raceStarted: false
})

const emit = defineEmits<{
  horseFinished: [horse: Horse, finishTime: number]
}>()

const currentHorse = ref<Horse | null>(props.horse || null)
const raceProgress = ref(0)
const raceTime = ref(0)
const isFinished = ref(false)
let raceInterval: ReturnType<typeof setInterval> | null = null

// Calculate horse velocity based on condition and random factor
const horseVelocity = computed(() => {
  if (!currentHorse.value) return 8 // Default speed

  const baseSpeed = 8 // m/s
  const conditionBonus = (currentHorse.value.condition || 50) * 0.08 // 0-8 m/s bonus
  const randomFactor = 0.85 + Math.random() * 0.3 // 85-115% random factor

  return (baseSpeed + conditionBonus) * randomFactor
})

// Calculate race duration based on distance and velocity
const raceDuration = computed(() => {
  if (!props.distance || horseVelocity.value <= 0) return 100 // Fallback
  return props.distance / horseVelocity.value
})

// Update race progress
const updateRaceProgress = () => {
  if (!props.raceStarted || isFinished.value) return

  raceTime.value += 0.1
  const progress = Math.min((raceTime.value / raceDuration.value) * 100, 100)
  raceProgress.value = progress
  console.log('Progress:', progress, 'Left:', `${progress}%`) // Debug log
  if (progress >= 100 && !isFinished.value) {
    isFinished.value = true
    raceTime.value = raceDuration.value
    if (raceInterval) {
      clearInterval(raceInterval)
      raceInterval = null
    }
    if (currentHorse.value) {
      emit('horseFinished', currentHorse.value, raceTime.value)
    }
  }
}

// Start/stop race based on raceStarted prop
watch(() => props.raceStarted, (started) => {
  console.log('Race started:', started) // Debug log

  if (started && !isFinished.value) {
    // Reset values
    raceProgress.value = 0
    raceTime.value = 0
    isFinished.value = false

    // Clear any existing interval
    if (raceInterval) {
      clearInterval(raceInterval)
      raceInterval = null
    }

    // Start new interval
    raceInterval = setInterval(updateRaceProgress, 100)
  } else if (!started && raceInterval) {
    // Stop race if raceStarted becomes false
    clearInterval(raceInterval)
    raceInterval = null
  }
})

// Format race time for display
const formattedTime = computed(() => {
  const totalSeconds = isFinished.value ? raceDuration.value : raceTime.value
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = (totalSeconds % 60).toFixed(1)
  return `${minutes}:${seconds.padStart(4, '0')}`
})

// Estimated finish time
const estimatedFinishTime = computed(() => {
  const minutes = Math.floor(raceDuration.value / 60)
  const seconds = (raceDuration.value % 60).toFixed(1)
  return `${minutes}:${seconds.padStart(4, '0')}`
})

// Cleanup on component unmount
onUnmounted(() => {
  if (raceInterval) {
    clearInterval(raceInterval)
    raceInterval = null
  }
})
</script>

<template>
  <div class="horse-runner" :class="{ 'finished': isFinished }">
    <!-- Track container with fixed width -->
    <div class="track-container">
      <!-- Progress bar showing race completion -->
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          :style="{ 
            width: `${raceProgress}%`,
            backgroundColor: currentHorse?.color || '#4caf50'
          }"
        ></div>
      </div>

      <!-- Horse icon that moves with progress -->
      <div 
        class="horse-icon"
        :style="{ 
          left: `${raceProgress}%`,
          backgroundColor: currentHorse?.color || 'gray'
        }"
      >
        🐎
      </div>

      <!-- Finish line -->
      <div class="finish-line"></div>
    </div>

    <!-- Horse information -->
    <div class="horse-info">
      <span class="horse-name">{{ currentHorse?.name }}</span>
      <span class="horse-details">
        <span v-if="isFinished" class="horse-time">{{ formattedTime }}</span>
        <span v-else class="horse-estimated">~{{ estimatedFinishTime }}</span>
        <span class="horse-speed">({{ horseVelocity.toFixed(1) }} m/s)</span>
      </span>
    </div>

    <!-- Finish indicator -->
    <div v-if="isFinished" class="finish-indicator">🏁</div>
  </div>
</template>

<style scoped>
.horse-runner {
  position: relative;
  height: 80px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa;
}

.track-container {
  position: relative;
  width: 70%; /* Fixed width for the track */
  height: 40px;
  margin-right: 20px;
}

.progress-bar {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 12px;
  background: #e0e0e0;
  border-radius: 6px;
  transform: translateY(-50%);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 0.1s ease;
}

.horse-icon {
  position: absolute;
  top: 50%;
  transform: translateX(-50%) translateY(-50%) scaleX(-1);
  font-size: 32px;
  transition: left 0.1s linear;
  z-index: 2;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 3px solid #333;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
}

.finish-line {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 4px;
  background: repeating-linear-gradient(
    to bottom,
    #ff0000 0px,
    #ff0000 5px,
    #ffffff 5px,
    #ffffff 10px
  );
  z-index: 1;
}

.horse-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 1;
}

.horse-name {
  font-weight: bold;
  color: #2c3e50;
  font-size: 16px;
}

.horse-details {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.horse-time {
  font-size: 14px;
  color: #27ae60;
  font-weight: bold;
  background: #e8f5e8;
  padding: 2px 8px;
  border-radius: 12px;
}

.horse-estimated {
  font-size: 13px;
  color: #7f8c8d;
  font-style: italic;
}

.horse-speed {
  font-size: 12px;
  color: #95a5a6;
  background: #ecf0f1;
  padding: 2px 8px;
  border-radius: 10px;
}

.finish-indicator {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  animation: pulse 1s infinite;
  z-index: 3;
}

.finished .horse-icon {
  animation: celebration 0.5s ease-in-out 2;
}

@keyframes pulse {
  0% { opacity: 1; transform: translateY(-50%) scale(1); }
  50% { opacity: 0.7; transform: translateY(-50%) scale(1.1); }
  100% { opacity: 1; transform: translateY(-50%) scale(1); }
}

@keyframes celebration {
  0% { transform: translateX(-50%) translateY(-50%) scaleX(-1) scale(1); }
  50% { transform: translateX(-50%) translateY(-50%) scaleX(-1) scale(1.3); }
  100% { transform: translateX(-50%) translateY(-50%) scaleX(-1) scale(1); }
}

/* Responsive design */
@media (max-width: 768px) {
  .horse-runner {
    height: 100px;
    flex-direction: column;
    align-items: stretch;
  }
  
  .track-container {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }
  
  .horse-info {
    text-align: center;
  }
  
  .horse-details {
    justify-content: center;
  }
}
</style>