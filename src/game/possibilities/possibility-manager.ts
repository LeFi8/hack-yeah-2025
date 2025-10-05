import { State } from "../state";
import type { Possibility } from "./possibility";
import { CatInNeed } from "./list/cat-in-need";
import { GymMembershipEvent } from "./list/gym-membership-event";
import { NewHobby } from "./list/new-hobby";
import { ChooseDiet } from "./list/choose-diet";
import { WorkWaiter } from "./list/work-waiter";
import { WorkEngineer } from "./list/work-engineer";
import { University } from "./list/university";
import { OnlineDating } from "./list/online-dating";
import { HealthCheck } from "./list/health-check";
import { GetNewCar } from "./list/get-new-car.ts";
import { FindLifePartner } from "./list/find-life-partner.ts";
import { ProposeToGirlfriend } from "./list/propose-to-girlfriend.ts";
import { Wedding } from "./list/wedding.ts";
import { GetCredit } from "./list/get-credit.ts";
import { DecideAboutRetirement } from "./list/decide-about-retirement.ts";
import { CarInLeasing } from "./list/car-in-leasing.ts";
import {BuyNewHouse} from "./list/buy-new-house.ts";
import {NextBuyHouseEvent} from "./list/next-buy-house-event.ts";

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
      new HealthCheck(state),
      new DecideAboutRetirement(state),
      new BuyNewHouse(state),
      new NextBuyHouseEvent(state),
      new CarInLeasing(state),
    ];
  }

  getRandom(state: State): Possibility[] {
    const filteredPossibilities = this.getAllPossibilities(state).filter(
      (possibility) => possibility.canActivate(),
    );

    if (filteredPossibilities.length === 0) {
      return [];
    }

    // Powinismy zawsze zwracac decide-about-retirement jezeli ktos osiaga wiek emerytury
    if (filteredPossibilities.some((p) => p instanceof DecideAboutRetirement)) {
      return [
        filteredPossibilities.find((p) => p instanceof DecideAboutRetirement)!,
      ];
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
