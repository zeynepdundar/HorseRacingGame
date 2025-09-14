<script setup>
import { ref } from "vue"
import Layout from './components/layout/index.vue'
import Main from './components/Main.vue'
import Landing from './components/Landing.vue'

const started = ref(false)
</script>

<template>
  <Landing v-if="!started" @start="started = true" />
  <Layout v-else title="Horse Racing">
    <Main />
  </Layout>
</template>
