import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, price, setPrice, rating, setRating, location, setLocation }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSearch = () => {

  }
  const handleDropdownToggle = () => {
    setFilterOpen(!filterOpen);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setFilterOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="w-3/4 mx-auto p-4 bg-white rounded-lg">
      <div className="flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-3 pr-16 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white"
            placeholder="Search..."
          />
        </div>

        <button
          onClick={handleSearch}
          className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg"
        >
          Search
        </button>

        <div className="relative ml-4">
          <button
            onClick={handleDropdownToggle}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg"
          >
            Filters
            <svg className="ml-2 w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {filterOpen && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900">Price</h3>
                <select
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="block w-full mt-1 py-2 pl-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white"
                >
                  <option value="">Any</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <h3 className="mt-4 text-sm font-medium text-gray-900">Rating</h3>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="block w-full mt-1 py-2 pl-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white"
                >
                  <option value="">Any</option>
                
                  <option value="3"> Below 3 Stars</option>
                  <option value="4"> Above 4 Stars</option>
                </select>

                <h3 className="mt-4 text-sm font-medium text-gray-900">Location</h3>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="block w-full mt-1 py-2 pl-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base bg-white"
                  placeholder="Enter location"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Define PropTypes for SearchBar
SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  price: PropTypes.string.isRequired,
  setPrice: PropTypes.func.isRequired,
  rating: PropTypes.string.isRequired,
  setRating: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
};

export default SearchBar;
