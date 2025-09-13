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
          <tr>
            <th v-for="col in columns" :key="col.key"
              :style="{ textAlign: 'left', width: col.width ? String(col.width) : undefined }">
              {{ col.label }}
            </th>
          </tr>
        </thead>
      </table>
      
      <div class="table-body-scroll" :style="{ maxHeight: '550px' }">
        <table class="ui-table">
          <tbody v-if="hasRows">
            <tr v-for="(row, rIdx) in rows" :key="getRowKey(row, rIdx)" class="ui-row">
              <td v-for="col in columns" :key="col.key" :style="{ textAlign: (col.align ?? 'left') as any }">
                <slot name="cell" :row="row" :col="col" :value="col.formatter ? col.formatter(row[col.key], row, rIdx) : row[col.key]" :rowIndex="rIdx">
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
.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.table-container {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  margin-top: 8px;
  overflow: hidden;
  box-shadow: 
    0 4px 20px rgba(76, 175, 80, 0.15),
    0 1px 4px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(76, 175, 80, 0.1);
}

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
  border-collapse: collapse;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: white;
}

.ui-table thead {
  background: #2c3e50;
  color: white;
}

.ui-table th {
  padding: 8px 10px;
  text-align: left;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.ui-table tbody tr {
  border-bottom: 1px solid #f0f0f0;
}

.ui-table tbody tr:nth-child(even) {
  background-color: rgba(76, 175, 80, 0.03);
}

.ui-table tbody tr:hover {
  background-color: rgba(76, 175, 80, 0.08);
  transition: background-color 0.2s ease;
}

.ui-table td {
  padding: 6px 10px;
  vertical-align: middle;
}

.empty {
  text-align: center;
  padding: 20px 10px;
  color: #7f8c8d;
  font-style: italic;
  font-size: 0.85rem;
}

/* Horse avatar styles for when used in horse tables */
.horse-info {
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
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.horse-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #2c3e50;
}

.color-indicator {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.color-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #ddd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.color-name {
  font-size: 0.8rem;
  color: #555;
  text-transform: capitalize;
  font-weight: 500;
}

.condition-display {
  display: flex;
  align-items: center;
  gap: 8px;
}

.condition-progress {
  flex: 1;
  height: 8px;
  background: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
  min-width: 80px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.condition-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.4s ease;
  position: relative;
}

.condition-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.condition-value {
  font-size: 0.75rem;
  font-weight: 600;
  color: #2c3e50;
  white-space: nowrap;
  min-width: 30px;
  text-align: right;
}
</style>
