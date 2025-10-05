import { useState } from "react";
import FocusItem from "./FocusItem.tsx";
import {
  IoBookOutline,
  IoBusinessOutline,
  IoHeartOutline,
} from "react-icons/io5";
import { PiHospital } from "react-icons/pi";

function CharacterFocus() {
  // FIXME: mock for integration, connect to global state
  const [focusStates, setFocusStates] = useState({
    health: false,
    hobby: false,
    work: false,
    relationships: false,
  });

  const handleToggle =
    (key: keyof typeof focusStates) => (checked: boolean) => {
      setFocusStates((prev) => ({
        ...prev,
        [key]: checked,
      }));
    };

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-8 mt-4">
        <div className="flex flex-col gap-2">
          <FocusItem
            title={"Health"}
            icon={<PiHospital size={30} />}
            isChecked={focusStates.health}
            onToggle={handleToggle("health")}
          />
          <FocusItem
            title={"Hobby"}
            icon={<IoBookOutline size={30} />}
            isChecked={focusStates.hobby}
            onToggle={handleToggle("hobby")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <FocusItem
            title={"Work"}
            icon={<IoBusinessOutline size={30} />}
            isChecked={focusStates.work}
            onToggle={handleToggle("work")}
          />
          <FocusItem
            title={"Relationships"}
            icon={<IoHeartOutline size={30} />}
            isChecked={focusStates.relationships}
            onToggle={handleToggle("relationships")}
          />
        </div>
      </div>
    </>
  );
}

export default CharacterFocus;
