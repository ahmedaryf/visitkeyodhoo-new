import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";
import MenuComponent from "./MenuComponent";

async function getCafeData() {
  const query = `*[_type == "cafe"]`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function Cafe() {
  const cafeData = await getCafeData();

  return (
    <div className='min-h-screen'>
      <h2 className='text-2xl lg:text-4xl body-font text-center mb-6 lg:mb-12'>
        Café & Restaurants
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
        {cafeData.map((cafe: any, index: number) => (
          <div
            key={index}
            className=' shadow-2xl dark:border border-white/20 rounded-lg'>
            <div>
              <Image
                src={urlFor(cafe.coverImage)}
                width={600}
                height={600}
                alt='Cover Image'
                className='rounded-t-lg aspect-4/3 object-cover'
              />
            </div>
            <div className='px-2 lg:px-4 pb-6'>
              <h6 className='text-base lg:text-lg body-font text-center mt-4'>
                {cafe.title}
              </h6>
            </div>
            <div className='flex p-4 justify-center'>
              <MenuComponent>
                <div className='flex flex-col gap-6 items-center'>
                  {cafe.menu.map((menuItem: any, index: number) => (
                    <div key={index}>
                      <h6 className='body-font text-xl'>{menuItem.category}</h6>
                    </div>
                  ))}
                </div>
              </MenuComponent>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
