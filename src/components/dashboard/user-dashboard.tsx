
"use client";

import { useAuth } from "@/contexts/auth-context";
import { UserRole } from "@/lib/types";
import { AddRestaurantModal } from "@/components/role-specific/add-restaurant-modal";
import { ManagePaymentMethodsModal } from "@/components/role-specific/manage-payment-methods-modal";
import { AddMenuItemModal } from "@/components/role-specific/add-menu-item-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export function UserDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-1/2 animate-pulse bg-muted rounded-md" />
        <div className="h-24 w-full animate-pulse bg-muted rounded-md" />
      </div>
    );
  }

  if (!user) {
    return <p className="text-center text-muted-foreground">Please log in to view your dashboard.</p>;
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl md:text-3xl">Welcome, {user.firstName}!</CardTitle>
          <CardDescription>Here's what you can do based on your role: <span className="font-semibold text-primary">{user.role}</span></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="font-semibold text-lg">Your Actions:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button disabled={user.role === UserRole.Member} variant="outline" onClick={() => {router.push('/orders')}}><ShoppingBag className="mr-2 h-4 w-4" /> My Orders</Button>
            <AddRestaurantModal user={user} />
            <AddMenuItemModal user={user} />
            <ManagePaymentMethodsModal user={user} />
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
