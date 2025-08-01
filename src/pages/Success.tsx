// src/pages/Success.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Success.css';

export default class Success extends React.Component {
  render() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">Appointment Booked!</h1>
          <p className="text-gray-700 mb-6">
            Your appointment has been successfully scheduled. You will receive a confirmation email shortly.
          </p>
          <Link
            to="/"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
}
