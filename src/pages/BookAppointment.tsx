import React, { Component, ChangeEvent, FormEvent } from 'react';
import { NavigateFunction, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Doctor } from '../types/Doctor';
import '../styles/BookAppointment.css';

interface BookAppointmentProps {
  match?: { params: { id: string } };
  location?: any;
  history?: { push: NavigateFunction };
}

interface BookAppointmentState {
  doctor: Doctor | null;
  name: string;
  age: string;
  date: string;
  submitted: boolean;
  loading: boolean;
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

class BookAppointment extends Component<BookAppointmentProps, BookAppointmentState> {
  constructor(props: BookAppointmentProps) {
    super(props);
    this.state = {
      doctor: null,
      name: '',
      age: '',
      date: '',
      submitted: false,
      loading: true,
    };
  }

  componentDidMount() {
    fetch('/doctors.json')
      .then(res => res.json())
      .then((data: Doctor[]) => {
        const doctor = data.find(
          doc => doc.id === parseInt(this.props.match?.params.id || '0')
        );
        this.setState({ doctor: doctor || null, loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, age, date } = this.state;

    if (name && age && date) {
      this.setState({ submitted: true }, () => {
        setTimeout(() => {
          this.props.history?.push('/success');
        }, 1000);
      });
    } else {
      alert('Please fill out all fields.');
    }
  };

  render() {
    const { doctor, name, age, date, loading, submitted } = this.state;

    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading doctor information...</p>
        </div>
      );
    }

    if (!doctor) {
      return (
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Doctor Not Found</h2>
          <p>We couldn't find the requested doctor information.</p>
          <a href="/" className="back-home-btn">Return to Home</a>
        </div>
      );
    }

    if (submitted) {
      return (
        <div className="success-container">
          <div className="success-animation">
            <div className="checkmark">✓</div>
          </div>
          <h2>Appointment Confirmed!</h2>
          <p>Your appointment with Dr. {doctor.name} has been scheduled.</p>
          <div className="success-details">
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Patient:</strong> {name}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="appointment-page">
        <div className="background-pattern"></div>
        
        {/* Navigation */}
        <nav className="nav-container">
          <a href="/" className="back-link">
            <span className="back-arrow">←</span>
            Back to Home
          </a>
        </nav>

        {/* Main Content */}
        <div className="booking-container">
          {/* Doctor Info Header */}
          <div className="doctor-header">
            <div className="doctor-avatar">
              <span className="doctor-initial">{doctor.name.charAt(0)}</span>
            </div>
            <div className="doctor-info">
              <h1 className="doctor-name">Dr. {doctor.name}</h1>
              <p className="doctor-specialty">{doctor.speciality}</p>
              <p className="doctor-hospital">{doctor.hospital}</p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="form-container">
            <h2 className="form-title">Book Your Appointment</h2>
            <p className="form-subtitle">Please fill in your details below</p>

            <form onSubmit={this.handleSubmit} className="booking-form">
              <div className="input-group">
                <label className="input-label">
                  <span className="label-text">Full Name</span>
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">
                  <span className="label-text">Age</span>
                  <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={age}
                  onChange={this.handleChange}
                  className="form-input"
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">
                  <span className="label-text">Preferred Date</span>
                  <span className="required">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={this.handleChange}
                  className="form-input"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                <span className="btn-text">Confirm Appointment</span>
                <span className="btn-icon">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(BookAppointment);