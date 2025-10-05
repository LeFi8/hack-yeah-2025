import type { Item } from "../../item";
import type { State } from "../../../state";

export class Shelter implements Item {
    name = "Shelter";
    applyMonthlyEffects(_: State) {
        return;
    }
}
