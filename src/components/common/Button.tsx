interface ButtonProps {
  text: string;
  onClick?: () => void;
}

function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      className="text-white bg-button py-2 px-2 rounded-2xl text-2xl min-w-[100px] cursor-pointer"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
