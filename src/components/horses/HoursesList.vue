<template>
  <div class="horses-list">
    <h2>Horses List</h2>
    <div class="table-container">
      <Table :columns="columns" :rows="horses" row-key="id" empty-text="Kayıt bulunamadı.">
        <template #cell="{ col, row, value }">
          <template v-if="col.key === 'color'">
            <span v-if="row.color" class="color-indicator" :style="{ backgroundColor: row.color }"></span>
            <span v-else class="no-color">No Color</span>
          </template>
          <template v-else>
            {{ value }}
          </template>
        </template>
      </Table>
    </div>
  </div>
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
  }
}
</script>

<style scoped>
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
</style>