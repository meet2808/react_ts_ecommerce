import React from 'react';

const Cancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-600">Payment Canceled</h1>
        <p className="mt-4 text-gray-600">Your payment was not processed.</p>
        <button
          className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => window.location.href = '/'}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Cancel;
