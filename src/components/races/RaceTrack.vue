<template>
  <div class="race-track">
    <div class="round-header">
      <h2>{{ getOrdinalNumber(currentRound) }} Lap ({{ currentRoundData?.distance }}m)</h2>
      <Button  
        class="start-round-btn" 
        :disabled="raceStarted && !isRaceComplete" 
        @click="raceStarted ? nextRound() : startRace()"
      >
        {{ raceStarted ? '▶ Next Round' : '▶ Start Round' }}
      </Button>
    </div>


    <!--   <div class="race-info" v-if="raceStarted">s
      <div class="race-stats">
        <div class="time-display">
          <strong>Yarış Süresi:</strong> {{ formattedRaceTime }}
        </div>
        <div class="distance-info">
          <strong>Mesafe:</strong> {{ currentRoundData?.distance }}m
        </div>
        <div class="horses-finished">
          <strong>Biten Atlar:</strong> {{ finishedHorses.length }}/{{ currentRoundData?.selectedHorses?.length || 0 }}
        </div>
      </div>
    </div>

    <!-- Race Results Table -->
    <div v-if="raceStarted && finishedHorses.length > 0" class="race-results">
      <h3>Yarış Sonuçları</h3>
      <div class="results-table">
        <div class="result-header">
          <span>Sıra</span>
          <span>At Adı</span>
          <span>Süre</span>
          <span>Hız</span>
        </div>
        <div v-for="(horse, index) in finishedHorses" :key="horse.id" class="result-row"
          :class="{ 'podium': index < 3 }">
          <span class="position">{{ index + 1 }}</span>
          <span class="horse-name">{{ horse.name }}</span>
          <span class="finish-time">{{ horse.finishTime }}</span>
          <span class="speed">{{ horse.speed }} m/s</span>
        </div>
      </div>
    </div>

    <div class="track-container">
      <div class="track">
        <div class="start-line"></div>
        <div class="finish-line"></div>

        <div class="horse-lanes">
          <div v-for="(horse, index) in currentRoundData?.selectedHorses || []" :key="horse.id" class="horse-lane"
            :style="{ top: `${(index * 50) + 20}px` }">
            <div class="horse" :class="{
              'running': raceStarted && !isHorseFinished(horse.id),
              'finished': isHorseFinished(horse.id),
              'facing-right': true
            }" :style="{
                  left: `${getHorsePosition(horse.id)}%`,
                  animationDelay: `${index * 0.1}s`
                }">
              <div class="horse-icon" :style="{
                color: horse.color || getDefaultHorseColor(horse.id),
                filter: `drop-shadow(2px 2px 4px rgba(0,0,0,0.3))`
              }">🐎</div>
              <div class="horse-name" :style="{
                backgroundColor: horse.color || getDefaultHorseColor(horse.id),
                color: getContrastColor(horse.color || getDefaultHorseColor(horse.id))
              }">{{ horse.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div v-if="isRaceComplete" class="race-complete">
      <h3>🎉 Yarış Tamamlandı!</h3>
      <p>Tüm turlar başarıyla tamamlandı.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import type { Round } from '../../types/round'
import type { Horse } from '../../types/horse'

const props = defineProps<{
  rounds: Round[]
  currentRound: number
  raceStarted?: boolean
}>()

const store = useStore()
function getOrdinalNumber(num: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const value = num % 100
  const suffix = suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]
  return num + suffix
}
// Race timing
const raceTime = ref(0)
const raceInterval = ref<ReturnType<typeof setInterval> | null>(null)

// Horse positions and animation
const horsePositions = ref<Record<number, number>>({})
const horseSpeeds = ref<Record<number, number>>({})
const horseFinishTimes = ref<Record<number, number>>({})

// Default horse colors - expanded for 10 horses
const defaultHorseColors = [
  '#8B4513', // Saddle Brown
  '#A0522D', // Sienna
  '#D2691E', // Chocolate
  '#CD853F', // Peru
  '#DEB887', // Burlywood
  '#F4A460', // Sandy Brown
  '#D2B48C', // Tan
  '#BC8F8F', // Rosy Brown
  '#A0522D', // Sienna
  '#8B4513', // Saddle Brown
  '#654321', // Dark Brown
  '#8B7355', // Light Brown
  '#A0522D', // Sienna
  '#D2691E', // Chocolate
  '#CD853F'  // Peru
]

