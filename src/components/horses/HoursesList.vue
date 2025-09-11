<template>
  <div class="horses-list">
    <h2>Horses List</h2>
    <div class="table-container">
      <table class="horses-table">
        <thead>
          <tr>
            <th>Horse</th>
            <th>Color</th>
            <th>Condition</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="horse in horses" :key="horse.id" class="horse-row">
            <td>{{ horse.name }}</td>
            <td>
              <span 
                v-if="horse.color" 
                class="color-indicator" 
                :style="{ backgroundColor: horse.color }"
              ></span>
              <span v-else class="no-color">No Color</span>
            </td>
            <td>{{ horse.condition }}</td>

          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import horsesData from '../../mock/horses.json'

export default {
  name: 'HoursesList',
  data() {
    return {
      horses: horsesData
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.horses-list {
  padding: 20px;
  max-width: 600px; /* Reduced from 1000px */
  margin: 0; /* Changed from 0 auto to align left */
}

.horses-list h2 {
  color: #333;
  margin-bottom: 20px;
  text-align: left; /* Changed from center to left */
}

.table-container {
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.horses-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.horses-table th {
  background: #f8f9fa;
  color: #495057;
  font-weight: 600;
  padding: 12px 16px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
}

.horses-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #dee2e6;
  vertical-align: middle;
}

.horse-row:hover {
  background-color: #f8f9fa;
}

.color-indicator {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ddd;
  margin-right: 8px;
  vertical-align: middle;
}

.no-color {
  color: #6c757d;
  font-style: italic;
}

.btn-primary {
  background: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-primary:active {
  background: #004085;
}

@media (max-width: 768px) {
  .horses-list {
    padding: 10px;
  }
  
  .horses-table th,
  .horses-table td {
    padding: 8px 12px;
    font-size: 14px;
  }
}
</style>
