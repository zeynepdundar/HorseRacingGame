<template>
  <div class="main-container">
    <!-- Setup Actions -->
    <section v-if="!setupComplete" class="game-setup">
      <div class="game-actions">
        <Button @click="setupRace" class="setup-race-btn">Setup Race</Button>
        <Button @click="refreshHorses" class="refresh-btn">Refresh Horses</Button>
      </div>

      <!-- Horses List -->
      <HoursesList v-if="horses.length" :horses="horses" :columns="columns" />
    </section>

    <!-- Setup Complete Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3 class="modal-title">Race Ready!</h3>
        <p>{{ selectedHorses.length }} random horses have been assigned to the rounds.</p>
        <p class="ready-text">Ready to start the race!</p>
        <Button @click="closeModal" class="close-btn">OK</Button>
      </div>
    </div>

    <!-- Race Simulation -->
    <section v-if="setupComplete" class="race-simulation">
      <aside class="race-track-container">
        <RaceTrack 
          :rounds="rounds" 
          :currentRound="currentRound" 
          :raceStarted="raceStarted" 
        />
      </aside>
      <aside class="race-schedule-container">
        <RaceSchedule />
      </aside>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import Button from './ui/Button.vue'
import HoursesList from './horses/HoursesList.vue'
import RaceSchedule from './races/RaceSchedule.vue'
import RaceTrack from './races/RaceTrack.vue'
import type { Horse } from '../types/horse'

const store = useStore()
const showModal = ref(false)
const setupComplete = ref(false)
const selectedHorses = ref<number[]>([])

const horses = computed<Horse[]>(() => store.getters['horses/allHorses'])
const rounds = computed(() => store.getters['race/rounds'])
const currentRound = computed(() => store.getters['race/currentRound'])
const raceStarted = computed(() => store.getters['race/raceStarted'])

const columns = [
  { key: 'horse', label: 'Horse', width: 200 },
  { key: 'color', label: 'Color', width: 120 },
  { key: 'condition', label: 'Condition', width: 150 }
]

function setupRace() {
  const allHorseIds = horses.value.map(h => h.id)
  selectedHorses.value = [...allHorseIds].sort(() => Math.random() - 0.5).slice(0, 10)

  store.dispatch('race/generateRaceProgram')

  showModal.value = true
  setupComplete.value = false

  setTimeout(() => closeModal(), 5000)
}

function closeModal() {
  showModal.value = false
  setupComplete.value = true
}

function refreshHorses() {
  store.dispatch('horses/randomizeConditions')
}
</script>

<style scoped>
.main-container {
  padding: 10px;
  max-width: 1400px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Setup Buttons */
.game-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.setup-race-btn {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  font-weight: 600;
  padding: 12px 24px;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  transition: all 0.3s ease;
}
.setup-race-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.refresh-btn {
  background: linear-gradient(135deg, #FF9800, #F57C00);
  color: white;
  font-weight: 600;
  padding: 12px 24px;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);
  transition: all 0.3s ease;
}
.refresh-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 152, 0, 0.4);
}

/* Horses List Section */
.horse-list-section {
  flex: 1;
  max-height: 80vh;
  overflow: hidden;
  border-radius: 12px;
  padding: 15px 20px;
  backdrop-filter: blur(10px);
  background: rgba(76, 175, 80, 0.05);
}

/* Modal */
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
  color: #4CAF50;
}

.close-btn {
  margin-top: 8px;
}

/* Race Layout */
.race-simulation {
  display: flex;
  gap: 0;
  height: calc(100vh - 20px);
}

.race-track-container {
  flex: 3;
  display: flex;
  flex-direction: column;
}

.race-schedule-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
