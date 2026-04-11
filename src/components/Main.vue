<template>
  <div class="main-container">
    <!-- Setup Actions -->
    <section v-if="!setupComplete" class="game-setup">
      <div class="setup-shell">
        <div class="game-actions">
          <Button @click="setupRace">Setup Race</Button>
          <Button @click="refreshHorses" variant="secondary">Refresh Horses</Button>
        </div>

        <p class="setup-caption">Prepare the roster, review horse conditions, and launch the race.</p>
      </div>

      <!-- Horses List -->
      <HoursesList v-if="horses.length" :horses="horses" :columns="columns" />
    </section>

    <!-- Setup Complete Modal -->
    <Modal v-if="showModal" @close="closeModal">
      <template #title>Race Ready!</template>
      <p>{{ rounds[0].selectedHorses.length }} random horses have been assigned to the rounds.</p>
      <p class="ready-text">Ready to start the race!</p>
    </Modal>

    <!-- Race Simulation -->
    <section v-if="setupComplete" class="race-simulation">
      <aside class="race-track-container">
        <RaceTrack 
          :rounds="rounds" 
          :current-round="currentRound" 
          :race-started="raceStarted" 
          @scroll-to-next-round="handleScrollToNextRound"
          @exit-to-landing="handleExitToLanding"
        />
      </aside>
      <aside class="race-schedule-container">
        <RaceSchedule 
          ref="raceScheduleRef"
          :rounds="rounds" 
          :current-round="currentRound"
        />
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
import Modal from './ui/Modal.vue'

const store = useStore()
const emit = defineEmits<{
  exitToLanding: []
}>()

// state
const showModal = ref(false)
const setupComplete = ref(false)
const raceScheduleRef = ref()

// derived state
const horses = computed<Horse[]>(() => store.getters['horses/allHorses'])
const rounds = computed(() => store.getters['race/rounds'])
const currentRound = computed(() => store.getters['race/currentRound'])
const raceStarted = computed(() => store.getters['race/raceStarted'])

// table config
const columns = [
  { key: 'horse', label: 'Horse', width: 200 },
  { key: 'color', label: 'Color', width: 120 },
  { key: 'condition', label: 'Condition', width: 150 }
]

// actions
function setupRace() {
  store.dispatch('race/generateRaceProgram')
  showModal.value = true
  setupComplete.value = false
}

function closeModal() {
  showModal.value = false
  setupComplete.value = true
}

function refreshHorses() {
  store.dispatch('horses/randomizeConditions')
}

// Handle scroll to next round
function handleScrollToNextRound(roundNumber: number) {
  if (raceScheduleRef.value) {
    raceScheduleRef.value.scrollToRound(roundNumber)
  }
}

function handleExitToLanding() {
  emit('exitToLanding')
}
</script>

<style
  scoped>
  .main-container {
    padding: 18px 14px;
    max-width: 1400px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .game-setup {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .setup-shell {
    align-self: center;
    width: min(920px, 100%);
    padding: 18px 20px 16px;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(15, 25, 45, 0.54);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.18);
  }

  .game-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .setup-caption {
    margin: 12px 0 0;
    text-align: center;
    color: rgba(255, 255, 255, 0.68);
    font-size: 0.88rem;
  }

  .ready-text {
    font-weight: bold;
    margin: 12px 0 20px;
    color: #4CAF50;
  }

  /* Race Layout */
  .race-simulation {
    display: flex;
    gap: 2rem;
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
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    .main-container {
      padding: 14px 10px;
    }

    .setup-shell {
      padding: 14px;
      border-radius: 20px;
    }
  }
</style>