// Finished horses tracking
const finishedHorses = ref<Array<{
  id: number
  name: string
  finishTime: string
  speed: number
  position: number
}>>([])

// Current round data
const currentRoundData = computed(() => {
  return props.rounds.find(round => round.id === props.currentRound)
})

// Check if next round exists
const hasNextRound = computed(() => {
  return props.currentRound < props.rounds.length
})

// Check if horse has finished
const isHorseFinished = (horseId: number) => {
  return finishedHorses.value.some(horse => horse.id === horseId)
}

// Get horse position for animation
const getHorsePosition = (horseId: number) => {
  if (isHorseFinished(horseId)) {
    return 95 // Position at finish line
  }
  return horsePositions.value[horseId] || 0
}

// Get default color for horse
const getDefaultHorseColor = (horseId: number) => {
  return defaultHorseColors[horseId % defaultHorseColors.length]
}

// Get contrast color for text
const getContrastColor = (backgroundColor: string) => {
  // Convert hex to RGB
  const hex = backgroundColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

// Check if all horses have finished
const allHorsesFinished = computed(() => {
  const totalHorses = currentRoundData.value?.selectedHorses?.length || 0
  return finishedHorses.value.length === totalHorses && totalHorses > 0
})

// Check if race is complete (all rounds finished)
const isRaceComplete = computed(() => {
  return props.currentRound >= props.rounds.length
})

// Format race time
const formattedRaceTime = computed(() => {
  const minutes = Math.floor(raceTime.value / 60)
  const seconds = (raceTime.value % 60).toFixed(1)
  return `${minutes}:${seconds.padStart(4, '0')}`
})

// Initialize horse data
const initializeHorses = () => {
  if (currentRoundData.value?.selectedHorses) {
    currentRoundData.value.selectedHorses.forEach(horse => {
      horsePositions.value[horse.id] = 0
      // Random speed between 0.5 and 1.5 for variety
      horseSpeeds.value[horse.id] = 0.5 + Math.random() * 1.0
    })
  }
}

// Update horse positions during race
const updateHorsePositions = () => {
  if (!props.raceStarted) return

  currentRoundData.value?.selectedHorses?.forEach(horse => {
    if (!isHorseFinished(horse.id)) {
      const currentPosition = horsePositions.value[horse.id] || 0
      const speed = horseSpeeds.value[horse.id] || 1

      // Update position (speed is in percentage per second)
      const newPosition = currentPosition + (speed * 0.1)

      if (newPosition >= 95) {
        // Horse finished
        horsePositions.value[horse.id] = 95
        handleHorseFinished(horse, raceTime.value)
      } else {
        horsePositions.value[horse.id] = newPosition
      }
    }
  })
}

// Start race
const startRace = () => {
  if (currentRoundData.value?.id === 1) {
    store.dispatch('race/startRace')
  } else {
    store.dispatch('race/nextRound')
  }
  store.dispatch('race/startRace')
}

// Handle horse finishing
const handleHorseFinished = (horse: Horse, finishTime: number) => {
  const formattedTime = formatTime(finishTime)
  const speed = (currentRoundData.value?.distance || 0) / finishTime

  finishedHorses.value.push({
    id: horse.id,
    name: horse.name,
    finishTime: formattedTime,
    speed: parseFloat(speed.toFixed(2)),
    position: finishedHorses.value.length + 1
  })

  // Sort by finish time
  finishedHorses.value.sort((a, b) => {
    const timeA = parseTime(a.finishTime)
    const timeB = parseTime(b.finishTime)
    return timeA - timeB
  })

  // Update positions
  finishedHorses.value.forEach((horse, index) => {
    horse.position = index + 1
  })
}

// Format time helper
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const secs = (seconds % 60).toFixed(1)
  return `${minutes}:${secs.padStart(4, '0')}`
}

// Parse time helper
const parseTime = (timeStr: string): number => {
  const [minutes, seconds] = timeStr.split(':').map(Number)
  return minutes * 60 + seconds
}

// Next round handler
const nextRound = () => {
  // Reset for next round
  finishedHorses.value = []
  raceTime.value = 0
  horsePositions.value = {}
  horseSpeeds.value = {}
  horseFinishTimes.value = {}
  initializeHorses()
  store.dispatch('race/nextRound')
}

