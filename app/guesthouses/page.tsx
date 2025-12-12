import React from "react";
import BackButton from "../components/GoBack";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Motion from "../components/Motion";

async function getGuesthouses() {
  const query = `*[_type == "guesthouses"] | order(id asc){
    title,
    coverImage,
    slug
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function page() {
  const guesthouses = await getGuesthouses();

  return (
    <div className='min-h-screen px-4 w-full md:w-[90vw] xl:w-[80vw] mx-auto pb-12 lg:pb-24'>
      <div className='pt-12 lg:pt-24'></div>
      <h1 className='text-2xl lg:text-4xl body-font text-center text-zinc-500 dark:text-zinc-300 pt-12 lg:pt-24'>
        Guesthouses
      </h1>
      <BackButton />
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-12 mt-12'>
        {guesthouses.map(
          (guesthouse: any, index: number) =>
            guesthouse.title && (
              <Motion key={index}>
                <div className='shadow-2xl rounded-lg dark:border border-white/15'>
                  <Link
                    href={`./guesthouses/${
                      guesthouse.slug ? guesthouse.slug.current : "/"
                    }`}>
                    <div>
                      {guesthouse.coverImage && (
                        <Image
                          src={urlFor(guesthouse.coverImage)}
                          width={600}
                          height={600}
                          alt='Cover Image'
                          className='aspect-4/3 object-cover rounded-t-lg'
                        />
                      )}
                    </div>
                    <div className='px-2 pb-6 lg:pb-12'>
                      <h6 className='body-font text-center text-sm lg:text-lg mt-4 text-zinc-500 dark:text-zinc-300'>
                        {guesthouse.title}
                      </h6>
                    </div>
                  </Link>
                </div>
              </Motion>
            )
        )}
      </div>
    </div>
  );
}
