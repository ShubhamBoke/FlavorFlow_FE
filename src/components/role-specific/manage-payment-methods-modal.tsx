
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
import { CreditCard } from "lucide-react";

export function ManagePaymentMethodsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
            <CreditCard className="mr-2 h-4 w-4" /> Manage Payment Methods
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Payment Methods</DialogTitle>
          <DialogDescription>
            Add or update your payment methods.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm text-muted-foreground">Your saved payment methods will appear here.</p>
          <Button variant="outline" className="w-full">Add New Card</Button>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="bg-primary hover:bg-primary/90 text-primary-foreground">Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
