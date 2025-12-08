import { client } from "@/sanity/lib/client";
import React from "react";
import HeroSection from "./components/HeroSection";
import Accordions from "./components/Accordions";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import AboutusHome from "./components/AboutusHome";
import Motion from "./components/Motion";
import Guesthouses from "./components/Guesthouses";
import Cafe from "./components/Cafe";

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
    <div className='dark:bg-black'>
      <HeroSection data={heroData} />
      <main className='min-h-screen px-6 md:px-12 dark:bg-white/10 lg:py-24  w-full md:w-[90vw] xl:w-[80vw] mx-auto my-12'>
        <div>
          <Motion>
            <AboutusHome aboutus={aboutus} />
          </Motion>
        </div>
        <div className='mt-12 lg:mt-24'>
          <Motion>
            <Guesthouses />
          </Motion>
        </div>
        <div className='mt-12 lg:mt-24'>
          <Motion>
            <Cafe />
          </Motion>
        </div>
        <div className='mb-24'>
          <Motion>
            <Accordions data={accordionData} />
          </Motion>
        </div>
      </main>
    </div>
  );
}
