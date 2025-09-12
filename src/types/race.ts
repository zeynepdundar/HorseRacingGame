import type { Round } from './round'

export interface Race {
  rounds: Round[]
  currentRound: number
  raceScheduled?: boolean
  selectedHorses?: { id: number; name: string; color: string; condition: number }[]
}
