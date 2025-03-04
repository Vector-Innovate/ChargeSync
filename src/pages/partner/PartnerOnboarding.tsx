import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePartnerStore } from '../../store/partnerStore';
import { SolarPanelDetails } from '../../types';

const PartnerOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const { setHasSolarPanel, setSolarPanelDetails, setHasChargingStation } = usePartnerStore();
  
  const [step, setStep] = useState(1);
  const [solarPanelOption, setSolarPanelOption] = useState<boolean | null>(null);
  const [chargingStationOption, setChargingStationOption] = useState<boolean | null>(null);
  
  // Solar panel form fields
  const [solarPanelForm, setSolarPanelForm] = useState<SolarPanelDetails>({
    name: '',
    area: '',
    kilowatt: 0,
    district: '',
    state: ''
  });
  
  const handleSolarPanelOptionSelect = (hasSolarPanel: boolean) => {
    setSolarPanelOption(hasSolarPanel);
    setHasSolarPanel(hasSolarPanel);
    
    if (!hasSolarPanel) {
      // Skip solar panel form if they don't want solar panels
      setStep(3);
    } else {
      setStep(2);
    }
  };
  
  const handleSolarPanelFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSolarPanelDetails(solarPanelForm);
    setStep(3);
  };
  
  const handleSolarPanelFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSolarPanelForm(prev => ({
      ...prev,
      [name]: name === 'kilowatt' ? parseFloat(value) : value
    }));
  };
  
  const handleChargingStationOptionSelect = (hasChargingStation: boolean) => {
    setChargingStationOption(hasChargingStation);
    setHasChargingStation(hasChargingStation);
    
    if (hasChargingStation) {
      // They already have a charging station, go to station registration
      navigate('/partner/register-station');
    } else {
      // They want to buy a charging station, go to store
      navigate('/partner/store');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Partner Onboarding
            </h2>
            
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    1
                  </div>
                  <div className="ml-3">
                    <span className="text-sm font-medium text-gray-900">Solar Panel</span>
                  </div>
                </div>
                
                <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    2
                  </div>
                  <div className="ml-3">
                    <span className="text-sm font-medium text-gray-900">Solar Details</span>
                  </div>
                </div>
                
                <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    3
                  </div>
                  <div className="ml-3">
                    <span className="text-sm font-medium text-gray-900">Charging Station</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Step 1: Solar Panel Option */}
            {step === 1 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Would you like to install solar panels?
                </h3>
                <p className="text-gray-600 mb-6">
                  Solar panels can help reduce your energy costs and make your charging station more sustainable.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleSolarPanelOptionSelect(true)}
                    className="bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition"
                  >
                    Yes, I want solar panels
                  </button>
                  <button
                    onClick={() => handleSolarPanelOptionSelect(false)}
                    className="bg-gray-200 text-gray-800 py-4 px-6 rounded-lg hover:bg-gray-300 transition"
                  >
                    No, skip this step
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Solar Panel Form */}
            {step === 2 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Solar Panel Details
                </h3>
                <p className="text-gray-600 mb-6">
                  Please provide details about your solar panel installation.
                </p>
                
                <form onSubmit={handleSolarPanelFormSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Installation Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={solarPanelForm.name}
                        onChange={handleSolarPanelFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                        Installation Area (sq. ft)
                      </label>
                      <input
                        type="text"
                        id="area"
                        name="area"
                        required
                        value={solarPanelForm.area}
                        onChange={handleSolarPanelFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="kilowatt" className="block text-sm font-medium text-gray-700 mb-1">
                        Capacity (kW)
                      </label>
                      <input
                        type="number"
                        id="kilowatt"
                        name="kilowatt"
                        required
                        min="0"
                        step="0.1"
                        value={solarPanelForm.kilowatt}
                        onChange={handleSolarPanelFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                        District
                      </label>
                      <input
                        type="text"
                        id="district"
                        name="district"
                        required
                        value={solarPanelForm.district}
                        onChange={handleSolarPanelFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <select
                        id="state"
                        name="state"
                        required
                        value={solarPanelForm.state}
                        onChange={handleSolarPanelFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Step 3: Charging Station Option */}
            {step === 3 && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Do you already have a charging station?
                </h3>
                <p className="text-gray-600 mb-6">
                  Let us know if you already have a charging station or if you'd like to purchase one from us.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleChargingStationOptionSelect(true)}
                    className="bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition"
                  >
                    Yes, I already have one
                  </button>
                  <button
                    onClick={() => handleChargingStationOptionSelect(false)}
                    className="bg-gray-200 text-gray-800 py-4 px-6 rounded-lg hover:bg-gray-300 transition"
                  >
                    No, I want to buy one
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerOnboarding;