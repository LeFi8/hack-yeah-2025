import type { ReactNode } from "react";
import classNames from "classnames";

interface StateInfoProps {
  icon: ReactNode;
  text: string;
  className?: string;
}

function StateInfo({ icon, text, className }: StateInfoProps) {
  return (
    <>
      <div className={classNames("flex gap-5 items-center py-2", className)}>
        {icon}
        <p>{text}</p>
      </div>
    </>
  );
}

export default StateInfo;
