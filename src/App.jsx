import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Myshelf from "./components/Myshelf";
import NavBar from "./components/Navbar";
import Info from "./components/Info";

function App() {
  return (
    <BrowserRouter> 
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myshelf" element={<Myshelf />} />
        <Route path="/info/:id" element={<Info />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
