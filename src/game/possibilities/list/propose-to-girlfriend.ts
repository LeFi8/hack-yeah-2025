import { State } from "../../state";
import type { Possibility } from "../possibility";
import {Girlfriend} from "../../items/list/partners/girlfriend.ts";
import type {Item} from "../../items";

export class ProposeToGirlfriend implements Possibility {
    title = "About your relationship";
    getOptions(_state: State) {
        return [
            {
                title: "Propose to your girlfriend",
                applyEffects: (state: State) => {
                    const girlfriend = state.items.find((item: Item) => item instanceof Girlfriend ) as Girlfriend;
                    if (girlfriend) {
                        girlfriend.isEngaged = true;
                    }
                },
            },
            {
                title: "Maybe later...",
                applyEffects: (state: State) => {
                    const girlfriend = state.items.find((item: Item) => item instanceof Girlfriend ) as Girlfriend;
                    if (girlfriend) {
                        girlfriend.resignedFromProposing = true;
                    }
                },
            },
        ];
    }
    canActivate = (state: State) => {
        return !state.items.some((item: Item) => (item instanceof Girlfriend && item.monthsToMarriageDecision <= 0 && !item.resignedFromProposing && !item.isEngaged) );
    };
    getWeight = (_: State) => {
        return 3;
    };
}
