import type { Horse } from "../../types/horse";
import type { Round } from "../../types/round";
import { Race } from "../../types/race";
import { ROUND_LENGTHS } from "../constants/rounds";

const state: Race = {
  rounds: [],
  currentRound: 0,
  raceScheduled: false,
  raceStarted: false
};

export default {
  namespaced: true,
  state,
  getters: {
    raceScheduled: (state: Race) => !!state.raceScheduled,
    raceStarted: (state: Race) => !!state.raceStarted,
    currentRound: (state: Race) => state.currentRound,
    rounds: (state: Race) => state.rounds,
  },
  mutations: {
    setRounds(state: Race, rounds: Round[]) {
      state.rounds = rounds;
    },

    setRaceStarted(state: Race, started: boolean) {
      state.raceStarted = started;
    },
    setRound(state: Race) {
      state.currentRound++;
      state.raceScheduled = true;
    },
    setCurrentRound(state: Race, roundNumber: number) {
      state.currentRound = roundNumber;
      state.raceScheduled = roundNumber > 0;
    },
    markRoundCompleted(state: Race, roundId: number) {
      const round = state.rounds.find(r => r.id === roundId);
      if (round) {
        round.isCompleted = true;
      }
    },
    resetRace({ commit }) {
      //commit("resetRace");
    },

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
          isCompleted: false,
        };
      });

      commit("setRounds", rounds);
      commit("setCurrentRound", 1);
    },
    resetRace({ commit }) {
      commit("resetRace");
    },

    startRace({ state, commit }) {
      if (!state.rounds.length) return;
    
      // Start the race
      commit("setRaceStarted", true);
    
      // Initialize to the first round
      commit("setCurrentRound", 1);
    
    },
    nextRound({ state, commit }) {
      if (!state.rounds.length || !state.raceStarted) return;
    
      // Mark the current round as completed
      commit("markRoundCompleted", state.currentRound);
    
      // If there is a round after the current one, select its horses
      const nextRoundIndex = state.currentRound; // component will increment currentRound
      if (nextRoundIndex < state.rounds.length) {

      } else {
        // Race finished
        commit("setRaceStarted", false);
      }
    }
    
  },
};
