import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, User, ShoppingCart, Compass } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          Vector Innovate
        </Link>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="hidden md:inline-block">
                Welcome, {user?.name}
              </span>
              
              {user?.userType === 'partner' && (
                <Link to="/partner/dashboard" className="hover:text-blue-200">
                  Dashboard
                </Link>
              )}
              
              {user?.userType === 'customer' && (
                <Link to="/customer/map" className="hover:text-blue-200">
                  Find Stations
                </Link>
              )}
              
              {user?.userType === 'partner' && (
                <Link to="/partner/cart" className="hover:text-blue-200">
                  <ShoppingCart size={20} />
                </Link>
              )}
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1 hover:text-blue-200"
              >
                <LogOut size={18} />
                <span className="hidden md:inline-block">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200 flex items-center gap-1">
                <User size={18} />
                <span>Login</span>
              </Link>
              <Link 
                to="/signup" 
                className="bg-white text-blue-600 px-4 py-1 rounded-md hover:bg-blue-100"
              >
                Sign Up
              </Link>
              <Link to="/communities" className="hover:text-blue-200 flex items-center gap-1">
                <Compass size={18} />
                <span>Communities</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;