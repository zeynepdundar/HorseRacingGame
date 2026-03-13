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
  <div class="table-wrapper" :style="{ maxHeight: maxHeight || '550px' }">
    <table class="ui-table">
      <!-- Shared column widths — both thead and tbody use this -->
      <colgroup>
        <col style="width: 50px" />
        <col v-for="col in columns" :key="col.key"
          :style="{ width: col.width ? col.width + 'px' : undefined }" />
      </colgroup>

      <thead>
        <tr>
          <th class="col-index">#</th>
          <th v-for="col in columns" :key="col.key"
            :style="{ textAlign: (col.align ?? 'left') as any }">
            {{ col.label }}
          </th>
        </tr>
      </thead>

      <tbody v-if="hasRows">
        <tr v-for="(row, rIdx) in rows" :key="getRowKey(row, rIdx)" class="ui-row">
          <td class="col-index">{{ rIdx + 1 }}</td>
          <td v-for="col in columns" :key="col.key"
            :style="{ textAlign: (col.align ?? 'left') as any }">
            <slot name="cell"
              :row="row"
              :col="col"
              :value="col.formatter ? col.formatter(row[col.key], row, rIdx) : row[col.key]"
              :rowIndex="rIdx">
              {{ col.formatter ? col.formatter(row[col.key], row, rIdx) : row[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr>
          <td :colspan="columns.length + 1" class="empty">
            {{ emptyText ?? 'Kayıt bulunamadı.' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* ── Wrapper — scrolls vertically ──────────────────────── */
.table-wrapper {
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
}

.table-wrapper::-webkit-scrollbar {
  width: 4px;
}
.table-wrapper::-webkit-scrollbar-track {
  background: transparent;
}
.table-wrapper::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.18);
  border-radius: 2px;
}

/* ── Table ─────────────────────────────────────────────── */
.ui-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 4px;
  table-layout: fixed; /* colgroup widths are respected */
}

/* ── Header — sticky ───────────────────────────────────── */
.ui-table thead {
  position: sticky;
  top: 0;
  z-index: 10;
}

.ui-table th {
  padding: 10px 14px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
  color: #222;
  background: linear-gradient(135deg, #FF6B35, #FFD700);

  border-top: 2px solid #444;
  border-bottom: 2px solid #444;
}

.ui-table th:nth-child(2) {
  border-left: 2px solid #444;
  border-radius: 8px 0 0 8px;
}

.ui-table th:last-child {
  border-right: 2px solid #444;
  border-radius: 0 8px 8px 0;
}

/* ── Index column ──────────────────────────────────────── */
th.col-index {
  background: #111;
  color: #FFD700;
  border: 2px solid #FFD700 !important;
  border-radius: 8px !important;
  text-align: center;
  box-shadow: 0 0 6px rgba(255, 215, 0, 0.5);
  letter-spacing: 0;
}

td.col-index {
  text-align: center;
  font-weight: bold;
  color: #222;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  backdrop-filter: blur(6px);
}

/* ── Body cells ────────────────────────────────────────── */
.ui-table td {
  padding: 10px 14px;
  font-size: 0.85rem;
  color: #222;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(6px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

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

/* ── Hover ─────────────────────────────────────────────── */
.ui-row:hover td {
  background: rgba(255, 255, 255, 0.8) !important;
  transition: background 0.12s ease;
}

/* ── Empty state ───────────────────────────────────────── */
.empty {
  text-align: center;
  padding: 32px;
  color: rgba(0, 0, 0, 0.35);
  font-size: 0.85rem;
  background: transparent !important;
  border: none !important;
}
</style>