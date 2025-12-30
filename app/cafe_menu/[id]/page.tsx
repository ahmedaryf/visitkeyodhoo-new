import { client } from "@/sanity/lib/client";
import React from "react";
import MenuSlug from "../MenuSlug";

async function getMenu(id: number) {
  const query = `*[_type == "rocknreelmenu" && id == $id][0] `;
  const data = await client.fetch(query, { id }, { next: { revalidate: 60 } });
  return data;
}

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const numId = Number(id);

  const menuItemsData = await getMenu(numId);

  return (
    <div className='min-h-screen p-32'>
      <h1 className='text-center font-bold text-5xl'>Slug page</h1>
      <MenuSlug data={menuItemsData} />
    </div>
  );
}
