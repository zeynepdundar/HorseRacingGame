import type { Horse } from '../../types/horse'
import { HORSES_DATA } from '../constants/horses'

export interface HorsesState {
  horses: Horse[]
}

const state: HorsesState = {
  horses: HORSES_DATA.map(h => ({
    ...h,
    condition: Math.floor(Math.random() * 100) + 1
  }))
}

export default {
  namespaced: true,
  state,
  getters: {
    allHorses: (state: HorsesState) => state.horses
  },
  mutations: {
    updateCondition(state: HorsesState, { id, condition }: { id: number; condition: number }) {
      const horse = state.horses.find(h => h.id === id)
      if (horse) horse.condition = condition
    }
  },
  actions: {
    randomizeConditions({ commit, state }) {
      state.horses.forEach(h => {
        commit('updateCondition', { id: h.id, condition: Math.floor(Math.random() * 100) + 1 })
      })
    }
  }
}
