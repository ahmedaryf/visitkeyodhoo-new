"use client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getFavourites, toggleFavourites } from "../utils/favourites";

export default function MenuComp({ item }: { item: any[] }) {
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    setFavs(getFavourites());
  }, []);

  return (
    <div className='grid grid-cols-6 gap-12 mt-12'>
      {item.map((menuItem: any) => {
        const isFav = favs.includes(menuItem._id);

        const handleToggle = () => {
          toggleFavourites(menuItem._id);
          setFavs(getFavourites());
        };

        return (
          <div key={menuItem._id} className='p-6 bg-zinc-50'>
            <h6>{menuItem.categories}</h6>

            <Image
              src={urlFor(menuItem.coverImage)}
              width={200}
              height={200}
              alt='image'
              className='aspect-square object-cover'
            />

            <button onClick={handleToggle} className='cursor-pointer'>
              {isFav ? "❤️" : "🤍"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
