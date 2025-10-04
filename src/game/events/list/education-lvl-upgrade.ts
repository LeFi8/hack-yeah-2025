import type { Event } from "../event";
import type { State } from "../../state";

export class EducationLvlUpgrade implements Event {
  private newLevel: number;

  canActivate = (state: State) => {
    const monthsStudying =
      state.getMonthsElapsed() - state.education.studyingSinceMonth;
    const lvl2Months = 12 * 4;
    const lvl3Months = 12 * 1.5 + lvl2Months;
    const lvl4Months = 12 * 2 + lvl3Months;

    if (!state.education.isStudying) {
      return false;
    }
    if (state.education.level.get() === 1 && monthsStudying >= lvl2Months) {
      this.newLevel = 2;
      return true;
    }
    if (state.education.level.get() === 2 && monthsStudying >= lvl3Months) {
      this.newLevel = 3;
      return true;
    }
    if (state.education.level.get() === 3 && monthsStudying >= lvl4Months) {
      this.newLevel = 4;
      return true;
    }

    return false;
  };
  applyEffects = (state: State) => {
    state.education.level.add(1);
  };
  getTitle = () => {
    return "You have finished your studies";
  };
  getDescription = () => {
    if (this.newLevel === 2) {
      return "Bachelor’s degree";
    }
    if (this.newLevel === 3) {
      return "Master’s degree";
    }
    if (this.newLevel === 4) {
      return "Doctorate";
    }

    return "";
  };
  getWeight = (_: State) => {
    return 1000;
  };
}
