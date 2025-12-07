import { client } from "@/sanity/lib/client";
import React from "react";
import HeroSection from "./components/HeroSection";
import Accordions from "./components/Accordions";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

async function getHeroData() {
  const query = `*[_type == "hero"]{
  image,
  title
  }`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

async function accordionsData() {
  const query = `*[_type == "accordions"] | order(id asc)`;
  const accordionData = await client.fetch(
    query,
    {},
    { next: { revalidate: 60 } }
  );
  return accordionData;
}

async function getAboutusData() {
  const query = `*[_type == "aboutus"]`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function Home() {
  const heroData = await getHeroData();
  const accordionData = await accordionsData();
  const aboutus = await getAboutusData();

  return (
    <div>
      <HeroSection data={heroData} />
      <main className='min-h-screen px-6 md:px-12 dark:bg-white/15 lg:py-24  w-full md:w-[90vw] xl:w-[80vw] mx-auto'>
        <div className=' dark:bg-zinc-700 grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12'>
          <div>
            <Image
              src={urlFor(aboutus[0].coverImage)}
              width={600}
              height={600}
              alt='Image'
              className='rounded aspect-video object-cover'
            />
          </div>
          <div className='prose dark:prose-invert body-font max-w-none text-sm lg:text-base w-full'>
            <PortableText value={aboutus[0].shortDescription} />
          </div>
        </div>
        <div className='mb-24'>
          <Accordions data={accordionData} />
        </div>
      </main>
    </div>
  );
}
