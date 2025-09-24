<script setup lang="ts">
import { computed } from 'vue'

interface Column {
  key: string
  label: string
  width?: number
  align?: string
  formatter?: (value: any, row: any, index: number) => any
}

const props = defineProps<{
  columns: Column[]
  rows: any[]
  rowKey?: string | ((row: any, index: number) => string | number)
  emptyText?: string
  maxHeight?: string
}>()

defineSlots<{
  cell: (props: { row: any; col: Column; value: any; rowIndex: number }) => any
}>()

const getRowKey = (row, index) => {
  if (!props.rowKey) return index
  if (typeof props.rowKey === 'string') return row[props.rowKey] ?? index
  return props.rowKey(row, index)
}

const hasRows = computed(() => props.rows && props.rows.length > 0)
</script>

<template>
  <div class="table-wrapper">
    <div class="table-container" :style="{ '--max-height': maxHeight }">
      <table class="ui-table">
        <thead class="table-header">
          <!-- Position column -->
          <th style="width: 60px; text-align: center;">#</th>

          <th v-for="col in columns" :key="col.key"
            :style="{ textAlign: 'left', width: col.width ? String(col.width) : undefined }">
            {{ col.label }}
          </th>
        </thead>
      </table>

      <div class="table-body-scroll" :style="{ maxHeight: '550px' }">
        <table class="ui-table">
          <tbody v-if="hasRows">

            <tr v-for="(row, rIdx) in rows" :key="getRowKey(row, rIdx)" class="ui-row">
              <td style="text-align: center; font-weight: bold;">
                {{ rIdx + 1 }}
              </td>
              <td v-for="col in columns" :key="col.key" :style="{ textAlign: (col.align ?? 'left') as any }">
                <slot name="cell" :row="row" :col="col"
                  :value="col.formatter ? col.formatter(row[col.key], row, rIdx) : row[col.key]" :rowIndex="rIdx">
                  {{ col.formatter ? col.formatter(row[col.key], row, rIdx) : row[col.key] }}
                </slot>
              </td>
            </tr>
          </tbody>

          <tbody v-else>
            <tr>
              <td :colspan="columns.length" class="empty">
                {{ emptyText ?? 'Kayıt bulunamadı.' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: linear-gradient(135deg, #2e7d32, #388e3c);
  color: white;
  box-shadow: 0 2px 8px rgba(46, 125, 50, 0.3);
}

.table-body-scroll {
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
}

.table-body-scroll::-webkit-scrollbar {
  width: 6px;
}

.table-body-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.table-body-scroll::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.table-body-scroll::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.ui-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 2px 5px;
}

/* HEADER */
.ui-table thead {
  background: transparent;
}

.ui-table th {
  padding: 12px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  text-align: left;
  color: #222;
}

/* İlk header hücresi (# gibi) */
.ui-table th:first-child {
  background: #111;
  color: #FFD700;
  border: 2px solid #FFD700;
  border-radius: 8px;
  text-align: center;
  width: 50px;
  box-shadow: 0 0 6px rgba(255, 215, 0, 0.6);
}

/* Diğer header hücreleri -> birleşik border kutusu */
.ui-table th:not(:first-child) {
  border-top: 2px solid #444;
  border-bottom: 2px solid #444;
  background: linear-gradient(135deg, #FF6B35, #FFD700);
  color: #222;
  font-weight: 600;
}

.ui-table th:nth-child(2) {
  border-left: 2px solid #444;
  border-radius: 8px 0 0 8px;
}

.ui-table th:last-child {
  border-right: 2px solid #444;
  border-radius: 0 8px 8px 0;
}

/* BODY ROWS */
.ui-table td {
  padding: 10px 15px;
  font-size: 0.85rem;
  background: rgba(255, 255, 255, 0.6); /* semi-transparent white */
  color: #222; /* dark text for contrast */
  backdrop-filter: blur(6px);
}

/* İlk sütun (# gibi) */
.ui-table td:first-child {
  border-radius: 8px;
  text-align: center;
  width: 50px;
  font-weight: bold;
}

/* Diğer hücreler -> ortak border kutusu */
.ui-table td:not(:first-child) {
  border-top: 2px solid #444;
  border-bottom: 2px solid #444;
}

.ui-table td:nth-child(2) {
  border-left: 2px solid #444;
  border-radius: 8px 0 0 8px;
}

.ui-table td:last-child {
  border-right: 2px solid #444;
  border-radius: 0 8px 8px 0;
}

/* Condition sütunu highlight */
.ui-table td:nth-child(4) {
  font-weight: bold;
  color: #FF6B35;
  text-shadow: 1px 1px 0 #000;
}
</style>
