import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Info() {
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then((response) => {
        setBookData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-sky-100 to-blue-100">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium text-gray-800 animate-pulse">
            Loading book details...
          </p>
        </div>
      </div>
    );
  }

  if (!bookData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-red-50 to-red-100">
        <div className="bg-white p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105">
          <h2 className="text-xl font-bold text-red-600 mb-2">Book Not Found</h2>
          <p className="text-gray-700">We couldn't find any information for this book.</p>
        </div>
      </div>
    );
  }

  const volumeInfo = bookData.volumeInfo;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0 p-6 flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100">
            {volumeInfo.imageLinks ? (
              <img
                src={volumeInfo.imageLinks.thumbnail || volumeInfo.imageLinks.smallThumbnail}
                alt={volumeInfo.title}
                className="h-48 w-auto object-cover rounded-lg shadow-md transform transition duration-500 hover:scale-110"
              />
            ) : (
              <div className="h-48 w-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">No image</span>
              </div>
            )}
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {volumeInfo.categories ? volumeInfo.categories[0] : "Book"}
            </div>
            <h1 className="mt-2 text-3xl font-bold text-gray-900 leading-tight group">
              {volumeInfo.title}
              {volumeInfo.subtitle && (
                <span className="block text-xl text-gray-600 mt-1">{volumeInfo.subtitle}</span>
              )}
            </h1>
            {volumeInfo.authors && (
              <p className="mt-2 text-lg text-gray-700">
                By {volumeInfo.authors.join(", ")}
              </p>
            )}
            
            {volumeInfo.publishedDate && (
              <p className="mt-2 text-gray-600">
                Published: {new Date(volumeInfo.publishedDate).toLocaleDateString()}
              </p>
            )}
            
            {volumeInfo.pageCount && (
              <p className="text-gray-600">Pages: {volumeInfo.pageCount}</p>
            )}
            
            {volumeInfo.averageRating && (
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.round(volumeInfo.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">({volumeInfo.ratingsCount || 0} reviews)</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="px-8 py-6 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
          {volumeInfo.description ? (
            <div 
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: volumeInfo.description }}
            />
          ) : (
            <p className="text-gray-500 italic">No description available.</p>
          )}
        </div>
        
        <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {volumeInfo.publisher && (
              <div className="bg-white p-4 rounded-lg shadow transition duration-300 hover:shadow-md">
                <span className="block text-sm font-medium text-gray-500">Publisher</span>
                <span className="block mt-1">{volumeInfo.publisher}</span>
              </div>
            )}
            
            {volumeInfo.language && (
              <div className="bg-white p-4 rounded-lg shadow transition duration-300 hover:shadow-md">
                <span className="block text-sm font-medium text-gray-500">Language</span>
                <span className="block mt-1">{new Intl.DisplayNames(["en"] , {type: "language"}).of(volumeInfo.language.toUpperCase())}</span>
              </div>
            )}
            
            {volumeInfo.industryIdentifiers && (
              <div className="bg-white p-4 rounded-lg shadow transition duration-300 hover:shadow-md">
                <span className="block text-sm font-medium text-gray-500">ISBN</span>
                <span className="block mt-1">
                  {volumeInfo.industryIdentifiers.map(id => id.identifier).join(", ")}
                </span>
              </div>
            )}
            
            {volumeInfo.maturityRating && (
              <div className="bg-white p-4 rounded-lg shadow transition duration-300 hover:shadow-md">
                <span className="block text-sm font-medium text-gray-500">Maturity Rating</span>
                <span className="block mt-1">{volumeInfo.maturityRating}</span>
              </div>
            )}
          </div>
        </div>
        
        {volumeInfo.previewLink && (
          <div className="px-8 py-6 border-t border-gray-200 text-center">
            <a 
              href={volumeInfo.previewLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md transition duration-300 hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-1"
            >
              Preview Book
            </a>
            {volumeInfo.infoLink && (
              <a 
                href={volumeInfo.infoLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block ml-4 px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg shadow-md transition duration-300 hover:bg-gray-200 hover:shadow-lg transform hover:-translate-y-1"
              >
                More Info
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Info;