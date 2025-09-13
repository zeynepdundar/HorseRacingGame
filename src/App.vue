<script setup>
import { ref } from "vue"   // ✅ add this line
import Layout from './components/layout/index.vue'
import Main from './components/Main.vue'
import Landing from './components/Landing.vue'

const started = ref(false)
</script>

<template>
  <!-- Show Landing full screen if game not started -->
  <Landing v-if="!started" @start="started = true" />

  <!-- After start, show Layout with Main -->
  <Layout v-else title="Horse Racing">
    <Main />
  </Layout>
</template>
