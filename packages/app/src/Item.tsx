import React from 'react';

interface ItemProps {
  id: string;
  label: string;
  selectedOrderIds: any;
  setSelectedOrderIds: any;
}

export const Item = ({
  id,
  label,
  selectedOrderIds,
  setSelectedOrderIds,
}: ItemProps) => {
  const handleChange = (id: string, checked: boolean) => {
    if (checked) setSelectedOrderIds((prev: string[]) => [...prev, id]);
    else setSelectedOrderIds((prev: string[]) => prev.filter((p) => p !== id));
  };
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        name={id}
        onChange={(event) => handleChange(id, event.target.checked)}
        checked={selectedOrderIds.indexOf(id) !== -1}
      />
      <label htmlFor="{id}">{label}</label>
    </div>
  );
};
