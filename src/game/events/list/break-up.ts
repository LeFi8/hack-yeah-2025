import type { Event } from "../event";
import type { State } from "../../state";
import type { Item } from "../../items";
import {Girlfriend} from "../../items/list/partners/girlfriend.ts";

export class BreakUp implements Event {
    canActivate = (state: State) => {
        return state.items.some((item: Item) => item instanceof Girlfriend && item.resignedFromProposing)
    };
    applyEffects = (state: State) => {
        const girlfriend = state.items.find((item: Item) => item instanceof Girlfriend ) as Girlfriend;
        if (girlfriend) {
            state.character.mentalHealth.add(-20);
            state.character.happiness.add(-20);
            state.removeItem(girlfriend);
        }
    };
    getTitle = () => {
        return "Your girlfriend broke up with you";
    };
    getDescription = () => {
        return `Your girlfriend decided to end the relationship. This breakup has been tough on you, leading to a significant drop in your mental health and happiness. It's a challenging time, but with time and self-care, you can heal and move forward.`;
    };
    getWeight = (_: State) => {
        return 1;
    };
}
