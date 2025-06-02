
import type { Restaurant } from "@/lib/types";
import { RestaurantCard } from "./restaurant-card";

interface RestaurantListProps {
  restaurants: Restaurant[];
}

export function RestaurantList({ restaurants }: RestaurantListProps) {
  return (
    <section id="restaurants-section" className="py-8">
      <h2 className="font-headline text-3xl md:text-4xl font-semibold mb-8 text-center">
        Explore Restaurants
      </h2>
      {restaurants.length === 0 ? (
        <p className="text-center text-muted-foreground">No restaurants available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </section>
  );
}
