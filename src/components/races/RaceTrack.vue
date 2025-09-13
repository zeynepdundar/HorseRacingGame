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
          <div v-for="(horse, index) in currentRoundData?.selectedHorses || []" :key="horse.id" class="horse-lane"
            :style="{ top: `${index * 65}px` }">
            <HorseItem :horse="horse" :distance="currentRoundData?.distance || 0" :race-started="raceStarted" />
          </div>
        </div>
      </div>
    </div>

    <div class="next-round-container" v-if="raceStarted && hasNextRound">
      <Button @click="handleNextRound" class="next-round-btn">
        Sonraki Turu Başlat
      </Button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import type { Round } from '../../types/round'
import HorseItem from '../horses/HorseItem.vue'
import Button from '../ui/Button.vue'

const props = defineProps<{
  rounds: Round[]
  currentRound: number
  raceStarted?: boolean
}>()

const store = useStore()


// Yarış süresini takip et
const raceTime = ref(0)

// Mevcut round'un verilerini hesapla
const currentRoundData = computed(() => {
  return props.rounds.find(round => round.id === props.currentRound)
})

// Sonraki tur var mı kontrol et
const hasNextRound = computed(() => {
  return props.currentRound < props.rounds.length
})

// Sonraki turu başlat
const handleNextRound = () => {
  store.dispatch('race/nextRound')
}

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

.time-display,
.distance-info {
  font-size: 16px;
  color: #495057;
}

.track-container {
  width: 100%;
  height: 400px;
  background-image: url('/images/racing-track.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center
}

.track {
  position: relative;
  width: 100%;
  height: 100%;
}

.start-line,
.finish-line {
  position: absolute;
  top: 0;
  bottom: 0;
  /* This will now work because .track has height */
  width: 6px;
  background: repeating-linear-gradient(to bottom,
      #fff 0px,
      #fff 6px,
      #000 6px,
      #000 12px);
  z-index: 10;
}

.start-line {
  left: 0;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.3);
}

.finish-line {
  right: 0;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.3);
}

.horse-lanes {
  position: relative;
  width: 100%;
  height: 100%;
  /* Take full height of track */
}

.horse-lane {
  position: absolute;
  left: 0;
  right: 0;
  height: 60px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.next-round-btn:hover {
  background-color: #218838;
}
</style>