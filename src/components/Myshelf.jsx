import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Myshelf({ watchlist, handleRemoveFromWatchlist }) {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('default');
  const [isLoading, setIsLoading] = useState(true);
  const [displayedWatchlist, setDisplayedWatchlist] = useState([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!watchlist || !Array.isArray(watchlist)) {
      setDisplayedWatchlist([]);
      return;
    }
    
    const validBooks = watchlist.filter(book => book && book.id);
    let sortedList = [...validBooks];
    
    if (sortBy === 'title') {
      sortedList.sort((a, b) => {
        const titleA = a.volumeInfo?.title?.toLowerCase() || '';
        const titleB = b.volumeInfo?.title?.toLowerCase() || '';
        return titleA.localeCompare(titleB);
      });
    } else if (sortBy === 'rating') {
      sortedList.sort((a, b) => {
        const ratingA = a.volumeInfo?.averageRating || 0;
        const ratingB = b.volumeInfo?.averageRating || 0;
        return ratingB - ratingA;
      });
    }
    
    setDisplayedWatchlist(sortedList);
  }, [watchlist, sortBy]);
  
  const handleBookClick = (bookId) => {
    if (bookId) {
      navigate(`/info/${bookId}`);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-600 mx-auto"></div>
          <p className="text-white mt-4 text-lg">Loading your shelf...</p>
        </div>
      </div>
    );
  }
  
  if (!displayedWatchlist || !Array.isArray(displayedWatchlist) || displayedWatchlist.length === 0) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-orange-600 mb-6">My Shelf</h1>
          <div className="bg-gray-800 rounded-xl p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h2 className="text-xl text-white mt-6">Your shelf is empty</h2>
            <p className="text-gray-400 mt-2">Add books to your watchlist by clicking on the heart icon.</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-6 px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors duration-300"
            >
              Explore Books
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-600 mb-4 sm:mb-0">My Shelf ({displayedWatchlist.length})</h1>
          
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 text-white px-3 py-1 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
            >
              <option value="default">Default</option>
              <option value="title">Title</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {displayedWatchlist.map((book, index) => {
            if (!book || !book.id) return null;
            
            const info = book.volumeInfo || {};
            const thumbnail = 
              info.imageLinks?.extraLarge || 
              info.imageLinks?.large || 
              info.imageLinks?.medium || 
              info.imageLinks?.thumbnail;
              
            const animationDelay = `${index * 0.1}s`;
            
            return (
              <div 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 opacity-0 animate-fadeIn relative"
                style={{ 
                  animationDelay, 
                  animationFillMode: 'forwards',
                  animationDuration: '0.5s' 
                }}
                onClick={() => handleBookClick(book.id)}
              >
                <div className="relative pb-[140%]">
                  {thumbnail ? (
                    <img 
                      src={thumbnail} 
                      alt={info.title || "Book cover"} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600 text-center px-2">No Image</span>
                    </div>
                  )}
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (book && book.id) {
                        handleRemoveFromWatchlist(book);
                      }
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/70 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
                    aria-label="Remove from watchlist"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {(info.averageRating > 0) && (
                    <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-black/70 text-white text-xs font-medium">
                      <span className="text-yellow-400">⭐</span> {info.averageRating.toFixed(1)}
                    </div>
                  )}
                </div>
                
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 line-clamp-2 text-sm">
                    {info.title || "Untitled Book"}
                  </h3>
                  {info.authors && Array.isArray(info.authors) && info.authors.length > 0 && (
                    <p className="text-gray-600 text-xs mt-1 line-clamp-1">
                      {info.authors.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation-name: fadeIn;
        }
      `}</style>
    </div>
  );
}

export default Myshelf;