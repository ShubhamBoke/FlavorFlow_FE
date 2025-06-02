
import type { Restaurant, MenuItem } from './types';

export const dummyRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Pizza Palace',
    photoUrl: 'https://placehold.co/600x400.png',
    rating: 4.5,
    cuisine: 'Italian',
    dataAiHint: 'pizza restaurant',
    menu: [
      { id: 'm1', name: 'Margherita Pizza', description: 'Classic cheese and tomato pizza', price: 12.99, photoUrl: 'https://placehold.co/300x200.png', dataAiHint: 'margherita pizza' },
      { id: 'm2', name: 'Pepperoni Pizza', description: 'Pizza with pepperoni slices', price: 14.99, photoUrl: 'https://placehold.co/300x200.png', dataAiHint: 'pepperoni pizza' },
      { id: 'm3', name: 'Coca-Cola', description: 'Refreshing soft drink', price: 2.50, photoUrl: 'https://placehold.co/300x200.png', dataAiHint: 'coca cola' },
    ]
  },
  {
    id: '2',
    name: 'Burger Bliss',
    photoUrl: 'https://placehold.co/600x400.png',
    rating: 4.2,
    cuisine: 'American',
    dataAiHint: 'burger joint',
     menu: [
      { id: 'm4', name: 'Classic Burger', description: 'Beef patty with lettuce, tomato, and cheese', price: 9.99, photoUrl: 'https://placehold.co/300x200.png', dataAiHint: 'classic burger' },
      { id: 'm5', name: 'Fries', description: 'Crispy golden fries', price: 3.99, photoUrl: 'https://placehold.co/300x200.png', dataAiHint: 'french fries' },
    ]
  },
  {
    id: '3',
    name: 'Sushi Central',
    photoUrl: 'https://placehold.co/600x400.png',
    rating: 4.8,
    cuisine: 'Japanese',
    dataAiHint: 'sushi bar',
    menu: [
      { id: 'm6', name: 'Salmon Nigiri', description: 'Fresh salmon over rice', price: 5.00, photoUrl: 'https://placehold.co/300x200.png', dataAiHint: 'salmon nigiri' },
      { id: 'm7', name: 'California Roll', description: 'Crab, avocado, and cucumber roll', price: 7.50, photoUrl: 'https://placehold.co/300x200.png', dataAiHint: 'california roll' },
    ]
  },
   {
    id: '4',
    name: 'Taco Town',
    photoUrl: 'https://placehold.co/600x400.png',
    rating: 4.3,
    cuisine: 'Mexican',
    dataAiHint: 'taco shop',
    menu: [
      { id: 'm8', name: 'Chicken Tacos', description: 'Three chicken tacos with salsa and guacamole', price: 10.50, photoUrl: 'https://placehold.co/300x200.png', dataAiHint: 'chicken tacos' },
      { id: 'm9', name: 'Beef Burrito', description: 'Large burrito with beef, beans, and rice', price: 11.99, photoUrl: 'https://placehold.co/300x200.png', dataAiHint: 'beef burrito' },
    ]
  },
];

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return dummyRestaurants.find(r => r.id === id);
};

export const getMenuByRestaurantId = (id: string): MenuItem[] | undefined => {
  const restaurant = getRestaurantById(id);
  return restaurant?.menu;
}
