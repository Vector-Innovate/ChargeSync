import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Sun, MapPin, Users, Shield, BarChart } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Powering the Future of Electric Mobility
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Join our network of charging stations and solar energy partners to accelerate the transition to sustainable transportation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup?type=partner" 
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-100 transition"
            >
              Become a Partner
            </Link>
            <Link 
              to="/signup?type=customer" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition"
            >
              Join as Customer
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Vector Innovate?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Decentralized Network</h3>
              <p className="text-gray-600">
                Access charging stations across the country through our partner network, ensuring you're never far from a charge.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sun size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Solar Integration</h3>
              <p className="text-gray-600">
                Our partners can integrate solar panels with charging stations, creating a truly sustainable energy ecosystem.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Mapping</h3>
              <p className="text-gray-600">
                Find available charging stations near you with our interactive map showing real-time availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1593941707882-a5bfcf2dd8b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="EV Charging Station" 
                className="rounded-lg shadow-lg"
              />
            </div>
            
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold mb-6">Partner With Us</h2>
              <p className="text-gray-600 mb-6">
                Join our network of charging station partners and create new revenue streams while contributing to a sustainable future.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                    <BarChart size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Additional Revenue</h4>
                    <p className="text-gray-600">Generate income from your charging stations through our platform.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                    <Users size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Increased Visibility</h4>
                    <p className="text-gray-600">Get discovered by EV owners looking for charging stations in your area.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                    <Shield size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Secure Transactions</h4>
                    <p className="text-gray-600">Our platform handles payments securely, ensuring you get paid for every charge.</p>
                  </div>
                </li>
              </ul>
              
              <Link 
                to="/signup?type=partner" 
                className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join the Green Revolution?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're looking to charge your vehicle or become a charging station partner, Vector Innovate has you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-100 transition"
            >
              Sign Up Now
            </Link>
            <Link 
              to="/contact" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;