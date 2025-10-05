import classNames from "classnames";

interface SpinnerProps {
  className?: string;
}

function Spinner({ className }: SpinnerProps) {
  return (
    <div className={classNames("flex items-center justify-center", className)}>
      <div className="h-16 w-16 border-8 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Spinner;
