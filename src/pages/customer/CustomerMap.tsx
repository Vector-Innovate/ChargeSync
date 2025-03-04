import React, { useEffect, useState } from 'react';
import { useStationStore } from '../../store/stationStore';
import { Battery, Info } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CustomerMap: React.FC = () => {
  const { stations, fetchStations, selectedStation, selectStation } = useStationStore();
  const [viewState, setViewState] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 4
  });
  
  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  const markerIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="w-96 bg-white shadow-md p-4 overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Charging Stations</h2>
          
          {stations.length === 0 ? (
            <div className="text-center py-8">
              <Battery className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <p className="text-gray-500">Loading charging stations...</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {stations.map(station => (
                <li 
                  key={station.id}
                  className={`py-4 cursor-pointer hover:bg-gray-50 ${
                    selectedStation?.id === station.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => {
                    selectStation(station.id);
                    setViewState({
                      latitude: station.location.latitude,
                      longitude: station.location.longitude,
                      zoom: 14
                    });
                  }}
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-full mr-3 ${
                      station.isActive ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <Battery className={`h-5 w-5 ${
                        station.isActive ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900">{station.name}</h3>
                      <p className="text-gray-500 text-sm">{station.address}</p>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          station.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {station.isActive ? 'Available' : 'Unavailable'}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          {station.availablePorts} ports • ₹{station.pricePerKwh}/kWh
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Map */}
        <div className="flex-1 relative">
          <MapContainer
            center={[viewState.latitude, viewState.longitude]}
            zoom={viewState.zoom}
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {stations.map(station => (
              <Marker
                key={station.id}
                position={[station.location.latitude, station.location.longitude]}
                icon={markerIcon}
                eventHandlers={{
                  click: () => {
                    selectStation(station.id);
                  }
                }}
              >
                {selectedStation?.id === station.id && (
                  <Popup>
                    <div className="p-2 max-w-xs">
                      <h3 className="font-bold text-gray-900">{selectedStation.name}</h3>
                      <p className="text-gray-600 text-sm">{selectedStation.address}</p>
                      
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Price:</span>
                          <span className="ml-1 font-medium">₹{selectedStation.pricePerKwh}/kWh</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Ports:</span>
                          <span className="ml-1 font-medium">{selectedStation.availablePorts} available</span>
                        </div>
                      </div>
                      
                      <button
                        className="mt-3 w-full bg-blue-600 text-white py-1.5 px-3 rounded text-sm font-medium hover:bg-blue-700"
                        onClick={() => {
                          alert(`Charging session started at ${selectedStation.name}`);
                        }}
                      >
                        Start Charging
                      </button>
                    </div>
                  </Popup>
                )}
              </Marker>
            ))}
          </MapContainer>
          
          {/* Info Overlay */}
          <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md p-4 max-w-xs">
            <div className="flex items-center mb-2">
              <Info size={16} className="text-blue-600 mr-2" />
              <h3 className="font-medium text-gray-900">How to Use</h3>
            </div>
            <p className="text-sm text-gray-600">
              Click on a marker to view station details. Select "Start Charging" to begin a charging session.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerMap;