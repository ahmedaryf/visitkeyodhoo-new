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

export default function RockNReelMenuComponent({
  trigger,
  children,
}: {
  children: ReactNode;
  trigger: any;
}) {
  return (
    <div className=' w-full'>
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <p className='text-center body-font text-2xl'></p>
            </DialogTitle>
          </DialogHeader>

          <div className='max-h-[70vh] overflow-y-auto pr-2'>{children}</div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant='outline'
                className='cursor-pointer text-zinc-500 dark:text-zinc-300'>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
