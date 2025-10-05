import type { State } from "../state";

export abstract class Event {
  constructor(protected readonly state: State) {}

  abstract getWeight(): number;
  abstract applyEffects(): void;
  abstract canActivate(): boolean;
  abstract getTitle(): string;
  abstract getDescription(): string;
}
