
"use client";
import type { MenuItem } from "@/lib/types";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { toast } = useToast();

  const handleAddToCart = () => {
    // Call add to cart
    toast({
      title: `${item.name} added to cart!`,
      description: "You can view your cart by clicking the cart icon in the header.",
    });
  };

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {item.photoUrl && (
        <CardHeader className="p-0">
          <div className="relative w-full h-40">
            <Image
              src={item.photoUrl}
              alt={item.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={item.dataAiHint || "menu item food"}
            />
          </div>
        </CardHeader>
      )}
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-lg mb-1">{item.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2">{item.description}</CardDescription>
        <p className="font-semibold text-primary">${item.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4">
        <Button onClick={handleAddToCart} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <PlusCircle className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
