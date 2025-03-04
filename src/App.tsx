import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Partner Pages
import PartnerOnboarding from './pages/partner/PartnerOnboarding';
import PartnerDashboard from './pages/partner/PartnerDashboard';
import RegisterStation from './pages/partner/RegisterStation';
import Store from './pages/partner/Store';
import Cart from './pages/partner/Cart';

// Customer Pages
import CustomerMap from './pages/customer/CustomerMap';
import StationDetails from './pages/customer/StationDetails';

// Protected Route Component
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  userType?: 'partner' | 'customer';
}> = ({ children, userType }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (userType && user?.userType !== userType) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Partner Routes */}
            <Route 
              path="/partner/onboarding" 
              element={
                <ProtectedRoute userType="partner">
                  <PartnerOnboarding />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/partner/dashboard" 
              element={
                <ProtectedRoute userType="partner">
                  <PartnerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/partner/register-station" 
              element={
                <ProtectedRoute userType="partner">
                  <RegisterStation />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/partner/store" 
              element={
                <ProtectedRoute userType="partner">
                  <Store />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/partner/cart" 
              element={
                <ProtectedRoute userType="partner">
                  <Cart />
                </ProtectedRoute>
              } 
            />
            
            {/* Customer Routes */}
            <Route 
              path="/customer/map" 
              element={
                <ProtectedRoute userType="customer">
                  <CustomerMap />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/customer/station/:stationId" 
              element={
                <ProtectedRoute userType="customer">
                  <StationDetails />
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;