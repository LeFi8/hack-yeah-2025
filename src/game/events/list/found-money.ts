import type {Event} from '../event'
import type {State} from '../../state'

export class FoundMoney implements Event {
    private readonly amountFound: number
    constructor() {
        this.amountFound = 100
    }
    canActivate = (_: State) => {
        return true;
    };
    applyEffects = (state: State) => {
        state.character.balance += this.amountFound;
    };
    getTitle = () => {
        return "You found some money on the street";
    };
    getDescription = () => {
        return `While walking down the street, you noticed something shiny on the ground.
        It was a $${this.amountFound.toFixed(2)} bill that someone must have dropped.
        Nobody is around, so you decided to keep it.
    `
    };
    getWeight = (_: State) => {
        return 1;
    }
}