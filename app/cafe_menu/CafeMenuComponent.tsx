import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";

export default function CafeMenuComponent({ menu }: { menu: any }) {
  return (
    <div className='grid grid-cols-6 gap-12 mt-12'>
      {menu.map((menuData: any, index: number) => (
        <div key={index} className='p-6 bg-gray-50'>
          <Image
            src={urlFor(menuData.coverImage)}
            width={200}
            height={200}
            alt='Image'
            className='aspect-square object-cover'
          />
          <h6>{menuData.categories}</h6>
        </div>
      ))}
    </div>
  );
}
