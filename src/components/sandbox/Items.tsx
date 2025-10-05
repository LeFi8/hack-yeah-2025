import type { State } from "../../game/state.ts";
import type { Item } from "../../game/items";

interface ItemsTabProps {
  state: State;
}

export function Items({ state }: ItemsTabProps) {
  return (
    <div className="bg-white shadow-md py-5 px-8 border-2 rounded-2xl flex mt-2 min-h-[100px]">
      {state.items.map((item: Item) => (
        <img
          key={item.name}
          src={`/items/${item.iconUrl}`}
          alt={"item"}
          title={item.name}
          style={{ width: 32, height: 32, marginRight: 4 }}
        />
      ))}
    </div>
  );
}
