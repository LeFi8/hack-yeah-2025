import {State} from "../../state.ts";

export const goForHolidays = {
  title: "Go for the holidays",
  options: [
    {
      title: '1 week',
      applyEffects: (_state: State) => {

      }
    },
    {
      title: '1 year',
      applyEffects: (_state: State) => {

      }
    }
  ],
  canActivate: () => {
    return true;
  },
  getWeight: (state: State) => {
    if (state.character.balance < 1000) {
      return 1
    }
    return 2
  }
}
