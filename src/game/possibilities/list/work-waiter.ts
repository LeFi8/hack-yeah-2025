import { Possibility } from "../possibility";
import { Waiter } from "../../work";

export class WorkWaiter extends Possibility {
  title = "You decided to become a waiter";

  getOptions() {
    return [
      {
        title: "Waiter - Contract with full contributions",
        applyEffects: () => {
          this.state.job = new Waiter("UOP");
        },
      },
      {
        title: "Waiter - Civil law contract",
        applyEffects: () => {
          this.state.job = new Waiter("UZ");
        },
      },
      {
        title: "Waiter - Unregistered work",
        applyEffects: () => {
          this.state.job = new Waiter("UNREGISTERED");
        },
      },
    ];
  }

  canActivate(){
    return !this.state.job;
  };
  getWeight(){
    return 100;
  };
}
