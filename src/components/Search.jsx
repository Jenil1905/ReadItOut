import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search({ searchTerm }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  function handleClick(bookId){
    navigate(`/info/${bookId}`)
  }

  useEffect(() => {
    if (!searchTerm) return;
    
    setLoading(true);
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyCmD98jOzNaflw0STdwRoqO7yIUiA2KvTQ`)
      .then(res => res.json())
      .then(data => {
        setBooks(data.items || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching books:', err);
        setLoading(false);
      });
  }, [searchTerm]);

  return (
    <div className="max-w-4xl mx-auto p-6  hover:cursor-pointer">
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : books.length === 0 ? (
        <p className="text-center text-gray-500 py-8 text-lg">No books found</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {books.map((book) => (
            <div 
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
              onClick={()=>{handleClick(book.id)}}
            >
              <div className="flex">
                {book.volumeInfo.imageLinks?.thumbnail && (
                  <img 
                    src={book.volumeInfo.imageLinks.thumbnail} 
                    alt={book.volumeInfo.title} 
                    className="w-20 h-auto mr-4 rounded"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1 text-blue-600">{book.volumeInfo.title}</h3>
                  {book.volumeInfo.authors && (
                    <p className="text-sm text-gray-600 mb-2">{book.volumeInfo.authors.join(', ')}</p>
                  )}
                  {book.volumeInfo.publishedDate && (
                    <p className="text-xs text-gray-500">{book.volumeInfo.publishedDate}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;