import Title from "../common/Title.tsx";

interface InfoTileProps {
  title: string;
  value: string;
}

function InfoTile({ title, value }: InfoTileProps) {
  return (
    <>
      <div className="">
        <Title text={title} />
        <div className="text-zus text-xl">{value}</div>
      </div>
    </>
  )
};

export default InfoTile;