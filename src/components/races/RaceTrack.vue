<template>
  <div class="race-track">
    <div class="round-header" :class="{ 'highlighted': isNextRoundReady }">
      <h2 :class="{ 'highlighted': isNextRoundReady }">{{ getOrdinalNumber(currentRound) }} Lap ({{
        currentRoundData?.distance }}m)</h2>
      <Button class="start-round-btn" variant="secondary" :class="{ 'highlighted': isNextRoundReady }"
        :disabled="raceStarted && !isRaceComplete" @click="startRound()">
        ▶ Start Round </Button>
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
                color: horse.color || 'inherit',
                filter: `drop-shadow(2px 2px 4px rgba(0,0,0,0.3))`
              }">🐎</div>
              <div class="horse-name" :style="{
                backgroundColor: horse.color || 'inherit',
                color: getContrastColor(horse.color || '#fff')
              }">{{ horse.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Round Complete Modal -->
    <Modal v-if="showRoundCompleteModal" @close="closeRoundCompleteModal" class="round-results-modal">
      <template #title>
        🏁 Lap {{ getOrdinalNumber(currentRound) }} Complete!
      </template>

      <div class="round-results">
        <!-- Complete Results Table -->
        <div class="round-horses-section">
          <div class="modal-results-container">
            <table class="modal-results-table compact">
              <thead>
                <tr>
                  <th class="modal-position-header">#</th>
                  <th class="modal-horse-header">Horse</th>
                  <th class="modal-time-header">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(horse, index) in finishedHorses" :key="horse.id" class="modal-result-row" :class="{
                  'modal-podium': index < 3,
                  'modal-position-1': index === 0,
                  'modal-position-2': index === 1,
                  'modal-position-3': index === 2
                }">
                  <td class="modal-position-cell">
                    <div class="modal-position-badge compact" :class="{
                      'modal-gold': index === 0,
                      'modal-silver': index === 1,
                      'modal-bronze': index === 2
                    }">
                      {{ index + 1 }}
                    </div>
                  </td>
                  <td class="modal-horse-cell">
                    <span class="modal-horse-name compact">{{ horse.name }}</span>
                  </td>
                  <td class="modal-time-cell">
                    <span class="modal-finish-time compact">{{ horse.finishTime }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>

    <!-- Race Complete Modal - Full Screen with 6 Round Tables -->
    <Modal v-if="isRaceComplete && showRaceCompleteModal" @close="closeRaceCompleteModal"
      class="race-complete-modal fullscreen">
      <template #title>
        🏆 Race Complete! 🏆
      </template>

      <div class="race-complete-content">
        <!-- Top 3 Winners Section -->
        <div class="winners-section">
          <h3 class="winners-title">🏆 Top 3 Champions</h3>
          <div class="winners-podium">
            <div v-for="(winner, index) in topThreeWinners" :key="winner.id" class="winner-card"
              :class="`position-${index + 1}`">
              <div class="winner-medal">
                <span v-if="index === 0">🥇</span>
                <span v-else-if="index === 1">🥈</span>
                <span v-else>🥉</span>
              </div>
              <div class="winner-info">
                <h4 class="winner-name">{{ winner.name }}</h4>
                <p class="winner-stats">
                  <span class="wins">{{ winner.wins }} Win{{ winner.wins !== 1 ? 's' : '' }}</span>
                  <span class="avg-time">Avg: {{ winner.averageTime }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- All 6 Rounds Results in Tables -->
        <div class="all-rounds-section">
          <h3 class="rounds-title">📊 All 6 Rounds Results</h3>
          <div class="rounds-tables-container">
            <div v-for="(round, roundIndex) in allRoundResults" :key="roundIndex" class="round-table-card">
              <div class="round-table-header">
                <h4>Round {{ roundIndex + 1 }} ({{ round.distance }}m)</h4>
              </div>
              <div class="round-table-content">
                <table class="round-results-table">
                  <thead>
                    <tr>
                      <th class="position-header">#</th>
                      <th class="horse-header">Horse</th>
                      <th class="time-header">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(horse, index) in round.results" :key="horse.id" class="result-row" :class="{
                      'podium-1': index === 0,
                      'podium-2': index === 1,
                      'podium-3': index === 2
                    }">
                      <td class="position-cell">
                        <div class="position-badge" :class="{
                          'gold': index === 0,
                          'silver': index === 1,
                          'bronze': index === 2
                        }">
                          {{ index + 1 }}
                        </div>
                      </td>
                      <td class="horse-cell">
                        <span class="horse-name">{{ horse.name }}</span>
                      </td>
                      <td class="time-cell">
                        <span class="finish-time">{{ horse.finishTime }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="race-complete-actions">
          <Button @click="restartRace" class="restart-btn">
            🔄 New Race
          </Button>
          <Button @click="closeRaceCompleteModal" class="close-btn">
            ✕ Close
          </Button>
        </div>
      </div>
    </Modal>

    <!-- <div v-if="isRaceComplete" class="race-complete">
      <h3>🎉 Yarış Tamamlandı!</h3>
      <p>Tüm turlar başarıyla tamamlandı.</p>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import type { Round } from '../../types/round'
import type { Horse } from '../../types/horse'
import Modal from '../ui/Modal.vue'


import { formatTime, getContrastColor, getOrdinalNumber, parseTime } from '../../utils';
import Button from '../ui/Button.vue'

const props = defineProps<{
  rounds: Round[]
  currentRound: number
  raceStarted?: boolean
}>()


const emit = defineEmits<{
  scrollToNextRound: [roundNumber: number]
}>()

const store = useStore()
// Race timing
const raceTime = ref(0)
const raceInterval = ref<ReturnType<typeof setInterval> | null>(null)

// Horse positions and animation
const horsePositions = ref<Record<number, number>>({})
const horseSpeeds = ref<Record<number, number>>({})
const horseFinishTimes = ref<Record<number, number>>({})

// Modal state
const showRoundCompleteModal = ref(false)

// Highlighting state for next round setup
const isNextRoundReady = ref(false)

// Finished horses tracking
const finishedHorses = ref<Array<{
  id: number
  name: string
  finishTime: string
  speed: number
  position: number
}>>([])

const showRaceCompleteModal = ref(false)
const allRoundResults = ref<Array<{
  distance: number
  results: Array<{
    id: number
    name: string
    finishTime: string
    position: number
  }>
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




// Check if all horses have finished
const allHorsesFinished = computed(() => {
  const totalHorses = currentRoundData.value?.selectedHorses?.length || 0
  return finishedHorses.value.length === totalHorses && totalHorses > 0
})

// Check if race is complete (all rounds finished)
const isRaceComplete = computed(() => {
  // Check if we have rounds and all rounds are completed
  if (!props.rounds.length) return false

  // All rounds must be completed
  return props.rounds.every(round => round.isCompleted)
})

// Calculate horse speed based on condition and randomization
const calculateHorseSpeed = (horse: Horse): number => {
  // Base speed multiplier based on condition (0-100, where 100 is best)
  const conditionMultiplier = (horse.condition || 50) / 100

  // Base speed range
  const baseSpeedMin = 3.5 
  const baseSpeedMax = 7.0

  // Calculate base speed with condition influence
  const conditionInfluence = 0.4
  const randomInfluence = 0.6

  const baseSpeed = baseSpeedMin + (baseSpeedMax - baseSpeedMin) * conditionMultiplier
  const randomFactor = 0.7 + Math.random() * 0.6 // 0.7 to 1.3 multiplier (wider range)

  // Combine condition and random factors
  const finalSpeed = baseSpeed * (
    conditionInfluence + (randomInfluence * randomFactor)
  )

  // Add some dynamic variation during race
  const dynamicVariation = 0.85 + Math.random() * 0.3 // ±15% variation (increased)
  return finalSpeed * dynamicVariation
}

// Initialize horse data
const initializeHorses = () => {
  if (currentRoundData.value?.selectedHorses) {
    currentRoundData.value.selectedHorses.forEach(horse => {
      horsePositions.value[horse.id] = 0

      // Calculate base speed based on horse condition and add randomization
      const baseSpeed = calculateHorseSpeed(horse)
      horseSpeeds.value[horse.id] = baseSpeed
    })
  }
}

// Update horse positions during race
const updateHorsePositions = () => {
  if (!props.raceStarted) return

  currentRoundData.value?.selectedHorses?.forEach(horse => {
    if (!isHorseFinished(horse.id)) {
      const currentPosition = horsePositions.value[horse.id] || 0
      let speed = horseSpeeds.value[horse.id] || 1

      // Add dynamic speed variations during race for more realism
      const raceProgress = currentPosition / 95

      // Early race: horses start faster and build up quickly
      if (raceProgress < 0.15) {
        speed *= 0.8 + (raceProgress * 1.33) // Start at 80% and quickly reach 100%
      }
      // Mid race: peak performance with variations
      else if (raceProgress < 0.85) {
        speed *= 1.0 + Math.random() * 0.15 // 100-115% with variations
      }
      // Final sprint: dramatic differences based on condition
      else {
        const staminaFactor = (horse.condition || 50) / 100
        if (staminaFactor > 0.75) {
          speed *= 1.2 + Math.random() * 0.3 // Strong horses sprint (120-150%)
        } else if (staminaFactor > 0.5) {
          speed *= 1.0 + Math.random() * 0.2 // Average horses maintain (100-120%)
        } else {
          speed *= 0.7 + Math.random() * 0.4 // Weak horses struggle (70-110%)
        }
      }

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

const startRound = () => {
  // Just start the race for the current round that's already prepared
  // Don't call store.dispatch('race/startRace') as it resets to round 1
  store.commit('race/setRaceStarted', true)
}

// Handle horse finishing
const handleHorseFinished = (horse: Horse, finishTime: number) => {
  // Add small random variation to finish time for more realistic results
  const timeVariation = 0.95 + Math.random() * 0.1 // ±5% variation
  const adjustedFinishTime = finishTime * timeVariation

  const formattedTime = formatTime(adjustedFinishTime)
  const speed = (currentRoundData.value?.distance || 0) / adjustedFinishTime

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

// Close round complete modal
const closeRoundCompleteModal = () => {
  showRoundCompleteModal.value = false

  // Enable highlighting for next round setup
  isNextRoundReady.value = true

  // Emit event to scroll to next round in race program
  if (hasNextRound.value) {
    emit('scrollToNextRound', props.currentRound + 1)
  }

  // Auto-disable highlighting after 3 seconds
  setTimeout(() => {
    isNextRoundReady.value = false
  }, 3000)

  // Prepare next round data without starting the race
  prepareNextRound()
}

// Prepare next round data without starting the race
const prepareNextRound = () => {
  const currentRound = computed(() => store.getters['race/currentRound'])
  const rounds = computed(() => store.getters['race/rounds'])

  // Calculate next round
  const next = currentRound.value + 1

  if (next <= rounds.value.length) {
    // IMPORTANT: Stop the current race first
    store.commit('race/setRaceStarted', false)

    // Mark the current round as completed
    store.commit('race/markRoundCompleted', currentRound.value)

    // Update current round in store
    store.commit('race/setCurrentRound', next)

    // Reset local state for the new round
    resetLocalState()
  } else {
    // End race
    store.commit('race/setRaceStarted', false)
  }
}

// Reset local state for next round (renamed to avoid confusion)
const resetLocalState = () => {
  // Reset for next round
  finishedHorses.value = []
  raceTime.value = 0
  horsePositions.value = {}
  horseSpeeds.value = {}
  horseFinishTimes.value = {}
  showRoundCompleteModal.value = false
  isNextRoundReady.value = false
  initializeHorses()

  // Reset race
  // store.dispatch('race/resetRace')
}

const topThreeWinners = computed(() => {
  const horseStats = new Map<
    number,
    {
      id: number
      name: string
      wins: number
      totalTime: number
      roundCount: number
    }
  >()

  // Calculate stats for each horse across all rounds
  allRoundResults.value.forEach(round => {
    round.results.forEach((horse, index) => {
      if (!horseStats.has(horse.id)) {
        horseStats.set(horse.id, {
          id: horse.id,
          name: horse.name,
          wins: 0,
          totalTime: 0,
          roundCount: 0
        })
      }

      const stats = horseStats.get(horse.id)!
      stats.roundCount++
      stats.totalTime += parseTime(horse.finishTime)

      // Count wins (1st place)
      if (index === 0) {
        stats.wins++
      }
    })
  })

  // Convert to array and sort by wins, then by average time
  return Array.from(horseStats.values())
    .map(horse => ({
      ...horse,
      averageTime: formatTime(horse.totalTime / horse.roundCount)
    }))
    .sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins
      return a.totalTime - b.totalTime
    })
    .slice(0, 3)
})

// Add method to store round results
const storeRoundResults = () => {
  if (finishedHorses.value.length > 0) {
    allRoundResults.value.push({
      distance: currentRoundData.value?.distance || 0,
      results: [...finishedHorses.value]
    })
  }
}

// Add method to close race complete modal
const closeRaceCompleteModal = () => {
  showRaceCompleteModal.value = false
}

// Add method to restart race
const restartRace = () => {
  // Reset all data
  allRoundResults.value = []
  finishedHorses.value = []
  showRaceCompleteModal.value = false
  showRoundCompleteModal.value = false

  // Reset race state
  store.dispatch('race/resetRace')
  store.dispatch('race/generateRaceProgram')
}

watch(allHorsesFinished, (finished) => {
  if (finished && props.raceStarted) {
    // Show modal after a short delay to let the race animation complete
    setTimeout(() => {
      showRoundCompleteModal.value = true
    }, 1000)
  }
})

// Watch for race start/stop
watch(() => props.raceStarted, (started) => {
  if (started) {
    // Reset values
    finishedHorses.value = []
    raceTime.value = 0
    horsePositions.value = {}
    horseSpeeds.value = {}
    horseFinishTimes.value = {}
    showRoundCompleteModal.value = false
    isNextRoundReady.value = false
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

// Watch for race completion
watch(isRaceComplete, (newValue) => {
  if (newValue) {
    // Store the last round results
    storeRoundResults()
    // Show race complete modal
    showRaceCompleteModal.value = true
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
  justify-content: center;
  /* center everything */
  position: relative;
  margin-bottom: 40px;
  width: 100%;
}

/* Center the title */
.round-header h2 {
  text-align: center;
  font-size: 2rem;
  color: #fff;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
  margin: 0;
}




.round-header .start-round-btn{
  position: absolute;
  right: 0;
  background: linear-gradient(45deg, #FF6B35, #FFD700, #FF6B35);
  background-size: 400% 400%;
  color: #222;
  box-shadow: 0 5px 15px rgba(255, 193, 7, 0.6);
  transition: all 0.25s ease-in-out;
  overflow: hidden;
  animation: glowingDiagonal 3s linear infinite; /* base gradient animation */
}

/* Diagonal glowing gradient animation */
@keyframes glowingDiagonal {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}

/* Diagonal shine effect using pseudo-element */
.round-header .start-round-btn::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(45deg) translateX(-200%);
  transition: transform 0.6s ease;
  pointer-events: none;
}

.round-header .start-round-btn:hover::after {
  transform: rotate(45deg) translateX(200%);
}

/* Hover scale and shadow */
.round-header .start-round-btn:hover:not(.is-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.8);
}


.race-track {
  padding: 20px;
  max-width: 1200px;
  height: 87%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom, #2d6a4f 0%, #95d5b2 100%);
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

/* Modal Results Table Styles */
.modal-results-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.modal-results-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.modal-results-table thead {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.modal-results-table th {
  padding: 16px 12px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: none;
}

.modal-results-table tbody tr {
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.modal-results-table tbody tr:hover {
  background: rgba(102, 126, 234, 0.05);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.modal-results-table tbody tr:last-child {
  border-bottom: none;
}

.modal-results-table td {
  padding: 16px 12px;
  vertical-align: middle;
  border: none;
}

/* Modal Position Badge Styles */
.modal-position-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 14px;
  color: white;
  background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.modal-position-badge.modal-gold {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #8b6914;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
}

.modal-position-badge.modal-silver {
  background: linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%);
  color: #5a5a5a;
  box-shadow: 0 4px 12px rgba(192, 192, 192, 0.4);
}

.modal-position-badge.modal-bronze {
  background: linear-gradient(135deg, #cd7f32 0%, #daa520 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(205, 127, 50, 0.4);
}

/* Modal Cell-specific styles */
.modal-horse-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.modal-horse-name {
  font-weight: 600;
  color: #2c3e50;
  font-size: 16px;
}

.modal-finish-time {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: #27ae60;
  font-size: 16px;
  background: rgba(39, 174, 96, 0.1);
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid rgba(39, 174, 96, 0.2);
}

.modal-speed-value {
  color: #7f8c8d;
  font-weight: 500;
  font-size: 14px;
  background: rgba(127, 140, 141, 0.1);
  padding: 4px 8px;
  border-radius: 6px;
}

/* Modal Podium row special styling */
.modal-result-row.modal-podium {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 237, 78, 0.1) 100%);
  border-left: 4px solid #ffd700;
}

.modal-result-row.modal-position-2 {
  background: linear-gradient(135deg, rgba(192, 192, 192, 0.1) 0%, rgba(232, 232, 232, 0.1) 100%);
  border-left: 4px solid #c0c0c0;
}

.modal-result-row.modal-position-3 {
  background: linear-gradient(135deg, rgba(205, 127, 50, 0.1) 0%, rgba(218, 165, 32, 0.1) 100%);
  border-left: 4px solid #cd7f32;
}

/* Modal Responsive design */
@media (max-width: 768px) {
  .modal-results-container {
    padding: 12px;
    margin: 0 -10px;
  }

  .modal-results-table th,
  .modal-results-table td {
    padding: 12px 8px;
    font-size: 13px;
  }

  .modal-position-badge {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }

  .modal-horse-name {
    font-size: 14px;
  }

  .modal-finish-time {
    font-size: 14px;
    padding: 4px 8px;
  }

  .modal-speed-value {
    font-size: 12px;
    padding: 3px 6px;
  }
}

/* Compact table styles */
.modal-results-table.compact {
  font-size: 12px;
}

.modal-results-table.compact th {
  padding: 8px 6px;
  font-size: 11px;
  font-weight: 600;
}

.modal-results-table.compact td {
  padding: 6px 6px;
  font-size: 12px;
}

.modal-position-badge.compact {
  width: 20px;
  height: 20px;
  font-size: 10px;
  font-weight: 700;
}

.modal-horse-name.compact {
  font-size: 12px;
  font-weight: 600;
}

.modal-finish-time.compact {
  font-size: 11px;
  font-weight: 500;
}

.modal-speed-value.compact {
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 3px;
}

/* Remove extra spacing in compact mode */
.modal-results-table.compact .modal-horse-info {
  gap: 0;
}

/* Make table columns more proportional for compact view */
.modal-results-table.compact .modal-position-header {
  width: 8%;
}

.modal-results-table.compact .modal-horse-header {
  width: 45%;
}

.modal-results-table.compact .modal-time-header {
  width: 25%;
}

.modal-results-table.compact .modal-speed-header {
  width: 22%;
}

@media (max-width: 480px) {

  .modal-results-table th,
  .modal-results-table td {
    padding: 8px 4px;
    font-size: 12px;
  }

  .modal-results-table th {
    font-size: 11px;
  }

  .modal-position-badge {
    width: 24px;
    height: 24px;
    font-size: 11px;
  }
}

/* Race Complete Modal Styles */
.race-complete-modal.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}

.race-complete-modal.fullscreen .modal-content {
  width: 95%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.race-complete-content {
  padding: 30px;
  color: white;
}

.winners-section {
  text-align: center;
  margin-bottom: 40px;
}

.winners-title {
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.winners-podium {
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 20px;
  margin-bottom: 30px;
}

.winner-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}

.winner-card:hover {
  transform: translateY(-5px);
}

.winner-card.position-1 {
  order: 2;
  transform: scale(1.1);
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #333;
}

.winner-card.position-2 {
  order: 1;
  background: linear-gradient(135deg, #c0c0c0, #e8e8e8);
  color: #333;
}

.winner-card.position-3 {
  order: 3;
  background: linear-gradient(135deg, #cd7f32, #daa520);
  color: #333;
}

.winner-medal {
  font-size: 3rem;
  margin-bottom: 10px;
}

.winner-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.winner-stats {
  font-size: 0.9rem;
  opacity: 0.8;
}

.all-rounds-section {
  margin-bottom: 30px;
}

.rounds-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 25px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.rounds-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.round-result-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.round-header h4 {
  font-size: 1.2rem;
  margin-bottom: 15px;
  text-align: center;
  color: #ffd700;
}

.round-podium {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.round-winner {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
}

.round-winner.pos-1 {
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #333;
}

.round-winner.pos-2 {
  background: linear-gradient(135deg, #c0c0c0, #e8e8e8);
  color: #333;
}

.round-winner.pos-3 {
  background: linear-gradient(135deg, #cd7f32, #daa520);
  color: #333;
}

.position-badge {
  font-weight: bold;
  min-width: 20px;
}

.horse-name {
  flex: 1;
  font-weight: 500;
}

.finish-time {
  font-size: 0.9rem;
  opacity: 0.8;
}

.race-complete-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.restart-btn,
.close-btn {
  padding: 15px 30px;
  font-size: 1.1rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

.restart-btn {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
}

.restart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
}

.close-btn {
  background: linear-gradient(135deg, #f44336, #da190b);
  color: white;
}

.close-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(244, 67, 54, 0.4);
}

/* Responsive design */
@media (max-width: 768px) {
  .race-complete-modal.fullscreen .modal-content {
    width: 98%;
    max-height: 95vh;
  }

  .race-complete-content {
    padding: 20px;
  }

  .winners-title {
    font-size: 2rem;
  }

  .winners-podium {
    flex-direction: column;
    align-items: center;
  }

  .winner-card.position-1 {
    order: 1;
    transform: none;
  }

  .winner-card.position-2 {
    order: 2;
  }

  .winner-card.position-3 {
    order: 3;
  }

  .rounds-container {
    grid-template-columns: 1fr;
  }

  .race-complete-actions {
    flex-direction: column;
    align-items: center;
  }
}

/* New styles for 6 round tables */
.rounds-tables-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.round-table-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}

.round-table-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.round-table-header h4 {
  font-size: 1.3rem;
  margin-bottom: 15px;
  text-align: center;
  color: #ffd700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.round-results-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
}

.round-results-table thead {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.round-results-table th {
  padding: 12px 8px;
  text-align: left;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: none;
}

.round-results-table tbody tr {
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.round-results-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.round-results-table tbody tr:last-child {
  border-bottom: none;
}

.round-results-table td {
  padding: 10px 8px;
  vertical-align: middle;
  border: none;
  font-size: 12px;
}

/* Position badge styles */
.position-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-weight: bold;
  font-size: 11px;
  color: white;
  background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.position-badge.gold {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #8b6914;
  box-shadow: 0 3px 8px rgba(255, 215, 0, 0.4);
}

.position-badge.silver {
  background: linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%);
  color: #5a5a5a;
  box-shadow: 0 3px 8px rgba(192, 192, 192, 0.4);
}

.position-badge.bronze {
  background: linear-gradient(135deg, #cd7f32 0%, #daa520 100%);
  color: white;
  box-shadow: 0 3px 8px rgba(205, 127, 50, 0.4);
}

/* Cell-specific styles */
.horse-name {
  font-weight: 600;
  color: #fff;
  font-size: 12px;
}

.finish-time {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: #4CAF50;
  font-size: 11px;
  background: rgba(76, 175, 80, 0.2);
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.speed-value {
  color: #81C784;
  font-weight: 500;
  font-size: 11px;
  background: rgba(129, 199, 132, 0.2);
  padding: 3px 6px;
  border-radius: 4px;
}

/* Podium row special styling */
.result-row.podium-1 {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 237, 78, 0.2) 100%);
  border-left: 3px solid #ffd700;
}

.result-row.podium-2 {
  background: linear-gradient(135deg, rgba(192, 192, 192, 0.2) 0%, rgba(232, 232, 232, 0.2) 100%);
  border-left: 3px solid #c0c0c0;
}

.result-row.podium-3 {
  background: linear-gradient(135deg, rgba(205, 127, 50, 0.2) 0%, rgba(218, 165, 32, 0.2) 100%);
  border-left: 3px solid #cd7f32;
}

/* Responsive design for tables */
@media (max-width: 1200px) {
  .rounds-tables-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .round-table-card {
    padding: 15px;
  }

  .round-table-header h4 {
    font-size: 1.1rem;
  }

  .round-results-table th,
  .round-results-table td {
    padding: 8px 6px;
    font-size: 11px;
  }

  .position-badge {
    width: 20px;
    height: 20px;
    font-size: 10px;
  }

  .horse-name {
    font-size: 11px;
  }

  .finish-time,
  .speed-value {
    font-size: 10px;
    padding: 2px 4px;
  }
}

@media (max-width: 480px) {

  .round-results-table th,
  .round-results-table td {
    padding: 6px 4px;
    font-size: 10px;
  }

  .round-results-table th {
    font-size: 9px;
  }

  .position-badge {
    width: 18px;
    height: 18px;
    font-size: 9px;
  }
}
</style>
