import Title from "../common/Title.tsx";
import type { GameTickResult } from "../../game/game.ts";

interface CharacterProps {
  tickResult: GameTickResult;
}

function Character({ tickResult }: CharacterProps) {
  return (
    <>
      <Title text={`Age ${tickResult.state.age}`} />
    </>
  );
}

export default Character;
