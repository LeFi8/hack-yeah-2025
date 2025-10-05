import type { Item } from "../../item.ts";
import type { State } from "../../../state.ts";

export class RomanticPartner implements Item {
  name = "Romantic Partner";
  applyMonthlyEffects(_: State) {}
}
