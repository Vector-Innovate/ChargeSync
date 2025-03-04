import { ChargingProduct } from '../types';

export const chargingProducts: ChargingProduct[] = [
  {
    id: 'cs-basic',
    name: 'EcoCharge Basic',
    description: 'Entry-level charging station with 7kW power output. Perfect for residential use with single vehicle charging.',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1647500660548-8b2bdd41d0b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cs-advanced',
    name: 'EcoCharge Pro',
    description: 'Advanced charging station with 11kW power output and smart features. Ideal for small businesses and multi-vehicle homes.',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cs-premium',
    name: 'EcoCharge Ultra',
    description: 'Premium charging station with 22kW power output, touchscreen interface, and advanced load balancing. Best for commercial use.',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1649159261849-8eaaac6b8710?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  }
];