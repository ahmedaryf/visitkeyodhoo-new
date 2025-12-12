import { client } from "@/sanity/lib/client";
import HeroSection from "./components/HeroSection";
import Accordions from "./components/Accordions";

import AboutusHome from "./components/AboutusHome";
import Motion from "./components/Motion";

import Cafe from "./components/Cafe";
import GuesthouseSlider from "./components/GuesthouseSlider";

// import SignatureComponent from "./components/SignatureComponent";

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

async function getGuesthouses() {
  const query = `*[_type == "guesthouses"] | order(id asc){
    coverImage,
    title,
    slug
  }`;
  const data = client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function Home() {
  const heroData = await getHeroData();
  const accordionData = await accordionsData();
  const aboutus = await getAboutusData();
  const guesthousesData = await getGuesthouses();

  return (
    <div className='dark:bg-black'>
      <HeroSection data={heroData} />
      <main className='min-h-screen px-6 md:px-12 dark:bg-white/10 lg:py-24  w-full md:w-[90vw] xl:w-[80vw] mx-auto my-12'>
        <div>
          <Motion>
            <AboutusHome aboutus={aboutus} />
          </Motion>
        </div>

        <div className='mt-12 lg:mt-32'>
          <Motion>
            <h2 className='text-2xl lg:text-4xl body-font text-center text-zinc-500 dark:text-zinc-300'>
              Guesthouses
            </h2>
            <GuesthouseSlider data={guesthousesData} />
          </Motion>
        </div>
        <div className='my-12 lg:my-24'>
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
