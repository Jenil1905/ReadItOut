import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Myshelf from "./components/Myshelf";
import NavBar from "./components/Navbar";
import Info from "./components/Info";
import Search from "./components/Search";
import { useState, useEffect } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [watchlist, setWatchlist] = useState([]);

  function handleWatchlist(bookObj) {
    const updatedWatchlist = [...watchlist, bookObj];
    setWatchlist(updatedWatchlist);
    localStorage.setItem("wlBooks", JSON.stringify(updatedWatchlist));
    console.log(bookObj)
  }

  function handleRemoveFromWatchlist(bookObj) {
    const updatedWatchlist = watchlist.filter((book) => book?.id !== bookObj.id);
    
    setWatchlist(updatedWatchlist);
    localStorage.setItem("wlBooks", JSON.stringify(updatedWatchlist));
  
    console.log("Book removed from watchlist:", bookObj.volumeInfo?.title || bookObj.id);
  }
  
  

  useEffect(() => {
    const books = localStorage.getItem("wlBooks");
    if (books) {
      setWatchlist(JSON.parse(books));
    }
  }, []);

  return (
    <BrowserRouter>
      <NavBar setSearchTerm={setSearchTerm} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              handleWatchlist={handleWatchlist}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              watchlist={watchlist}
            />
          }
        />
        <Route
          path="/myshelf"
          element={
            <Myshelf
              watchlist={watchlist}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
            />
          }
        />
        <Route
          path="/info/:id"
          element={
            <Info
              handleWatchlist={handleWatchlist}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              watchlist={watchlist}
            />
          }
        />
        <Route
          path="/search"
          element={
            <Search
              searchTerm={searchTerm}
              handleWatchlist={handleWatchlist}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              watchlist={watchlist}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
