
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, User, LogIn, LogOut, Utensils, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { CartModal } from "./cart-modal";


export function GlobalHeader() {

  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = async () => {
    await logout(); 
  };

  const handleCartClick = () => {
    if (loading) return; // Prevent action while auth state is loading
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to view your cart.",
        variant: "destructive",
      });
      return;
    }
    const onToggleCart = () => setIsCartOpen(!isCartOpen);
    onToggleCart();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 mr-auto">
          <Utensils className="h-7 w-7 text-primary" />
          <span className="font-headline text-xl sm:text-2xl font-bold text-primary">FlavorFlow</span>
        </Link>
        <nav className="flex items-center space-x-2 sm:space-x-4">
          <Button 
            variant="ghost" 
            onClick={handleCartClick} 
            className="relative"
            disabled={loading} // Disable button only when auth is loading
            aria-disabled={!user && !loading} // Accessibility hint
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Open Cart</span>
          </Button>
          <CartModal isOpen={isCartOpen} onToggle={() => setIsCartOpen(!isCartOpen)}/>
          {loading ? (
             <div className="h-8 w-20 animate-pulse bg-muted rounded-md" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.firstName} />
                    <AvatarFallback>{user.firstName?.[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => router.push("/login")} variant="ghost">
              <LogIn className="mr-2 h-5 w-5" />
              Login
            </Button>
          )}
        </nav>
      </div>
      {/* Conditionally render CartModal based on isCartOpen */}
    </header>
  );
}
