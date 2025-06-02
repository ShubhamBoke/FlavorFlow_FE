
"use client";

import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import Image from "next/image";
import { Trash2, PlusCircle, MinusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export function CartModal() {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice, isCartOpen, toggleCart, clearCart } = useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("credit-card");

  const paymentMethods = [
    { value: "credit-card", label: "Credit Card" },
    { value: "paypal", label: "PayPal" },
    { value: "google-pay", label: "Google Pay" },
  ];

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent className="flex flex-col sm:max-w-lg">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="font-headline text-2xl">Your Cart ({totalItems})</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-grow px-6">
          {cartItems.length === 0 ? (
            <p className="text-muted-foreground text-center py-10">Your cart is empty.</p>
          ) : (
            <div className="space-y-4 py-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-2 rounded-lg border bg-card">
                  <Image
                    src={item.photoUrl || "https://placehold.co/64x64.png"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                    data-ai-hint={item.dataAiHint || "food item"}
                  />
                  <div className="flex-grow">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val)) updateQuantity(item.id, val)}
                      }
                      className="w-12 h-8 text-center"
                      min="1"
                    />
                    <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {cartItems.length > 0 && (
          <>
            <div className="px-6 py-4 border-t">
              <Label htmlFor="payment-method" className="block text-base font-semibold mb-2">Payment Method</Label>
              <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                <SelectTrigger id="payment-method" className="w-full">
                  <SelectValue placeholder="Select a payment method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map(method => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <SheetFooter className="px-6 pt-4 pb-6 space-y-4 border-t">
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <Button onClick={clearCart} variant="outline" className="w-full">Clear Cart</Button>
              <SheetClose asChild>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Proceed to Checkout</Button>
              </SheetClose>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
