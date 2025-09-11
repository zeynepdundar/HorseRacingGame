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
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.horse-list-section {
  border: 1px solid #ccc;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 20px;
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
    padding: 15px;
  }
  
  .horse-list-section {
    margin-bottom: 15px;
  }
}
</style>


