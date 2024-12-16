"use client";
import React, { useEffect, useState } from "react";

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
  const [temp, setTemp] = useState<masterListType[]>([]);

  useEffect(() => {
    if (temp.length > 0) {
      const timeoutId = setTimeout(() => {
        for (const item of temp) {
          setList((prevList) => [...prevList, item]);
          if (item.type === "Fruit") {
            setFruitList((prevFruits) =>
              prevFruits.filter((fruit) => fruit.name !== item.name)
            );
          } else if (item.type === "Vegetable") {
            setVegetableList((prevVegetables) =>
              prevVegetables.filter((vegetable) => vegetable.name !== item.name)
            );
          }
        }
        setTemp([]);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [temp]);

  const handleClickList = (item: masterListType) => {
    const isInMasterList = list.some((i) => i.name === item.name);
    if (isInMasterList) {
      setList((prev) => prev.filter((i) => i.name !== item.name));
      if (item.type === "Fruit") setFruitList((prev) => [...prev, item]);
      else setVegetableList((prev) => [...prev, item]);
      setTemp((prev) =>
        prev.some((tempItem) => tempItem.name === item.name)
          ? prev
          : [...prev, item]
      );
    } else {
      if (item.type === "Fruit")
        setFruitList((prev) => prev.filter((i) => i.name !== item.name));
      else setVegetableList((prev) => prev.filter((i) => i.name !== item.name));
      setList((prev) => [...prev, item]);
      setTemp((prev) => prev.filter((i) => i.name !== item.name));
    }
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
            onClick={() => handleClickList(item)}
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
            onClick={() => handleClickList(item)}
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
            onClick={() => handleClickList(item)}
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