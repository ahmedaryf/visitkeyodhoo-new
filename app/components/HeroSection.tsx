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

export default function HeroSection({ data }: { data: any }) {
  return (
    <div className='md:h-screen overflow-hidden '>
      <div>
        <Swiper
          modules={[Autoplay, EffectFade]}
          spaceBetween={30}
          slidesPerView={1}
          speed={3000}
          effect='fade'
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          //   breakpoints={{
          //     0: {
          //       slidesPerView: 1,
          //     },
          //     768: {
          //       slidesPerView: 3,
          //     },
          //           }}
        >
          {data &&
            data.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                {item.image && (
                  <Image
                    src={urlFor(item.image)}
                    width={1000}
                    height={800}
                    alt={item.title}
                    className='aspect-video object-cover w-full h-[70vh] md:h-auto zoom-slow'
                  />
                )}
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className='pt-4 md:hidden flex flex-col'>
        <h1 className='text-center text-zinc-300 dark:text-zinc-400 font-bold text-3xl my-4 md:my-8 uppercase tracking-wide md:hidden pb-6'>
          keyodhoo Island
        </h1>
        <div className='border-b border-b-zinc-200 dark:border-b-zinc-400 w-[80vw] mx-auto'></div>
      </div>
    </div>
  );
}
