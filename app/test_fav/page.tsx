import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import MenuComp from "./MenuComp";
import Favs from "./Favs";

async function getMenu() {
  const query = `*[_type == "rocknreelmenu"]`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function page() {
  const data = await getMenu();

  return (
    <div className='p-32 min-h-screen'>
      <h1 className='text-5xl text-center font-bold'>Test Favourites</h1>
      <MenuComp item={data} />
      <Favs menu={data} />
    </div>
  );
}
