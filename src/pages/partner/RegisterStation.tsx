import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useStationStore } from '../../store/stationStore';
import { usePartnerStore } from '../../store/partnerStore';
import { MapPin } from 'lucide-react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RegisterStation: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addStation } = useStationStore();
  const { hasChargingStation } = usePartnerStore();

  useEffect(() => {
    // If the partner hasn't completed onboarding, redirect to onboarding
    if (!hasChargingStation) {
      navigate('/partner/onboarding');
    }
  }, [hasChargingStation, navigate]);
  
  const [stationName, setStationName] = useState('');
  const [address, setAddress] = useState('');
  const [availablePorts, setAvailablePorts] = useState(1);
  const [pricePerKwh, setPricePerKwh] = useState(10);
  const [location, setLocation] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 4
  });
  const [selectedLocation, setSelectedLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [error, setError] = useState('');
  
  const MapClickHandler = ({ onMapClick }: { onMapClick: (event: any) => void }) => {
    useMapEvents({
      click: (e) => {
        onMapClick({
          lngLat: {
            lat: e.latlng.lat,
            lng: e.latlng.lng
          }
        });
      },
    });
    return null;
  };

  const handleMapClick = (event: any) => {
    setSelectedLocation({
      latitude: event.lngLat.lat,
      longitude: event.lngLat.lng
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLocation) {
      setError('Please select a location on the map');
      return;
    }
    
    if (!user) {
      setError('You must be logged in to register a station');
      return;
    }
    
    const newStation = {
      id: Math.random().toString(36).substring(2, 9),
      partnerId: user.id,
      name: stationName,
      location: {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude
      },
      address,
      availablePorts,
      pricePerKwh,
      isActive: true
    };
    
    addStation(newStation);
    navigate('/partner/dashboard');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Register Your Charging Station</h2>
            <p className="text-gray-600 mt-1">
              Add your charging station to our network and start earning.
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 my-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="stationName" className="block text-sm font-medium text-gray-700 mb-1">
                  Station Name
                </label>
                <input
                  type="text"
                  id="stationName"
                  required
                  value={stationName}
                  onChange={(e) => setStationName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Central EV Station"
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Full address of your station"
                />
              </div>
              
              <div>
                <label htmlFor="availablePorts" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Charging Ports
                </label>
                <input
                  type="number"
                  id="availablePorts"
                  required
                  min="1"
                  max="20"
                  value={availablePorts}
                  onChange={(e) => setAvailablePorts(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="pricePerKwh" className="block text-sm font-medium text-gray-700 mb-1">
                  Price per kWh (₹)
                </label>
                <input
                  type="number"
                  id="pricePerKwh"
                  required
                  min="1"
                  step="0.5"
                  value={pricePerKwh}
                  onChange={(e) => setPricePerKwh(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pin Your Location on the Map
              </label>
              <p className="text-gray-500 text-sm mb-4">
                Click on the map to select the exact location of your charging station.
              </p>
              
              <div className="h-96 rounded-lg overflow-hidden border border-gray-300">
                <MapContainer
                  center={[location.latitude, location.longitude]}
                  zoom={location.zoom}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <MapClickHandler onMapClick={handleMapClick} />
                  {selectedLocation && (
                    <div 
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -100%)',
                        zIndex: 1000
                      }}
                    >
                      <MapPin size={36} className="text-red-500" />
                    </div>
                  )}
                </MapContainer>
              </div>
              
              {selectedLocation && (
                <div className="mt-2 text-sm text-gray-500">
                  Selected coordinates: {selectedLocation.latitude.toFixed(6)}, {selectedLocation.longitude.toFixed(6)}
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/partner/dashboard')}
                className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register Station
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterStation;