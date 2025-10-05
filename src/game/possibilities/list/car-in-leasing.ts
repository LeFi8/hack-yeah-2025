import { Possibility } from "../possibility";
import { Car } from "../../items/list/car";

export class CarInLeasing extends Possibility {
  title = "You can have a car in leasing";
  getOptions() {
    return [
      {
        title: "Lease a cheap car (10 000 PLN)",
        applyEffects: () => {
          this.state.character.balance -= 1000;
          this.state.addItem(new Car(500, true));
        },
      },
      {
        title: "Buy a new expensive car (50 000 PLN)",
        applyEffects: () => {
          this.state.character.balance -= 10000;
          this.state.addItem(new Car(2400, true));
        },
      },
      {
        title: "Lease an really expensive car (250 000 PLN)",
        applyEffects: () => {
          this.state.character.balance -= 50000;
          this.state.addItem(new Car(4000, true));
        },
      },
    ];
  }
  canActivate() {
    return !this.state.items.some((i) => i instanceof Car);
  }
  getWeight() {
    return (
      1 *
      (this.state.character.balance > 100000
        ? 30
        : this.state.character.balance > 50000
          ? 10
          : 1)
    );
  }
}
