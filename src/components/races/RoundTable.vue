<template>
  <div class="assigned-horses-table" :class="{ 
    'current-round': isCurrentRound, 
    'completed-round': isCompleted 
  }">
    <table class="horses-table">
      <tbody>
        <tr v-for="(horse, index) in horses" :key="horse.id">
          <td class="position-cell">
            <span class="position-number">{{ index + 1 }}</span>
          </td>
          <td class="horse-name-cell">
            <div class="horse-avatar-small" :style="{ backgroundColor: horse.color || '#ccc' }">
              
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
import { getConditionColor } from '../../utils';

interface Props {
  horses: Horse[]
  isCurrentRound?: boolean
  isCompleted?: boolean
}

defineProps<Props>()

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
  transition: all 0.3s ease;
}

.horses-table td {
  padding: 2px 4px;
  border-bottom: 1px solid #e0e0e0;
  vertical-align: middle;
}

.horses-table tbody tr:hover {
  background: #f8f9fa;
}

/* Current round styling - darker background */
.assigned-horses-table.current-round .horses-table {
  background: #2c3e50;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.3);
}

.assigned-horses-table.current-round .horses-table td {
  border-bottom: 1px solid #34495e;
  color: white;
}

.assigned-horses-table.current-round .horses-table tbody tr:hover {
  background: #34495e;
}

.assigned-horses-table.current-round .position-number {
  color: #ecf0f1;
}

.assigned-horses-table.current-round .horse-name-cell {
  color: #ecf0f1;
}

/* Completed round styling - distinct completed appearance */
.assigned-horses-table.completed-round .horses-table {
  background: #e8f5e8;
  box-shadow: 0 1px 3px rgba(76, 175, 80, 0.2);
  border: 1px solid #4caf50;
}

.assigned-horses-table.completed-round .horses-table td {
  border-bottom: 1px solid #c8e6c9;
  color: #2e7d32;
}

.assigned-horses-table.completed-round .horses-table tbody tr:hover {
  background: #dcedc8;
}

.assigned-horses-table.completed-round .position-number {
  color: #1b5e20;
  font-weight: 700;
}

.assigned-horses-table.completed-round .horse-name-cell {
  color: #1b5e20;
  font-weight: 600;
}

.assigned-horses-table.completed-round .condition-badge {
  opacity: 0.8;
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
