<template>
  <div class="rounds-list-section">
    <h3 class="rounds-title">Race Program</h3>
    <div class="rounds-grid-six">
      <div v-for="round in rounds" :key="round.id" class="round-card">
        <div class="round-header">
          <h4>{{ getOrdinalNumber(round.id) }} Lap</h4>
          <span class="distance">{{ round.distance }}m</span>
        </div>
        <RoundTable :horses="round.selectedHorses || []" />
        <div class="round-actions">
          <Button 
            @click="startRound(round.id)" 
            variant="inner" 
            class="start-round-btn"
            :disabled="isRoundStarted(round.id)"
          >
            {{ isRoundStarted(round.id) ? '🏁 Started' : '▶️ Start Round' }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import type { Round } from '../../types/round'
import RoundTable from './RoundTable.vue'
import Button from '../ui/Button.vue'

const store = useStore()
const rounds = computed<Round[]>(() => store.getters['race/rounds'])
const currentRound = computed(() => store.getters['race/currentRound'])
const raceStarted = computed(() => store.getters['race/raceStarted'])

function getOrdinalNumber(num: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const value = num % 100
  const suffix = suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]
  return num + suffix
}

function startRound(roundId: number) {
  // Set the current round and start the race
  store.dispatch('race/startRace')
  store.commit('race/setCurrentRound', roundId)
  
  // Get horses for the selected round
  const round = rounds.value.find(r => r.id === roundId)
  if (round) {
    store.commit('race/setSelectedHorse', round.selectedHorses || [])
  }
}

function isRoundStarted(roundId: number): boolean {
  return raceStarted.value && currentRound.value >= roundId
}
</script>

<style scoped>
/* Rounds List Section */
.rounds-list-section {
  border-radius: 10px;
  animation: slideInUp 0.5s ease-out;
}

.rounds-title {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 700;
}

.rounds-grid-six {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin: 10px 0;
  width: 100%;
  padding: 0;
}

.round-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 8px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
}

.round-card:hover {
  border-color: #4CAF50;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.15);
}

.round-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  padding-bottom: 2px;
  border-bottom: 1px solid #e0e0e0;
}

.round-header h4 {
  margin: 0;
  color: #2c3e50;
  font-size: 0.8rem;
  font-weight: 700;
}

.distance {
  background: #f0f0f0;
  color: #666;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.6rem;
  font-weight: 500;
  border: 1px solid #ddd;
}

.round-actions {
  margin-top: 8px;
  display: flex;
  justify-content: center;
}

.start-round-btn {
  padding: 6px 12px !important;
  font-size: 0.7rem !important;
  min-width: auto !important;
  width: 100%;
  background: linear-gradient(145deg, #4CAF50, #45a049) !important;
  color: white !important;
  border-radius: 4px !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.3) !important;
  transition: all 0.2s ease !important;
}

.start-round-btn:hover:not(:disabled) {
  background: linear-gradient(145deg, #45a049, #4CAF50) !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.4) !important;
}

.start-round-btn:disabled {
  background: linear-gradient(145deg, #9E9E9E, #757575) !important;
  color: #BDBDBD !important;
  cursor: not-allowed !important;
  transform: none !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
}

/* Animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
