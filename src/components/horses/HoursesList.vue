<template>
  <div class="game-header">
    <div class="header-content">
      <div class="header-text">
        <h2>Racing Horses</h2>
        <p>Available horses for the race ({{ horses.length }} horses)</p>
      </div>
    </div>
  </div>

  <Table :rows="horses" :columns="columns" :maxHeight="'400px'">
    <!-- Special cell for horse icon and name -->
    <template #cell="{ row, col }">
      <div v-if="col.key === 'horse'" class="horse-icon-cell">
        <div class="horse-avatar" :style="{ backgroundColor: row.color || '#4CAF50' }">
          🐎
        </div>
        <span class="horse-name">{{ row.name }}</span>
      </div>

      <!-- Color column -->
      <div v-else-if="col.key === 'color'" class="color-cell">
        <div class="color-dot" :style="{ backgroundColor: row.color || '#ccc' }"></div>
        <span class="color-name">{{ row.color || 'Unknown' }}</span>
      </div>

      <!-- Condition column with percentage next to progress bar -->
      <div v-else-if="col.key === 'condition'" class="condition-cell">
        <div class="condition-container">
          <div class="condition-progress">
            <div class="condition-fill" :style="{
              width: `${row.condition || 0}%`,
              backgroundColor: getConditionColor(row.condition || 0)
            }"></div>
          </div>
          <span class="condition-percentage">{{ row.condition || 0 }}%</span>
        </div>
      </div>

      <!-- Default cell content for other columns -->
      <span v-else>{{ row[col.key] }}</span>
    </template>
  </Table>
</template>

<script>
import Table from '../ui/Table.vue'

export default {
  name: 'HorsesList',
  components: { Table },
  props: {
    horses: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  },
  setup() {
    const getConditionColor = (condition) => {
      if (condition >= 80) return '#4CAF50' // Green
      if (condition >= 60) return '#FF9800' // Orange
      if (condition >= 40) return '#FFC107' // Yellow
      return '#F44336' // Red
    }

    return {
      getConditionColor,
    }
  }
}
</script>

<style scoped>
.game-header {
  margin: 0 0 6px 0;
  padding-bottom: 6px;
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
  font-size: 1.4rem;
  color: #2c3e50;
  margin: 0;
  font-weight: 700;
}

.game-header p {
  font-size: 0.8rem;
  color: #7f8c8d;
  margin: 0;
}



/* Horse icon cell - compact single line */
.horse-icon-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 0;
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
  border: 1px solid rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
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
  padding: 2px 0;
}

.color-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #ddd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.color-name {
  font-size: 0.8rem;
  color: #555;
  text-transform: capitalize;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.condition-cell {
  padding: 2px 0;
  min-width: 120px;
  height: 20px;
  font-size: 0.8rem;
}

.condition-container {

  font-size: 0.8rem;
  gap: 6px;
}

.condition-progress {
  flex: 1;
  height: 16px;
  background: #ecf0f1;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
}

.condition-fill {
  height: 100%;
  border-radius: 8px;
  transition: width 0.6s ease;
  position: relative;
  min-width: 25px;
}

.condition-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: progressShimmer 2s infinite;
}

.condition-cell {
  @keyframes progressShimmer {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(100%);
    }
  }

  min-width: 100px;

  .condition-percentage {
    font-size: 0.75rem;
    font-weight: 700;
    color: #2c3e50;
    white-space: nowrap;
    min-width: 28px;
    text-align: right;
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .horse-icon-cell {
    gap: 6px;
  }

  .horse-avatar {
    width: 20px;
    height: 20px;
    font-size: 0.8rem;
  }

  .horse-name {
    font-size: 0.8rem;
  }

  .condition-cell {
    min-width: 100px;
  }

  .condition-progress {
    height: 14px;
  }

  .condition-percentage {
    font-size: 0.7rem;
    min-width: 25px;
  }
}
</style>