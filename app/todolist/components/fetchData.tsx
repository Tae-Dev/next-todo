"use client";

import React, { useEffect, useState } from "react";

function FetchData() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    fetch("/api/get-users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []);

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default FetchData;
