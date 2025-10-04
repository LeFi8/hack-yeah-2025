interface TitleProps {
  text: string;
}

function Title({ text }: TitleProps) {
  return <h2 className="text-3xl pb-2">{text}</h2>;
}

export default Title;
