import type { State } from "../state";

export class Event {
  constructor(protected readonly state: State) {}

  getWeight: () => number;
  applyEffects: () => void;
  canActivate: () => boolean;
  getTitle: () => string;
  getDescription: () =>  string;
}
