import React from 'react';
import { Doctor } from '../types';
import { Link } from 'react-router-dom';
import DoctorCard from '../components/DoctorCard';
import "../styles/LandingPage.css";

interface LandingPageState {
  doctors: Doctor[];
  searchTerm: string;
  filteredDoctors: Doctor[];
  loading: boolean;
  selectedSpecialty: string;
  availableSpecialties: string[];
}

class LandingPage extends React.Component<{}, LandingPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      doctors: [],
      searchTerm: '',
      filteredDoctors: [],
      loading: true,
      selectedSpecialty: '',
      availableSpecialties: []
    };
  }

  componentDidMount() {
    fetch('/doctors.json')
      .then(res => res.json())
      .then((data: Doctor[]) => {
        const specialtiesSet = new Set(data.map(doc => doc.speciality));
        const specialties = Array.from(specialtiesSet);
        this.setState({ 
          doctors: data, 
          filteredDoctors: data, 
          loading: false,
          availableSpecialties: specialties
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    this.setState({ searchTerm: term }, this.filterDoctors);
  };

  handleSpecialtyFilter = (specialty: string) => {
    this.setState({ selectedSpecialty: specialty }, this.filterDoctors);
  };

  filterDoctors = () => {
    const { doctors, searchTerm, selectedSpecialty } = this.state;
    let filtered = doctors;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm) ||
        doc.speciality.toLowerCase().includes(searchTerm) ||
        doc.hospital.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by specialty
    if (selectedSpecialty) {
      filtered = filtered.filter(doc => doc.speciality === selectedSpecialty);
    }

    this.setState({ filteredDoctors: filtered });
  };

  clearFilters = () => {
    this.setState({
      searchTerm: '',
      selectedSpecialty: '',
      filteredDoctors: this.state.doctors
    });
  };

  render() {
    const { 
      filteredDoctors, 
      searchTerm, 
      loading, 
      selectedSpecialty, 
      availableSpecialties 
    } = this.state;

    if (loading) {
      return (
        <div className="landing-page">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading doctors...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="landing-page">
        <div className="background-pattern"></div>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                Find Your Perfect
                <span className="hero-accent"> Healthcare Provider</span>
              </h1>
              <p className="hero-subtitle">
                Connect with qualified doctors and book appointments instantly. 
                Your health journey starts here.
              </p>
              
              {/* Search Section */}
              <div className="search-container">
                <div className="search-wrapper">
                  <div className="search-icon">🔍</div>
                  <input
                    type="text"
                    placeholder="Search by doctor name, specialty, or hospital..."
                    value={searchTerm}
                    onChange={this.handleSearch}
                    className="search-input"
                  />
                  {searchTerm && (
                    <button 
                      onClick={this.clearFilters}
                      className="clear-search"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="stats-container">
                <div className="stat-item">
                  <span className="stat-number">{this.state.doctors.length}+</span>
                  <span className="stat-label">Qualified Doctors</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{availableSpecialties.length}+</span>
                  <span className="stat-label">Specialties</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="filters-section">
          <div className="filters-container">
            <h3 className="filters-title">Filter by Specialty</h3>
            <div className="specialty-filters">
              <button
                className={`specialty-btn ${!selectedSpecialty ? 'active' : ''}`}
                onClick={() => this.handleSpecialtyFilter('')}
              >
                All Specialties
              </button>
              {availableSpecialties.map(specialty => (
                <button
                  key={specialty}
                  className={`specialty-btn ${selectedSpecialty === specialty ? 'active' : ''}`}
                  onClick={() => this.handleSpecialtyFilter(specialty)}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="results-section">
          <div className="results-container">
            <div className="results-header">
              <h2 className="results-title">
                {filteredDoctors.length > 0 
                  ? `Found ${filteredDoctors.length} Doctor${filteredDoctors.length === 1 ? '' : 's'}`
                  : 'No Doctors Found'
                }
              </h2>
              {(searchTerm || selectedSpecialty) && (
                <button onClick={this.clearFilters} className="clear-filters-btn">
                  Clear All Filters
                </button>
              )}
            </div>

            {filteredDoctors.length > 0 ? (
              <div className="doctors-grid">
                {filteredDoctors.map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">👨‍⚕️</div>
                <h3>No doctors found</h3>
                <p>Try adjusting your search criteria or browse all available doctors.</p>
                <button onClick={this.clearFilters} className="browse-all-btn">
                  Browse All Doctors
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="features-container">
            <h2 className="features-title">Why Choose Our Platform?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Instant Booking</h3>
                <p>Book appointments instantly with just a few clicks. No waiting, no hassle.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🏥</div>
                <h3>Verified Doctors</h3>
                <p>All our healthcare providers are verified and certified professionals.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💬</div>
                <h3>24/7 Support</h3>
                <p>Get help whenever you need it with our round-the-clock customer support.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Secure & Private</h3>
                <p>Your medical information is protected with industry-standard encryption.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default LandingPage;