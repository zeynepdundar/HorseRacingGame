import type { Horse } from '../../types/horse'
import { Race } from '../../types/race'


const state: Race = {
  rounds: [],
  currentRound: 0,
  raceScheduled: false
}

export default {
  namespaced: true,
  state,
  mutations: {
    nextRound(state: Race, horses: Horse[]) {
      state.currentRound++
     // state.selectedHorses = horses
      state.raceScheduled = true
    },
    reset(state: Race) {
      state.currentRound = 0
      //state.selectedHorses = []
      state.raceScheduled = false
    }
  }
}
