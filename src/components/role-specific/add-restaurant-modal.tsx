
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
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Utensils } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select"
import { addRestaurant } from "@/lib/apiService";
import { useToast } from "@/hooks/use-toast";
import { UserRole } from "@/lib/types";
import { AuthUser } from "@/contexts/auth-context";

interface Props {
  user: AuthUser;
}


export function AddRestaurantModal({user}: Props) {

  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const nameInput = form.elements.namedItem('name') as HTMLInputElement;
    const cuisineInput = form.elements.namedItem('cuisine') as HTMLSelectElement;
    const name = nameInput.value;
    const cuisine = cuisineInput.value;

    //Validate
    if (!name) {
      toast({
        title: `Restaurant name cannot be empty.`,
        description: "Please enter a restaurant name.",
      });
      return;
    }
    if (!cuisine) {
      toast({
        title: `Cuisine type cannnot be empty.`,
        description: "Please select a cuisine type.",
      });
      return;
    }
    
    try {
      await addRestaurant(name, cuisine);
      toast({
        title: `Successfully added Restaurant: ${name}`,
      });
      form.reset(); // Optional: reset the form fields
    } catch (error) {
      console.error("Error adding restaurant:", error);
      toast({
        title: `Error adding restaurant:`,
      });
    }
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={user.role !== UserRole.Admin}>
          <Utensils className="mr-2 h-4 w-4" /> Add New Restaurant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Add Restaurant</DialogTitle>
          <DialogDescription>
            Fill in the details for the new restaurant. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
              <Label htmlFor="name" className="sm:text-right">
                Name
              </Label>
              <Input id="name" placeholder="Pizza Palace" className="col-span-1 sm:col-span-3" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4">
              <Label htmlFor="cuisine" className="sm:text-right">
                Cuisine
              </Label>
              <Select name="cuisine">
                <SelectTrigger className="col-span-1 sm:col-span-3">
                  <SelectValue placeholder="Select a cuisine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INDIAN">Indian</SelectItem>
                  <SelectItem value="CHINESE">Chinese</SelectItem>
                  <SelectItem value="ITALIAN">Italian</SelectItem>
                  <SelectItem value="SOUTH_INDIAN">South Indian</SelectItem>
                  <SelectItem value="JAPANESE">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" id="close-dialog">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Restaurant</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}