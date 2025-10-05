import type { State } from "../../../state";
import type { Item } from "../../item";

export class Diet implements Item {
  name = "Diet ";
  applyMonthlyEffects(_: State) {
    return;
  }
}
