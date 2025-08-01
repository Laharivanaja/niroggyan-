import React from 'react';
import { Doctor } from '../types';
import { Link } from 'react-router-dom';
import DoctorCard from '../components/DoctorCard';
import "../styles/LandingPage.css";

interface LandingPageState {
  doctors: Doctor[];
  searchTerm: string;
  filteredDoctors: Doctor[];
}

class LandingPage extends React.Component<{}, LandingPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      doctors: [],
      searchTerm: '',
      filteredDoctors: []
    };
  }

  componentDidMount() {
    fetch('/doctors.json')
      .then(res => res.json())
      .then((data: Doctor[]) => {
        this.setState({ doctors: data, filteredDoctors: data });
      });
  }

  handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    const filtered = this.state.doctors.filter(doc =>
      doc.name.toLowerCase().includes(term) ||
      doc.speciality.toLowerCase().includes(term) ||
      doc.hospital.toLowerCase().includes(term)
    );
    this.setState({ searchTerm: term, filteredDoctors: filtered });
  };

  render() {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Find a Doctor</h1>
        <input
          type="text"
          placeholder="Search by name, speciality, or hospital"
          value={this.state.searchTerm}
          onChange={this.handleSearch}
          className="w-full p-2 border rounded mb-6"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {this.state.filteredDoctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    );
  }
}

export default LandingPage;