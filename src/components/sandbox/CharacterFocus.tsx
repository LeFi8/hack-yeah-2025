import FocusSlider from "./FocusSlider.tsx";
import {
  IoBookOutline,
  IoBusinessOutline,
  IoHeartOutline,
} from "react-icons/io5";

function CharacterFocus() {
  return (
    <>
      <div className="flex flex-col gap-5">
        <FocusSlider
          title={"Hobby"}
          icon={<IoBookOutline size={30} />}
          value={3}
        />
        <FocusSlider
          title={"Work"}
          icon={<IoBusinessOutline size={30} />}
          value={0}
        />
        <FocusSlider
          title={"Relationships"}
          icon={<IoHeartOutline size={30} />}
          value={1}
        />
      </div>
    </>
  );
}

export default CharacterFocus;
