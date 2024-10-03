import React from 'react';
import '../styles/css/HomePage.css'; // Ensure this path is correct
import NavBar from '../Navigation/NavBar';
import land from "../images/land.png";

const Homepage = () => {
  return (
      <section id="hero" className="hero section dark-background vh-100">
        <img 
          src={land} 
          alt="Hero Background" 
          className="hero-bg" 
          data-aos="fade-in" 
        />
        <div className="container h-100 d-flex align-items-center">
          <div className="row w-100">
            <div className="col-lg-10">
              <h2 data-aos="fade-up" data-aos-delay="100">Welcome to the Land Registry System</h2>
              <p data-aos="fade-up" data-aos-delay="200">
              Manage and verify land ownership with ease.
              </p>
            </div>
            <div className="col-lg-5" data-aos="fade-up" data-aos-delay="300">
              <form action="forms/newsletter.php" method="post" className="php-email-form">
                <button  className="btn btn-primary d-inline-flex align-items-center" type="button">
                    <a href='land/register' className='btn-primary' style={{ color: 'black' }}>Get Started</a>
                    <svg className="bi ms-1" width="20" height="20"></svg>
                </button>
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your subscription request has been sent. Thank you!</div>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Homepage;
