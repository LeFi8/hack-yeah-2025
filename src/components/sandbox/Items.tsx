import type { State } from "../../game/state.ts";
import type { Item } from "../../game/items";

interface ItemsTabProps {
  state: State;
}

export function Items({ state }: ItemsTabProps) {
  return (
    <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex mt-2 min-h-[100px]">
      {state.items.map((item: Item) => (
        <div
          key={item.name}
          className="relative group mr-1"
        >
          <img
            src={`/items/${item.iconUrl}`}
            alt={item.name}
            className="w-8 h-8 cursor-pointer"
          />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
}