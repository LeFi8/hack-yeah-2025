import type { Game } from "../game/game.ts";

class QueryBuilder {
  private static readonly queryHelper =
    "Summarize my life in 200 words based on the following aspects and data. " +
    "Use human language (do not make it sound like AI, or use overly complicated words, make it easy to read) and make it engaging. " +
    "Do not repeat the aspects. Make it sound like a story. " +
    "Raw aspects and data: ";

  public static build(game: Game): string {
    const history = JSON.stringify(game.getHistory(), null, 2);
    const focus = JSON.stringify(game.getFocusStatistics(), null, 2);
    const zus = JSON.stringify(game.getState().zus, null, 2);
    const age = JSON.stringify(game.getState().age);
    const character = JSON.stringify(game.getState().character, null, 2);

    return this.queryHelper + history + focus + zus + age + character;
  }
}

export default QueryBuilder;
