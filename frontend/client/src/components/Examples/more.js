import React from 'react';
import '../styles/css/HeroSection.css'; // Ensure this path is correct
import NavBar from '../Navigation/NavBar';

const HeroSection = () => {
  return (
    <div>
      <NavBar />
      <section id="hero" className="hero section dark-background vh-100">
        <img 
          src="https://cdn.pixabay.com/photo/2018/11/06/22/29/land-3799279_1280.jpg" 
          alt="Hero Background" 
          className="hero-bg" 
          data-aos="fade-in" 
        />
        <div className="container h-100 d-flex align-items-center">
          <div className="row w-100">
            <div className="col-lg-10">
              <h2 data-aos="fade-up" data-aos-delay="100">Welcome to Our Website</h2>
              <p data-aos="fade-up" data-aos-delay="200">
                We are a team of talented designers making websites with Bootstrap
              </p>
            </div>
            <div className="col-lg-5" data-aos="fade-up" data-aos-delay="300">
              <form action="forms/newsletter.php" method="post" className="php-email-form">
                <div className="sign-up-form">
                  <input type="email" name="email" placeholder="Enter your email" required />
                  <input type="submit" value="Subscribe" />
                </div>
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your subscription request has been sent. Thank you!</div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
