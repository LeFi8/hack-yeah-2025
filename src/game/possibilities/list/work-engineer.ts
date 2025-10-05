import { Possibility } from "../possibility";
import { Engineer } from "../../work";

export class WorkEngineer extends Possibility {
  title = "You decided to become a software engineer";

  getOptions() {
    return [
      {
        title: "Software Engineer - B2B",
        applyEffects: () => {
          this.state.job = new Engineer(this.state, "B2B", 1);
        },
      },
      {
        title: "Software Engineer - Civil law contract",
        applyEffects: () => {
          this.state.job = new Engineer(this.state, "UZ", 1);
        },
      },
      {
        title: "Software Engineer - Unregistered work",
        applyEffects: () => {
          this.state.job = new Engineer(this.state, "UNREGISTERED", 1);
        },
      },
    ];
  }

  canActivate() {
    return (
      this.state.education.level.get() >= 2 &&
      !(this.state.job instanceof Engineer)
    );
  }
  getWeight() {
    return 100 * this.state.education.level.get();
  }
}
