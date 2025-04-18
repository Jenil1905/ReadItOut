import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-900 shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop and Mobile navbar header */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-orange-400 text-2xl font-bold">
            ReadItOut📖
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-200 hover:text-orange-400 font-medium"
            >
              Home
            </Link>
            <Link
              to="/myshelf"
              className="text-gray-200 hover:text-orange-400 font-medium"
            >
              MyShelf
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-200 text-3xl font-bold focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? "x" : "☰"}
          </button>
        </div>

        {/* Mobile navigation */}
        {menuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-gray-200 hover:text-blue-400 font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/myshelf"
                className="text-gray-200 hover:text-blue-400 font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                MyShelf
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
