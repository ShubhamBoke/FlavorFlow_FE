
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
import { XCircle } from "lucide-react";

export function CancelOrderModal({ orderId }: { orderId?: string }) {
  // The trigger for this modal might vary (e.g., from an order list)
  // For demonstration, it's a standalone button if no orderId, or can be triggered programmatically.
  return (
    <Dialog>
      <DialogTrigger asChild>
        {orderId ? null : <Button variant="destructive"><XCircle className="mr-2 h-4 w-4" /> Cancel Order (Demo)</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Cancel Order</DialogTitle>
          <DialogDescription>
            {orderId ? `Are you sure you want to cancel order #${orderId}?` : "Are you sure you want to cancel this order?"} This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {/* Add order details if available */}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Keep Order</Button>
          </DialogClose>
          <Button type="submit" variant="destructive">Confirm Cancellation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
