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
        <h5 className='text-2xl body-font md:text-3xl lg:text-4xl text-zinc-500 dark:text-zinc-300 text-center pt-6 lg:pt-12 mb-6 '>
          Frequently Asked Questions
        </h5>
        {data &&
          data.map((item: any) => (
            <div key={item.id} className='pb-2 pt-1'>
              <button
                onClick={() => toggleAccordion(item.id)}
                className='text-zinc-500 dark:text-zinc-300 text-sm md:text-base px-4 md:px-12 py-3 font-semibold outline w-full text-start rounded-md cursor-pointer body-font'>
                {item.question} {item.name}
              </button>
              <Collapse isOpened={openAccordion === item.id}>
                <div className='text-zinc-500 dark:text-zinc-300 text-sm md:text-base prose dark:prose-invert custom-prose text-justify px-4 md:px-12  py-4 rounded-b-md body-font'>
                  <PortableText value={item.answer} />
                </div>
              </Collapse>
            </div>
          ))}
      </div>
    </div>
  );
}
