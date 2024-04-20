import "./home.css";
import main from "../assets/main.jpeg";
import home1 from "../assets/home3.png";
import home2 from "../assets/home4.png";
import home3 from "../assets/home5.png";
import { useState } from "react";
import { RiMenu2Fill, RiCloseFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import logout from "@/utils/logout";
import { unsetUser } from "@/redux/user";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";

function Home() {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user); // Assuming 'user' is your user slice name

  async function handleLogout() {
    if (await logout()) {
      dispatch(unsetUser());
    }
  }

  return (
    <div className="home-container">
      <Navbar />
      <div className="top-section-main">
        <div className="text-section">
          <h1 className="top-section-main-text">
            Meet new and interesting pets nearby.
          </h1>
          <Link to="/discover">
          <button className="main-btn">Adopt Now!</button>
          </Link>
        </div>
        <div className="section-image-container">
          <img src={main} alt="" className="top-section-image" />
        </div>
      </div>
      <div className="section-2">
        <h1 className="section-2-main-text">Give your Pet a new Home.</h1>
        <p className="section-2-secondary-text">
          Join our community of pet lovers and find the perfect companion for
          your family.
        </p>
        <Link to="/upload">
        <button className="rehome-btn">Rehome Now!</button>
        </Link>
      </div>
      <div className="section-3">
        <h1 className="section-3-main-text md:text-4xl text-3xl">How it works?</h1>
        <div className="steps-container">
          <div className="steps">
            <img src={home1} alt="img1" className="step-img" />
            <h3 className="step-title">Step 1</h3>
            <p className="step-details">
              Enter your location. Type in your city to find pets available for
              adoption near you.
            </p>
          </div>
          <div className="steps">
            <img src={home2} alt="img1" className="step-img" />
            <h3 className="step-title">Step 2</h3>
            <p className="step-details">
              Browse available pets and connect with their owners. You're one
              step closer to finding your perfect furry friend.
            </p>
          </div>
          <div className="steps">
            <img src={home3} alt="img1" className="step-img" />
            <h3 className="step-title">Step 3</h3>
            <p className="step-details">
              Finalize the adoption process. Then, welcome your new pet into
              your loving home!
            </p>
          </div>
        </div>
      </div>
      <div className="section-2 bg-slate-200">
        <h1 className="section-2-main-text">Know more about animals.</h1>
        <p className="section-2-secondary-text text-base">
        Discover fascinating facts and expert advice about animals and pets with our interactive chat bot!
        </p>
        <Link to="/chatwithai">
        <button className="rehome-btn">Chat Now!</button>
        </Link>
      </div>
      <footer className="footer">
        <ul className="footer-list">
          <li className="footer-item">
            <a href="/" className="footer-link footer-list-title">
              Features
            </a>
          </li>
          <li className="footer-item">
            <a href="/" className="footer-link">
              Adopt a pet
            </a>
          </li>
          <li className="footer-item">
            <a href="/" className="footer-link">
              Rehome a pet
            </a>
          </li>
          <li className="footer-item">
            <a href="/" className="footer-link"></a>Know about pets
          </li>
          <li className="footer-item">
            <a href="/" className="footer-link"></a>Our Chatbot
          </li>
        </ul>
        <ul className="footer-list">
          <li className="footer-item">
            <a href="/" className="footer-link footer-list-title">
              Organization
            </a>
          </li>
          <li className="footer-item">
            <a href="/" className="footer-link">
              Our Team
            </a>
          </li>
          <li className="footer-item">
            <a href="/" className="footer-link">
              About Us
            </a>
          </li>
          <li className="footer-item">
            <a href="/" className="footer-link"></a>Contact Us
          </li>
          <li className="footer-item">
            <a href="/" className="footer-link"></a>Sponsor Us
          </li>
        </ul>
        <ul className="footer-list">
          <li className="footer-item">
            <a href="/" className="footer-link footer-list-title">
              Socials
            </a>
          </li>
          <li className="footer-item">
            <a href="/" className="footer-link">
              Devfolio
            </a>
          </li>
          <li className="footer-item">
            <a href="/" className="footer-link">
              Youtube
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Home;
