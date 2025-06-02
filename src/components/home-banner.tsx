
"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export function HomeBanner() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleOrderNowClick = () => {
    if (loading) return; // Do nothing if auth state is still loading

    if (user) {
      router.push('/restaurants'); 
    } else {
      router.push('/login');
    }
  };

  return (
    <section className="relative py-20 md:py-32 rounded-xl overflow-hidden bg-gradient-to-r from-primary via-orange-500 to-red-500 shadow-xl mb-12">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
          Welcome to FlavorFlow
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
          Discover and order delicious meals from the best local restaurants. Your culinary journey starts here!
        </p>
        <Button 
          size="lg" 
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg py-3 px-8 rounded-lg shadow-md transition-transform duration-150 hover:scale-105"
          onClick={handleOrderNowClick}
          disabled={loading}
        >
          Order Now
        </Button>
      </div>
    </section>
  );
}
