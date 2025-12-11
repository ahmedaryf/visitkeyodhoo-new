import React from "react";
import BackButton from "../components/GoBack";

export default function page() {
  return (
    <div className='min-h-screen px-4 w-full md:w-[90vw] xl:w-[80vw] mx-auto pb-12 lg:pb-24'>
      <h1 className='text-2xl lg:text-4xl body-font text-center text-zinc-500 dark:text-zinc-300 pt-32'>
        Guesthouses
      </h1>
      <BackButton />
    </div>
  );
}
