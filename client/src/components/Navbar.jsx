import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faBars,
  faClose,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  // states for opening and closing the menu
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // close the menu whenever the current location changes/the user navigates to a new route
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // toggle menu with open/close button
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black bg-opacity-75 text-white flex items-center justify-between py-4 md:px-8 px-4 relative level-4">
      <Link to="/">
        <h1 className="flex-grow">Streaming Selector</h1>
      </Link>
      {/* open/close button */}
      <div className="md:hidden z-30">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {/* toggling the icon shown for the open/close button  */}
          <FontAwesomeIcon
            icon={isOpen ? faClose : faBars}
            className="text-lg mr-2"
          />
        </button>
      </div>
      <ul
        className={`fixed inset-0 bg-black md:bg-transparent bg-opacity-75 flex flex-col items-center justify-center md:static md:flex md:flex-row md:items-center ${
          isOpen ? "flex" : "hidden md:flex"
        } md:gap-8 gap-12`}
      >
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/movie_library">Movie Library</Link>
        </li>
        <li className="flex items-center">
          <FontAwesomeIcon icon={faUserCircle} className="text-lg mr-2" />
          Profile
        </li>
        <li>
          <button className="bg-support border-2 border-white rounded-xl px-2 py-1 transition duration-300 hover:bg-red hover:text-white font-semibold">
            <Link to="/quiz">Find My Movie</Link>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
