import type { Round } from './round'

export interface Race {
  rounds: Round[]
  currentRound: number
  raceScheduled?: boolean
  raceStarted?: boolean
}
