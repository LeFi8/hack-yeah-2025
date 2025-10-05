import { Event } from "../../event";
import { ReadingBooksHobby } from "../../../items/list/hobbys/reading-books-hobby";
import type { Item } from "../../../items";
import { Friend } from "../../../items/list/friend";

export class FriendsByReading extends Event {
  canActivate() {
    return (
      this.state.items.some(
        (item: Item) => item instanceof ReadingBooksHobby,
      ) && this.state.focus.relation
    );
  }
  applyEffects() {
    this.state.addItem(new Friend());
  }
  getTitle() {
    return "You made a new friend by reading books";
  }
  getDescription() {
    return `While reading a book at a local café, 
        you struck up a conversation with someone who shared your interest in literature. 
        This chance encounter blossomed into a meaningful friendship, 
        enriching your social life and providing you with a new companion to share your love of books with.
    `;
  }
  getWeight() {
    return 1;
  }
}
