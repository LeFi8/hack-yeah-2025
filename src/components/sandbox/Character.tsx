import Title from "../common/Title.tsx";
import type { GameTickResult } from "../../game/game.ts";
import eclipse from "../../assets/eclipse.png";

// FIXME: should be changed to dynamic character based on user choice
import character from "../../assets/character/character_male_18.png";

interface CharacterProps {
  tickResult: GameTickResult;
}

function Character({ tickResult }: CharacterProps) {
  return (
    <>
      <Title text={`Age ${tickResult.state.age}`} />
      <img src={character} alt="Character" />
      <img
        src={eclipse}
        alt="Character"
        className="w-32 h-32 mx-auto transform scale-y-50 translate-y-[-4.5rem]"
      />
    </>
  );
}

export default Character;
