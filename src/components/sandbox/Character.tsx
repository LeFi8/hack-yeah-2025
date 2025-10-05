import Title from "../common/Title.tsx";
import type { GameTickResult } from "../../game/game.ts";
import eclipse from "../../assets/eclipse.png";

// FIXME: should be changed to dynamic character based on user choice
import characterYoung from "../../assets/character/character_male_18_happy.png";
import characterYoungAdulthood from "../../assets/character/character_male_23_happy.png";
import characterYoungUnhealthy from "../../assets/character/character_male_18_unhealthy.png";
import characterYoungFamily from "../../assets/character/character_family_18_happy.png";
import characterYoungAdulthoodFamily from "../../assets/character/character_family_23_happy.png";
import type { Item } from "../../game/items";
import { Wife } from "../../game/items/list/partners/wife.ts";
import { Child } from "../../game/items/list/child.ts";

interface CharacterProps {
  tickResult: GameTickResult;
}

function Character({ tickResult }: CharacterProps) {
  let characterImgSrc = characterYoung;
  if (
    tickResult.state.items.some((i: Item) => i instanceof Wife) &&
    tickResult.state.items.some((i: Item) => i instanceof Child) &&
    tickResult.state.age <= 22
  ) {
    characterImgSrc = characterYoungFamily;
  } else if (
    tickResult.state.age < 22 &&
    tickResult.state.character.physicalHealth.get() < 50
  ) {
    characterImgSrc = characterYoungUnhealthy;
  }
  if (tickResult.state.age > 22) {
    if (
      tickResult.state.items.some((i: Item) => i instanceof Wife) &&
      tickResult.state.items.some((i: Item) => i instanceof Child)
    ) {
      characterImgSrc = characterYoungAdulthoodFamily;
    } else if (
      tickResult.state.age > 22 &&
      tickResult.state.character.physicalHealth.get() < 50
    ) {
      characterImgSrc = characterYoungUnhealthy;
    } else {
      characterImgSrc = characterYoungAdulthood;
    }
  }
  return (
    <>
      <Title text={`Age ${tickResult.state.age}`} />
      <img src={characterImgSrc} alt="Character" />
      <img
        src={eclipse}
        alt="Character"
        className="w-32 h-32 mx-auto transform scale-y-50 translate-y-[-4.5rem] mb-[-5rem]"
      />
    </>
  );
}

export default Character;
