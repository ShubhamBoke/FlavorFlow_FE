
"use client";
import { RestaurantList } from "@/components/restaurant-list";
import { useState, useEffect } from 'react';
import { fetchRestaurants } from "@/lib/apiService";

export default function RestaurantsPage() {
  // In a real app, you might fetch this data
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const data = await fetchRestaurants();
        setRestaurants(data);
      } catch (err) {
        setError('Failed to fetch restaurants.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getRestaurants();
  }, []);

  return (
    <div className="space-y-12">
      {loading && <p>Loading restaurants...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <RestaurantList restaurants={restaurants} />}
    </div>
  );
}
