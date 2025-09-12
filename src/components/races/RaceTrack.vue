<template>
  <div class="race-track">
    <h2>Yarış Pistinde - Tur {{ currentRound }} ({{ currentRoundData?.distance }}m)</h2>
    
    <div class="race-info" v-if="raceStarted">
      <div class="race-stats">
        <div class="time-display">
          <strong>Yarış Süresi:</strong> {{ formattedRaceTime }}
        </div>
        <div class="distance-info">
          <strong>Mesafe:</strong> {{ currentRoundData?.distance }}m
        </div>
      </div>
    </div>
    
    <div class="track-container">
      <div class="track">
        <div class="start-line"></div>
        <div class="finish-line"></div>
        
        <div class="horse-lanes">
          <div 
            v-for="(horse, index) in currentRoundData?.selectedHorses || []" 
            :key="horse.id" 
            class="horse-lane"
            :style="{ top: `${index * 65}px` }"
          >
            <HorseItem 
              :horse="horse" 
              :distance="currentRoundData?.distance || 0"
              :race-started="raceStarted"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Horse } from '../../types/horse'
import type { Round } from '../../types/round'

import HorseItem from '../horses/HorseItem.vue'

const props = defineProps<{
  rounds: Round[]
  currentRound: number
  raceStarted?: boolean
}>()

// Yarış süresini takip et
const raceTime = ref(0)

// Mevcut round'un verilerini hesapla
const currentRoundData = computed(() => {
  return props.rounds.find(round => round.id === props.currentRound)
})

// Yarış başladığında süreyi takip et
watch(() => props.raceStarted, (started) => {
  if (started) {
    raceTime.value = 0
    const interval = setInterval(() => {
      raceTime.value += 0.1
    }, 100)
    
    // Component unmount olduğunda interval'i temizle
    return () => clearInterval(interval)
  }
})

// Süreyi formatla
const formattedRaceTime = computed(() => {
  const minutes = Math.floor(raceTime.value / 60)
  const seconds = (raceTime.value % 60).toFixed(1)
  return `${minutes}:${seconds.padStart(4, '0')}`
})
</script>

<style scoped>
.race-track {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.race-track h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

.race-info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #dee2e6;
}

.race-stats {
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
}

.time-display, .distance-info {
  font-size: 16px;
  color: #495057;
}

.track-container {
  background: linear-gradient(to right, #8B4513, #D2691E);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  position: relative;
  min-height: 650px; /* 10 at için yeterli yükseklik */
}

.track {
  position: relative;
  width: 100%;
  height: 100%;
}

.start-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: repeating-linear-gradient(
    to bottom,
    #fff 0px,
    #fff 4px,
    #000 4px,
    #000 8px
  );
  z-index: 1;
}

.finish-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: repeating-linear-gradient(
    to bottom,
    #fff 0px,
    #fff 4px,
    #000 4px,
    #000 8px
  );
  z-index: 1;
}

.horse-lanes {
  position: relative;
  width: 100%;
  height: 100%;
}

.horse-lane {
  position: absolute;
  left: 0;
  right: 0;
  height: 60px;
  border-bottom: 1px solid rgba(255,255,255,0.3);
}

.horse-lane:last-child {
  border-bottom: none;
}

/* Responsive tasarım */
@media (max-width: 768px) {
  .race-track {
    padding: 10px;
  }
  
  .track-container {
    padding: 10px;
    min-height: 500px;
  }
  
  .race-stats {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
  
  .time-display, .distance-info {
    font-size: 14px;
  }
}
</style>