import type { Item } from "../../game/items";

interface ItemsTabProps {
  items: Item[];
}

const SummaryItems = ({ items }: ItemsTabProps) => {
  return (
    <div className="bg-white p-5 rounded-2xl grid grid-cols-2 gap-2 mt-2">
      {items.map((item: Item, index) => (
        <span
          key={index}
          // @ts-ignore
          after={item.name}
          className={
            "after:hidden hover:after:inline relative after:content-[attr(after)] after:absolute after:left-0 after:bg-button after:text-white after:border-1 after:border-black after:text-center after:rounded-md after:px-1 after:py-0.5 flex justify-center"
          }
        >
          <img
            src={`/items/${item.iconUrl}`}
            alt={item.name}
            style={{ width: 32, height: 32 }}
          />
        </span>
      ))}
    </div>
  );
};

export default SummaryItems;
