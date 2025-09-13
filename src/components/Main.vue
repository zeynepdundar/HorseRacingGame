<template>
  <div class="main-container">
    <div class="game-actions-container" v-if="!showRoundsList">
      <div class="game-actions">
        <Button @click="assignRandomHorses" class="start-race-btn">
          Setup Race
        </Button>
        <Button @click="randomizeHorseConditions" class="randomize-btn">
          Refresh Horses
        </Button>
      </div>
    </div>

    <!-- Horses List -->
    <div class="horse-list-section" v-if="!showRoundsList">
      <HoursesList :horses="horses" :columns="columns" />
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3 class="modal-title"> Race Ready!</h3>
        <p>{{ selectedHorses.length }} random horses have been successfully assigned to each round.</p>
        <p class="ready-text">Ready to start the race!</p>

        <Button @click="closeModal" class="close-btn">
          OK
        </Button>
      </div>
    </div>

    <!-- Race Layout with 3:1 ratio -->
    <div v-if="showRoundsList" class="race-layout">
      <div class="race-track-container">
        <RaceTrack :rounds="rounds" :currentRound="currentRound" :raceStarted="raceStarted" />
      </div>
      <div class="race-schedule-container">
        <RaceSchedule />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import Button from './ui/Button.vue'
import type { Horse } from '../types/horse'
import HoursesList from './horses/HoursesList.vue'
import RaceSchedule from './races/RaceSchedule.vue'
import RaceTrack from './races/RaceTrack.vue'

const store = useStore()
const selectedHorses = ref<number[]>([])
const showModal = ref<boolean>(false)
const showRoundsList = ref<boolean>(false)
const horses = computed<Horse[]>(() => store.getters['horses/allHorses'])
const rounds = computed(() => store.getters['race/rounds'])
const currentRound = computed(() => store.getters['race/currentRound'])
const raceStarted = computed(() => store.getters['race/raceStarted'])

const columns = [
  { key: 'horse', label: 'Horse', width: 200 },
  { key: 'color', label: 'Color', width: 120 },
  { key: 'condition', label: 'Condition', width: 150 }
]

function assignRandomHorses() {
  selectedHorses.value = []
  const allHorseIds = horses.value.map(horse => horse.id)
  const shuffled = [...allHorseIds].sort(() => Math.random() - 0.5)
  selectedHorses.value = shuffled.slice(0, 10)

  // Generate race program with 6 rounds
  store.dispatch('race/generateRaceProgram')

  // Hide any existing rounds list and show modal
  showRoundsList.value = false
  showModal.value = true

  // Auto-close modal after 5 seconds
  setTimeout(() => {
    closeModal()
  }, 5000)
}

function closeModal() {
  showModal.value = false
  // Show rounds list after modal closes
  showRoundsList.value = true
}

function randomizeHorseConditions() {
  store.dispatch('horses/randomizeConditions')
}
</script>

<style scoped>
:global(html, body) {
  overflow: hidden;
  height: 100%;
  margin: 0;
  padding: 0;
  background: #f5f6fa;
}

.main-container {
  padding: 10px;
  max-width: 1400px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Game Actions Container */
.game-actions-container {
  margin-bottom: 20px;
  padding: 0 10px;
}

.game-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.start-race-btn {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  font-weight: 600;
  padding: 12px 24px;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  transition: all 0.3s ease;
}

.start-race-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.randomize-btn {
  background: linear-gradient(135deg, #FF9800, #F57C00);
  color: white;
  font-weight: 600;
  padding: 12px 24px;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);
  transition: all 0.3s ease;
}

.randomize-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 152, 0, 0.4);
}

.horse-list-section {
  background: linear-gradient(135deg,
      rgba(76, 175, 80, 0.15),
      rgba(56, 142, 60, 0.1));
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: 12px;
  padding: 15px 20px;
  box-shadow:
    0 8px 32px rgba(76, 175, 80, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: 80vh;
  backdrop-filter: blur(10px);
  position: relative;
}

.horse-list-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%,
      rgba(76, 175, 80, 0.05) 100%);
  pointer-events: none;
  border-radius: 12px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px 28px;
  border-radius: 12px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
  animation: fadeIn 0.25s ease;
}

.modal-title {
  margin-bottom: 12px;
  font-size: 20px;
}

.ready-text {
  font-weight: bold;
  margin: 12px 0 20px;
}

.close-btn {
  margin-top: 8px;
}

.ready-text {
  margin-top: 20px !important;
  font-weight: 600;
  color: #4CAF50 !important;
}



/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Race Layout Styles */
.race-layout {
  display: flex;
  gap: 0;
  /* Remove gap */
  height: calc(100vh - 20px);
  padding: 0 10px 0 0;
  /* Remove left padding, keep right padding */
}

.race-track-container {
  flex: 3;
  display: flex;
  flex-direction: column;
  padding-right: 0;
  /* Ensure no padding on right side */
}

.race-schedule-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 0;
  /* Ensure no margin */
}
</style>
