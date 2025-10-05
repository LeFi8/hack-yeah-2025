import { State } from "../../state";
import type { Possibility } from "../possibility";
import {Credit} from "../../items/list/credit.ts";

export class GetCredit implements Possibility {
    title = "You're running out of money...";
    getOptions(_state: State) {
        const moneyToBeOnPlus = Math.floor(Math.abs(_state.character.balance) / 1000 + 1) * 1000;
        const interest = 0.08;
        const monthlyPayment = moneyToBeOnPlus*(interest/12*(1+interest/12)**60)/((1+interest/12)**60-1);
        const moneyForSecondOption = moneyToBeOnPlus + 5000;
        const monthlyPaymentForSecondOption = moneyForSecondOption*(interest/12*(1+interest/12)**60)/((1+interest/12)**60-1);
        const moneyForThirdOption = moneyToBeOnPlus + 20000;
        const monthlyPaymentForThirdOption = moneyForThirdOption*(interest/12*(1+interest/12)**60)/((1+interest/12)**60-1);
        return [
            {
                title: `Take a ${moneyToBeOnPlus} 8% interest credit for 5 years (${monthlyPayment.toFixed(2)} PLN/month).`,
                applyEffects: (state: State) => {
                    state.character.balance += moneyToBeOnPlus;
                    state.addItem(new Credit(monthlyPayment, 60))
                }
            },
            {
                title: `Take a ${moneyForSecondOption} 8% interest credit for 5 years (${monthlyPaymentForSecondOption.toFixed(2)} PLN/month).`,
                applyEffects: (state: State) => {
                    state.character.balance += moneyForSecondOption;
                    state.addItem(new Credit(monthlyPaymentForSecondOption, 60))
                }
            },
            {
                title: `Take a ${moneyForThirdOption} 8% interest credit for 5 years (${monthlyPaymentForThirdOption.toFixed(2)} PLN/month).`,
                applyEffects: (state: State) => {
                    state.character.balance += moneyForThirdOption;
                    state.addItem(new Credit(monthlyPaymentForThirdOption, 60))
                }
            }
        ]
    }
    canActivate = (state: State) => {
        return state.character.balance < 0
    };
    getWeight = (_: State) => {
        return 100
    }
}