// Reset race
const resetRace = () => {
  finishedHorses.value = []
  raceTime.value = 0
  horsePositions.value = {}
  horseSpeeds.value = {}
  horseFinishTimes.value = {}
  initializeHorses()
  store.dispatch('race/resetRace')
}

// Watch for race start/stop
watch(() => props.raceStarted, (started) => {
  if (started) {
    // Reset values
    finishedHorses.value = []
    raceTime.value = 0
    horsePositions.value = {}
    horseSpeeds.value = {}
    horseFinishTimes.value = {}
    initializeHorses()

    // Clear any existing interval
    if (raceInterval.value) {
      clearInterval(raceInterval.value)
    }

    // Start race timer and position updates
    raceInterval.value = setInterval(() => {
      raceTime.value += 0.1
      updateHorsePositions()
    }, 100)
  } else {
    // Stop race timer
    if (raceInterval.value) {
      clearInterval(raceInterval.value)
      raceInterval.value = null
    }
  }
})

// Initialize horses when component mounts
watch(() => currentRoundData.value, () => {
  if (currentRoundData.value) {
    initializeHorses()
  }
}, { immediate: true })

// Cleanup on unmount
onUnmounted(() => {
  if (raceInterval.value) {
    clearInterval(raceInterval.value)
  }
})
</script>

<style scoped>
.round-header {
  display: flex;
  align-items: center;
  justify-content: center;   /* center everything */
  position: relative;
  margin-bottom: 20px;
}

/* Center the title */
.round-header h2 {
  text-align: center;
  font-size: 2rem;
  color: #fff;
  text-shadow: 2px 2px 6px rgba(0,0,0,0.5);
  margin: 0;
}

/* Put button on the right side */
.round-header .start-round-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  background: linear-gradient(135deg, #ff512f 0%, #dd2476 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: all 0.2s ease;
}
.round-header .start-round-btn:hover {
  transform: translateY(-50%) scale(1.05);
  box-shadow: 0 6px 20px rgba(255, 81, 47, 0.5);
}

.race-track {
  padding: 20px;
  max-width: 1200px;
  height: calc(100vh - 40px);
  /* Static height within window */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.race-track h2 {
  text-align: center;
  color: white;
  margin-bottom: 20px;
  font-size: 2rem;
  flex-shrink: 0;
  /* Prevent title from shrinking */
}

.race-info {
  /*background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
  color: white;
  padding: 10px;
  /* border-radius: 12px; */
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  /* Prevent race info from shrinking */
  height: 60px;
  /* Fixed height for race info */
  display: flex;
  align-items: center;
  justify-content: center;
}

.race-stats {
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
}

.time-display,
.distance-info,
.horses-finished {
  font-size: 16px;
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 15px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.race-results {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  border: 1px solid #dee2e6;
  flex-shrink: 0;
  /* Prevent results from shrinking */
  max-height: 200px;
  /* Limit results height */
  overflow-y: auto;
  /* Allow scrolling if needed */
}

.race-results h3 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 15px;
}

.results-table {
  display: grid;
  grid-template-columns: 60px 1fr 100px 80px;
  gap: 10px;
  align-items: center;
}

.result-header {
  font-weight: bold;
  color: #495057;
  padding: 10px;
  background: #e9ecef;
  border-radius: 6px;
  text-align: center;
}

.result-row {
  padding: 12px 10px;
  background: white;
  border-radius: 6px;
  border: 1px solid #dee2e6;
  display: contents;
  transition: all 0.3s ease;
}

.result-row:hover {
  background: #f8f9fa;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.result-row.podium {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  font-weight: bold;
}

.result-row.podium:nth-child(2) {
  background: linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%);
}

.result-row.podium:nth-child(3) {
  background: linear-gradient(135deg, #cd7f32 0%, #daa520 100%);
}

.position {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}

.horse-name {
  font-weight: 600;
  color: #2c3e50;
}

.finish-time {
  text-align: center;
  color: #27ae60;
  font-weight: bold;
  font-family: 'Courier New', monospace;
}

.speed {
  text-align: center;
  color: #7f8c8d;
  font-size: 14px;
}

.track-container {
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 400px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom, #2d6a4f 0%, #95d5b2 100%);
  /* grass */
  padding: 10px;
}

/* Track in the middle */
.track {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #d2b48c 0%, #c19a6b 100%);
  /* dirt */
  border-top: 10px solid #8b5e3c;
  /* fence line */
  border-bottom: 10px solid #8b5e3c;
  /* fence line */
  border-radius: 12px;
  box-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.25),
    inset 0 -4px 12px rgba(0, 0, 0, 0.25);
}

