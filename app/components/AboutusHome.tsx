import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";

export default function AboutusHome({ aboutus }: { aboutus: any }) {
  return (
    <div className=' grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 pb-12'>
      <div className=''>
        <Image
          src={urlFor(aboutus[0].coverImage)}
          width={600}
          height={600}
          alt='Image'
          className='rounded-lg aspect-video object-cover w-full'
        />
      </div>
      <div>
        <h2 className='body-font text-2xl lg:text-4xl mb-2 lg:mb-4'>
          {aboutus[0].title}
        </h2>
        <div className='prose dark:prose-invert text-justify body-font max-w-none text-sm lg:text-base w-full'>
          <PortableText value={aboutus[0].shortDescription} />
        </div>
      </div>
    </div>
  );
}
