<script setup>
import { computed } from 'vue'

const props = defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, required: true },
  rowKey: { type: [String, Function], default: null },
  emptyText: { type: String, default: 'Kayıt bulunamadı.' }
})

const getRowKey = (row, index) => {
  if (!props.rowKey) return index
  if (typeof props.rowKey === 'string') return row[props.rowKey] ?? index
  return props.rowKey(row, index)
}

const hasRows = computed(() => props.rows && props.rows.length > 0)
</script>

<template>
  <div class="table-wrapper">
    <table class="ui-table">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            :style="{ textAlign:'left', width: col.width ? String(col.width) : undefined }"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>

      <tbody v-if="hasRows">
        <tr v-for="(row, rIdx) in rows" :key="getRowKey(row, rIdx)" class="ui-row">
          <td
            v-for="col in columns"
            :key="col.key"
            :style="{ textAlign: col.align ?? 'left' }"
          >
            <slot
              name="cell"
              :row="row"
              :col="col"
              :value="col.formatter ? col.formatter(row[col.key], row, rIdx) : row[col.key]"
              :rowIndex="rIdx"
            >
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
</template>

<style scoped>

.ui-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.ui-table th {
  background: #f8f9fa;
  color: #495057;
  font-weight: 600;
  padding: 8px 12px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
  font-size: 14px;
}

.ui-table td {
  padding: 6px 12px;
  border-bottom: 1px solid #dee2e6;
  vertical-align: middle;
  font-size: 14px;
}

.ui-row:hover {
  background-color: #f8f9fa;
}

.empty {
  text-align: center;
  color: #6c757d;
  padding: 12px;
  font-style: italic;
}
</style>
