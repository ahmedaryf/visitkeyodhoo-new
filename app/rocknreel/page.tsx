import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import MyDialog from "../components/MyDialog";

async function getMenuItems() {
  const query = `*[_type == "rocknreelmenu"]`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function page() {
  const menuItems = await getMenuItems();

  return (
    <div className=' w-full min-h-screen xl:w-[60vw] mx-auto  '>
      <div className='pt-20 lg:pt-32 bg-zinc-900'></div>
      <div className='bg-zinc-900 min-h-screen pt-12 px-2'>
        <h1 className='text-3xl lg:text-6xl text-center font-bold body-font lg:pt-12 text-zinc-100'>
          RockNReel Menu
        </h1>

        <div className=' grid grid-cols-2 gap-3 mt-12'>
          {menuItems.map((item: any, index: any) => (
            <div key={index} className=''>
              <MyDialog data={item}>
                <h6 className='text-zinc-200 text-xl body-font text-center tracking-wide uppercase mb-2'>
                  {item.categories}
                </h6>
                {item.items.map((menuItem: any, index: number) => (
                  <div
                    key={index}
                    className='flex items-center gap-4 bg-white/5 pe-2 rounded-md border border-white/10'>
                    <div>
                      <Image
                        src={urlFor(menuItem.itemImage)}
                        width={400}
                        height={400}
                        alt='Image'
                        className='w-20 aspect-4/4 object-cover rounded-md'
                      />
                    </div>
                    <div>
                      <h6 className='text-zinc-200 body-font text-sm'>
                        {menuItem.itemName}
                      </h6>
                    </div>
                  </div>
                ))}
              </MyDialog>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

<div className=' '></div>;
