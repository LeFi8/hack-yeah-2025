import Title from "../common/Title.tsx";
import type { GameTickResult } from "../../game/game.ts";
import eclipse from "../../assets/eclipse.png";

// FIXME: should be changed to dynamic character based on user choice
import characterYoung from "../../assets/character/character_male_18_happy.png";
import characterYoungAdulthood from "../../assets/character/character_male_23_happy.png";
import characterYoungUnhealthy from "../../assets/character/character_male_18_unhealthy.png";
import characterYoungFamily from "../../assets/character/character_family_18_happy.png";
import characterYoungAdulthoodFamily from "../../assets/character/character_family_23_happy.png";
import characterYoungSad from "../../assets/character/character_family_18_sad.png";
import characterAdultUnhealthy from "../../assets/character/character_male_36_unhealthy.png";
import characterOldUnhealthy from "../../assets/character/character_male_50_unhealthy.png";
import characterVeryOldUnhealthy from "../../assets/character/character_male_65_unhealthy.png";
import type { Item } from "../../game/items";
import { Wife } from "../../game/items/list/partners/wife.ts";
import { Child } from "../../game/items/list/child.ts";

interface CharacterProps {
  tickResult: GameTickResult;
}

function Character({ tickResult }: CharacterProps) {
  let characterImgSrc = characterYoung;
  if (tickResult.state.character.happiness.get() < 30) {
    characterImgSrc = characterYoungSad;
  }
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
  if (tickResult.state.character.physicalHealth.get() < 50) {
    if (tickResult.state.age > 65) {
      characterImgSrc = characterVeryOldUnhealthy;
    } else if (tickResult.state.age > 50) {
      characterImgSrc = characterOldUnhealthy;
    } else if (tickResult.state.age > 36) {
      characterImgSrc = characterAdultUnhealthy;
    } else if (tickResult.state.age > 18) {
      characterImgSrc = characterYoungUnhealthy;
    }
  }
  if (
    tickResult.state.age > 22 &&
    tickResult.state.character.physicalHealth.get() < 50
  ) {
    characterImgSrc = characterYoungUnhealthy;
  }
  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto px-4">
      <Title text={`Age ${tickResult.state.age}`} />
      <div className="relative w-full flex justify-center">
        <img
          src={characterImgSrc}
          alt="Character"
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain z-10"
        />
        <img
          src={eclipse}
          alt="Shadow"
          className="absolute bottom-0 w-24 h-12 sm:w-32 sm:h-16 md:w-40 md:h-20 object-contain opacity-50 transform translate-y-8"
        />
      </div>
    </div>
  );
}

export default Character;
