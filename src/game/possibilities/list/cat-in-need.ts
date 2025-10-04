import {State} from "../../state";
import type {Possibility} from "../possibility.ts";
import {Cat} from "../../items";

export class CatInNeed implements Possibility {
    title = "You found homeless cat. It looks hungry and cold";
    options = [
        {
            title: 'Adopt it',
            applyEffects: (state: State) => {
                state.addItem(new Cat())
            }
        },
        {
            title: 'Carry it to shelter',
            applyEffects: (state: State) => {
                state.character.happiness.add(2)
            }
        },
    ];
    canActivate = (state: State) => {
        return !state.items.some(i => i instanceof Cat)
    };
    getWeight = (_: State) => {
        return 1
    }
}