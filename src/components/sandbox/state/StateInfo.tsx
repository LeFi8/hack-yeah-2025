import type { ReactNode } from "react";

interface StateInfoProps {
  icon: ReactNode;
  text: string;
}

function StateInfo({ icon, text }: StateInfoProps) {
  return (
    <>
      <div className="flex gap-5 items-center py-1">
        {icon}
        <p>{text}</p>
      </div>
    </>
  );
}

export default StateInfo;
