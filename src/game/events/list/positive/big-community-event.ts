import { Event } from "../../event";

export class BigCommunityEvent extends Event {
  canActivate(): boolean {
    return this.state.focus.relation;
  }

  getWeight(): number { 
    return 1 + (this.state.character.happiness.get() >= 0 ? 4 : 0);
  }

  applyEffects(): void { 
    this.state.character.happiness.add(5);
  }
  getTitle(): string { return "Attended a Community Event"; }
  getDescription(): string { return "You went to a local event and enjoyed the atmosphere."; }
}
