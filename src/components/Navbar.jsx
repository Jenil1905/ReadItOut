import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ setSearchTerm }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(search);
      navigate('/search');
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-900 shadow-lg w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-orange-400 text-xl font-bold">
            ReadItOut📖
          </Link>

          {/* Mobile Search Input */}
          <div className="flex-1 px-4 md:hidden">
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-1 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Desktop links and Search */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-200 hover:text-orange-400 font-medium">
              Home
            </Link>
            <Link to="/myshelf" className="text-gray-200 hover:text-orange-400 font-medium">
              MyShelf
            </Link>
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="px-3 py-1 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-gray-200 text-3xl font-bold ml-2"
            onClick={toggleMenu}
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-2 items-center">
              <Link to="/" className="text-gray-200 hover:text-orange-400 font-medium" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link to="/myshelf" className="text-gray-200 hover:text-orange-400 font-medium" onClick={() => setMenuOpen(false)}>
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
