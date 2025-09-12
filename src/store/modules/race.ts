import type { Horse } from '../../types/horse'

export interface RaceState {
  round: number
  selectedHorses: Horse[]
  raceScheduled: boolean
}

const state: RaceState = {
  round: 0,
  selectedHorses: [],
  raceScheduled: false
}

export default {
  namespaced: true,
  state,
  mutations: {
    nextRound(state: RaceState, horses: Horse[]) {
      state.round++
      state.selectedHorses = horses
      state.raceScheduled = true
    },
    reset(state: RaceState) {
      state.round = 0
      state.selectedHorses = []
      state.raceScheduled = false
    }
  }
}
