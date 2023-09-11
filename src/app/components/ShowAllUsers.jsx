"use client"

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
    </main>
  )
}

export default showAllUsers;