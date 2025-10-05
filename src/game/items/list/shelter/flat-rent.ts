import { Shelter } from "./shelter.ts";
import type { State } from "../../../state.ts";

export class FlatRent extends Shelter {
  monthlyCost = 3500;
  name = "Renting a Flat";
  iconUrl = "flat.png";
  applyMonthlyEffects(_: State) {}
}
