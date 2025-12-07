import { client } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";
import React from "react";

async function getTravelGuide() {
  const query = `*[_type == "travelGuide"]`;
  const data = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function TravelGuide() {
  const travelGuide = await getTravelGuide();

  return (
    <div className='min-h-screen px-6 md:px-12 dark:bg-white/15 py-24  w-full md:w-[80vw] xl:w-[70vw] mx-auto '>
      <div className='prose dark:prose-invert  body-font max-w-none text-sm lg:text-base w-full mt-12 lg:pt-24 '>
        <PortableText value={travelGuide[0].travelGuideText} />
      </div>
    </div>
  );
}
