import { State } from "../state";

export interface PossibilityOption {
  title: string;
  applyEffects: (state: State) => void;
}

export interface Possibility {
  title: string;
  getWeight: (state: State) => number;
  canActivate: (state: State) => boolean;
  options: PossibilityOption[];
}
