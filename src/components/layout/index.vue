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
  background:
    radial-gradient(circle at top, rgba(255, 225, 126, 0.18), transparent 28%),
    linear-gradient(180deg, #1f3044 0%, #223852 36%, #bb7428 100%);
  width: 100%;
  position: relative;
}


.main-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent),
    linear-gradient(90deg, rgba(10, 18, 33, 0.06), rgba(10, 18, 33, 0.16));
  z-index: 1;
}

.container {
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
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
