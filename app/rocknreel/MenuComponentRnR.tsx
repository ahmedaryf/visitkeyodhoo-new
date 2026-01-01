"use client";
import React, { useEffect, useState } from "react";
import MyDialog from "../components/MyDialog";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { getFavourites, toggleFavourites } from "../utils/favourites";

export default function MenuComponentRnR({ menuItems }: { menuItems: any }) {
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    setFavs(getFavourites());

    const syncFavs = () => setFavs(getFavourites());

    window.addEventListener("favourites-updated", syncFavs);
    window.addEventListener("storage", syncFavs);

    return () => {
      window.removeEventListener("favourites-updated", syncFavs);
      window.removeEventListener("storage", syncFavs);
    };
  }, []);

  return (
    <div className=' grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6'>
      {menuItems &&
        menuItems.map((item: any, index: any) => (
          <div key={index} className=''>
            <MyDialog data={item}>
              <h6 className='text-zinc-200 text-xl body-font text-center tracking-wide uppercase mb-2'>
                {item.categories}
              </h6>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-3 mt-4 md:mt-8'>
                {item.items?.map((menuItem: any, index: number) => {
                  const isFav = favs.includes(menuItem._key);
                  const handleToggle = () => {
                    toggleFavourites(menuItem._key);
                    setFavs(getFavourites());
                  };
                  return (
                    <div key={index} className=''>
                      <div className='flex items-center gap-6 bg-white/5 rounded-md border border-white/10 h-full'>
                        <div>
                          {menuItem?.itemImage && (
                            <Image
                              src={urlFor(menuItem.itemImage)}
                              width={400}
                              height={400}
                              alt='Image'
                              className='w-32 aspect-4/4 object-cover rounded-md'
                            />
                          )}
                        </div>
                        <div className='flex flex-col justify-between w-full h-full pb-1 pt-2 pe-2'>
                          <div className='flex justify-between gap-4'>
                            <h6 className='text-zinc-200 body-font text-sm'>
                              {menuItem.itemName}
                            </h6>
                            <button
                              onClick={handleToggle}
                              className='cursor-pointer text-sm'>
                              {isFav ? "❤️" : "🤍"}
                            </button>
                          </div>
                          <div className=''>
                            <h6 className='text-zinc-400 body-font text-xs'>
                              {menuItem.itemDescription}
                            </h6>
                          </div>

                          <div className='flex  gap-6 w-full pe-4                                                                  '>
                            <h6 className='text-zinc-400 body-font text-[0.7rem]'>
                              MVR {menuItem.priceInMvr}
                            </h6>
                            <h6 className='text-zinc-400 body-font text-[0.7rem]'>
                              USD {menuItem.priceInUsd}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </MyDialog>
          </div>
        ))}
    </div>
  );
}
