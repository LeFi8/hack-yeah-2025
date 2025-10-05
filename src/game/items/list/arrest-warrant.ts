import type { Item } from "../item";
import type { State } from "../../state.ts";

export class ArrestWarrant implements Item {
  name = "Arrest warrant";
  iconUrl = "arrest-warrant.png";

  applyMonthlyEffects(state: State): void {
    state.character.happiness.add(-2);
  }
}
