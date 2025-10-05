import { State } from "../state";

export interface PossibilityOption {
  title: string;
  applyEffects: (state: State) => void;
}

export abstract class Possibility {
  title: string = '';

  constructor(protected readonly state: State) {}

  abstract getWeight(): number;
  abstract canActivate(): boolean;
  abstract getOptions(): PossibilityOption[];
}
