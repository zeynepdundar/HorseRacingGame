<template>
  <div class="main-container">
    <div class="horse-list-section">
      <HoursesList></HoursesList>
    </div>

    <div class="race-track-section">
      Racing
    </div>
  </div>
</template>

<script setup lang="ts">
import HoursesList from './horses/HoursesList.vue';

</script>

<style scoped>
.main-container {
  display: grid;
  grid-template-columns: 1fr 2fr; /* Horse list takes 1/3, race track takes 2/3 */
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.horse-list-section {
  border: 1px solid #ccc;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  justify-self: start; /* Align to left */
}

.race-track-section {
  border: 1px solid #ccc;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

/* Responsive design for smaller screens */
@media (max-width: 768px) {
  .main-container {
    grid-template-columns: 1fr; /* Stack vertically on mobile */
    gap: 15px;
    padding: 15px;
  }
}
</style>


