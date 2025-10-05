import { State } from "../state";

export interface PossibilityOption {
  title: string;
  applyEffects: (state: State) => void;
}

export class Possibility {
  title: string;

  constructor(protected readonly state: State) {}

  getWeight: () => number;
  canActivate: () => boolean;
  getOptions: () => PossibilityOption[];
}
