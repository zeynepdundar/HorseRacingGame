<template>
  <div class="main-container">
    <!-- Horses List -->
    <div class="horse-list-section" v-if="!raceScheduled">
      <HoursesList 
        :horses="horses" 
        :columns="columns" 
      />
      <div class="button-container">
        <Button @click="handleGenerate">GENERATE</Button>
      </div>
    </div>

    <!-- Race Schedule -->
    <div class="race-track-section" v-else>
      <RaceSchedule 
        :selected-horses="selectedHorses" 
        :round="round" 
        :columns="columns" 
        @back="reset" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RaceSchedule from './races/RaceSchedule.vue'
import Button from './ui/Button.vue'
import horsesData from '../mock/horses.json'
import type { Horse } from '../types/horse'
import HoursesList from './horses/HoursesList.vue'

// reactive state
const raceScheduled = ref(false)
const round = ref(0)
const selectedHorses = ref<Horse[]>([])

// table columns
const columns = [
  { key: 'name', label: 'Horse' },
  { key: 'color', label: 'Color', width: 120 },
  { key: 'condition', label: 'Condition' }
]

// horses with random condition
const horses = ref<Horse[]>(
  horsesData.map(h => ({
    ...h,
    condition: Math.floor(Math.random() * 100) + 1
  }))
)

function handleGenerate() {
  round.value++
  selectedHorses.value = select10Horses()
  raceScheduled.value = true
}

function select10Horses(): Horse[] {
  const shuffled = [...horses.value].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 10)
}


function reset() {
  raceScheduled.value = false
  selectedHorses.value = []
  round.value = 0
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

/* Responsive */
@media (max-width: 768px) {
  .main-container {
    padding: 15px;
  }

  .horse-list-section {
    margin-bottom: 15px;
  }
}
</style>
