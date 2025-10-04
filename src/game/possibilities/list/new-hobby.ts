import {State} from "../../state.ts";
import type {Possibility} from "../possibility.ts";
import {Hobby} from "../../items/list/hobbys/hobby.ts";
import {ReadingBooksHobby} from "../../items/list/hobbys/reading-books-hobby.ts";
import {JoggingHobby} from "../../items/list/hobbys/jogging-hobby.ts";
import {VideoGamesHobby} from "../../items/list/hobbys/video-games-hobby.ts";

export class NewHobby implements Possibility {
    title = "You decided to start a new hobby";
    options = [
        {
            title: 'Reading books',
            applyEffects: (state: State) => {
                state.addItem(new ReadingBooksHobby())
            }
        },
        {
            title: 'Jogging',
            applyEffects: (state: State) => {
                state.addItem(new JoggingHobby())
            }
        },
        {
            title: 'Playing video games',
            applyEffects: (state: State) => {
                state.addItem(new VideoGamesHobby())
            }
        },
    ];
    canActivate = (state: State) => {
        return !state.items.some(i => i instanceof Hobby);
    };
    getWeight = (state: State) => {
        if (state.focus.hobby) {
            return 3
        }
        return 1
    }
}