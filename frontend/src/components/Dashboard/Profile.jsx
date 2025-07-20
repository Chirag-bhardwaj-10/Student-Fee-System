import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import PaymentModal from "../Payment/PaymentModal";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/students/profile");
        setProfile(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put("/students/profile", formData);
      setProfile(response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await api.post("/payments/pay");
      setProfile(response.data);
      setShowPaymentModal(false);
      alert('Payment successful!');
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-black mb-6">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white bg-opacity-5 rounded-xl p-6 text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold mb-4">
                {profile.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-black mb-2">{profile.name}</h2>
              <p className="text-gray-600 mb-4">{profile.email}</p>
              
              <div className="mb-4">
                <span className={`px-4 py-2 inline-flex text-sm leading-5 font-semibold rounded-full ${
                  profile.isFeePaid ? 'bg-green-500 bg-opacity-20 text-green-300' : 'bg-red-500 bg-opacity-20 text-red-300'
                }`}>
                  {profile.isFeePaid ? 'Fee Paid' : 'Fee Not Paid'}
                </span>
              </div>
              
              {!profile.isFeePaid && (
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Pay Fees
                </button>
              )}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white bg-opacity-5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-black mb-4">Edit Profile</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300"
                    required
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    Update Profile
                  </button>
                  
                  <button
                    type="button"
                    onClick={logout}
                    className="bg-red-500 bg-opacity-20 hover:bg-opacity-30 text-red-300 font-bold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out"
                  >
                    Logout
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {showPaymentModal && (
        <PaymentModal 
          onClose={() => setShowPaymentModal(false)} 
          onPay={handlePayment} 
        />
      )}
    </div>
  );
};

export default Profile;