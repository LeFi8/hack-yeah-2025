import {State} from "../../state.ts";

export const purchaseCar = {
  title: "Purchase car",
  options: [
    {
      title: 'cheap',
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