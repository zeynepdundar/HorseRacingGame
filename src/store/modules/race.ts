import type { Horse } from "../../types/horse";
import type { Round } from "../../types/round";
import { Race } from "../../types/race";
import { ROUND_LENGTHS } from "../constants/rounds";

const state: Race = {
  rounds: [],
  currentRound: 0,
  raceScheduled: false,
};

export default {
  namespaced: true,
  state,
  getters: {
    selectedHorses: (state: Race) => state.selectedHorses || [],
    raceScheduled: (state: Race) => !!state.raceScheduled,
    currentRound: (state: Race) => state.currentRound,
    rounds: (state: Race) => state.rounds,
  },
  mutations: {
    setRounds(state: Race, rounds: Round[]) {
      state.rounds = rounds;
    },
    setSelectedHorse(state: Race, horses: Horse[]) {
      //state.rounds[currentRound].selectedHorses = horses;
    },
    setRound(state: Race) {
      state.currentRound++;
      state.raceScheduled = true;
    },
    setCurrentRound(state: Race, roundNumber: number) {
      state.currentRound = roundNumber;
      state.raceScheduled = roundNumber > 0;
    },
    resetRace(state: Race) {
      state.currentRound = 0;
      state.rounds = [];
      state.selectedHorses = [];
      state.raceScheduled = false;
    },
    // start
  },
  actions: {
    generateRaceProgram({ commit, rootState }) {
      const allHorses: Horse[] = [...rootState.horses.horses];

      // Create 6 round
      // Each round has different 10 horse randomly created
      const rounds: Round[] = ROUND_LENGTHS.map((distance, idx) => {
        const shuffled = [...allHorses].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);
        return {
          id: idx + 1,
          distance,
          selectedHorses: selected,
        };
      });

      commit("setRounds", rounds);
      // İlk turu ekranda göstermek için seçili atları ve tur numarasını ayarla
      commit("setSelectedHorse", rounds[0]?.selectedHorses || []);
      commit("setCurrentRound", 1);
    },
    resetRace({ commit }) {
      commit("resetRace");
    },
  },
};
