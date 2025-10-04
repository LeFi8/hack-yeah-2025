import {State} from "../../state";
import type {Possibility} from "../possibility";
import {Engineer} from "../../work";

export class WorkEngineer implements Possibility {
  title = "You decided to become a software engineer";

  getOptions(_state: State) {
    return [
      {
        title: 'Software Engineer - B2B',
        applyEffects: (state: State) => {
          state.job = new Engineer('B2B', 1)
        }
      },
      {
        title: 'Software Engineer - Civil law contract',
        applyEffects: (state: State) => {
          state.job = new Engineer('UZ', 1)
        }
      },
      {
        title: 'Software Engineer - Unregistered work',
        applyEffects: (state: State) => {
          state.job = new Engineer('UNREGISTERED', 1)
        }
      },
    ];
  }

  canActivate = (state: State) => {
    return !state.job && state.education.level.get() >= 2;
  };
  getWeight = (_state: State) => {
    return 100
  }
}