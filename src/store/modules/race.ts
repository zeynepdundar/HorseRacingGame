import type { Horse } from "../../types/horse";
import { Race } from "../../types/race";

const state: Race = {
  rounds: [],
  currentRound: 0,
  raceScheduled: false,
  selectedHorses: [],
};

export default {
  namespaced: true,
  state,
  getters: {
    selectedHorses: (state: Race) => state.selectedHorses || [],
    raceScheduled: (state: Race) => !!state.raceScheduled,
    currentRound: (state: Race) => state.currentRound,
  },
  mutations: {
    setSelectedHorse(state, horses: Horse[]) {
      state.selectedHorses = horses;
    },
    setRound(state: Race) {
      state.currentRound++;
      state.raceScheduled = true;
    },
    resetRace(state: Race) {
      state.currentRound = 0;
      state.rounds = [];
      state.selectedHorses = [];
      state.raceScheduled = false;
    },
  },
  actions: {
    generateRound({ commit, rootState }) {
      const shuffled = [...rootState.horses.horses].sort(
        () => 0.5 - Math.random()
      );
      commit("setSelectedHorse", shuffled.slice(0, 10));
      commit("setRound");
    },
    resetRace({ commit }) {
      commit("resetRace");
    },
  },
};