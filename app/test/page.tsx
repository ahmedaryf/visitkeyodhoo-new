"use client";
import React, { useEffect, useState } from "react";
import { getItem, removeItem, setItem } from "../utils/localStorage";

export default function TestPage() {
  //   const [count, setCount] = useState(() => {
  //     if (typeof window === undefined) return 0;
  //     const item = getItem("count");
  //     return (item as number) || 0;
  //   });
  const [count, setCount] = useState(0);

  useEffect(() => {
    const item = getItem<number>("count");
    if (item !== undefined) {
      setCount(item);
    }
  }, []);

  useEffect(() => {
    setItem("count", count);
  }, [count]);

  return (
    <div className='p-32 min-h-screen'>
      <h1 className='text-center text-5xl font-bold'>Test Page</h1>
      <div className='flex flex-col justify-center items-center gap-12 mt-12 '>
        <h6 className='text-4xl'>{count}</h6>
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className='bg-zinc-800 text-white hover:bg-zinc-700 px-12 py-1 rounded-2xl cursor-pointer'>
          Count
        </button>
        <button
          onClick={() => removeItem("count")}
          className='bg-zinc-800 text-white hover:bg-zinc-700 px-12 py-1 rounded-2xl cursor-pointer'>
          Reset
        </button>
      </div>
    </div>
  );
}
