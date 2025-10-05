import Title from "../common/Title.tsx";
import type { GameTickResult } from "../../game/game.ts";
import eclipse from "../../assets/eclipse.png";

// FIXME: should be changed to dynamic character based on user choice
import characterYoung from "../../assets/character/character_male_18_happy.png";
import characterYoungAdulthood from "../../assets/character/character_male_23_happy.png";

interface CharacterProps {
  tickResult: GameTickResult;
}

function Character({ tickResult }: CharacterProps) {
  let characterImgSrc = characterYoung;
  if (tickResult.state.age > 22) {
    characterImgSrc = characterYoungAdulthood;
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
