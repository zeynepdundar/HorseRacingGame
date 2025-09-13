<template>
  <div class="main-container">
    <!-- Horses List - Full-width Card -->
    <div class="horse-list-section">
      <div class="game-header">
        <h2>Racing Horses</h2>
        <p>Available horses for the race</p>
      </div>
      
      <div class="table-container">
        <table class="fancy-table">
          <thead class="table-header">
            <tr>
              <th class="horse-column">Horse</th>
              <th class="color-column">Color</th>
              <th class="condition-column">Condition</th>
            </tr>
          </thead>
        </table>
        <div class="table-body-scroll">
          <table class="fancy-table">
            <tbody v-if="horses.length > 0">
              <tr 
                v-for="horse in horses" 
                :key="horse.id"
                class="horse-row"
                :class="{ 'selected-horse': selectedHorses.includes(horse.id) }"
              >
                <td class="horse-cell">
                  <div class="horse-info">
                    <div class="horse-avatar" :style="{ backgroundColor: horse.color || '#ccc' }">
                      🐎
                    </div>
                    <span class="horse-name">{{ horse.name }}</span>
                  </div>
                </td>
                <td class="color-cell">
                  <div class="color-indicator" :style="{ backgroundColor: horse.color || '#ccc' }"></div>
                  <span class="color-name">{{ horse.color || 'Unknown' }}</span>
                </td>
                <td class="condition-cell">
                  <div class="condition-display">
                    <div class="condition-progress">
                      <div 
                        class="condition-fill" 
                        :style="{ 
                          width: `${horse.condition || 0}%`,
                          backgroundColor: getConditionColor(horse.condition || 0)
                        }"
                      ></div>
                    </div>
                    <span class="condition-value">
                      {{ horse.condition || 0 }}%
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="3" style="text-align:center; padding:20px; color:#888;">
                  🐎 No horses available yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="game-actions">
        <Button 
          @click="assignRandomHorses" 
                  variant="inner"
                  
        >
          ASSIGN RANDOM HORSES
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import Button from './ui/Button.vue'
import type { Horse } from '../types/horse'

const store = useStore()
const selectedHorses = ref<number[]>([])
const horses = computed<Horse[]>(() => store.getters['horses/allHorses'])

function assignRandomHorses() {
  selectedHorses.value = []
  const allHorseIds = horses.value.map(horse => horse.id)
  const shuffled = [...allHorseIds].sort(() => Math.random() - 0.5)
  selectedHorses.value = shuffled.slice(0, 10)
  alert(`10 horses have been randomly assigned for the race!`)
}

function getConditionColor(condition: number): string {
  if (condition >= 80) return '#4CAF50'
  if (condition >= 60) return '#FFC107'
  if (condition >= 40) return '#FF9800'
  return '#F44336'
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

.horse-list-section {
  background: #fff;
  border-radius: 10px;
  padding: 10px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
   max-height: 90vh
}

.game-header {
  text-align: left;
  margin: 0 0 8px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.game-header h2 {
  font-size: 1.6rem;
  color: #2c3e50;
  margin: 0;
  font-weight: 700;
}

.game-header p {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin: 0;
}

.table-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.table-header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.table-body-scroll {
  flex: 1;
  overflow-y: auto;
}

.table-body-scroll::-webkit-scrollbar {
  width: 8px;
}

.table-body-scroll::-webkit-scrollbar-thumb {
  background: #bbb;
  border-radius: 4px;
}

.fancy-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.fancy-table thead {
  background: #2c3e50;
  color: white;
}

.fancy-table th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
}

.fancy-table tbody tr {
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s;
}

.fancy-table tbody tr:nth-child(even) {
  background-color: #fafafa;
}

.fancy-table tbody tr:hover {
  background: #f8f9fa;
}

.fancy-table tbody tr.selected-horse {
  background: #f0fff4;
  border-left: 4px solid #4CAF50;
  position: relative;
}

.fancy-table td {
  padding: 10px 12px;
  vertical-align: middle;
}

.horse-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.horse-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: white;
  font-weight: bold;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
}

.horse-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #2c3e50;
}

.color-indicator {
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #ddd;
  margin-right: 8px;
  vertical-align: middle;
}

.color-name {
  font-size: 0.85rem;
  color: #555;
  text-transform: capitalize;
}

.condition-display {
  display: flex;
  align-items: center;
  gap: 8px;
}

.condition-progress {
  flex: 1;
  height: 8px;
  background: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
  min-width: 80px;
}

.condition-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.4s ease;
}

.condition-value {
  font-size: 0.8rem;
  font-weight: 600;
  color: #2c3e50;
  white-space: nowrap;
}

.game-actions {
  text-align: center;
  padding-top: 12px;
  border-top: 1px solid #e0e0e0;
}


</style>
