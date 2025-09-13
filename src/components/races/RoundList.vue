<template>
  <div class="rounds-list-section">
    <h3 class="rounds-title">Race Program</h3>
    <div class="rounds-grid-six">
      <div v-for="round in rounds" :key="round.id" class="round-card">
        <div class="round-header">
          <h4>{{ getOrdinalNumber(round.id) }} Lap</h4>
          <span class="distance">{{ round.distance }}m</span>
        </div>
        <div class="assigned-horses-table">
          <table class="horses-table">
            <tbody>
              <tr v-for="(horse, index) in round.selectedHorses" :key="horse.id">
                <td class="position-cell">
                  <span class="position-number">{{ index + 1 }}</span>
                </td>
                <td class="horse-name-cell">
                  <div class="horse-avatar-small" :style="{ backgroundColor: horse.color || '#ccc' }">
                    🐎
                  </div>
                  {{ horse.name }}
                </td>
                <td class="horse-condition-cell">
                  <span class="condition-badge" :style="{ backgroundColor: getConditionColor(horse.condition || 0) }">
                    {{ horse.condition || 0 }}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import type { Round } from '../../types/round'

const store = useStore()
const rounds = computed<Round[]>(() => store.getters['race/rounds'])

function getConditionColor(condition: number): string {
  if (condition >= 80) return '#4CAF50'
  if (condition >= 60) return '#FFC107'
  if (condition >= 40) return '#FF9800'
  return '#F44336'
}

function getOrdinalNumber(num: number): string {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const value = num % 100
  const suffix = suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]
  return num + suffix
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

/* Table Styles for Rounds */
.assigned-horses-table {
  margin-top: 4px;
  overflow-x: auto;
}

.horses-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.7rem;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.horses-table td {
  padding: 2px 4px;
  border-bottom: 1px solid #e0e0e0;
  vertical-align: middle;
}

.horses-table tbody tr:hover {
  background: #f8f9fa;
}

.position-cell {
  text-align: center;
  width: 20px;
}

.position-number {
  display: inline-block;
  color: #666;
  font-size: 0.7rem;
  font-weight: 600;
  text-align: center;
}

.horse-name-cell {
  display: flex;
  align-items: center;
  gap: 3px;
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.65rem;
}

.horse-avatar-small {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.5rem;
  color: white;
  font-weight: bold;
}

.horse-condition-cell {
  text-align: center;
}

.condition-badge {
  display: inline-block;
  padding: 1px 3px;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  font-size: 0.5rem;
  min-width: 20px;
  text-align: center;
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
