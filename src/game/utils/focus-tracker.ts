// ...existing code...

import type { Focus } from "../state";

export type FocusStats = {
  hobby: number;
  health: number;
  relation: number;
  work: number;
};


export class FocusTracker {
  private hobbyMonths: number = 0;
  private healthMonths: number = 0;
  private relationMonths: number = 0;
  private workMonths: number = 0;

  public trackFocus(focus: Focus): void {
    if (focus.hobby) this.hobbyMonths++;
    if (focus.health) this.healthMonths++;
    if (focus.relation) this.relationMonths++;
    if (focus.work) this.workMonths++;
  }

  public getAverages(totalMonths: number): FocusStats 
  {
    if (totalMonths === 0) {
      return { hobby: 0, health: 0, relation: 0, work: 0 };
    }

    return {
      hobby: this.hobbyMonths / totalMonths,
      health: this.healthMonths / totalMonths,
      relation: this.relationMonths / totalMonths,
      work: this.workMonths / totalMonths,
    };
  }

}