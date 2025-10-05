import { Event } from "../../event";

export class DiscoveredHobbyPassion extends Event {
  canActivate(): boolean {
    return this.state.focus.hobby;
  }

  getWeight(): number {
    return 4;
  }
  applyEffects(): void {
    this.state.character.balance -= 300;
    this.state.character.happiness.add(3);
  }
  getTitle(): string {
    return "Discovered a Hobby Passion";
  }
  getDescription(): string {
    return "You discovered a hobby that you truly enjoy. Exciting times ahead!";
  }
}
