import { create } from 'zustand';
import { ChargingStation } from '../types';
import { collection, addDoc, getDocs, query, where, getFirestore } from 'firebase/firestore';
import { auth } from '../firebase';

interface StationState {
  stations: ChargingStation[];
  selectedStation: ChargingStation | null;
  loading: boolean;
  error: string | null;
  
  fetchStations: () => Promise<void>;
  selectStation: (stationId: string) => void;
  addStation: (station: ChargingStation) => void;
}

const db = getFirestore();
const stationsRef = collection(db, 'stations');

// Initial stations array
const initialStations: ChargingStation[] = [
  {
    id: '1',
    partnerId: '1',
    name: 'Central EV Station',
    location: {
      latitude: 28.6139,
      longitude: 77.2090
    },
    address: '123 Main St, New Delhi',
    availablePorts: 4,
    pricePerKwh: 12,
    isActive: true
  },
  {
    id: '2',
    partnerId: '1',
    name: 'Green Energy Hub',
    location: {
      latitude: 19.0760,
      longitude: 72.8777
    },
    address: '456 Park Ave, Mumbai',
    availablePorts: 6,
    pricePerKwh: 14,
    isActive: true
  },
  {
    id: '3',
    partnerId: '1',
    name: 'Eco Charge Point',
    location: {
      latitude: 12.9716,
      longitude: 77.5946
    },
    address: '789 Tech Park, Bangalore',
    availablePorts: 2,
    pricePerKwh: 10,
    isActive: true
  }
];

export const useStationStore = create<StationState>((set, get) => ({
  stations: [],
  selectedStation: null,
  loading: false,
  error: null,
  
  fetchStations: async () => {
    set({ loading: true, error: null });
    
    try {
      const querySnapshot = await getDocs(stationsRef);
      const stations = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as ChargingStation[];
      
      set({ stations, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch stations', loading: false });
    }
  },
  
  selectStation: (stationId) => {
    const station = get().stations.find(s => s.id === stationId) || null;
    set({ selectedStation: station });
  },
  
  addStation: async (station) => {
    try {
      const docRef = await addDoc(stationsRef, station);
      const newStation = { ...station, id: docRef.id };
      
      set((state) => ({
        stations: [...state.stations, newStation]
      }));
    } catch (error) {
      set({ error: 'Failed to add station' });
    }
  }
}));