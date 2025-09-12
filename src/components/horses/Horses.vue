<script setup lang="ts">
import { ref } from 'vue'
import { Horse } from '../../types/horse'
import { HORSES_DATA } from '../../store/constants/horses'

const horses = ref<Horse[]>(HORSES_DATA)

// Randomly assign colorCondition if missing
const colors = ['red', 'blue', 'green', 'yellow', 'purple']

horses.value.forEach((h: Horse) => {
  if (!h.color) {
    h.color= colors[Math.floor(Math.random() * colors.length)]
  }
})
</script>