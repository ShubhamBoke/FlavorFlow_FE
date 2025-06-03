
"use client";

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
import { useEffect } from "react";
import { fetchCartDetails } from "@/lib/apiService"; // Assuming fetchCartDetails is in apiService
import { Cart } from "@/lib/types"; // Assuming Cart type is defined in types
import { useToast } from "@/hooks/use-toast";

export function CartModal() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("credit-card");
  const { toast } = useToast();

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const setCartOpen = (isOpen: boolean) => setIsCartOpen(isOpen);

  useEffect(() => {
    if (isCartOpen) {
      const getCart = async () => {
        try {
          const cartData = await fetchCartDetails();
          setCart(cartData);
        } catch (error) {
          console.error("Failed to fetch cart details:", error);
          toast({ title: "Error fetching cart", description: "Could not load cart details.", variant: "destructive" });
        }
      };
      getCart();
    }
  }, [isCartOpen, toast]);
  const paymentMethods = [
    { value: "credit-card", label: "Credit Card" },
    { value: "paypal", label: "PayPal" },
    { value: "google-pay", label: "Google Pay" },
  ];

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader className="px-4 sm:px-6 pt-6">
          <SheetTitle className="font-headline text-xl sm:text-2xl">Your Cart ({cart?.cartItemList.length || 0})</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-grow px-4 sm:px-6">
          {!cart || cart.cartItemList.length === 0 ? (
            <p className="text-muted-foreground text-center py-10">Your cart is empty.</p>
          ) : (
            <div className="space-y-4 py-4">
              {cart.cartItemList.map((item) => (
                <div key={item.menuItem.id} className="flex items-center space-x-2 sm:space-x-4 p-2 rounded-lg border bg-card">
                  {/* Placeholder functions - replace with actual API calls */}
                  <Button variant="ghost" size="icon" onClick={() => { /* Call updateCartItemQuantity API */ }} disabled={item.quantity <= 1} className="h-8 w-8 sm:h-10 sm:w-10">
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => { /* Call updateCartItemQuantity API */ }}
                    className="w-10 h-8 sm:w-12 sm:h-10 text-center"
                    min="1"                  />
                  <Image
                    src={item.photoUrl || "https://placehold.co/64x64.png"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover flex-shrink-0"
                    data-ai-hint={item.dataAiHint || "food item"}
                  />
                  <div className="flex-grow min-w-0">
                    <h4 className="font-semibold truncate">{item.menuItem.name}</h4>
                    <p className="text-sm text-muted-foreground">${item.menuItem.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => { /* Call updateCartItemQuantity API */ }} className="h-8 w-8 sm:h-10 sm:w-10">
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => { /* Call removeCartItem API */ }} className="text-destructive h-8 w-8 sm:h-10 sm:w-10">
                    <Trash2 className="h-4 w-4" />

                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {cart && cart.cartItemList.length > 0 && (
          <>
            <div className="px-4 sm:px-6 py-4 border-t">
              <Label htmlFor="payment-method" className="block text-sm sm:text-base font-semibold mb-2">Payment Method</Label>
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
            
            <SheetFooter className="px-4 sm:px-6 pt-4 pb-6 space-y-4 border-t">
              <div className="flex justify-between items-center font-semibold text-base sm:text-lg">
                <span>Total:</span> {/* This total should come from the backend */}
                <span>${cart.total.toFixed(2)}</span>
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
