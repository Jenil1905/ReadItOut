import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function Home() {
  const [books, setBooks] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [genre, setGenre] = useState("Fantasy");
  const [genreList, setGenreList] = useState([]);

  // Add refs for scrolling containers
  const topRatedRef = useRef(null);
  const newReleasesRef = useRef(null);
  const trendingRef = useRef(null);
  const genreRef = useRef(null);

  // Add scroll function
  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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
      .then((response) => {
        setGenreList(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [genre]);

  return (
    <div className="bg-black min-h-screen p-4">
      {/* Additional Tailwind styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>

      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-orange-600 hover:translate-x-1 transition-transform">
        <span className="block w-1 h-8 bg-yellow-400 mr-3"></span>
        Top Rated Books
      </h2>

      {/* Top Rated Books Section with scroll buttons */}
      <div className="relative group">
        <button
          onClick={() => scroll(topRatedRef, "left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-orange-600/90 text-white w-10 h-10 rounded-full flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex"
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div
          ref={topRatedRef}
          className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide hover:cursor-pointer scroll-smooth"
        >
          {books.map((book) => {
            const info = book.volumeInfo;
            const thumbnail =
              info.imageLinks?.extraLarge ||
              info.imageLinks?.large ||
              info.imageLinks?.medium ||
              info.imageLinks?.thumbnail;

            return (
              <div className="min-w-[200px] md:min-w-[250px] bg-white rounded-xl shadow-md p-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={info.title}
                    className="w-full h-[350px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    style={{imageRendering: 'crisp-edges'}}
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

        <button
          onClick={() => scroll(topRatedRef, "right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-orange-600/90 text-white w-10 h-10 rounded-full flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex"
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* New Release Section */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-orange-600 mt-6 hover:translate-x-1 transition-transform">
        <span className="block w-1 h-8 bg-yellow-400 mr-3"></span>
        New Release
      </h2>

      {/* New Release Section with scroll buttons */}
      <div className="relative group">
        <button
          onClick={() => scroll(newReleasesRef, "left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-orange-600/90 text-white w-10 h-10 rounded-full flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex"
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div
          ref={newReleasesRef}
          className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide hover:cursor-pointer scroll-smooth"
        >
          {newBooks.map((book) => {
            const info = book.volumeInfo;
            const thumbnail =
              info.imageLinks?.extraLarge ||
              info.imageLinks?.large ||
              info.imageLinks?.medium ||
              info.imageLinks?.thumbnail;

            return (
              <div className="min-w-[200px] md:min-w-[250px] bg-white rounded-xl shadow-md p-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={info.title}
                    className="w-full h-[350px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    style={{imageRendering : 'auto'}}
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

        <button
          onClick={() => scroll(newReleasesRef, "right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-orange-600/90 text-white w-10 h-10 rounded-full flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex"
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Trending Books Section */}
      <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-orange-600 mt-6 hover:translate-x-1 transition-transform">
        <span className="block w-1 h-8 bg-yellow-400 mr-3"></span>
        Trending Books
      </h2>

      {/* Trending Books Section with scroll buttons */}
      <div className="relative group">
        <button
          onClick={() => scroll(trendingRef, "left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-orange-600/90 text-white w-10 h-10 rounded-full flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex"
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div
          ref={trendingRef}
          className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide hover:cursor-pointer scroll-smooth"
        >
          {trendingBooks.map((book) => {
            const info = book.volumeInfo;
            const thumbnail =
              info.imageLinks?.extraLarge ||
              info.imageLinks?.large ||
              info.imageLinks?.medium ||
              info.imageLinks?.thumbnail;

            return (
              <div className="min-w-[200px] md:min-w-[250px] bg-white rounded-xl shadow-md p-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={info.title}
                    className="w-full h-[350px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    style={{imageRendering: 'crisp-edges'}}
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

        <button
          onClick={() => scroll(trendingRef, "right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-orange-600/90 text-white w-10 h-10 rounded-full flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex"
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Genre Based filtering */}
      <div className="flex justify-between items-center m-2 mt-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-orange-600 mt-6 hover:translate-x-1 transition-transform">
          <span className="block w-1 h-8 bg-yellow-400 mr-3"></span>
          Best Books in {genre}
        </h2>
        <select
          className="bg-gray-800 text-white px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-gray-700 transition-colors hover:cursor-pointer"
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

      {/* Genre Books Section with scroll buttons */}
      <div className="relative group">
        <button
          onClick={() => scroll(genreRef, "left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-orange-600/90 text-white w-10 h-10 rounded-full flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex"
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div
          ref={genreRef}
          className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide hover:cursor-pointer scroll-smooth"
        >
          {genreList.map((book) => {
            const info = book.volumeInfo;
            const thumbnail =
              info.imageLinks?.extraLarge ||
              info.imageLinks?.large ||
              info.imageLinks?.medium ||
              info.imageLinks?.thumbnail;

            return (
              <div className="min-w-[200px] md:min-w-[250px] bg-white rounded-xl shadow-md p-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={info.title}
                    className="w-full h-[350px] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    style={{imageRendering: 'crisp-edges'}}
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

        <button
          onClick={() => scroll(genreRef, "right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-orange-600/90 text-white w-10 h-10 rounded-full flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex"
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Home;
