"use client";
import { PortableText } from "@portabletext/react";
import React, { useState } from "react";
import { Collapse } from "react-collapse";

export default function Accordions({ data }: any) {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  function toggleAccordion(id: number) {
    setOpenAccordion((prevOpen) => (prevOpen === id ? null : id));
  }

  return (
    <div className='pb-4 pt-4 md:pt-6 '>
      <div className='mx-auto'>
        <h5 className='text-2xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-zinc-800 dark:text-gray-400 text-center pt-6 lg:pt-12 mb-6 '>
          FAQ
        </h5>
        {data &&
          data.map((item: any) => (
            <div key={item.id} className='pb-2 pt-1'>
              <button
                onClick={() => toggleAccordion(item.id)}
                className='text-zinc-900 dark:text-gray-400 text-sm md:text-base px-4 md:px-12 py-3 font-semibold bg-zinc-600/10 dark:bg-gray-700/40 w-full text-start rounded-md cursor-pointer'>
                {item.question} {item.name}
              </button>
              <Collapse isOpened={openAccordion === item.id}>
                <div className='text-zinc-900 dark:text-gray-400 text-sm md:text-base prose dark:prose-invert custom-prose text-justify px-4 md:px-12 bg-zinc-300/10 dark:bg-gray-700/60 py-4 rounded-b-md'>
                  <PortableText value={item.answer} />
                </div>
              </Collapse>
            </div>
          ))}
      </div>
    </div>
  );
}
