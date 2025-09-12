import type { Horse } from './horse'

export interface Round {
  id: number;
  selectedHorses?: Horse[];
  distance: number;
}