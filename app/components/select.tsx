import React, { useState } from "react";

type listType = {
  title: string;
  value: string;
};

type propsType = {
  list: listType[];
  selected: string;
  handleChangeSelect: (selected: string) => void;
};

function SelectCustom(props: propsType) {
  const { list, selected, handleChangeSelect } = props;
  return (
    <select
      value={selected}
      onChange={(e) => {
        handleChangeSelect(e.target.value);
      }}
      id="countries"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-32"
    >
      {list?.map((item, i) => (
        <option key={i} value={item.value}>
          {item.title}
        </option>
      ))}
    </select>
  );
}

export default SelectCustom;
