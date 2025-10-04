import {State} from "../../state.ts";

export const purchaseHouse = {
  title: "Purchase house",
  options: [
    {
      title: 'cheap',
      applyEffects: (_state: State) => {
        _state.character.balance -= 5000
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