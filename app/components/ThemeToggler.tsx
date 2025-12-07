// "use client";

// import React from "react";
// import { useTheme } from "next-themes";
// import { BiSolidMoon } from "react-icons/bi";
// import { BsFillSunFill } from "react-icons/bs";

// function ThemeToggler() {
//   const { resolvedTheme, setTheme } = useTheme();

//   if (!resolvedTheme) return null; // still hydrating

//   const isDark = resolvedTheme === "dark";

//   return (
//     <div className='mr-6 text-black-800'>
//       {isDark ? (
//         <div className='text-purple-700 dark:text-white md:text-white'>
//           <BsFillSunFill
//             size={24}
//             cursor='pointer'
//             onClick={() => setTheme("light")}
//           />
//         </div>
//       ) : (
//         <div className='text-purple-700 md:text-white'>
//           <BiSolidMoon
//             size={24}
//             cursor='pointer'
//             onClick={() => setTheme("dark")}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ThemeToggler;

"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThemeToggler() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-black' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
