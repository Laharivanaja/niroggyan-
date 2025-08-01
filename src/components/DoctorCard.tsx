import React from 'react';
import { Doctor } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  doctor: Doctor;
}

class DoctorCard extends React.Component<Props> {
  render() {
    const { doctor } = this.props;
    return (
      <div className="border p-4 rounded-lg shadow hover:shadow-md transition">
        <img src={doctor.profileImage} alt={doctor.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-center">{doctor.name}</h3>
        <p className="text-center text-sm">{doctor.speciality}</p>
        <p className="text-center text-sm text-gray-500">{doctor.hospital}</p>
        <div className="text-center mt-4">
          <Link
            to={`/doctor/${doctor.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Profile
          </Link>
        </div>
      </div>
    );
  }
}

export default DoctorCard;
