import { useState } from "react";
import Card from "../../common/Card.tsx";
import type { Possibility } from "../../../game/possibilities";

interface PossibilitiesProps {
  possibilities: Possibility[];
  onPossibilityChosen: (possibilityIndex: number, choiceIndex: number) => void;
}

function Possibilities({
  possibilities,
  onPossibilityChosen,
}: PossibilitiesProps) {
  const [selectedPossibility, setSelectedPossibility] = useState<number | null>(
    null,
  );

  const handlePossibilityClick = (possibilityIndex: number) => {
    // select first option if there's only one
    if (possibilities[possibilityIndex].getOptions().length === 1) {
      onPossibilityChosen(possibilityIndex, 0);
      return;
    }
    // allow user to choose
    setSelectedPossibility(possibilityIndex);
  };

  const handleChoiceClick = (choiceIndex: number) => {
    onPossibilityChosen(selectedPossibility!, choiceIndex);
  };

  return (
    <>
      <div className="flex flex-col h-full gap-4">
        {selectedPossibility === null &&
          possibilities.map((possibility, index) => (
            <Card
              key={index}
              onClick={() => handlePossibilityClick(index)}
              className="grow flex flex-col items-center justify-center"
            >
              <p className={"text-lg"}>{possibility.title}</p>
              {possibility.getOptions().length === 1 && (
                <p className="text-sm italic">
                  {possibility.getOptions()[0].title}
                </p>
              )}
            </Card>
          ))}
        {selectedPossibility !== null &&
          possibilities[selectedPossibility]
            .getOptions()
            .map((option, index) => (
              <Card
                key={index}
                onClick={() => handleChoiceClick(index)}
                className="grow flex flex-col items-center justify-center"
              >
                <p className={"text-lg"}>{option.title}</p>
              </Card>
            ))}
      </div>
    </>
  );
}

export default Possibilities;
