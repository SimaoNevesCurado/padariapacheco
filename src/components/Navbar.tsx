import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Define your navigation items
  const navItems = [
    { path: "/", name: "Início" },
    { path: "/produtos", name: "Produtos" },
    { path: "/contactos", name: "Contactos" },
  ];

  return (
    <nav className="fixed top-0 w-full mb-20 bg-white shadow-lg z-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-6 px-4 md:px-20">
        <div className="flex h-12 flex-shrink-0 items-center justify-center mb-4 md:mb-0 ml-0 md:ml-20">
          <img
            src="Logo_padaria.png"
            className="h-16 flex absolute"
            alt="Logo"
          />
        </div>

        <div className="md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Abrir menu principal</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div
          className={`md:flex items-center font-bold justify-center text-black gap-10 text-1xl ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block py-2 px-3 md:p-0 hover:text-orange-300 ${
                location.pathname === item.path ? "text-orange-300" : ""
              }`}
              aria-current={
                location.pathname === item.path ? "page" : undefined
              }
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
