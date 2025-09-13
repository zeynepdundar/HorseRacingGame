<template>
  <div class="layout">
    <!-- <the-header :title="title" /> -->
    <main class="main-content" role="main">
      <div class="container">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import TheHeader from './TheHeader.vue'

defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>


<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  background-color: rgb(17, 129, 58);
  width: 100%;
}

.container {
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
    max-width: 100%;
  }
  
  .main-content {
    padding-top: 4rem; /* Account for smaller header on mobile */
  }
}
</style>