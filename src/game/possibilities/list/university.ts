import { Possibility } from "../possibility";

export class University extends Possibility {
  title = "You decided to go to university";

  getOptions() {
    return [
      {
        title: "Go to your favourite field of study",
        applyEffects: () => {
          this.state.education.isStudying = true;
        },
      },
    ];
  }

  canActivate = () => {
    return !this.state.education.isStudying;
  };
  getWeight = () => {
    if (this.state.age < 20) {
      return 100;
    }
    return 5;
  };
}
