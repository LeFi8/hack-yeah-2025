import type { Item } from "../item";

export class Friend implements Item {
  name = "Friend";
  iconUrl = "friend.png";
  applyMonthlyEffects() {
    // Friends have no monthly effects
  }
}
