
import { HomeBanner } from "@/components/home-banner";
import { RestaurantList } from "@/components/restaurant-list";
import { dummyRestaurants } from "@/lib/data"; // Using dummy data

export default function HomePage() {
  // In a real app, you might fetch this data
  const restaurants = dummyRestaurants;

  return (
    <div className="space-y-12">
      <HomeBanner />
      <RestaurantList restaurants={restaurants} />
    </div>
  );
}
