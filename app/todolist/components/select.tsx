import React, { useState } from "react";

function SelectCustom() {
  const [selected, setSelected] = useState("todo");
  return (
    <select
      onChange={(e) => {
        setSelected(e.target.value);
      }}
      id="countries"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-32"
    >
      <option value="todo" selected={selected === "todo"}>
        Todo List
      </option>
      <option value="fetch" selected={selected === "fetch"}>
        Fetch Data
      </option>
    </select>
  );
}

export default SelectCustom;
