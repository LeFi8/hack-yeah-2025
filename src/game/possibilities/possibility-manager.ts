import { State } from "../state";
import type { Possibility } from "./possibility";
import { OnlineDating } from "./list/online-dating";
import { State } from "../state";
import type { Possibility } from "./possibility";
import { CatInNeed } from "./list/cat-in-need";
import { GymMembershipEvent } from "./list/gym-membership-event";
import { NewHobby } from "./list/new-hobby";
import { ChooseDiet } from "./list/choose-diet";
import { WorkWaiter } from "./list/work-waiter";
import { WorkEngineer } from "./list/work-engineer";
import { University } from "./list/university";
import { GetNewCar } from "./list/get-new-car.ts";
import {FindLifePartner} from "./list/find-life-partner.ts";
import {ProposeToGirlfriend} from "./list/propose-to-girlfriend.ts";
import {Wedding} from "./list/wedding.ts";
import {GetCredit} from "./list/get-credit.ts";

export class PossibilityManager {
  getAllPossibilities(state: State): Possibility[] {
    return [
      new CatInNeed(state),
      new GymMembershipEvent(state),
      new NewHobby(state),
      new ChooseDiet(state),
      new WorkWaiter(state),
      new WorkEngineer(state),
      new University(state),
      new GetNewCar(state),
      new OnlineDating(state),
        new FindLifePartner(state),
        new ProposeToGirlfriend(state),
        new Wedding(state),
        new GetCredit(state),
    ];
  }

  getRandom(state: State): Possibility[] {
    const filteredPossibilities = this.getAllPossibilities(state).filter(
      (possibility) => possibility.canActivate(),
    );

    if (filteredPossibilities.length === 0) {
      return [];
    }

    const weightedPossibilities = filteredPossibilities
      .map((possibility) => ({
        possibility,
        weight: possibility.getWeight(),
      }))
      .filter((item) => item.weight > 0);

    if (weightedPossibilities.length === 0) {
      return [];
    }

    const selectedPossibilities: Possibility[] = [];
    const availablePossibilities = [...weightedPossibilities];

    for (let i = 0; i < 3 && availablePossibilities.length > 0; i++) {
      const totalWeight = availablePossibilities.reduce(
        (sum, item) => sum + item.weight,
        0,
      );

      if (totalWeight === 0) break;

      const randomValue = Math.random() * totalWeight;

      let currentWeight = 0;
      let selectedIndex = 0;

      for (let j = 0; j < availablePossibilities.length; j++) {
        currentWeight += availablePossibilities[j].weight;
        if (randomValue <= currentWeight) {
          selectedIndex = j;
          break;
        }
      }

      const selected = availablePossibilities.splice(selectedIndex, 1)[0];
      selectedPossibilities.push(selected.possibility);
    }

    return selectedPossibilities;
  }
}
