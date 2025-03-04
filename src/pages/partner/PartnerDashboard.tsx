import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { usePartnerStore } from '../../store/partnerStore';
import { useStationStore } from '../../store/stationStore';
import { Battery, Sun, MapPin, Plus, ChevronRight } from 'lucide-react';

const PartnerDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { solarPanelDetails, hasSolarPanel } = usePartnerStore();
  const { stations, fetchStations } = useStationStore();
  
  useEffect(() => {
    fetchStations();
  }, [fetchStations]);
  
  // Filter stations for this partner
  const partnerStations = stations.filter(station => station.partnerId === user?.id);
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Partner Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Battery className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">Charging Stations</h2>
                <p className="text-3xl font-bold text-gray-900">{partnerStations.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Sun className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">Solar Panel</h2>
                <p className="text-3xl font-bold text-gray-900">
                  {hasSolarPanel ? `${solarPanelDetails?.kilowatt || 0} kW` : 'None'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">Total Charges</h2>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Charging Stations */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Your Charging Stations</h2>
            <Link 
              to="/partner/register-station" 
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <Plus size={16} className="mr-1" />
              Add New
            </Link>
          </div>
          
          <div className="divide-y divide-gray-200">
            {partnerStations.length > 0 ? (
              partnerStations.map(station => (
                <div key={station.id} className="px-6 py-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">{station.name}</h3>
                    <p className="text-gray-500 text-sm">{station.address}</p>
                    <div className="flex items-center mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        station.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {station.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        {station.availablePorts} ports • ₹{station.pricePerKwh}/kWh
                      </span>
                    </div>
                  </div>
                  <Link 
                    to={`/partner/station/${station.id}`}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <ChevronRight size={20} />
                  </Link>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <p className="text-gray-500 mb-4">You haven't registered any charging stations yet.</p>
                <Link 
                  to="/partner/register-station" 
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus size={16} className="mr-2" />
                  Register Your First Station
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Solar Panel Details */}
        {hasSolarPanel && solarPanelDetails && (
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Solar Panel Details</h2>
            </div>
            
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Installation Name</p>
                  <p className="font-medium">{solarPanelDetails.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Area</p>
                  <p className="font-medium">{solarPanelDetails.area} sq. ft</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Capacity</p>
                  <p className="font-medium">{solarPanelDetails.kilowatt} kW</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{solarPanelDetails.district}, {solarPanelDetails.state}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/partner/register-station"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Register Station</h3>
            </div>
            <p className="text-gray-600">Add a new charging station to your network.</p>
          </Link>
          
          <Link 
            to="/partner/store"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
          >
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Battery className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Buy Equipment</h3>
            </div>
            <p className="text-gray-600">Purchase charging stations and accessories.</p>
          </Link>
          
          {!hasSolarPanel && (
            <Link 
              to="/partner/solar-panel"
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
            >
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Sun className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900">Add Solar Panel</h3>
              </div>
              <p className="text-gray-600">Register solar panels to power your stations.</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;