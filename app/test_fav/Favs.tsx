"use client";
import { useEffect, useState } from "react";
import { FAV_KEY, getFavourites } from "../utils/favourites";

type MenuItem = {
  _id: string;
  name: string;
  categories: string;
};

export default function FavouritesPage({ menu }: { menu: MenuItem[] }) {
  const [favs, setFavs] = useState<string[]>([]);

  // Load favourites on mount
  useEffect(() => {
    setFavs(getFavourites());
  }, []);

  // Sync across tabs / pages
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === FAV_KEY) {
        setFavs(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const favouriteItems = menu.filter((item) => favs.includes(item._id));

  if (favouriteItems.length === 0) {
    return <p>No favourites yet 🤍</p>;
  }

  return (
    <div>
      <h1>❤️ Your Favourites</h1>

      <div className='grid gap-4'>
        {favouriteItems.map((item) => (
          <div key={item._id} className='p-4 bg-zinc-100 rounded'>
            {item.categories}
          </div>
        ))}
      </div>
    </div>
  );
}
