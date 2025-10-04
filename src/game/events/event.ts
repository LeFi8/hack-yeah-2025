import type {State} from "../state.ts";

export interface Event {
  getWeight: (state: State) => number
  applyEffects: (state: State ) => void
  canActivate: () => boolean
  getTitle(): string
  getDescription(): string
}
