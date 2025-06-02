
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Utensils } from "lucide-react";

export function AddRestaurantModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Utensils className="mr-2 h-4 w-4" /> Add New Restaurant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Add Restaurant</DialogTitle>
          <DialogDescription>
            Fill in the details for the new restaurant. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
            <Label htmlFor="name" className="sm:text-right">
              Name
            </Label>
            <Input id="name" placeholder="Pizza Palace" className="col-span-1 sm:col-span-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
            <Label htmlFor="cuisine" className="sm:text-right">
              Cuisine
            </Label>
            <Input id="cuisine" placeholder="Italian" className="col-span-1 sm:col-span-3" />
          </div>
           <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
            <Label htmlFor="photoUrl" className="sm:text-right">
              Photo URL
            </Label>
            <Input id="photoUrl" placeholder="https://placehold.co/600x400.png" className="col-span-1 sm:col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Cancel</Button>
          </DialogClose>
          <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Restaurant</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
