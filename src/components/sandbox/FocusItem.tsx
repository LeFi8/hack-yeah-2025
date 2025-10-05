import type { ReactNode } from "react";

interface FocusItemProps {
  title: string;
  icon: ReactNode;
  isChecked: boolean;
  onToggle?: () => void;
}

function FocusItem({ title, icon, isChecked, onToggle }: FocusItemProps) {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col gap-1">
          <p>{title}</p>
          <div className="flex flex-row">
            {icon}
            <div className="mx-4">
              <button
                onClick={onToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-zus focus:ring-offset-2 ${
                  isChecked ? "bg-zus" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isChecked ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FocusItem;
