import { Possibility } from "../possibility";
import { Car } from "../../items/list/car";

export class GetNewCar extends Possibility {
  title = "You need a new car";
  getOptions() {
    return [
      {
        title: "Buy a new cheap car (10 000 PLN)",
        applyEffects: () => {
          this.state.character.balance -= 10000;
          this.state.addItem(new Car(500, false));
        },
      },
      {
        title: "Buy a new expensive car (100 000 PLN)",
        applyEffects: () => {
          this.state.character.balance -= 100000;
          this.state.addItem(new Car(1500, false));
        },
      },
      {
        title: "Lease an expensive car",
        applyEffects: () => {
          this.state.addItem(new Car(3000, true));
        },
      },
    ];
  }
  canActivate = () => {
    return !this.state.items.some((i) => i instanceof Car);
  };
  getWeight = () => {
    return 1;
  };
}
