<template>
  <div class="assigned-horses-table">
    <table class="horses-table">
      <tbody>
        <tr v-for="(horse, index) in horses" :key="horse.id">
          <td class="position-cell">
            <span class="position-number">{{ index + 1 }}</span>
          </td>
          <td class="horse-name-cell">
            <div class="horse-avatar-small" :style="{ backgroundColor: horse.color || '#ccc' }">
              ��
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
</template>

<script setup lang="ts">
import type { Horse } from '../../types/horse'

interface Props {
  horses: Horse[]
}

defineProps<Props>()

function getConditionColor(condition: number): string {
  if (condition >= 80) return '#4CAF50'
  if (condition >= 60) return '#FFC107'
  if (condition >= 40) return '#FF9800'
  return '#F44336'
}
</script>

<style scoped>
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
</style>
