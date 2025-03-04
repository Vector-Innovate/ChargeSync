export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'partner' | 'customer';
}

export interface SolarPanelDetails {
  name: string;
  area: string;
  kilowatt: number;
  district: string;
  state: string;
}

export interface ChargingStation {
  id: string;
  partnerId: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  address: string;
  availablePorts: number;
  pricePerKwh: number;
  isActive: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ChargingProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}