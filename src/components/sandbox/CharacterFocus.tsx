import FocusItem from "./FocusItem.tsx";
import {
  IoBookOutline,
  IoBusinessOutline,
  IoHeartOutline,
} from "react-icons/io5";
import { PiHospital } from "react-icons/pi";
import type { Focus } from "../../game/state.ts";
import { useState } from "react";

interface CharacterFocusProps {
  stateFocus: Focus;
}

function CharacterFocus({ stateFocus }: CharacterFocusProps) {
  const [focus, _] = useState(stateFocus);

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-8 mt-4">
        <div className="flex flex-col gap-2">
          <FocusItem
            title={"Health"}
            icon={<PiHospital size={30} />}
            isChecked={focus.health.get()}
          />
          <FocusItem
            title={"Hobby"}
            icon={<IoBookOutline size={30} />}
            isChecked={focus.hobby.get()}
          />
        </div>
        <div className="flex flex-col gap-2">
          <FocusItem
            title={"Work"}
            icon={<IoBusinessOutline size={30} />}
            isChecked={focus.work.get()}
          />
          <FocusItem
            title={"Relationships"}
            icon={<IoHeartOutline size={30} />}
            isChecked={focus.relation.get()}
          />
        </div>
      </div>
    </>
  );
}

export default CharacterFocus;
