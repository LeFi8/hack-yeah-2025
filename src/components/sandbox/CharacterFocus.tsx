import FocusItem from "./FocusItem.tsx";
import {
  IoBookOutline,
  IoBusinessOutline,
  IoHeartOutline,
} from "react-icons/io5";
import { PiHospital } from "react-icons/pi";
import { useState } from "react";
import { Focus } from "../../game/state.ts";

interface CharacterFocusProps {
  stateFocus: Focus;
}

function CharacterFocus({ stateFocus }: CharacterFocusProps) {
  const [focus, setFocus] = useState(stateFocus);

  const handleToggle = (
    focusType: "health" | "hobby" | "work" | "relation",
  ) => {
    // Try to toggle the focus (this will respect the MAX_FOCUS_COUNT constraint)
    const result = focus.toggle(focusType);

    if (!result) {
      return; // If the toggle was not successful, do not update state
    }

    const newFocus = new Focus(
      focus.hobby,
      focus.health,
      focus.relation,
      focus.work,
    );

    setFocus(newFocus);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-600 mb-2">
          Active focuses: {focus.countActiveFocus()}/2
        </p>
        <div className="flex flex-row items-center justify-center gap-8 mt-4">
          <div className="flex flex-col gap-2">
            <FocusItem
              title={"Health"}
              icon={<PiHospital size={30} />}
              isChecked={focus.health}
              onToggle={() => handleToggle("health")}
            />
            <FocusItem
              title={"Hobby"}
              icon={<IoBookOutline size={30} />}
              isChecked={focus.hobby}
              onToggle={() => handleToggle("hobby")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <FocusItem
              title={"Work"}
              icon={<IoBusinessOutline size={30} />}
              isChecked={focus.work}
              onToggle={() => handleToggle("work")}
            />
            <FocusItem
              title={"Relationships"}
              icon={<IoHeartOutline size={30} />}
              isChecked={focus.relation}
              onToggle={() => handleToggle("relation")}
            />
          </div>
        </div>

          <div className="mt-4 p-2 bg-green-50 rounded text-center text-sm">
            <span className="text-green-700">
              {focus.health && "💚 Health boost "}
              {focus.hobby && "😊 Happiness boost "}
              {focus.relation && "❤️ Strong happiness boost "}
              {focus.work && "🛡️ Work protection "}
            </span>
          </div>
          <div className="mt-2 p-2 bg-red-50 rounded text-center text-sm">
            <span className="text-red-700">
              {!focus.health && "💔 Health decay "}
              {!focus.relation && "😢 Happiness decay "}
              {!focus.work && "⚠️ Work stress "}
              {!focus.hobby && "🧠 Mental fatigue "}
            </span>
          </div>
        
      </div>
    </>
  );
}

export default CharacterFocus;
