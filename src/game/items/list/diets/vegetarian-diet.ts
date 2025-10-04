import {Diet} from "./diet.ts";
import type {State} from "../../../state.ts";

export class VegetarianDiet extends Diet {
    monthlyCost = 100

    applyMonthlyEffects(state: State) {
        state.character.physicalHealth.add(1)
        state.character.happiness.add(-1)
    }
}