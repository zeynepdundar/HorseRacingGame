<template>
  <div class="main-container">
    <!-- Game Actions - Parent Level -->
    <div class="game-actions-container">
      <div class="game-actions">
        <Button @click="assignRandomHorses" variant="inner" class="start-race-btn">
          🏁 Start Race
        </Button>
        <Button @click="randomizeHorseConditions" variant="inner" class="randomize-btn">
          🎲 Randomize Conditions
        </Button>
      </div>
    </div>

    <!-- Horses List -->
    <div class="horse-list-section">
      <HoursesList :horses="horses" :columns="columns" />
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

          <div class="rounds-grid">
            <div v-for="round in rounds" :key="round.id" class="round-card">
              <div class="round-header">
                <h4>Round {{ round.id }}</h4>
                <span class="distance">{{ round.distance }}m</span>
              </div>
              <div class="assigned-horses">
                <div v-for="horse in round.selectedHorses" :key="horse.id" class="horse-chip">
                  <div class="horse-avatar-small" :style="{ backgroundColor: horse.color || '#ccc' }">
                    🐎
                  </div>
                  <span class="horse-name-small">{{ horse.name }}</span>
                </div>
              </div>
            </div>
          </div>

          <p class="ready-text">
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
import HoursesList from './horses/HoursesList.vue'


const store = useStore()
const selectedHorses = ref<number[]>([])
const showModal = ref<boolean>(false)
const horses = computed<Horse[]>(() => store.getters['horses/allHorses'])
const rounds = computed(() => store.getters['race/rounds'])

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

  showModal.value = true
  setTimeout(() => {
    showModal.value = false
  }, 5000) // Increased timeout to give time to see the cards
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
  background: #fff;
  border-radius: 10px;
  padding: 10px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: 80vh
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

.rounds-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin: 20px 0;
  max-height: 400px;
  overflow-y: auto;
}

.round-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
}

.round-card:hover {
  border-color: #4CAF50;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.15);
}

.round-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.round-header h4 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 700;
}

.distance {
  background: #4CAF50;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.assigned-horses {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.horse-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  background: white;
  padding: 6px 10px;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  font-size: 0.8rem;
  transition: all 0.2s ease;
}

.horse-chip:hover {
  background: #f0fff4;
  border-color: #4CAF50;
}

.horse-avatar-small {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: white;
  font-weight: bold;
}

.horse-name-small {
  font-weight: 600;
  color: #2c3e50;
  white-space: nowrap;
}

.ready-text {
  margin-top: 20px !important;
  font-weight: 600;
  color: #4CAF50 !important;
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
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
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
