import type { ReactNode } from "react";
import classNames from "classnames";

interface CardProps {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

function Card({ className, children, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "rounded-2xl border-2 p-4 shadow-md animate-show",
        {
          "hover:scale-[1.02] transition-transform cursor-pointer": !!onClick,
        },
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Card;
