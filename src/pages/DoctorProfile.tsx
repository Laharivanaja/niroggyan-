// src/pages/DoctorProfile.tsx

import React, { Component } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Doctor } from '../types/Doctor';
import '../styles/DoctorProfile.css';


interface DoctorProfileProps {
  match?: { params: { id: string } };
  location?: any;
  history?: { push: (path: string) => void };
}

interface DoctorProfileState {
  doctor: Doctor | null;
}

function withRouter(Component: any) {
  return (props: any) => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    return (
      <Component
        {...props}
        match={{ params }}
        location={location}
        history={{ push: navigate }}
      />
    );
  };
}

class DoctorProfile extends Component<DoctorProfileProps, DoctorProfileState> {
  constructor(props: DoctorProfileProps) {
    super(props);
    this.state = {
      doctor: null,
    };
  }

  componentDidMount() {
    fetch('/doctors.json')
      .then(res => res.json())
      .then((data: Doctor[]) => {
        const doctor = data.find(
          doc => doc.id === parseInt(this.props.match?.params.id || '0')
        );
        this.setState({ doctor: doctor || null });
      });
  }

  render() {
    const { doctor } = this.state;

    if (!doctor) {
      return <div className="p-4 text-center">Loading doctor information...</div>;
    }

    return (
      <div className="p-6 max-w-2xl mx-auto">
        {/* Back to Home */}
        <div className="mb-4">
          <Link
            to="/"
            className="inline-block text-blue-500 hover:text-blue-700 underline"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <img
            src={doctor.profileImage}
            alt={doctor.name}
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
          <h2 className="text-2xl font-semibold text-center">{doctor.name}</h2>
          <p className="text-center text-gray-600">
            {doctor.speciality} at {doctor.hospital}
          </p>

          {/* Availability (if field exists) */}
          {'available' in doctor && (
            <p
              className={`mt-3 text-center font-semibold ${
                doctor.available ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {doctor.available ? 'Available Today' : 'Not Available Today'}
            </p>
          )}

          {/* Book Appointment Button */}
          <div className="mt-6 text-center">
            <Link
              to={`/book/${doctor.id}`}
              className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DoctorProfile);
