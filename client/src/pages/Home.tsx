import "./home.css";
import main from "../assets/main.jpeg";
import home1 from "../assets/home3.png";
import home2 from "../assets/home4.png";
import home3 from "../assets/home5.png";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ChatComponent from "@/components/ChatComponent";
import Faq from "@/components/Faq";

function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <div className="top-section-main">
        <div className="text-section">
          <h1 className="top-section-main-text font-semibold">
            Meet new and interesting pets nearby.
          </h1>
          <Link to="/discover">
            <button className="main-btn hover:bg-zinc-900 transition-colors duration-300 ease-in-out ">
              Adopt Now!
            </button>
          </Link>
        </div>
        <div className="section-image-container">
          <img src={main} alt="" className="top-section-image" />
        </div>
      </div>
      <div className="section-2">
        <h1 className="section-2-main-text font-semibold">
          Give your Pet a new Home.
        </h1>
        <p className="text-secondary">
          Join our community of pet lovers and find the perfect companion for
          your family.
        </p>

        <div className="mt-8">
          <h1 className="section-3-main-text md:text-2xl text-xl font-semibold">
            How it works?
          </h1>
          <div className="steps-container">
            <div className="steps">
              <img src={home1} alt="img1" className="step-img" />
              <h3 className="step-title">Step 1</h3>
              <p className="step-details">
                Enter your location. Type in your city to find pets available
                for adoption near you.
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
        <Link to="/upload">
          <button className="rehome-btn hover:bg-gray-800 transition-colors duration-300 ease-in-out">
            Rehome Now!
          </button>
        </Link>
      </div>
      <div className="section-2 bg-black ">
        <div className="max-w-4xl w-full ">
          <div className="flex flex-col mb-8">
            <h1 className="section-2-main-text text-white font-semibold">
              24/7 AI Pet Care Solution
            </h1>
            <p className="text-white">
              Get instant answers to your pet care questions with our AI
              assistant
            </p>
          </div>
          <ChatComponent />
        </div>
      </div>

      <div className="section-2">
        <Faq />
      </div>

      <footer className="bg-black text-gray-400">
        <div className="bg-black max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4">Cuddly</h3>
              <p className="text-gray-400">
                Making pet adoption simple, accessible, and joyful for everyone.
              </p>
            </div>

            <div>
              <h4 className="text-white text-lg font-semibold mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#adoption-process"
                    className="hover:text-white transition-colors"
                  >
                    Adoption Process
                  </a>
                </li>
                <li>
                  <a
                    href="#available-pets"
                    className="hover:text-white transition-colors"
                  >
                    Available Pets
                  </a>
                </li>
                <li>
                  <a
                    href="#pet-care-resources"
                    className="hover:text-white transition-colors"
                  >
                    Pet Care Resources
                  </a>
                </li>
                <li>
                  <a
                    href="#success-stories"
                    className="hover:text-white transition-colors"
                  >
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-lg font-semibold mb-4">
                Stay Updated
              </h4>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for pet care tips and adoption
                updates.
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700  focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:opacity-90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
