"use client";
import { useState } from "react";
import FetchData from "./components/fetchData";
import SelectCustom from "../components/select";
import TodoList from "./components/todolist";

const selectList = [
  { title: "todo list", value: "todo" },
  { title: "fetch data", value: "fetch" },
];

function TodoListPage() {
  const [selectType, setSelectType] = useState("todo");
  return (
    <>
      <div className="w-28 mb-10">
        <SelectCustom
          list={selectList}
          handleChangeSelect={(selectValue) => {
            setSelectType(selectValue);
          }}
          selected={selectType}
        />
      </div>
      {selectType == "todo" ? <TodoList /> : <FetchData />}
    </>
  );
}

export default TodoListPage;
