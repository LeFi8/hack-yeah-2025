import type { State } from "../state";

export interface Event {
  getWeight: (state: State) => number;
  applyEffects: (state: State) => void;
  canActivate: (state: State) => boolean;
  getTitle(): string;
  getDescription(): string;
}
