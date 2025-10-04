interface TitleProps {
  text: string;
}

function Title({ text }: TitleProps) {
  return <h2 className="text-4xl">{text}</h2>;
}

export default Title;
