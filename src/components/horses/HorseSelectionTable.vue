<!-- Horse Selection Table Component - Previously HoursesList in Main.vue -->
<template>
  <div class="horse-selection-table">
    <HoursesList :horses="horses" :columns="columns" />
    <div class="button-container">
      <Button @click="handleGenerate">GENERATE</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import HoursesList from './HoursesList.vue'
import Button from '../ui/Button.vue'
import type { Horse } from '../../types/horse'

interface Props {
  horses: Horse[]
}

defineProps<Props>()

const emit = defineEmits<{
  generate: []
}>()

// table columns
const columns = [
  { key: 'name', label: 'Horse' },
  { key: 'color', label: 'Color', width: 120 },
  { key: 'condition', label: 'Condition' }
]

function handleGenerate() {
  emit('generate')
}
</script>

<style scoped>
.horse-selection-table {
  border: 1px solid #ccc;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 20px;
}

.button-container {
  margin-top: 20px;
  text-align: center;
}
</style>
