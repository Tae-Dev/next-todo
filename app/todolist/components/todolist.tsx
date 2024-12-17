"use client";
import { useState } from "react";

const masterList = [
  {
    type: "Fruit",
    name: "Apple",
  },
  {
    type: "Vegetable",
    name: "Broccoli",
  },
  {
    type: "Vegetable",
    name: "Mushroom",
  },
  {
    type: "Fruit",
    name: "Banana",
  },
  {
    type: "Vegetable",
    name: "Tomato",
  },
  {
    type: "Fruit",
    name: "Orange",
  },
  {
    type: "Fruit",
    name: "Mango",
  },
  {
    type: "Fruit",
    name: "Pineapple",
  },
  {
    type: "Vegetable",
    name: "Cucumber",
  },
  {
    type: "Fruit",
    name: "Watermelon",
  },
  {
    type: "Vegetable",
    name: "Carrot",
  },
];

type masterListType = {
  type: string;
  name: string;
};

function TodoList() {
  const [list, setList] = useState(masterList);
  const [fruitList, setFruitList] = useState<masterListType[]>([]);
  const [vegetableList, setVegetableList] = useState<masterListType[]>([]);
  const [timers, setTimers] = useState<{ [key: string]: NodeJS.Timeout }>({});

  const handleMoveToColumn = (item: masterListType) => {
    setList((prev) => prev.filter((i) => i.name !== item.name));

    if (item.type === "Fruit") {
      setFruitList((prev) => [...prev, item]);
    } else {
      setVegetableList((prev) => [...prev, item]);
    }

    const timerId = setTimeout(() => {
      handleMoveToMainList(item);
    }, 5000);

    setTimers((prev) => ({ ...prev, [item.name]: timerId }));
  };

  const handleMoveToMainList = (item: masterListType) => {
    setTimers((prev) => {
      const newTimers = { ...prev };
      if (newTimers[item.name]) {
        clearTimeout(newTimers[item.name]);
        delete newTimers[item.name];
      }
      return newTimers;
    });

    if (item.type === "Fruit") {
      setFruitList((prev) => prev.filter((i) => i.name !== item.name));
    } else {
      setVegetableList((prev) => prev.filter((i) => i.name !== item.name));
    }
    setList((prev) => [...prev, item]);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: 600,
        justifyContent: "space-between",
        gap: 10,
      }}
    >
      <div style={{ width: 200 }}>
        {list.map((item, index) => (
          <p
            key={index}
            onClick={() => handleMoveToColumn(item)}
            className="flex items-center justify-center p-2 m-2 border-2 cursor-pointer hover:bg-slate-100 select-none"
          >
            {item.name}
          </p>
        ))}
      </div>
      <div style={{ width: 200 }} className="border-2 mt-2">
        <p className="flex items-center justify-center p-2 bg-slate-200 cursor-pointe">
          Fruit
        </p>
        {fruitList.map((item, index) => (
          <p
            key={index}
            onClick={() => handleMoveToMainList(item)}
            className="flex items-center justify-center p-2 m-2 border-2 cursor-pointer hover:bg-slate-100 select-none"
          >
            {item.name}
          </p>
        ))}
      </div>
      <div style={{ width: 200 }} className="border-2 mt-2">
        <p className="flex items-center justify-center p-2 bg-slate-200">
          Vegetable
        </p>
        {vegetableList.map((item, index) => (
          <p
            key={index}
            onClick={() => handleMoveToMainList(item)}
            className="flex items-center justify-center p-2 m-2 border-2 cursor-pointer hover:bg-slate-100 select-none"
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
