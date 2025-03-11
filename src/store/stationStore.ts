import { create } from 'zustand';
import { ChargingStation } from '../types';
import { collection, addDoc, getDocs, query, where, getFirestore, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { auth } from '../firebase';

interface StationState {
  stations: ChargingStation[];
  selectedStation: ChargingStation | null;
  loading: boolean;
  error: string | null;
  
  fetchStations: () => Promise<void>;
  selectStation: (stationId: string) => void;
  addStation: (station: Omit<ChargingStation, 'id'>) => Promise<void>;
  updateStation: (station: ChargingStation) => Promise<void>;
  deleteStation: (stationId: string) => Promise<void>;
}

const db = getFirestore();
const stationsRef = collection(db, 'stations');

export const useStationStore = create<StationState>((set, get) => ({
  stations: [],
  selectedStation: null,
  loading: false,
  error: null,

  fetchStations: async () => {
    set({ loading: true, error: null });
    try {
      // Query stations with location data
      const q = query(stationsRef, where('location', '!=', null));
      const querySnapshot = await getDocs(q);
      const stations = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ChargingStation[];
      set({ stations, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch stations', loading: false });
      console.error('Error fetching stations:', error);
    }
  },

  selectStation: (stationId) => {
    const station = get().stations.find(s => s.id === stationId) || null;
    set({ selectedStation: station });
  },

  addStation: async (stationData) => {
    set({ loading: true, error: null });
    try {
      const docRef = await addDoc(stationsRef, stationData);
      const newStation = { id: docRef.id, ...stationData };
      set(state => ({
        stations: [...state.stations, newStation],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to add station', loading: false });
      console.error('Error adding station:', error);
    }
  },

  updateStation: async (station) => {
    set({ loading: true, error: null });
    try {
      const stationRef = doc(db, 'stations', station.id);
      await updateDoc(stationRef, station);
      set(state => ({
        stations: state.stations.map(s => s.id === station.id ? station : s),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update station', loading: false });
      console.error('Error updating station:', error);
    }
  },

  deleteStation: async (stationId) => {
    set({ loading: true, error: null });
    try {
      const stationRef = doc(db, 'stations', stationId);
      await deleteDoc(stationRef);
      set(state => ({
        stations: state.stations.filter(s => s.id !== stationId),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete station', loading: false });
      console.error('Error deleting station:', error);
    }
  }
}));