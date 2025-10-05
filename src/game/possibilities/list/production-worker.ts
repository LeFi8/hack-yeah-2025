import { Worker } from "../../work/list/worker";
import { Possibility } from "../possibility";

export class ProductionWorker extends Possibility {
  title = "You decided to work on a production line";

  getOptions() {
    return [
      {
        title: "Production Worker - Civil law contract",
        applyEffects: () => {
          this.state.job = new Worker(this.state, "UZ", 1);
        },
      },
      {
        title: "Production Worker - Unregistered work",
        applyEffects: () => {
          this.state.job = new Worker(this.state, "UNREGISTERED", 1);
        },
      },
    ];
  }

  canActivate() {
    return !this.state.job;
  }
  getWeight() {
    return 100;
  }
}
