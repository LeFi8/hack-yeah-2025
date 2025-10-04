import { useState } from "react";
import Card from "../../common/Card.tsx";

interface PossibilitiesProps {
  possibilities: {
    title: string;
    choices:
      | {
          text: string;
        }[]
      | null;
  }[];
  onPossibilityChosen: (
    possibilityIndex: number,
    choiceIndex: number | null,
  ) => void;
}

function Possibilities({
  possibilities,
  onPossibilityChosen,
}: PossibilitiesProps) {
  const [selectedPossibility, setSelectedPossibility] = useState<number | null>(
    null,
  );

  const handlePossibilityClick = (possibilityIndex: number) => {
    if (possibilities[possibilityIndex].choices === null) {
      onPossibilityChosen(possibilityIndex, null);
      return;
    }
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
            </Card>
          ))}
        {selectedPossibility !== null &&
          possibilities[selectedPossibility].choices?.map((choice, index) => (
            <Card
              key={index}
              onClick={() => handleChoiceClick(index)}
              className="grow flex flex-col items-center justify-center"
            >
              <p className={"text-lg"}>{choice.text}</p>
            </Card>
          ))}
      </div>
    </>
  );
}

export default Possibilities;
