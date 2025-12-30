import { client } from "@/sanity/lib/client";

import React from "react";

import RockNReelLogo from "../components/RockNReelLogo";
import MenuComponentRnR from "./MenuComponentRnR";

async function getMenuItems() {
  const query = `*[_type == "rocknreelmenu"] | order(id asc){
    coverImage,
    categories,
    items[]{
      itemName,
      itemDescription,
      itemImage,
      priceInMvr,
      priceInUsd,
      _key
    }
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function page() {
  const menuItems = await getMenuItems();

  return (
    <div className='  bg-zinc-900 '>
      <div className='border-b border-zinc-700'>
        <div className='flex justify-center items-center'>
          <RockNReelLogo />
        </div>
      </div>
      {/* <div className='h-12 bg-linear-to-b from-white to-zinc-900 '></div> */}
      <div className='bg-zinc-900 px-2 pb-12 w-full min-h-screen xl:w-[60vw] mx-auto'>
        <h1 className='text-3xl pt-6 lg:text-6xl text-center font-bold body-font lg:pt-12 text-zinc-100'>
          Menu
        </h1>
        <div>
          <MenuComponentRnR menuItems={menuItems} />
        </div>
      </div>
      <div className='border-t border-zinc-700 h-64'>
        <div className='p-4 text-zinc-200 text-center body-font text-sm'>
          <h6>Phone: +960 7875519</h6>
        </div>
      </div>
    </div>
  );
}
