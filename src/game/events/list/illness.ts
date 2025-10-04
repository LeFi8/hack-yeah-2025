import type {Event} from '../event'
import type {State} from '../../state'

export const illness: Event = {
  title: 'illness',
  canActivate: () => {
    return true;
  },
  applyEffects: (_state: State) => {
    // get ran dom duration - 3 months
    // get random damage - 1 - 5 points
    // state.character.balance -=  state.character.monthlyIncome * duratin;
    // state.character.physicalHealth -= damage
  },
  getWeight: (state: State) => {
    if (state.focus.health > 1) {
      return 1;
    }
    return 2
  }
}