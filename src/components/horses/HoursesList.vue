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
    <div class="button-container">
      <Button @click="handleButtonClick">GENERATE</Button>
    </div>
  </div>
</template>

<script>
import horsesData from '../../mock/horses.json'
import Button from '../ui/Button.vue'

export default {
  name: 'HoursesList',
  components: {
    Button
  },
  data() {
    return {
      horses: horsesData
    }
  },
  methods: {
    handleButtonClick() {

    }
  }
}
</script>

<style scoped>
.horses-list {
  padding: 20px;
  margin: 0 auto;
}

.horses-list h2 {
  color: #333;
  margin-bottom: 15px;
  text-align: center;
}

.table-container {
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
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
  padding: 8px 12px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
  font-size: 14px;
}

.horses-table td {
  padding: 6px 12px;
  border-bottom: 1px solid #dee2e6;
  vertical-align: middle;
  font-size: 14px;
}

.horse-row:hover {
  background-color: #f8f9fa;
}

.color-indicator {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #ddd;
  margin-right: 6px;
  vertical-align: middle;
}

.no-color {
  color: #6c757d;
  font-style: italic;
  font-size: 13px;
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

.button-container {
  text-align: center;
  margin-top: 20px;
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
