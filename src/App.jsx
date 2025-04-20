import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Myshelf from "./components/Myshelf";
import NavBar from "./components/Navbar";
import Info from "./components/Info";
import Search from "./components/Search";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <BrowserRouter>
      <NavBar setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myshelf" element={<Myshelf />} />
        <Route path="/info/:id" element={<Info />} />
        <Route path="/search" element={<Search searchTerm={searchTerm} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
