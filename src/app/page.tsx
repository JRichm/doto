import List from "./widgets/list"
import Header from "./components/header"

import data from "../../fodb.json"

export default function Home() {
  return (
    <div className="h-[2000px]">
      <Header />
      <div className="p-4">
        <div className="flex flex-row gap-4 w-full justify-center">
          {Object.entries(data.lists).map(([listName, items]) => (
            <List key={listName} listName={listName} items={items} />
          ))}
        </div>
      </div>
    </div>
  );
}
