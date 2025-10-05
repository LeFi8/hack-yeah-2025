import { Possibility } from "../possibility";
import { Hobby } from "../../items/list/hobbys/hobby";
import { ReadingBooksHobby } from "../../items/list/hobbys/reading-books-hobby";
import { JoggingHobby } from "../../items/list/hobbys/jogging-hobby";
import { VideoGamesHobby } from "../../items/list/hobbys/video-games-hobby";

export class NewHobby extends Possibility {
  title = "You decided to start a new hobby";

  getOptions() {
    return [
      {
        title: "Reading books",
        applyEffects: () => {
          this.state.addItem(new ReadingBooksHobby());
        },
      },
      {
        title: "Jogging",
        applyEffects: () => {
          this.state.addItem(new JoggingHobby());
        },
      },
      {
        title: "Playing video games",
        applyEffects: () => {
          this.state.addItem(new VideoGamesHobby());
        },
      },
    ];
  }

  canActivate() {
    return !this.state.items.some((i) => i instanceof Hobby);
  }
  getWeight() {
    if (this.state.focus.hobby) {
      return 3;
    }
    return 1;
  }
}
