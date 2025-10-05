import { Possibility } from "../possibility";
import { Engineer } from "../../work";

export class WorkEngineer extends Possibility {
  title = "You decided to become a software engineer";

  getOptions() {
    return [
      {
        title: "Software Engineer - B2B",
        applyEffects: () => {
          this.state.job = new Engineer("B2B", 1);
        },
      },
      {
        title: "Software Engineer - Civil law contract",
        applyEffects: () => {
          this.state.job = new Engineer("UZ", 1);
        },
      },
      {
        title: "Software Engineer - Unregistered work",
        applyEffects: () => {
          this.state.job = new Engineer("UNREGISTERED", 1);
        },
      },
    ];
  }

  canActivate = () => {
    return !this.state.job && this.state.education.level.get() >= 2;
  };
  getWeight = () => {
    return 100;
  };
}
