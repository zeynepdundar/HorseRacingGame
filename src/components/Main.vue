<template>
  <div class="main-container">
    <!-- Horses List - Full-width Card -->
    <div class="horse-list-section">
      <div class="game-header">
        <div class="header-content">
          <div class="header-text">
            <h2>Racing Horses</h2>
            <p>Available horses for the race</p>
          </div>
          <Button 
            @click="randomizeHorseConditions" 
            variant="inner"
            class="randomize-btn"
          >
            🎲 Randomize Conditions
          </Button>
        </div>
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
          Start Race
        </Button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="showModal = false">
  <div class="modal-content" @click.stop>
    <header class="modal-header">
      <h3 class="modal-title">🎉 Horses Assigned!</h3>
      <button class="modal-close" @click="showModal = false" aria-label="Close">&times;</button>
    </header>

    <main class="modal-body">
      <p>
  {{ selectedHorses.length }} random horses have been successfully assigned to each round.
</p>
<p>
  Ready to start the race!
</p>

    </main>

    <footer class="modal-footer">
      <Button @click="showModal = false" variant="inner">
        Close
      </Button>
    </footer>
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
const showModal = ref<boolean>(false)
const horses = computed<Horse[]>(() => store.getters['horses/allHorses'])

function assignRandomHorses() {
  selectedHorses.value = []
  const allHorseIds = horses.value.map(horse => horse.id)
  const shuffled = [...allHorseIds].sort(() => Math.random() - 0.5)
  selectedHorses.value = shuffled.slice(0, 10)
  showModal.value = true
  setTimeout(() => {
    showModal.value = false
  }, 2000)
}

function randomizeHorseConditions() {
  store.dispatch('horses/randomizeConditions')
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
  margin: 0 0 8px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-text {
  text-align: left;
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

.randomize-btn {
  font-size: 0.85rem;
  padding: 8px 16px;
  white-space: nowrap;
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

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden;
  animation: slideIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e0e0e0;
  background: #f8f9fa;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.4rem;
  font-weight: 700;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  color: #7f8c8d;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #e0e0e0;
  color: #2c3e50;
}

.modal-body {
  padding: 24px;
  max-height: 50vh;
  overflow-y: auto;
}

.modal-body p {
  margin: 0 0 20px 0;
  color: #555;
  font-size: 1rem;
  text-align: center;
}

.selected-horses-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.selected-horse-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #4CAF50;
  transition: transform 0.2s;
}

.selected-horse-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.selected-horse-item .horse-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: white;
  font-weight: bold;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
}

.selected-horse-item span {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2c3e50;
}

.modal-footer {
  padding: 20px 24px;
  border-top: 1px solid #e0e0e0;
  text-align: center;
  background: #f8f9fa;
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

</style>
