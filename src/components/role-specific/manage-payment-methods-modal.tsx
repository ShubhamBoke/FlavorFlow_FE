
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { getPaymentMethodList, addPaymentMethod, updatePaymentMethod } from "@/lib/apiService";
import { PaymentMethod, UserRole } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { AuthUser } from "@/contexts/auth-context";

interface Prop {
  user: AuthUser
}

export function ManagePaymentMethodsModal({user}: Prop) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [newPaymentMethodName, setNewPaymentMethodName] = useState('');
  const [editedPaymentMethods, setEditedPaymentMethods] = useState<{ [key: number]: string }>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchPaymentMethods = async () => {
    try {
      const data = await getPaymentMethodList();
      setPaymentMethods(data);
    } catch (error: any) {
      toast({
        title: "Error fetching payment methods.",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (dialogOpen) {
      fetchPaymentMethods();
      setEditedPaymentMethods({}); // Clear editing state when modal opens/refreshes
    }
  }, [dialogOpen, toast]);

  const handleAddPaymentMethod = async () => {
    if (!newPaymentMethodName.trim()) {
      toast({
        title: "Input required.",
        description: "Please enter a payment method name.",
        variant: "destructive",
      });
      return;
    }
    try {
      await addPaymentMethod(newPaymentMethodName);
      toast({
        title: "Payment method added.",
        description: "The new payment method was successfully added.",
      });
      setNewPaymentMethodName('');
      fetchPaymentMethods(); // Refresh the list
    } catch (error: any) {
      toast({
        title: "Error adding payment method.",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdatePaymentMethod = async (id: number, name: string) => {
    if (!name.trim()) {
      toast({
        title: "Input required.",
        description: "Payment method name cannot be empty.",
        variant: "destructive"
      });
      return;
    }
    try {
      await updatePaymentMethod(id, name);
      toast({
        title: "Payment method updated.",
        description: "The payment method was successfully updated.",
      });
      fetchPaymentMethods(); // Refresh the list
    } catch (error: any) {
      toast({
        title: "Error updating payment method.",
        description: error.message,
        variant: "destructive",
      });
    }
  };


  const handlePaymentMethodInputChange = (id: number, value: string) => {
    setEditedPaymentMethods(prevState => ({
      ...prevState,
      [id]: value
    }));
  };


  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button disabled={user.role !== UserRole.Admin} variant="outline">
          <CreditCard className="mr-2 h-4 w-4" /> Manage Payment Methods
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Payment Methods</DialogTitle>
          <DialogDescription>
            Manage your saved payment methods.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <h3 className="text-md font-semibold mb-2">Existing Payment Methods:</h3>
          {paymentMethods.length === 0 ? (
            <p className="text-sm text-muted-foreground">No payment methods saved yet.</p>
          ) : (
            <ul className="space-y-2">
              {paymentMethods.map((method) => (
                <li key={method.id} className="flex justify-between items-center">
                  <Input
                    value={editedPaymentMethods[method.id] !== undefined ? editedPaymentMethods[method.id] : method.name}
                    onChange={(e) => handlePaymentMethodInputChange(method.id, e.target.value)}
                    className="flex-grow mr-2"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdatePaymentMethod(method.id, editedPaymentMethods[method.id])}
                    disabled={editedPaymentMethods[method.id] === undefined || editedPaymentMethods[method.id].trim() === '' || editedPaymentMethods[method.id] === method.name}
                    aria-label={`Update ${method.name}`}
                  >
                    Update
                  </Button>
                </li>
              ))}
            </ul>
          )}

          <h3 className="text-md font-semibold mt-4 mb-2">Add New Payment Method:</h3>
          <div className="flex gap-2">
            <Input
              id="newPaymentMethod"
              placeholder="e.g., Credit Card, PayPal"
              value={newPaymentMethodName}
              onChange={(e) => setNewPaymentMethodName(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleAddPaymentMethod}>Add</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