.start-line,
.finish-line {
  position: absolute;
  top: 0;
  bottom: 0;
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
}

.horse-lane {
  position: absolute;
  left: 0;
  right: 0;
  height: 40px;
  /* Reduced height for more horses */
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.horse {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: left 0.1s linear;
  z-index: 5;
}

/* Make horses face the finish line (right direction) */
.horse.facing-right {
  transform: translateY(-50%) scaleX(1);
}

.horse-icon {
  font-size: 1.5rem;
  /* Smaller icon for more horses */
  animation: none;
  display: inline-block;
  transition: all 0.3s ease;
  transform: scaleX(-1);
  /* Flip horse to face right - ALWAYS applied */
}

.horse-name {
  position: absolute;
  top: -8px;
  /* Much closer to the horse icon */
  left: 50%;
  padding: 2px 6px;
  /* Smaller padding */
  border-radius: 4px;
  font-size: 9px;
  /* Smaller font */
  font-weight: bold;
  white-space: nowrap;
  z-index: 6;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  max-width: 80px;
  /* Limit width to prevent overlap */
  text-align: center;
  line-height: 1.2;
}

/* Running animation - maintain right-facing direction */
.horse.running .horse-icon {
  animation: gallop-right 0.6s infinite ease-in-out;
}

.horse.running {
  animation: bounce 0.8s infinite ease-in-out;
}

/* Finished state - maintain right-facing direction */
.horse.finished .horse-icon {
  animation: celebration-right 1s ease-in-out;
}

.horse.finished {
  animation: finish-celebration 1s ease-in-out;
}

/* Keyframe animations - all maintain right-facing direction */
@keyframes gallop-right {

  0%,
  100% {
    transform: scaleX(-1) translateY(0) rotate(0deg);
  }

  25% {
    transform: scaleX(-1) translateY(-2px) rotate(-1deg);
  }

  50% {
    transform: scaleX(-1) translateY(0) rotate(0deg);
  }

  75% {
    transform: scaleX(-1) translateY(-1px) rotate(1deg);
  }
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(-50%) scale(1);
  }

  50% {
    transform: translateY(-52%) scale(1.02);
  }
}

@keyframes celebration-right {
  0% {
    transform: scaleX(-1) translateY(0) rotate(0deg) scale(1);
  }

  25% {
    transform: scaleX(-1) translateY(-8px) rotate(-8deg) scale(1.05);
  }

  50% {
    transform: scaleX(-1) translateY(-12px) rotate(0deg) scale(1.1);
  }

  75% {
    transform: scaleX(-1) translateY(-8px) rotate(8deg) scale(1.05);
  }

  100% {
    transform: scaleX(-1) translateY(0) rotate(0deg) scale(1);
  }
}

@keyframes finish-celebration {
  0% {
    transform: translateY(-50%) scale(1);
  }

  50% {
    transform: translateY(-55%) scale(1.05);
  }

  100% {
    transform: translateY(-50%) scale(1);
  }
}

.race-controls {
  margin-top: 20px;
  text-align: center;
  flex-shrink: 0;
  /* Prevent controls from shrinking */
}



.race-complete {
  background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
  margin: 20px 0;
  flex-shrink: 0;
  /* Prevent completion message from shrinking */
}

.race-complete h3 {
  margin-bottom: 20px;
  font-size: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* Responsive design */
@media (max-width: 768px) {
  .race-stats {
    flex-direction: column;
    gap: 15px;
  }

  .results-table {
    grid-template-columns: 50px 1fr 80px 70px;
    font-size: 14px;
  }

  .track-container {
    height: 400px;
    /* Fixed height on mobile too */
  }

  .horse-lane {
    height: 30px;
    /* Even smaller on mobile */
  }

  .horse-icon {
    font-size: 1.2rem;
  }

  .horse-name {
    font-size: 8px;
    top: -6px;
    /* Even closer on mobile */
    max-width: 60px;
  }

  .start-race-btn,
  .next-round-btn,
  .reset-race-btn {
    padding: 12px 25px;
    font-size: 16px;
  }
}
</style>