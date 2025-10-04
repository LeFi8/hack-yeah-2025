import { State } from "../../state";
import type { Possibility } from "../possibility";
import {Car} from "../../items/list/car.ts";

export class GetNewCar implements Possibility {
    title = "You need a new car";
    getOptions(_state: State) {
        return [
            {
                title: 'Buy a new cheap car (10 000 PLN)',
                applyEffects: (state: State) => {
                    state.character.balance -= 10000;
                    state.addItem(new Car(500, false))
                }
            },
            {
                title: 'Buy a new expensive car (100 000 PLN)',
                applyEffects: (state: State) => {
                    state.character.balance -= 100000;
                    state.addItem(new Car(1500, false))
                }
            },
            {
                title: "Lease an expensive car",
                applyEffects: (state: State) => {
                    state.addItem(new Car(3000, true))
                }
            }
        ]
    }
    canActivate = (state: State) => {
        return !state.items.some(i => i instanceof Car)
    };
    getWeight = (_: State) => {
        return 1
    }
}
