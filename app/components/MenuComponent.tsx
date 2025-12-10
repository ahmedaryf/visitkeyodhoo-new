import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { ReactNode } from "react";

export default function MenuComponent({ children }: { children: ReactNode }) {
  return (
    <div className=' w-full'>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline' className='cursor-pointer w-full body-font'>
            View Menu
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <p className='text-center body-font text-2xl'>Menu</p>
            </DialogTitle>
          </DialogHeader>
          {/* <div className='flex flex-col gap-6 items-center'>
            {menuData.map((item: any) =>
              item.menu.map((menuItems: any, index: number) => (
                <div key={index}>
                  <h6 className='body-font text-xl'>{menuItems.category}</h6>
                </div>
              ))
            )}
          </div> */}
          {children}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline' className='cursor-pointer'>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
