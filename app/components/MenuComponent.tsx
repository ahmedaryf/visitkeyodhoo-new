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
          <Button
            variant='outline'
            className='cursor-pointer w-full body-font text-sm'>
            View Menu
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <p className='text-center body-font text-2xl'></p>
            </DialogTitle>
          </DialogHeader>

          <div className='max-h-[70vh] overflow-y-auto pr-2'>{children}</div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline' className='cursor-pointer'>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
