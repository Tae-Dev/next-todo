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

function TodoLostPage() {
  const [list, setList] = useState(masterList);
  const [fruitList, setFruitList] = useState<masterListType[]>([]);
  const [vegetableList, setVegetableList] = useState<masterListType[]>([]);
  const [temp, setTemp] = useState<masterListType[]>([]);

  useEffect(() => {
    if (temp.length > 0) {
      const timeoutId = setTimeout(async () => {
        for (const item of temp) {
          await new Promise<void>((resolve) =>
            setTimeout(() => {
              setList((prevList) => [...prevList, item]);
              if (item.type === "Fruit") {
                setFruitList((prevFruits) =>
                  prevFruits.filter((fruit) => fruit.name !== item.name)
                );
              } else if (item.type === "Vegetable") {
                setVegetableList((prevVegetables) =>
                  prevVegetables.filter(
                    (vegetable) => vegetable.name !== item.name
                  )
                );
              }

              resolve();
            }, 500)
          );
        }
        setTemp([]);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [temp]);

  const handleClickList = (item: masterListType) => {
    const filterList = list.filter((f) => f.name === item.name);
    if (item.type == "Fruit") {
      if (filterList.length > 0) {
        const newList = list.filter((f) => f.name !== item.name);
        setList(newList);
        setFruitList([...fruitList, item]);
        setTemp([...temp, item]);
      } else {
        const newListFruit = fruitList.filter(
          (fruitItem) => fruitItem.name !== item.name
        );
        setList([...list, item]);
        setFruitList(newListFruit);
        const filterTemp = temp.filter(
          (tempItem) => tempItem.name !== item.name
        );
        setTemp(filterTemp);
      }
    } else if (item.type == "Vegetable") {
      if (filterList.length > 0) {
        const newList = list.filter((f) => f.name !== item.name);
        setList(newList);
        setVegetableList([...vegetableList, item]);
        setTemp([...temp, item]);
      } else {
        const newListVegetable = vegetableList.filter(
          (vegetableItem) => vegetableItem.name !== item.name
        );
        setList([...list, item]);
        setVegetableList(newListVegetable);
        const filterTemp = temp.filter(
          (tempItem) => tempItem.name !== item.name
        );
        setTemp(filterTemp);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: 600,
        justifyContent: "space-between",
        gap: 10
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

export default TodoLostPage;
