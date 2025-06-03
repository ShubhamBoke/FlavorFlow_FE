
export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  rating: number;
  photoUrl?: string;
  dataAiHint?: string;
}

export interface Restaurant {
  id: number;
  name: string;
  photoUrl?: string;
  rating: number;
  cuisine: string;
  menuItemList: MenuItem[];
  dataAiHint?: string;
}

export enum UserRole {
  Member = "ROLE_MEMBER",
  Manager = "ROLE_MANAGER",
  Admin = "ROLE_ADMIN",
}

export interface PaymentMethod {
  id: number,
  name: string
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface CartItem {
 id: number;
 menuItem: MenuItem;
  quantity: number;
 subtotal: number;
}

export interface Cart {
  id: number;
  total: number;
  enabled: boolean;
  cartItemList: CartItem[];
}

export interface Order {
  id: number;
  cart: Cart;
  paymentMethod: {
    id: number;
    name: string;
  };
  orderStatus: string;
}

