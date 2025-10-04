// TODO: applyMonthlyChanges, and remainingMonths
import {State} from "../state";

export interface Item {
  // type: 'person' | 'car' | 'house' | 'work'
  // applyEffects: (state: State) => void,
  // TODO: add icon url
  applyMonthlyEffects: (state: State) => void,
}