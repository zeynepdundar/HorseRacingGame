<script setup lang="ts">
import { computed, ref } from 'vue'
import { Motion } from '@motionone/vue'
import {
  Trophy,
  Search,
  ChevronDown,
  ChevronUp
} from 'lucide-vue-next'
import { getColorName, getConditionColor } from '../../utils/index.ts'
import type { Horse } from '../../types/horse'

type SortKey = 'name' | 'color' | 'condition' | null
type SortOrder = 'asc' | 'desc'

const props = defineProps<{
  horses: Horse[]
  columns?: Array<{ key: string; label: string; width?: number }>
}>()

const sortBy = ref<SortKey>(null)
const sortOrder = ref<SortOrder>('asc')
const searchTerm = ref('')

function handleSort(column: Exclude<SortKey, null>) {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    return
  }

  sortBy.value = column
  sortOrder.value = 'asc'
}

function getConditionLabel(condition?: number) {
  const value = condition ?? 0
  if (value >= 90) return 'Peak'
  if (value >= 80) return 'Excellent'
  if (value >= 65) return 'Strong'
  if (value >= 50) return 'Good'
  return 'Fair'
}

function getConditionTextColor(condition?: number) {
  const value = condition ?? 0
  if (value >= 80) return '#86efac'
  if (value >= 65) return '#7dd3fc'
  if (value >= 50) return '#fcd34d'
  return '#fca5a5'
}

function getConditionBarBackground(condition?: number) {
  const value = condition ?? 0
  if (value >= 80) return 'linear-gradient(90deg, #22c55e, #10b981)'
  if (value >= 65) return 'linear-gradient(90deg, #3b82f6, #06b6d4)'
  if (value >= 50) return 'linear-gradient(90deg, #eab308, #f59e0b)'
  return 'linear-gradient(90deg, #ef4444, #f97316)'
}

const filteredAndSortedHorses = computed(() => {
  const normalizedSearch = searchTerm.value.trim().toLowerCase()

  return [...props.horses]
    .filter((horse) => {
      if (!normalizedSearch) return true

      return (
        horse.name.toLowerCase().includes(normalizedSearch) ||
        getColorName(horse.color || '').toLowerCase().includes(normalizedSearch) ||
        getConditionLabel(horse.condition).toLowerCase().includes(normalizedSearch)
      )
    })
    .sort((a, b) => {
      if (!sortBy.value) return 0

      if (sortBy.value === 'condition') {
        const aValue = a.condition ?? 0
        const bValue = b.condition ?? 0
        return sortOrder.value === 'asc' ? aValue - bValue : bValue - aValue
      }

      const aValue =
        sortBy.value === 'color'
          ? getColorName(a.color || '').toLowerCase()
          : a.name.toLowerCase()
      const bValue =
        sortBy.value === 'color'
          ? getColorName(b.color || '').toLowerCase()
          : b.name.toLowerCase()

      if (aValue === bValue) return 0
      if (sortOrder.value === 'asc') return aValue < bValue ? -1 : 1
      return aValue > bValue ? -1 : 1
    })
})
</script>

<template>
  <section class="roster-screen">
    <div class="roster-screen__grid"></div>

    <Motion
      class="roster-screen__header"
      :initial="{ opacity: 0, y: -20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5 }"
    >
      <div class="roster-screen__title-wrap">
        <div class="roster-screen__title-badge">
          <Trophy :size="24" />
        </div>
        <div>
          <h2 class="roster-screen__title">Horse Roster</h2>
          <p class="roster-screen__subtitle">
            {{ filteredAndSortedHorses.length }} horses available
          </p>
        </div>
      </div>

      <label class="roster-screen__search">
        <Search :size="18" class="roster-screen__search-icon" />
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search horses..."
        />
      </label>
    </Motion>

    <Motion
      class="roster-screen__table-shell"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 0.5, delay: 0.2 }"
    >
      <div class="roster-screen__table-wrap">
        <table class="roster-table">
          <thead>
            <tr>
              <th class="roster-table__index">#</th>
              <th @click="handleSort('name')">
                <span>Name</span>
                <span class="roster-table__sort">
                  <ChevronUp
                    :size="14"
                    :class="{ 'is-active': sortBy === 'name' && sortOrder === 'asc' }"
                  />
                  <ChevronDown
                    :size="14"
                    :class="{ 'is-active': sortBy === 'name' && sortOrder === 'desc' }"
                  />
                </span>
              </th>
              <th @click="handleSort('color')">
                <span>Color</span>
                <span class="roster-table__sort">
                  <ChevronUp
                    :size="14"
                    :class="{ 'is-active': sortBy === 'color' && sortOrder === 'asc' }"
                  />
                  <ChevronDown
                    :size="14"
                    :class="{ 'is-active': sortBy === 'color' && sortOrder === 'desc' }"
                  />
                </span>
              </th>
              <th @click="handleSort('condition')">
                <span>Condition</span>
                <span class="roster-table__sort">
                  <ChevronUp
                    :size="14"
                    :class="{ 'is-active': sortBy === 'condition' && sortOrder === 'asc' }"
                  />
                  <ChevronDown
                    :size="14"
                    :class="{ 'is-active': sortBy === 'condition' && sortOrder === 'desc' }"
                  />
                </span>
              </th>
            </tr>
          </thead>

          <tbody v-if="filteredAndSortedHorses.length">
            <tr v-for="horse in filteredAndSortedHorses" :key="horse.id">
              <td class="roster-table__index">{{ horse.id }}</td>
              <td>
                <div class="horse-cell">
                  <div
                    class="horse-cell__avatar"
                    :style="{ '--horse-avatar-color': horse.color || '#9d9720' }"
                  >
                    🐴
                  </div>
                  <span class="horse-cell__name">{{ horse.name }}</span>
                </div>
              </td>
              <td>
                <div class="color-cell">
                  <span
                    class="color-cell__swatch"
                    :style="{ backgroundColor: horse.color || '#999999' }"
                  ></span>
                  <span>{{ getColorName(horse.color || '') }}</span>
                </div>
              </td>
              <td>
                <div class="condition-cell">
                  <div class="condition-cell__meta">
                    <span>{{ getConditionLabel(horse.condition) }}</span>
                    <span>{{ horse.condition ?? 0 }}%</span>
                  </div>
                  <div class="condition-cell__track">
                    <div
                      class="condition-cell__fill"
                      :style="{
                        width: `${horse.condition ?? 0}%`,
                        background: getConditionBarBackground(horse.condition)
                      }"
                    ></div>
                  </div>
                  <span
                    class="condition-cell__value"
                    :style="{ color: getConditionTextColor(horse.condition) }"
                  >
                    {{ getConditionLabel(horse.condition) }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>

          <tbody v-else>
            <tr>
              <td colspan="4" class="roster-table__empty">No horses match your search.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Motion>
  </section>
</template>

<style scoped>
.roster-screen {
  position: relative;
  min-height: 100%;
  overflow: hidden;
  padding: 12px 0 0;
}

.roster-screen__grid {
  position: absolute;
  inset: 0;
  opacity: 0.12;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 64px 64px;
}

.roster-screen__header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.roster-screen__title-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
}

