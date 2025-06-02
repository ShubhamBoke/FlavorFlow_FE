
import type { Restaurant } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0">
        <Link href={`/restaurants/${restaurant.id}`} legacyBehavior passHref>
          <a className="block relative w-full h-48">
            <Image
              src={restaurant.photoUrl}
              alt={restaurant.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={restaurant.dataAiHint || "restaurant food"}
            />
          </a>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-2 hover:text-primary transition-colors">
          <Link href={`/restaurants/${restaurant.id}`} legacyBehavior passHref>
            <a>{restaurant.name}</a>
          </Link>
        </CardTitle>
        <div className="flex items-center mb-2">
          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
          <span className="text-sm font-medium">{restaurant.rating.toFixed(1)}</span>
        </div>
        <Badge variant="secondary" className="text-sm">{restaurant.cuisine}</Badge>
      </CardContent>
      <CardFooter className="p-4">
        <Link href={`/restaurants/${restaurant.id}`} legacyBehavior passHref>
          <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <a>View Menu</a>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
