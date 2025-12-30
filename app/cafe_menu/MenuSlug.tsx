"use client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getFavourites, toggleFavourites } from "../utils/favourites";

export default function MenuSlug(data: any) {
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    setFavs(getFavourites());
  }, []);

  return (
    <div className='mt-24 grid grid-cols-5 gap-12 justify-center items-center'>
      {data.data.items.map((menuItem: any, index: number) => {
        const isFav = favs.includes(menuItem._key);

        const handleToggle = () => {
          toggleFavourites(menuItem._key);
          setFavs(getFavourites());
        };

        return (
          <div key={index} className='p-4 bg-gray-100 rounded-lg w-full'>
            <Image
              src={urlFor(menuItem.itemImage)}
              width={150}
              height={150}
              alt='Image'
              className='aspect-square object-cover mx-auto'
            />
            <h6 className='text-sm text-center text-zinc-600 mt-4'>
              {menuItem.itemName}
            </h6>
            <button onClick={handleToggle} className='cursor-pointer'>
              {isFav ? "❤️" : "🤍"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
