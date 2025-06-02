
import { getRestaurantById } from "@/lib/data";
import { MenuItemCard } from "@/components/menu-item-card";
import Image from "next/image";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface RestaurantPageParams {
  id: string;
}

export async function generateMetadata({ params }: { params: RestaurantPageParams }) {
  const restaurant = getRestaurantById(params.id);
  if (!restaurant) {
    return { title: "Restaurant Not Found" };
  }
  return { title: `${restaurant.name} - Menu | FlavorFlow` };
}

export default function RestaurantPage({ params }: { params: RestaurantPageParams }) {
  const restaurant = getRestaurantById(params.id);

  if (!restaurant) {
    return (
      <div className="text-center py-10 sm:py-20">
        <h1 className="font-headline text-3xl sm:text-4xl mb-4">Restaurant Not Found</h1>
        <p className="text-muted-foreground mb-8">Sorry, we couldn't find the restaurant you're looking for.</p>
        <Button asChild>
          <Link href="/restaurants">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Restaurants
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="relative h-56 sm:h-64 md:h-96 w-full rounded-xl overflow-hidden shadow-lg">
        <Image
          src={restaurant.photoUrl}
          alt={restaurant.name}
          layout="fill"
          objectFit="cover"
          priority
          data-ai-hint={restaurant.dataAiHint || "restaurant building"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-10">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-2">{restaurant.name}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            <Badge variant="secondary" className="text-sm sm:text-base bg-opacity-80 backdrop-blur-sm">{restaurant.cuisine}</Badge>
            <div className="flex items-center text-white bg-black/50 px-2 py-1 rounded-md">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-xs sm:text-sm font-semibold">{restaurant.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8 text-center">Menu</h2>
        {restaurant.menu && restaurant.menu.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {restaurant.menu.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">This restaurant currently has no items on its menu.</p>
        )}
      </div>

      <div className="text-center mt-8 sm:mt-12">
        <Button asChild variant="outline">
          <Link href="/restaurants">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Restaurants
          </Link>
        </Button>
      </div>
    </div>
  );
}
