"use client";
import Link from "next/link";
import React from "react";
import {motion} from "motion/react";
import {FaChevronDown} from "react-icons/fa";
import useMeasure from "react-use-measure";

interface DropdownComponentProps {
    title: string;
    links: { name: string; url: string }[];
    onLinkClick: () => void;
    isOpen: boolean;
    onToggle: () => void;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({
                                                                 title,
                                                                 links,
                                                                 onLinkClick,
                                                                 isOpen,
                                                                 onToggle,
                                                             }) => {
    const [ref, {height}] = useMeasure();

    return (
        <div className='block w-full mx-auto text-center'>
            <div
                onClick={onToggle}
                className='cursor-pointer py-2 md:py-6 bg-white/5 hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 w-full menu-shadow rounded flex justify-between items-center px-4 md:px-12'>
        <span
            className='text-xl md:text-2xl text-secondary dark:text-gray-300 uppercase tracking-wider'>
          {title}
        </span>
                <FaChevronDown
                    className={`transition-transform duration-300 text-white ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </div>

            <motion.div
                className='bg-white/5'
                animate={{
                    height: isOpen ? height : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{duration: 0.4, ease: [0.4, 0, 0.2, 1]}}
                style={{overflow: "hidden"}}>
                <div ref={ref}>
                    {links.map((link, idx) => (
                        <Link
                            href={link.url}
                            key={idx}
                            onClick={onLinkClick}
                            className='block text-white py-2 px-4 text-left hover:bg-white/5'>
                            {link.name}
                        </Link>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default DropdownComponent;
