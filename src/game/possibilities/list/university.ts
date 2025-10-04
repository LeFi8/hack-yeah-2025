import {State} from "../../state";
import type {Possibility} from "../possibility";
import {Hobby} from "../../items/list/hobbys/hobby";
import {ReadingBooksHobby} from "../../items/list/hobbys/reading-books-hobby";
import {JoggingHobby} from "../../items/list/hobbys/jogging-hobby";
import {VideoGamesHobby} from "../../items/list/hobbys/video-games-hobby";

export class University implements Possibility {
  title = "You decided to go to university";

  getOptions(_state: State) {
    return [
      {
        title: 'Go to your favourite field of study',
        applyEffects: (state: State) => {
          state.education.isStudying = true
        }
      },
    ];
  }

  canActivate = (state: State) => {
    return !state.education.isStudying
  };
  getWeight = (state: State) => {
    if (state.age < 20) {
      return 100
    }
    return 5
  }
}