function SelectSection({ items, onItemSelect }) {
  return (
    <>
      {items.map((item) => (
        <div key={item.id} className="pl-2">
          <label className="py-1 inline-block">
            <input
              type="checkbox"
              checked={item.isChecked}
              onChange={(e) => {
                onItemSelect(item.id, e.target.checked);
              }}
            />
            {item.label} {item.items.length > 0 && `(${item.items.length})`}
          </label>
          <SelectSection items={item.items} onItemSelect={onItemSelect} />
        </div>
      ))}
    </>
  );
}

export default SelectSection;
