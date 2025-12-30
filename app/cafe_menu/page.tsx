import React from "react";
import CafeMenuComponent from "./CafeMenuComponent";
import { client } from "@/sanity/lib/client";

async function getMenuData() {
  const query = `*[_type == "rocknreelmenu"]`;
  const data = client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function cafe_menu() {
  const menuData = await getMenuData();

  return (
    <div className='min-h-screen p-32'>
      <h1 className='text-5xl font-bold text-center'>Cafe Menu</h1>
      <div>
        <CafeMenuComponent menu={menuData} />
      </div>
    </div>
  );
}
