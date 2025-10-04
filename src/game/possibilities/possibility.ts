import {State} from "../state.ts";

export interface PossibilityOption {
  title: string
  applyEffects: (state: State) => void
}

export interface Possibility {
  title: string
  getWeight: (state: State) => number
  canActivate: () => boolean
  options: PossibilityOption[]
}