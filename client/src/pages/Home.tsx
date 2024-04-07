import './home.css'
import main from '../assets/main.jpeg';
import home1 from '../assets/home3.png';
import home2 from '../assets/home4.png';
import home3 from '../assets/home5.png';
function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="logo">Cuddly.com</h1>
        <ul className="nav">
          <li className="nav-item">
            <a href="/" className="nav-link">
              Adopt a pet
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link">
              Queries
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link">
              About Us
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link">
              Contact Us
            </a>
          </li>
          <li className="nav-item">
            <button className="login-btn">Login</button>
          </li>
        </ul>
      </header>
      <div className="top-section-main">
        <div className="text-section">
          <h1 className='top-section-main-text'>Meet new and  interesting pets nearby.</h1>
          <button className="main-btn">Adopt Now!</button>
        </div>
        <div className="section-image-container">
          <img src={main} alt="" className="top-section-image" />
        </div>
      </div>
      <div className="section-2">
        <h1 className="section-2-main-text">Give your Pet a new Home.</h1>
        <p className="section-2-secondary-text">Join our community of pet lovers and find the perfect companion for your family.</p>
        <button className="rehome-btn">Rehome Now!</button>
      </div>
      <div className="section-3">
        <h1 className="section-3-main-text">How it works?</h1>
        <div className="steps-container">
          <div className="steps">
            <img src={home1} alt="img1" className="step-img" />
            <h3 className="step-title">Step 1</h3>
            <p className="step-details">Enter your location. Type in your city to find pets available for adoption near you.</p>
          </div>
          <div className="steps">
            <img src={home2} alt="img1" className="step-img" />
            <h3 className="step-title">Step 2</h3>
            <p className="step-details">Browse available pets and connect with their owners. You're one step closer to finding your perfect furry friend.</p>
          </div>
          <div className="steps">
            <img src={home3} alt="img1" className="step-img" />
            <h3 className="step-title">Step 3</h3>
            <p className="step-details">Finalize the adoption process. Then, welcome your new pet into your loving home!</p>
          </div>
        </div>
      </div>
      <footer className="footer">
        <ul className="footer-list">
          <li className="footer-item"><a href="/" className="footer-link footer-list-title">Features</a></li>
          <li className="footer-item"><a href="/" className="footer-link">Adopt a pet</a></li>
          <li className="footer-item"><a href="/" className="footer-link">Rehome a pet</a></li>
          <li className="footer-item"><a href="/" className="footer-link"></a>Know about pets</li>
          <li className="footer-item"><a href="/" className="footer-link"></a>Our Chatbot</li>
        </ul>
        <ul className="footer-list">
          <li className="footer-item"><a href="/" className="footer-link footer-list-title">Organization</a></li>
          <li className="footer-item"><a href="/" className="footer-link">Our Team</a></li>
          <li className="footer-item"><a href="/" className="footer-link">About Us</a></li>
          <li className="footer-item"><a href="/" className="footer-link"></a>Contact Us</li>
          <li className="footer-item"><a href="/" className="footer-link"></a>Sponsor Us</li>
        </ul>
        <ul className="footer-list">
          <li className="footer-item"><a href="/" className="footer-link footer-list-title">Socials</a></li>
          <li className="footer-item"><a href="/" className="footer-link">Devfolio</a></li>
          <li className="footer-item"><a href="/" className="footer-link">Youtube</a></li>
         </ul>
      </footer>
    </div>
  );
}

export default Home;
