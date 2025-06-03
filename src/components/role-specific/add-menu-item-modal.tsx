"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { fetchRestaurants, addMenuItem } from "@/lib/apiService"; // Assuming addMenuItem exists
import { Restaurant, MenuItem } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface AddMenuItemModalProps {
  onMenuItemAdded?: () => void;
}

export function AddMenuItemModal({ onMenuItemAdded }: AddMenuItemModalProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>("");
  const [menuItemData, setMenuItemData] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    rating: 0,
    photoUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const data = await fetchRestaurants();
        setRestaurants(data);
      } catch (error: any) {
        toast({
          title: "Error fetching restaurants.",
          description: error.message,
          variant: "destructive",
        });
      }
    };
    getRestaurants();
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setMenuItemData((prevData) => ({
      ...prevData,
      [id]: id === 'price' || id === 'rating' ? parseFloat(value) : value,
    }));
  };

  const handleRestaurantSelect = (value: string) => {
    setSelectedRestaurantId(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRestaurantId) {
      toast({
        title: "Restaurant not selected.",
        description: "Please select a restaurant for the new menu item.",
        variant: "destructive",
      });
      return;
    }

    if (!menuItemData.name || menuItemData.price === undefined) {
         toast({
           title: "Missing required fields.",
           description: "Please provide a name and price for the menu item.",
           variant: "destructive",
         });
         return;
       }


    setLoading(true);
    try {
      await addMenuItem(parseInt(selectedRestaurantId), menuItemData.name, menuItemData.price, menuItemData.rating || 3.5);
      toast({
        title: "Menu item added successfully.",
        description: `"${menuItemData.name}" has been added to the menu.`,
      });
      // Reset form except for selected restaurant
      setMenuItemData({
        name: "",
        description: "",
        price: 0,
        rating: 0,
        photoUrl: "",
      });
      if (onMenuItemAdded) {
        onMenuItemAdded();
      }
    } catch (error: any) {
      toast({
        title: "Error adding menu item.",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Menu Item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Menu Item</DialogTitle>
          <DialogDescription>
            Add a new menu item to a restaurant.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="restaurant" className="text-right">
                Restaurant
              </Label>
              <Select onValueChange={handleRestaurantSelect} value={selectedRestaurantId}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a restaurant" />
                </SelectTrigger>
                <SelectContent>
                  {restaurants.map((restaurant) => (
                    <SelectItem key={restaurant.id} value={restaurant.id.toString()}>
                      {restaurant.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={menuItemData.name || ""}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={menuItemData.price || ""}
                onChange={handleInputChange}
                className="col-span-3"
                step="0.01"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rating" className="text-right">
                Rating
              </Label>
              <Input
                id="rating"
                type="number"
                value={menuItemData.rating || ""}
                onChange={handleInputChange}
                className="col-span-3"
                step="0.1"
                min="0"
                max="5"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Menu Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}