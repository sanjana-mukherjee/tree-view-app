import { useState } from "react";
import SelectSection from "./components/SelectSection";
import treeViewData from "./utils/data.js";

// Update the isChecked property for all the items in the tree
// For all the items, update the isChecked propery and call the same function for its children
const updateChildItems = (items, isChecked) =>
  items.map((prevItem) => ({
    ...prevItem,
    isChecked,
    items: updateChildItems(prevItem.items, isChecked),
  }));

// Traverse the tree and find the item that matches the id
// If item is found, update its isChecked property and mark all its children according to isChecked
// If item is not found, search in its children and update the isChecked property according to its children
const searchItem = (items, id, isChecked) =>
  items.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        isChecked,
        items: updateChildItems(item.items, isChecked),
      };
    }
    const items = searchItem(item.items, id, isChecked);
    return {
      ...item,
      items,
      isChecked:
        items.length > 0
          ? items.every((item) => item.isChecked)
          : item.isChecked,
    };
  });

function App() {
  const [data, setData] = useState(treeViewData);

  function handleItemSelect(id, isChecked) {
    setData((prevData) => searchItem(prevData, id, isChecked));
  }

  return (
    <div>
      <div>
        <button
          onClick={() =>
            setData((prevData) => updateChildItems(prevData, true))
          }
        >
          Select All
        </button>
        <button
          onClick={() =>
            setData((prevData) => updateChildItems(prevData, false))
          }
        >
          Unselect All
        </button>
      </div>
      <div className="-ml-2 divide pt-1">
        <SelectSection items={data} onItemSelect={handleItemSelect} />
      </div>
    </div>
  );
}

export default App;
