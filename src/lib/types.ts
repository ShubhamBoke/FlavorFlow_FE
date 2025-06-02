
export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  photoUrl?: string;
  dataAiHint?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  photoUrl?: string;
  rating: number;
  cuisine: string;
  menu: MenuItem[];
  dataAiHint?: string;
}

export enum UserRole {
  Member = "Member",
  Manager = "Manager",
  Admin = "Admin",
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
