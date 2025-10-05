import {Shelter} from "./shelter.ts";
import type {State} from "../../../state.ts";

export class House extends Shelter {
    monthlyCost = 1800;
    name = "House";
    iconUrl = "house.png";
    applyMonthlyEffects(_: State) {
    }
}