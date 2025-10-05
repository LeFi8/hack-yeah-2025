import Title from "../common/Title.tsx";
import StateBar from "./state/StateBar.tsx";
import { AiOutlineHeart, AiOutlineSmile } from "react-icons/ai";
import {
  IoSchoolOutline,
  IoBriefcaseOutline,
  IoAirplane,
} from "react-icons/io5";
import StateInfo from "./state/StateInfo.tsx";
import type { GameTickResult } from "../../game/game.ts";
import MoneyTab from "./MoneyTab.tsx";
import { Items } from "./Items.tsx";
import { Hobby } from "../../game/items/list/hobbys/hobby.ts";

interface StateProps {
  tickResult: GameTickResult;
}

function State({ tickResult }: StateProps) {
  const character = tickResult.state.character;
  const job = tickResult.state.job;
  const hobbies = tickResult.state.items.filter((el) => el instanceof Hobby);

  function educationToString(level: number): string {
    // 0-podstawowe 1-średnie 2-licencjat/inż 3-magister 4-doktorat
    switch (level) {
      case 0:
        return "Basic education";
      case 1:
        return "Secondary education";
      case 2:
        return "Bachelor's degree";
      case 3:
        return "Master's degree";
      case 4:
        return "PhD";
      default:
        return "-";
    }
  }

  return (
    <>
      <Title text={"State"} />
      <StateBar
        title={"Health"}
        icon={<AiOutlineHeart size={35} />}
        value={Math.round(character.physicalHealth.get())}
      />
      <StateBar
        title={"Happiness"}
        icon={<AiOutlineSmile size={35} />}
        value={Math.round(character.happiness.get())}
      />
      <StateInfo
        icon={<IoSchoolOutline size={35} />}
        text={educationToString(tickResult.state.education.level.get())}
        className="pt-4"
      />
      {job !== null && (
        <StateInfo
          icon={<IoBriefcaseOutline size={35} />}
          text={job.getPosition()}
          className="pt-4"
        />
      )}
      {!!hobbies.length && (
        <StateInfo
          icon={<IoAirplane size={35} />}
          text={`Hobbies: ${hobbies.map((el) => (el as Hobby).name).join(", ")}`}
          className="pt-4"
        />
      )}
      <MoneyTab state={tickResult.state} />
      <Items state={tickResult.state} />
    </>
  );
}

export default State;
