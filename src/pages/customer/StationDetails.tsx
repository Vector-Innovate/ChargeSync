import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStationStore } from '../../store/stationStore';
import { Battery, Clock, Zap, ArrowLeft, MapPin } from 'lucide-react';

const StationDetails: React.FC = () => {
  const { stationId } = useParams<{ stationId: string }>();
  const { stations, fetchStations, selectStation, selectedStation } = useStationStore();
  const [chargingTime, setChargingTime] = useState(30);
  const [estimatedCost, setEstimatedCost] = useState(0);
  
  useEffect(() => {
    fetchStations();
    if (stationId) {
      selectStation(stationId);
    }
  }, [fetchStations, selectStation, stationId]);
  
  useEffect(() => {
    if (selectedStation) {
      setEstimatedCost((chargingTime / 60) * 7.5 * selectedStation.pricePerKwh);
    }
  }, [chargingTime, selectedStation]);
  
  if (!selectedStation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Battery className="mx-auto h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-500">Loading station details...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/customer/map" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Map
        </Link>
        
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedStation.name}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin size={16} className="mr-1" />
              <span>{selectedStation.address}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Battery className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-medium text-gray-900">Available Ports</h3>
                </div>
                <p className="text-2xl font-bold text-blue-600">{selectedStation.availablePorts}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Zap className="h-5 w-5 text-green-600 mr-2" />
                  <h3 className="font-medium text-gray-900">Price per kWh</h3>
                </div>
                <p className="text-2xl font-bold text-green-600">₹{selectedStation.pricePerKwh}</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-purple-600 mr-2" />
                  <h3 className="font-medium text-gray-900">Status</h3>
                </div>
                <p className={`text-lg font-bold ${selectedStation.isActive ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedStation.isActive ? 'Available' : 'Unavailable'}
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Start Charging Session</h2>
              
              <div className="mb-6">
                <label htmlFor="chargingTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Charging Duration (minutes)
                </label>
                <input
                  type="range"
                  id="chargingTime"
                  min="10"
                  max="120"
                  step="5"
                  value={chargingTime}
                  onChange={(e) => setChargingTime(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>10 min</span>
                  <span>{chargingTime} min</span>
                  <span>120 min</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Estimated Energy</span>
                  <span className="font-medium">{((chargingTime / 60) * 7.5).toFixed(1)} kWh</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Price per kWh</span>
                  <span className="font-medium">₹{selectedStation.pricePerKwh}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-bold">Estimated Cost</span>
                  <span className="font-bold">₹{estimatedCost.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition"
                onClick={() => {
                  alert(`Charging session started at ${selectedStation.name} for ${chargingTime} minutes`);
                }}
              >
                Start Charging
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Station Information</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Charging Speed</h3>
              <p className="text-gray-600">This station offers fast charging at 7.5 kW per hour.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">Connector Types</h3>
              <p className="text-gray-600">Type 2 connectors available for all electric vehicles.</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">Amenities</h3>
              <p className="text-gray-600">Restrooms, convenience store, and waiting area available on site.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationDetails;