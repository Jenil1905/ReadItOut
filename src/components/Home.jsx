import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [books, setBooks] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [genre, setGenre] = useState("Fantasy");
  const[genreList , setGenreList] = useState([])
  useEffect(() => {
    const randomPage = Math.floor(Math.random() * 5);
    const startIndex = randomPage * 20;
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=bestseller&orderBy=relevance&maxResults=20&startIndex=${startIndex}`
      )
      .then((response) => {
        setBooks(response.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  //   New Release Section
  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=new+releases&orderBy=newest&maxResults=20`
      )
      .then((response) => {
        setNewBooks(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Trending Books Section
  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=bestseller&orderBy=relevance&maxResults=20`
      )
      .then((response) => {
        setTrendingBooks(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Genre Based Filter
  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=20`
      )
      .then((response)=>{
        setGenreList(response.data.items)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [genre]);

  return (
    <div className="  bg-black min-h-screen p-4 ">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-orange-600">
        <span className="block w-1 h-8 bg-yellow-400 mr-3"></span>
        Top Rated Books
      </h2>

      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide hover:cursor-pointer">
        {books.map((book) => {
          const info = book.volumeInfo;
          const thumbnail = info.imageLinks?.thumbnail;

          return (
            <div className="min-w-[200px] md:min-w-[250px] bg-white rounded-xl shadow-md p-2 hover:shadow-lg transition-transform duration-300 group">
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt={info.title}
                  className="w-full h-[350px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-[350px] bg-gray-300 flex items-center justify-center rounded-lg">
                  <span className="text-gray-700 text-center px-4">
                    No Image Available
                  </span>
                </div>
              )}
              <p className="mt-2 text-md font-semibold text-gray-800 text-center line-clamp-2">
                {info.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* New Release Section */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-orange-600 mt-6">
        <span className="block w-1 h-8 bg-yellow-400 mr-3"></span>
        New Release
      </h2>
      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide hover:cursor-pointer">
        {newBooks.map((book) => {
          const info = book.volumeInfo;
          const thumbnail = info.imageLinks?.thumbnail;

          return (
            <div className="min-w-[200px] md:min-w-[250px] bg-white rounded-xl shadow-md p-2 hover:shadow-lg transition-transform duration-300 group">
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt={info.title}
                  className="w-full h-[350px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-[350px] bg-gray-300 flex items-center justify-center rounded-lg">
                  <span className="text-gray-700 text-center px-4">
                    No Image Available
                  </span>
                </div>
              )}
              <p className="mt-2 text-md font-semibold text-gray-800 text-center line-clamp-2">
                {info.title}
              </p>
            </div>
          );
        })}
      </div>
      {/* Trending Books Section */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-orange-600 mt-6">
        <span className="block w-1 h-8 bg-yellow-400 mr-3"></span>
        Trending Books
      </h2>
      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide hover:cursor-pointer">
        {trendingBooks.map((book) => {
          const info = book.volumeInfo;
          const thumbnail = info.imageLinks?.thumbnail;

          return (
            <div className="min-w-[200px] md:min-w-[250px] bg-white rounded-xl shadow-md p-2 hover:shadow-lg transition-transform duration-300 group">
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt={info.title}
                  className="w-full h-[350px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-[350px] bg-gray-300 flex items-center justify-center rounded-lg">
                  <span className="text-gray-700 text-center px-4">
                    No Image Available
                  </span>
                </div>
              )}
              <p className="mt-2 text-md font-semibold text-gray-800 text-center line-clamp-2">
                {info.title}
              </p>
            </div>
          );
        })}
      </div>
      {/* Genre Based filtering */}
      <div className="flex justify-between items-center m-2 mt-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-orange-600 mt-6">
          <span className="block w-1 h-8 bg-yellow-400 mr-3"></span>
          Best Books in {genre}
        </h2>
        <select
          className="bg-gray-800 text-white px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          onChange={(e) => {
            setGenre(e.target.value);
          }}
        >
          <option>Fantasy</option>  
          <option>Romance</option>
          <option>Science Fiction</option>
          <option>Mystery</option>
          <option>Biography</option>
          <option>Self-Help</option>
          <option>History</option>
          <option>Thriller</option>
          <option>Business</option>
          <option>Horror</option>
        </select>
      </div>
      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide hover:cursor-pointer">
        {genreList.map((book) => {
          const info = book.volumeInfo;
          const thumbnail = info.imageLinks?.thumbnail;

          return (
            <div className="min-w-[200px] md:min-w-[250px] bg-white rounded-xl shadow-md p-2 hover:shadow-lg transition-transform duration-300 group">
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt={info.title}
                  className="w-full h-[350px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-[350px] bg-gray-300 flex items-center justify-center rounded-lg">
                  <span className="text-gray-700 text-center px-4">
                    No Image Available
                  </span>
                </div>
              )}
              <p className="mt-2 text-md font-semibold text-gray-800 text-center line-clamp-2">
                {info.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
