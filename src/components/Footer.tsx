import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section brand">
            <div className="footer-logo">
              <span className="logo-icon">💗</span>
              <span className="logo-text">Ammi's Voice</span>
            </div>
            <p className="tagline">
              Supporting mothers through the postpartum journey with care and
              compassion.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="social-icon">f</i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="social-icon">t</i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="social-icon">i</i>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <i className="social-icon">l</i>
              </a>
            </div>
          </div>

          <div className="footer-section links">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#services">Our Services</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-section links">
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-links">
              <li>
                <a href="#resources">Postpartum Care</a>
              </li>
              <li>
                <a href="#resources">Mental Health</a>
              </li>
              <li>
                <a href="#resources">Baby Care Tips</a>
              </li>
              <li>
                <a href="#resources">Support Groups</a>
              </li>
            </ul>
          </div>

          <div className="footer-section contact">
            <h3 className="footer-heading">Contact Us</h3>
            <p>
              <strong>Email:</strong> support@ammisvoice.com
            </p>
            <p>
              <strong>Phone:</strong> +1 (800) 123-4567
            </p>
            <p>
              <strong>Hours:</strong> 24/7 Support Available
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            &copy; {currentYear} Ammi's Voice. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <a href="#terms">Terms of Service</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#accessibility">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
