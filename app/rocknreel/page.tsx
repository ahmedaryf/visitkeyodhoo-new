import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import MyDialog from "../components/MyDialog";
import RockNReelLogo from "../components/RockNReelLogo";

async function getMenuItems() {
  const query = `*[_type == "rocknreelmenu"] | order(id asc){
    coverImage,
    categories,
    items[]{
      itemName,
      itemImage,
      priceInMvr,
      priceInUsd
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

        <div className=' grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6'>
          {menuItems &&
            menuItems.map((item: any, index: any) => (
              <div key={index} className=''>
                <MyDialog data={item}>
                  <h6 className='text-zinc-200 text-xl body-font text-center tracking-wide uppercase mb-2'>
                    {item.categories}
                  </h6>
                  <div className='grid grid-cols-1 gap-6 md:grid-cols-3 mt-4 md:mt-8'>
                    {item.items?.map((menuItem: any, index: number) => (
                      <div key={index} className=''>
                        <div className='flex items-center gap-6 bg-white/5 rounded-md border border-white/10 h-full'>
                          <div>
                            {menuItem?.itemImage && (
                              <Image
                                src={urlFor(menuItem.itemImage)}
                                width={400}
                                height={400}
                                alt='Image'
                                className='w-28 aspect-4/4 object-cover rounded-md'
                              />
                            )}
                          </div>
                          <div className='flex flex-col justify-between w-full h-full pb-1 pt-4 pe-2'>
                            <div className=''>
                              <h6 className='text-zinc-200 body-font text-sm'>
                                {menuItem.itemName}
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
                    ))}
                  </div>
                </MyDialog>
              </div>
            ))}
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
