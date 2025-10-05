import { Possibility } from "../possibility.ts";
import { House } from "../../items/list/shelter/house.ts";
import { Credit } from "../../items/list/credit.ts";
import { calculateCreditPayment } from "../../utils/calculate-credit-payment.ts";
import { FlatRent } from "../../items/list/shelter/flat-rent.ts";

export class NextBuyHouseEvent extends Possibility {
  title = "Buy a house";
  getOptions() {
    const money = this.state.character.balance;
    const housePrice = 1000000;
    const creditToTake = money < housePrice ? housePrice - money : 0;
    return [
      {
        title: `Buy a new house (its price is ${housePrice} PLN ${creditToTake > 0 ? `, you need to borrow ${creditToTake.toFixed(0)} PLN` : ""} ) `,
        applyEffects: () => {
          if (creditToTake > 0) {
            this.state.character.balance += creditToTake;
            const months = 30 * 12;
            const monthlyPayment = calculateCreditPayment(
              creditToTake + 2000,
              0.08,
              months,
            );
            this.state.addItem(new Credit(monthlyPayment, months));
          }
          this.state.character.balance -= housePrice;
          this.state.addItem(new House());
          const flatRent = this.state.items.find((i) => i instanceof FlatRent);
          if (flatRent) {
            this.state.removeItem(flatRent);
          }
        },
      },
      {
        title: "It's too expensive, continue renting (3500 PLN/month)",
        applyEffects: () => {},
      },
    ];
  }
  canActivate() {
    return (
      this.state.items.some((i) => i instanceof FlatRent) && this.state.age > 30
    );
  }
  getWeight() {
    return 2;
  }
}
