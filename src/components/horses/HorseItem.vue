<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { Horse } from '../../types/horse'

interface Props {
  horse?: Horse
  distance?: number // Koşu mesafesi (metre)
  raceStarted?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  horse: undefined,
  distance: 1000, // 1000 metre varsayılan mesafe
  raceStarted: false
})

const currentHorse = ref<Horse | null>(null)
const raceProgress = ref(0) // 0-100 arası ilerleme yüzdesi
const raceTime = ref(0) // Geçen süre (saniye)
const isFinished = ref(false)

// Seçili atı ayarla
onMounted(() => {
  currentHorse.value = props.horse || null
})

// Atın hızını hesapla (condition'a göre değişken hız)
const horseVelocity = computed(() => {
  if (!currentHorse.value) return 10
  
  // Condition 0-100 arası, daha yüksek condition = daha hızlı
  const baseSpeed = 8 // Temel hız (m/s)
  const conditionBonus = (currentHorse.value.condition || 0) * 0.05 // Condition bonusu
  const randomFactor = 0.8 + Math.random() * 0.4 // %80-120 arası rastgele faktör
  
  return baseSpeed + conditionBonus * randomFactor
})

// Koşu süresini hesapla
const raceDuration = computed(() => {
  return props.distance / horseVelocity.value
})

// Koşu ilerlemesini güncelle
const updateRaceProgress = () => {
  if (!props.raceStarted || isFinished.value) return
  
  raceTime.value += 0.1 // Her 100ms'de bir güncelle
  
  const progress = (raceTime.value / raceDuration.value) * 100
  
  if (progress >= 100) {
    raceProgress.value = 100
    isFinished.value = true
    raceTime.value = raceDuration.value
  } else {
    raceProgress.value = progress
  }
}

// Koşu başladığında animasyonu başlat
watch(() => props.raceStarted, (started) => {
  if (started) {
    raceProgress.value = 0
    raceTime.value = 0
    isFinished.value = false
    
    const interval = setInterval(() => {
      updateRaceProgress()
      if (isFinished.value) {
        clearInterval(interval)
      }
    }, 100) // Her 100ms'de bir güncelle
  }
})

// Koşu süresini formatla
const formattedTime = computed(() => {
  const minutes = Math.floor(raceTime.value / 60)
  const seconds = (raceTime.value % 60).toFixed(1)
  return `${minutes}:${seconds.padStart(4, '0')}`
})

// Tahmini varış süresi
const estimatedFinishTime = computed(() => {
  const minutes = Math.floor(raceDuration.value / 60)
  const seconds = (raceDuration.value % 60).toFixed(1)
  return `${minutes}:${seconds.padStart(4, '0')}`
})
</script>

<template>
  <div class="horse-runner" :class="{ 'finished': isFinished }">
    <div 
      class="horse-icon"
      :style="{ 
        left: `${raceProgress}%`,
        backgroundColor: currentHorse?.color || 'gray'
      }"
    >
      🐎
    </div>
    <div class="horse-name">{{ currentHorse?.name }}</div>
    <div v-if="isFinished" class="finish-indicator">🏁</div>
  </div>
</template>

<style scoped>
.horse-runner {
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  border-bottom: 1px solid #ddd;
}

.horse-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) scaleX(-1);
  font-size: 28px;
  transition: left 0.1s linear;
  z-index: 2;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 3px solid #333;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.horse-name {
  position: absolute;
  left: 50px;
  font-weight: bold;
  color: #333;
  font-size: 14px;
  z-index: 1;
}

.finish-indicator {
  position: absolute;
  right: 10px;
  font-size: 20px;
  animation: pulse 1s infinite;
}

.finished .horse-icon {
  animation: celebration 0.5s ease-in-out;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}

@keyframes celebration {
  0% { transform: translateY(-50%) scaleX(-1) scale(1); }
  50% { transform: translateY(-50%) scaleX(-1) scale(1.2); }
  100% { transform: translateY(-50%) scaleX(-1) scale(1); }
}
</style>