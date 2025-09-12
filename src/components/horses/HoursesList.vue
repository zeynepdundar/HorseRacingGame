<template>
  <div v-if="!raceScheduled" class="horses-list">
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
    <div class="button-container">
      <Button @click="handleButtonClick">GENERATE</Button>
    </div>
  </div>

  <div v-else class="raceScheduled-container">
    <RaceSchedule :selectedHorses="selectedHorses" :round="round" :columns="columns" @back="reset" />
  </div>
</template>

<script>
import horsesData from '../../mock/horses.json'
import Button from '../ui/Button.vue'
import Table from '../ui/Table.vue'
import RaceSchedule from '../races/RaceSchedule.vue'

export default {
  name: 'HorsesList',
  components: {
    Button,
    Table,
    RaceSchedule
  },
  data() {
    return {
      raceScheduled: false,
      round: 0,
      // set condition to horses randomly
      horses: horsesData.map(h => ({
        ...h,
        condition: Math.floor(Math.random() * 100) + 1
      })), columns: [
        { key: 'name', label: 'Horse' },
        { key: 'color', label: 'Color', width: 120 },
        { key: 'condition', label: 'Condition' }
      ],
      selectedHorses: []
    }
  },
  methods: {
    handleButtonClick() {
      this.generateProgram()
      this.raceScheduled = true
    },

    generateProgram() {
      this.round++
      this.selectedHorses = this.select10Horses()
    },

    select10Horses() {
      const shuffled = [...this.horses].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, 10)
    },

    reset() {
      this.raceScheduled = false
      this.selectedHorses = []
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