// src/pages/Success.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Success.css';

interface SuccessState {
  showConfetti: boolean;
}

export default class Success extends React.Component<{}, SuccessState> {
  private confettiTimeout: NodeJS.Timeout | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      showConfetti: false
    };
  }

  componentDidMount() {
    // Trigger confetti animation after component mounts
    setTimeout(() => {
      this.setState({ showConfetti: true });
    }, 300);

    // Remove confetti after animation
    this.confettiTimeout = setTimeout(() => {
      this.setState({ showConfetti: false });
    }, 3000);
  }

  componentWillUnmount() {
    if (this.confettiTimeout) {
      clearTimeout(this.confettiTimeout);
    }
  }

  render() {
    const { showConfetti } = this.state;

    return (
      <div className="success-page">
        <div className="background-pattern"></div>
        
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  backgroundColor: ['#4f46e5', '#7c3aed', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)]
                }}
              />
            ))}
          </div>
        )}

        <div className="success-container">
          {/* Success Animation */}
          <div className="success-animation">
            <div className="checkmark-circle">
              <div className="checkmark">✓</div>
            </div>
          </div>

          {/* Success Content */}
          <div className="success-content">
            <h1 className="success-title">Appointment Confirmed!</h1>
            <p className="success-subtitle">
              Great news! Your appointment has been successfully scheduled.
            </p>

            {/* Appointment Details Card */}
            <div className="appointment-card">
              <div className="card-header">
                <div className="card-icon">📅</div>
                <h3>What's Next?</h3>
              </div>
              <div className="next-steps">
                <div className="step">
                  <div className="step-icon">📧</div>
                  <div className="step-content">
                    <h4>Confirmation Email</h4>
                    <p>You'll receive a detailed confirmation email within the next few minutes</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-icon">🔔</div>
                  <div className="step-content">
                    <h4>Appointment Reminder</h4>
                    <p>We'll send you a reminder 24 hours before your appointment</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-icon">🏥</div>
                  <div className="step-content">
                    <h4>Visit the Clinic</h4>
                    <p>Arrive 15 minutes early with your ID and insurance information</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="important-notes">
              <h4>Important Notes:</h4>
              <ul>
                <li>Please arrive 15 minutes before your scheduled time</li>
                <li>Bring a valid photo ID and insurance card</li>
                <li>If you need to reschedule, please call at least 24 hours in advance</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <Link to="/" className="primary-btn">
                <span className="btn-text">Back to Home</span>
                <span className="btn-icon">🏠</span>
              </Link>
              
              <button className="secondary-btn" onClick={() => window.print()}>
                <span className="btn-text">Print Details</span>
                <span className="btn-icon">🖨️</span>
              </button>
            </div>

            {/* Additional Actions */}
            <div className="additional-actions">
              <Link to="/" className="text-link">
                Book Another Appointment
              </Link>
              <span className="separator">•</span>
              <button className="text-link" onClick={() => window.location.href = 'mailto:support@healthcare.com'}>
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-element heart">💚</div>
          <div className="floating-element stethoscope">🩺</div>
          <div className="floating-element medical">⚕️</div>
        </div>
      </div>
    );
  }
}