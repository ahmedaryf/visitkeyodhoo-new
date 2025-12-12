// import GalleryComponent from "@/app/components/GalleryComponent";
import BackButton from "@/app/components/GoBack";
import Motion from "@/app/components/Motion";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";

async function getGuesthouses(slug: any) {
  const query = `*[_type == "guesthouses" && slug.current == $slug][0]`;
  const data = await client.fetch(
    query,
    { slug },
    { next: { revalidate: 60 } }
  );
  return data;
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guesthouse = await getGuesthouses(slug);

  return (
    <div className='min-h-screen px-4 w-full md:w-[90vw] xl:w-[80vw] mx-auto pb-12 lg:pb-24'>
      <div className='pt-12 lg:pt-24'></div>

      <h6 className='text-center font-thin text-2xl md:text-5xl pt-12 lg:pt-24  uppercase tracking-wider text-zinc-500 dark:text-zinc-300'>
        {guesthouse.title}
      </h6>
      <h6 className='text-center font-thin text-sm md:text-xl mb-4 mt-1 lg:mb-6 body-font tracking-widest md:tracking-[0.4rem] text-zinc-400 dark:text-zinc-400'>
        {guesthouse.subtitle}
      </h6>
      <BackButton />
      <div className='mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-12'>
        {guesthouse.fishing &&
          guesthouse.fishing.map((item: any, index: number) => (
            <Motion key={index}>
              <div className='shadow-2xl rounded-lg min-h-[45vh] lg:min-h-[50vh]'>
                <Image
                  src={urlFor(item.image)}
                  width={600}
                  height={600}
                  alt='Image'
                  className='aspect-4/3 object-cover rounded-t-lg'
                />
                <div className='px-2 md:px-4 pb-6 lg:pb-12'>
                  <h6 className='body-font text-center text-sm lg:text-lg mt-4 text-zinc-500 dark:text-zinc-300'>
                    {item.fisingTitle}
                  </h6>
                  <p className='body-font md:text-justify text-xs lg:text-sm mt-2 text-zinc-500 dark:text-zinc-300'>
                    {item.fishingDescription}
                  </p>
                </div>
              </div>
            </Motion>
          ))}
      </div>
    </div>
  );
}
