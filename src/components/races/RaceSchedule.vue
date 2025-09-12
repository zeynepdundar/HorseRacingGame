<template>
  <div class="raceScheduled-content">
    <h2>Selected Horses (Round {{ round }} - {{ meters }}m)</h2>

    <Table :columns="columns" :rows="selectedHorses" row-key="id" empty-text="Seçilmiş at bulunamadı.">
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
</template>

<script>
import Button from '../ui/Button.vue'
import Table from '../ui/Table.vue'

export default {
  name: 'RaceSchedule',
  components: { Button, Table },
  props: {
    round: {
      type: Number,
      required: true
    },
    meters: {
      type: Number,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    selectedHorses: {
      type: Array,
      required: true
    }
  },
  emits: ['back'],
  methods: {
    onBack() {
      this.$emit('back')
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