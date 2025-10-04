import {State} from "./state.ts";



export class PossibilityManager {
  getRandom(state: State): Possibility[] {
    // const filteredPossibilities = allPossibilities.filter((el) => el.canActivate());

    // get 3 random possibilities
    // Example:
    // get random number from 1 to 100: 68
    // collect all weights [2, 1]
    // 2+1 = 3
    // 68 % 3 = 2
    // 1st is chosen
    return []
  }

}

export interface PossibilityOption {
  title: string
  applyEffects: (state: State) => void
}

export interface Possibility {
  title: string
  getWeight: (state: State) => number
  canActivate: () => boolean
  options: PossibilityOption[]
}

const allPossibilities: Possibility[] = [
  {
    title: "Buy house",
    options: [
      {
        title: 'cheap',
        applyEffects: (state: State) => {

        }
      }
    ],
    canActivate: () => {
      return true;
    },
    getWeight: (state: State)=>  {
      if (state.character.balance < 1000) {
        return 0
      }
      return 1
    }
  }
]
