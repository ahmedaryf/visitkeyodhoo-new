// import GalleryComponent from "@/app/components/GalleryComponent";
import BackButton from "@/app/components/GoBack";
import { client } from "@/sanity/lib/client";
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

      <h6 className='text-center font-thin text-2xl md:text-5xl pt-12 lg:pt-24 mb-4 lg:mb-6 uppercase tracking-wide'>
        {guesthouse.title}
      </h6>
      <BackButton />
      <div>{/* <GalleryComponent data={events.events} /> */}</div>
    </div>
  );
}
