<template>
  <div class="rounds-list-section">
    <h3 class="rounds-title">Race Program</h3>
    <div class="rounds-flex-container">
      <div v-for="round in rounds" :key="round.id" class="round-card" :class="{
        'clickable': !round.isCompleted && !raceStarted,
        'current-round': round.id === currentRound,
        'completed-round': round.isCompleted
      }">
        <div class="round-header">
          <h4>{{ getOrdinalNumber(round.id) }} Lap</h4>
          <span class="distance">{{ round.distance }}m</span>
        </div>
        <RoundTable :horses="round.selectedHorses || []" :isCurrentRound="round.id === currentRound"
          :isCompleted="round.isCompleted || false" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import type { Round } from '../../types/round'
import RoundTable from './RoundTable.vue'
import { getOrdinalNumber } from '../../utils/index.ts'

const store = useStore()
const rounds = computed<Round[]>(() => store.getters['race/rounds'])
const currentRound = computed(() => store.getters['race/currentRound'])
const raceStarted = computed(() => store.getters['race/raceStarted'])

</script>

<style scoped>
.rounds-list-section {
  border-radius: 10px;
  animation: slideInUp 0.5s ease-out;
  width: 100%;
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 15px;
  box-sizing: border-box;
}

.rounds-title {
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
}

.rounds-flex-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 0;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;
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
  flex-shrink: 0;
  position: relative;
}

.round-card.clickable {
  cursor: pointer;
}

.round-card.clickable:hover {
  border-color: #4CAF50;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.15);
  transform: translateY(-1px);
}

.round-card.current-round {
  border-color: #2196F3;
  background: #e3f2fd;
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.2);
}

.round-card.completed-round {
  border-color: #4CAF50;
  background: #e8f5e8;
  opacity: 0.8;
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

.round-click-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(76, 175, 80, 0.9);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.6rem;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 10;
}

.round-card.clickable:hover .round-click-hint {
  opacity: 1;
}

.round-actions {
  margin-top: 8px;
  display: flex;
  justify-content: center;
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
