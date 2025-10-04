interface TitleProps {
  text: string;
}

function Title({ text }: TitleProps) {
  return <h2 className="text-2xl pb-2">{text}</h2>;
}

export default Title;
