<template>
  <div class="horses-list-container">
    <header class="game-header">
      <div class="header-left">
        <div class="header-icon">🏇</div>
        <div class="header-text">
          <h2>Racing Roster</h2>
          <p class="subtitle">{{ horses.length }} horses</p>
        </div>
      </div>
      <div class="header-badge">
        <span class="badge-dot"></span>
        Live
      </div>
    </header>

    <Table :rows="horses" :columns="columns" maxHeight="550px">
      <template #cell="{ row, col }">

        <div v-if="col.key === 'horse'" class="horse-cell">
          <div class="horse-avatar" :style="{ '--hc': row.color || '#4CAF50' }">
            <span>🐎</span>
          </div>
          <div class="horse-info">
            <span class="horse-name">{{ row.name }}</span>
            <span class="horse-tag">#{{ String(row.id || '00').padStart(2, '0') }}</span>
          </div>
        </div>

        <div v-else-if="col.key === 'color'" class="color-cell">
          <div class="color-swatch" :style="{ '--sc': row.color || '#ccc' }"></div>
          <span class="color-name">{{ getColorName(row.color) }}</span>
        </div>

        <div v-else-if="col.key === 'condition'" class="condition-cell">
          <div class="condition-track">
            <div
              class="condition-fill"
              :style="{
                width: (row.condition || 0) + '%',
                '--bc': getConditionColor(row.condition || 0)
              }"
            ></div>
          </div>
          <span class="condition-value" :style="{ color: getConditionColor(row.condition || 0) }">
            {{ row.condition || 0 }}<span class="pct">%</span>
          </span>
        </div>

        <span v-else class="default-cell">{{ row[col.key] }}</span>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import Table from '../ui/Table.vue'
import { getColorName, getConditionColor } from '../../utils/index.ts'
import type { Horse } from '../../types/horse'

interface Column {
  key: string
  label: string
  width?: number
}

defineProps<{
  horses: Horse[]
  columns: Column[]
}>()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

/* ── Container ─────────────────────────────────────────── */
.horses-list-container {
  font-family: 'DM Sans', sans-serif;
  border-radius: 18px;
  overflow: hidden;

  /* Pure glass — no dark fill, just blur + faint white tint */
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(32px) saturate(180%) contrast(1.02);
  -webkit-backdrop-filter: blur(32px) saturate(180%) contrast(1.02);

  /* Wet edge — bright top, dim sides */
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-top: 1px solid rgba(255, 255, 255, 0.55);
  border-left: 1px solid rgba(255, 255, 255, 0.22);

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.45),
    inset 0 -1px 0 rgba(255, 255, 255, 0.06),
    inset 1px 0 0 rgba(255, 255, 255, 0.1),
    0 24px 60px rgba(0, 0, 0, 0.25),
    0 4px 16px rgba(0, 0, 0, 0.12);
}

/* ── Header ────────────────────────────────────────────── */
.game-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 18px;

  /* Wet surface reflection — brighter at top, fades down */
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.18) 0%,
    rgba(255, 255, 255, 0.04) 100%
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

/* Specular streak across header top */
.game-header::before {
  content: '';
  position: absolute;
  top: 0; left: 8%; right: 35%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon {
  font-size: 1.3rem;
  filter: drop-shadow(0 1px 3px rgba(0,0,0,0.3));
}

.header-text h2 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  /* Dark text — readable on bright glass over light track bg */
  color: rgba(10, 20, 10, 0.85);
  line-height: 1;
  text-shadow: 0 1px 0 rgba(255,255,255,0.4);
}

.subtitle {
  margin: 3px 0 0;
  font-family: 'DM Mono', monospace;
  font-size: 0.63rem;
  letter-spacing: 0.1em;
  color: rgba(0, 0, 0, 0.35);
}

.header-badge {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  color: rgba(20, 110, 40, 0.85);

  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-top-color: rgba(255, 255, 255, 0.65);
  border-radius: 20px;
  padding: 4px 10px;
  backdrop-filter: blur(8px);
}

.badge-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(30, 160, 60, 0.9);
  animation: blink 2.8s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 0.9; }
  50%       { opacity: 0.3; }
}

/* ── Row surfaces ──────────────────────────────────────── */
:deep(tr:nth-child(even) td) {
  background: rgba(255, 255, 255, 0.06);
}

:deep(tr:hover td) {
  background: rgba(255, 255, 255, 0.14) !important;
  transition: background 0.12s ease;
}

/* ── Horse cell ────────────────────────────────────────── */
.horse-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.horse-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 0.84rem;

  background:
    linear-gradient(145deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 100%),
    color-mix(in srgb, var(--hc) 50%, white);

  border: 1px solid rgba(255, 255, 255, 0.2);
  border-top-color: rgba(255, 255, 255, 0.7);

  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.6),
    inset 0 -1px 0 rgba(0, 0, 0, 0.08),
    0 3px 10px rgba(0, 0, 0, 0.15);
}

.horse-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.horse-name {
  font-size: 0.87rem;
  font-weight: 600;
  color: rgba(10, 20, 10, 0.82);
  letter-spacing: 0.02em;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 1px 0 rgba(255,255,255,0.5);
}

.horse-tag {
  font-family: 'DM Mono', monospace;
  font-size: 0.6rem;
  color: rgba(0, 0, 0, 0.28);
  letter-spacing: 0.08em;
}

/* ── Color cell ────────────────────────────────────────── */
.color-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-swatch {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  flex-shrink: 0;

  background:
    linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 55%),
    var(--sc, #ccc);

  border: 1px solid rgba(255, 255, 255, 0.15);
  border-top-color: rgba(255, 255, 255, 0.6);

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.5),
    0 2px 5px rgba(0, 0, 0, 0.15);
}

.color-name {
  font-size: 0.75rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
  text-transform: capitalize;
  letter-spacing: 0.02em;
}

/* ── Condition cell ────────────────────────────────────── */
.condition-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
}

.condition-track {
  flex: 1;
  height: 5px;
  border-radius: 3px;
  overflow: hidden;

  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-top-color: rgba(255, 255, 255, 0.5);

  box-shadow: inset 0 1px 2px rgba(0,0,0,0.12);
}

.condition-fill {
  height: 100%;
  border-radius: 3px;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 70%),
    var(--bc, #4ade80);
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.4);
}

.condition-value {
  font-family: 'DM Mono', monospace;
  font-size: 0.76rem;
  font-weight: 500;
  min-width: 34px;
  text-align: right;
  letter-spacing: 0.01em;
  filter: brightness(0.75);
}

.pct {
  font-size: 0.57rem;
  opacity: 0.6;
  margin-left: 1px;
}

/* ── Default cell ──────────────────────────────────────── */
.default-cell {
  font-size: 0.83rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.45);
}

/* ── Responsive ────────────────────────────────────────── */
@media (max-width: 768px) {
  .game-header     { padding: 12px 14px; }
  .horse-avatar    { width: 26px; height: 26px; }
  .horse-name      { font-size: 0.82rem; }
  .condition-track { height: 4px; }
  .condition-value { font-size: 0.72rem; min-width: 28px; }
  .header-text h2  { font-size: 0.92rem; }
}
</style>