import type { ReactNode } from "react";

interface FocusSliderProps {
  title: string;
  icon: ReactNode;
  value: number;
}

function FocusSlider({ title, icon, value }: FocusSliderProps) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          {icon}
          <p>{title}</p>
        </div>
      </div>
    </>
  );
}

export default FocusSlider;
