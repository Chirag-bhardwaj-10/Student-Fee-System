import React, { useState } from "react";
import { motion } from "framer-motion";

const PaymentModal = ({ onClose, onPay }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onPay();
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/30 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Payment</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <div className="mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-32 rounded-lg flex items-center justify-center mb-4">
            <i className="fas fa-credit-card text-white text-4xl"></i>
          </div>
          
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-blue-500 mb-2">Student Fee Payment</h3>
            <p className="text-gray-500">Complete your fee payment to continue</p>
          </div>
          
          <div className="bg-white bg-opacity-5 rounded-lg p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Amount:</span>
              <span className="text-black font-bold">$500.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className="text-red-500 font-semibold">Pending</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="cardNumber">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-gray-800 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="expiry">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiry"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-gray-800 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="cvv">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                className="w-full px-4 py-2 bg-white bg-opacity-10 border border-gray-600 rounded-lg text-gray-800 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300"
                required
              />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
            >
              {processing ? (
                <span className="flex items-center justify-center">
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Processing...
                </span>
              ) : 'Pay Now'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default PaymentModal;