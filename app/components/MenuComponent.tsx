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
import React from "react";

export default function MenuComponent() {
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
              <p>Menu</p>
            </DialogTitle>
          </DialogHeader>
          <div className=''>
            <h6>This is the Menu items</h6>
          </div>
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
