import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

import Link from "next/link";

async function getCafeData() {
  const query = `*[_type == "cafe"] | order(propId asc){
    title,
    menu,
    coverImage,
    logo,
    link
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function Cafe() {
  const cafeData = await getCafeData();

  return (
    <div className=''>
      <h2 className='text-2xl lg:text-4xl body-font text-center mb-6 lg:mb-12 text-zinc-500 dark:text-zinc-300'>
        Café & Restaurants
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12'>
        {cafeData &&
          cafeData.map(
            (cafe: any, index: number) =>
              cafe.title && (
                <div
                  key={index}
                  className=' shadow-2xl dark:border border-white/20 rounded-lg'>
                  <div>
                    {cafe.coverImage && (
                      <Image
                        src={urlFor(cafe.coverImage)}
                        width={600}
                        height={600}
                        alt='Cover Image'
                        className='rounded-t-lg aspect-4/3 object-cover'
                      />
                    )}
                  </div>
                  <div className='px-2 lg:px-4 pb-6'>
                    <h6 className='text-base  body-font text-center mt-4 text-zinc-500 dark:text-zinc-300'>
                      {cafe.title}
                    </h6>
                  </div>
                  {cafe.link && (
                    <div className='p-4 w-full flex justify-center items-center'>
                      <Link
                        href={cafe.link}
                        className='py-1 outline w-full text-center rounded-xl text-xs text-zinc-500 hover:text-zinc-800 cursor-pointer'>
                        View Menu
                      </Link>
                    </div>
                  )}
                  {/* <div className='flex p-4 justify-center'>
                    {cafe.menu && (
                      <MenuComponent>
                        <h5 className='text-center body-font text-lg text-zinc-500 dark:text-zinc-300'>
                          {cafe.title}
                        </h5>
                        <h6 className='text-center body-font text-lg mb-6 text-zinc-500 dark:text-zinc-300'>
                          Menu
                        </h6>
                        <div className='flex flex-col gap-8 pb-12'>
                          {cafe?.menu?.map((menuItem: any, index: number) => (
                            <div key={index} className='lg:ps-2'>
                              <h6 className='body-font text-sm lg:text-base underline text-zinc-700 dark:text-zinc-300 mb-1'>
                                {menuItem.category}
                              </h6>
                              {menuItem.items.map(
                                (item: any, index: number) => (
                                  <ul key={index}>
                                    <li className='body-font text-xs lg:text-sm mb-2 lg:mb-4 text-zinc-600 dark:text-zinc-400'>
                                      <span className='text-zinc-300 dark:text-zinc-500 me-1'>
                                        ➤
                                      </span>{" "}
                                      {item.itemName}
                                    </li>
                                  </ul>
                                )
                              )}
                            </div>
                          ))}
                        </div>
                      </MenuComponent>
                    )}
                  </div> */}
                </div>
              )
          )}
      </div>
    </div>
  );
}
