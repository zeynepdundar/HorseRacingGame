import { createStore } from 'vuex'
import race from './modules/race'
import horses from './modules/horses'

const store = createStore({
  modules: {
    race,
    horses
  }
})

export default store
