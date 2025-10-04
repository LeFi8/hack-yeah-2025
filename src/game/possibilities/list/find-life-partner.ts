import { State } from "../../state";
import type { Possibility } from "../possibility";
import {RomanticPartner} from "../../items/list/partners/romantic-partner.ts";
import {Girlfriend} from "../../items/list/partners/girlfriend.ts";
import {Friend} from "../../items/list/friend.ts";

export class FindLifePartner implements Possibility {
    title = "New person in your life";
    getOptions(_state: State) {
        return [
            {
                title: "Become romantic partners",
                applyEffects: (state: State) => {
                    state.addItem(new Girlfriend());
                },
            },
            {
                title: "Not interested in relationship",
                applyEffects: (state: State) => {
                    state.addItem(new Friend());
                },
            },
        ];
    }
    canActivate = (state: State) => {
        return !state.items.some((i) => i instanceof RomanticPartner) && state.focus.relation.get();
    };
    getWeight = (_: State) => {
        return 3;
    };
}
