import Title from "../common/Title.tsx";
import StateBar from "./state/StateBar.tsx";
import { AiOutlineHeart, AiOutlineSmile } from "react-icons/ai";
import { IoSchoolOutline, IoBriefcaseOutline } from "react-icons/io5";
import StateInfo from "./state/StateInfo.tsx";

function State() {
  return (
    <>
      <Title text={"State"} />
      <StateBar
        title={"Health"}
        icon={<AiOutlineHeart size={35} />}
        value={100}
      />
      <StateBar
        title={"Happiness"}
        icon={<AiOutlineSmile size={35} />}
        value={50}
      />
      <StateInfo icon={<IoSchoolOutline size={35} />} text={"Undergraduate"} />
      <StateInfo
        icon={<IoBriefcaseOutline size={35} />}
        text={"Zakład Ubezpieczeń Społecznych"}
      />
    </>
  );
}

export default State;
