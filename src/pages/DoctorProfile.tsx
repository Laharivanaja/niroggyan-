import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Doctor } from '../types/Doctor'; 
import '../styles/DoctorProfile.css';

const DoctorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    
    if (!id || isNaN(parseInt(id))) {
      setLoading(false);
      setDoctor(null); 
      return;
    }

    setLoading(true);
    fetch('/doctors.json')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: Doctor[]) => {
        const foundDoctor = data.find(
          doc => doc.id === parseInt(id as string)
        );
        setDoctor(foundDoctor || null);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch doctor data:", error);
        setLoading(false);
        setDoctor(null); 
      });
  }, [id]); 

  const handleImageError = () => {
    setImageError(true);
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading doctor information...</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="profile-page">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Doctor Not Found</h2>
          <p>We couldn't find the requested doctor information.</p>
          <Link to="/" className="back-home-btn">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="background-pattern"></div>

      {/* Navigation */}
      <nav className="nav-container">
        <Link to="/" className="back-link">
          <span className="back-arrow">←</span>
          Back to Home
        </Link>
      </nav>

      {/* Main Profile Container */}
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-image-container">
            {!imageError && doctor.profileImage ? (
              <img
                src={doctor.profileImage}
                alt={doctor.name}
                className="profile-image"
                onError={handleImageError}
              />
            ) : (
              // Fallback if profileImage is not provided or errors, using first letter of name
              <div className="profile-avatar">
                <span className="avatar-initial">{/*doctor.name.charAt(0)*/}</span>
              </div>
            )}
            <div className="image-border"></div>
          </div>

          <div className="profile-info">
            <h1 className="doctor-name">{doctor.name}</h1>
            <p className="doctor-speciality">{doctor.speciality}</p>
            <p className="doctor-hospital">
              <span className="hospital-icon">🏥</span>
              {doctor.hospital}
            </p>
          </div>
        </div>

        
        <div className={`availability-badge ${doctor.available ? 'available' : 'unavailable'}`}>
          <span className="status-indicator"></span>
          <span className="status-text">
            {doctor.available ? 'Available Today' : 'Not Available Today'}
          </span>
        </div>

        <div className="details-grid">
          <div className="detail-card">
            <div className="detail-icon">👨‍⚕️</div>
            <h3>Specialization</h3>
            <p>{doctor.speciality}</p>
          </div>

          <div className="detail-card">
            <div className="detail-icon">🏥</div>
            <h3>Hospital</h3>
            <p>{doctor.hospital}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <Link
            to={`/book/${doctor.id}`}
            className="primary-btn book-btn"
          >
            <span className="btn-text">Book Appointment</span>
            <span className="btn-icon">📅</span>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;