"use client";
import React, { useEffect, useState } from "react";
import { FAV_KEY, getFavourites } from "../utils/favourites";
import FavDialog from "./FavDialog";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function Favourites({ menu }: { menu: any }) {
  const [favs, setFavs] = useState<string[]>([]);

  //   function clearStorage() {
  //     if (typeof window === "undefined") return;

  //     try {
  //       localStorage.removeItem(FAV_KEY);

  //       // 🔥 notify same tab
  //       window.dispatchEvent(new Event("favourites-updated"));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  function removeFavourite(id: string) {
    if (typeof window === "undefined") return;

    const favs = getFavourites().filter((f) => f !== id);
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));

    // 🔥 update UI immediately
    window.dispatchEvent(new Event("favourites-updated"));
  }

  useEffect(() => {
    setFavs(getFavourites());
  }, []);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === FAV_KEY) {
        setFavs(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    const syncFavs = () => setFavs(getFavourites());

    window.addEventListener("favourites-updated", syncFavs);
    window.addEventListener("storage", syncFavs);

    return () => {
      window.removeEventListener("favourites-updated", syncFavs);
      window.removeEventListener("storage", syncFavs);
    };
  }, []);

  const favouriteItems = menu
    .flat()
    .filter((item: any) => favs.includes(item._key));

  //   if (favouriteItems.length === 0) {
  //     return <p className='text-zinc-200'>No Favourite Items</p>;
  //   }

  return (
    <div>
      <FavDialog>
        <h6 className='text-zinc-200 mb-12 text-center text-2xl body-font'>
          Favourites
        </h6>
        {favouriteItems.length === 0 ? (
          <h6 className='text-center text-zinc-200 text-xl '>
            No Favourites Items
          </h6>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {favouriteItems.map((favItems: any, index: number) => {
              return (
                <div key={index}>
                  <div className='flex gap-6 bg-white/5 rounded-md border border-white/10'>
                    <Image
                      src={urlFor(favItems.itemImage)}
                      width={200}
                      height={200}
                      alt='Item Image'
                      className='w-18 aspect-4/4 object-cover rounded-md'
                    />
                    <div className='p-2 flex flex-col justify-between '>
                      <h6 className='text-sm text-zinc-200 body-font'>
                        {favItems.itemName}
                      </h6>
                      <div className=' flex gap-6'>
                        <h6 className='text-xs text-zinc-400 body-font'>
                          MVR {favItems.priceInMvr}
                        </h6>
                        <h6 className='text-xs text-zinc-400 body-font'>
                          MVR {favItems.priceInUsd}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-end-safe mt-1'>
                    <button
                      onClick={() => removeFavourite(favItems._key)}
                      className='text-red-400 body-font text-xs pe-2  cursor-pointer'>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </FavDialog>
    </div>
  );
}
