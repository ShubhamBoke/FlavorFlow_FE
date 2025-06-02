
import { RestaurantList } from "@/components/restaurant-list";
import { dummyRestaurants } from "@/lib/data";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Restaurants | FlavorFlow',
  description: 'Browse our selection of fantastic restaurants and find your next meal.',
};

export default function RestaurantsPage() {
  // In a real app, you might fetch this data
  const restaurants = dummyRestaurants;

  return (
    <div className="space-y-12">
      <RestaurantList restaurants={restaurants} />
    </div>
  );
}
