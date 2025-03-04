import { create } from 'zustand';
import { SolarPanelDetails, ChargingStation } from '../types';

interface PartnerState {
  solarPanelDetails: SolarPanelDetails | null;
  chargingStations: ChargingStation[];
  hasSolarPanel: boolean | null;
  hasChargingStation: boolean | null;
  
  setSolarPanelDetails: (details: SolarPanelDetails) => void;
  setHasSolarPanel: (value: boolean) => void;
  setHasChargingStation: (value: boolean) => void;
  addChargingStation: (station: ChargingStation) => void;
}

export const usePartnerStore = create<PartnerState>((set) => ({
  solarPanelDetails: null,
  chargingStations: [],
  hasSolarPanel: null,
  hasChargingStation: null,
  
  setSolarPanelDetails: (details) => set({ solarPanelDetails: details }),
  setHasSolarPanel: (value) => set({ hasSolarPanel: value }),
  setHasChargingStation: (value) => set({ hasChargingStation: value }),
  addChargingStation: (station) => set((state) => ({ 
    chargingStations: [...state.chargingStations, station] 
  })),
}));