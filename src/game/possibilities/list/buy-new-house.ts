import {Possibility} from "../possibility.ts";
import {House} from "../../items/list/shelter/house.ts";
import {Credit} from "../../items/list/credit.ts";
import {calculateCreditPayment} from "../../utils/calculate-credit-payment.ts";
import {FlatRent} from "../../items/list/shelter/flat-rent.ts";
import {Shelter} from "../../items/list/shelter/shelter.ts";

export class BuyNewHouse extends Possibility {
    title = "Time to left the parents' house";
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
                        const monthlyPayment = calculateCreditPayment(creditToTake + 2000, 0.08, months);
                        this.state.addItem(new Credit(monthlyPayment, months))
                    }
                    this.state.character.balance -= housePrice;
                    this.state.addItem(new House());
                },
            },
            {
                title: "Rent a flat (3500 PLN/month)",
                applyEffects: () => {
                    this.state.addItem(new FlatRent());
                },
            },
        ];
    }
    canActivate() {
        return !this.state.items.some((i) => i instanceof Shelter) && this.state.age > 23;
    }
    getWeight() {
        return 2;
    }
}