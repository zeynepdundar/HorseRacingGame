<template>
  <div class="horses-list-container">
    <header class="game-header">
      <div class="header-text">
        <h2>Racing Horses</h2>
        <p>Available horses: {{ horses.length }}</p>
      </div>
    </header>

    <Table :rows="horses" :columns="columns" maxHeight="550px">
      <template #cell="{ row, col }">
        <!-- Horse column -->
        <div v-if="col.key === 'horse'" class="horse-cell">
          <div class="horse-avatar" :style="{ backgroundColor: row.color || '#4CAF50' }">🐎</div>
          <span class="horse-name">{{ row.name }}</span>
        </div>

        <!-- Color column -->
        <div v-else-if="col.key === 'color'" class="color-cell">
          <div class="color-dot" :style="{ backgroundColor: row.color || '#ccc' }"></div>
          <span class="color-name">{{ row.color || 'Unknown' }}</span>
        </div>

        <!-- Condition column -->
        <div v-else-if="col.key === 'condition'" class="condition-cell">
          <div class="condition-progress">
            <div class="condition-fill" :style="{ width: `${row.condition || 0}%`, backgroundColor: getConditionColor(row.condition || 0) }"></div>
          </div>
          <span class="condition-percentage">{{ row.condition || 0 }}%</span>
        </div>

        <!-- Default cell -->
        <span v-else>{{ row[col.key] }}</span>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import Table from '../ui/Table.vue'
import { getConditionColor } from '../../utils/index.ts'
import type { Horse } from '../../types/horse'

interface Column {
  key: string
  label: string
  width?: number
}

defineProps<{
  horses: Horse[]
  columns: Column[]
}>()

</script>

<style scoped>
.horses-list-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Header */
.game-header {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 6px;
}

.header-text h2 {
  margin: 0;
  font-size: 1.4rem;
  color: #2c3e50;
  font-weight: 700;
}

.header-text p {
  margin: 0;
  font-size: 0.85rem;
  color: #7f8c8d;
}

/* Horse cell */
.horse-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.horse-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: white;
  font-weight: bold;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.horse-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #2c3e50;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Color cell */
.color-cell {
  display: flex;
  align-items: center;
  gap: 6px;
}

.color-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #ddd;
}

.color-name {
  font-size: 0.8rem;
  color: #555;
  text-transform: capitalize;
}

/* Condition cell */
.condition-cell {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 120px;
}

.condition-progress {
  flex: 1;
  height: 16px;
  background: #ecf0f1;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.condition-fill {
  height: 100%;
  border-radius: 8px;
  transition: width 0.6s ease;
}

.condition-percentage {
  font-size: 0.75rem;
  font-weight: 700;
  color: #2c3e50;
  min-width: 28px;
  text-align: right;
}

/* Responsive */
@media (max-width: 768px) {
  .horse-avatar { width: 20px; height: 20px; font-size: 0.8rem; }
  .horse-name { font-size: 0.8rem; }
  .condition-progress { height: 14px; }
  .condition-percentage { font-size: 0.7rem; min-width: 25px; }
}
</style>
