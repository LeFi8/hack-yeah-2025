import {Hobby} from "./hobby";
import {State} from "../../../state";

export class JoggingHobby extends Hobby {
    monthlyCost = 50

    applyMonthlyEffects(state: State) {
        state.character.happiness.add(state.focus.hobby ? 1 : 2)
        state.character.physicalHealth.add(state.focus.hobby ? 1 : 2)
    }
}