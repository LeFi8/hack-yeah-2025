import { State } from "../../state";
import type { Possibility } from "../possibility";
import {Cat, type Item} from "../../items";
import {Girlfriend} from "../../items/list/partners/girlfriend.ts";
import {Wife} from "../../items/list/partners/wife.ts";

export class Wedding implements Possibility {
    title = "Time to get married!";
    getOptions(_state: State) {
        return [
            {
                title: `It's your day! Extravagant wedding with 200 guests, live band and open bar`,
                applyEffects: (state: State) => {
                    state.character.happiness.add(100)
                    state.character.balance -= 50000
                    const girlfriend = state.items.find((i: Item) => (i instanceof Girlfriend)) as Girlfriend
                    if (girlfriend) {
                        state.removeItem(girlfriend)
                        state.addItem(new Wife())
                    }
                }
            },
            {
                title: 'Small wedding with close friends and family',
                applyEffects: (state: State) => {
                    state.character.happiness.add(100)
                    state.character.balance -= 10000
                    const girlfriend = state.items.find((i: Item) => (i instanceof Girlfriend)) as Girlfriend
                    if (girlfriend) {
                        state.removeItem(girlfriend)
                        state.addItem(new Wife())
                    }
                }
            },
        ]
    }
    canActivate = (state: State) => {
        return !state.items.some(i => i instanceof Cat)
    };
    getWeight = (_: State) => {
        return 1
    }
}
