<template>
  <header>
    <img :src="logo" alt="Horse racing logo" />
    <h1>Horse Racing Game</h1>
  </header>
</template>

<script setup>
import logo from '../../assets/logo.png'

</script>

<style scoped>
header {
  text-align: center;
  margin: 3rem auto;
}

header h1 {
  color: #d81c1c;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 800;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  text-transform: uppercase;
}

header img {
  height: 3.5rem;
  width: auto;
}

/* Responsive design */
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