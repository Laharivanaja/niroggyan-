import React, { Component, ChangeEvent, FormEvent } from 'react';
import { NavigateFunction, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Doctor } from '../types/Doctor';

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

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, age, date } = this.state;

    if (name && age && date) {
      this.setState({ submitted: true }, () => {
        this.props.history?.push('/success');
      });
    } else {
      alert('Please fill out all fields.');
    }
  };

  render() {
    const { doctor, name, age, date } = this.state;

    if (!doctor) {
      return <div className="p-4 text-center">Loading doctor information...</div>;
    }

    return (
      <div className="p-6 max-w-xl mx-auto">
        {/* Back to Home */}
        <div className="mb-4">
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            ← Back to Home
          </a>
        </div>

        <h2 className="text-2xl font-semibold mb-2 text-center">
          Book Appointment with Dr. {doctor.name}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {doctor.speciality} at {doctor.hospital}
        </p>

        <form onSubmit={this.handleSubmit} className="bg-white shadow-md rounded p-6">
          <div className="mb-4">
            <label className="block mb-1 font-medium">Your Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Your Age</label>
            <input
              type="number"
              name="age"
              value={age}
              onChange={this.handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your age"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium">Appointment Date</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={this.handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(BookAppointment);
