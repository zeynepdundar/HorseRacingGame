<template>
  <div class="horses-list">
    <h2>Horses List</h2>
    <div class="table-container">
      <Table
        :columns="columns"
        :rows="horses"
        row-key="id"
        empty-text="Kayıt bulunamadı."
      >
        <template #cell="{ col, row, value }">
          <template v-if="col.key === 'color'">
            <span 
              v-if="row.color" 
              class="color-indicator" 
              :style="{ backgroundColor: row.color }"
            ></span>
            <span v-else class="no-color">No Color</span>
          </template>
          <template v-else>
            {{ value }}
          </template>
        </template>
      </Table>
    </div>
    <div class="button-container">
      <Button @click="handleButtonClick">GENERATE</Button>
    </div>
  </div>
</template>

<script>
import horsesData from '../../mock/horses.json'
import Button from '../ui/Button.vue'
import Table from '../ui/Table.vue'

export default {
  name: 'HoursesList',
  components: {
    Button,
    Table
  },
  data() {
    return {
      horses: horsesData,
      columns: [
        { key: 'name', label: 'Horse' },
        { key: 'color', label: 'Color', width: 120 },
        { key: 'condition', label: 'Condition' }
      ]
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

}
</style>