import type { ReactNode } from "react";
import classNames from "classnames";

interface StateBarProps {
  title: string;
  icon: ReactNode;
  value: number;
}

function StateBar({ title, icon, value }: StateBarProps) {
  let width = Math.min(100, value);
  width = Math.max(10, width);

  const r = Math.max(0, 255 - value * 2.55);
  const g = Math.min(255, value * 2.55);
  const b = 0;

  return (
    <div className="py-1">
      <p className="text-xl">{title}</p>
      <div className="flex gap-2 items-center">
        {icon}
        <div className={classNames("rounded-2xl h-6 relative grow border-1")}>
          {!!width && (
            <div
              className={classNames(
                "h-6 rounded-2xl absolute top-[-1px] border-y-1",
                {
                  "border-r-1": width < 100,
                },
              )}
              style={{
                width: `${width}%`,
                background: `rgb(${r}, ${g}, ${b})`,
              }}
            ></div>
          )}
        </div>
        <p className="text-right w-[5ch]">{value}%</p>
      </div>
    </div>
  );
}

export default StateBar;
