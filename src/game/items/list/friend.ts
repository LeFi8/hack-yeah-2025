import type { Item } from "../item";

export class Friend implements Item {
  iconUrl = "src/assets/zus_icon.png";
  applyMonthlyEffects() {
    // Friends have no monthly effects
  }
}
