<template>
  <header>
    <img :src="logo" alt="Logo" />
    <h1>{{ title }}</h1>
  </header>
</template>

<script setup>
import logo from '../../assets/logo.png'

defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
header {
  text-align: center;
  margin: 2rem auto;
}

header h1 {
  color: #ff6b35;
  margin: 0;
  font-size: 2.2rem;
  font-weight: 900;
  font-family: 'Arial Black', 'Helvetica', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  background-size: 200% 200%;
}

header img {
  height: 3.5rem;
  width: auto;
}

@media (max-width: 768px) {
  header {
    padding: 0 1rem;
    height: 4rem;
  }

  header h1 {
    font-size: 1.4rem;
  }

  header img {
    height: 2.5rem;
    margin-right: 0.75rem;
  }
}
</style>
