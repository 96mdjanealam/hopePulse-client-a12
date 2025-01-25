import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import logo from "../../assets/images/logo.png"

export default function Footer() {
  return (
    <div>
      <footer className="bg-gray-600 text-white pt-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="flex gap-3 items-center mb-4">
            <img src={logo} className="h-10" alt="" />
            <h3 className="text-xl font-semibold ">HopePulse</h3>
            </div>
           
            <p className="text-sm">
              HopePluse is a platform dedicated to connecting blood donors with
              those in need. Our mission is to save lives by making blood donation
              simple, efficient, and impactful.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/donate" className="hover:underline">
                  Become a Donor
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-sm mb-4">
              Stay updated with the latest news and events from HopePulse.
            </p>
            <form className="flex items-center space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md text-gray-700"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Subscribe
              </button>
            </form>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="hover:text-gray-200"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a
                href="#"
                className="hover:text-gray-200"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a
                href="#"
                className="hover:text-gray-200"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="bg-gray-800 mt-8 py-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} HopePulse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}