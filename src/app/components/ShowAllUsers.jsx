"use client";

import { useEffect, useState } from "react";

function showAllUsers() {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/getData");
        const result = await response.json();
        setData(result);
      } catch (error) {
      console.error("Error fetching data from API", error);
    }
  }
  fetchData();
},[]);
}

export default showAllUsers;