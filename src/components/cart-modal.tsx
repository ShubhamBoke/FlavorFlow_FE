"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import Image from "next/image";
import { Trash2, PlusCircle, MinusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { fetchCartDetails, removeCartItem, updateCartItemQuantity } from "@/lib/apiService";
import { Cart, CartItem } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";


interface CartModalProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function CartModal({ isOpen, onToggle }: CartModalProps) {
  
  const [cart, setCart] = useState<Cart | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("credit-card");
  const { toast } = useToast();

  useEffect(() => {
    
    if (isOpen) {
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
  }, [isOpen, toast]);

  const clearCart = async () => {
    if (!cart || cart.cartItemList.length === 0) {
      toast({ title: "Cart is already empty" });
      return;
    }

    try {
      // Remove each item individually
      for (const item of cart.cartItemList) {
        await removeCartItem(item.id);
      }

      setCart(null); // Clear the local state
      toast({ title: "Cart Cleared", description: "Your cart has been emptied." });
    } catch (error) {
      console.error("Failed to clear cart:", error);
      toast({ title: "Error clearing cart", description: "Could not clear your cart.", variant: "destructive" });
    }
  };

  const handleRemoveCartItem = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId);

      // Update cart details
      if (cart) {
        cart.cartItemList = cart.cartItemList.filter(ci => ci.id !== cartItemId);
        cart.total = cart.cartItemList.reduce((total, item) => total + item.subtotal, 0);
        setCart(cart);
      }
      toast({ title: "Item removed.", description: "Your cart has been emptied." });
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast({ title: "Error removing item", description: "Could not update your cart.", variant: "destructive" });
    }
  };


  const handleUpdateQuantity = async (cartItemId: number, quantity: number) => {
    try {
      // Call the API to update the quantity
      await updateCartItemQuantity(cartItemId, quantity);
  
      // Update the local cart state
      setCart(prevCart => {
        if (!prevCart) return null;
        const updatedItems = prevCart.cartItemList.map(item =>
          item.id === cartItemId ? { ...item, quantity: quantity } : item
        );
        // Recalculate total based on updated quantities and item prices
        const updatedTotal = updatedItems.reduce(
          (total, item) => total + item.menuItem.price * item.quantity,
          0
        );
        return { ...prevCart, cartItemList: updatedItems, total: updatedTotal };
      });
      toast({ title: "Quantity Updated" });
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast({ title: "Error updating quantity", description: "Could not update item quantity.", variant: "destructive" });
    }
  };
  
  const paymentMethods = [
    { value: "credit-card", label: "Credit Card" },
    { value: "paypal", label: "PayPal" },
    { value: "google-pay", label: "Google Pay" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onToggle}>
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
                <div key={item.id} className="flex items-center justify-between space-x-2 sm:space-x-4 p-2 rounded-lg border bg-card">
                  <Image
                    src={item.menuItem.photoUrl || "https://placehold.co/64x64.png"}
                    alt={item.menuItem.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col justify-center flex-grow min-w-0">
                    <h4 className="font-semibold truncate">{item.menuItem.name}</h4>
                    <p className="text-sm text-muted-foreground">${item.menuItem.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ml-auto">
                    {/* Placeholder functions - replace with actual API calls */}
                    {/* You'll need to implement the logic to update quantity using updateCartItemQuantity */}
                    <Button variant="ghost" size="icon" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="h-8 w-8 sm:h-10 sm:w-10">
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                      className="w-10 h-8 sm:w-12 sm:h-10 text-center"
                      min="1"
                    />
                    <Button variant="ghost" size="icon" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 sm:h-10 sm:w-10">
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveCartItem(item.id)} className="text-destructive h-8 w-8 sm:h-10 sm:w-10">
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
                <span>Total:</span>
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