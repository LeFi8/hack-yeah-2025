import type {State} from "../state.ts";

export interface Event {
  title: string,
  getWeight: (state: State) => number
  applyEffects: (state: State ) => void
  canActivate: () => boolean
}
