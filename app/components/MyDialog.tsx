"use client";
import React, { ReactNode, useState } from "react";
import { MdClose } from "react-icons/md";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Motion from "./Motion";

const containerVars = {
  initial: {
    transition: {
      staggerDirection: -1,
      staggerChildren: 0.09,
    },
  },
  open: {
    transition: {
      staggerDirection: 1,
      staggerChildren: 0.09,
      delayChildren: 0.02,
    },
  },
};

const linkVars = {
  initial: {
    y: "30vh",
    opacity: 0,
  },
  open: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.12, 0, 0.39, 1] as [number, number, number, number],
      duration: 1,
    },
  },
};

const menuVars = {
  initial: {
    x: 0,
    opacity: 0,
    scaleY: 0,
    scaleX: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    scaleY: 1,
    scaleX: 1,
  },
  exit: {
    x: 0,
    opacity: 0,
    scaleY: 0,
    scaleX: 0,
    transition: { delay: 0.3, duration: 0.3 },
  },
};

export default function MyDialog({
  children,
  data,
}: {
  children: ReactNode;
  data: any;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={`duration-500 px-2 py-2 md:py-3 md:px-10 z-50 `}>
        <Motion>
          <div
            onClick={() => setIsOpen(true)}
            className=' cursor-pointer rounded overflow-hidden'>
            <div className=' flex flex-col gap-4 items-center bg-white/10 rounded-md p-2 border border-white/20'>
              <div className=''>
                <Image
                  src={urlFor(data.coverImage)}
                  width={400}
                  height={400}
                  alt='Item Image'
                  className=' rounded-md aspect-4/3 object-cover'
                />
              </div>
              <div className=''>
                <h6 className='text-zinc-200  text-sm body-font font-bold'>
                  {data.categories}
                </h6>
              </div>
            </div>
          </div>
        </Motion>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVars}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{
                duration: 0.5,
                ease: [0.12, 0, 0.39, 0],
              }}
              className='block fixed inset-0 h-screen bg-cover w-screen bg-primary pt-2 dark:bg-gray-900 pb-10 z-50'>
              <motion.div
                variants={containerVars}
                initial='initial'
                animate='open'
                exit='initial'>
                <div className='flex justify-end w-screen pe-4 md:pe-12 mt-6 mb-2'>
                  <MdClose
                    size={32}
                    className='text-white cursor-pointer'
                    onClick={() => setIsOpen(false)}
                  />
                </div>

                <motion.div
                  variants={linkVars}
                  className='mx-auto p-6 md:p-8 w-full md:w-[80vw] lg:w-[60vw] rounded'>
                  <div className=' h-[70vh] overflow-y-scroll  [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                    {children}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
