// TODO: applyMonthlyChanges, and remainingMonths
import { State } from "../state";

export interface Item {
  // type: 'person' | 'car' | 'house' | 'work'
  // applyEffects: (state: State) => void,
  iconUrl?: string;
  monthlyCost?: number;
  applyMonthlyEffects: (state: State) => void;
}
