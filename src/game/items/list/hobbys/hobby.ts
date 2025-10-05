import type { Item } from "../../item";
import type { State } from "../../../state";

export class Hobby implements Item {
  name = "Hobby";
  applyMonthlyEffects(_: State) {
    return;
  }
}
