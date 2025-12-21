"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navLinks = [
  {
    name: "Home",
    url: "/",
  },

  {
    name: "Travel Guide",
    url: "/travelguide",
  },

  // {
  //   name: "About Us",
  //   url: "/aboutus",
  // },
];

const containerVars = {
  initial: {
    transition: {
      staggerDirection: -1,
      staggerChildren: 0.05,
    },
  },
  open: {
    transition: {
      staggerDirection: 1,
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

const linkVars = {
  initial: {
    y: "-50vh",
    opacity: 0,
  },
  open: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.12, 0, 0.39, 1] as [number, number, number, number],
      duration: 0.2,
    },
  },
};

const menuVars = {
  initial: {
    // y: -500,
    opacity: 0,
    // scaleY: 0,
    // scaleX: 0,
  },
  animate: {
    // y: 0,
    opacity: 1,
    // scaleY: 1,
    // scaleX: 1,
  },
  exit: {
    // y: -500,
    opacity: 0,
    // scaleY: 0,
    // scaleX: 0,
    transition: { delay: 0.2, duration: 0.5 },
  },
};

export default function Navbar() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Function to update scroll position
    const updateScrollPosition = () => {
      setScrollPosition(window.scrollY);
    };

    // Update scroll position when the window is scrolled
    window.addEventListener("scroll", updateScrollPosition);

    // Initial update of scroll position
    updateScrollPosition();

    // Clean up event listener
    return () => window.removeEventListener("scroll", updateScrollPosition);
  }, []);

  return (
    <>
      {!path.startsWith("/admin") && !path.startsWith("/rocknreel") ? (
        <nav
          className={`duration-500 px-2 py-2 md:py-3 md:px-0 
            w-screen z-50 fixed`}>
          <div
            className={`flex justify-between w-full items-center bg-transparent duration-500 md:hover:bg-primary/80 md:dark:hover:bg-black text-gray-100 ${
              scrollPosition < 200 && path == "/"
                ? "md:bg-transparent"
                : "md:bg-primary/80 dark:md:bg-black"
            } md:px-12 py-4`}>
            <div className=''>
              <Link href={"/"}>
                <Image
                  src={"/logo/logo.png"}
                  alt='Logo'
                  width={60}
                  height={60}
                  className='w-[60px] md:w-[75px] rounded-full'
                />
              </Link>
            </div>
            {/* Desktop */}
            <div className='hidden md:block px-8 md:px-24 py-2 rounded w-full '>
              <div className='hidden md:flex md:justify-end md:gap-6 items-center'>
                {navLinks.map((navItem, index) => (
                  <div
                    key={index}
                    className='relative group mx-2 cursor-pointer uppercase'>
                    {/* Parent Link */}
                    {
                      <Link
                        href={navItem.url}
                        className={`inline-block  ${
                          navItem.url === path
                            ? "border-b border-gray-300/90 "
                            : "border-none"
                        } dark:text-gray-100  tracking-wider md:text-sm lg:text-base z-50 px-1 py-2`}>
                        {navItem.name}
                      </Link>
                    }
                  </div>
                ))}
              </div>
            </div>
            {/* mobile */}
            <div className='block md:hidden'>
              {isOpen ? (
                <MdClose
                  onClick={() => setIsOpen(false)}
                  size={32}
                  className=' text-gray-100 cursor-pointer'
                />
              ) : (
                <GiHamburgerMenu
                  onClick={() => setIsOpen(true)}
                  className='text-3xl md:text-5xl text-gray-100 cursor-pointer bg-primary dark:bg-gray-600 hover:bg-primary p-1 md:p-2 rounded'
                />
              )}
            </div>

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
                  className='block absolute inset-0 overflow-y-auto h-screen bg-cover w-screen bg-primary dark:bg-gray-700 pt-8 pb-10 z-50'>
                  <motion.div
                    variants={containerVars}
                    initial='initial'
                    animate='open'
                    exit='initial'>
                    <div className='flex justify-end w-screen pe-4 md:pe-12'>
                      <MdClose
                        size={32}
                        className='text-white cursor-pointer md:mx-6'
                        onClick={() => setIsOpen(false)}
                      />
                    </div>
                    <div className='w-full'>
                      <Image
                        src={"/logo/logo.png"}
                        alt='Logo'
                        width={60}
                        height={60}
                        className='w-[55px] md:w-[85px] mx-auto'
                      />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pt-6 '>
                      {navLinks.map((navItem, index) => (
                        <div key={index} className='pt-2 md:pt-4 px-8'>
                          <motion.div variants={linkVars}>
                            {
                              <Link
                                href={navItem.url}
                                onClick={() => setIsOpen(false)}
                                className='block w-full  mx-auto'>
                                <div className='mx-auto py-2 md:py-6 px-4  hover:bg-white/10 bg-white/5  w-full  menu-shadow rounded'>
                                  <div className='text-xl md:text-2xl text-gray-100 uppercase tracking-wider '>
                                    {navItem.name}
                                  </div>
                                </div>
                              </Link>
                            }
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      ) : (
        ""
      )}
    </>
  );
}