.roster-screen__title-badge {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(255, 217, 102, 0.24), rgba(187, 116, 40, 0.34));
  color: #ffd966;
  border: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.16);
}

.roster-screen__title {
  margin: 0;
  color: #ffffff;
  font-size: 2rem;
  font-weight: 900;
  font-style: italic;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.roster-screen__subtitle {
  margin: 6px 0 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.9rem;
}

.roster-screen__search {
  position: relative;
  display: flex;
  align-items: center;
}

.roster-screen__search input {
  width: min(320px, 80vw);
  padding: 12px 16px 12px 42px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  outline: none;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.roster-screen__search input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.roster-screen__search-icon {
  position: absolute;
  left: 14px;
  color: rgba(255, 255, 255, 0.55);
}

.roster-screen__table-shell {
  position: relative;
  z-index: 1;
}

.roster-screen__table-wrap {
  overflow: auto;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(15, 25, 45, 0.7);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.roster-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 760px;
}

.roster-table thead th {
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 18px 20px;
  background: rgba(10, 18, 33, 0.88);
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.roster-table thead th:not(.roster-table__index) {
  cursor: pointer;
  user-select: none;
}

.roster-table thead th:not(.roster-table__index):hover {
  color: #ffd966;
}

.roster-table thead th span:first-child {
  display: inline-flex;
  align-items: center;
}

.roster-table tbody td {
  padding: 18px 20px;
  color: rgba(255, 255, 255, 0.88);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
}

.roster-table tbody tr:hover td {
  background: rgba(255, 255, 255, 0.05);
}

.roster-table__index {
  width: 64px;
  text-align: center;
  color: rgba(255, 255, 255, 0.56);
}

.roster-table__sort {
  display: inline-flex;
  flex-direction: column;
  vertical-align: middle;
  margin-left: 8px;
  line-height: 0.75;
}

.roster-table__sort :deep(svg) {
  color: rgba(255, 255, 255, 0.28);
}

.roster-table__sort :deep(.is-active) {
  color: #ffd966;
}

.horse-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.horse-cell__avatar {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--horse-avatar-color) 74%, white),
    color-mix(in srgb, var(--horse-avatar-color) 88%, black 12%)
  );
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18);
  font-size: 1.1rem;
}

.horse-cell__name {
  font-weight: 800;
  color: #ffffff;
}

.color-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.color-cell__swatch {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.26);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
}

.condition-cell {
  min-width: 220px;
}

.condition-cell__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.76rem;
  font-weight: 700;
}

.condition-cell__meta span:first-child {
  color: #ffffff;
}

.condition-cell__meta span:last-child {
  color: rgba(255, 255, 255, 0.6);
}

.condition-cell__track {
  width: 100%;
  height: 10px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
}

.condition-cell__fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.6s ease;
}

.condition-cell__value {
  display: inline-block;
  margin-top: 8px;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.roster-table__empty {
  padding: 36px 20px !important;
  text-align: center;
  color: rgba(255, 255, 255, 0.58) !important;
}

@media (max-width: 768px) {
  .roster-screen__header {
    align-items: stretch;
  }

  .roster-screen__search,
  .roster-screen__search input {
    width: 100%;
  }

  .roster-screen__title {
    font-size: 1.55rem;
  }
}
</style>
