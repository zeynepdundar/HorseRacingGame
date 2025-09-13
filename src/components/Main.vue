<template>
  <div class="main-container">
    <!-- Horses List -->
    <div class="horse-list-section" v-if="!raceScheduled">
      <HoursesList :horses="horses" :columns="columns" />
      <div class="button-container">
        <Button @click="handleGenerate">GENERATE</Button>
      </div>
    </div>

    <!-- Race Schedule -->
    <div class="race-track-section" v-else>
      <div v-for="r in rounds" :key="r.id" style="margin-bottom: 16px;">
        <RaceSchedule :selected-horses="r.selectedHorses || []" :round="r.id" :meters="r.distance" :columns="columns"
          @back="reset" />
        <div style="text-align:center; margin-top:12px;">

        </div>
      </div>
      <Button @click="startRace">START</Button>

      <Button @click="reset">Back</Button>
    </div>

    <div class="race-track-wrapper" v-if="raceStarted">
      <div class="race-track-container">
        <RaceTrack :rounds="rounds" :current-round="currentRound" :race-started="raceStarted" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import RaceSchedule from './races/RaceSchedule.vue'
import RaceTrack from './races/RaceTrack.vue'
import HoursesList from './horses/HoursesList.vue'
import Button from './ui/Button.vue'
import type { Horse } from '../types/horse'


const store = useStore()

const raceScheduled = computed(() => store.getters['race/raceScheduled'])
const currentRound = computed(() => store.getters['race/currentRound'])
const rounds = computed(() => store.getters['race/rounds'])
const raceStarted = computed(() => store.getters['race/raceStarted'])
console.log("dsds",raceScheduled)

const horses = computed<Horse[]>(() => store.getters['horses/allHorses'])


// table columns
const columns = [
  { key: 'name', label: 'Horse' },
  { key: 'color', label: 'Color', width: 120 },
  { key: 'condition', label: 'Condition' }
]

// actions
function handleGenerate() {
  store.dispatch('race/generateRaceProgram')
}
function reset() {
  store.dispatch('race/resetRace')
}
function startRace() {
  store.dispatch('race/startRace')
}
</script>

<style scoped>
.main-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.horse-list-section {
  border: 1px solid #ccc;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 20px;
}

.race-track-section {
  border: 1px solid #ccc;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .main-container {
    padding: 15px;
  }

  .horse-list-section {
    margin-bottom: 15px;
  }
}
</style>