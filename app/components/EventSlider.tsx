"use client";
import React from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

export default function EventSlider({ data }: { data: any }) {
  const display = data.slice(0, 4);
  return (
    <div className=' overflow-hidden  py-12'>
      <div>
        <Swiper
          modules={[Autoplay, EffectFade]}
          spaceBetween={30}
          slidesPerView={1}
          speed={3000}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
          }}>
          {display &&
            display.map((item: any, index: number) => (
              <SwiperSlide key={index} className=''>
                <Link
                  href={`./guesthouses/${item.slug ? item.slug.current : "/"}`}>
                  {item.coverImage && (
                    <Image
                      src={urlFor(item.coverImage)}
                      width={1000}
                      height={800}
                      alt={item.title}
                      className='aspect-4/3 object-cover w-full rounded'
                    />
                  )}
                  <h6 className='text-[0.6rem] md:text-sm text-center mt-2 md:mt-4 uppercase tracking-wider text-zinc-500 dark:text-zinc-200'>
                    {item.title}
                  </h6>
                  {/* <h6 className='text-[0.5rem] md:text-xs text-center uppercase text-zinc-400 '>
                  {new Date(item.date).toLocaleDateString("en-UK", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </h6> */}
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className='flex justify-center mt-6 lg:mt-12'>
        <Link
          className=' outline outline-zinc-300 text-zinc-400 hover:bg-zinc-400 hover:text-white duration-500 text-xs lg:text-sm px-4 py-1 rounded-2xl'
          href={"./guesthouses"}>
          View All Guesthouses
        </Link>
      </div>
    </div>
  );
}
