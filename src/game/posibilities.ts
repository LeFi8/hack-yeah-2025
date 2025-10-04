import {State} from "./state.ts";



export class PossibilityManager {
  getRandom(state: State): Possibility[] {
    const filteredPossibilities = allPossibilities.filter((possibility) => possibility.canActivate());
    
    if (filteredPossibilities.length === 0) {
      return [];
    }
    
    const weightedPossibilities = filteredPossibilities.map(possibility => ({
      possibility,
      weight: possibility.getWeight(state)
    })).filter(item => item.weight > 0);
    
    if (weightedPossibilities.length === 0) {
      return [];
    }
    
    const selectedPossibilities: Possibility[] = [];
    const availablePossibilities = [...weightedPossibilities];
    
    for (let i = 0; i < 3 && availablePossibilities.length > 0; i++) {
      const totalWeight = availablePossibilities.reduce((sum, item) => sum + item.weight, 0);
      
      if (totalWeight === 0) break;
      
      const randomValue = Math.random() * totalWeight;
      
      let currentWeight = 0;
      let selectedIndex = 0;
      
      for (let j = 0; j < availablePossibilities.length; j++) {
        currentWeight += availablePossibilities[j].weight;
        if (randomValue <= currentWeight) {
          selectedIndex = j;
          break;
        }
      }
      
      const selected = availablePossibilities.splice(selectedIndex, 1)[0];
      selectedPossibilities.push(selected.possibility);
    }
    
    return selectedPossibilities;
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

export const allPossibilities: Possibility[] = [
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
        return 1
      }
      return 2
    }
  },
  {
    title: "Buy car",
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
        return 1
      }
      return 2
    }
  },
  {
    title: "Go for the holidays",
    options: [
      {
        title: '1 week',
        applyEffects: (state: State) => {

        }
      },
      {
        title: '1 year',
        applyEffects: (state: State) => {

        }
      }
    ],
    canActivate: () => {
      return true;
    },
    getWeight: (state: State)=>  {
      if (state.character.balance < 1000) {
        return 1
      }
      return 2
    }
  }
]
