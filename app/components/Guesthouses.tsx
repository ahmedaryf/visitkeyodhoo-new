import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

async function getGuesthouses() {
  const query = `*[_type == "guesthouses"]`;
  const data = client.fetch(query, {}, { next: { revalidate: 60 } });
  return data;
}

export default async function Guesthouses() {
  const guesthousesData = await getGuesthouses();
  return (
    <div className='min-h-screen'>
      <h2 className='text-2xl lg:text-4xl body-font text-center'>
        Guesthouses
      </h2>
      <div className='mt-12 grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-12 '>
        {guesthousesData.map((guesthouse: any, index: number) => (
          <div
            key={index}
            className=' shadow-2xl dark:border border-white/20 rounded-lg'>
            <div className=''>
              <Image
                src={urlFor(guesthouse.coverImage)}
                width={600}
                height={600}
                alt='Image'
                className='rounded-t-lg aspect-4/3 object-cover'
              />
            </div>
            <div className='px-2 lg:px-4 pb-6'>
              <h6 className='text-sm lg:text-base body-font  text-center my-4'>
                {guesthouse.title}
              </h6>
              <p className='text-xs  body-font'>{guesthouse.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
